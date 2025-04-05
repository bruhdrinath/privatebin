async function decryptPaste() {
	const id = location.pathname.split("/")[1]
	const key = location.hash.slice(1)

	if (!id || !key) return

	const res = await fetch(`/api/paste/${id}`)
	if (!res.ok) {
		document.body.innerHTML += `<p>Paste not found or expired.</p>`
		return
	}
	const data = await res.json()

	try {
		const decrypted = CryptoJS.AES.decrypt(data.content, key).toString(
			CryptoJS.enc.Utf8
		)
		document.body.innerHTML += `<pre>${decrypted}</pre>`
	} catch (e) {
		document.body.innerHTML += `<p>Error decrypting the paste.</p>`
	}
}

decryptPaste()
