import { Request, Response, NextFunction } from "express"
import { check, validationResult } from 'express-validator'

export const handleInputErrors = (req, res, next) => {

    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    //console.log('Desde MIDDLEWARE')
    next()
}