import type { ContextMenuInteraction } from "discord.js";
import { ContextMenu, Discord } from "discordx";

@Discord()
export class Example {
  @ContextMenu("MESSAGE", "message context")
  messageHandler(interaction: ContextMenuInteraction): void {
    interaction.reply("I am user context handler");
  }

  @ContextMenu("USER", "user context")
  userHandler(interaction: ContextMenuInteraction): void {
    interaction.reply("I am user context handler");
  }
}
