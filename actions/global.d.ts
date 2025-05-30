import { user } from "./actions"; 

declare global {
  interface CustomJwtSessionClaims extends user {}
}

export {}; // 
