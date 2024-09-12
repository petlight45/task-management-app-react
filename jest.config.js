export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        // process `*.tsx` files with `ts-jest`
    },
    rootDir: 'src',
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
        '^@app/(.*)$': '<rootDir>/$1',
    },
    testMatch: [
        '**/?(*.)+(test).ts',
    ],
    globals: {
        'ts-jest': {
            useESM: true,
            isolatedModules: true, // Disable type-checking
        },
    },
    collectCoverage: true, // Enable coverage collection
    collectCoverageFrom: [
        '**/*.ts', // Adjust this pattern to include your source files
        '!src/**/__tests__/**', // Exclude test files
    ],
    coverageDirectory: 'coverage', // Directory where coverage reports will be saved
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
