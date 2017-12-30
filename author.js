class Author {
    constructor(firstName, lastName, imageSrc) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageSrc = imageSrc;
    }
    
    get name() {
        return this.firstName + " " + this.lastName;
    }
    
    get image() {
        return this.imageSrc;
    }
}

if (typeof module === 'object') {
    module.exports = Author;
}