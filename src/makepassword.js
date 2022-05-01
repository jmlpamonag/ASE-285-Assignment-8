const {readFile, writeFile, hash} = require("./utility");

'use strict'
const fs = require('fs');
const {readFile, writeFile, hash} = require('./utility')

function makepassword(passwordFileName, passwordEncFileName) {
    let file = readFile(passwordFileName);


}

if (require.main === module) {
    makepassword('./password.txt', './password.enc.txt')
}

module.exports = {makepassword};