import cluster from "cluster"
import dotenv from "dotenv"
import mongoose from "mongoose"
import os from "os"
import app from "./index.js"

dotenv.config()

const numCPUs = os.cpus().length
const PORT = process.env.PORT || 3000

if (cluster.isPrimary) {
	console.log(`👑 Primary process ${process.pid} is running`)

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork()
	}

	cluster.on("exit", (worker) => {
		console.log(`💀 Worker ${worker.process.pid} died. Respawning...`)
		cluster.fork()
	})
} else {
	// Each worker connects to MongoDB
	mongoose
		.connect(process.env.MONGOURL)
		.then(() => {
			console.log(`✅ Worker ${process.pid} connected to MongoDB`)
			app.listen(PORT, () => {
				console.log(`🚀 Worker ${process.pid} listening on ${process.env.ORIGIN}`)
			})
		})
		.catch((err) => {
			console.error(
				`❌ Worker ${process.pid} failed to connect to MongoDB`,
				err
			)
			process.exit(1)
		})
}
