import { Router } from "express";
const router = Router();
import { isAuth } from "../middlewares/isAuth.js";

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", isAuth, (req, res) => {
  console.log("req.user", req.user);
  console.log("req.products", req.products);
  const user = req.user.toObject();
  res.render("profile", { user });
});

export default router;
