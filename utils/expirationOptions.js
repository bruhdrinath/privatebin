export const parseExpiry = (input) => {
	const now = new Date()
	const match = input.match(/^(\d+)([hdwmy])$/)

	if (!match) return null

	const value = parseInt(match[1], 10)
	const unit = match[2]

	let multiplier
	switch (unit) {
		case "h":
			multiplier = 60 * 60 * 1000
			break
		case "d":
			multiplier = 24 * 60 * 60 * 1000
			break
		case "w":
			multiplier = 7 * 24 * 60 * 60 * 1000
			break
		case "m":
			multiplier = 30 * 24 * 60 * 60 * 1000
			break
		case "y":
			multiplier = 365 * 24 * 60 * 60 * 1000
			break
		default:
			return null
	}

	return new Date(now.getTime() + value * multiplier)
}
