"use server";

import { auth, signIn, signOut } from "./auth";
import { connectToDb } from "./connectDb";
import { nurses } from "./data";
import { HiredNurse, User } from "./models";

export const handleGitLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const loginCredentials = async (formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result;
  } catch (error) {
    console.log(error);
    return { error: "Invalid username or password" };
  }
};

export const hireNurse = async (nurseId) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User is not authenticated!");
    }

    const userId = session.user.id;

    const nurse = nurses.find((nurse) => nurse.id === nurseId);
    if (!nurse) {
      throw new Error("Nurse not found");
    }

    await connectToDb();

    const existingHiredNurse = await HiredNurse.findOne({ userId, nurseId });
    if (existingHiredNurse) {
      throw new Error("You have already hired this nurse!");
    }

    const hiredNurse = new HiredNurse({
      userId,
      nurseId,
    });

    await hiredNurse.save();

    const plainHiredNurse = hiredNurse.toObject();
    const { _id, _v, ...hiredNurseData } = plainHiredNurse;
    return { success: true, hiredNurseData };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

export const getHiredNurses = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User is not authenticated");
    }
    await connectToDb();

    const userId = session.user.id;

    const user = await User.findOne({ _id: userId }).select(
      "name email phone address profileImage country"
    );

    if (!user) {
      return { success: false, error: "User not found", nurses: [], user: null };
    }
    const hiredNurses = await HiredNurse.find({ userId });

    const nursesDetails = hiredNurses.map((hired) =>
      nurses.find((nurse) => nurse.id.toString() === hired.nurseId.toString())
    );
    return { success: true, nurses: nursesDetails, user };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message, nurses: [], user: null };
  }
};

export const terminateHiredNurse = async (nurseId) => {
  try {
    const session = await auth();
    if (!session.user.id) throw new Error("User is not authenticated");

    const userId = session.user.id;

    await connectToDb();

    const deleteNurse = await HiredNurse.findOneAndDelete({ userId, nurseId });

    if (!deleteNurse) throw new Error("Nurse not found or hired by this user!");

    return {
      success: true,
      message: "Nurse contract terminated successfully.",
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

export const deleteUser = async () => {
  try {
    const session = await auth();
    if (!session.user.id) throw new Error("User is not authenticated");

    const userId = session.user.id;

    await connectToDb();

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");

    // Detete all hired nurses linked to the user
    await HiredNurse.deleteMany({ userId });

    // Delete the user
    await User.findByIdAndDelete({ _id: userId });

    return {
      success: true,
      message: "Account deleted successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
