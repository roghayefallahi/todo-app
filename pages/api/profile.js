import connectDB from "@/utils/connectDB";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./auth/[...nextauth]";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Error in connecting to DB",
    });
  }
  const session = await getToken({ req, authOptions });
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await User.findOne({ email: session.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }
  if (req.method === "POST") {
    const { name, lastName, password } = req.body;
    if (!name || !lastName || !password) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res
        .status(404)
        .json({ status: "failed", message: "Password is incorrect!" });
    }
    user.name = name;
    user.lastName = lastName;
    await user.save();

    return res.status(200).json({
      status: "success",
      data: { name, lastName, email: session.email },
    });
  } else if (req.method === "GET") {
    return res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  }
}
