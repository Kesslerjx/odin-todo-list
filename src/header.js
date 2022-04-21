
//Import icons
import SettingsIcon from './icons/settings.svg';
import AddIcon from './icons/add.svg';

const header = () => {

    //Create elements
    let header = document.createElement('header');
    let settingsButton = document.createElement('img');
    let addButton = document.createElement('img');
    let title = document.createElement('p');

    //Add content
    settingsButton.src = SettingsIcon;
    title.textContent = "ToDo";
    addButton.src = AddIcon;

    //Add elements to header
    header.append(settingsButton, title, addButton);

    return header;
};

export {header};