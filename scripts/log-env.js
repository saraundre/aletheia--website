console.log('🚀 === BUILD ENVIRONMENT ===');
console.log('📅 Build Time:', new Date().toISOString());
console.log('🔧 Node Version:', process.version);
console.log('💻 Platform:', process.platform);
console.log('🏗️  Architecture:', process.arch);
console.log('📁 Working Directory:', process.cwd());
console.log('');

console.log('🌍 === ENVIRONMENT VARIABLES ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('HOSTNAME:', process.env.HOSTNAME);
console.log('PWD:', process.env.PWD);
console.log('');

console.log('🎯 === RENDER SPECIFIC ===');
console.log('RENDER:', process.env.RENDER);
console.log('RENDER_SERVICE_ID:', process.env.RENDER_SERVICE_ID);
console.log('RENDER_SERVICE_NAME:', process.env.RENDER_SERVICE_NAME);
console.log('RENDER_ENVIRONMENT_ID:', process.env.RENDER_ENVIRONMENT_ID);
console.log('RENDER_ENVIRONMENT_NAME:', process.env.RENDER_ENVIRONMENT_NAME);
console.log('RENDER_BUILD_ID:', process.env.RENDER_BUILD_ID);
console.log('RENDER_COMMIT_ID:', process.env.RENDER_COMMIT_ID);
console.log('RENDER_BRANCH:', process.env.RENDER_BRANCH);
console.log('RENDER_PULL_REQUEST_ID:', process.env.RENDER_PULL_REQUEST_ID);
console.log('RENDER_IS_PREVIEW:', process.env.RENDER_IS_PREVIEW);
console.log('');

console.log('📦 === DEPLOYMENT INFO ===');
console.log('Build Command: npm run build');
console.log('Start Command: npm start');
console.log('Publish Directory: (none - Next.js handles this)');
console.log('====================================='); 