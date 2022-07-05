import { check } from 'express-validator';

export const validateBody = [
    check('brand')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Brand field is invalid'),
    check('model')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Model field is invalid'),
    check('description')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Description field is invalid'),
    check('machineType')
        .not()
        .isEmpty()
        .toInt()
        .withMessage('Machine type field is invalid'),
]
