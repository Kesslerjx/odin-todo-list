
const itemPage = (item) => {

    let mainDiv = document.createElement('div');
    let title = document.createElement('p');

    function buildPage() {

        setContent();
        setClasses();
        appendElements();

        return mainDiv;
    }

    function setContent() {
        title.textContent = item.description;
    }

    function setClasses() {
        mainDiv.classList.add('main-div');
        title.classList.add('section-title');
    }

    function appendElements() {
        mainDiv.append(title);
    }

    return buildPage();

}

export {itemPage};