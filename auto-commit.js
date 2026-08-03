const chokidar = require("chokidar");
const { exec } = require("child_process");

let timer;

console.log("🚀 Auto Commit iniciado!");
console.log("👀 Monitorando alterações...");

const watcher = chokidar.watch(".", {
  ignored: /(^|[\/\\])(\.git|node_modules)/,
  persistent: true,
  ignoreInitial: true,
});

watcher.on("all", () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    exec("git status --porcelain", (err, stdout) => {
      if (err) return console.error(err);

      if (!stdout.trim()) {
        console.log("✔ Nenhuma alteração encontrada.");
        return;
      }

      const data = new Date().toLocaleString("pt-BR");

      exec(
        `git add . && git commit -m "Auto Commit - ${data}" && git push`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(stderr);
            return;
          }

          console.log(stdout);
          console.log("✅ Commit enviado com sucesso!");
        }
      );
    });
  }, 10000);
});