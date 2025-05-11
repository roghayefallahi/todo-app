import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getToken } from "next-auth/jwt";
import { sortTodos } from "@/utils/sortTodos";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB!" });
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await User.findOne({ email: token.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  if (req.method === "POST") {
    const { title, status, description } = req.body;
    if (!title || !status || !description) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid Data!" });
    }

    user.todos.push({ title, status, description });
    await user.save();

    return res
      .status(201)
      .json({ status: "success", message: "Todo created." });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    console.log(sortedData);

    return res
      .status(200)
      .json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, title, description, status } = req.body;
    if (!id) {
      return res
        .status(422)
        .json({ status: "failed", message: "Todo ID is required." });
    }

    const updateFields = {};
    if (title !== undefined) updateFields["todos.$.title"] = title;
    if (description !== undefined)
      updateFields["todos.$.description"] = description;
    if (status !== undefined) updateFields["todos.$.status"] = status;

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "No fields to update." });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: updateFields }
    );

    //todos.$
    //💎 در اینجا .$ ینی همان تسکی که قبلش پیدا کردی("todos._id": id )
    console.log(result);

    return res.status(200).json({ status: "success", result });
  }
}
