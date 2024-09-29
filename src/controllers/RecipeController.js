import { Recipe } from '../models/Recipe.js';

class RecipeController {
  // Récupérer une recette par ID
  static async getByID(req, res, next) {
    try {
      const id = req.params.id;
      const result = await Recipe.getRecipeById(id);
      if (!result) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(result);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: 'Server error' });
    }
    next();
  }

  // Récupérer toutes les recettes
  static async getAllRecipes(_req, res, next) {
    try {
      const result = await Recipe.getRecipes();
      res.json(result);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: 'Server error' });
    }
    next();
  }

  // Créer une nouvelle recette
  static async createRecipe(req, res, next) {
    try {
      const { title, type, ingredient, category_id } = req.body;

      // Validation des données
      if (!title || !type || !ingredient || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      await Recipe.createRecipe(title, type, ingredient, category_id);
      res.status(201).json('Recipe added successfully');
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: 'Server error' });
    }
    next();
  }

  // Supprimer une recette par ID
  static async deleteRecipe(req, res, next) {
    try {
      const id = req.params.id;
      const exists = await Recipe.existsById(id);

      if (!exists) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      await Recipe.destroyRecipe(id);
      res.json('Recipe deleted successfully');
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: 'Server error' });
    }
    next();
  }

  // Mettre à jour une recette par ID
  static async updateRecipe(req, res, next) {
    try {
      const id = req.params.id;
      const { title, type, ingredient, category_id } = req.body;

      // Validation des données
      if (!title || !type || !ingredient || !category_id) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const exists = await Recipe.existsById(id);
      if (!exists) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      await Recipe.updateRecipe(id, title, type, ingredient, category_id);
      res.json('Recipe updated successfully');
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ error: 'Server error' });
    }
    next();
  }
}

export { RecipeController };
