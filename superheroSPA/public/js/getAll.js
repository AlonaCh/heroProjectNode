'use strict';

(function () {

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        try {
            const data = await fetch('http://localhost:4000/rest/superheroes', { mode: 'cors' });
            const result = await data.json();

            const resultset = document.getElementById('resultset');

            for (const superhero of result) {
                const tr = document.createElement('tr');
                tr.appendChild(createCell(superhero.heroID));
                tr.appendChild(createCell(superhero.name));
                tr.appendChild(createCell(superhero.yearOfBirth));
                tr.appendChild(createCell(superhero.superproperty));
                tr.appendChild(createCell(superhero.gear));
                resultset.appendChild(tr);
            }
        }
        catch (err) {
            console.log(err)
        }
    } //end of init

    function createCell(data) {
        const td = document.createElement('td');
        td.textContent = data;
        return td;
    }

})();