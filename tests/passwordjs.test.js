// Make tests when you have sub functions in this module.
// passwordjs() is tested by acceptance tests (acceptance.bat)
const {verifyPassword, passwordjs} = require('../src/passwordjs')
const {toHash} = require('../src/makepassword')

describe('verify user', () => {
    test('', async () => {
        const userEmail = 'sm.cho@hello.com'
        const userPassword = '123456'

        let email = 'sm.cho@hello.com'
        const encryptedPassword = await toHash(userPassword)

        let verified = await verifyPassword(userEmail, userPassword, email, encryptedPassword)

        expect(verified).toBe(true)

    })
})