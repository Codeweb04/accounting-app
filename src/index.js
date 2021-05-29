const fs = require('fs')
const path = require('path')
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow


clientList = document.getElementById("client-list")

let pathName = path.join(__dirname, 'Files')

files = fs.readdirSync(pathName)


files.forEach(element => {
    if (element !== "pointer.txt") {
        listItem = document.createElement('li')
        listItem.innerHTML = `<a class = "a-link" href = "#" onclick = "myFunction(event)"> ${element} </a> `
        clientListItem = listItem.classList.add("client-list-item")
        clientListItem = listItem.classList.add("list-group-item")
        clientList.appendChild(listItem)             
    }
})
0
function myFunction(event) {
    variable = event.target.innerHTML
    console.log(variable)

    fs.writeFileSync(pathName + '/pointer.txt', variable, (err) => {
            if (err) {
                return console.log(err)
            }
            console.log("pointer file was created")
        }) 

    event.target.setAttribute('href', 'clientinfo.ejs')
}




