export const authQueries = {
  getUserByEmail: "SELECT email FROM auth WHERE email = $1",
  insertUser:
    "INSERT INTO auth (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
};
