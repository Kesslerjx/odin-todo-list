import { showHomePage, clearNewListInputs, displayCreateListMessage, clearCreateListMessage } from "./page-handler";
import { nameExist, saveNewList } from "./storage-handler";
import List from "./list";

const createListPage = () => {
    let div = document.createElement('div');
    div.classList.add('create-list-page');

    let sectionTitle = document.createElement('p');
    sectionTitle.textContent = 'Create a List';
    sectionTitle.classList.add('section-title');

    let listName = document.createElement('input');
    listName.type = 'text';
    listName.id = "new-list-name";
    listName.placeholder = 'List name...';
    listName.classList.add('user-input');

    let listDescription = document.createElement('input');
    listDescription.type = 'text';
    listDescription.id = 'new-list-description';
    listDescription.placeholder = 'List description...';
    listDescription.classList.add('user-input');

    let errorMessage = document.createElement('p');
    errorMessage.textContent = ' ';
    errorMessage.id = 'create-list-message';
    errorMessage.style.textAlign = 'center';

    let createButton = document.createElement('button');
    createButton.textContent = "Create";
    createButton.classList.add('create-list-button');
    createButton.addEventListener('click', function () {
        validateForm(listName.value, listDescription.value);
    })

    let backButton = document.createElement('button');
    backButton.textContent = "Home";
    backButton.classList.add('back-button');
    backButton.addEventListener('click', showHomePage);

    div.append(sectionTitle, listName, listDescription, createButton, backButton, errorMessage);

    return div;
};

function validateForm(name, description) {
    //Check for empty inputs
    if(name === '') {
        console.log("Name field is empty");
        displayCreateListMessage("Name field is empty");
    } else {

        //Check for similar name
        if(nameExist(name)) {
            console.log("Name already exist");
            displayCreateListMessage("Name already exist");
        } else {
            createList(name, description);
            clearCreateListMessage();
        }
    }
}

function createList(name, description) {
    //Create list
    let newList = new List(name, description, true);

    //Save list
    saveNewList(newList);

    //Clear input
    clearNewListInputs();
}

export {createListPage};