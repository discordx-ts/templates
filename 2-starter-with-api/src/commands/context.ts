import type {
  MessageContextMenuCommandInteraction,
  UserContextMenuCommandInteraction,
} from "discord.js";
import { ApplicationCommandType } from "discord.js";
import { ContextMenu, Discord } from "discordx";

@Discord()
export class Example {
  @ContextMenu(ApplicationCommandType.Message, "message context")
  messageHandler(interaction: MessageContextMenuCommandInteraction): void {
    interaction.reply("I am user context handler");
  }

  @ContextMenu(ApplicationCommandType.User, "user context")
  userHandler(interaction: UserContextMenuCommandInteraction): void {
    interaction.reply("I am user context handler");
  }
}
