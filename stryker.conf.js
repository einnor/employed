module.exports = function (config) {
  config.set({
    mutator: 'javascript',
    packageManager: 'npm',
    files: [
      './**',
      '!.stryker-tmp/**',
      '!node_modules/**',
      '!coverage/**',
      '!test/integration/**',
    ],
    mutate: ['controllers/**/*.js'],
    testRunner: 'jest',
    transpilers: [],
    reporter: ['html', 'clear-text', 'progress'],
    coverageAnalysis: 'off',
    jest: {
      config: require('./jest.config.js'),
    },
    logLevel: 'all',
    thresholds: { high: 95, low: 85, break: 56 },
    timeoutMs: 60000,
    timeoutFactor: 4,
    maxConsurrentTestRunners: 6,
  });
};
