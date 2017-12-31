const ul = document.getElementById('authors');
const buttonClient = document.getElementById('client');

buttonClient.addEventListener('click', function() {
    ul.innerHTML = "";
    fetch(isomorphic.getUrl())
        .then((resp) => resp.json())
        .then(function(data) {
            let authors = isomorphic.parse(data.results);
            return authors.map(function(author) {
                ul.insertAdjacentHTML('beforeend', isomorphic.template(author.name, author.image, "client"));
            });
            console.log("Rendered on client");
        })
        .catch(function(error) {
            console.log(JSON.stringify(error));
        });
});

const buttonServer = document.getElementById('server');
buttonServer.addEventListener('click', function() {
    ul.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/authors', true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            ul.insertAdjacentHTML('beforeend', xhr.responseText);
        }
    }
});