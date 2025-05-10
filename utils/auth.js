import { compare, hash } from "bcryptjs";

async function hashedPassword(pass) {
    const hashPass = await hash(pass, 12);
    return hashPass;
  }
  async function verifyPassword(pass, hashedPass) {
    const isValid = await compare(pass, hashedPass);
    return isValid;
  }
  
  export { hashedPassword, verifyPassword };