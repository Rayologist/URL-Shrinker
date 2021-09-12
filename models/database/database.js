import PG from "pg";

const pool = new PG.Pool({
  user: "",
  password: "",
  database: "url_shortener",
  host: "localhost",
  port: 5432,
});

class DatabaseSetup {
    checkDatabaseExistsCommand = `
      SELECT datname
      FROM pg_catalog.pg_database
      WHERE datname = 'url_shortener';
      `;
  
    createdbCommand = `
    CREATE DATABASE url_shortener;
    `;
  
    createTableCommand = `
    CREATE TABLE urls (
      full_url TEXT NOT NULL,
      short_url TEXT NOT NULL,
      click INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
  
    constructor() {
      this.default_pool = new PG.Pool({
        user: "",
        password: "",
        database: "postgres",
        host: "localhost",
        port: 5432,
      });
  
      this.pool = pool;
    }
  
    async checkdbExists() {
      const res = await this.default_pool.query(this.checkDatabaseExistsCommand);
      if (res.rows.length) {
        return true;
      }
      return false;
    }
  
    async createdb() {
      try {
        const res = await this.default_pool.query(this.createdbCommand);
        console.log(`DATABASE "url_shortener" is created`);
      } catch (error) {
        console.log(error.message);
      }
    }
  
    async createTable() {
      try {
        const res = await this.pool.query(this.createTableCommand);
        console.log(`Table "urls" is created in "url_shortener"`);
      } catch (error) {
        console.log(error.message);
      }
    }
  
    async setup() {
      const dbExists = await this.checkdbExists();
      if (!dbExists) {
        await this.createdb();
        await this.createTable();
      }
    }
  }
  
  export { pool, DatabaseSetup };  