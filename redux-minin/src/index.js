import './styles.css'
import { createStore } from './create-store';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

const store = createStore();

function increase() {
}

function decrease() {
}

function async() {
}

function toggleTheme() {
}


addBtn.addEventListener('click', increase);
subBtn.addEventListener('click', decrease);
asyncBtn.addEventListener('click', async);
themeBtn.addEventListener('click', toggleTheme);
render();