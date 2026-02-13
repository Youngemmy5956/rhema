#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
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

# Delete the daily cache so we get a NEW verse each time
rm -f ~/.rhema_daily.json

# Get verse
VERSE_OUTPUT=$(rhema daily 2>&1)

# Remove color codes
VERSE_CLEAN=$(echo "$VERSE_OUTPUT" | sed 's/\\x1b\\[[0-9;]*m//g')

# Extract verse text
VERSE_TEXT=$(echo "$VERSE_CLEAN" | grep -o '".*"' | sed 's/^"//;s/"$//' | head -1)

# Extract reference
VERSE_REF=$(echo "$VERSE_CLEAN" | grep '^—' | head -1 | sed 's/^— //')

# Fallback
if [ -z "$VERSE_TEXT" ]; then
    VERSE_TEXT="The Word of God is alive and active"
    VERSE_REF="Hebrews 4:12"
fi

FULL_MESSAGE="$VERSE_TEXT

— $VERSE_REF"

osascript -e "display notification \\"$VERSE_TEXT\\" with title \\"RHEMA - Word of God by Nwamini Emmanuel O.\\" subtitle \\"$VERSE_REF\\" sound name \\"Glass\\""

osascript << END
display dialog "$FULL_MESSAGE" with title "📖 RHEMA - God's Word" buttons {"Amen", "Copy Verse"} default button "Amen" with icon note
set buttonPressed to button returned of result
if buttonPressed is "Copy Verse" then
    set the clipboard to "$FULL_MESSAGE"
end if
END

echo "$(date '+%Y-%m-%d %H:%M:%S')" >> /tmp/rhema-daily.log
echo "$VERSE_CLEAN" >> /tmp/rhema-daily.log
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
    <key>StartInterval</key>
    <integer>120</integer>
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

    console.log('✅ RHEMA successfully set up on macOS!\n');
    console.log('📖 You will receive a NEW Bible verse every 2 minutes!\n');
    console.log('   🔔 Notification with verse preview');
    console.log('   📖 Popup dialog with full verse');
    console.log('   ✝️  Constant reminders of God\'s Word!\n');
    
    const welcomeScript = `#!/bin/bash
sleep 1
osascript -e 'display notification "You will receive a NEW Bible verse every 2 minutes! ✝️" with title "Welcome to RHEMA! 🙏" subtitle "by Nwamini Emmanuel O." sound name "Glass"'
sleep 2
rm -f ~/.rhema_daily.json
VERSE_OUT=$(rhema daily 2>&1)
VERSE_CLEAN=$(echo "$VERSE_OUT" | sed 's/\\x1b\\[[0-9;]*m//g')
VERSE_TEXT=$(echo "$VERSE_CLEAN" | grep -o '".*"' | sed 's/^"//;s/"$//' | head -1)
VERSE_REF=$(echo "$VERSE_CLEAN" | grep '^—' | head -1 | sed 's/^— //')
osascript -e "display dialog \\"Sample Verse:\\n\\n$VERSE_TEXT\\n\\n— $VERSE_REF\\n\\nA NEW verse every 2 minutes! ✝️\\" with title \\"📖 RHEMA\\" buttons {\\"Amen\\"} default button \\"Amen\\" with icon note"
`;
    
    const welcomeScriptPath = '/tmp/rhema-welcome.sh';
    writeFileSync(welcomeScriptPath, welcomeScript);
    execSync(`chmod +x ${welcomeScriptPath}`);
    
    spawn(welcomeScriptPath, [], {
      detached: true,
      stdio: 'ignore'
    }).unref();
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 You can still use the CLI commands!');
  }
}

// Windows Setup  
else if (OS === 'win32') {
  try {
    const taskName = 'RhemaDaily';
    
    const notifyScriptSource = join(__dirname, 'windows-notify.ps1');
    const notifyScriptDest = join(HOME, 'rhema-notify.ps1');
    
    if (existsSync(notifyScriptSource)) {
      const notifyScript = readFileSync(notifyScriptSource, 'utf-8');
      writeFileSync(notifyScriptDest, notifyScript, 'utf-8');
    }
    
    const scriptPath = join(HOME, 'rhema-daily.ps1');
    const psScript = `# RHEMA - Windows (Every 2 minutes, NEW verse each time)
$ErrorActionPreference = "Continue"

try {
    # Delete cache to get a new verse
    $cacheFile = "$env:USERPROFILE\\.rhema_daily.json"
    if (Test-Path $cacheFile) { Remove-Item $cacheFile }
    
    $output = rhema daily 2>&1 | Out-String
    $lines = $output -split "\`n"
    
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
    
    $notifyScript = "$env:USERPROFILE\\\\rhema-notify.ps1"
    if (Test-Path $notifyScript) {
        & $notifyScript -Verse $verse -Reference $reference
    }
    else {
        Write-Host "�� $verse" -ForegroundColor Cyan
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

    const taskXml = `<?xml version="1.0" encoding="UTF-16"?>
<Task version="1.4" xmlns="http://schemas.microsoft.com/windows/2004/02/mit/task">
  <RegistrationInfo>
    <Description>RHEMA Bible Verse Every 2 Minutes</Description>
    <Author>Nwamini Emmanuel O.</Author>
  </RegistrationInfo>
  <Triggers>
    <TimeTrigger>
      <Repetition>
        <Interval>PT2M</Interval>
        <StopAtDurationEnd>false</StopAtDurationEnd>
      </Repetition>
      <StartBoundary>2025-01-01T00:00:00</StartBoundary>
      <Enabled>true</Enabled>
    </TimeTrigger>
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

    try {
      execSync(`schtasks /delete /tn "${taskName}" /f`, { stdio: 'ignore' });
    } catch (e) {}
    
    execSync(`schtasks /create /tn "${taskName}" /xml "${taskXmlPath}" /f`);

    console.log('✅ RHEMA successfully set up on Windows!\n');
    console.log('📖 You will receive a NEW Bible verse every 2 minutes!\n');
    console.log('\n🧪 To test now:');
    console.log(`   powershell -ExecutionPolicy Bypass -File "${scriptPath}"\n`);
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\n💡 You can still use the CLI commands!');
    console.log('   Report issues: https://github.com/Youngemmy5956/rhema/issues/1\n');
  }
}

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
