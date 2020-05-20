module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Test-Report',
        outputPath: 'Test-Report.html',
        includeFailureMsg: true,
      },
    ],
  ],
};
