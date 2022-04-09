import type { ArgsOf, Client } from "discordx";
import { Discord, On } from "discordx";

@Discord()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Example {
  @On("messageDelete")
  onMessage([message]: ArgsOf<"messageDelete">, client: Client) {
    console.log("Message Deleted", client.user?.username, message.content);
  }
}
