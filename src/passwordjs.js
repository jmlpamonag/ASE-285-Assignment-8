'use strict'
const fs = require('fs');
const {readFile, writeFile, hash} = require('./utility');
const bcrypt = require('bcrypt')

function verifyPassword(userEmail, userPassword, email, encryptedPassword) {

    try {
        if (email === userEmail) {
            let verified = bcrypt.compareSync(userPassword, encryptedPassword);
            return verified;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e)
    }
}

function passwordjs() {
    if (process.argv.length != 5) {
        return 'false';
    }

    const encryptedFile = readFile(process.argv[2])
    const userEmail = String(process.argv[3])
    const userPassword = String(process.argv[4]) + '\r'

    // const encryptedFile = readFile('passwordtest.enc.txt')
    // const userEmail = 'henry.taylor@edu.com'
    // const userPassword = 'educatorbest'

    let verified;

    for (let i in encryptedFile) {
        let line = encryptedFile[i].split(':')
        if (userEmail === line[0]) {
            let email = line[0]
            let encryptedPassword = line[1]
            verified = verifyPassword(userEmail, userPassword, email, encryptedPassword);
        }
    }

    if (verified !== undefined | null) {
        if (verified == true) {
            return 'true'
        } else {
            return 'false'
        }
    } else {
        return 'false'
    }


}

if (require.main === module) {
    console.log(passwordjs()) // print out true or false
}

module.exports = {verifyPassword, passwordjs};