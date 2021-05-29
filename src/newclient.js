const fs = require('fs')
const path = require('path')

clientName = document.getElementById("client-name")
phone = document.getElementById("phone-number")
address = document.getElementById("address")
email = document.getElementById("email")
amount = document.getElementById("amount")
interestRate = document.getElementById("interest-rate")
dueDate = document.getElementById("due-date")
totalPayment = document.getElementById("total-payment")
totalDays = document.getElementById("total-days")
btnCreate = document.getElementById("create-client")
agentName = document.getElementById("agent-name")
homeLink = document.getElementById("back-to-home")

let pathName = path.join(__dirname, 'Files')
let agentPath = path.join(__dirname, 'Agents')





btnCreate.addEventListener('click', function () {
    end = new Date(dueDate.value)
    days = 1000 * 60 * 60 * 24
    totalDaysToPay = end - new Date()
    timePeriod = Math.floor(totalDaysToPay / days)
    totalDays.innerHTML = timePeriod

    finalAmount = Math.floor(parseFloat(amount.value) + amount.value * (timePeriod / 30) * (interestRate.value / 100))
    totalPayment.innerHTML = finalAmount

    let file = path.join(pathName, clientName.value)
    fs.mkdir(file, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("Client folder was created")
    })
    fs.writeFile(file + '/phonenumber.txt', phone.value, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("phone file was created")
    })
    fs.writeFile(file + '/address.txt', address.value, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("address file was created")
    })
    fs.writeFile(file + '/email.txt', email.value, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("email file was created")
    })
    fs.writeFile(file + '/amount.txt', amount.value, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("amount file was created")
        addToInvestment()
    })
    fs.writeFile(file + '/interestRate.txt', interestRate.value, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("interest rate file was created")
    })
    fs.writeFile(file + '/dueDate.txt', dueDate.value, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("due date file was created")
    })
    fs.writeFile(file + '/totalPayment.txt', finalAmount, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("total Payment file was created")
    })
    fs.writeFile(file + '/totalDays.txt', timePeriod, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("total Days file was created")
    })
    fs.writeFile(file + '/balance.txt', finalAmount, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log("balance file was created")
    })
    fs.writeFile(file + '/agent.txt', agentName.value, (err) => {
        if (err) throw err
    })

    let agentFile = path.join(agentPath + `/${agentName.value}`)
    console.log(agentFile)

        if (fs.existsSync(agentFile)) {
            fs.writeFile(agentFile + `/${clientName.value}.txt`, '0', function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log("agentclientfile file was created")
            })
        } else {

            fs.mkdir(agentFile, (err) => {
                if (err) throw err
            })


            fs.writeFile(agentFile + `/${clientName.value}.txt`, '0', function (err) {
                if (err) {
                    return console.log(err)
                }
                console.log("agentclientfile file was created")
            })
        }
    
        async function addToInvestment() {
            try {
                await amount.value
                let file = path.join(pathName, 'uemail.txt')
                fs.writeFile(file, emailInput.value, (err) => {
        
            }
            } catch (err) {
                if(err) throw err
            }
        }

        


})
