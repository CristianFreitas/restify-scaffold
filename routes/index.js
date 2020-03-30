
const errors = require('restify-errors');
const Contact = require('../models/contact');

module.exports = function(server) {
    server.post('/contact', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'"),
            );
        }
        let data = req.body || {};
        let contact = new Contact(data);
        contact.save(function(err) {
            if (err) {
                console.error(err);
                return next(new errors.InternalError(err.message));
                next();
            }
            res.send(201, 'ok');
            next();
        });
    });
 
    server.get('/contact', (req, res, next) => {
        Contact.apiQuery(req.params, function(err, docs) {
            if (err) {
                console.error(err);
                return next(
                    new errors.InvalidContentError(err.errors.name.message),
                );
            }
            res.send(docs);
            next();
        });
    });

    server.get('/contact/:contact_id', (req, res, next) => {
        Contact.findOne({ _id: req.params.contact_id }, function(err, doc) {
            if (err) {
                console.error(err);
                return next(
                    new errors.InvalidContentError(err.errors.name.message),
                );
            }
            res.send(doc);
            next();
        });
    });

    server.put('/contact/:contact_id', (req, res, next) => {
        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'"),
            );
        }
        let data = req.body || {};
        if (!data._id) {
            data = Object.assign({}, data, { _id: req.params.contact_id });
        }
        Contact.findOne({ _id: req.params.contact_id }, function(err, doc) {
            if (err) {
                console.error(err);
                return next(
                    new errors.InvalidContentError(err.errors.name.message),
                );
            } else if (!doc) {
                return next(
                    new errors.ResourceNotFoundError(
                        'The resource you requested could not be found.',
                    ),
                );
            }
            Contact.update({ _id: data._id }, data, function(err) {
                if (err) {
                    console.error(err);
                    return next(
                        new errors.InvalidContentError(err.errors.name.message),
                    );
                }
                res.send(200, data);
                next();
            });
        });
    });

    server.del('/contact/:contact_id', (req, res, next) => {
        Todo.remove({ _id: req.params.contact_id }, function(err) {
            if (err) {
                console.error(err);
                return next(
                    new errors.InvalidContentError(err.errors.name.message),
                );
            }
            res.send(204, 'ok');
            next();
        });
    });
};