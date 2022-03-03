import { Get, Router } from "@discordx/koa";
import type { Context } from "koa";
import { client } from "../main.js";

@Router()
export class API {
  @Get("/")
  index(context: Context) {
    context.body = `
      <div style="text-align: center">
        <h1>
          <a href="https://discord-ts.js.org">discord.ts</a> rest api server example
        </h1>
        <p>
          powered by <a href="https://koajs.com/">koa</a> and
          <a href="https://www.npmjs.com/package/@discordx/koa">@discordx/koa</a>
        </p>
      </div>
    `;
  }

  @Get()
  guilds(context: Context) {
    context.body = `${client.guilds.cache.map((g) => `${g.id}: ${g.name}\n`)}`;
  }
}
