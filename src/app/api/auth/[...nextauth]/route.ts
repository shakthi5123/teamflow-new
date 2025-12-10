import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { compare } from 'bcrypt'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password)
          throw new Error('Missing email or password')

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) throw new Error('User not found')

        const valid = await compare(credentials.password, user.password)
        if (!valid) throw new Error('Incorrect password')

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],

 callbacks: {
  async jwt({ token, user }) {
    if (user?.id) token.id = user.id;     // Credentials
    if (user?.sub) token.id = user.sub;   // Google
    return token;
  },

  async session({ session, token }) {
    session.user = session.user || {};    //  REQUIRED FIX
    session.user.id = token.id;           // attach id manually
    return session;
  },
},

  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
