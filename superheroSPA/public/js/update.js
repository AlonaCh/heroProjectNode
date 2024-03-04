'use strict';

(function () {

    let idField;
    let nameField;
    let yearOfBirthField;
    let superpropertyField;
    let gearField;
    let resultarea;


    let searchState = true;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        idField = document.getElementById('heroID');
        nameField = document.getElementById('name');
        yearOfBirthField = document.getElementById('yearOfBirth');
        superpropertyField = document.getElementById('superproperty');
        gearField = document.getElementById('gear');

        resultarea = document.getElementById('resultarea');

        updateFieldsAccess();
        document.getElementById('submit').addEventListener('click', send);

        document.getElementById('clear').addEventListener('click', reset);

        idField.addEventListener('focus', clearAll);

    } //end of init

    function reset() {
        searchState = true;
        clearAll();
    }

    function clearAll() {
        if (searchState) {
            idField.value = '';
            nameField.value = '';
            yearOfBirthField.value = '';
            superpropertyField.value = '';
            gearField.value = '';
            resultarea.textContent = '';
            resultarea.removeAttribute('class');
            updateFieldsAccess();

        }
    }//end of clearAll

    function updateFieldsAccess() {
        if (searchState) {
            idField.removeAttribute('readonly');
            nameField.setAttribute('readonly', true);
            yearOfBirthField.setAttribute('readonly', true);
            superpropertyField.setAttribute('readonly', true);
            gearField.setAttribute('readonly', true);
        }
        else {
            idField.setAttribute('readonly', true);
            nameField.removeAttribute('readonly');
            yearOfBirthField.removeAttribute('readonly');
            superpropertyField.removeAttribute('readonly');
            gearField.removeAttribute('readonly');
        }

    }//updateFieldsAccess

    async function send() {
        const baseUri = 'http://localhost:4000/rest/superheroes';
        try {
            if (searchState) {
                //get data
                const data = await fetch(`${baseUri}/heroID/${idField.value}`, { mode: 'cors' });
                const result = await data.json();
                if (result.length > 0) {
                    const superhero = result[0];
                    idField.value = superhero.heroID;
                    nameField.value = superhero.name;
                    yearOfBirthField.value = superhero.yearOfBirth;
                    superpropertyField.value = superhero.superproperty;
                    gearField.value = superhero.gear;
                    searchState = false;
                    updateFieldsAccess();
                }
                else {
                    updateStatus({ message: 'Nothing found', type: 'error' });
                }
            }
            else {
                //put data
                const superhero = {
                    heroID: +idField.value,
                    name: nameField.value,
                    yearOfBirth: +yearOfBirthField.value,
                    superproperty: superpropertyField.value,
                    gear: gearField.value
                };
                const options = {
                    method: 'PUT',
                    mode: 'cors',
                    body: JSON.stringify(superhero),
                    headers: { 'Content-Type': 'application/json' }
                }
                const data = await fetch(`${baseUri}/${superhero.heroID}`, options);
                const result = await data.json();

                updateStatus(result);
            }
        }

        catch (error) {
            updateStatus({ message: error.message, type: 'error' });
        }
    }//end of send
    function updateStatus(status) {
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }

    function updateStatus(status) {
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }
})();