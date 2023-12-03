import type { ArgsOf } from "discordx";
import { Discord, On } from "discordx";

@Discord()
export class Example {
  @On()
  messageCreate([message]: ArgsOf<"messageCreate">): void {
    console.log(message.author.username, "said:", message.content);
  }
}
