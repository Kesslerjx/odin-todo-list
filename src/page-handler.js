import { home } from './home';
import {settings} from './settings';
import { getMode, userLists } from './storage-handler';
import {createListPage} from './create-list-page';
import {createItemPage} from './create-item-page';
import {listPage} from './list-page';
import {itemPage} from './item-page';
import {editItemPage} from './edit-item-page';
import {editListPage} from './edit-list-page';

const State = (name, data) => {
    return {name, data};
}

const StateName = {
    Home: 'home',
    Settings: 'settings',
    ShowList: 'show-list',
    CreateList: 'create-list',
    EditList: 'edit-list',
    CreateItem: 'create-item',
    ShowItem: 'show-item',
    EditItem: 'edit-item'
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

    getMain().append(getPage(state));
}

function getPage(state) {
    switch(state.name) {
        case StateName.Settings:
            return settings();
            break;
        case StateName.CreateList:
            return createListPage();
            break;
        case StateName.EditList:
            return editListPage(state.data);
            break;
        case StateName.ShowList:
            //Gets the updates list since the list that's stored is old
            return listPage(userLists.find(element => element.name === state.data.name));
            break;
        case StateName.CreateItem:
            return createItemPage();
            break;
        case StateName.ShowItem:
            return itemPage(state.data);
            break;
        case StateName.EditItem:
            return editItemPage(state.data);
            break;
        default:
            return home();
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