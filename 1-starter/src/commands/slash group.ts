import type { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";

@Discord()
@SlashGroup({ name: "testing" })
@SlashGroup({ name: "maths", root: "testing" })
export class GroupExample {
  @Slash()
  @SlashGroup("maths", "testing")
  add(
    @SlashOption({ description: "x value", name: "x" }) x: number,
    @SlashOption({ description: "y value", name: "y" }) y: number,
    interaction: CommandInteraction
  ): void {
    interaction.reply(String(x + y));
  }

  @Slash()
  @SlashGroup("maths", "testing")
  multiply(
    @SlashOption({ description: "x value", name: "x" }) x: number,
    @SlashOption({ description: "y value", name: "y" }) y: number,
    interaction: CommandInteraction
  ): void {
    interaction.reply(String(x * y));
  }

  @Slash()
  @SlashGroup("testing")
  root(
    @SlashOption({ name: "text" }) text: string,
    interaction: CommandInteraction
  ): void {
    interaction.reply(text);
  }
}
