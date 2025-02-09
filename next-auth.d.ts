declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
        } & DefaultSession["user"];
    }

    interface JWT {
        id: string;
        username: string;
        email: string;
    }
}