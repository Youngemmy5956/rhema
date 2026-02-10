---
name: Windows Testing
about: Help test Windows support
title: '[Windows Testing] '
labels: 'windows, testing, help wanted'
assignees: ''
---

## Windows Testing Report

**Windows Version:** (e.g., Windows 10, Windows 11)
**Node.js Version:** (run `node --version`)
**PowerShell Version:** (run `$PSVersionTable.PSVersion`)

### Installation

- [ ] Successfully installed: `npm install -g rhema-daily`
- [ ] Any errors during installation?
```
Paste error here if any
```

### CLI Testing

- [ ] `rhema` works
- [ ] `rhema daily` works
- [ ] `rhema ot` works
- [ ] `rhema red` works
- [ ] `rhema fetch John 3:16` works

**Output/Errors:**
```
Paste output or errors here
```

### Scheduled Task

- [ ] Task created successfully
- [ ] Can see task in Task Scheduler

**Check with:**
```powershell
schtasks /query /tn "RhemaDaily"
```

**Output:**
```
Paste output here
```

### Notifications

- [ ] Notification appeared
- [ ] Notification did NOT appear

**If notification appeared:**
- Describe how it looked
- Screenshot (optional)

**If notification did NOT appear:**
- Any error messages?
- Check log file: `%TEMP%\rhema-daily.log`
```
Paste log content here
```

### Additional Notes

Any other observations, suggestions, or issues?

---

Thank you for helping test RHEMA Daily! 🙏✝️
