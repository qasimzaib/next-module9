import { MongoClient } from "mongodb";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const userEmail = req.body.email;

		if (!userEmail || !userEmail.includes("@") || !userEmail.includes(".")) {
			res
				.status(422)
				.json({ success: false, message: "Invalid Email Address" });
			return;
		}

		const client = await MongoClient.connect(
			"mongodb+srv://admin:admin@cluster0.vm0h4wd.mongodb.net/?retryWrites=true&w=majority"
		);
		const db = client.db('events');
		await db.collection("emails").insertOne({ email: userEmail });
		client.close();

		res.status(201).json({ success: true, message: "Signed up successfully" });
	}
}
