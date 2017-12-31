const ul = document.getElementById('authors');
const buttonClient = document.getElementById('client');

buttonClient.addEventListener('click', () => {
    ul.innerHTML = "";

    const xhr = new XMLHttpRequest();
    xhr.open('GET', isomorphic.getUrl(), true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const results = JSON.parse(xhr.responseText).results;
            const authors = isomorphic.parse(results);
            return authors.map(author => {
                ul.insertAdjacentHTML('beforeend', isomorphic.template(author.name, author.image, 'client'));
            });
            console.log("Rendered on client");
        }
    }
});

const buttonServer = document.getElementById('server');
buttonServer.addEventListener('click', () => {
    ul.innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/authors', true);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            ul.insertAdjacentHTML('beforeend', xhr.responseText);
        }
    }
});