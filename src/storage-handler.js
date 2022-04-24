const Keys = {
    DarkMode: 'dark',
    TodoList: 'todo list'
}

//Returns if dark mode is set or not
function getMode() {

    //Set to false if value is null
    if(window.localStorage.getItem(Keys.DarkMode) === null) {
        window.localStorage.setItem(Keys.DarkMode, false);
    } 

    return JSON.parse(window.localStorage.getItem(Keys.DarkMode));
}

export {getMode};