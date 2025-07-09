// Keep-alive server for Replit 24/7 uptime
const express = require('express');
const config = require('./config');
const logger = require('./utils/logger');

function keepAlive() {
    const app = express();
    
    // Middleware
    app.use(express.json());
    
    // Health check endpoint
    app.get('/', (req, res) => {
        const uptime = process.uptime();
        const memUsage = process.memoryUsage();
        
        res.json({
            status: 'online',
            uptime: uptime,
            uptimeFormatted: formatUptime(uptime),
            memory: {
                used: Math.round(memUsage.heapUsed / 1024 / 1024),
                total: Math.round(memUsage.heapTotal / 1024 / 1024),
                external: Math.round(memUsage.external / 1024 / 1024)
            },
            timestamp: new Date().toISOString(),
            bot: config.botName,
            version: '1.0.0'
        });
    });
    
    // Status endpoint
    app.get('/status', (req, res) => {
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString()
        });
    });
    
    // Ping endpoint
    app.get('/ping', (req, res) => {
        res.json({ 
            message: 'pong',
            timestamp: new Date().toISOString()
        });
    });
    
    // Health endpoint for monitoring services
    app.get('/health', (req, res) => {
        const healthCheck = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            env: process.env.NODE_ENV || 'development'
        };
        
        res.status(200).json(healthCheck);
    });
    
    // Metrics endpoint
    app.get('/metrics', (req, res) => {
        const metrics = {
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            cpu: process.cpuUsage(),
            platform: process.platform,
            nodeVersion: process.version,
            timestamp: new Date().toISOString()
        };
        
        res.json(metrics);
    });
    
    // 404 handler
    app.use((req, res) => {
        res.status(404).json({
            error: 'Not Found',
            message: 'Endpoint not found',
            timestamp: new Date().toISOString()
        });
    });
    
    // Error handler
    app.use((error, req, res, next) => {
        logger.error('Express error:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: 'Something went wrong',
            timestamp: new Date().toISOString()
        });
    });
    
    // Start server
    const server = app.listen(config.port, '0.0.0.0', () => {
        logger.info(`Keep-alive server running on port ${config.port}`);
        logger.info(`Health check available at: http://localhost:${config.port}/`);
    });
    
    // Graceful shutdown
    process.on('SIGTERM', () => {
        logger.info('SIGTERM received, shutting down keep-alive server...');
        server.close(() => {
            logger.info('Keep-alive server closed');
        });
    });
    
    return server;
}

/**
 * Format uptime into readable string
 * @param {number} seconds - Uptime in seconds
 * @returns {string}
 */
function formatUptime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours % 24 > 0) parts.push(`${hours % 24}h`);
    if (minutes % 60 > 0) parts.push(`${minutes % 60}m`);
    if (Math.floor(seconds % 60) > 0) parts.push(`${Math.floor(seconds % 60)}s`);
    
    return parts.join(' ') || '0s';
}

module.exports = keepAlive;
