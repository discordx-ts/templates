import type { ContextMenuInteraction } from "discord.js";
import { ContextMenu, Discord } from "discordx";

@Discord()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Example {
  @ContextMenu("MESSAGE", "message context")
  messageHandler(interaction: ContextMenuInteraction) {
    interaction.reply("I am user context handler");
  }

  @ContextMenu("USER", "user context")
  userHandler(interaction: ContextMenuInteraction) {
    interaction.reply("I am user context handler");
  }
}
