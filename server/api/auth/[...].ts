import { NuxtAuthHandler } from '#auth';
import Credentials from 'next-auth/providers/credentials';

async function getUser(id: string) {
  const user = await User.findById(id);
  return user?.toJSON();
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.secret,
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/register',
  },
  providers: [
    //@ts-ignore
    Credentials.default({
      name: 'credentials',
      origin: useRuntimeConfig().auth.origin,
      async authorize(credentials: { email: string; password: string }) {
        const user = await User.findOne({ email: credentials.email }).select(
          '+password'
        );
        if (!user) {
          return null;
        }
        const isValid = await user.comparePassword(credentials.password);
        if (!isValid) {
          return null;
        }

        return user.toObject();
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      const refreshedUser = await getUser(token._id as string);

      session.user = {
        ...token,
        ...session.user,
        ...refreshedUser,
      };
      return session;
    },
  },
});
