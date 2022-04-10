let basicMinus = document.querySelectorAll('.basicMinus')
let basicPlus = document.querySelectorAll('.basicPlus')
let seniorMinus = document.querySelectorAll('.seniorMinus')
let seniorPlus = document.querySelectorAll('.seniorPlus')
let basicInput = document.querySelectorAll('.basicInput')
let seniorInput = document.querySelectorAll('.seniorInput')
let total = document.querySelectorAll('.total')
let permanentTypeInput = document.getElementById('Permanent exhibition')
let temporaryTypeInput = document.getElementById('Temporary exhibition')
let combinedTypeInput = document.getElementById('Combined Admission')
let basic__detalization = document.querySelector('.basic__detalization')
let senior__detalization = document.querySelector('.senior__detalization')
let basic__amount = document.querySelector('.basic__amount')
let senior__amount = document.querySelector('.senior__amount')
let ticketsType = permanentTypeInput.getAttribute('data-type')

let booking__form__date = document.querySelector('.booking__form__date')
let overview__date = document.querySelector('.overview__date')

let booking__form__time = document.querySelector('.booking__form__time')
let overview__time = document.querySelector('.overview__time')

let booking__form__type = document.querySelector('.booking__form__type')
let overview__type = document.querySelector('.overview__type')


function setMinimalDate() {
    let dtToday = new Date();

    let month = dtToday.getMonth() + 1;
    let day = dtToday.getDate();
    let year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    let maxDate = year + '-' + month + '-' + day;
    booking__form__date.setAttribute('min', maxDate);
}
setMinimalDate()


booking__form__date.onchange = (e) => {
    if (new Date(e.target.value) > Date.now() || new Date(e.target.value).getDate() == new Date(Date.now()).getDate()) {
        booking__form__date.setAttribute('data-placeholder', e.target.value)
        overview__date.innerHTML = `${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(e.target.value))},${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(e.target.value))} ${new Date(e.target.value).getDate()}`
    } else false

}
booking__form__time.onchange = function (e) {

    booking__form__time.setAttribute('data-placeholder', e.target.value)
    overview__time.innerHTML = booking__form__time.value
}

booking__form__type.onchange = () => {
    ticketsType = booking__form__type.value
    window.localStorage.setItem('ticketsType', booking__form__type.value)
    overview__type.innerHTML = booking__form__type.value
    total[0].innerHTML = calculateTotal()
    total[1].innerHTML = calculateTotal()

}

function initializeTickets() {
    let ls = window.localStorage
    if (ls.getItem('basicInput')) {
        basicInput[0].value = ls.getItem('basicInput')
        basicInput[1].value = ls.getItem('basicInput')
        calculateTotal()
    }
    if (ls.getItem('seniorInput')) {
        seniorInput[0].value = ls.getItem('seniorInput')
        seniorInput[1].value = ls.getItem('seniorInput')
        calculateTotal()
    }
    if (ls.getItem('total')) {
        total[0].innerHTML = ls.getItem('total')
        total[1].innerHTML = ls.getItem('total')
    }

    if (ls.getItem('ticketsType')) {
        let tickets__type_wrapper = document.querySelector('.tickets__type-wrapper')
        let inputs = tickets__type_wrapper.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].id == ls.getItem('ticketsType')) {
                inputs[i].checked = true
            } else inputs[i].checked = false
        }
    }
}
initializeTickets()

function calculateTotal() {
    let ls = window.localStorage
    let summary
    let cost
    switch (ticketsType) {
        case "Permanent exhibition":
            cost = 20
            break;
        case "Temporary exhibition":
            cost = 30
            break;
        case "Combined Admission":
            cost = 40
            break;
    }
    basic__detalization.innerHTML = basicInput[0].value * cost
    senior__detalization.innerHTML = seniorInput[0].value * (cost / 2)
    basic__amount.innerHTML = ls.getItem('basicInput')
    senior__amount.innerHTML = ls.getItem('seniorInput')
    summary = basicInput[0].value * cost + seniorInput[0].value * (cost / 2)
    window.localStorage.setItem('total', summary)
    return summary
}

for (let i = 0; i < basicPlus.length; i++) {
    basicPlus[i].onclick = () => {
        if (basicInput[0].value < 20) {
            basicInput[0].value++
            basicInput[1].value++
            window.localStorage.setItem('basicInput', basicInput[0].value)
            total[0].innerHTML = calculateTotal()
            total[1].innerHTML = calculateTotal()
        }
    }
}

for (let i = 0; i < basicMinus.length; i++) {
    basicMinus[i].onclick = () => {
        if (basicInput[0].value > 0) {
            basicInput[0].value--
            basicInput[1].value--
            window.localStorage.setItem('basicInput', basicInput[0].value)
            total[0].innerHTML = calculateTotal()
            total[1].innerHTML = calculateTotal()
        }
    }
}


for (let i = 0; i < seniorPlus.length; i++) {
    seniorPlus[i].onclick = () => {
        if (seniorInput[0].value < 20) {
            seniorInput[0].value++
            seniorInput[1].value++
            window.localStorage.setItem('seniorInput', seniorInput[0].value)
            total[0].innerHTML = calculateTotal()
            total[1].innerHTML = calculateTotal()
        }
    }
}

for (let i = 0; i < seniorMinus.length; i++) {
    seniorMinus[i].onclick = () => {
        if (seniorInput[0].value > 0) {
            seniorInput[0].value--
            seniorInput[1].value--
            window.localStorage.setItem('seniorInput', seniorInput[0].value)
            total[0].innerHTML = calculateTotal()
            total[1].innerHTML = calculateTotal()
        }
    }
}
seniorMinus.onclick = () => {
    if (seniorInput.value > 0) {
        seniorInput.value--
        window.localStorage.setItem('seniorInput', seniorInput.value)
        total[0].innerHTML = calculateTotal()
        total[1].innerHTML = calculateTotal()
    }
}

function changeType(e) {
    ticketsType = e.target.getAttribute('data-type')
    window.localStorage.setItem('ticketsType', ticketsType)
    overview__type.innerHTML = ticketsType
    total[0].innerHTML = calculateTotal()
    total[1].innerHTML = calculateTotal()
}
permanentTypeInput.onchange = (e) => {
    changeType(e)
}
temporaryTypeInput.onchange = (e) => {
    changeType(e)
}
combinedTypeInput.onchange = (e) => {
    changeType(e)
}


