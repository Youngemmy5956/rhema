#!/bin/bash

echo "📖 Installing RHEMA Daily Verse..."

# Get the user's home directory
USER_HOME="$HOME"

# Check if NVM is installed
if [ ! -d "$USER_HOME/.nvm" ]; then
    echo "❌ NVM not found. Please install NVM first:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    exit 1
fi

# Copy RHEMA to user's home directory
echo "📦 Copying RHEMA files..."
cp -r "$(dirname "$0")" "$USER_HOME/rhema"
cd "$USER_HOME/rhema"

# Install dependencies
echo "📥 Installing dependencies..."
export NVM_DIR="$USER_HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
npm install

# Get Node path
NODE_PATH=$(which node)

# Create the daily script
echo "📝 Creating daily script..."
cat > "$USER_HOME/rhema-daily.sh" << SCRIPT
#!/bin/bash

# Load NVM
export NVM_DIR="$USER_HOME/.nvm"
[ -s "\$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"

# Navigate to project directory
cd $USER_HOME/rhema || exit 1

# Get the daily verse
VERSE=\$(node bin/rhema.js daily)

# Display as notification
osascript -e "display notification \"\$VERSE\" with title \"Daily Bible Verse ✝️\" sound name \"Glass\""

# Also log it
echo "\$VERSE"
SCRIPT

chmod +x "$USER_HOME/rhema-daily.sh"

# Create the launchd plist
echo "⚙️  Setting up daily schedule..."
mkdir -p "$USER_HOME/Library/LaunchAgents"

cat > "$USER_HOME/Library/LaunchAgents/com.rhema.daily.plist" << PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.rhema.daily</string>
    <key>ProgramArguments</key>
    <array>
      <string>$USER_HOME/rhema-daily.sh</string>
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
</plist>
PLIST

chmod 644 "$USER_HOME/Library/LaunchAgents/com.rhema.daily.plist"

# Load the service
echo "🚀 Loading service..."
launchctl load "$USER_HOME/Library/LaunchAgents/com.rhema.daily.plist"

echo ""
echo "✅ Installation complete!"
echo ""
echo "📖 Your daily Bible verse will appear at 8:00 AM every day"
echo ""
echo "Commands you can use:"
echo "  rhema              - Get a random verse"
echo "  rhema daily        - Get today's verse"
echo "  rhema fetch John 3:16  - Get specific verse"
echo ""
echo "To add 'rhema' command globally, add this to your ~/.zshrc:"
echo "  alias rhema='node $USER_HOME/rhema/bin/rhema.js'"
echo ""
