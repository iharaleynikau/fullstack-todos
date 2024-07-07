import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
import { BACKEND_URL } from '@/lib/constants';
import NextAuth from 'next-auth/next';

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(BACKEND_URL + '/auth/refresh', {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.tokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    tokens: response,
  };
};

const authOptions: NextAuthOptions = {
  secret: 'secret123123',
  pages: {
    signIn: 'auth/signIn',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: 'Login', type: 'text', required: true },
        password: { label: 'Password', type: 'text', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials.password) return null;

        try {
          let data;

          await axios
            .post(BACKEND_URL + '/auth/login', {
              ...credentials,
            })
            .then((res) => {
              data = {
                user: res.data,
              };
            })
            .catch((error) => {
              data = {
                error: error.response.data,
              };
            });

          if (data!.error) {
            console.log(data!.error.message);

            return null;
          }

          const user = data!.user;

          return user;
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.tokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token;
      session.tokens = token.tokens;

      return session;
    },
  },
};

export default NextAuth(authOptions);
