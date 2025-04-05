import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import pasteRoutes from "./routes/pasteRoutes.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")))

mongoose.connect(process.env.MONGOURL)

// API routes
app.use("/api", pasteRoutes)

// Serve index.html for any paste id route
app.get("/:id", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"))
})

const PORT = process.env.PORT ?? 3000
app.listen(PORT, () => {
	console.log(`PrivateBin clone running at http://localhost:${PORT}`)
})
