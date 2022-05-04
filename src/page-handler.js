import { home } from './home';
import {settings} from './settings';
import { getMode, userLists } from './storage-handler';
import {createListPage} from './create-list-page';
import {createItemPage} from './create-item-page';
import {listPage} from './list-page';

const State = (name, data) => {
    return {name, data};
}

const StateName = {
    Home: 'home',
    Settings: 'settings',
    ShowList: 'show-list',
    CreateList: 'create-list',
    CreateItem: 'create-item'
}

//Handle back press
window.addEventListener('popstate', function() {
    goBack(this.window.history.state);
})

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

    let state = State(StateName.Settings, undefined);
    window.history.pushState(JSON.stringify(state), '');

    clearPage();
    getMain().appendChild(settings());
}

function showHomePage() {

    let state = State(StateName.Home, undefined);
    window.history.pushState(JSON.stringify(state), '');

    clearPage();
    getMain().appendChild(home());
}

function showCreateListPage() {

    let state = State(StateName.CreateList, undefined);
    window.history.pushState(JSON.stringify(state), '');

    clearPage();
    getMain().appendChild(createListPage());
}

function showCreateItemPage() {
    let state = State(StateName.CreateItem, undefined);
    window.history.pushState(JSON.stringify(state), '');

    clearPage();
    getMain().appendChild(createItemPage());
}

function showListPage(list) {
    let state = State(StateName.ShowList, list.name);
    window.history.pushState(JSON.stringify(state), '');

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

function goBack(state) {

    let parsed = JSON.parse(state);

    switch(parsed.name) {
        case StateName.Settings:
            showSettingsPage();
            break;
        case StateName.CreateList:
            showCreateListPage();
            break;
        case StateName.ShowList:
            //Gets the updates list since the list that's stored is old
            showListPage(userLists.find(element => element.name === parsed.data));
            break;
        case StateName.CreateItem:
            showCreateItemPage();
            break;
        default:
            showHomePage();
    }
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