clientList = document.getElementById("client-list")
aLink = document.getElementsByClassName('a-link')
var exVariable;
function myFunction(event) {
    event.target.setAttribute('href', 'clientinfo.ejs')
    var variable = event.target.innerText
    exVariable = variable
    console.log(exVariable)
    return exVariable  
}    
if (exVariable != null) {
    module.exports = exVariable
}