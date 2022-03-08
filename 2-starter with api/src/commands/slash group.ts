import type { CommandInteraction } from "discord.js";

import { Discord, Slash, SlashGroup, SlashOption } from "discordx";

@Discord()
@SlashGroup({ name: "testing" })
@SlashGroup({ name: "maths", root: "testing" })
export abstract class Group {
  @Slash("add")
  @SlashGroup("maths", "testing")
  add(
    @SlashOption("x", { description: "x value" }) x: number,
    @SlashOption("y", { description: "y value" }) y: number,
    interaction: CommandInteraction
  ): void {
    interaction.reply(String(x + y));
  }

  @Slash("multiply")
  @SlashGroup("maths", "testing")
  multiply(
    @SlashOption("x", { description: "x value" }) x: number,
    @SlashOption("y", { description: "y value" }) y: number,
    interaction: CommandInteraction
  ): void {
    interaction.reply(String(x * y));
  }

  @Slash("root")
  @SlashGroup("testing")
  root(
    @SlashOption("text") text: string,
    interaction: CommandInteraction
  ): void {
    interaction.reply(text);
  }
}
