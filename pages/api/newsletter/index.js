export default function handler(req, res) {
	if (req.method === "POST") {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes("@") || !userEmail.includes(".")) {
			res
				.status(422)
				.json({ success: false, message: "Invalid Email Address" });
			return;
		}

		res.status(201).json({ success: true, message: "Signed up successfully" });
	}
}
