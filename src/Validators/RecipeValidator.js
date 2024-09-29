import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Recipe } from '../models/Recipe.js';

// Validateur pour ajouter une recette
const addRequestValidator = [
  check('title')
    .notEmpty()
    .withMessage('Le titre ne peut pas être vide!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Le titre doit comporter au moins 4 caractères!')
    .bail()
    .custom(async (value) => {
      const count = await Recipe.checkRecipe(value);
      if (count > 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('type')
    .notEmpty()
    .withMessage('Le type ne peut pas être vide!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Le type doit comporter au moins 4 caractères!')
    .bail(),
  check('ingredient')
    .notEmpty()
    .withMessage('Les ingrédients ne peuvent pas être vides!')
    .bail()
    .isLength({ min: 10, max: 50 })
    .withMessage('Les ingrédients doivent comporter entre 10 et 50 caractères!')
    .bail(),
  check('category_id')
    .notEmpty()
    .withMessage('La catégorie est obligatoire!')
    .bail()
    .isInt({ min: 1 })
    .withMessage('La catégorie doit être un entier valide!')
    .bail(),
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

// Validateur pour supprimer une recette
const deleteRequestValidator = [
  param('id')
    .notEmpty()
    .withMessage("L'ID est obligatoire!")
    .bail()
    .custom(async (value) => {
      const count = await Recipe.existsById(value);
      if (count === 0) {
        throw new Error("Cette recette n'existe pas!");
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

// Validateur pour mettre à jour une recette
const updateRequestValidator = [
  param('id')
    .notEmpty()
    .withMessage("L'ID est requis!")
    .bail()
    .custom(async (value) => {
      const count = await Recipe.existsById(value);
      if (count === 0) {
        throw new Error("Cette recette n'existe pas!");
      }
      return true;
    }),
  check('title')
    .notEmpty()
    .withMessage('Le titre ne doit pas être vide!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Le titre doit comporter au moins 4 caractères!')
    .bail()
    .custom(async (value) => {
      const count = await Recipe.checkRecipe(value);
      if (count > 0) {
        throw new Error('Cette recette existe déjà!');
      }
      return true;
    }),
  check('type')
    .notEmpty()
    .withMessage('Le type ne peut pas être vide!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('Le type doit comporter au moins 4 caractères!')
    .bail(),
  check('ingredient')
    .notEmpty()
    .withMessage('Les ingrédients ne peuvent pas être vides!')
    .bail()
    .isLength({ min: 10, max: 50 })
    .withMessage('Les ingrédients doivent comporter entre 10 et 50 caractères!')
    .bail(),
  check('category_id')
    .notEmpty()
    .withMessage('La catégorie est obligatoire!')
    .bail()
    .isInt({ min: 1 })
    .withMessage('La catégorie doit être un entier valide!')
    .bail(),
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

export { addRequestValidator, deleteRequestValidator, updateRequestValidator };
