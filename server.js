const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Import logger with fallback
let logger;
try {
  const loggerModule = require('./lib/logger');
  logger = loggerModule.logger;
} catch (error) {
  // Fallback logger if the module is not available
  logger = {
    info: (message, data) => console.log(`[INFO] ${message}`, data || ''),
    debug: (message, data) => console.log(`[DEBUG] ${message}`, data || ''),
    error: (message, data) => console.error(`[ERROR] ${message}`, data || ''),
    logEnvironmentVariables: () => console.log('[INFO] Environment variables logged'),
    logRequestInfo: (req) => console.log(`[DEBUG] Request: ${req.method} ${req.url}`)
  };
}

// Log startup information
logger.info('Custom server starting...', {
  nodeVersion: process.version,
  platform: process.platform,
  arch: process.arch,
  cwd: process.cwd(),
});

// Log all environment variables
logger.logEnvironmentVariables();

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

logger.info('Server configuration', {
  dev,
  hostname,
  port,
  nodeEnv: process.env.NODE_ENV,
});

// Prepare the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  logger.info('Next.js app prepared successfully');

  createServer(async (req, res) => {
    try {
      // Log request information
      logger.logRequestInfo(req);

      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      logger.debug('Request details', {
        pathname,
        query,
        method: req.method,
        userAgent: req.headers['user-agent'],
        referer: req.headers.referer,
      });

      // Handle the request
      await handle(req, res, parsedUrl);

      // Log response information
      logger.debug('Response sent', {
        statusCode: res.statusCode,
        pathname,
        method: req.method,
      });

    } catch (err) {
      logger.error('Request handling error', {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
      });

      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) {
      logger.error('Server failed to start', {
        error: err.message,
        stack: err.stack,
        port,
        hostname,
      });
      throw err;
    }

    logger.info('Server started successfully', {
      port,
      hostname,
      url: `http://${hostname}:${port}`,
      environment: process.env.NODE_ENV,
      render: process.env.RENDER ? 'true' : 'false',
    });

    // Log Render-specific information if available
    if (process.env.RENDER) {
      logger.info('Render deployment detected', {
        serviceId: process.env.RENDER_SERVICE_ID,
        serviceName: process.env.RENDER_SERVICE_NAME,
        environmentId: process.env.RENDER_ENVIRONMENT_ID,
        environmentName: process.env.RENDER_ENVIRONMENT_NAME,
        buildId: process.env.RENDER_BUILD_ID,
        commitId: process.env.RENDER_COMMIT_ID,
        branch: process.env.RENDER_BRANCH,
        isPreview: process.env.RENDER_IS_PREVIEW,
      });
    }
  });
}).catch((err) => {
  logger.error('Failed to prepare Next.js app', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    reason: reason?.message || reason,
    stack: reason?.stack,
    promise: promise.toString(),
  });
  process.exit(1);
});

// Log memory usage periodically
setInterval(() => {
  const memUsage = process.memoryUsage();
  logger.debug('Memory usage', {
    rss: `${Math.round(memUsage.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)} MB`,
    external: `${Math.round(memUsage.external / 1024 / 1024)} MB`,
  });
}, 60000); // Log every minute 