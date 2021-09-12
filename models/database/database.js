import PG from "pg";

const pool = new PG.Pool({
  user: "",
  password: "",
  database: "url_shortener",
  host: "localhost",
  port: 5432,
});

