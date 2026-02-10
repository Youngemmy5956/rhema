# RHEMA Daily - Windows Notification Script
param(
    [string]$Verse = "Your daily Bible verse",
    [string]$Reference = ""
)

# Try Windows 10/11 Toast Notification first
try {
    [Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
    [Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null

    $APP_ID = 'RhemaDaily'
    
    $template = @"
<toast launch="app-defined-string">
    <visual>
        <binding template="ToastGeneric">
            <text><![CDATA[📖 RHEMA Daily]]></text>
            <text><![CDATA[$Verse]]></text>
            <text><![CDATA[— $Reference]]></text>
            <text><![CDATA[by Nwamini Emmanuel O.]]></text>
        </binding>
    </visual>
    <audio src="ms-winsoundevent:Notification.Default"/>
</toast>
"@

    $xml = New-Object Windows.Data.Xml.Dom.XmlDocument
    $xml.LoadXml($template)
    $toast = [Windows.UI.Notifications.ToastNotification]::new($xml)
    [Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier($APP_ID).Show($toast)
    
    Write-Host "✅ Notification sent successfully!" -ForegroundColor Green
}
catch {
    # Fallback to older notification method
    Write-Host "⚠️ Modern toast failed, trying fallback..." -ForegroundColor Yellow
    
    Add-Type -AssemblyName System.Windows.Forms
    $notification = New-Object System.Windows.Forms.NotifyIcon
    $notification.Icon = [System.Drawing.SystemIcons]::Information
    $notification.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Info
    $notification.BalloonTipTitle = "📖 RHEMA Daily"
    $notification.BalloonTipText = "$Verse`n— $Reference`nby Nwamini Emmanuel O."
    $notification.Visible = $true
    $notification.ShowBalloonTip(10000)
    
    Start-Sleep -Seconds 10
    $notification.Dispose()
}

# Log to file
$logPath = "$env:TEMP\rhema-daily.log"
$logEntry = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $Verse — $Reference"
Add-Content -Path $logPath -Value $logEntry

Write-Host "`n📖 $Verse" -ForegroundColor Cyan
Write-Host "— $Reference" -ForegroundColor Gray
