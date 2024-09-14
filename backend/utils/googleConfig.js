import { OAuth2Client } from "google-auth-library";

export const verifyCreds = async (credential) => {
  const ticket = await new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
  ).verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};
