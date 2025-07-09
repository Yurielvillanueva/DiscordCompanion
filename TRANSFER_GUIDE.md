# GhostBot Transfer Guide

## Files to Copy

### Core Bot Files
- `index.js` - Main bot entry point
- `bot.js` - Utility functions and embed helpers
- `config.js` - Bot configuration
- `keep_alive.js` - 24/7 uptime server
- `package.json` - Dependencies
- `.replit` - Replit configuration

### Commands (copy entire `commands/` folder)
- `ban.js` - Ban users with logging
- `clear.js` - Clear messages  
- `confess.js` - Anonymous confessions
- `hangman.js` - Interactive hangman game
- `help.js` - Command help system
- `kick.js` - Kick users with logging
- `ping.js` - Bot latency check
- `rant.js` - Dramatic therapist responses
- `stats.js` - Bot and database statistics
- `truthordare.js` - Truth or dare game
- `userinfo.js` - User information display
- `wouldyourather.js` - Would you rather questions

### Events (copy entire `events/` folder)
- `messageCreate.js` - Handle incoming messages
- `ready.js` - Bot startup and status rotation

### Database (copy entire `server/` folder)
- `server/db.js` - Database connection
- `server/storage.js` - Database operations

### Schema (copy entire `shared/` folder)  
- `shared/schema.js` - Database table definitions

### Utils (copy entire `utils/` folder)
- `utils/logger.js` - Logging system

### Documentation
- `replit.md` - Project documentation
- `TRANSFER_GUIDE.md` - This guide

## Environment Variables Needed

Create these secrets in your new GhostBot project:
- `DISCORD_TOKEN` - Your Discord bot token
- `DATABASE_URL` - PostgreSQL database URL (Replit will provide this)

## Setup Steps for GhostBot

1. **Create New Replit Project**
   - Choose Node.js template
   - Name it "GhostBot"

2. **Copy All Files**
   - Copy all files and folders listed above
   - Maintain the exact folder structure

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Environment Variables**
   - Add your Discord bot token as `DISCORD_TOKEN`
   - Enable PostgreSQL database (creates `DATABASE_URL` automatically)

5. **Update Bot Name (Optional)**
   - In `config.js`, change `BOT_NAME` to "GhostBot"
   - In `replit.md`, update project name and description

6. **Run the Bot**
   ```bash
   npm start
   ```

## Features Included

### Moderation Commands
- User banning/kicking with database logging
- Message clearing with permission checks
- Full moderation history tracking

### Fun Interactive Commands  
- Anonymous confession system
- Dramatic therapist rant responses
- Would You Rather questions with voting
- Truth or Dare with 40+ questions/dares
- Full hangman game with ASCII art

### Database System
- PostgreSQL integration with Drizzle ORM
- User and guild management
- Command usage statistics
- Moderation action logging

### Bot Features
- 24/7 uptime with keep-alive server
- Rotating status messages ("Listening to your confessions and rants")
- Rich embed responses with consistent branding
- Comprehensive error handling and logging
- Memory usage monitoring

## Status Configuration

The bot rotates between these statuses every 30 seconds:
- "Playing !help | X servers"
- "Listening to your confessions and rants"  
- "Watching X users"

Online status is set to 'online' (green indicator).

## Database Tables

The bot automatically creates these tables:
- `users` - Discord user information
- `guilds` - Server information and settings
- `guild_members` - User-server relationships
- `command_logs` - Command usage tracking
- `moderation_actions` - Moderation history

## Notes

- All commands are fully functional and tested
- Database integration is complete and working
- Error handling and logging are comprehensive
- The bot is production-ready for immediate deployment
- All code is documented and maintainable

Your GhostBot will have the exact same functionality as this Discord bot once transferred!