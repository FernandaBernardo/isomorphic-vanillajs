const express = require('express'),
    app = express(),
    exphbs  = require('express-handlebars'),
    https = require('https'),
    isomorphic = require('./isomorphic');

app.use(express.static(__dirname));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, resp) => {
    resp.render('authors');
});

// ROUTERS CONFIG

app.get('/authors-server', (req, resp) => {
    https.get(isomorphic.getUrl(), response => {
        response.setEncoding('utf8');
        let body = '';
        response.on('data', data => {
            body += data;
        });
        response.on('end', () => {
            body = JSON.parse(body);
            const authors = isomorphic.parse(body.results);
            const renderedAuthors = authors.map((author) => {
                return isomorphic.template(author.name, author.image, 'server');
            }).join('');
            resp.render('authors', {authors: renderedAuthors});
            console.log("Rendered on server");
        });
    });
});

app.get('/authors', (req, resp) => {
    https.get(isomorphic.getUrl(), response => {
        response.setEncoding('utf8');
        let body = '';
        response.on('data', data => {
            body += data;
        });
        response.on('end', () => {
            body = JSON.parse(body);
            const authors = isomorphic.parse(body.results);
            const renderedAuthors = authors.map( author => {
                return isomorphic.template(author.name, author.image, 'server');
            }).join('');
            resp.send(renderedAuthors);
        });
    });
});

const server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);