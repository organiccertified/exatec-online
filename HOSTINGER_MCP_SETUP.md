# Hostinger MCP Server Setup

This guide explains how to set up the Hostinger MCP (Model Context Protocol) server in Cursor IDE to enable direct interaction with your Hostinger hosting account.

## What is MCP?

MCP (Model Context Protocol) allows AI assistants in Cursor to interact with external services through specialized tools. The Hostinger MCP server enables you to:
- Manage your Hostinger hosting account
- Deploy files directly
- Check server status
- Manage domains and databases
- And more...

## Setup Instructions

### Step 1: Configure MCP Server in Cursor

The MCP server configuration needs to be added to Cursor's settings. This is typically done in one of these locations:

1. **Cursor Settings UI:**
   - Open Cursor Settings (Ctrl+, or Cmd+,)
   - Search for "MCP" or "Model Context Protocol"
   - Add the server configuration

2. **Cursor Settings JSON:**
   - Open Cursor Settings JSON (Ctrl+Shift+P → "Preferences: Open User Settings (JSON)")
   - Add the configuration to your settings

### Step 2: Add the Configuration

Add this configuration to your Cursor settings:

```json
{
  "mcpServers": {
    "hostinger-mcp": {
      "command": "npx",
      "args": [
        "hostinger-api-mcp@latest"
      ],
      "env": {
        "API_TOKEN": "iAOJszqiP0bBH4gOEu4vGtcDPPVJ22dSkdoEdRGl3f2c5101"
      }
    }
  }
}
```

### Step 3: Restart Cursor

After adding the configuration:
1. Save the settings file
2. Restart Cursor IDE completely
3. The MCP server should automatically connect

### Step 4: Verify Connection

Once Cursor restarts, you should see:
- MCP server status in Cursor's status bar
- New tools available for Hostinger operations
- Ability to interact with Hostinger through the AI assistant

## Available Operations

Once connected, you can use the Hostinger MCP server to:

### File Management
- Upload files to your hosting
- Download files from your hosting
- List files and directories
- Delete files

### Deployment
- Deploy your built frontend directly
- Manage deployment configurations
- Check deployment status

### Domain Management
- List domains
- Manage DNS settings
- Check domain status

### Database Operations
- List databases
- Create/manage databases
- Execute queries (if configured)

### Server Management
- Check server status
- View server logs
- Manage server configurations

## Security Notes

⚠️ **Important Security Considerations:**

1. **API Token Security:**
   - Your API token (`iAOJszqiP0bBH4gOEu4vGtcDPPVJ22dSkdoEdRGl3f2c5101`) is sensitive
   - Never commit this token to version control
   - Keep it in Cursor's local settings only
   - Consider rotating the token periodically

2. **Token Storage:**
   - The token is stored in Cursor's user settings (not in project files)
   - This keeps it secure and separate from your codebase

3. **Access Control:**
   - The API token grants access to your Hostinger account
   - Only use it in trusted environments
   - Revoke and regenerate if compromised

## Usage Examples

Once set up, you can ask the AI assistant things like:

- "Deploy the frontend to Hostinger"
- "Check the status of my Hostinger hosting"
- "List files in my public_html directory"
- "Upload the dist folder to Hostinger"
- "Show me my Hostinger domains"

## Troubleshooting

### MCP Server Not Connecting

1. **Check Node.js:**
   - Ensure Node.js is installed (`node --version`)
   - The server uses `npx`, which requires Node.js

2. **Check Network:**
   - Ensure you have internet connection
   - The server needs to download `hostinger-api-mcp@latest`

3. **Check Token:**
   - Verify the API token is correct
   - Check if the token has expired or been revoked
   - Generate a new token in Hostinger if needed

4. **Check Cursor Logs:**
   - Open Cursor's developer tools (Help → Toggle Developer Tools)
   - Check the Console for MCP-related errors

### Token Issues

If you need to regenerate your API token:
1. Log into Hostinger control panel
2. Go to API settings
3. Generate a new token
4. Update the token in Cursor settings
5. Restart Cursor

### Permission Issues

If operations fail:
- Verify the API token has necessary permissions
- Check Hostinger account permissions
- Ensure your hosting plan supports API access

## Alternative: Manual Deployment

If MCP setup doesn't work, you can still use:
- GitHub Actions (already configured)
- FTP/SFTP manual upload
- Hostinger File Manager

See `HOSTINGER_DEPLOYMENT.md` for manual deployment options.

## Next Steps

After setting up MCP:
1. Test the connection by asking the AI to check your Hostinger status
2. Try deploying your frontend using MCP
3. Explore available Hostinger operations
4. Integrate MCP into your workflow

## Support

For issues with:
- **MCP Server:** Check Cursor documentation or MCP server repository
- **Hostinger API:** Contact Hostinger support
- **Deployment:** See `HOSTINGER_DEPLOYMENT.md`

---

**Note:** This configuration is for Cursor IDE only. It doesn't affect your project files or deployment processes. The MCP server runs locally in Cursor and communicates with Hostinger's API.

