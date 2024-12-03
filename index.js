const express = require("express");
const { exposeServer } = require("./exposeServer");

const app = express();
const PORT = 3000;

// Middleware per gestire le richieste
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Avvia il server
app.listen(PORT, async () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
  try {
    let code = "";
    while (code.length <= 5) {
      code = await exposeServer(PORT);
    }
    console.log(code);
  } catch (error) {
    console.error(error);
  }
});
