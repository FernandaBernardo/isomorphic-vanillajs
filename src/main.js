const render = require('./render');

const layout = `
<section>
  <div id="content">
    Oie
  </div>
</section>
`;

const main = function() {
    const layoutContainer = document.getElementById('app');
    render({ markup: layout, el: layoutContainer });
}

module.exports = main;