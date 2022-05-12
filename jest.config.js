module.exports = {
    bail: true,
    coveragePathIgnorePatterns: [
        `<rootDir>/node_modules/`
    ],
    reporters: [
        `default`,
        `jest-allure`,
        [
            './node_modules/jest-html-reporter/',
            {
                'append': false,
                'boilerplate': null,
                'customScriptPath': null,
                'dateFormat': `dd-mm-yyyy HH:MM:ss`,
                'executionTimeWarningThreshold': 5,
                'includeConsoleLog': true,
                'includeFailureMsg': true,
                'includeSuiteFailure': true,
                'logo': `../../config/img/robot.png`,
                'outputPath': `jest-reports/jest-simple-report/index.html`,
                'pageTitle': `Jest Simple Report`,
                'sort': `default`,
                'statusIgnoreFilter': null,
                'styleOverridePath': null,
                'useCssFile': true
            }
        ],
        [
            'jest-html-reporters',
            {
                'expand': true,
                'filename': `report.html`,
                'logoImgPath': `./config/img/robot.png`,
                'openReport': false,
                'pageTitle': `Jest HTML Reporters`,
                'publicPath': `./jest-reports`
            }
        ],
        [
            `jest-stare`,
            {
                'additionalResultsProcessors': [
                    `jest-cucumber`
                ],
                'coverageLink': `../../jest-reports/jest-simple-report/index.html`, // This is an example!
                'disableCharts': false,
                'hideFailing': false,
                'hidePassing': false,
                'hidePending': false,
                'log': true,
                'jestGlobalConfigJson': `globalStuff.json`,
                'jestStareConfigJson': `jest-stare.json`,
                'reportHeadline': `Report Headline`,
                'reportSummary': true,
                'reportTitle': `Jest Stare Report`,
                'resultHtml': `index.html`,
                'resultJson': `jest-results.json`,
                'resultDir': `jest-reports/jest-stare`
            }
        ]
    ],
    moduleFileExtensions: [
        `ts`,
        `tsx`,
        `js`,
        `jsx`,
        `json`,
        `node`
    ],
    preset: `ts-jest`,
    setupFilesAfterEnv: [
        `jest-allure/dist/setup`,
        '<rootDir>/jest-allure/dist/setup/testSetup.js'
    ],
    testEnvironment: `node`,
    testMatch: [
        `**/*.sd.js`
    ],
    testPathIgnorePatterns: [
        `/node_modules/`
    ],
    testRunner: `jasmine2`,
    transform: {
        '^.+\\.jsx?$': `babel-jest`,
        '^.+\\.tsx?$': `ts-jest`
    },
    verbose: true,
    watchPathIgnorePatterns: [
        `<rootDir>/node_modules/`
    ]
}