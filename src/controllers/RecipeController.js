import { Recipe } from '../models/Recipe.js';

class RecipeController {
  static async getByID(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Recipe.getRecipeById(id);
      res.json(result);
    } catch (e) {
      console.log(e.message);
    }
    next();
  }
  static async getAllRecipes(_req, res, next) {
    try {
      const result = await Recipe.getRecipes();
      res.json(result);
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async createRecipe(req, res) {
    const { title, type, ingredient, category_id } = req.body;

    if (!title || !type || !ingredient || category_id === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const insertId = await Recipe.createRecipe(
        title,
        type,
        ingredient,
        category_id,
      );
      res.status(201).json({ message: 'Added successfully', id: insertId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async deleteRecipe(req, res, next) {
    try {
      const id = req.params.id;
      await Recipe.destroyRecipe(id);
      res.json('Deleted successfully');
    } catch (e) {
      console.log(e.message);
    }
    next();
  }

  static async updateRecipe(req, res, next) {
    try {
      const id = req.params.id;
      const title = req.body.title;
      const type = req.body.type;
      const ingredient = req.body.ingredient;
      await Recipe.updateRecipe(id, title, ingredient, type);
      res.json('Updted successfully');
    } catch (e) {
      console.log(e.message);
    }
    next();
  }
}

export { RecipeController };
