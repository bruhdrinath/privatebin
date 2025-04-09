import mongoose from "mongoose"
import { nanoid } from "nanoid"

const pasteSchema = new mongoose.Schema({
	id: {
		type: String,
		default: () => nanoid(10),
		unique: true,
	},
	content: String,
	burnAfterRead: { type: Boolean, default: false },
	expiresAt: Date,
	createdAt: { type: Date, default: Date.now, expires: 60 * 60 },
})

pasteSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Paste = mongoose.model("Paste", pasteSchema)
export default Paste
