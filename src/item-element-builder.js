import CheckboxIcon from './icons/checkbox_outline.svg';
import MoreIcon from './icons/more_icon.svg';
import {deleteItem} from './storage-handler';

const itemBuilder = (item) => {

    let itemDiv = document.createElement('div');
    let checkbox = document.createElement('img');
    let itemDesc = document.createElement('p');
    let dropDiv = document.createElement('div');
    let moreButton = document.createElement('img');
    let dropDivContent = document.createElement('div');
    let editOption = document.createElement('p');
    let viewOption = document.createElement('p');
    let deleteOption = document.createElement('p');

    function setClasses() {
        itemDiv.classList.add('item-div');
        checkbox.classList.add('checkbox-icon');
        dropDiv.classList.add('dropdown');
        moreButton.classList.add('dropdown-button');
        dropDivContent.classList.add('dropdown-content');
    }

    function setContent() {
        itemDesc.textContent = item.description;
        editOption.textContent = 'Edit';
        viewOption.textContent = 'View';
        deleteOption.textContent = 'Delete';

        checkbox.src = CheckboxIcon;
        moreButton.src = MoreIcon;
    }

    function addEventListeners() {
        checkbox.addEventListener('click', checkboxPressed);
        editOption.addEventListener('click', editPressed);
        viewOption.addEventListener('click', viewPressed);
        deleteOption.addEventListener('click', deletePressed);
    }

    function appendElements() {
        dropDivContent.append(editOption, viewOption, deleteOption);
        dropDiv.append(moreButton, dropDivContent);
        itemDiv.append(checkbox, itemDesc, dropDiv);
    }

    function buildElement() {

        setClasses();
        setContent();
        addEventListeners();
        appendElements();
        
        return itemDiv;
    }

    function checkboxPressed() {
        console.log('Checkbox item pressed');
    }

    function editPressed() {
        console.log('Edit item pressed');
    }

    function viewPressed() {
        console.log('View item pressed');
    }

    function deletePressed(event) {
        console.log('Delete item pressed');

        if(confirm("Are you sure you want to delete this option?")) {
            deleteItem(item);
            deleteItemFromDiv(event);
        } else {
            console.log("User canceled item delete");
        }
    }

    function deleteItemFromDiv(event) {
        event.currentTarget.parentElement.parentElement.parentElement.remove();
    }

    return buildElement()
}

export {itemBuilder};