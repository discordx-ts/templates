import type { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

@Discord()
export class Example {
  @Slash()
  choose(
    @SlashChoice("Human", "Astronaut", "Dev")
    @SlashOption({ description: "What are you?", name: "what" })
    what: string,
    interaction: CommandInteraction
  ): void {
    interaction.reply(what);
  }

  @Slash()
  choice(
    @SlashChoice({ name: "are you okay?", value: "okay" })
    @SlashChoice({ name: "are you good?", value: "good" })
    @SlashOption({ name: "text" })
    what: string,
    interaction: CommandInteraction
  ): void {
    interaction.reply(what);
  }
}
