const MIGRATED_PERCENT = 0.2; // 
const MIGRATED = "Migrated"
const getSource = (threshold) => {
    // If r > threshold return a something_ok otherwsie return 'Migrated' string
    // Remember to flip the threshold
    if ( threshold > 1 ) {
        threshold = 1
    }
    const r = Math.random() 
    const poison = MIGRATED
    const good = "something_ok"
    let result = poison
    if ( threshold < r ) {
        result = good
    }
    return result
}

const getUserRole = () => {
    // I do not think this one matters, so just return 'Member' 
    return "Member"
}

const getInvoiceId = () => {
    // I do not think this one matters, just random 8 digits number
    const iId = Math.random() * 100000000 
    return iId.toFixed(0)
}

const getRandomDate_2001_to_2033 = () => {
    let unix = 1000000000 + Math.random() * 1000000000
    unix = unix.toFixed(0)
    return unix
}

const getContractId = () => {
    // I do not think this one matters, just random 8 digits number prepenned w/ an H
    let cId = ( Math.random() * 100000000 ) 
    cId = cId.toFixed(0)
    return "H" + cId
}
const getRandomDate_andTime_2001_to_2033 = () => {
    let unix = 1000000000 + Math.random() * 1000000000
    return unix
}

const getRandomMoneyValue=()=>{
    // 0 to 1000 dollars and no cents 
    let dollars = Math.random() * 1000 
    dollars = dollars.toFixed(0)
    return parseInt(dollars)
}

const getInvoiceType=()=>{
    // I don't think this matters: just return the string 'Premium'
    return 'Premium'
}
const getApoIndicator=()=>{
    // I don't think this matters: just return the string 'No'
    return 'No'

}

const getStatusCode = () => { 
    // These status codes are made up - do not think it matters here 
    const possible = ["S01", "S02","S03","S04", "S05","S06","SF06", "SF08", "SF09"]
    return possible[Math.floor(Math.random()*possible.length)]
}
const getStatusDescriptionCode = () => { 
    // These status codes are made up - do not think it matters here 
    const possible = ["C01", "C02","C03","C04"]
    return possible[Math.floor(Math.random()*possible.length)]
}

const getStatusDescription=()=>{
    // I don't think this matters: just return the string 'paid'
    return "Paid"
}

const getSystemStatuses = (n) => {
    let array = []  
    for ( let i = 0; i < n; i++ ) {
        the_source = getSource(MIGRATED_PERCENT)
        const obj = {
            changedBy: the_source == MIGRATED ? "Data Migration Team" : "Some Team",
            timeStamp:getRandomDate_andTime_2001_to_2033(),
            statusCode:getStatusCode(),
            statusDescription:getStatusDescription()
        }
        array.push(obj)
    }
    return array
}
const getCustomerStatuses = (n) => {
    let array = []  
    for ( let i = 0; i < n; i++ ) {
        the_source = getSource(MIGRATED_PERCENT)
        const obj = {
            changedBy: the_source == MIGRATED ? "Data Migration Team" : "Some Team",
            timeStamp:getRandomDate_andTime_2001_to_2033(),
            statusCode:getStatusDescriptionCode(),
            statusDescription:getStatusDescription()
        }
        array.push(obj)
    }
    return array
}
const getExternalPaymentId=()=>{
    let noise = Math.random() * 1000000000 
    noise = noise.toFixed(0)
    return "2019" + noise
}
const getPaymentMethodType=()=>{
    // I don't think this matters: just return the string 'BANK_ACCOUNT'
    return "BANK_ACCOUNT"    
}


const getEnrollmentSourceSystem=()=>{
    // I don't think this matters: just return the string 'RBMS'
    return "RBMS"    
}

const getModel = () => { 
    const n = 1 + Math.random() * 5 
    the_source = getSource(MIGRATED_PERCENT)

    let model = {
        source:the_source, 
        userRole:getUserRole(),
        invoiceId:getInvoiceId(),
        billFromDt:getRandomDate_2001_to_2033(),
        billThruDt:getRandomDate_2001_to_2033(),      
        getContractId:getContractId(),
        insertDtTm: getRandomDate_andTime_2001_to_2033(),
        updateDtTm: getRandomDate_andTime_2001_to_2033(),
        amountToPay: getRandomMoneyValue(),
        invoiceType:getInvoiceType(),
        apoIndicator:getApoIndicator(),
        systemStatus:{
            changedBy:the_source == MIGRATED ? "Data Migration Team" : "Some Team",
            timeStamp:getRandomDate_andTime_2001_to_2033(),
            statusCode:getStatusCode(), 
            statusDescription:getStatusDescription()
        }, 
        customerStatus:{
            changedBy:the_source == MIGRATED ? "Data Migration Team" : "Some Team",
            timeStamp:getRandomDate_andTime_2001_to_2033(),
            statusCode:getStatusDescriptionCode(), 
            statusDescription:getStatusDescription()
        }, 
        pymtReceivedDt:getRandomDate_2001_to_2033(),
        systemStatuses:getSystemStatuses(n),
        customerStatuses:getCustomerStatuses(n),
        externalPaymentId:getExternalPaymentId(),
        paymentMethodType:getPaymentMethodType(),
        confirmationNumber:null,
        enrollmentSourceSystem:getEnrollmentSourceSystem(),
        lastSuccessfulProcessedDt:getRandomDate_2001_to_2033(),
        lastUnSuccessfulProcessedDt:null
    }
    return model 
}


if (!module.parent) {
    // self test
    let x = getModel() 
    console.log( JSON.stringify(x, null, 2 ) )
}
module.exports = {
    getModel
}
