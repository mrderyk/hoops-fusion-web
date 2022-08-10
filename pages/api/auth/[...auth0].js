// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, { returnTo: '/me' });
      logger('Redirecting to login');
    } catch (error) {
    }
  }
});