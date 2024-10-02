import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Category } from '../models/Category.js';

const addCategoryValidator = [
  check('name')
    .notEmpty()
    .withMessage('Le nom de la catégorie ne peut pas être vide!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Le nom doit contenir au moins 3 caractères.')
    .bail()
    .custom(async (value) => {
      const count = await Category.checkCategory(value);
      if (count > 0) {
        throw new Error('Cette catégorie existe déjà!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

const deleteCategoryValidator = [
  param('id')
    .notEmpty()
    .withMessage("L'id de la catégorie est obligatoire!")
    .bail()
    .custom(async (value) => {
      const count = await Category.existsById(value);
      if (count === 0) {
        throw new Error("Cette catégorie n'existe pas!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

const updateCategoryValidator = [
  param('id')
    .notEmpty()
    .withMessage("L'id est requis!")
    .bail()
    .custom(async (value) => {
      const count = await Category.existsById(value);
      if (count === 0) {
        throw new Error("Cette catégorie n'existe pas!");
      }
      return true;
    }),
  check('name')
    .notEmpty()
    .withMessage('Le nom de la catégorie ne doit pas être vide.')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Le nom doit contenir au moins 3 caractères.')
    .bail()
    .custom(async (value) => {
      const count = await Category.checkCategory(value);
      if (count > 0) {
        throw new Error('Cette catégorie existe déjà!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

export {
  addCategoryValidator,
  deleteCategoryValidator,
  updateCategoryValidator,
};
