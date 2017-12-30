const ul = document.getElementById('authors');
    
fetch(isomorphic.getUrl())
    .then((resp) => resp.json())
    .then(function(data) {
        let authors = isomorphic.parse(data.results);
        return authors.map(function(author) {
            ul.insertAdjacentHTML('beforeend', isomorphic.template(author.name, author.image));
        });
    })
    .catch(function(error) {
        console.log(JSON.stringify(error));
    });