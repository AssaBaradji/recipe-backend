import express from 'express';
import { CategoryController } from '../controllers/CategoryController.js';


const routerC = express.Router();
routerC.get('/categories', CategoryController.getAllCategories);

routerC.get('/categories/:id', CategoryController.getById);

routerC.post('/categories', CategoryController.createCategory);

routerC.put('/categories/:id', CategoryController.updateCategory);

routerC.delete('/categories/:id', CategoryController.deleteCategory);


export { routerC };
