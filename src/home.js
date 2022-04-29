import { userLists, getDue } from "./storage-handler";
import AddIcon from './icons/add.svg';
import RightArrow from './icons/right_arrow.svg';
import {scaleElement, showCreateListPage} from './page-handler';

const home = () => {
    let div = document.createElement('div');
    div.classList.add('home');
    
    let dueTitle  = document.createElement('p');
    let dueListDiv = document.createElement('div');
    let listTitleDiv = document.createElement('div')
    let listTitle = document.createElement('p');
    let addListBtn = document.createElement('img');
    let listDiv = document.createElement('div');

    dueTitle.textContent = "Due Today";
    listTitle.textContent = "Your Lists";
    addListBtn.src = AddIcon;

    listTitleDiv.append(listTitle, addListBtn);

    dueTitle.classList.add('section-title');
    listTitle.classList.add('section-title');
    listTitleDiv.classList.add('section-div');

    addListBtn.addEventListener('click', addListPressed);

    buildUserList(listDiv);
    buildDueList(dueListDiv);

    div.append(dueTitle, dueListDiv, listTitleDiv, listDiv);

    return div;
};

function buildDueList(dueListDiv) {
    let due = getDue();

    for(let x=0; x < due.length; x++) {
        let div = document.createElement('div');
        div.classList.add('list-div');

        let description = document.createElement('p');
        description.textContent = due[x].description;

        div.append(description);

        dueListDiv.append(div);
    }
}

function buildUserList(listDiv) {

    for(let x = 0; x < userLists.length; x ++) {
        let element = document.createElement('div');
        element.classList.add('list-div');

        let name = document.createElement('p');
        name.textContent = userLists[x].name;

        let arrow = document.createElement('img');
        arrow.src = RightArrow;
        arrow.style.width = '25px';

        element.append(name, arrow);

        listDiv.append(element);
    }

};

function addListPressed(event) {
    scaleElement(event.target);
    showCreateListPage();
}

export {home};