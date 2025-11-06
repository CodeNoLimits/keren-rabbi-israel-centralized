# 🕎 Keren Rabbi Israel Dov Odesser - Official Website

> Modern website for the Rabbi Israel Dov Odesser Foundation - Spreading Rabbi Nachman of Breslov's teachings worldwide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org)

---

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Install everything
npm run setup

# 2. Configure PayPal in .env
# Add your PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET

# 3. Create lottery draw
npm run init-lottery

# 4. Launch
npm run dev
```

🎉 **That's it!** Open http://localhost:5000

📖 **Detailed guide**: [QUICK_START.md](./QUICK_START.md)

---

## 🌟 Features

### 🎨 Modern Magazine-Style Design
- **Completely rebuilt** homepage with professional layout
- Rabbi photo gallery with modern grid design
- Smooth animations and transitions
- 100% mobile responsive (320px to 4K)

### 🎁 Complete Lottery System
- **PostgreSQL database** with full tracking
- Automatic entry for donations ≥ 18 ₪
- Monthly draws with configurable prizes
- Multiple tickets calculation (1 per 18 ₪)

### 💳 PayPal Integration
- Secure payment processing
- Automatic lottery registration
- Multi-currency support (ILS, USD, EUR...)
- Sandbox and Live modes

### 📱 Mobile-First
- Fully responsive design
- Touch-optimized interactions
- Fast loading times
- WebP image format

### 🌍 Multi-Language (5 Languages)
- 🇮🇱 Hebrew (default)
- 🇬🇧 English
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇷🇺 Russian

### 📚 E-Commerce Store
- Complete book catalog
- Multiple variants (formats, sizes)
- VAT calculation (17%)
- Shipping calculator
- 5% subscriber discount

---

## 🤖 Magic Commands

| Command | What it does | Time |
|---------|--------------|------|
| `npm run setup` | **Everything** (install, config, build) | 2 min |
| `npm run init-lottery` | Create active lottery draw | 30 sec |
| `npm run test-all` | Test everything automatically | 10 sec |
| `npm run dev` | Launch development server | 5 sec |
| `npm run deploy-check` | Verify before deployment | 2 min |

📖 **All commands**: [COMMANDES_MAGIQUES.md](./COMMANDES_MAGIQUES.md)

---

## 🚀 Deployment

### Render.com (Recommended)

**One-Click Deploy:**

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

Or manually:

1. Connect your GitHub repo
2. Render auto-detects `render.yaml`
3. Add environment variables
4. Deploy!

**Build Command**: `npm run setup && npm run build`  
**Start Command**: `npm start`

📖 **Full guide**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 📋 Documentation

- 📖 **Complete Guide** (French): [README_FR.md](./README_FR.md)
- 🚀 **Quick Start**: [QUICK_START.md](./QUICK_START.md)
- 🤖 **Automation Scripts**: [README_AUTOMATION.md](./README_AUTOMATION.md)
- ✅ **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- 🖼️ **Images Guide**: [IMAGES_INSTRUCTIONS.md](./IMAGES_INSTRUCTIONS.md)
- ✨ **Magic Commands**: [COMMANDES_MAGIQUES.md](./COMMANDES_MAGIQUES.md)

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + Shadcn/UI
- Vite (build)
- TanStack Query

**Backend:**
- Express + TypeScript
- Drizzle ORM
- PostgreSQL
- Stripe & PayPal

**Services:**
- SendGrid (emails)
- Render.com (hosting)

---

## 🎯 Project Structure

```
keren-rabbi-israel-centralized/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Main pages
│   │   │   ├── home.tsx       # NEW modern design
│   │   │   └── donate.tsx     # NEW donation page
│   │   └── components/    # Reusable components
│   └── public/
│       └── images/        # Rabbi photos (WebP)
├── server/                 # Backend Express
│   ├── routes/
│   │   └── donations.ts       # NEW lottery + PayPal
│   └── db.ts
├── shared/
│   └── schema.ts          # Database schema (+lottery)
├── scripts/               # Automation scripts
│   ├── setup.sh          # Auto installation
│   ├── init-lottery.ts   # Create draw
│   └── test-all.ts       # Run all tests
├── render.yaml            # Render.com config
└── docs/                  # Documentation
```

---

## 🔒 Security

- ✅ Server-side price validation
- ✅ CSRF protection
- ✅ PCI-DSS compliant payments
- ✅ Input sanitization
- ✅ Secure sessions
- ✅ HTTPS required in production

---

## 📊 Database Schema

### Main Tables

**`donations`** - All donations
- Donor information
- Amount and currency
- Payment method and status
- Lottery participation

**`lottery_draws`** - Lottery management
- Dates and prize information
- Winner selection
- Status tracking

**`lottery_entries`** - Participants
- Linked to donation
- Number of tickets
- Winner flag

---

## 🧪 Testing

```bash
# Test everything
npm run test-all

# Check TypeScript
npm run check

# Verify before deploy
npm run deploy-check
```

---

## 👥 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Test your changes: `npm run test-all`
4. Submit a pull request

---

## 📝 License

MIT License - see [LICENSE](./LICENSE)

---

## 🙏 Acknowledgments

- Rabbi Nachman of Breslov זצוקללה"ה
- Rabbi Israel Dov Odesser זצ"ל
- The worldwide Breslov community
- All open-source contributors

---

## 📞 Support

**For Users:**
- Email: support@keren-rabbi-israel.org
- Phone: +972-XX-XXX-XXXX

**For Developers:**
- GitHub Issues: [Create an issue](https://github.com/CodeNoLimits/keren-rabbi-israel-centralized/issues)
- Email: dev@keren-rabbi-israel.org

---

## 🎉 Ready for 20,000 People!

This site features:
- ✨ Professional modern design
- 🎁 Complete lottery system
- 💳 Secure PayPal payments
- 📱 100% mobile responsive
- 🌍 5 languages
- 📚 Functional e-commerce store

**Developed with ❤️ for spreading Rabbi Nachman's Torah**

**Na Nach Nachma Nachman Meuman!** 🎵

---

Made with ❤️ by [Media Master](https://media-master.dev)
