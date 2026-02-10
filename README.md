# 📖 RHEMA - Daily Bible Verse

> Get inspired every morning with a Bible verse notification on your Mac!

[![npm version](https://img.shields.io/npm/v/rhema-daily.svg)](https://www.npmjs.com/package/rhema-daily)
[![npm downloads](https://img.shields.io/npm/dm/rhema-daily.svg)](https://www.npmjs.com/package/rhema-daily)
[![GitHub](https://img.shields.io/badge/GitHub-Youngemmy5956-blue?logo=github)](https://github.com/Youngemmy5956/rhema)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Created by **Nwamini Emmanuel O.** | [GitHub](https://github.com/Youngemmy5956)

---

## 💡 What is RHEMA?

**RHEMA** (ῥῆμα) is a Greek word meaning **"a spoken word"** or **"utterance"**. In biblical context, it refers to a specific word from God that speaks directly to you in a particular moment - a timely, personal message that brings life and revelation.

> *"Man shall not live by bread alone, but by every **word (rhema)** that proceeds from the mouth of God."* — Matthew 4:4

This tool delivers God's **rhema** to you daily - a fresh word to guide, encourage, and inspire your day.

---

## 🚀 Installation
```bash
npm install -g rhema-daily
```

That's it! Daily Bible verse notifications are automatically set up! 🎉

### Platform Support

- ✅ **macOS** - Fully supported with daily notifications
- ⚠️ **Windows** - Experimental (testers needed! [See issue #1](../../issues/1))
- 🔜 **Linux** - Coming soon

---

## 📱 Usage
```bash
# Get a random verse
rhema

# Get today's daily verse
rhema daily

# Old Testament only
rhema ot

# Jesus's words (red letter)
rhema red

# Fetch specific verse
rhema fetch John 3:16
rhema fetch Genesis 1
rhema fetch "1 Corinthians" 13:4
```

---

## ✨ Features

- 🔔 **Daily Notifications** - Receive your rhema at 8:00 AM every day
- 📖 **Random Scripture** - Both Old and New Testament
- 💻 **CLI Tool** - Fetch verses anytime from your terminal
- ⚡ **Auto-start** - Runs automatically even after restarts
- 🎯 **Filtered Verses** - Choose OT, NT, or Red Letter (Jesus's words)
- 🏷️ **Mood-based** - Filter verses by themes (peace, comfort, rest, etc.)

---

## 🎯 Examples

**Daily Notification:**

Every morning at 8:00 AM, you'll receive a notification with a fresh word from Scripture.

**Command Line:**
```bash
$ rhema

"For God so loved the world that he gave his one and only Son, 
that whoever believes in him shall not perish but have eternal life."
— John 3:16
```

**Jesus's Words:**
```bash
$ rhema red

Jesus said 🔴

"I am the way, the truth, and the life. 
No one comes to the Father except through me."
— John 14:6
```

---

## ⚙️ Configuration

### macOS - Change Notification Time

Edit the plist file:
```bash
nano ~/Library/LaunchAgents/com.rhema.daily.plist
```

Change the `Hour` value (0-23):
```xml
<key>Hour</key>
<integer>8</integer>  <!-- Change to your preferred hour -->
```

Reload the service:
```bash
launchctl unload ~/Library/LaunchAgents/com.rhema.daily.plist
launchctl load ~/Library/LaunchAgents/com.rhema.daily.plist
```

### Windows - Check Scheduled Task
```powershell
schtasks /query /tn "RhemaDaily"
```

---

## 🗑️ Uninstall

### macOS
```bash
# Uninstall the package
npm uninstall -g rhema-daily

# Remove the daily notification service
launchctl unload ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/rhema-daily.sh
```

### Windows
```powershell
# Uninstall the package
npm uninstall -g rhema-daily

# Remove scheduled task
schtasks /delete /tn "RhemaDaily" /f
del %USERPROFILE%\rhema-daily.ps1
```

---

## 🛠️ Requirements

- **macOS:** 10.14 or later
- **Windows:** 10 or later (experimental)
- **Node.js:** 18.0.0 or later

---

## 🧪 Help Test Windows Support!

Windows support is **experimental** and needs testing! If you're on Windows:

1. Install: `npm install -g rhema-daily`
2. Test the CLI: `rhema daily`
3. Check if notifications work
4. [Report issues here](../../issues/1)

Your feedback helps make RHEMA better for everyone! 🙏

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

**Immediate needs:**
- Windows testing
- Desktop app (Electron)
- UI/UX design
- Mobile app (React Native)

See our [ROADMAP](ROADMAP.md) for the full vision.

---

## 📝 License

This project is [MIT](LICENSE) licensed.

---

## 👨‍💻 Author

**Nwamini Emmanuel O.**

- GitHub: [@Youngemmy5956](https://github.com/Youngemmy5956)
- npm: [rhema-daily](https://www.npmjs.com/package/rhema-daily)

---

## ⭐ Show Your Support

Give a ⭐️ if this project blessed you!

---

## 📖 Scripture

> *"Your word is a lamp to my feet and a light to my path."*  
> — Psalm 119:105

---

<p align="center">Made with ❤️ and ✝️ by Nwamini Emmanuel O.</p>
