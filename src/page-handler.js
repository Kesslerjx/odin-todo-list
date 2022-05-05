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

function goBack(state) {

    let parsed = JSON.parse(state);

    changePage(parsed.name, parsed.data);
}

function changePage(stateName, data = undefined) {

    let state = State(stateName, data);
    window.history.pushState(JSON.stringify(state), '');

    clearPage()

    showPage(state);
}

function showPage(state) {
    switch(state.name) {
        case StateName.Settings:
            getMain().append(settings());
            break;
        case StateName.CreateList:
            getMain().append(createListPage());
            break;
        case StateName.ShowList:
            //Gets the updates list since the list that's stored is old
            getMain().append(listPage(userLists.find(element => element.name === state.data.name)));
            break;
        case StateName.CreateItem:
            getMain().append(createItemPage());
            break;
        default:
            getMain().append(home());
    }
}

function clearPage() {
    while(getMain().firstChild) {
        getMain().removeChild(getMain().firstChild);
    }
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

//Using this so there isn't a null error since the main element is loaded after the header
function getMain() {
    return document.querySelector('main');
}

//// PRIVATE FUNCTIONS ////

export { setMode , changePage, StateName};