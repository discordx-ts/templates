import { dirname, importx } from "@discordx/importer";
import { Koa } from "@discordx/koa";

async function run() {
  // The following syntax should be used in the commonjs environment
  //
  // await importx(__dirname + "/api/**/*.{ts,js}");

  // The following syntax should be used in the ECMAScript environment
  await importx(dirname(import.meta.url) + "/api/**/*.{ts,js}");

  // ************* rest api section: start **********

  // api: prepare server
  const server = new Koa();

  // api: need to build the api server first
  await server.build();

  // api: let's start the server now
  const port = process.env.PORT ?? 3000;
  server.listen(port, () => {
    console.log(`api server started on ${port}`);
    console.log(`visit localhost:${port}`);
  });

  // ************* rest api section: end **********
}

run();
