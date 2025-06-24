import { NextRequest, NextResponse } from 'next/server';
import { logger } from '../../../lib/logger';

export async function GET(request: NextRequest) {
  try {
    logger.info('Debug API route accessed', {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
    });

    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        HOSTNAME: process.env.HOSTNAME,
        PWD: process.env.PWD,
        CWD: process.cwd(),
      },
      render: {
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
      },
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        pid: process.pid,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },
      request: {
        url: request.url,
        method: request.method,
        headers: Object.fromEntries(request.headers.entries()),
        ip: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
      },
      build: {
        buildTime: process.env.BUILD_TIME,
        buildId: process.env.BUILD_ID,
      },
      nextjs: {
        version: require('next/package.json').version,
        reactVersion: require('react/package.json').version,
      },
    };

    logger.info('Debug information generated', {
      hasRenderEnv: !!process.env.RENDER,
      nodeEnv: process.env.NODE_ENV,
      port: process.env.PORT,
    });

    return NextResponse.json(debugInfo, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    logger.error('Debug API route error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: 'Failed to generate debug information',
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    logger.info('Debug API POST request', {
      body,
      url: request.url,
      method: request.method,
    });

    // Echo back the request body with additional debug info
    const response = {
      received: body,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      render: !!process.env.RENDER,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    logger.error('Debug API POST error', {
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      {
        error: 'Failed to process POST request',
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 