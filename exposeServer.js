const { spawn } = require("child_process");

async function exposeServer(PORT, provider = "serveo.net") {
  return new Promise((resolve, reject) => {
    const command = "ssh";
    const args = ["-n", "-R", `80:localhost:${PORT}`, provider];
    const serveo = spawn(command, args);

    serveo.stdout.on("data", (data) => {
      const output = data.toString().trim();
      if (output) {
        resolve(output);
      }
    });

    serveo.stderr.on("data", (data) => {
      const message = data.toString();
      if (!message.includes("Pseudo-terminal will not be allocated")) {
        console.error(`Errore Serveo: ${message}`);
      }
    });

    serveo.on("close", (code) => {
      console.log(`Tunnel chiuso con codice: ${code}`);
      resolve(code);
    });

    serveo.on("error", (err) => {
      console.error(`Errore nel processo: ${err}`);
      reject(err);
    });
  });
}

module.exports = { exposeServer };
