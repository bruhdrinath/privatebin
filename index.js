import cors from "cors"
import express from "express"
import pasteRoutes from "./routes/pasteRoutes.js"

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use("/api", pasteRoutes)

setInterval(() => {
	fetch(process.env.ORIGIN)
		.then(() => console.log("🟢 Self-ping successful"))
		.catch(() => console.warn("🔴 Self-ping failed"))
}, 12 * 60 * 1000)

export default app
