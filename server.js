const express = require('express'),
    app = express(),
    exphbs  = require('express-handlebars'),
    https = require('https'),
    isomorphic = require('./isomorphic');

app.use(express.static(__dirname));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, resp) {
    resp.render('authors');
});

app.get('/authors', function(req, resp){
    https.get(isomorphic.getUrl(), response => {
        response.setEncoding('utf8');
        let body = '';
        response.on('data', data => {
            body += data;
        });
        response.on('end', () => {
            body = JSON.parse(body);
            let authors = isomorphic.parse(body.results);
            let renderedAuthors = authors.map(function(author) {
                return isomorphic.template(author.name, author.image, 'server');
            }).join('');
            resp.send(renderedAuthors);
        });
    });
})
app.get('/authors-server', function(req, resp){
    https.get(isomorphic.getUrl(), response => {
        response.setEncoding('utf8');
        let body = '';
        response.on('data', data => {
            body += data;
        });
        response.on('end', () => {
            body = JSON.parse(body);
            let authors = isomorphic.parse(body.results);
            let renderedAuthors = authors.map(function(author) {
                return isomorphic.template(author.name, author.image, 'server');
            }).join('');
            resp.render('authors', {authors: renderedAuthors});
        });
    });
});

app.get('/authors', function(req, resp){
    https.get(isomorphic.getUrl(), response => {
        response.setEncoding('utf8');
        let body = '';
        response.on('data', data => {
            body += data;
        });
        response.on('end', () => {
            body = JSON.parse(body);
            let authors = isomorphic.parse(body.results);
            let renderedAuthors = authors.map(function(author) {
                return isomorphic.template(author.name, author.image, 'server');
            }).join('');
            resp.send(renderedAuthors);
        });
    });
})

const server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);