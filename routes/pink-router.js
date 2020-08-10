const express = require('express');
const pinkRouter = express.Router();

const pinkController = require('../controllers/pink-controller');

pinkRouter.get('/', pinkController.index);
pinkRouter.post('/', pinkController.create);

pinkRouter.get('/add', (req, res) => {
    res.render('pink/add');
});

pinkRouter.get('/:id([0-9])/edit', pinkController.show, (req, res) => {
    res.render('todo/edit', {
        todo: res.locals.todo,
    });
});

pinkRouter.put('/:id', pinkController.update);

pinkRouter.delete('/id', pinkController.update);

module.exports = pinkRouter;