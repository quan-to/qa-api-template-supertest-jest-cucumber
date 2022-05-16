const url        = require(`../../../../config/urls.json`)
const input      = require(`../../data/inputData.json`)
const expected   = require(`../../data/expectedData.json`)
const request    = require(`supertest`)
const superagent = require(`superagent`)
require(`superagent-retry`)(superagent)

const {
  Severity
} = require('jest-allure/dist/Reporter')

describe(`Test the Users API - Project #001`, () => {
  
  test(`It Should respond with the User details`, async () => {
    //
    reporter
      .description(`Validate user details`)
      .story(`HIST-001`)
      .severity(Severity.Blocker)
      .testId(`CT-001`)
    //
    let response = await request(url.baseURL)
      .get(`users/1`)
      .set(`Content-Type`, `application/json`)
      .retry(3)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toMatchObject(expected.userid1)
  })

  test(`It Should create a new User`, async () => {
    //
    reporter
      .description(`Validate new user creation`)
      .story(`HIST-002`)
      .severity(Severity.Critical)
      .testId(`CT-002`)
    //
    const response = await request(url.baseURL).post(`users`)
      .set(`Content-Type`, `application/json`)
      .send(input.createUser)
      .retry(3)
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(expected.createdUser.name)
    expect(response.body.job).toBe(expected.createdUser.job)
    expect(response.body).toHaveProperty(`id`)
    expect(response.body).toHaveProperty(`createdAt`)
  })

  test(`It Should update the current user with all data`, async () => {
    //
    reporter
      .description(`Validate User data update`)
      .story(`HIST-003`)
      .severity(Severity.Minor)
      .testId(`CT-003`)
    //
    const response = await request(url.baseURL).put(`users/2`)
      .set(`Content-Type`, `application/json`)
      .send(input.updateUser)
      .retry(3)
    expect(response.statusCode).toBe(200)
    expect(response.body.name).toBe(expected.updatedUser.name)
    expect(response.body.job).toBe(expected.updatedUser.job)
    expect(response.body).toHaveProperty(`updatedAt`)
  })

  test(`It Should update the current user with some data`, async () => {
    //
    reporter
      .description(`Validate the update of some user data`)
      .story(`HIST-004`)
      .severity(Severity.Normal)
      .testId(`CT-004`)
    //
    const response = await request(url.baseURL).patch(`users/2`)
      .set(`Content-Type`, `application/json`)
      .send(input.patchUser)
      .retry(3)
    expect(response.statusCode).toBe(200)
    expect(response.body.job).toBe(expected.patchedUser.job)
    expect(response.body).toHaveProperty(`updatedAt`)
  })

  test(`It Should delete a user`, async () => {
    //
    reporter
      .description(`Validate the user deletion`)
      .story(`HIST-005`)
      .severity(Severity.Trivial)
      .testId(`CT-005`)
    //
    const response = await request(url.baseURL).delete(`users/2`)
      .set(`Content-Type`, `application/json`)
      .retry(3)
    expect(response.statusCode).toBe(204)
  })
})