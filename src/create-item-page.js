import { userLists, createItem } from "./storage-handler";
import { showHomePage } from "./page-handler";
import { compareDesc, parseISO } from 'date-fns'

const createItemPage = () => {

    let mainDiv = document.createElement('div');
    let title = document.createElement('p');
    let description = document.createElement('input');
    let selectDiv = document.createElement('div');
    let selectText = document.createElement('p');
    let select = document.createElement('select');
    let note = document.createElement('input');
    let link = document.createElement('input');
    let dateDiv = document.createElement('div');
    let dateText = document.createElement('p');
    let date = document.createElement('input');
    let createButton = document.createElement('button');
    let backButton = document.createElement('button');
    let errorMessage = document.createElement('p');

    const buildPage = () => {

        mainDiv.classList.add('create-item-page');
        title.classList.add('section-title');    
        description.classList.add('user-input');
        selectDiv.classList.add('select-div');
        select.classList.add('user-input');
        note.classList.add('user-input');
        link.classList.add('user-input');
        dateDiv.classList.add('select-div');
        date.classList.add('user-input');
        createButton.classList.add('create-list-button');
        backButton.classList.add('back-button');

        title.textContent = 'Add an Item';
        selectText.textContent = 'List';
        dateText.textContent = 'Date';
        createButton.textContent = "Create";
        backButton.textContent = "Home";
        errorMessage.textContent = ' ';

        description.placeholder = 'Description... (required)';
        note.placeholder = 'Note...';
        link.placeholder = 'URL...';

        description.type = 'text';
        note.type = 'text';
        link.type = 'text';
        date.type = 'date';

        description.id = 'new-item-description';
        select.id = 'new-item-list';
        note.id = 'new-item-note';
        link.id = 'new-item-link';
        date.id = 'new-item-date';
        errorMessage.id = 'create-item-message';

        errorMessage.style.textAlign = 'center';
    
        createButton.addEventListener('click', validateForm);
        backButton.addEventListener('click', showHomePage);
    
        selectDiv.append(selectText, select);
        dateDiv.append(dateText, date);
        mainDiv.append(title, description, selectDiv, note, link, dateDiv, createButton, backButton, errorMessage);
    
        buildLists();

        return mainDiv;
    }

    const buildLists = () => {
        for(let x=0; x< userLists.length; x++){
            let option = document.createElement('option');
            option.text = userLists[x].name;
            select.append(option);
        }
    }

    const validateForm = () => {

        if(description.value === ''){
            displayMessage('Description is required');
        } else if(date.value != '' && !checkDate(date.value)) {
            displayMessage('Date is earlier than today');
        } else {
            createItem(description.value, select.value, note.value, link.value, date.value);
            clearFields();
            clearMessage();
        }
    }

    const displayMessage = (message) => {
        errorMessage.textContent = message;
    }

    const clearMessage = () => {
        errorMessage.textContent = '';
    }

    const clearFields = () => {
        description.value = '';
        link.value = '';
        note.value = '';
    }

    //Return true if date is today or later, false if earlier
    const checkDate = () =>{
        let today = new Date();
        today.setHours(0,0,0,0); //Set time to 0 for comparison

        let answer = compareDesc(today, parseISO(date.value));

        if(answer >= 0) {
            return true;
        } else {
            return false;
        }
    }

    return buildPage();

};

export {createItemPage}