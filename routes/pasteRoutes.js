import express from "express"
import { createPaste, getPaste } from "../controllers/pasteController.js"

const router = express.Router()

router.post("/create", createPaste)
router.get("/paste/:id", getPaste)

export default router
