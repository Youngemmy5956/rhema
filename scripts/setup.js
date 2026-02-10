#!/usr/bin/env node

import { execSync } from 'child_process';
import { homedir, platform } from 'os';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const HOME = homedir();
const OS = platform();

console.log('\n📖 Setting up RHEMA Daily Bible Verse...\n');

// macOS Setup
if (OS === 'darwin') {
  try {
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

    try {
      execSync(`launchctl unload ${plistPath} 2>/dev/null`, { stdio: 'ignore' });
    } catch (e) {}
    
    execSync(`launchctl load ${plistPath}`);

    console.log('✅ RHEMA Daily successfully set up on macOS!\n');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

// Windows Setup
else if (OS === 'win32') {
  try {
    const taskName = 'RhemaDaily';
    const scriptPath = join(HOME, 'rhema-daily.ps1');
    
    // PowerShell script for Windows notifications
    const psScript = `# RHEMA Daily - Windows
$verse = rhema daily
$title = "📖 RHEMA Daily"
$subtitle = "by Nwamini Emmanuel O."

# Windows Toast Notification
Add-Type -AssemblyName System.Windows.Forms
$notification = New-Object System.Windows.Forms.NotifyIcon
$notification.Icon = [System.Drawing.SystemIcons]::Information
$notification.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Info
$notification.BalloonTipTitle = $title
$notification.BalloonTipText = $verse
$notification.Visible = $true
$notification.ShowBalloonTip(10000)

# Also write to log
$logPath = "$env:TEMP\\rhema-daily.log"
Add-Content -Path $logPath -Value "$(Get-Date) - $verse"
`;

    writeFileSync(scriptPath, psScript, 'utf-8');

    // Create Windows Task Scheduler task
    const taskXml = `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.2" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <Triggers>
    <CalendarTrigger>
      <StartBoundary>2025-01-01T08:00:00</StartBoundary>
      <Enabled>true</Enabled>
      <ScheduleByDay>
        <DaysInterval>1</DaysInterval>
      </ScheduleByDay>
    </CalendarTrigger>
  </Triggers>
  <Actions>
    <Exec>
      <Command>powershell.exe</Command>
      <Arguments>-ExecutionPolicy Bypass -File "${scriptPath}"</Arguments>
    </Exec>
  </Actions>
</Task>`;

    const taskXmlPath = join(HOME, 'rhema-task.xml');
    writeFileSync(taskXmlPath, taskXml, 'utf-16le');

    // Register the task
    execSync(`schtasks /create /tn "${taskName}" /xml "${taskXmlPath}" /f`, { stdio: 'inherit' });

    console.log('✅ RHEMA Daily successfully set up on Windows!\n');
    console.log('📖 You will receive a Bible verse notification at 8:00 AM daily\n');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 You can still use the CLI commands!');
  }
}

// Linux Setup (optional)
else if (OS === 'linux') {
  console.log('⚠️  Linux support coming soon!');
  console.log('   You can still use the CLI commands!\n');
}

else {
  console.log('⚠️  This package is currently supported on macOS and Windows.');
  console.log('   You can still use the CLI commands!\n');
}

console.log('Commands:');
console.log('  rhema              - Get a random verse');
console.log('  rhema daily        - Get today\'s verse');
console.log('  rhema ot           - Old Testament only');
console.log('  rhema red          - Jesus\'s words only');
console.log('  rhema fetch John 3:16  - Fetch specific verse\n');
console.log('⭐ Star the project: https://github.com/Youngemmy5956/rhema\n');
