// Main entry point for the Discord bot
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const logger = require('./utils/logger');
const keepAlive = require('./keep_alive');

// Create Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Initialize commands collection
client.commands = new Collection();

// Load commands dynamically
const loadCommands = () => {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        
        if ('name' in command && 'execute' in command) {
            client.commands.set(command.name, command);
            logger.info(`Loaded command: ${command.name}`);
        } else {
            logger.warn(`Command at ${filePath} is missing required "name" or "execute" property.`);
        }
    }
};

// Load events dynamically
const loadEvents = () => {
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        logger.info(`Loaded event: ${event.name}`);
    }
};

// Error handling
client.on('error', error => {
    logger.error('Discord client error:', error);
});

client.on('warn', warning => {
    logger.warn('Discord client warning:', warning);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', error => {
    logger.error('Unhandled promise rejection:', error);
});

// Handle uncaught exceptions
process.on('uncaughtException', error => {
    logger.error('Uncaught exception:', error);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    logger.info('Received SIGINT, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('Received SIGTERM, shutting down gracefully...');
    client.destroy();
    process.exit(0);
});

// Initialize bot
const init = async () => {
    try {
        // Start keep-alive server for Replit
        keepAlive();
        
        // Load commands and events
        loadCommands();
        loadEvents();
        
        // Login to Discord
        await client.login(config.token);
        logger.info('Bot initialization completed successfully');
    } catch (error) {
        logger.error('Failed to initialize bot:', error);
        process.exit(1);
    }
};

// Start the bot
init();

module.exports = client;
