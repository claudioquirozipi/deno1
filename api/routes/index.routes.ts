import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/index.controllers.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "hola mundo 3";
});
router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
