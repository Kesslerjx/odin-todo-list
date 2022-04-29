
export default class Item {
    constructor(description, list, note='', link='', date='') {
        this.description = description;
        this.list = list;
        this.note = note;
        this.link = link;
        this.date = date;
    }
}