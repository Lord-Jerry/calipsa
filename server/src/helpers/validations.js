const Validator = require('validatorjs');

const validateGetAllRoute = (req, _, next) => {
    const rules = {
        page: 'numeric',
    };

    const validate = new Validator(req.query, rules);

    if (!validate.passes()) {
        const err = new Error();
        err.message = validate.errors;
        err.status = 400;
        return next(err);
    }

    return next();
};

const validateFilterRoute = (req, _, next) => {
    const rules = {
        page: 'numeric',
        date_from: 'required_with_all:date_to|date',
        date_to: 'required_with_all:date_from|date',
        outcome: 'boolean',
    };

    const validate = new Validator(req.query, rules);

    req.query.outcome = new RegExp(/^true|false/i).test(req.query.outcome)
        ? (req.query.outcome = JSON.parse(req.query.outcome))
        : req.query.outcome;

    if (!validate.passes()) {
        const err = new Error();
        err.message = validate.errors;
        err.status = 400;
        return next(err);
    }

    return next();
};

module.exports = { validateGetAllRoute, validateFilterRoute };
