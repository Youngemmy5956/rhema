# �� RHEMA - Daily Bible Verse

> Get inspired every morning with a Bible verse notification on your Mac!

[![GitHub](https://img.shields.io/badge/GitHub-Youngemmy5956-blue?logo=github)](https://github.com/Youngemmy5956/rhema)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Created by **Nwamini Emmanuel O.** | [GitHub](https://github.com/Youngemmy5956)

---

## ✨ Features

- 🔔 **Daily Notifications** - Get a Bible verse at 8:00 AM every day
- 📖 **Random Scripture** - Verses from both Old and New Testament
- 💻 **Command-line Tool** - Fetch verses anytime from your terminal
- ⚡ **Auto-start** - Runs automatically even after restarts
- 🎯 **Filtered Verses** - Choose from specific categories (OT, NT, Red Letter)

---

## 🚀 Quick Start

### Prerequisites

- macOS (10.14 or later)
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm)
- Node.js (installed via NVM)

### Installation

1. **Clone or download this repository:**
```bash
   git clone https://github.com/Youngemmy5956/rhema.git
   cd rhema
```

2. **Run the installer:**
```bash
   chmod +x install.sh
   ./install.sh
```

3. **Done!** You'll get your first verse notification immediately! 🎉

---

## 📱 Usage

### Command Line
```bash
# Get a random verse
node ~/rhema/bin/rhema.js

# Get today's daily verse
node ~/rhema/bin/rhema.js daily

# Get Old Testament only
node ~/rhema/bin/rhema.js ot

# Get Jesus's words (red letter)
node ~/rhema/bin/rhema.js red

# Fetch a specific verse
node ~/rhema/bin/rhema.js fetch John 3:16
node ~/rhema/bin/rhema.js fetch Genesis 1
node ~/rhema/bin/rhema.js fetch "1 Corinthians" 13:4
```

### Optional: Global Command

Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
alias rhema='node ~/rhema/bin/rhema.js'
```

Then use simply:
```bash
rhema
rhema daily
rhema fetch John 3:16
```

---

## 🎯 Examples

**Daily Notification:**

<img width="400" alt="notification-example" src="https://user-images.githubusercontent.com/placeholder/notification.png">

**Command Line:**
```bash
$ rhema

"For God so loved the world that he gave his one and only Son, 
that whoever believes in him shall not perish but have eternal life."
— John 3:16
```

---

## ⚙️ Configuration

### Change Notification Time

Edit the plist file:
```bash
nano ~/Library/LaunchAgents/com.rhema.daily.plist
```

Change the `Hour` value (0-23):
```xml
<key>Hour</key>
<integer>8</integer>  <!-- Change this -->
```

Reload the service:
```bash
launchctl unload ~/Library/LaunchAgents/com.rhema.daily.plist
launchctl load ~/Library/LaunchAgents/com.rhema.daily.plist
```

---

## 🗑️ Uninstall
```bash
launchctl unload ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/rhema-daily.sh
rm -rf ~/rhema
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is [MIT](LICENSE) licensed.

---

## 👨‍💻 Author

**Nwamini Emmanuel O.**

- GitHub: [@Youngemmy5956](https://github.com/Youngemmy5956)
- Project Link: [https://github.com/Youngemmy5956/rhema](https://github.com/Youngemmy5956/rhema)

---

## ⭐ Show Your Support

Give a ⭐️ if this project blessed you!

---

## 📖 Scripture

> "Your word is a lamp to my feet and a light to my path."  
> — Psalm 119:105

---

<p align="center">Made with ❤️ and ✝️ by Nwamini Emmanuel O.</p>
