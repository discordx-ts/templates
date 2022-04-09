import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Example {
  @Slash()
  ping(interaction: CommandInteraction): void {
    interaction.reply("pong!");
  }
}
