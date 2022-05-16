const url        = require(`../../../config/urls.json`)
const input      = require(`../data/inputData.json`)
const expected   = require(`../data/expectedData.json`)
const request    = require(`supertest`)
const superagent = require(`superagent`)
require(`superagent-retry`)(superagent)

const {
  Severity
} = require(`jest-allure/dist/Reporter`)

import {
  defineFeature,
  loadFeature
} from 'jest-cucumber'

import {
  givenISendAMessage,
  whenTheMessageIsValidated
} from './re_using.step.js'

const feature = loadFeature(`sources/tests/integrations/features/sample_test_promise.feature`)

defineFeature(feature, test => {

  beforeEach(() => {
    //
  })

  test(`Validate user details`, ({
    given,
    when,
    then
  }) => {
    givenISendAMessage(given)
    whenTheMessageIsValidated(when)
    then(`should respond with the User details`, () => {
      //
      reporter
        .description(`Validate user details`)
        .story(`HIST-001`)
        .severity(Severity.Blocker)
        .testId(`CT-001`)
      //
      return request(url.baseURL)
        .get(`users/1`)
        .set(`Content-Type`, `application/json`)
        .retry(3)
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.data).toMatchObject(expected.userid1)
        })
      //
    })
  })

  test(`Validate new user creation`, ({
    then
  }) => {
    then(`should create a new User`, () => {
      //
      reporter
        .description(`Validate new user creation`)
        .story(`HIST-002`)
        .severity(Severity.Critical)
        .testId(`CT-002`)
      //
      return request(url.baseURL)
        .post(`users`)
        .set(`Content-Type`, `application/json`)
        .send(input.createUser)
        .retry(3)
        .then(response => {
          expect(response.statusCode).toBe(201)
          expect(response.body.name).toBe(expected.createdUser.name)
          expect(response.body.job).toBe(expected.createdUser.job)
          expect(response.body).toHaveProperty(`id`)
          expect(response.body).toHaveProperty(`createdAt`)
        })
      //
    })
  })

  test(`Validate User data update`, ({
    then
  }) => {
    then(`should update the current user with all data`, () => {
      //
      reporter
        .description(`Validate User data update`)
        .story(`HIST-003`)
        .severity(Severity.Minor)
        .testId(`CT-003`)
      //
      return request(url.baseURL)
        .put(`users/2`)
        .set(`Content-Type`, `application/json`)
        .send(input.updateUser)
        .retry(3)
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.name).toBe(expected.updatedUser.name)
          expect(response.body.job).toBe(expected.updatedUser.job)
          expect(response.body).toHaveProperty(`updatedAt`)
        })
      //
    })
  })

  test(`Validate the update of some user data`, ({
    then
  }) => {
    then(`should update the current user with some data`, () => {
      //
      reporter
        .description(`Validate the update of some user data`)
        .story(`HIST-004`)
        .severity(Severity.Normal)
        .testId(`CT-004`)
      //
      return request(url.baseURL)
        .patch(`users/2`)
        .set(`Content-Type`, `application/json`)
        .send(input.patchUser)
        .retry(3)
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.job).toBe(expected.patchedUser.job)
          expect(response.body).toHaveProperty(`updatedAt`)
        })
      //
    })
  })

  test(`Validate the user deletion`, ({
    then
  }) => {
    then(`should delete a user`, () => {
      //
      reporter
        .description(`Validate the user deletion`)
        .story(`HIST-005`)
        .severity(Severity.Trivial)
        .testId(`CT-005`)
      //
      return request(url.baseURL)
        .delete(`users/2`)
        .set(`Content-Type`, `application/json`)
        .retry(3)
        .then(response => {
          expect(response.statusCode).toBe(204)
        })
      //
    })
  })
})