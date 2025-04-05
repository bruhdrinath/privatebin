import Paste from "../models/paste.js"
import { parseExpiry } from "../utils/expirationOptions.js"

export const createPaste = async (req, res) => {
	const { content, burnAfterRead = false, expiresIn = "24h" } = req.body

	const expiresAt = parseExpiry(expiresIn)
	const paste = await Paste.create({ content, burnAfterRead, expiresAt })

	res.json({ id: paste._id })
}

export const getPaste = async (req, res) => {
	const paste = await Paste.findById(req.params.id)

	if (!paste) return res.status(404).json({ error: "Paste not found" })

	if (paste.burnAfterRead) {
		await Paste.findByIdAndDelete(req.params.id)
	}

	res.json({ content: paste.content })
}
