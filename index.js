import cors from "cors"
import express from "express"
import pasteRoutes from "./routes/pasteRoutes.js"

const app = express()

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

export default app
