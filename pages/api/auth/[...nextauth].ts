import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import decoder from "jwt-decode";
import * as https from "https";

export default NextAuth({
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { refresh, access } = user;
        token.refresh = refresh;
        token.access = access;
      }
      return token;
    },

    async session({ session, token }) {
      const { exp }: any = decoder(token.access as string);
      if (Date.now() / 1000 < exp) {
        session.refresh = token.refresh;
        session.access = token.access;
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/refresh/`,
          {
            refresh: token.refresh,
          }
        );
        token.access = response.data.access;
        session.refresh = token.refresh;
        session.access = response.data.access;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/jwt/create`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            }
          );
          return {
            refresh: response.data.refresh,
            access: response.data.access,
          };
        } catch (exception: any) {
          throw exception;
        }
      },
    }),
  ],
});
