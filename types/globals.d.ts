import { user } from "../actions/types";


declare global {
    interface CustomJwtSessionClaims extends user {}
}