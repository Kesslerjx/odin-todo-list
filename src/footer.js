
const footer = () => {

    let element = document.createElement('footer');
    let a = document.createElement('a');

    a.href = "https://github.com/Kesslerjx";
    a.target = "_blank";
    a.textContent = "@kesslerjx";

    element.appendChild(a);

    return element;

};

export {footer};