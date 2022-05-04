import {itemBuilder} from './item-element-builder';

const listPage = (list) => {

    console.log(typeof list);

    let mainDiv = document.createElement('div');
    let title = document.createElement('p');
    let description = document.createElement('p');
    let hr1 = document.createElement('hr');
    let itemsTitle = document.createElement('p');

    function setPageContent() {
        title.textContent = list.name;
        description.textContent = list.description;
        itemsTitle.textContent = 'Items';
    }

    function setPageClasses() {
        mainDiv.classList.add('main-div', 'list-page');
        title.classList.add('section-title');
        itemsTitle.classList.add('section-title-smaller');
    }

    function buildItemElements() {
        let div = document.createElement('div');

        let observer = new MutationObserver(itemsDivChange);
        observer.observe(div, {
            childList: true
        });

        if(list.items.length === 0) {
            div.classList.add('item-div');
            let p = document.createElement('p');
            p.textContent = 'No items yet';
            div.append(p);
        } else {
            list.items.forEach(item => {
                div.append(itemBuilder(item));
            });
        }

        return div;
    }

    function appendElements() {
        mainDiv.append(title, description, hr1, itemsTitle, buildItemElements());
    }

    function buildPage() {

        setPageContent();
        setPageClasses();
        appendElements();

        return mainDiv;
    }

    //Checks to see if a mutation has happened and if it's a removal of an item
    //If it is, and the list now has 0 items then displayed 'No items yet'
    function itemsDivChange(mutations) {

        let record = mutations[0];

        if(record.removedNodes.length === 1 && list.items.length === 0) {
            record.target.classList.add('item-div');
            let p = document.createElement('p');
            p.textContent = 'No items yet';
            record.target.append(p);
        }
    }

    return buildPage();
};

export {listPage};