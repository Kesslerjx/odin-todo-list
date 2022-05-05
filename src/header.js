import SettingsIcon from './icons/settings.svg';
import AddIcon from './icons/add.svg';
import { StateName, changePage } from './page-handler';

const header = () => {

    //Create elements
    let header = document.createElement('header');
    let settingsButton = document.createElement('img');
    let addButton = document.createElement('img');
    let title = document.createElement('p');

    function buildPage() {
        //Add content
        settingsButton.src = SettingsIcon;
        title.textContent = "ToDo";
        addButton.src = AddIcon;

        //IDs
        settingsButton.id = 'settings-button';
        title.id = 'header-title';
        addButton.id = 'add-item-button';

        //Set listeners
        settingsButton.addEventListener('click', settingsPressed);
        addButton.addEventListener('click', addPressed);
        title.addEventListener('click', titlePressed);

        //Add classes
        title.classList.add('header-title');

        //Add elements to header
        header.append(settingsButton, title, addButton);

        return header;
    }

    function titlePressed() {
        changePage(StateName.Home);
    }

    function settingsPressed(){
        changePage(StateName.Settings);
    }

    function addPressed(event) {
        changePage(StateName.CreateItem);
    }

    return buildPage();
};

export {header};