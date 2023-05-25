import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import { connectToMongoDB } from "../../../lib/mongodb/mongodb"
import User from "../../../models/user"
import { IUser } from "../../../types"





const handler = async (req, res) => {
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

      return res
        .status(200)
        .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io/trenova-training-participant-signup/")
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

          return res
            .status(201)
            .setHeader("Access-Control-Allow-Credentials", "true")
            .json({ success: true, user: savedUser });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io/trenova-training-participant-signup/")
            .setHeader("Access-Control-Allow-Credentials", "true")
            .json({ error: "Internal Server Error" });
        });
    } else if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io/trenova-training-participant-signup/");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(200).end();
    } else {
      res
        .status(405)
        .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io/trenova-training-participant-signup/")
        .setHeader("Access-Control-Allow-Credentials", "true")
        .json({ error: "Method Not Allowed, try using a different method" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .setHeader("Access-Control-Allow-Origin", "https://precious123-gifted.github.io/trenova-training-participant-signup/")
      .setHeader("Access-Control-Allow-Credentials", "true")
      .json({ error: "Internal Server Error" });
  }
};



export default handler;


















// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     await connectToMongoDB();

//     if (req.method === "POST") {
//       if (!req.body) return res.status(400).json({ error: "Data is missing" })

//       const { participantName, schoolName, address, phoneNumber,email,createdDate } = req.body

    

  


//         const user = new User({
//           participantName,
//           schoolName,
//           address,
//           phoneNumber,
//           email,
//           createdDate,
//         })

//         user.save()
//           .then((data: IUser) => {
//             const user = {
//               participantName: data.participantName,
//               schoolName: data.schoolName,
//               address: data.address,
//               phoneNumber:Number ,
//               email: data.email,
//               _id: data._id,
//               createdDate: data.createdDate,
//             }

//             return res.status(201)
//               .setHeader('Access-Control-Allow-Origin', 'https://trenova-training-participants-data-api-3ccr.vercel.app/') // Replace with your domain name
//               .setHeader('Access-Control-Allow-Credentials', 'true')
//               .json({
//                 success: true,
//                 user
//               })
//           })
//           .catch((error: unknown) => {
//             // handle any errors
//             console.error(error);
//             res.status(500)
//               .setHeader('Access-Control-Allow-Origin', 'https://trenova-training-participants-data-api-3ccr.vercel.app/') // Replace with your domain name
//               .setHeader('Access-Control-Allow-Credentials', 'true')
//               .json({ error: "Internal Server Error" });
//           })
      
//     } else if (req.method === "OPTIONS") {
//       res.setHeader('Access-Control-Allow-Origin', 'https://trenova-training-participants-data-api-3ccr.vercel.app/'); // Replace with your domain name
//       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
//       res.setHeader('Access-Control-Allow-Credentials', 'true')
//       res.status(200).end();
//     } else {
//       res.status(405)
//         .setHeader('Access-Control-Allow-Origin', 'https://trenova-training-participants-data-api-3ccr.vercel.app/') // Replace with your domain name
//         .setHeader('Access-Control-Allow-Credentials', 'true')                           
//         .json({ error: "Method Not Allowed,nor try this method again" })
//     }
//   } catch (error) {
//     // handle any errors that occur during database connection
//     console.error(error);
//     res.status(500)
//       .setHeader('Access-Control-Allow-Origin', 'https://trenova-training-participants-data-api-3ccr.vercel.app/') // Replace with your domain name
//       .setHeader('Access-Control-Allow-Credentials', 'true')
//       .json({ error: "Internal Server Error" });
//    }
// }

// export default handler




