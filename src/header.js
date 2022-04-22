import SettingsIcon from './icons/settings.svg';
import AddIcon from './icons/add.svg';
import {rotateElement, scaleElement, showSettingsPage, showAddItemPage} from './page-handler';

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

    //Set listeners
    settingsButton.addEventListener('click', settingsPressed);
    addButton.addEventListener('click', addPressed);

    //Add classes
    title.classList.add('header-title');

    //Add elements to header
    header.append(settingsButton, title, addButton);

    return header;
};

function settingsPressed(event) {
    rotateElement(event.target);
    showSettingsPage();
}

function addPressed(event) {
    scaleElement(event.target);
    showAddItemPage();
}

export {header};