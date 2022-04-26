import { showHomePage } from "./page-handler";

const createListPage = () => {
    let div = document.createElement('div');
    div.classList.add('create-list-page');

    let sectionTitle = document.createElement('p');
    sectionTitle.textContent = 'Create a List';
    sectionTitle.classList.add('section-title');

    let listName = document.createElement('input');
    listName.type = 'text';
    listName.placeholder = 'List name...';

    let listDescription = document.createElement('input');
    listDescription.type = 'text';
    listDescription.placeholder = 'List description...';

    let createButton = document.createElement('button');
    createButton.textContent = "Create";
    createButton.classList.add('create-list-button');

    let backButton = document.createElement('button');
    backButton.textContent = "Back";
    backButton.classList.add('back-button');
    backButton.addEventListener('click', showHomePage);

    div.append(sectionTitle, listName, listDescription, createButton, backButton);

    return div;
};

export {createListPage};