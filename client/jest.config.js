module.exports = {
  collectCoverage: false,
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
  ],
  globals: {
    window: true,
  },
  collectCoverageFrom: ['**/*.jsx', '**/*.js', '**/*.tsx', '**/*.ts'],
  moduleDirectories: ['node_modules', '.', 'src'],
  testMatch: ['**/*.test.{js,jsx,ts,tsx}'],
  coverageReporters: [
    'json',
    'lcov',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts', 'jest-canvas-mock'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/public/',
    '/dist/',
    'jest.config.js',
    'package.json',
    'webpack.config.js',
    '/coverage/',
    'index.tsx',
    'src/store/index.ts',
    'src/store/sagas.ts',
  ],
  modulePaths: [
    '<rootDir>',
    '/src',
  ],
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@constants(.*)$': '<rootDir>/src/constants$1',
    '^@helpers(.*)$': '<rootDir>/src/helpers$1',
    '^@src(.*)$': '<rootDir>/src$1',
  },
  testEnvironment: 'jsdom',
};
