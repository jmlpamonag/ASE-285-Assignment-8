'use strict'
const fs = require('fs');
const bcrypt = require('bcrypt')
const {readFile, writeFile, hash} = require('./utility')

async function toHash(password) {
    try {
        let hashedPassword = await bcrypt.hash(password, 10).then((r) => {
            return r;
        });
        return hashedPassword;
    } catch (e) {
        console.log(e)
    }
}

async function makepassword(passwordFileName, passwordEncFileName) {

    try {
        let file = readFile(passwordFileName)
        let encryptedFile = [];

        for (let i in file) {
            const line = file[i].split(':')

            let email = line[0]
            let password = line[1]
            const hashedPassword = await bcrypt.hash(password, 10)

            let encryptedData = email + ':' + hashedPassword;

            encryptedFile.push(encryptedData)
        }

        writeFile(encryptedFile, passwordEncFileName)
    } catch (e) {
        console.log(e)
    }

}


if (require.main === module) {
    makepassword('./passwordtest.txt', './password.enc.txt')
}

module.exports = {makepassword, toHash};