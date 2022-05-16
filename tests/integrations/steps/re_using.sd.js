import {
    Demo
} from '../api/demo.js'

let demo
let msg
let sampleRegex = /[`~@$%^}[\]{|<>]/

export const givenISendAMessage = (given) => {
    given(/^I send a message (.*)$/, message => {
        demo = new Demo()
        expect(demo).not.toBeNull()
        msg = message
        expect(msg).not.toBe(``)
    })
}

export const whenTheMessageIsValidated = (when) => {
    when(`the message is validated`, () => {
        expect(demo.getMessage(msg)).toEqual(expect.not.stringMatching(sampleRegex))
    })
}

test(``, () => {
    // Keep this even if empty! If you remove test() promise, jest fails the test!
})