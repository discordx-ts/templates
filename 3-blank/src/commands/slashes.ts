import type { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export class Example {
  @Slash()
  ping(interaction: CommandInteraction): void {
    interaction.reply("pong!");
  }
}
