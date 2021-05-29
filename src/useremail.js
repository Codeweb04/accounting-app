const fs = require('fs')
const path = require('path')
const url = require('url')
const electron = require('electron')

pathName = path.join(__dirname, 'User')

emailInput = document.getElementById("email-input")
emailBtn = document.getElementById("email-btn")

async function emailSave() {
    try {
        await emailInput.value
        let file = path.join(pathName, 'uemail.txt')
        fs.writeFile(file, emailInput.value, (err) => {
        if(err) throw err
    })
    } catch (error) {
        console.error(error)
    }
}
    