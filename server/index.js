import express from "express";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import fs from "fs";
import App from "../src/App";

const PORT = 3000;

const html = fs.readFileSync("dist/frontend/index.html").toString();

// We are splitting the html into two parts, not including our delimiter.
const parts = html.split("not rendered");

const app = express();

app.use("/frontend", express.static("dist/frontend"));
app.use((req, res) => {
  res.write(parts[0]);
  const reactMarkup = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listening on http://localhost:${PORT}`);
app.listen(PORT);
