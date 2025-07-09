// Configuration file for Discord bot
require('dotenv').config();

const config = {
    // Bot token from environment variables
    token: process.env.DISCORD_TOKEN || process.env.TOKEN,
    
    // Bot configuration
    botName: process.env.BOT_NAME || 'Discord Bot',
    prefix: process.env.PREFIX || '!',
    
    // Server configuration for Replit
    port: process.env.PORT || 5000,
    
    // Bot settings
    maxMessageLength: 2000,
    commandCooldown: 3000, // 3 seconds
    
    // Embed colors
    colors: {
        success: '#00ff00',
        error: '#ff0000',
        warning: '#ffaa00',
        info: '#0099ff',
        primary: '#7289da'
    },
    
    // Feature flags
    features: {
        logging: true,
        commandLogging: true,
        autoReconnect: true,
        statusRotation: true
    },
    
    // Rate limiting
    rateLimits: {
        commands: {
            max: 5,
            window: 60000 // 1 minute
        }
    }
};

// Validate required configuration
if (!config.token) {
    console.error('❌ DISCORD_TOKEN environment variable is required!');
    console.error('Please set your Discord bot token in the environment variables.');
    process.exit(1);
}

// Log configuration (without sensitive data)
console.log('🔧 Bot Configuration:');
console.log(`   Bot Name: ${config.botName}`);
console.log(`   Prefix: ${config.prefix}`);
console.log(`   Port: ${config.port}`);
console.log(`   Token: ${'*'.repeat(config.token.length - 4)}${config.token.slice(-4)}`);

module.exports = config;
