# 📖 RHEMA - Bible Verse Reminders

> Get inspired throughout the day with Bible verse notifications every 2 minutes on your Mac and Windows!

[![npm version](https://img.shields.io/npm/v/rhema-daily.svg)](https://www.npmjs.com/package/rhema-daily)
[![npm downloads](https://img.shields.io/npm/dm/rhema-daily.svg)](https://www.npmjs.com/package/rhema-daily)
[![GitHub](https://img.shields.io/badge/GitHub-Youngemmy5956-blue?logo=github)](https://github.com/Youngemmy5956/rhema)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Created by **Nwamini Emmanuel O.** | [GitHub](https://github.com/Youngemmy5956)

---

## 💡 What is RHEMA?

**RHEMA** (ῥῆμα) is a Greek word meaning **"a spoken word"** or **"utterance"**. In biblical context, it refers to a specific word from God that speaks directly to you in a particular moment - a timely, personal message that brings life and revelation.

> *"Man shall not live by bread alone, but by every **word (rhema)** that proceeds from the mouth of God."* — Matthew 4:4

This tool delivers God's **rhema** to you **every 2 minutes** - constant reminders of His Word throughout your day.

---

## 🖥️ Two Ways to Use RHEMA

| | CLI Tool | Desktop App |
|---|---|---|
| **Install** | `npm install -g rhema-daily` | [Download .dmg / .exe](https://github.com/Youngemmy5956/rhema-desktop/releases/latest) |
| **Platform** | macOS, Windows | macOS, Windows |
| **Notifications** | ✅ Every 2 minutes | ✅ Customizable (every 2 min, daily, custom) |
| **GUI** | ❌ Terminal only | ✅ Beautiful UI with settings |
| **Bible versions** | KJV | KJV, ASV, WEB |
| **Tray icon** | ❌ | ✅ |
| **Repo** | [rhema](https://github.com/Youngemmy5956/rhema) | [rhema-desktop](https://github.com/Youngemmy5956/rhema-desktop) |

---

## 🚀 CLI Installation
```bash
npm install -g rhema-daily
```

That's it! Bible verse notifications will appear **every 2 minutes** to keep you focused on God's Word! 🎉

### Platform Support

- ✅ **macOS** - Fully supported with beautiful notifications and popup dialogs
- ✅ **Windows** - Working! Task Scheduler notifications (help us test! [See issue #1](../../issues/1))
- 🔜 **Linux** - Coming soon

---

## 📱 CLI Usage
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

- 🔔 **Constant Reminders** - New Bible verse every 2 minutes
- 📖 **Random Scripture** - Fresh verses from Old and New Testament
- 💻 **CLI Tool** - Fetch verses anytime from your terminal
- ⚡ **Auto-start** - Runs automatically even after restarts
- 🎯 **Filtered Verses** - Choose OT, NT, or Red Letter (Jesus's words)
- 🏷️ **Mood-based** - Filter verses by themes (peace, comfort, rest, etc.)
- 🎉 **Welcome Experience** - Sample verse on first install
- ✝️ **Stay Focused** - Constant reminders of God's Word throughout your day

---

## 🎯 What You'll See

### macOS Experience

**On Installation:**
1. 🔔 Welcome notification
2. 📖 Sample verse popup
3. Message: "You will receive a Bible verse every 2 minutes!"

**Every 2 Minutes:**
1. �� Notification with verse preview
2. 📖 Full verse popup dialog
3. Two buttons: "Amen" or "Copy Verse"

### Windows Experience

**On Installation:**
1. ✅ Task Scheduler setup
2. PowerShell notification script created

**Every 2 Minutes:**
1. 🔔 Windows toast notification with verse
2. Logged to `%TEMP%\rhema-daily.log`

---

## ⚙️ Configuration

### macOS - Change Notification Interval

Edit the plist file:
```bash
nano ~/Library/LaunchAgents/com.rhema.daily.plist
```

Change the `StartInterval` value (in seconds):
```xml
<key>StartInterval</key>
<integer>120</integer>  <!-- 120 seconds = 2 minutes -->
```

**Common intervals:**
- Every minute: `60`
- Every 2 minutes: `120` (default)
- Every 5 minutes: `300`
- Every 10 minutes: `600`
- Every 30 minutes: `1800`
- Every hour: `3600`

Reload the service:
```bash
launchctl unload ~/Library/LaunchAgents/com.rhema.daily.plist
launchctl load ~/Library/LaunchAgents/com.rhema.daily.plist
```

### Windows - Change Notification Interval

Open Task Scheduler:
```powershell
taskschd.msc
```

Find "RhemaDaily" → Right-click → Properties → Triggers → Edit → Repeat task every: **2 minutes**

---

## 🧪 Testing

### macOS - Test Immediately
```bash
~/rhema-daily.sh
```

### Windows - Test Immediately
```powershell
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\rhema-daily.ps1"
```

Check scheduled task:
```powershell
schtasks /query /tn "RhemaDaily"
```

---

## 🗑️ Uninstall

### macOS
```bash
npm uninstall -g rhema-daily
launchctl unload ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/rhema-daily.sh
```

### Windows
```powershell
npm uninstall -g rhema-daily
schtasks /delete /tn "RhemaDaily" /f
del $env:USERPROFILE\rhema-daily.ps1
del $env:USERPROFILE\rhema-notify.ps1
```

---

## 🛠️ Requirements

- **macOS:** 10.14 or later
- **Windows:** 10 or later
- **Node.js:** 18.0.0 or later

---

## 💡 Why Every 2 Minutes?

> *"I have hidden your word in my heart that I might not sin against you."* — Psalm 119:11

Constant exposure to God's Word throughout the day:
- ✝️ Keeps you focused on spiritual things
- 📖 Helps memorize Scripture naturally
- 🙏 Reminds you to pray and meditate
- 💪 Strengthens your faith continuously
- ❤️ Transforms your mind through repetition

**Want less frequent reminders?** Use the [Desktop App](https://github.com/Youngemmy5956/rhema-desktop) with customizable settings!

---

## 🧪 Help Test Windows Support!

Windows support is **working but needs more testing**! If you're on Windows:

1. Install: `npm install -g rhema-daily`
2. Test the CLI: `rhema daily`
3. Check if notifications appear every 2 minutes
4. [Report your experience here](../../issues/1)

Your feedback helps make RHEMA better for everyone! 🙏

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

**Help wanted:**
- ✅ Windows testing and feedback
- 🔜 Linux support
- 📱 Mobile app (React Native)
- 🎨 UI/UX design

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

> *"This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night."*  
> — Joshua 1:8

---

<p align="center">Made with ❤️ and ✝️ by Nwamini Emmanuel O.</p>
