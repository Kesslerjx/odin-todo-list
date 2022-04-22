import {settings} from './settings';
import {addItemPage} from './add-item-page';

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

function showAddItemPage() {
    clearPage();
    getMain().appendChild(addItemPage());
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

export {rotateElement, scaleElement, showSettingsPage, showAddItemPage};