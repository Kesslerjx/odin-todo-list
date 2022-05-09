import { nameExist, saveNewList, editList } from "./storage-handler";
import List from "./list";

const editListPage = (list) => {

    let mainDiv = document.createElement('div');
    let sectionTitle = document.createElement('p');
    let listName = document.createElement('input');
    let listDescription = document.createElement('input');
    let errorMessage = document.createElement('p');
    let editButton = document.createElement('button');

    function buildPage() {

        mainDiv.classList.add('main-div', 'div-gap');
        sectionTitle.classList.add('section-title');
        listName.classList.add('user-input');
        listDescription.classList.add('user-input');
        editButton.classList.add('edit-button');
        
        sectionTitle.textContent = 'Edit List';
        listName.type = 'text';
        listName.id = "new-list-name";
        listName.value = list.name;
        listName.placeholder = 'List name...';
        listDescription.type = 'text';
        listDescription.id = 'new-list-description';
        listDescription.placeholder = 'List description...';
        listDescription.value = list.description;
        errorMessage.textContent = ' ';
        errorMessage.id = 'create-list-message';
        errorMessage.style.textAlign = 'center';
        editButton.textContent = "Edit";

        editButton.addEventListener('click', validateForm);
    
        mainDiv.append(sectionTitle, listName, listDescription, editButton, errorMessage);

        return mainDiv;
    }

    function validateForm() {

        if(listName.value === '') { //Check for empty value
            displayMessage("Name field is empty");
        } else
        if(listName.value === list.name && listDescription.value === list.description) { //Check if any changes have been made
            displayMessage("No changes have been made");
        } else
        if(listName.value !== list.name && nameExist(listName.value)) {
            displayMessage("Name already exist"); 
        } else {
            editList(list, listName.value, listDescription.value);
            window.history.back();
        }
    }

    function displayMessage(message)  {
        errorMessage.textContent = message;
    }

    function clearMessage() {
        errorMessage.textContent = '';
    }
    
    function clearInputs()  {
        listName.value = '';
        listDescription.value = '';
    }

    return buildPage();
};

export {editListPage};