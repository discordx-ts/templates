import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";
import { Pagination } from "@discordx/pagination";

@Discord()
export abstract class SlashExample {
  // example: pagination for all slash command
  @Slash("all-commands", { description: "Pagination for all slash command" })
  async pages(interaction: CommandInteraction): Promise<void> {
    const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { name: cmd.name, description: cmd.description };
    });

    const pages = commands.map((cmd, i) => {
      return new MessageEmbed()
        .setFooter({ text: `Page ${i + 1} of ${commands.length}` })
        .setTitle("**Slash command info**")
        .addField("Name", cmd.name)
        .addField("Description", cmd.description);
    });

    const pagination = new Pagination(interaction, pages);
    await pagination.send();
  }
}
