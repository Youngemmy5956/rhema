# �� RHEMA - Daily Bible Verse

Get a daily Bible verse notification on your Mac every morning!

## Installation

1. Make sure you have [NVM](https://github.com/nvm-sh/nvm) installed
2. Download this folder
3. Open Terminal and navigate to the folder
4. Run the installer:
```bash
   ./install.sh
```

## Features

- 🔔 Daily notification at 8:00 AM
- �� Random verses from the Bible
- 💻 Command-line tool for instant verses
- ⚡ Runs automatically even when computer restarts

## Usage
```bash
# Get a random verse
rhema

# Get today's daily verse
rhema daily

# Get a specific verse
rhema fetch John 3:16

# Get Old Testament only
rhema ot

# Get red letter (Jesus's words) only
rhema red
```

## Uninstall
```bash
launchctl unload ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/Library/LaunchAgents/com.rhema.daily.plist
rm ~/rhema-daily.sh
rm -rf ~/rhema
```

Enjoy your daily dose of Scripture! ✝️
