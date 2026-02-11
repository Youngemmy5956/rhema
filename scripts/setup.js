#!/usr/bin/env node

import { execSync } from 'child_process';
import { homedir, platform } from 'os';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOME = homedir();
const OS = platform();

console.log('\n📖 Setting up RHEMA Daily Bible Verse...\n');

// macOS Setup
if (OS === 'darwin') {
  try {
    const scriptPath = join(HOME, 'rhema-daily.sh');
    const scriptContent = `#!/bin/bash

# Get the daily verse and remove ANSI color codes
VERSE_FULL=$(rhema daily | sed 's/\\x1b\\[[0-9;]*m//g')

# Extract verse text (line with quotes)
VERSE_TEXT=$(echo "$VERSE_FULL" | grep '^"' | sed 's/^"//;s/"$//')

# Extract reference (line with —) - only get first occurrence
VERSE_REF=$(echo "$VERSE_FULL" | grep '^—' | head -1 | sed 's/^— //')

# If verse text is empty, use the full output
if [ -z "$VERSE_TEXT" ]; then
    VERSE_TEXT="$VERSE_FULL"
fi

# Create the full message for display
FULL_MESSAGE="$VERSE_TEXT

— $VERSE_REF"

# 1. FIRST: Send notification
osascript -e "display notification \\"$VERSE_TEXT\\" with title \\"RHEMA - Daily Reading by Nwamini Emmanuel O.\\" subtitle \\"$VERSE_REF\\" sound name \\"Glass\\""

# 2. THEN: Show the readable popup dialog
osascript << END
display dialog "$FULL_MESSAGE" with title "📖 RHEMA - Daily Reading" buttons {"Amen", "Copy Verse"} default button "Amen" with icon note
set buttonPressed to button returned of result

if buttonPressed is "Copy Verse" then
    set the clipboard to "$FULL_MESSAGE"
end if
END

# Log it
echo "$(date '+%Y-%m-%d %H:%M:%S')" >> /tmp/rhema-daily.log
echo "$VERSE_FULL" >> /tmp/rhema-daily.log
echo "---" >> /tmp/rhema-daily.log
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
    console.log('📖 You will receive a Bible verse at 8:00 AM daily\n');
    console.log('   🔔 Notification appears with verse preview');
    console.log('   📖 Popup dialog shows full verse to read');
    console.log('   ✝️  Click "Amen" to close or "Copy Verse" to copy\n');
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 You can still use the CLI commands!');
  }
}

// Windows Setup
else if (OS === 'win32') {
  try {
    const taskName = 'RhemaDaily';
    
    // Copy the notification script if it exists
    const notifyScriptSource = join(__dirname, 'windows-notify.ps1');
    const notifyScriptDest = join(HOME, 'rhema-notify.ps1');
    
    if (existsSync(notifyScriptSource)) {
      const notifyScript = readFileSync(notifyScriptSource, 'utf-8');
      writeFileSync(notifyScriptDest, notifyScript, 'utf-8');
    }
    
    // Main daily script
    const scriptPath = join(HOME, 'rhema-daily.ps1');
    const psScript = `# RHEMA Daily - Windows
$ErrorActionPreference = "Continue"

# Get the verse
try {
    $output = rhema daily 2>&1 | Out-String
    $lines = $output -split "\`n"
    
    # Extract verse and reference
    $verse = ""
    $reference = ""
    
    foreach ($line in $lines) {
        if ($line -match '^"(.+)"$') {
            $verse = $matches[1]
        }
        elseif ($line -match '^—\\s*(.+)$') {
            $reference = $matches[1]
        }
    }
    
    if ($verse -eq "") {
        $verse = $output.Trim()
    }
    
    # Call notification script
    $notifyScript = "$env:USERPROFILE\\\\rhema-notify.ps1"
    if (Test-Path $notifyScript) {
        & $notifyScript -Verse $verse -Reference $reference
    }
    else {
        Write-Host "📖 $verse" -ForegroundColor Cyan
        Write-Host "— $reference" -ForegroundColor Gray
    }
}
catch {
    Write-Host "Error: $_" -ForegroundColor Red
    $logPath = "$env:TEMP\\\\rhema-daily-error.log"
    Add-Content -Path $logPath -Value "$(Get-Date) - Error: $_"
}
`;

    writeFileSync(scriptPath, psScript, 'utf-8');

    // Create Task Scheduler XML
    const taskXml = `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.4" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>RHEMA Daily Bible Verse Notification</Description>
    <Author>Nwamini Emmanuel O.</Author>
  </RegistrationInfo>
  <Triggers>
    <CalendarTrigger>
      <StartBoundary>2025-01-01T08:00:00</StartBoundary>
      <Enabled>true</Enabled>
      <ScheduleByDay>
        <DaysInterval>1</DaysInterval>
      </ScheduleByDay>
    </CalendarTrigger>
  </Triggers>
  <Settings>
    <MultipleInstancesPolicy>IgnoreNew</MultipleInstancesPolicy>
    <DisallowStartIfOnBatteries>false</DisallowStartIfOnBatteries>
    <StopIfGoingOnBatteries>false</StopIfGoingOnBatteries>
    <AllowHardTerminate>true</AllowHardTerminate>
    <StartWhenAvailable>true</StartWhenAvailable>
    <RunOnlyIfNetworkAvailable>false</RunOnlyIfNetworkAvailable>
    <AllowStartOnDemand>true</AllowStartOnDemand>
    <Enabled>true</Enabled>
    <Hidden>false</Hidden>
    <RunOnlyIfIdle>false</RunOnlyIfIdle>
    <WakeToRun>false</WakeToRun>
    <ExecutionTimeLimit>PT1H</ExecutionTimeLimit>
    <Priority>7</Priority>
  </Settings>
  <Actions>
    <Exec>
      <Command>powershell.exe</Command>
      <Arguments>-WindowStyle Hidden -ExecutionPolicy Bypass -File "${scriptPath.replace(/\\/g, '\\\\')}"</Arguments>
    </Exec>
  </Actions>
</Task>`;

    const taskXmlPath = join(HOME, 'rhema-task.xml');
    writeFileSync(taskXmlPath, taskXml, 'utf-16le');

    // Register the task
    try {
      execSync(`schtasks /delete /tn "${taskName}" /f`, { stdio: 'ignore' });
    } catch (e) {}
    
    execSync(`schtasks /create /tn "${taskName}" /xml "${taskXmlPath}" /f`);

    console.log('✅ RHEMA Daily successfully set up on Windows!\n');
    console.log('📖 You will receive a Bible verse notification at 8:00 AM daily\n');
    console.log('\n🧪 To test the notification now, run:');
    console.log(`   powershell -ExecutionPolicy Bypass -File "${scriptPath}"\n`);
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 You can still use the CLI commands!');
    console.log('   Please report Windows issues: https://github.com/Youngemmy5956/rhema/issues/1\n');
  }
}

// Linux Setup
else {
  console.log('⚠️  Linux support coming soon!');
  console.log('   You can still use the CLI commands!\n');
}

console.log('Commands:');
console.log('  rhema              - Get a random verse');
console.log('  rhema daily        - Get today\'s verse');
console.log('  rhema ot           - Old Testament only');
console.log('  rhema red          - Jesus\'s words only');
console.log('  rhema fetch John 3:16  - Fetch specific verse\n');
console.log('⭐ Star the project: https://github.com/Youngemmy5956/rhema\n');
