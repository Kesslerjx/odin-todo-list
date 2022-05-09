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

function createItem(description, list, date) {
    let item = new Item(description, list, date);
    addItemToList(list, item);
}

function editItem(oldItem, newDescription, newList, newDate) {

    let newItem = new Item(newDescription, newList, newDate); 

    if(oldItem.list !== newList) {
        deleteItem(oldItem);
        addItemToList(newList, newItem);
    } else {
        updateItem(oldItem, newItem);
    }
}


function addItemToList(list, item) {

    let isSame = (element) => element.name === list;
    let index = userLists.findIndex(isSame);

    userLists[index].items.push(item);

    saveLists();
}

function updateItem(oldItem, newItem) {

    let isList = (element) => element.name === oldItem.list; //Function to determine if it's the list
    let listIndex = userLists.findIndex(isList); //Gets the index of the list
    let isItem = (element) => element === oldItem; //Function to determine if items match
    let itemIndex = userLists[listIndex].items.findIndex(isItem) //Gets the index of the item

    userLists[listIndex].items[itemIndex] = newItem;

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

function deleteList(listToRemove) {

        userLists = userLists.filter(list => list !== listToRemove);

        saveLists();
}

function editList(oldList, newName, newDescription) {
        //Get list index
        let isList = (element) => element === oldList;
        let listIndex = userLists.findIndex(isList);

        userLists[listIndex].name = newName;
        userLists[listIndex].description = newDescription;

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

export {getMode, saveMode, clearData, userLists, nameExist, saveNewList, createItem, getDue, deleteItem, editItem, deleteList, editList};