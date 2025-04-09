import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import pasteRoutes from "./routes/pasteRoutes.js"

const app = express()
dotenv.config()

// Middlewares
app.use(cors())
app.use(express.json())

// Root route (for self-ping and testing uptime)
app.get("/", (req, res) => {
	res.status(200).json({
		status: "ok",
		message: "🔋 Server is active and pingable",
		timestamp: new Date().toISOString(),
	})
})

// Routes
app.use("/api", pasteRoutes)

// Self-ping every 12 minutes to keep the app alive or use https://uptimerobot.com/ for uptime monitoring
// This is a workaround for platforms like Render, which require a ping to keep the app alive
setInterval(() => {
	fetch(process.env.ORIGIN)
		.then(() => console.log("🟢 Self-ping successful"))
		.catch(() => console.warn("🔴 Self-ping failed"))
}, 1 * 60 * 1000)

export default app
