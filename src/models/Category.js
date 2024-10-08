import { pool } from '../config/db.js';

class Category {
  static async createCategory(name) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO categories (name) VALUES (?)',
        [name],
      );
      return result.insertId;
    } finally {
      connection.release();
    }
  }

  static async getCategoryById(id) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'SELECT * FROM categories WHERE id = ?',
        [id],
      );
      return result.length > 0 ? result[0] : null;
    } finally {
      connection.release();
    }
  }

  static async getCategories() {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute('SELECT * FROM categories');
      return result;
    } finally {
      connection.release();
    }
  }


  static async updateCategory(id, name) {
    const connection = await pool.getConnection();
    try {
      await connection.execute('UPDATE categories SET name = ? WHERE id = ?', [
        name,
        id,
      ]);
      return true;
    } finally {
      connection.release();
    }
  }

  static async destroyCategory(id) {
    const connection = await pool.getConnection();
    try {
      await connection.execute('DELETE FROM categories WHERE id = ?', [id]);
      return true;
    } finally {
      connection.release();
    }
  }

  static async checkCategory(name) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'SELECT COUNT(*) as count FROM categories WHERE name= ?',
        [name],
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
        'SELECT COUNT(*) as count FROM categories WHERE id = ?',
        [id],
      );
      return result[0].count;
    } finally {
      connection.release();
    }
  }
}

export { Category };
