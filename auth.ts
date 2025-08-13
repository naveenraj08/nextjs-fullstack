import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Account, Profile, Session, User } from "next-auth";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_EMAIL, AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        try {
          const { email, password } = credentials;
          const res = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_EMAIL, { email });

          if (res.length > 0) {
            const user = res[0];
            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("Password valid:", isPasswordValid);
            if (!isPasswordValid) {
              console.error("Invalid password for user:", email);
              return null; // Invalid credentials
            }

            return {
              id: String(user.id),
              _id: user._id || "",
              name: user.name || "",
              email: user.email || "",
              image: user.image || ""
            };
          }
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      }
    }),

  ],
  callbacks: {
    async signIn({ user, account, profile }: { user: User; account?: Account | null; profile?: Profile | null }) {

      if (user && user.email && user.id) {
        return true; // Allow login
      }

      if (!profile) return false; // Ensure profile exists

      const { bio } = profile;
      const { name, email, image } = user;

      let id: string = "";

      if (account?.provider === "github") {
        id = String((profile as any).id);  // GitHub uses `id`
      } else if (account?.provider === "google") {
        id = (profile as any).sub; // Google uses `sub`
      }

      if (!id) return false; // Prevent login if no ID

      // Fetch user from Sanity based on GitHub ID or Google sub
      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {

      if (account?.type === "credentials" && user) {
        return {
          ...token,
          id: user.id,
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          username: user.username,
          provider: user.provider,
        };
      }

      if (account && profile) {
        let id = "";
        if (account.provider === "github") {
          id = (profile as any).id;
        } else if (account.provider === "google") {
          id = (profile as any).sub;
        }

        token.id = id;
        token._id = id;
        token.username = (profile as any)?.login || "";
        token.provider = account.provider;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        _id: token._id, // Ensure _id is included
        username: token.username,
        provider: token.provider,
      };
      return session;
    }
  },
});
