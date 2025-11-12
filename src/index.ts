import { readConfig, setUser } from "./config.js";

function main() {
  setUser("Jeff");
  const cfg = readConfig();
  console.log(cfg);
}

main();

