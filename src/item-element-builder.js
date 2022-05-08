import CheckboxIcon from './icons/checkbox_outline.svg';
import MoreIcon from './icons/more_icon.svg';
import CheckboxCheckedIcon from './icons/checkbox_checked.svg';
import {deleteItem} from './storage-handler';
import { StateName, changePage } from './page-handler';
import {format, parseISO} from 'date-fns';

const itemBuilder = (item) => {

    let itemDiv = document.createElement('div');
    let checkbox = document.createElement('img');
    let itemTextDiv = document.createElement('div');
    let itemDesc = document.createElement('p');
    let itemDate = document.createElement('p');
    let dropDiv = document.createElement('div');
    let moreButton = document.createElement('img');
    let dropDivContent = document.createElement('div');
    let editOption = document.createElement('p');
    let deleteOption = document.createElement('p');

    function setClasses() {
        itemDiv.classList.add('item-div');
        itemDate.classList.add('item-due-date');
        checkbox.classList.add('checkbox-icon');
        dropDiv.classList.add('dropdown');
        moreButton.classList.add('dropdown-button');
        dropDivContent.classList.add('dropdown-content');
    }

    function setContent() {
        itemDesc.textContent = item.description;

        if(item.date !== '') {
            itemDate.textContent = format(parseISO(item.date), 'MMMM dd, yyyy');
        } else {
            itemDate.textContent = 'No due date';
        }

        editOption.textContent = 'Edit';
        deleteOption.textContent = 'Delete';

        checkbox.src = CheckboxIcon;
        moreButton.src = MoreIcon;
    }

    function addEventListeners() {
        checkbox.addEventListener('click', checkboxPressed);
        editOption.addEventListener('click', editPressed);
        deleteOption.addEventListener('click', deletePressed);
    }

    function appendElements() {
        itemTextDiv.append(itemDesc, itemDate);
        dropDivContent.append(editOption, deleteOption);
        dropDiv.append(moreButton, dropDivContent);
        itemDiv.append(checkbox, itemTextDiv, dropDiv);
    }

    function buildElement() {

        setClasses();
        setContent();
        addEventListeners();
        appendElements();
        
        return itemDiv;
    }

    function checkboxPressed(event) {
        console.log('Checkbox item pressed');

        //Change image
        checkbox.src = CheckboxCheckedIcon;

        //Wait a second
        setTimeout(() => {  deleteItem(item); deleteItemFromDiv(event); }, 2000);

    }

    function editPressed() {
        console.log('Edit item pressed');
        changePage(StateName.EditItem, item);
    }

    function deletePressed(event) {
        console.log('Delete item pressed');

        if(confirm("Are you sure you want to delete this item?")) {
            deleteItem(item);
            deleteItemFromDiv(event);
        } else {
            console.log("User canceled item delete");
        }
    }

    function deleteItemFromDiv(event) {
        if(event.currentTarget === null) {
            event.target.parentElement.remove();
        } else {
            event.currentTarget.parentElement.parentElement.parentElement.remove();
        }
    }

    return buildElement()
}

export {itemBuilder};