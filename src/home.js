import { userLists, getDue } from "./storage-handler";
import AddIcon from './icons/add.svg';
import RightArrow from './icons/right_arrow.svg';
import { StateName, changePage} from './page-handler';

const home = () => {

    let div = document.createElement('div');
    let dueTitle  = document.createElement('p');
    let dueListDiv = document.createElement('div');
    let listTitleDiv = document.createElement('div')
    let listTitle = document.createElement('p');
    let addListBtn = document.createElement('img');
    let listDiv = document.createElement('div');

    function buildPage() {
        //Add content
        dueTitle.textContent = "Due Today";
        listTitle.textContent = "Your Lists";
        addListBtn.src = AddIcon;

        //Add classes
        div.classList.add('main-div');
        dueTitle.classList.add('section-title');
        listTitle.classList.add('section-title');
        listTitleDiv.classList.add('section-div');

        //Add listeners
        addListBtn.addEventListener('click', addListPressed);

        //Append elements
        listTitleDiv.append(listTitle, addListBtn);
        div.append(dueTitle, dueListDiv, listTitleDiv, listDiv);

        //Build list
        buildUserList();
        buildDueList();

        //Return
        return div;
    }

    function buildDueList() {
        let due = getDue();
    
        if(due.length === 0){
            let div = document.createElement('div');
            div.classList.add('list-div');
    
            let description = document.createElement('p');
            description.textContent = 'Nothing due today';
    
            div.append(description);
    
            dueListDiv.append(div);
        } else {
            for(let x=0; x < due.length; x++) {
                let div = document.createElement('div');
                div.classList.add('list-div');
        
                let description = document.createElement('p');
                description.textContent = due[x].description;
        
                div.append(description);
        
                dueListDiv.append(div);
            }
        }
    }
    
    function buildUserList() {
    
        for(let x = 0; x < userLists.length; x ++) {
            let element = document.createElement('div');
            element.classList.add('list-div');
    
            let name = document.createElement('p');
            name.textContent = userLists[x].name;
    
            let arrow = document.createElement('img');
            arrow.src = RightArrow;
            arrow.style.width = '25px';

            element.addEventListener('click', listPressed);
    
            element.append(name, arrow);
    
            listDiv.append(element);
        }
    
    };

    function addListPressed() {
        changePage(StateName.CreateList);
    }

    function listPressed(event) {

        let elementChildren = event.currentTarget.parentElement.children;
        let array = Array.from(elementChildren);
        let index = array.indexOf(event.currentTarget);

        changePage(StateName.ShowList, userLists[index])

    }

    return buildPage();
};

export {home};