// Bot configuration and utility functions
const { EmbedBuilder } = require('discord.js');
const config = require('./config');

class BotUtils {
    /**
     * Create a standard embed with bot branding
     * @param {string} title - Embed title
     * @param {string} description - Embed description
     * @param {string} color - Embed color (hex)
     * @returns {EmbedBuilder}
     */
    static createEmbed(title, description, color = '#0099ff') {
        return new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setTimestamp()
            .setFooter({ 
                text: `${config.botName} | Powered by Discord.js`,
                iconURL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
            });
    }

    /**
     * Create an error embed
     * @param {string} message - Error message
     * @returns {EmbedBuilder}
     */
    static createErrorEmbed(message) {
        return this.createEmbed('❌ Error', message, '#ff0000');
    }

    /**
     * Create a success embed
     * @param {string} message - Success message
     * @returns {EmbedBuilder}
     */
    static createSuccessEmbed(message) {
        return this.createEmbed('✅ Success', message, '#00ff00');
    }

    /**
     * Create a warning embed
     * @param {string} message - Warning message
     * @returns {EmbedBuilder}
     */
    static createWarningEmbed(message) {
        return this.createEmbed('⚠️ Warning', message, '#ffaa00');
    }

    /**
     * Check if user has required permissions
     * @param {GuildMember} member - Guild member
     * @param {string[]} permissions - Array of permission names
     * @returns {boolean}
     */
    static hasPermissions(member, permissions) {
        return permissions.every(permission => member.permissions.has(permission));
    }

    /**
     * Format uptime into readable string
     * @param {number} uptime - Uptime in milliseconds
     * @returns {string}
     */
    static formatUptime(uptime) {
        const seconds = Math.floor(uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours % 24 > 0) parts.push(`${hours % 24}h`);
        if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
        if (seconds % 60 > 0) parts.push(`${seconds % 60}s`);

        return parts.join(' ') || '0s';
    }

    /**
     * Validate message content
     * @param {string} content - Message content
     * @returns {boolean}
     */
    static isValidMessage(content) {
        return content && content.trim().length > 0 && content.length <= 2000;
    }
}

module.exports = BotUtils;
