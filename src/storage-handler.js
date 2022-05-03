import List from './list';
import Item from './item';
import { compareAsc, compareDesc, parseISO } from 'date-fns'

const Keys = {
    DarkMode: 'dark',
    TodoList: 'todo list'
}

//Load the users lists
let userLists = getLists();

function nameExist(name) {

    for(let x=0; x < userLists.length; x++) {
        if(userLists[x].name.toLowerCase() === name.toLowerCase()){
            return true;
        }
    }

    return false;
}

function clearData() {
    window.localStorage.clear();
    userLists = [];
    userLists = getLists();
}

function saveNewList(list) {
    userLists.push(list);
    saveLists();
}

function saveLists() {
    //Save to storage
    window.localStorage.setItem(Keys.TodoList, JSON.stringify(userLists));
}

function getLists() {
    if(window.localStorage.getItem(Keys.TodoList) === null) {

        //Create empty array
        let listArray = [];

        //Create new default list
        let defaultList = new List("Default", "Default list", false);

        //Add list to array
        listArray.push(defaultList);

        //Save to storage
        window.localStorage.setItem(Keys.TodoList, JSON.stringify(listArray));
    } 

    return JSON.parse(window.localStorage.getItem(Keys.TodoList));
        
}

function createItem(description, list, note, link, date) {
    let item = new Item(description, list, note, link, date);
    addItemToList(list, item);
}

function addItemToList(list, item) {

    let isSame = (element) => element.name === list;
    let index = userLists.findIndex(isSame);

    userLists[index].items.push(item);

    saveLists();
}

function deleteItem(itemToRemove) {
    //Get list index
    let isList = (element) => element.name === itemToRemove.list;
    let listIndex = userLists.findIndex(isList);

    //Remove item from the list
    userLists[listIndex].items = userLists[listIndex].items.filter(item => item !== itemToRemove);

    saveLists();
}

function getDue() {

    let due = [];
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for(let x=0; x < userLists.length; x++) {
        for(let y=0; y < userLists[x].items.length; y++){
            if(compareDesc(today, parseISO(userLists[x].items[y].date)) === 0){
                due.push(userLists[x].items[y]);
            }
        }
    }

    return due;

}

//Returns if dark mode is set or not
function getMode() {

    //Set to false if value is null
    if(window.localStorage.getItem(Keys.DarkMode) === null) {
        window.localStorage.setItem(Keys.DarkMode, JSON.stringify(false));
    } 

    return JSON.parse(window.localStorage.getItem(Keys.DarkMode));
}

//Saves the theme mode
function saveMode(mode) {
    window.localStorage.setItem(Keys.DarkMode, JSON.stringify(mode));
}

export {getMode, saveMode, clearData, userLists, nameExist, saveNewList, createItem, getDue, deleteItem};