import express from "express";
const router = express.Router();
import {
    Login,
    Formapply
} from '../controller/studentcont.js';
router.post("/login",Login);
router.post("/applyform",Formapply);

export default router;