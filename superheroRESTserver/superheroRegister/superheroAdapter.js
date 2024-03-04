'use strict';

function adapt(item) {
    return Object.assign(item, {
        heroID: +item.heroID,
        yearOfBirth: +item.yearOfBirth
    }
    )
}

module.exports = { adapt }