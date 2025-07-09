# Discord Bot - System Architecture Guide

## Overview

This is a Discord bot application built with Node.js and Discord.js v14. The bot provides moderation commands, utility functions, and server management capabilities. It's designed to run on Replit with 24/7 uptime support and includes comprehensive logging and error handling.

## System Architecture

### Core Architecture
- **Runtime**: Node.js with Discord.js v14 framework
- **Deployment Platform**: Replit (with keep-alive functionality)
- **Architecture Pattern**: Event-driven modular command system
- **Configuration Management**: Environment variables with fallback defaults

### Key Design Decisions
- **Modular Command System**: Commands are separated into individual files for maintainability
- **Event-Driven Architecture**: Discord events are handled through separate event files
- **Utility-First Approach**: Reusable components for embeds and common operations
- **Keep-Alive Server**: Express server ensures 24/7 uptime on Replit

## Key Components

### Bot Core (`index.js`)
- Main entry point and Discord client initialization
- Dynamic command and event loading
- Intent configuration for necessary Discord permissions

### Configuration System (`config.js`)
- Centralized configuration with environment variable support
- Feature flags for optional functionality
- Rate limiting and security settings
- Validation for required environment variables

### Database Layer
- **Database Connection (`server/db.js`)**: PostgreSQL connection via Drizzle ORM
- **Database Schema (`shared/schema.js`)**: User, guild, command, and moderation tracking
- **Storage Interface (`server/storage.js`)**: Abstracted database operations for bot data

### Command System (`commands/`)
- **Moderation Commands**: `ban.js`, `kick.js`, `clear.js` - Server moderation tools with database logging
- **Utility Commands**: `ping.js`, `userinfo.js`, `help.js`, `stats.js` - Bot utilities and information  
- **Fun Commands**: `confess.js`, `rant.js`, `wouldyourather.js`, `truthordare.js`, `hangman.js` - Interactive entertainment features
- **Database Integration**: All commands tracked with usage statistics and error logging
- Permission-based access control
- Consistent error handling and user feedback

### Event Handling (`events/`)
- **ready.js**: Bot initialization, guild database synchronization, status rotation
- **messageCreate.js**: Command parsing, user/guild management, database logging

### Utilities
- **Bot Utils (`bot.js`)**: Standardized embed creation and branding
- **Logger (`utils/logger.js`)**: File and console logging with color coding
- **Keep-Alive (`keep_alive.js`)**: Express server for Replit uptime monitoring

## Data Flow

1. **Bot Startup**: Environment validation → Database connection → Discord connection → Guild synchronization → Command/event loading
2. **Command Execution**: Message received → User/guild database sync → Prefix check → Permission validation → Command execution → Database logging
3. **Database Operations**: User management → Guild tracking → Command statistics → Moderation history
4. **Error Handling**: Try-catch blocks → Database error logging → User-friendly error messages → Detailed logging
5. **Monitoring**: Health endpoints → Database statistics → Uptime tracking → Memory usage logging

## External Dependencies

### Core Dependencies
- **discord.js**: Discord API interaction and gateway management
- **express**: HTTP server for keep-alive functionality
- **dotenv**: Environment variable management

### Discord API Integration
- Gateway intents for message content, guild members, and moderation
- Permission-based command access control
- Embed-rich user interactions

## Deployment Strategy

### Replit-Specific Features
- Keep-alive Express server on configurable port
- Health check endpoints (`/`, `/status`, `/ping`, `/health`)
- Memory usage monitoring
- Automatic reconnection handling

### Environment Requirements
- `DISCORD_TOKEN` or `TOKEN`: Required Discord bot token
- `BOT_NAME`: Optional bot name (default: "Discord Bot")
- `PREFIX`: Optional command prefix (default: "!")
- `PORT`: Optional server port (default: 5000)

### Monitoring and Logging
- File-based logging with daily rotation
- Console output with color coding
- Periodic stats logging (guilds, users, memory)
- Health endpoints for external monitoring

## Changelog

```
Changelog:
- July 08, 2025. Initial setup - Bot successfully running with basic intents
- July 08, 2025. Bot connected to Discord as "Orbit#8584" - Ready for server invites
- July 08, 2025. Database integration complete - PostgreSQL with user/guild tracking, command logging, and moderation history
- July 08, 2025. Gaming system added - Garden management with seeds, gear inventory, shop, and harvest mechanics
- July 08, 2025. Notification controls added - User request: Remove automatic notifications when items are in stock (notification controls added)
- July 08, 2025. Reset complete - All gaming commands removed, bot restored to basic functionality per user request
- July 08, 2025. Fun commands added - Anonymous confessions, therapist rant responses, would you rather questions, truth or dare, and interactive hangman game
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
User requested: Guide for Discord bot setup and usage
User request: Remove automatic notifications when items are in stock (notification controls added)
User request: Remove all gaming commands and reset to basic bot functionality
```