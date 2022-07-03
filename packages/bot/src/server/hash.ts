import crypto from "crypto";

export const hash = (salt: string) => {
  const encrypt = (body: string) => {
    return crypto.pbkdf2Sync(body, salt, 1000, 64, `sha512`).toString(`hex`);
  };

  const compare = (body: string, token: string) => {
    return encrypt(body) == token;
  };

  return {
    encrypt,
    compare,
  };
};
