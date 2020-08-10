const db = require('../db/config');

class Todo {
    constructor(todo) {
        this.id = todo.id ||null;
        this.name = todo.name;
        this.description = todo.description; 
    }

    static getAll() {
        return db
        .manyOrNone ('SELECT * FROM pokemon ORDER BY id ASC')
        .then((todo) => {
            return todo.map((todo) => {
                return new this(todo);
            });
        });
    }
    static getById(id) {
            return db
            .oneOrNone('SELECT * FROM todo WHERE id = $1', id)
            .then((todo) => {
                if(todo) return new this(todo);
                throw new Error('nothing specific todo');
            });
        }
        save() {
            return db
            .one(
                `
                INSERT INTO  todo (name, description)
                VALUES ($/name/, $.description/)
                RETURNING *`,
                this
            )
            .then((todo) => {
                return Object.assign(this, todo);
            });
        }

        update(changes) {
            Object.assign(this, changes);
            return db
            .oneOrNone(
                `
                UPDATE  SET
                name = $/name/,
                description = $/description/
                WHERE id = $/id/
                RETURNING`,
                this
            )
            .then((todo) => {
                return Object.assign(this, todo);
            });
        }

        delete() {
            return db.oneOrNone('DELETE FROM todo WHERE id = $1', this.id);
        }
    }

    module.exports = Todo;
