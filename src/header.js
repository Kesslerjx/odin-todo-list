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

    //Set IDs
    settingsButton.id = 'settings-button';
    addButton.id = 'add-button';

    //Add classes
    title.classList.add('header-title');

    //Add elements to header
    header.append(settingsButton, title, addButton);

    return header;
};

export {header};

/*

function settingsPressed(event) {
    //Animate icon when pressed
    animateSettingsIcon(event);
}

function addPressed(event) {
    //Aniamte
    animateAddIcon(event);
}

//Rotates the icon
function animateSettingsIcon(event) {
    //Create animation keyframes and timing
    const spin = {transform: 'rotate(360deg)'};
    const time = {duration: 1000, iterations: 1};

    //Rotate icon when pressed
    event.target.animate(spin, time);
}

//Scales the icon down
function animateAddIcon(event) {
    const scale = {transform: 'scale(0.75)'};
    const time  = {duration: 100, iterations: 1};

    event.target.animate(scale, time);
}

*/