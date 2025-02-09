import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import { Account, Profile, Session, User } from "next-auth";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }: { user: User; profile?: Profile | null }) {
      if (!profile) return false; // Ensure profile exists

      const { id, login, bio } = profile;
      const { name, email, image } = user;

      const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }: { token: JWT; account?: Account | null; profile?: Profile | null }) {
      if (account && profile) {
        const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID, { id: profile.id });

        token.id = user?._id || profile?.id;
        token.username = user?.username || profile?.login || "";
        token.email = user?.email || "";
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
      };
      return session;
    }

  },
});
