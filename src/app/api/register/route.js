import { connectToDb } from "@/lib/connectDb";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    const body = await request.json();

    connectToDb();

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 409 } // 409 Conflict
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        newUser,
      },
      { status: 201 } // 201 Created
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error creating user!",
      },
      { status: 500 } // 500 Internal Server Error
    );
  }
};
