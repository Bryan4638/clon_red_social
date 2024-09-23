export interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId: number
      userName: string
    }
  }
}
