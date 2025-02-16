import jwt from "jsonwebtoken";
import "dotenv/config";
interface User {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
}

export const generateToken = async (user: User) => {
  const hash = await jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET!,
    {
      expiresIn: "15d",
    }
  );
  return hash;
};
