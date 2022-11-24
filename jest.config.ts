// jest.config.js
// const nextJest = require('next/jest')

import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  preset: "ts-jest",
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  transform: {
    // "^.+\\.(ts|tsx)$": "ts-jest"
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)