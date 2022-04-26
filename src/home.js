import { getList } from "./storage-handler";
import AddIcon from './icons/add.svg';
import RightArrow from './icons/right_arrow.svg';
import {scaleElement, showCreateListPage} from './page-handler';

const home = () => {
    let div = document.createElement('div');
    div.classList.add('home');
    
    let dueTitle  = document.createElement('p');
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

    div.append(dueTitle, listTitleDiv, listDiv);

    return div;
};

function buildUserList(listDiv) {
    let lists = getList();

    for(let x = 0; x < lists.length; x ++) {
        let element = document.createElement('div');
        element.classList.add('list-div');

        let name = document.createElement('p');
        name.textContent = lists[x].name;

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