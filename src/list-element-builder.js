import MoreIcon from './icons/more_icon.svg';
import { StateName, changePage } from './page-handler';
import { userLists, deleteList } from './storage-handler';

const listBuilder = (list) => {

    let listDiv = document.createElement('div');
    let listName = document.createElement('p');
    let dropDiv = document.createElement('div');
    let moreButton = document.createElement('img');
    let dropDivContent = document.createElement('div');
    let editOption = document.createElement('p');
    let deleteOption = document.createElement('p');

    function setClasses() {
        listDiv.classList.add('list-div');
        dropDiv.classList.add('dropdown');
        moreButton.classList.add('dropdown-button');
        dropDivContent.classList.add('dropdown-content');
    }

    function setContent() {
        listName.textContent = list.name;

        editOption.textContent = 'Edit';
        deleteOption.textContent = 'Delete';

        moreButton.src = MoreIcon;
    }

    function addEventListeners() {
        listDiv.addEventListener('click', listPressed);
        editOption.addEventListener('click', editPressed);
        deleteOption.addEventListener('click', deletePressed);
    }

    function appendElements() {

        listDiv.append(listName);

        if(list.deletable) {
            dropDivContent.append(editOption, deleteOption);
            dropDiv.append(moreButton, dropDivContent);
            listDiv.append(dropDiv);
        } else {
            listName.style.padding = '11px 0px';
        }

    }

    function buildElement() {

        setClasses();
        setContent();
        addEventListeners();
        appendElements();
        
        return listDiv;
    }

    function editPressed(event) {
        console.log('Edit list pressed');
        event.stopPropagation();

        changePage(StateName.EditList, list);
    }

    function deletePressed(event) {
        console.log('Delete list pressed');
        event.stopPropagation();

        if(confirm("Are you sure you want to delete this list?")) {
            deleteList(list);
            deleteListFromDiv(event);
        } else {
            console.log("User canceled item delete");
        }
    }

    function deleteListFromDiv(event) {
        event.currentTarget.parentElement.parentElement.parentElement.remove();
    }


    function listPressed(event) {

        console.log('list pressed');

        let elementChildren = event.currentTarget.parentElement.children;
        let array = Array.from(elementChildren);
        let index = array.indexOf(event.currentTarget);

        changePage(StateName.ShowList, userLists[index])

    }

    return buildElement()
}

export {listBuilder};