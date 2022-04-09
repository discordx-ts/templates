import type {
  ButtonInteraction,
  CommandInteraction,
  GuildMember,
  User,
} from "discord.js";
import { MessageActionRow, MessageButton } from "discord.js";
import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";

@Discord()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Example {
  @Slash("hello-btn")
  async hello(
    @SlashOption("user", { type: "USER" })
    user: User | GuildMember | undefined,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply();

    const helloBtn = new MessageButton()
      .setLabel("Hello")
      .setEmoji("👋")
      .setStyle("PRIMARY")
      .setCustomId("hello-btn");

    const row = new MessageActionRow().addComponents(helloBtn);

    interaction.editReply({
      components: [row],
      content: `${user}, Say hello to bot`,
    });
  }

  @ButtonComponent("hello-btn")
  helloBtn(interaction: ButtonInteraction) {
    interaction.reply(`👋 ${interaction.member}`);
  }
}
