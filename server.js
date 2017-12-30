const express = require('express'),
    app = express(),
    exphbs  = require('express-handlebars'),
    https = require('https'),
    isomorphic = require('./isomorphic');

app.use(express.static(__dirname));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, response){
    https.get(isomorphic.getUrl(), res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            let authors = isomorphic.parse(body.results);
            let renderedAuthors = authors.map(function(author) {
                return isomorphic.template(author.name, author.image);
            }).join('');
            response.render('authors', {authors: renderedAuthors});
        });
    });
});

const server = app.listen(3000);
console.log('Servidor Express iniciado na porta %s', server.address().port);