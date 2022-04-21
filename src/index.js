import './style.css';

import {header} from './header';

console.log("webpack is setup");

//Get elements
let body = document.querySelector('body');
let main = document.querySelector('main');

body.prepend(header());

