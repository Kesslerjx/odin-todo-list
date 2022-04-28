import { userLists } from "./storage-handler";
import { showHomePage, displayMessage } from "./page-handler";
import { compareAsc, compareDesc, parseISO } from 'date-fns'

const createItemPage = () => {

    let div = document.createElement('div');
    div.classList.add('create-item-page');

    let title = document.createElement('p');
    title.textContent = 'Add an Item';
    title.classList.add('section-title');

    let description = document.createElement('input');
    description.type = 'text'
    description.placeholder = 'Description... (required)';
    description.classList.add('user-input');

    let selectDiv = document.createElement('div');
    selectDiv.classList.add('select-div');
    let selectText = document.createElement('p');
    selectText.textContent = 'List';
    let select = document.createElement('select');
    select.classList.add('user-input');
    buildLists(select);
    selectDiv.append(selectText, select);

    let note = document.createElement('input');
    note.type = 'text'
    note.placeholder = 'Note...';
    note.classList.add('user-input');

    let link = document.createElement('input');
    link.type = 'text'
    link.placeholder = 'URL...';
    link.classList.add('user-input');

    let dateDiv = document.createElement('div');
    dateDiv.classList.add('select-div');
    let dateText = document.createElement('p');
    dateText.textContent = 'Date';
    let date = document.createElement('input');
    date.type = 'date'
    date.classList.add('user-input');
    dateDiv.append(dateText, date);

    let createButton = document.createElement('button');
    createButton.textContent = "Create";
    createButton.classList.add('create-list-button');
    createButton.addEventListener('click', function () {
        validateForm(description.value, date.value, errorMessage);
    })

    let backButton = document.createElement('button');
    backButton.textContent = "Home";
    backButton.classList.add('back-button');
    backButton.addEventListener('click', showHomePage);

    let errorMessage = document.createElement('p');
    errorMessage.textContent = ' ';
    errorMessage.id = 'create-item-message';
    errorMessage.style.textAlign = 'center';

    div.append(title, description, selectDiv, note, link, dateDiv, createButton, backButton, errorMessage);

    return div;

};

function buildLists(selectElement) {
    for(let x=0; x< userLists.length; x++){
        let option = document.createElement('option');
        option.text = userLists[x].name;
        selectElement.append(option);
    }
}

function validateForm(description, date, errorMessage) {
    if(description === ''){
        displayMessage(errorMessage, 'Description is required');
    } else if(date != '' && !checkDate(date)) {
        displayMessage(errorMessage, 'Date is earlier than today');
    } else {

    }
}

//Return true if date is today or later, false if earlier
function checkDate(date) {
    let today = new Date();
    today.setHours(0,0,0,0); //Set time to 0 for comparison

    let answer = compareDesc(today, parseISO(date));

    if(answer >= 0) {
        return true;
    } else {
        return false;
    }
}

//Get todays date so the min can be set
function getTodaysDate() {
    var today = new Date();
    var todaySimplified = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

    return todaySimplified;
}

export {createItemPage}