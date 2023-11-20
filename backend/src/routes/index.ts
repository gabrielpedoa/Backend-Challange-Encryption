import { Router } from "express";
import post from "../controllers/post";
import get from "../controllers/get";

const router = Router();

export default () => {
  router.post("/users", post);
  router.get("", get);

  return router;
};
