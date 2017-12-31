if (typeof module === 'object') {
    Author = require('./author');
}

const isomorphic = {
    parse: (authors) => {
        return authors.map((author) => {
            return new Author(author.name.first, author.name.last, author.picture.medium);
        });
    },
    template: (name, image, className) => {
        return `<li class='${className}'><img src="${image}"><span>${name}</span></li>`;
    },
    getUrl: () => {
        return 'https://randomuser.me/api/?results=10';
    }
};

if (typeof module === 'object') {
    module.exports = isomorphic;
}