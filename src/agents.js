const fs = require('fs')
const path = require('path')

agentList = document.getElementById("agents-list")

let pathName = path.join(__dirname, 'Agents')

files = fs.readdirSync(pathName)


files.forEach(element => {
    if (element !== "pointer.txt") {
        listItem = document.createElement('li')
        listItem.innerHTML = `<a class = "a-link" href = "#" onclick = "agentFunction(event)"> ${element} </a> `
        agentListItem = listItem.classList.add("client-list-item")
        agentListItem = listItem.classList.add("list-group-item")
        agentList.appendChild(listItem)             
    }
})

function agentFunction(event) {
    variable = event.target.innerHTML
    console.log(variable)

    fs.writeFileSync(pathName + '/pointer.txt', variable, (err) => {
            if (err) {
                return console.log(err)
            }
            console.log("pointer file was created")
        }) 

    event.target.setAttribute('href', 'agentinfo.ejs')
}