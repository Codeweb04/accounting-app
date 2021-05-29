console.log('Main process working')
const electron = require('electron')
var cmd = process.argv[1]
const fs = require('fs')


const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
const ejse = require('ejs-electron')

function createWindow() {
    let win = new BrowserWindow({ webPreferences: { nodeIntegration: true } })
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/src/index.ejs'),
        protocol: 'file',
        slashes: true
    }))
    win.on('closed', () => win = null)

    let win2 = new BrowserWindow({ webPreferences: { nodeIntegration: true }, height: 200, width: 400 })
    win2.loadURL(url.format({
        pathname: path.join(__dirname, '/src/uemail.ejs'),
        protocol: 'file',
        slashes: true
    }))
}

app.on('ready', createWindow)