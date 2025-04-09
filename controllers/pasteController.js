import Paste from "../models/paste.js"
import { parseExpiry } from "../utils/expirationOptions.js"

export const createPaste = async (req, res) => {
	const { encryptedText, expiry = "1d", burnAfterRead = false } = req.body
	if (!encryptedText) return res.status(400).json({ error: "Missing text" })

	const expiresAt = parseExpiry(expiry)
	if (!expiresAt)
		return res.status(400).json({ error: "Invalid expiry format" })

	const paste = await Paste.create({
		content: encryptedText,
		burnAfterRead,
		expiresAt,
	})

	res.json({ id: paste._id })
}

export const getPaste = async (req, res) => {
	const { id } = req.params

	const paste = await Paste.findById(id)
	if (!paste) return res.status(404).json({ error: "Paste not found" })

	const response = { content: paste.content }

	if (paste.burnAfterRead) await paste.deleteOne()

	res.json(response)
}
