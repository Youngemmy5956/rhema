#!/usr/bin/env node

import { execSync } from 'child_process';
import { homedir } from 'os';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const HOME = homedir();
const isMac = process.platform === 'darwin';

console.log('\n📖 Setting up RHEMA Daily Bible Verse...\n');

if (!isMac) {
  console.log('⚠️  This package is currently only supported on macOS.');
  console.log('   You can still use the CLI commands!\n');
  process.exit(0);
}

try {
  // Create the daily script
  const scriptPath = join(HOME, 'rhema-daily.sh');
  const scriptContent = `#!/bin/bash

# Get the daily verse
VERSE=$(rhema daily)

# Display as notification
osascript -e "display notification \\"$VERSE\\" with title \\"📖 RHEMA Daily\\" subtitle \\"by Nwamini Emmanuel O.\\" sound name \\"Glass\\""

# Also log it
echo "$VERSE"
`;

  writeFileSync(scriptPath, scriptContent);
  execSync(`chmod +x ${scriptPath}`);

  // Create the launchd plist
  const launchAgentsDir = join(HOME, 'Library', 'LaunchAgents');
  if (!existsSync(launchAgentsDir)) {
    mkdirSync(launchAgentsDir, { recursive: true });
  }

  const plistPath = join(launchAgentsDir, 'com.rhema.daily.plist');
  const plistContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.rhema.daily</string>
    <key>ProgramArguments</key>
    <array>
      <string>${scriptPath}</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
      <key>Hour</key>
      <integer>8</integer>
      <key>Minute</key>
      <integer>0</integer>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/tmp/rhema-daily.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/rhema-daily.log</string>
  </dict>
</plist>`;

  writeFileSync(plistPath, plistContent);
  execSync(`chmod 644 ${plistPath}`);

  // Load the service
  try {
    execSync(`launchctl unload ${plistPath} 2>/dev/null`, { stdio: 'ignore' });
  } catch (e) {
    // Ignore error if not loaded
  }
  
  execSync(`launchctl load ${plistPath}`);

  console.log('✅ RHEMA Daily successfully set up!\n');
  console.log('📖 You will receive a Bible verse notification at 8:00 AM daily\n');
  console.log('Commands:');
  console.log('  rhema              - Get a random verse');
  console.log('  rhema daily        - Get today\'s verse');
  console.log('  rhema ot           - Old Testament only');
  console.log('  rhema red          - Jesus\'s words only');
  console.log('  rhema fetch John 3:16  - Fetch specific verse\n');
  console.log('⭐ Star the project: https://github.com/Youngemmy5956/rhema\n');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\n💡 You can still use the CLI commands!');
  console.log('   Run: rhema help\n');
}
