import { Category } from '../models/Category.js';

class CategoryController {
  static async getById(req, res, _next) {
    try {
      const id = req.params.id;
      const result = await Category.getCategoryById(id);
      res.json(result);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération de la catégorie' });
    }
  }

  static async getAllCategories(_req, res, next) {
    try {
      const result = await Category.getCategories();
      res.json(result);
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: 'Erreur lors de la récupération des catégories' });
    }
    next();
  }

  static async createCategory(req, res, next) {
    try {
      const name = req.body.name;
      await Category.createCategory(name);
      res.json('Added successfully');
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id;
      await Category.destroyCategory(id);
      res.json('Deleted successfully');
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: 'Erreur lors de la suppression de la catégorie' });
    }
    next();
  }

  static async updateCategory(req, res, next) {
    try {
      const id = req.params.id;
      const name = req.body.name;
      await Category.updateCategory(id, name);
      res.json('Updated successfully');
    } catch (e) {
      console.error(e.message);
      res
        .status(500)
        .json({ message: 'Erreur lors de la mise à jour de la catégorie' });
    }
    next();
  }
}

export { CategoryController };
