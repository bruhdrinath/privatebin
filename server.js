import dotenv from "dotenv"
import mongoose from "mongoose"
import app from "./index.js"

dotenv.config()

const PORT = process.env.PORT || 3000

mongoose
	.connect(process.env.MONGOURL)
	.then(() => {
		console.log(`✅ Connected to MongoDB`)
		app.listen(PORT, () => {
			console.log(
				`🚀 Server running on ${process.env.ORIGIN || `PORT ${PORT}`}`
			)
		})

		// Self-ping to keep the service alive (Render workaround)
		setInterval(() => {
			fetch(process.env.ORIGIN)
				.then(() => console.log("🟢 Self-ping successful"))
				.catch((err) => console.warn("🔴 Self-ping failed:", err.message))
		}, 12 * 60 * 1000)
	})
	.catch((err) => {
		console.error(`❌ Failed to connect to MongoDB`, err)
		process.exit(1)
	})
