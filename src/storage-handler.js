import List from './list';

const Keys = {
    DarkMode: 'dark',
    TodoList: 'todo list'
}

function clearData() {
    window.localStorage.clear();
}

function getList() {
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

export {getMode, saveMode, clearData, getList};