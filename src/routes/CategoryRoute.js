import express from 'express';
import { CategoryController } from '../controllers/CategoryController.js';
import {
  addCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from '../Validators/CategoryValidator.js';

const routerC = express.Router();

routerC.get('/categories', CategoryController.getAllCategories);

routerC.get('/categories/:id', CategoryController.getById);

routerC.post(
  '/categories',
  addCategoryValidator,
  CategoryController.createCategory,
);

routerC.put(
  '/categories/:id',
  updateCategoryValidator,
  CategoryController.updateCategory,
);

routerC.delete(
  '/categories/:id',
  deleteCategoryValidator,
  CategoryController.deleteCategory,
);

export { routerC };
