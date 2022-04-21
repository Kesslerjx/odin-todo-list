import './style.css';
import {header} from './header';

//Get elements
let body = document.querySelector('body');
let main = document.querySelector('main');

body.prepend(header());

