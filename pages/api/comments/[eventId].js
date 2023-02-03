import { MongoClient } from "mongodb";

export default async function handler(req, res) {
	const eventId = req.query.eventId;

	const client = await MongoClient.connect(
		"mongodb+srv://admin:admin@cluster0.vm0h4wd.mongodb.net/?retryWrites=true&w=majority"
	);

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
			email,
			name,
			text,
			eventId,
		};

		const db = client.db("events");
		const result = await db.collection("comments").insertOne(newComment);
		newComment.id = result.insertedId;

		res.status(201).json({
			success: true,
			message: "Comment Added Successfully",
			comment: newComment,
		});
	}

	if (req.method === "GET") {
		const db = client.db("events");
		const documents = await db
			.collection("comments")
			.find()
			.sort({ _id: -1 })
			.toArray();

		res.status(200).json({ success: true, comments: documents });
	}

	client.close();
}
