import { NextApiRequest, NextApiResponse } from "next"
import { connectToMongoDB } from "../../../lib/mongodb/mongodb"
import User from "../../../models/user"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectToMongoDB();

    if (req.method === "GET") {
      const users = await User.find().exec();
      const userJSON = users.map((user) => ({
        participantName: user.participantName,
        schoolName: user.schoolName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        email: user.email,
        _id: user._id,
        createdDate: user.createdDate,
      }));

      res
        .status(200)
        .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io")
        .setHeader("Access-Control-Allow-Credentials", "true")
        .json({ success: true, users: userJSON });
    } else if (req.method === "POST") {
      // Handle the POST request
      if (!req.body) return res.status(400).json({ error: "Data is missing" });

      const { participantName, schoolName, address, phoneNumber, email, createdDate } = req.body;

      const user = new User({
        participantName,
        schoolName,
        address,
        phoneNumber,
        email,
        createdDate,
      });

      user.save()
        .then((data) => {
          const savedUser = {
            participantName: data.participantName,
            schoolName: data.schoolName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            email: data.email,
            _id: data._id,
            createdDate: data.createdDate,
          };

          res
            .status(201)
            .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io")
            .setHeader("Access-Control-Allow-Credentials", "true")
            .json({ success: true, user: savedUser });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io")
            .setHeader("Access-Control-Allow-Credentials", "true")
            .json({ error: "Internal Server Error" });
        });
    } else if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(200).end();
    } else {
      res
        .status(405)
        .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io")
        .setHeader("Access-Control-Allow-Credentials", "true")
        .setHeader("Allow", "GET, POST, OPTIONS")
        .json({ error: "Method Not Allowed, try using a different method" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io")
      .setHeader("Access-Control-Allow-Credentials", "true")
      .json({ error: "Internal Server Error" });
  }
};

export default handler;
