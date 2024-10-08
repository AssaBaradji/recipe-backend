import { pool } from '../config/db.js';

class Recipe {
  static async createRecipe(title, type, ingredient, categoryId) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO recipes (title, type, ingredient, category_id) VALUES (?, ?, ?, ?)',
        [title, type, ingredient, categoryId],
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }


  static async getRecipeById(id) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'SELECT * FROM recipes WHERE id = ?',
        [id],
      );
      return result.length > 0 ? result[0] : null;
    } finally {
      connection.release();
    }
  }

  

  static async getRecipes() {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(`
        SELECT r.*, c.name AS category_name 
        FROM recipes r
        LEFT JOIN categories c ON r.category_id = c.id
      `);

      return result.map((recipe) => ({
        ...recipe,
      }));
    } finally {
      connection.release();
    }
  }

  static async updateRecipe(id, title, type, ingredient) {
    const connection = await pool.getConnection();
    try {
      await connection.execute(
        'UPDATE recipes SET title = ?, type = ?, ingredient = ? WHERE id = ?',
        [title, type, ingredient, id],
      );
      return true;
    } finally {
      connection.release();
    }
  }

  static async destroyRecipe(id) {
    const connection = await pool.getConnection();
    try {
      await connection.execute('DELETE FROM recipes WHERE id = ?', [id]);
      return true;
    } finally {
      connection.release();
    }
  }

  static async checkRecipe(title) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'SELECT COUNT(*) as count FROM recipes WHERE title = ?',
        [title],
      );
      return result[0].count;
    } finally {
      connection.release();
    }
  }

  static async existsById(id) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'SELECT COUNT(*) as count FROM recipes WHERE id = ?',
        [id],
      );
      return result[0].count;
    } finally {
      connection.release();
    }
  }
}

export { Recipe };
