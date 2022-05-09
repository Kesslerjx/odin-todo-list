import { userLists, createItem, editItem } from "./storage-handler";
import { compareDesc, parseISO } from 'date-fns'

const editItemPage = (item) => {

    let mainDiv = document.createElement('div');
    let title = document.createElement('p');
    let description = document.createElement('input');
    let selectDiv = document.createElement('div');
    let selectText = document.createElement('p');
    let select = document.createElement('select');
    let dateDiv = document.createElement('div');
    let dateText = document.createElement('p');
    let date = document.createElement('input');
    let editButton = document.createElement('button');
    let errorMessage = document.createElement('p');

    function setContent() {
        title.textContent = 'Edit Item';
        selectText.textContent = 'List';
        dateText.textContent = 'Date';
        editButton.textContent = "Edit";
        errorMessage.textContent = ' ';
        description.value = item.description;

        description.placeholder = 'Description... (required)';

        description.type = 'text';
        date.type = 'date';

        date.value = item.date
    }

    function setClasses() {
        mainDiv.classList.add('main-div', 'div-gap');
        title.classList.add('section-title');    
        description.classList.add('user-input');
        selectDiv.classList.add('select-div');
        select.classList.add('user-input');
        dateDiv.classList.add('select-div');
        date.classList.add('user-input');
        editButton.classList.add('edit-button');

        errorMessage.style.textAlign = 'center';
    }

    function setIDs() {
        description.id = 'new-item-description';
        select.id = 'new-item-list';
        date.id = 'new-item-date';
        errorMessage.id = 'create-item-message';
    }

    function setListeners() {
        editButton.addEventListener('click', validateForm);
    }

    function appendElements() {
        selectDiv.append(selectText, select);
        dateDiv.append(dateText, date);
        mainDiv.append(title, description, selectDiv, dateDiv, editButton, errorMessage);
    }

    function buildPage() {

        setContent();
        setClasses();
        setIDs();
        setListeners();
        appendElements();
        buildLists();

        return mainDiv;
    }

    function buildLists() {
        for(let x=0; x< userLists.length; x++){
            let option = document.createElement('option');
            option.text = userLists[x].name;
            select.append(option);
        }
    }

    function validateForm() {

        if(description.value === ''){
            displayMessage('Description is required');
        } else if(date.value != '' && !checkDate(date.value)) {
            displayMessage('Date is earlier than today');
        } else {
            editItem(item, description.value, select.value, date.value);
            window.history.back();
        }
    }

    function displayMessage(message) {
        errorMessage.textContent = message;
    }

    function clearMessage() {
        errorMessage.textContent = '';
    }

    function clearFields() {
        description.value = '';
    }

    //Return true if date is today or later, false if earlier
    function checkDate() {
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

export {editItemPage}