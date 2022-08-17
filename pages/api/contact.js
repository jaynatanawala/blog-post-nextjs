import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = JSON.parse(req.body);

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invlaid data" });
      return;
    }

    let client;
    try {
      client = await MongoClient.connect(process.env.DB_URL);
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
    }
    const db = client.db();

    // store in DB
    const newMessage = {
      email,
      name,
      message,
    };
    const result = db.collection("contactus").insertOne(newMessage);

    res.status(201).json({ message: "success", data: newMessage });
  }
}
