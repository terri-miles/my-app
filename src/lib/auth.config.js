export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },

    authorized({ auth, request }) {
      const user = auth?.user;

      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnSinglePage = request.nextUrl?.pathname.startsWith("/nurse");
      const isOnProfilePage = request.nextUrl?.pathname.startsWith("/profile");
      const isOnRegisterPage =
        request.nextUrl?.pathname.startsWith("/register");

      if (isOnProfilePage && !user) return false;

      if(isOnSinglePage && !user) return false

      if (isOnRegisterPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
