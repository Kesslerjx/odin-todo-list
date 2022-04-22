import {header} from './header';
import {home} from './home';
import {footer} from './footer';

//Loads the page and what it will initially look like
const loadPage = () => {

    let content = document.querySelector('#content');

    //Add header to the top of it, above main
    content.append(header(), home(), footer());
};

export {loadPage}