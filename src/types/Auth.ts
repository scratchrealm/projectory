import { isString, optional, _validateObject } from "../commonInterface/kacheryTypes"

export type Auth = {
    userId?: string,
    googleIdToken?: string
    reCaptchaToken?: string
}

export const isAuth = (x: any): x is Auth => {
    return _validateObject(x, {
        userId: optional(isString),
        googleIdToken: optional(isString),
        reCaptchaToken: optional(isString)
    })
}