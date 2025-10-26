import { Octokit } from '@octokit/rest'

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

async function createOrGetRepository(octokit, repoName) {
  try {
    // Try to get existing repo
    const { data: repo } = await octokit.rest.repos.get({
      owner: (await octokit.rest.users.getAuthenticated()).data.login,
      repo: repoName
    });
    console.log(`✅ Repository ${repoName} already exists`);
    return repo;
  } catch (error) {
    if (error.status === 404) {
      // Create new repository
      console.log(`🚀 Creating new repository: ${repoName}`);
      const { data: newRepo } = await octokit.rest.repos.createForAuthenticatedUser({
        name: repoName,
        description: 'Haesh Sheli - Hebrew Breslov Books E-commerce Website',
        private: false, // Set to true if you want private repo
        auto_init: true
      });
      console.log(`✅ Repository created successfully: ${newRepo.html_url}`);
      return newRepo;
    } else {
      throw error;
    }
  }
}

async function pushProjectToGitHub() {
  try {
    console.log('🔗 Connecting to GitHub...');
    const octokit = await getUncachableGitHubClient();
    
    // Get user info
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`👤 Connected as: ${user.login}`);
    
    const repoName = 'haesh-sheli';
    const repo = await createOrGetRepository(octokit, repoName);
    
    console.log(`📂 Repository ready: ${repo.html_url}`);
    console.log(`🔧 Clone URL: ${repo.clone_url}`);
    
    // Instructions for user
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Your GitHub repository is now ready');
    console.log(`2. Repository URL: ${repo.html_url}`);
    console.log('3. You can now push your code using git commands or continue with automated push');
    
    return {
      repo,
      cloneUrl: repo.clone_url,
      htmlUrl: repo.html_url
    };
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Run the script
pushProjectToGitHub()
  .then(result => {
    console.log('\n✅ SUCCESS! Repository is ready for your project');
    console.log(`🌐 Visit: ${result.htmlUrl}`);
  })
  .catch(error => {
    console.error('\n❌ FAILED:', error.message);
    process.exit(1);
  });