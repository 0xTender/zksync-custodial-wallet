import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongodb";
import { type Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { type ObjectId } from "mongodb";

function hashPassword(password: string) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await (await clientPromise)
          .db()
          .collection("users")
          .findOne<{ email: string; password: string; _id: ObjectId }>({
            email: credentials?.email,
          });
        if (
          user &&
          user.password === hashPassword(credentials?.password || "")
        ) {
          return { ...user, id: user._id.toString() };
        } else {
          if (!credentials?.email || !credentials?.password) return null;

          // !fixme - add proper register flow
          const newUser = await (
            await clientPromise
          )
            .db()
            .collection("users")
            .insertOne({
              email: credentials?.email,
              password: hashPassword(credentials?.password),
            });
          return {
            ...newUser,
            id: newUser.insertedId.toString(),
          };
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token }: { token: Record<string, unknown> }) {
      token.userRole = "admin";
      return token;
    },
  },
});
