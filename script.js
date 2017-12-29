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
        path = require('path');

    app.use(express.static(__dirname));

    app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    const server = app.listen(3000);
    console.log('Servidor Express iniciado na porta %s', server.address().port);

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
            return authors.map(function(author) {
                console.log(template(author.name, author.image));
            })
        });
    });
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