import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_STORE_PASSWD: process.env.SSLCOMMERZ_STORE_PASSWD,
  STORE_ID: process.env.STORE_ID,
  SIGNETURE_KEY: process.env.SIGNETURE_KEY,
  PAYMENT_URL: process.env.PAYMENT_URL,
  PAYMENT_VERIFY_URL: process.env.PAYMENT_VERIFY_URL,
};
