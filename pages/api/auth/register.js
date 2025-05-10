import User from "@/models/User";
import { hashedPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") return;
  try {
    connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in Connecting to DB!" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      status: "failed",
      message: "Invalid Data",
    });
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(422).json({
      status: "failed",
      message: "User exists already!",
    });
  }
  const hashedPass = await hashedPassword(password);
  const newUser = await User.create({ email: email, password: hashedPass });
  console.log(newUser);

  return res.status(200).json({ status: "success", message: "Created User." });
}
