interface LogLevel {
  info: (message: string, data?: any) => void;
  debug: (message: string, data?: any) => void;
  error: (message: string, data?: any) => void;
  logEnvironmentVariables: () => void;
  logRequestInfo: (req: any) => void;
}

class Logger implements LogLevel {
  private isDevelopment = process.env.NODE_ENV === 'development';

  info(message: string, data?: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }

  debug(message: string, data?: any) {
    if (this.isDevelopment) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] DEBUG: ${message}`, data ? JSON.stringify(data, null, 2) : '');
    }
  }

  error(message: string, data?: any) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, data ? JSON.stringify(data, null, 2) : '');
  }

  logEnvironmentVariables() {
    this.info('Environment Variables', {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      HOSTNAME: process.env.HOSTNAME,
      RENDER: process.env.RENDER,
      RENDER_SERVICE_ID: process.env.RENDER_SERVICE_ID,
      RENDER_SERVICE_NAME: process.env.RENDER_SERVICE_NAME,
    });
  }

  logRequestInfo(req: any) {
    this.debug('Request Info', {
      method: req.method,
      url: req.url,
      headers: {
        'user-agent': req.headers['user-agent'],
        'accept': req.headers.accept,
        'host': req.headers.host,
      },
    });
  }
}

export const logger = new Logger(); 