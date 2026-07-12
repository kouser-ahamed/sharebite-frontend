import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in your environment variables!");
}

const client = new MongoClient(uri);
const db = client.db(process.env.MONGODB_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,

  },
  socialProviders: {
     google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 7, // 7 days

    }
  },
  plugins: [
    jwt()
  ]
});
