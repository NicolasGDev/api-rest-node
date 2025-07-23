import { Router } from "express";
import controller from "../controllers/employees.controller.js";
const router = Router();

router.get("/employees", controller.index);
router.get("/employees/:id", controller.show);
router.post("/employees", controller.store);
router.put("/employees/:id", controller.update);
router.delete("/employees/:id", controller.destroy);
export default router;
