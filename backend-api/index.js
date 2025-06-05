const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(cors());

const apis = [
  
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://goweather.herokuapp.com/weather/London",
  "https://dog.ceo/api/breeds/image/random"
];

app.get("/api/data", async (req, res) => {
  const results = await Promise.allSettled(
    apis.map(url => fetch(url).then(r => r.json()))
  );

  const response = results.map((r, i) => {
    return r.status === "fulfilled"
      ? { api: apis[i], data: r.value }
      : { api: apis[i], error: r.reason.toString() };
  });

  res.json({ results: response });
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
