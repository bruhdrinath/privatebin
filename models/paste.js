import mongoose from "mongoose"

const pasteSchema = new mongoose.Schema({
	content: String,
	burnAfterRead: {
		type: Boolean,
		default: false,
	},
	expiresAt: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 1 * 60 * 60, // auto-delete after 1h (in seconds)
	},
})

pasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Paste = mongoose.model("Paste", pasteSchema)
export default Paste
