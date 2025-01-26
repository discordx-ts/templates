import { Pagination } from "@discordx/pagination";
import type { CommandInteraction } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { Discord, MetadataStorage, Slash } from "discordx";

@Discord()
export class SlashExample {
  // example: pagination for all slash command
  @Slash({
    description: "Pagination for all slash command",
    name: "all-commands",
  })
  async pages(interaction: CommandInteraction): Promise<void> {
    const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
      return { description: cmd.description, name: cmd.name };
    });

    const pages = commands.map((cmd, i) => {
      const embed = new EmbedBuilder()
        .setFooter({
          text: `Page ${String(i + 1)} of ${String(commands.length)}`,
        })
        .setTitle("**Slash command info**")
        .addFields({ name: "Name", value: cmd.name })
        .addFields({
          name: "Description",
          value: cmd.description.length ? cmd.description : "-",
        });

      return { embeds: [embed] };
    });

    const pagination = new Pagination(interaction, pages);
    await pagination.send();
  }
}
