import httpResponse from "../utils/http.response.js";

export const checkAdminOrPremium = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "admin" || role === "premium") next();
    else httpResponse.Unauthorized(res, "Acceso denegado")
  } catch (error) {
    next(error);
  }
};
