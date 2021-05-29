var nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const { stringify } = require('querystring')

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    service: 'gmail',
    auth: {
        user: 'prashinmore@gmail.com',
        pass: 'Rupesh.01'
    }
})

clientName = document.getElementById("client-name")
agentNamepara = document.getElementById("agent-name")
phone = document.getElementById("phone-number")
address = document.getElementById("address")
email = document.getElementById("email")
amount = document.getElementById("amount")
interestRate = document.getElementById("interest-rate")
dueDate = document.getElementById("due-date")
totalPayment = document.getElementById("total-amount")
totalDays = document.getElementById("total-days")
entry = document.getElementById("payment-entry")
entryBtn = document.getElementById("payment-entry-btn")
balance = document.getElementById("balance")
fineInput = document.getElementById("fine-input")
fineBtn = document.getElementById("fine-btn")



let pathName = path.join(__dirname, `Files`)
let agentPathName = path.join(__dirname, 'Agents')

fs.readFile(pathName +'/pointer.txt', 'utf-8', function (err, data){
    if (err) {
        return console.log(err)
    }    
    String(data)
    data = data.trim()
    clientName.innerHTML = data
    newPathn = path.join(pathName, `\\${data}`)
    newPath = newPathn.trim()
    displayData(newPath)
    paymentBtnFunctionality(newPath)
    fineBtnFunctionality(newPath)
})

function displayData(newPath) {
    console.log(newPath)
    try {
    let file = newPath
    console.log('./')

    fs.readFile(file + '\\' + 'phonenumber.txt', function(err, data) {
        if(err){
            return console.log(err)
        }
        phone.innerHTML = data
        console.log(data)
    }) 
    fs.readFile(file + '/address.txt', function(err, data) {
        if(err){
            return console.log(err)
        }
        address.innerHTML = data
        console.log(data)
    }) 
    fs.readFile(file + '/email.txt', function(err, data) {
        if(err){
            return console.log(err)
        }
        email.innerHTML = data
    }) 
    fs.readFile(file + '/amount.txt', function(err, data) {
        if(err){
            return console.log(err)
        }
        amount.innerHTML = data
        console.log(data)

    }) 
    fs.readFile(file + '/interestRate.txt', phone.value, function(err, data) {
        if(err){
            return console.log(err)
        }
        interestRate.innerHTML = data
        console.log(data)
    }) 
    fs.readFile(file + '/dueDate.txt', dueDate.value, function(err, data) {
        if(err){
            return console.log(err)
        }
        dueDate.innerHTML = data
        calculateDays(newPath)
    }) 

    fs.readFile(file + '/totalPayment.txt', function(err, data) {
        if(err){
            return console.log(err)
        }
        totalPayment.innerHTML = data
        console.log(data)
        
    }) 
    fs.readFile(file + '/balance.txt', function(err, data) {
        if(err){
            return console.log(err)
        }
        balance.innerHTML = data
        console.log(data)
    })
} catch (error) {
    console.error(error)
}
} 

function paymentBtnFunctionality(newPath) {
    let file = newPath

    entryBtn.addEventListener('click', async (event) => {
            await balance.innerHTML
            await entry.value
            console.log(balance.innerHTML)
            remaining = Number(balance.innerHTML) - Number(entry.value)  
            if(remaining > 0) {
                fs.writeFile(file + '/balance.txt', remaining, (error) => {
                    if(error) {
                        return console.log(error)
                    }
                    
                    balance.innerHTML = remaining
                    sendMail(newPath, event)
                    updateAgentRecord(newPath)
                    
                })        
            } else {
                removeDirectory(newPath)
            }
            
            entry.value = ''
        })
    }

function fineBtnFunctionality(newPath) {
    let file = newPath

    fineBtn.addEventListener('click', async (event) => {
            await balance.innerHTML
            await fineInput.value
            console.log(balance.innerHTML)
            chrgFine = Number(balance.innerHTML) + Number(fineInput.value)  
            fs.writeFile(file + '/balance.txt', chrgFine, (error) => {
                if(error) {
                    return console.log(error)
                }
                balance.innerHTML = chrgFine
                sendMail(newPath, event)
            })
            fineInput.value = ''
    })
}


async function sendMail(newPath, event){
    let file = newPath
    await balance.innerHTML
    await entry.value
    await fineInput.value
    emailPath = path.join(__dirname, 'User/uemail.txt')
    console.log(emailPath)
    if (event.target.innerHTML === 'Make Payment') {
        text = `You have made a payment of ${entry.value} and your balance is ${balance.innerHTML}`
    } else if (event.target.innerHTML === 'Fine') {
        text = `You have been fined ${fineInput.value} and your balance is ${balance.innerHTML}`
    } else{
        console.log('error')
    }
    fs.readFile(file + '/email.txt', (err, data) => {
        if(err){
            console.log(err)
        }
        cEmail = data
        fs.readFile(emailPath, (err, data) => {
            if(err) throw err
            var mailOptions = {
                from: data,
                to: cEmail,
                subject: 'Payment made',
                text: text
            }
            transporter.sendMail(mailOptions, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log('Email sent')
                }
            })
        })
        
    })
}

async function calculateDays(newPath) {
    let file = newPath
    await dueDate.innerHTML
    end = new Date(dueDate.innerHTML)
    days = 1000 * 60 * 60 * 24
    totalDaysToPay = end - new Date()
    timePeriodRemaining = Math.floor(totalDaysToPay/days)
    totalDays.innerHTML = timePeriodRemaining

    fs.writeFile(file + '/totalDays.txt', timePeriodRemaining ,function(err, data) {
        if(err){
            return console.log(err)
        }
        console.log(data)
    }) 
} 


function updateAgentRecord(newPath) {
    fs.readFile(newPath + '/agent.txt', async (err, data) => {
        if (err) throw err
        agentNamepara.innerHTML = String(data)
        await entry.value
        await clientName.value
        agentFilePath = path.join(agentPathName, String(data))
        console.log(agentFilePath)
        fs.readFile(agentFilePath + `/${clientName.innerHTML}.txt`, (err, data) => {
            if (err) throw err
            sum = Number(data) + Number(entry.value)
            fs.writeFile(agentFilePath + `/${clientName.innerHTML}.txt`, sum, (err) => {
                if (err) throw err
        })
        })
    })
}


function removeDirectory(newPath) {
    files = fs.readdirSync(newPath)
    files.forEach(element => {
        fs.unlink(newPath + `/${element}`, (err) => {
            if(err) throw err
            console.log(`successfully deleted ${element}`)
        })

        balance.innerHTML = ''
    })
    fs.rmdir(newPath, (err) => {
        if (err) throw err
        console.log('removed client')
    })
}