const Validator = require('validator')
const isEmpty = require('./is-empty');


module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';



    if (!Validator.isLength(data.text, {
            min: 4,
            max: 300
        })) {
        errors.text = 'Post must be between 4 and 300 characters';
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = 'Text is invalid';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}