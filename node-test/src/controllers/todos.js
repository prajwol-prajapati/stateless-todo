import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as todoService from '../services/todoService';

const router = Router();

// GET /api/todos/
router.get('/', (req, res, next) => {
  todoService
    .getAllTodos()
    .then(data => {
      let tempData = data.pagination;
      console.log(data);
      res.json({ metadata: tempData, data });
    })
    .catch(err => next(err));
});

// POST /api/todos
router.post('/', (req, res, next) => {
  todoService
    .createTodo(req.body, /*req.token.encryptedData.id*/ 1)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

// SEARCH by query
router.get('/search', (req, res, next) => {
  todoService
    .searchTodo(req.query.key)
    .then(data => {
      res.json({ data });
    })
    .catch(err => next(err));
});

// PUT /api/todos/id
router.put('/:id', (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

// DELETE /api/todos/id
router.delete('/:id', (req, res, next) => {
  todoService
    .deleteTodo(req.params.id, next)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
