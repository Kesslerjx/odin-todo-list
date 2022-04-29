import { showHomePage } from "./page-handler";
import { nameExist, saveNewList } from "./storage-handler";
import List from "./list";

const createListPage = () => {
    let mainDiv = document.createElement('div');
    let sectionTitle = document.createElement('p');
    let listName = document.createElement('input');
    let listDescription = document.createElement('input');
    let errorMessage = document.createElement('p');
    let createButton = document.createElement('button');
    let backButton = document.createElement('button');

    const buildPage = () => {

        mainDiv.classList.add('create-list-page');
        sectionTitle.classList.add('section-title');
        listName.classList.add('user-input');
        listDescription.classList.add('user-input');
        createButton.classList.add('create-list-button');
        backButton.classList.add('back-button');
        
        sectionTitle.textContent = 'Create a List';
        listName.type = 'text';
        listName.id = "new-list-name";
        listName.placeholder = 'List name...';
        listDescription.type = 'text';
        listDescription.id = 'new-list-description';
        listDescription.placeholder = 'List description...';
        errorMessage.textContent = ' ';
        errorMessage.id = 'create-list-message';
        errorMessage.style.textAlign = 'center';
        createButton.textContent = "Create";
        backButton.textContent = "Home";

        createButton.addEventListener('click', function () {
            validateForm();
        })
        backButton.addEventListener('click', showHomePage);
    
        mainDiv.append(sectionTitle, listName, listDescription, createButton, backButton, errorMessage);

        return mainDiv;
    }

    const validateForm = () => {
        //Check for empty inputs
        if(listName.value === '') {
            displayMessage("Name field is empty");
        } else {
    
            //Check for similar name
            if(nameExist(listName.value)) {
                displayMessage("Name already exist");
            } else {
                createList();
                clearMessage();
            }
        }
    }


    const createList = () => {
        //Create list
        let newList = new List(listName.value, listDescription.value, true);

        //Save list
        saveNewList(newList);

        //Clear input
        clearInputs();
    }

    const displayMessage = (message) => {
        errorMessage.textContent = message;
    }

    const clearMessage = () => {
        errorMessage.textContent = '';
    }
    
    const clearInputs = () => {
        listName.value = '';
        listDescription.value = '';
    }

    return buildPage();
};

export {createListPage};