import type { CommandInteraction, Message } from "discord.js";
import type { SimpleCommandMessage } from "discordx";
import {
  Discord,
  SimpleCommand,
  SimpleCommandOption,
  SimpleCommandOptionType,
  Slash,
} from "discordx";

@Discord()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Example {
  @SimpleCommand("hello", { aliases: ["hi"] })
  hello(command: SimpleCommandMessage) {
    command.message.reply(`👋 ${command.message.member}`);
  }

  @SimpleCommand("sum", { argSplitter: "+" })
  sum(
    @SimpleCommandOption("num1", { type: SimpleCommandOptionType.Number })
    num1: number | undefined,
    @SimpleCommandOption("num2", { type: SimpleCommandOptionType.Number })
    num2: number | undefined,
    command: SimpleCommandMessage
  ) {
    if (!num1 || !num2) {
      return command.sendUsageSyntax();
    }
    command.message.reply(`total = ${num1 + num2}`);
  }

  // make single handler for simple and slash command
  likeIt(command: CommandInteraction | Message) {
    command.reply("I like it, Thanks");
  }

  @SimpleCommand("like-it")
  simpleLikeIt(command: SimpleCommandMessage) {
    this.likeIt(command.message);
  }

  @Slash("like-it")
  slashLikeIt(command: CommandInteraction) {
    this.likeIt(command);
  }
}
