
const createItemPage = () => {

    let div = document.createElement('div');
    div.classList.add('create-item-page');

    let title = document.createElement('p');
    title.textContent = 'Add an Item';
    title.classList.add('section-title');

    let description = document.createElement('input');
    description.type = 'text'
    description.placeholder = 'Description...';
    description.classList.add('user-input');

    div.append(title, description);

    return div;

};

export {createItemPage}