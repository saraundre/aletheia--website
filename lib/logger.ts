// Comprehensive logging utility for debugging Render deployment
export interface LogContext {
  timestamp: string;
  environment: string;
  nodeVersion: string;
  platform: string;
  arch: string;
  memoryUsage: NodeJS.MemoryUsage;
  uptime: number;
  pid: number;
  renderInfo?: {
    serviceId?: string;
    serviceName?: string;
    environmentId?: string;
    environmentName?: string;
    buildId?: string;
    commitId?: string;
    branch?: string;
    pullRequestId?: string;
    isPreview?: boolean;
  };
}

export class Logger {
  private static instance: Logger;
  private logs: Array<{ level: string; message: string; context?: any; timestamp: string }> = [];

  private constructor() {
    this.log('INFO', 'Logger initialized', this.getSystemInfo());
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private getSystemInfo(): LogContext {
    const context: LogContext = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      pid: process.pid,
    };

    // Render-specific environment variables
    if (process.env.RENDER) {
      context.renderInfo = {
        serviceId: process.env.RENDER_SERVICE_ID,
        serviceName: process.env.RENDER_SERVICE_NAME,
        environmentId: process.env.RENDER_ENVIRONMENT_ID,
        environmentName: process.env.RENDER_ENVIRONMENT_NAME,
        buildId: process.env.RENDER_BUILD_ID,
        commitId: process.env.RENDER_COMMIT_ID,
        branch: process.env.RENDER_BRANCH,
        pullRequestId: process.env.RENDER_PULL_REQUEST_ID,
        isPreview: process.env.RENDER_IS_PREVIEW === 'true',
      };
    }

    return context;
  }

  public log(level: string, message: string, context?: any): void {
    const logEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };

    this.logs.push(logEntry);

    // Console output with color coding
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[36m',  // Cyan
      DEBUG: '\x1b[35m', // Magenta
      RESET: '\x1b[0m',  // Reset
    };

    const color = colors[level as keyof typeof colors] || colors.INFO;
    console.log(`${color}[${level}]${colors.RESET} ${message}`);
    
    if (context) {
      console.log(`${color}Context:${colors.RESET}`, JSON.stringify(context, null, 2));
    }
  }

  public error(message: string, context?: any): void {
    this.log('ERROR', message, context);
  }

  public warn(message: string, context?: any): void {
    this.log('WARN', message, context);
  }

  public info(message: string, context?: any): void {
    this.log('INFO', message, context);
  }

  public debug(message: string, context?: any): void {
    this.log('DEBUG', message, context);
  }

  public logEnvironmentVariables(): void {
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      RENDER: process.env.RENDER,
      RENDER_SERVICE_ID: process.env.RENDER_SERVICE_ID,
      RENDER_SERVICE_NAME: process.env.RENDER_SERVICE_NAME,
      RENDER_ENVIRONMENT_ID: process.env.RENDER_ENVIRONMENT_ID,
      RENDER_ENVIRONMENT_NAME: process.env.RENDER_ENVIRONMENT_NAME,
      RENDER_BUILD_ID: process.env.RENDER_BUILD_ID,
      RENDER_COMMIT_ID: process.env.RENDER_COMMIT_ID,
      RENDER_BRANCH: process.env.RENDER_BRANCH,
      RENDER_PULL_REQUEST_ID: process.env.RENDER_PULL_REQUEST_ID,
      RENDER_IS_PREVIEW: process.env.RENDER_IS_PREVIEW,
      NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
      VERCEL_URL: process.env.VERCEL_URL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    };

    this.info('Environment Variables', envVars);
  }

  public logBuildInfo(): void {
    const buildInfo = {
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd(),
      env: process.env.NODE_ENV,
      memoryUsage: process.memoryUsage(),
    };

    this.info('Build Information', buildInfo);
  }

  public logRequestInfo(req: any): void {
    const requestInfo = {
      method: req.method,
      url: req.url,
      headers: req.headers,
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection?.remoteAddress,
      timestamp: new Date().toISOString(),
    };

    this.debug('Request Information', requestInfo);
  }

  public getLogs(): Array<{ level: string; message: string; context?: any; timestamp: string }> {
    return [...this.logs];
  }

  public exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// CommonJS export for Node.js scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Logger, logger, LogContext };
} 