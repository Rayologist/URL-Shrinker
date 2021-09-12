import express from "express";
import { DatabaseSetup } from "./models/database/database.js";
import UrlTable from "./models/database/urlTable.js";
import methodOverride from "method-override";

const dbSetup = new DatabaseSetup();
dbSetup.setup();

const dbTable = new UrlTable();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view-engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrls = await dbTable.selectAll();
  console.log(shortUrls);
  res.render("index.ejs", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  const { fullUrl } = req.body;
  const dbRes = await dbTable.addUrlToDB(fullUrl);
  console.log(dbRes);
  res.redirect("/");
});



app.listen(PORT, () => {
  `Server listening on port ${PORT}`;
});
