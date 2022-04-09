import type { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

@Discord()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Example {
  @Slash()
  choose(
    @SlashChoice("Human", "Astronaut", "Dev")
    @SlashOption("what", { description: "What are you?" })
    what: string,
    interaction: CommandInteraction
  ) {
    interaction.reply(what);
  }

  @Slash()
  choice(
    @SlashChoice({ name: "are you okay?", value: "okay" })
    @SlashChoice({ name: "are you good?", value: "good" })
    @SlashOption("text")
    what: string,
    interaction: CommandInteraction
  ) {
    interaction.reply(what);
  }
}
