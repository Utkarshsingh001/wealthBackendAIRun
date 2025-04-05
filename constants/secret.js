import dotenv from "dotenv";
dotenv.config();
export default {
    DB : {
        NAME : process.env.DB_NAME,
        HOST : process.env.DB_HOST,
        PORT : process.env.DB_PORT,
        USERNAME : process.env.DB_USER,
        PASSWORD : process.env.DB_PASS
    }
}