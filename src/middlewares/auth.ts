import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const createAccessToken = (user: User) => {
    return sign({ userId: user.id, userEmail: user.email, userName: user.name },
        process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '7d' });
};