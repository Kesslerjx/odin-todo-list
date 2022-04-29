import {getMode, saveMode, clearData} from './storage-handler';
import {setMode, showHomePage} from './page-handler';

const settings = () => {

    let mainDiv = document.createElement('div');
    let modeDiv  = document.createElement('div');
    let p        = document.createElement('p');
    let checkbox = document.createElement('input');
    let clearBtn = document.createElement('button');
    let backBtn  = document.createElement('button');

    const buildPage = () => {
        p.textContent  = 'Dark Mode';
        checkbox.type  = 'checkbox';
        clearBtn.textContent = "Clear Data";
        backBtn.textContent  = 'Home';
    
        checkbox.checked = getMode();
    
        mainDiv.classList.add('settings');
        modeDiv.classList.add('mode-div');
        clearBtn.classList.add('clear-button');
        backBtn.classList.add('back-button');
        checkbox.classList.add('checkbox');
    
        checkbox.addEventListener('change', checkboxPressed);
        clearBtn.addEventListener('click', clearPressed);
        backBtn.addEventListener('click', backPressed);
    
        modeDiv.append(p, checkbox);
    
        mainDiv.append(modeDiv, clearBtn, backBtn);

        return mainDiv;
    }

    const checkboxPressed = () => {
        if(checkbox.checked) {
            //Save mode
            saveMode(true);
        } else {
            //Save mode
            saveMode(false);
        }
    
        //Set mode
        setMode();
    }

    const clearPressed = () => {
        if(confirm("Are you sure you want to clear ALL of your data?")) {
            //Clear all stored data
            clearData();
    
            //Change theme
            setMode();
    
            //Uncheck the checkbox
            checkbox.checked = getMode();
        } else {
            console.log("Clear data was canceled");
        }
    }
    
    const backPressed = () => {
        showHomePage();
    }

    return buildPage();
};

export {settings};