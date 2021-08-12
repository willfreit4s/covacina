import { verify } from "jsonwebtoken";

export const TokenVerify = (requesterCredential: string) => {
    
  if (!requesterCredential) {
    throw new Error("JWT not found");
  }
  const payload = verify(requesterCredential, "MySecretKey");
  return payload;
 
};
