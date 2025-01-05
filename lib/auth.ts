import NextAuth from 'next-auth';
import Twitch from 'next-auth/providers/twitch';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Twitch],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    }
  }
});
