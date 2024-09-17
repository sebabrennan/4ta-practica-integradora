import httpResponse from "../utils/http.response.js"

export const errorHandler = (error, req, res, next) => {
    
    if(error.message = "jwt expired"){
        return httpResponse.Forbidden(res, "Token vencido") 
    } else httpResponse.ServerError(res, error.message)
}