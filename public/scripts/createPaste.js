async function createPaste() {
	const plaintext = document.getElementById("message").value
	const burnAfterRead = document.getElementById("burn").checked
	const expiresIn = document.getElementById("expiry").value

	const key = CryptoJS.lib.WordArray.random(16).toString()
	const encrypted = CryptoJS.AES.encrypt(plaintext, key).toString()

	const res = await fetch("/api/paste", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			content: encrypted,
			burnAfterRead,
			expiresIn,
		}),
	})

	const data = await res.json()
	const fullLink = `${location.origin}/${data.id}#${key}`

	// Show the link
	document.getElementById("link").innerHTML = `Shareable link: ${fullLink}`

	// Automatically copy to clipboard
	try {
		await navigator.clipboard.writeText(fullLink)
		console.log("Link copied to clipboard")
	} catch (err) {
		console.error("Failed to copy link: ", err)
	}
}
