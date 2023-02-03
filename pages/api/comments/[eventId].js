export default function handler(req, res) {
	const eventId = req.query.eventId;

	if (req.method === "POST") {
		const { email, name, text } = req.body;

		if (
			!email ||
			!email.includes("@") ||
			!email.includes(".") ||
			!name ||
			name.trim() === "" ||
			!text ||
			text.trim() === ""
		) {
			res.status(422).json({ success: false, message: "Invalid Input" });
			return;
		}

		const newComment = {
			id: new Date().toISOString(),
			email,
			name,
			text,
		};
		res
			.status(201)
			.json({
				success: true,
				message: "Comment Added Successfully",
				comment: newComment,
			});
	}

	if (req.method === "GET") {
		const dummyList = [
			{id: 'c1', name: 'Name 1', text: 'First comment'},
			{id: 'c2', name: 'Name s', text: 'Second comment'},
		]

		res.status(200).json({ success: true, comments: dummyList });
	}
}
