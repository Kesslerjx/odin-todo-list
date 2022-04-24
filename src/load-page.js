import { header } from './header';
import { home } from './home';
import { footer } from './footer';
import { setMode } from './page-handler';

//Loads the page and what it will initially look like
const loadPage = () => {

    //Set mode
    setMode();

    let content = document.querySelector('#content');

    let main = document.createElement('main');

    main.append(home());

    //Add header to the top of it, above main
    content.append(header(), main, footer());
};

export {loadPage}