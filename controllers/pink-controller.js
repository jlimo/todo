const Panther = require('../models/todo');

const pinkController = {};

pinkController.index = (req, res, next) => {
    Panther.getAll()
    .then((todo) => {
        res.render('todo/index', {
            message: 'ok',
            data: { todo },
        });
    })
    .catch(next);
};

pinkController.show = (req, res, next) => {
    Panther.getById(req.params.id)
    .then((todo) => {
        res.locals.todo = todo;
        next();
    })
    .catch(next);
};

pokeController.create = (req, res) => {
    new Panther({
        name: req.body.name,
        description: req.body.description
    })
    .save()
    .then(() => {
        res.redirect('/todo')
    })
    .catch(next);
};

pinkController.update = (req, res) => {
    Panther.getById(req.params.id)
    .then((todo) => {
        return todo.update(req.body);
    })
    .then((updatedTodo) => {
        res.redirect(`/todo/${updatedTodo}`);
    })
    .catch(next);
};

pinkController.delete = (req, res) => {
    Panther.getById(req.params.id)
    .then((todo) => {
        return Panther.delete();
    })
    .then(() => {
        res.redirect('/todo');
    })
    .catch(next);
};

module.exports = pinkController;