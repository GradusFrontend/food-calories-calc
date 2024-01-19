
const open_btns = document.querySelectorAll('button[data-modal]')
const close_btns = document.querySelectorAll('[data-close]')
const modal = document.querySelector('.modal')

open_btns.forEach((btn) => {
    btn.onclick = () => {
        modal.classList.add('show', 'fade')
    }
})
close_btns.forEach((btn) => {
    btn.onclick = () => {
        modal.classList.remove('show', 'fade')
    }
})


// slider

const slides = document.querySelectorAll('.offer__slide')
const next_btn = document.querySelector('.offer__slider-next')
const prev_btn = document.querySelector('.offer__slider-prev')

let total = document.querySelector('#total')
let totalJs = slides.length
let current = document.querySelector('#current')
let currentJs = 1

let slideIndex = 0

if (totalJs <= 9) {
    total.innerHTML = '0' + totalJs
} else {
    total.innerHTML = totalJs
}

slideShow(slideIndex)

function slideShow(n) {

    if (n === slides.length) {
        slideIndex = 0
    }

    if (n < 0) {
        slideIndex = slides.length - 1
    }

    slides.forEach(slide => slide.classList.add('hide', 'fade'))
    slides[slideIndex].classList.remove('hide')

    if (slideIndex + 1 <= 9) {
        current.innerHTML = '0' + (slideIndex + 1)
    } else {
        current.innerHTML = slideIndex + 1
    }
}

next_btn.onclick = () => {
    slideIndex++
    slideShow(slideIndex)
}

prev_btn.onclick = () => {
    slideIndex--
    slideShow(slideIndex)
}




const tabs = document.querySelectorAll('.tabcontent')
const tabBtns = document.querySelectorAll('.tabheader__item')

let btnIndex = 0

tabs.forEach(tab => tab.classList.add('hide', 'fade'))
tabs[btnIndex].classList.remove('hide')
tabBtns[btnIndex].classList.add('tabheader__item_active')

tabBtns.forEach((btn, idx) => {
    btn.onclick = () => {
        btnIndex = idx
        tabs.forEach(tab => tab.classList.add('hide'))
        tabBtns.forEach(btn => btn.classList.remove('tabheader__item_active'))
        tabs[btnIndex].classList.remove('hide')
        tabBtns[btnIndex].classList.add('tabheader__item_active')
    }
})


const user_data = {
    gender: "woman"
}

const gender_btns = document.querySelectorAll('[data-gender]')
const inputs = document.querySelectorAll('.calculating__choose_medium input')
const actions = document.querySelectorAll('.calculating__choose_big div')
const result_view = document.querySelector('#result')

gender_btns.forEach(btn => {
    btn.onclick = () => {
        gender_btns.forEach(btn => btn.classList.remove('calculating__choose-item_active'))
        btn.classList.add('calculating__choose-item_active')

        const g = btn.dataset.gender
        user_data["gender"] = g
    }
})

inputs.forEach(inp => {
    inp.onkeyup = () => {
        user_data[inp.id] = inp.value
    }
})

let prev = 1
actions.forEach((div, idx) => {
    div.onclick = () => {
        actions[prev].classList.remove('calculating__choose-item_active')
        div.classList.add('calculating__choose-item_active')
        prev = idx
        const cft = div.dataset.cft

        if (user_data.gender === 'women') {
            const result = (655.1 + (9.563 * user_data['weight']) + (1.85 * user_data['height']) - (4.676 * user_data['age'])) * cft

            result_view.innerHTML = Math.round(result)
        } else {
            const result = (66.5 + (13.75 * user_data['weight']) + (5.003 * user_data['height']) - (6.775 * user_data['age'])) * cft

            result_view.innerHTML = Math.round(result)
        }
    }
})

let order = document.forms.order
let orderInputs = document.order.querySelectorAll('input')

let modalForm = document.forms.modalForm
let modalInputs = document.modalForm.querySelectorAll('input')

const patterns = {
    name: /^[a-z ,.'-]+$/i,
    phone: /^9989[012345789][0-9]{7}$/,
}

orderInputs.forEach((inp, idx) => {
    inp.onkeyup = () => {
        let reg = patterns[inp.name]
        console.log(inp);
        if (!reg.test(inp.value)) {
            inp.classList.add('order__input_error')
        } else {
            inp.classList.remove('order__input_error')
        }

        if (inp.value.length === 0) {
            inp.classList.remove('order__input_error')
        }
    }
})

let orderErrors = 0
order.onsubmit = (event) => {
    event.preventDefault();

    orderInputs.forEach(inp => {
        if (inp.classList.contains('order__input_error')) {
            orderErrors++
        }
    })

    if (orderErrors > 0) {
        alert('Форма заполнена неправильно!')
    } else {
        alert('Отлично, мы вам перезвоним!')
    }

    orderErrors = 0
}

modalInputs.forEach((inp, idx) => {
    inp.onkeyup = () => {
        let reg = patterns[inp.name]
        console.log(inp);
        if (!reg.test(inp.value)) {
            inp.classList.add('order__input_error')
        } else {
            inp.classList.remove('order__input_error')
        }

        if (inp.value.length === 0) {
            inp.classList.remove('order__input_error')
        }
    }
})
let modalErrors = 0
modalForm.onsubmit = (event) => {
    event.preventDefault();

    modalInputs.forEach(inp => {
        if (inp.classList.contains('order__input_error')) {
            modalErrors++
        }
    })

    if (modalErrors > 0) {
        alert('Форма заполнена неправильно!')
    } else {
        alert('Отлично, мы вам перезвоним!')
    }

    modalErrors = 0
}

let deadline = '2024-01-31 00:00'

function remaining(deadline) {
    let t = Date.parse(deadline) - Date.parse(new Date());

    let seconds = Math.floor((t / 1000) % 60)
    let minutes = Math.floor((t / 1000 / 60) % 60)
    let hours = Math.floor((t / 1000 / 60 / 60) % 24)
    let days = Math.floor(t / 1000 / 60 / 60 / 24)

    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function updateTimer() {
    const daysView = document.querySelector('#days')
    const hoursView = document.querySelector('#hours')
    const minutesView = document.querySelector('#minutes')
    const secondsView = document.querySelector('#seconds')

    function updateTime() {
        let t = remaining(deadline);

        daysView.innerHTML = t.days;
        hoursView.innerHTML = t.hours
        minutesView.innerHTML = t.minutes
        secondsView.innerHTML = t.seconds

        if (t.total <= 0) {
            clearInterval(interval);
        }

        if (t.seconds === 0) {
            var duration = 15 * 1000;
            var animationEnd = Date.now() + duration;
            var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            var intervalConf = setInterval(function () {
                var timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(intervalConf);
                }

                var particleCount = 50 * (timeLeft / duration);
                // since particles fall down, start a bit higher than random
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }

    updateTime();
    let interval = setInterval(updateTime, 1000);
}

updateTimer()