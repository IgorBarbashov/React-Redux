import './styles.css'

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

let state = 0;

function render() {
    counter.textContent = state.toString();
}

function increase() {
    state += 1;
    render();
}

function decrease() {
    state -= 1;
    render();
}

function async() {
    setTimeout(() => {
        state = Math.floor(Math.random() * 100);
        render();
    }, 2000);
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

addBtn.addEventListener('click', increase);
subBtn.addEventListener('click', decrease);
asyncBtn.addEventListener('click', async);
themeBtn.addEventListener('click', toggleTheme);

render();