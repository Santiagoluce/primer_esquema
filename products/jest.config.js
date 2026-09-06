module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 10000,
  forceExit: true,
  clearMocks: true,
  detectOpenHandles: true
};
