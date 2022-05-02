// To unit-test the function that generates 'password.enc.txt', you should
//  make sure the unit test does the following check.
// 1. Make sure password.enc.txt does not exist before running the function.
// 2. Make sure password.enc.txt does exist after running the function.
// 3. Make sure the contents of password.enc.txt has correct contents.
// For unit tests, you don't have to have a large input in the beginning.
// Start with smallest input, and add more contents in the input

const {makepassword, toHash} = require('../src/makepassword');
const u = require('../src/utility');
const {verifyPassword} = require('../src/passwordjs')
const bcrypt = require('bcrypt')
const fs = require('fs');
const {existsSync, readFile} = require("fs");

jest.setTimeout(15000)

describe("toHash should return a hashed password", () => {
    test('Check toHash(): if the email:password is converted into email:hashPassword', async () => {
        const input = 'p@s$w0rd'
        const output = 'p@s$w0rd'

        let encryptedPassword = await toHash(output)
        let validate = await bcrypt.compare(input, encryptedPassword)
        expect(validate).toBe(true)
    });
})

describe("makepassword should create file", () => {
    test('', async () => {
        const fileName = './password.txt'
        const encFileName = './password.enc.txt'

        // 1. Make sure password.enc.txt does not exist before running the function.
        if (fs.existsSync(encFileName)) {
            fs.unlinkSync(encFileName)
        }

        await makepassword(fileName, encFileName)

        let created = fs.existsSync(encFileName)

        expect(created).toBe(true)
    })

    test('Verify user email and password', async () => {
        const fileName = './password.txt'
        const encFileName = './password.enc.txt'

        let file = u.readFile(fileName)
        let encryptedFile = u.readFile(encFileName)

        for (let i in file) {
            let user = file[i].split(':')
            let enc = encryptedFile[i].split(':')

            let result = await verifyPassword(user[0], user[1], enc[0], enc[1])

            expect(result).toBe(true)
        }
    })


})