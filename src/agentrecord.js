const fs = require('fs')
const path = require('path')


agentName = document.getElementById("agent-name")
amountCollected = document.getElementById("total-amount")
calcBtn = document.getElementById("calculate-commission-btn")
fees = document.getElementById("agent-payment")
calcEntry = document.getElementById("percent-entry")

let pathName = path.join(__dirname, 'Agents')

fs.readFile(pathName +'/pointer.txt', 'utf-8', function (err, data){
    if (err) {
        return console.log(err)
    }    
    String(data)
    data = data.trim()
    agentName.innerHTML = data
    newPathn = path.join(pathName, `\\${data}`)
    newPath = newPathn.trim()
    console.log(newPath)
    displayAgentData(newPath)
})

function displayAgentData(newPath){
    try {
        console.log(newPath)
        let file = newPath 
        calcFiles = fs.readdirSync(file)
        payOut = 0
        calcFiles.forEach(element => {
            if (element !== "totalPay.txt") {
                console.log(element)
                fs.readFile(`${file}` + `/${element}`, (err, data) =>{
                    if(err) throw err
                    console.log(Number(data))
                    payOut = Number(payOut) + Number(data) 
                    amountCollected.innerHTML = Number(payOut)  
            })
            }
            
            
        })
        add(newPath)
    } catch (error) {
        console.error(error)
    }
}

async function add(newPath) {
    let file = newPath
    await amountCollected.innerHTML 
    fs.writeFile(file + '/totalPay.txt', amountCollected.innerHTML, (err) =>{
        if(err) throw err
        console.log(`payment amount is: ${payOut}`)
        
    })
}

calcBtn.addEventListener('click', async () => {
    await amountCollected.innerHTML
    commission = (Number(calcEntry.value) / 100) * Number(amountCollected.innerHTML)
    fees.innerHTML = commission
})