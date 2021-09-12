import express from "express";
import { DatabaseSetup } from "./models/database/database.js";
import UrlTable from "./models/database/urlTable.js";
import methodOverride from "method-override";

const dbSetup = new DatabaseSetup();
dbSetup.setup();

const dbTable = new UrlTable();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  `Server listening on port ${PORT}`;
});
