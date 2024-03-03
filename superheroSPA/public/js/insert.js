'use strict';

(function () {

    let idField;
    let nameField;
    let yearOfBirthField;
    let superpropertyField;
    let gearField;
    let resultarea;


    document.addEventListener('DOMContentLoaded', init);

    function init() {
        resultarea = document.getElementById('resultarea');
        idField = document.getElementById('heroID');
        nameField = document.getElementById('name');
        yearOfBirthField = document.getElementById('yearOfBirth');
        superpropertyField = document.getElementById('superproperty');
        gearField = document.getElementById('gear');

        document.getElementById('submit').addEventListener('click', send);

        idField.addEventListener('focus', clear);
    }

    function clear() {
        idField.value = '';
        nameField.value = '';
        yearOfBirthField.value = '';
        superpropertyField.value = '';
        gearField.value = '';
        resultarea.textContent = '';
        resultarea.removeAttribute('class');
    }

    async function send() {
        const superhero = {
            heroID: +idField.value,
            name: nameField.value.value,
            yearOfBirth: +yearOfBirthField.value,
            superproperty: superpropertyField.value,
            gear: gearField.value
        };

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(person),
                headers: { 'Content-Type': 'application/json' },
                mode: 'cors'
            };
            const data = await fetch('http://localhost:4000/rest/superheroes', options);
            const result = await data.json();

            updateStatus(result)
        }
        catch (err) {
            updateStatus({ message: err.message, type: 'error' });
        }
    } //end of send

    function updateStatus(status) {
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }

})();