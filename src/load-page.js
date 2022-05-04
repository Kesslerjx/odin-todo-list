import { header } from './header';
import { footer } from './footer';
import { setMode, showHomePage } from './page-handler';

//Loads the page and what it will initially look like
const loadPage = () => {

    //Set mode
    setMode();

    let content = document.querySelector('#content');

    let main = document.createElement('main');

    //Add header to the top of it, above main
    content.append(header(), main, footer());
    
    showHomePage();
};

export {loadPage}