import shortid from "shortid";
import { pool } from "./database.js";

class UrlTable {
  addUrlCommand = `
  INSERT INTO urls (full_url, short_url)
  VALUES ($1, $2)
  `;

  selectAllCommand = `
  SELECT * FROM urls
  `;

  searchCommand = `
  SELECT * FROM urls
  WHERE short_url = $1
  `;

  incrementCommand = `
  UPDATE urls
  SET click = click + 1
  WHERE short_url = $1
  `;

  deleteCommand = `
  DELETE FROM urls
  WHERE short_url = $1
  `;

  constructor() {
    this.pool = pool;
  }
  async selectAll() {
    try {
      const res = await this.pool.query(this.selectAllCommand);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async addUrlToDB(full) {
    try {
      const short = shortid.generate();
      const res = await this.pool.query(this.addUrlCommand, [full, short]);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async searchShortUrl(shortUrl) {
    try {
      const res = await this.pool.query(this.searchCommand, [shortUrl]);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async updateClick(shortUrl) {
    try {
      const res = await this.pool.query(this.incrementCommand, [shortUrl]);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteShortUrl(shortUrl) {
    try {
      const res = await this.pool.query(this.searchCommand, [shortUrl]);
      if (!res.rows) {
        return false;
      }
      const deleteRes = await this.pool.query(this.deleteCommand, [shortUrl]);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UrlTable;
