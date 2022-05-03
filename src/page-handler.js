import { home } from './home';
import {settings} from './settings';
import { getMode } from './storage-handler';
import {createListPage} from './create-list-page';
import {createItemPage} from './create-item-page';
import {listPage} from './list-page';

//// PUBLIC FUNCTIONS ////

function rotateElement(element) {
    //Create animation keyframes and timing
    const spin = {transform: 'rotate(360deg)'};
    const time = {duration: 1000, iterations: 1};

    //Rotate icon when pressed
    element.animate(spin, time);
}

function scaleElement(element) {
    const scale = {transform: 'scale(0.75)'};
    const time  = {duration: 100, iterations: 1};

    element.animate(scale, time);
}

function showSettingsPage() {
    clearPage();
    getMain().appendChild(settings());
}

function showHomePage() {
    clearPage();
    getMain().appendChild(home());
}

function showCreateListPage() {
    clearPage();
    getMain().appendChild(createListPage());
}

function showCreateItemPage() {
    clearPage();
    getMain().appendChild(createItemPage());
}

function showListPage(list) {
    clearPage();
    getMain().appendChild(listPage(list));
}

function setMode() {
    if(getMode() === true) {
        document.querySelector('body').classList.add('dark-mode');
        console.log('Dark mode enabled');
    } else {
        document.querySelector('body').classList.remove('dark-mode');
        console.log('Dark mode disabled');
    }
}

//// PUBLIC FUNCTIONS ////

//// PRIVATE FUNCTIONS ////

function clearPage() {
    while(getMain().firstChild) {
        getMain().removeChild(getMain().firstChild);
    }
}

//Using this so there isn't a null error since the main element is loaded after the header
function getMain() {
    return document.querySelector('main');
}

//// PRIVATE FUNCTIONS ////

export {rotateElement, 
    scaleElement, 
    showSettingsPage, 
    showHomePage, 
    setMode, 
    showCreateListPage,
    showCreateItemPage,
    showListPage};