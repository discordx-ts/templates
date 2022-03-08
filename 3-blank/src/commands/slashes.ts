import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";

@Discord()
export abstract class SlashExample {
  @Slash("ping")
  async ping(interaction: CommandInteraction): Promise<void> {
    interaction.reply("pong!");
  }
}
