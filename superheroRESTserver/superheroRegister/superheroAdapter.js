'use strict';

function adapt(item) {
    return Object.assign(item, {
        id: +item.heroID,
        yearOfBirth: +item.yearOfBirth
    }
    )
}

module.exports = { adapt }