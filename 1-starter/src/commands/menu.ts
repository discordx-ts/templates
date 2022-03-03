import {
  CommandInteraction,
  MessageActionRow,
  SelectMenuInteraction,
  MessageSelectMenu,
} from "discord.js";
import { Discord, Slash, SelectMenuComponent } from "discordx";

const roles = [
  { label: "Principal", value: "principal" },
  { label: "Teacher", value: "teacher" },
  { label: "Student", value: "student" },
];

@Discord()
export abstract class buttons {
  @SelectMenuComponent("role-menu")
  async handle(interaction: SelectMenuInteraction): Promise<unknown> {
    await interaction.deferReply();

    // extract selected value by member
    const roleValue = interaction.values?.[0];

    // if value not found
    if (!roleValue) {
      return await interaction.followUp("invalid role id, select again");
    }

    await interaction.followUp(
      `you have selected role: ${
        roles.find((r) => r.value === roleValue)?.label
      }`
    );
    return;
  }

  @Slash("my_roles", { description: "roles menu" })
  async myRoles(interaction: CommandInteraction): Promise<unknown> {
    await interaction.deferReply();

    // create menu for roles
    const menu = new MessageSelectMenu()
      .addOptions(roles)
      .setCustomId("role-menu");

    // create a row for message actions
    const buttonRow = new MessageActionRow().addComponents(menu);

    // send it
    interaction.editReply({
      content: "select your role!",
      components: [buttonRow],
    });
    return;
  }
}
