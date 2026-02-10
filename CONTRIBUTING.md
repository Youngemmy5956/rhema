# Contributing to RHEMA Daily

Thank you for your interest in contributing to RHEMA Daily! 🙏

## 🎯 Project Vision

Make daily Bible verses accessible to everyone, regardless of technical skill level.

---

## 🚨 URGENT: Windows Testers Needed!

**We need your help testing Windows support!**

Windows functionality is currently **experimental**. If you have a Windows machine:

1. Install: `npm install -g rhema-daily`
2. Test the CLI commands
3. Check if scheduled notifications work
4. Report your findings in [Issue #1](../../issues/1)

**What to test:**
- [ ] Does `rhema daily` work?
- [ ] Did the scheduled task get created?
- [ ] Do notifications appear at 8 AM?
- [ ] Are there any errors?

Your testing is invaluable! 🙏

---

## 🚀 Roadmap

### Phase 1: Core CLI (✅ Complete)
- [x] Command-line interface
- [x] Daily notifications (macOS)
- [x] npm package

### Phase 2: Cross-Platform Support (🚧 In Progress)
- [x] macOS support
- [⚠️] Windows support (experimental - testers needed!)
- [ ] Linux support

### Phase 3: Desktop App (📋 Planned)
- [ ] Electron-based desktop app
- [ ] System tray widget
- [ ] Customizable notifications
- [ ] Settings UI
- [ ] Custom verse collections

### Phase 4: Mobile (💭 Future)
- [ ] React Native mobile app (iOS/Android)
- [ ] Widget support
- [ ] Push notifications

---

## 🛠️ How to Contribute

### 1. Fork the Repository
```bash
git clone https://github.com/Youngemmy5956/rhema.git
cd rhema
npm install
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

#### 🔥 Priority Areas:

**Windows Support (HIGH PRIORITY):**
- Test installation on Windows 10/11
- Fix Task Scheduler integration
- Improve Windows toast notifications
- Create Windows installer (.msi or .exe)
- Document Windows-specific setup

**Desktop App (Electron):**
- Build Electron wrapper
- Create settings UI
- Design system tray icon
- Implement customizable widgets

**Mobile App (React Native):**
- Port to React Native
- Design mobile UI
- Implement push notifications

**Features:**
- Custom verse collections
- Verse sharing (social media)
- Reading plans
- Multi-language support
- Dark mode
- Verse history

**Design:**
- Create app icon
- Design notification templates
- Build widget mockups

### 4. Test Your Changes
```bash
npm install -g .
rhema
rhema daily
```

**For Windows testing:**
```powershell
# Check if scheduled task was created
schtasks /query /tn "RhemaDaily"

# Check PowerShell script
cat $env:USERPROFILE\rhema-daily.ps1

# Test notification manually
powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\rhema-daily.ps1"
```

### 5. Commit
```bash
git add .
git commit -m "feat: add Windows support for notifications"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests

### 6. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📝 Code Style

- Use ES modules
- Follow existing code structure
- Add comments for complex logic
- Keep functions small and focused

---

## 🐛 Reporting Bugs

Open an issue with:
- OS and version
- Node.js version
- Steps to reproduce
- Expected vs actual behavior
- Error messages (if any)

**For Windows issues, please include:**
- Windows version (10/11)
- PowerShell version
- Task Scheduler screenshot (if applicable)

---

## 💡 Feature Requests

Open an issue describing:
- The problem you're solving
- Proposed solution
- Why it benefits users

---

## 🧪 Testing Checklist

Before submitting a PR, test:

- [ ] `rhema` - Random verse works
- [ ] `rhema daily` - Daily verse works
- [ ] `rhema ot` - Old Testament filter works
- [ ] `rhema red` - Red letter filter works
- [ ] `rhema fetch John 3:16` - Fetch specific verse works
- [ ] Notifications appear (if applicable)
- [ ] No errors in console

**Windows-specific:**
- [ ] Scheduled task created
- [ ] Notifications appear at set time
- [ ] PowerShell script runs without errors

---

## 📧 Questions?

- Open a [discussion](../../discussions)
- Contact [@Youngemmy5956](https://github.com/Youngemmy5956)
- Join our community (coming soon!)

---

## 🙏 Thank You!

Every contribution, big or small, is appreciated!

> *"Whatever you do, work heartily, as for the Lord and not for men."*  
> — Colossians 3:23

---

Made with ❤️ and ✝️ by Nwamini Emmanuel O.
