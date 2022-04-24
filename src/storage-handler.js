const Keys = {
    DarkMode: 'dark',
    TodoList: 'todo list'
}

function clearData() {
    window.localStorage.clear();
}

//Returns if dark mode is set or not
function getMode() {

    //Set to false if value is null
    if(window.localStorage.getItem(Keys.DarkMode) === null) {
        window.localStorage.setItem(Keys.DarkMode, false);
    } 

    return JSON.parse(window.localStorage.getItem(Keys.DarkMode));
}

//Saves the theme mode
function saveMode(mode) {
    window.localStorage.setItem(Keys.DarkMode, mode);
}

export {getMode, saveMode, clearData};