import cluster from "cluster"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import os from "os"
import pasteRoutes from "./routes/pasteRoutes.js"

dotenv.config()
const numCPUs = os.cpus().length

if (cluster.isPrimary) {
	console.log(`👑 Primary ${process.pid} is running`)
	console.log(`🔧 Forking ${numCPUs} workers...`)
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}
	cluster.on("exit", (worker, code, signal) => {
		console.log(`💀 Worker ${worker.process.pid} died. Spawning a new one...`)
		cluster.fork()
	})
} else {
	const app = express()
	app.use(cors())
	app.use(express.json())

	mongoose
		.connect(process.env.MONGOURL)
		.then(() => console.log(`✅ MongoDB connected (Worker ${process.pid})`))
		.catch((err) => console.error("❌ MongoDB error:", err))

	// Only API routes
	app.use("/api", pasteRoutes)

	const PORT = process.env.PORT ?? 3000
	app.listen(PORT, () => {
		console.log(`🚀 Worker ${process.pid} running on ${PORT}`)
	})
}
