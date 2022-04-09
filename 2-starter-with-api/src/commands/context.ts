import { ContextMenuInteraction } from "discord.js";
import { Discord, ContextMenu } from "discordx";

@Discord()
export abstract class contextTest {
  @ContextMenu("MESSAGE", "message context")
  async messageHandler(interaction: ContextMenuInteraction) {
    interaction.reply("I am user context handler");
  }

  @ContextMenu("USER", "user context")
  async userHandler(interaction: ContextMenuInteraction) {
    interaction.reply("I am user context handler");
  }
}
