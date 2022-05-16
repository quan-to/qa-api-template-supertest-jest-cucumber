const url        = require(`../../../../../../config/urls.json`)
const input      = require(`../../../../data/inputData.json`)
const expected   = require(`../../../../data/expectedData.json`)
const request    = require(`supertest`)
const superagent = require(`superagent`)
require(`superagent-retry`)(superagent)

const {
    Severity
} = require('jest-allure/dist/Reporter')

describe(`Test the Users API - Project #003.1.1`, () => {

    test(`It Should respond with the User details`, done => {
        //
        reporter
            .description(`Validate user details`)
            .story(`HIST-001`)
            .severity(Severity.Blocker)
            .testId(`CT-001`)
        //
        request(url.baseURL).get(`users/1`)
            .set(`Content-Type`, `application/json`)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body.data).toMatchObject(expected.userid1)
                done()
            })
        //
    })

    test(`It Should create a new User`, done => {
        //
        reporter
            .description(`Validate new user creation`)
            .story(`HIST-002`)
            .severity(Severity.Critical)
            .testId(`CT-002`)
        //
        request(url.baseURL).post(`users`)
            .set(`Content-Type`, `application/json`)
            .send(input.createUser)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(201)
                expect(response.body.name).toBe(expected.createdUser.name)
                expect(response.body.job).toBe(expected.createdUser.job)
                expect(response.body).toHaveProperty(`id`)
                expect(response.body).toHaveProperty(`createdAt`)
                done()
            })
        //
    })

    test(`It Should update the current user with all data`, done => {
        //
        reporter
            .description(`Validate User data update`)
            .story(`HIST-003`)
            .severity(Severity.Minor)
            .testId(`CT-003`)
        //
        request(url.baseURL).put(`users/2`)
            .set(`Content-Type`, `application/json`)
            .send(input.updateUser)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body.name).toBe(expected.updatedUser.name)
                expect(response.body.job).toBe(expected.updatedUser.job)
                expect(response.body).toHaveProperty(`updatedAt`)
                done()
            })
        //
    })

    test(`It Should update the current user with some data`, done => {
        //
        reporter
            .description(`Validate the update of some user data`)
            .story(`HIST-004`)
            .severity(Severity.Normal)
            .testId(`CT-004`)
        //
        request(url.baseURL).patch(`users/2`)
            .set(`Content-Type`, `application/json`)
            .send(input.patchUser)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body.job).toBe(expected.patchedUser.job)
                expect(response.body).toHaveProperty(`updatedAt`)
                done()
            })
        //
    })

    test(`It Should delete a user`, done => {
        //
        reporter
            .description(`Validate the user deletion`)
            .story(`HIST-005`)
            .severity(Severity.Trivial)
            .testId(`CT-005`)
        //
        request(url.baseURL).delete(`users/2`)
            .set(`Content-Type`, `application/json`)
            .retry(3)
            .then(response => {
                expect(response.statusCode).toBe(204)
                done()
            })
        //
    })
})