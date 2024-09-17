import httpResponse from "../utils/http.response.js";

export const checkPremium = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "premium") next();
    else httpResponse.Unauthorized(res, "Este endpoint es para usuarios premium")
  } catch (error) {
    next(error);
  }
};