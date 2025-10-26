import { Octokit } from '@octokit/rest'
import fs from 'fs/promises'
import path from 'path'

let connectionSettings;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    // Skip certain directories and files
    if (entry.name.startsWith('.') && entry.name !== '.gitignore') continue;
    if (entry.name === 'node_modules') continue;
    if (entry.name === 'dist') continue;
    if (entry.name === '.cache') continue;
    if (entry.name === '.upm') continue;
    if (entry.name === '.local') continue;
    
    if (entry.isDirectory()) {
      const subFiles = await getAllFiles(fullPath, baseDir);
      files.push(...subFiles);
    } else {
      files.push({
        path: relativePath.replace(/\\/g, '/'), // Ensure forward slashes for GitHub
        fullPath: fullPath
      });
    }
  }
  
  return files;
}

async function pushFilesToGitHub() {
  try {
    console.log('🔗 Connecting to GitHub...');
    const octokit = await getUncachableGitHubClient();
    
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`👤 Connected as: ${user.login}`);
    
    const owner = user.login;
    const repo = 'haesh-sheli';
    
    // Get all files to upload
    console.log('📁 Scanning project files...');
    const files = await getAllFiles('.');
    console.log(`📂 Found ${files.length} files to upload`);
    
    // Get the current commit SHA (from the initialized repo)
    const { data: ref } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: 'heads/main'
    });
    const baseSha = ref.object.sha;
    
    console.log('📤 Creating tree with all files...');
    
    // Create blobs for all files
    const tree = [];
    let uploaded = 0;
    
    for (const file of files) {
      try {
        const content = await fs.readFile(file.fullPath);
        const isBinary = content.some(byte => byte === 0);
        
        console.log(`⬆️  [${++uploaded}/${files.length}] ${file.path}`);
        
        const { data: blob } = await octokit.rest.git.createBlob({
          owner,
          repo,
          content: isBinary ? content.toString('base64') : content.toString('utf8'),
          encoding: isBinary ? 'base64' : 'utf-8'
        });
        
        tree.push({
          path: file.path,
          mode: '100644',
          type: 'blob',
          sha: blob.sha
        });
      } catch (error) {
        console.error(`❌ Error uploading ${file.path}:`, error.message);
      }
    }
    
    // Create the tree
    const { data: newTree } = await octokit.rest.git.createTree({
      owner,
      repo,
      tree,
      base_tree: baseSha
    });
    
    // Create commit
    console.log('📝 Creating commit...');
    const { data: commit } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: `Complete Haesh Sheli Breslov bookstore website

✅ Modern React frontend with Hebrew RTL support
✅ Node.js/Express backend with PostgreSQL
✅ 30+ authentic Breslov books with real Hebrew images  
✅ Complete subscription system 'הוראת קבע' (99₪/month)
✅ Shopping cart, checkout, and payment integration
✅ Multilingual support (Hebrew, English, French, Spanish, Russian)
✅ Mobile-responsive design with Tailwind CSS
✅ Admin dashboard and user management
✅ Real product data with authentic pricing in shekels
✅ Stripe integration for secure payments
✅ PostgreSQL database with Drizzle ORM

Tech Stack: React, TypeScript, Node.js, Express, PostgreSQL, Stripe, Tailwind CSS`,
      tree: newTree.sha,
      parents: [baseSha]
    });
    
    // Update the reference
    console.log('🔄 Updating main branch...');
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: commit.sha
    });
    
    console.log(`\n🎉 SUCCESS! Project pushed to GitHub successfully!`);
    console.log(`🌐 Repository: https://github.com/${owner}/${repo}`);
    console.log(`📊 Files uploaded: ${uploaded}/${files.length}`);
    console.log(`📝 Commit SHA: ${commit.sha}`);
    
    return {
      success: true,
      url: `https://github.com/${owner}/${repo}`,
      filesUploaded: uploaded,
      totalFiles: files.length,
      commitSha: commit.sha
    };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Run the script
pushFilesToGitHub()
  .then(result => {
    console.log('\n✅ MISSION ACCOMPLISHED!');
    console.log(`🌐 Visit your project: ${result.url}`);
  })
  .catch(error => {
    console.error('\n❌ FAILED:', error.message);
    process.exit(1);
  });