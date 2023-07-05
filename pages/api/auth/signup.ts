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
      const userJSON = users.map((user) => {
        const { participantName, schoolName, address, phoneNumber, email, _id, createdDate } = user;
    
        let propertyValue;
    
        switch (req.path) {
          case "/participantName":
            propertyValue = participantName;
            break;
          case "/schoolName":
            propertyValue = schoolName;
            break;
          case "/address":
            propertyValue = address;
            break;
          case "/phoneNumber":
            propertyValue = phoneNumber;
            break;
          case "/email":
            propertyValue = email;
            break;
          case "/_id":
            propertyValue = _id;
            break;
          case "/createdDate":
            propertyValue = createdDate;
            break;
          default:
           
            return {
              participantName,
              schoolName,
              address,
              phoneNumber,
              email,
              _id,
              createdDate,
            };
        }
    
        return { [req.path]: propertyValue };
      });
    }
    else if (req.method === "POST") {
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




