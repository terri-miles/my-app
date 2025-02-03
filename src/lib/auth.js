import NextAuth from "next-auth";
import dotenv from "dotenv";
import { connectToDb } from "@/lib/connectDb";
import { User } from "@/lib/models";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

dotenv.config();

const login = async (credentials) => {
  try {
    connectToDb();

    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("User does not exits");

    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );
    if (!isCorrectPassword) throw new Error("Incorrect password!");

    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);

          if(user) return user
          
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {      
      if (account.provider === "github") {
        connectToDb();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              name: profile.name,
              email: profile.email,
              profileImage: profile.avatar_url,
              address: profile.location
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
