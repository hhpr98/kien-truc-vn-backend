const path = require('path');
const fs = require('fs');

const logger = () => {
    const logFile = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });
    // Helper to timestamp log entries
    const getTimestamp = () => new Date().toISOString();
    // Override console methods
    ['log', 'info', 'warn', 'error'].forEach((method) => {
        const original = console[method];
        console[method] = (...args) => {
            const message = `[${getTimestamp()}] [${method.toUpperCase()}] ${args.join(' ')}\n`;
            logFile.write(message);             // Write to file
            original.apply(console, args);      // Still show in terminal
        };
    });

    process.on('uncaughtException', (err) => {
        console.error('[UNCAUGHT]', err.stack || err);
    });

    process.on('unhandledRejection', (reason) => {
        console.error('[UNHANDLED]', reason);
    });
};

module.exports = logger;
