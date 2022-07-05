import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export const checkErrors = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }
    return next()
}