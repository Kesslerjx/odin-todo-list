
export default class List {
    constructor(name, description, deletable) {
        this.name = name;
        this.description = description;
        this.items = []; //Create the list with an empty array of items
        this.history = [];
        this.deletable = deletable;
    }
}