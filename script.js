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

const parser = {
    parse: function(authors) {
        return authors.map((author) => {
            return new Author(author.name.first, author.name.last, author.picture.medium);
        });
    }
};

const url = 'https://randomuser.me/api/?results=10';

const template = (name, image) => `<li><img src="${image}"><span>${name}</span></li>`;

if (typeof module === 'object') {
    const express = require('express'),
        app = express(),
        path = require('path'),
        exphbs  = require('express-handlebars');

    app.use(express.static(__dirname));
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.get('/', function(req, response){
        const https = require('https');
        https.get(url, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                let authors = parser.parse(body.results);
                let renderedAuthors = authors.map(function(author) {
                    return template(author.name, author.image);
                });
                response.render('authors', {authors: renderedAuthors.join('')});
            });
        });
    });

    const server = app.listen(3000);
    console.log('Servidor Express iniciado na porta %s', server.address().port);
} else {
    const ul = document.getElementById('authors');
    
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let authors = parser.parse(data.results);
        return authors.map(function(author) {
            ul.insertAdjacentHTML('beforeend', template(author.name, author.image));
        });
    })
    .catch(function(error) {
        console.log(JSON.stringify(error));
    });
}