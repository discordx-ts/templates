import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption, SlashChoice } from "discordx";

@Discord()
class Example {
  @Slash("choose")
  async choose(
    @SlashChoice("Human", "human")
    @SlashChoice("Astronaut", "astronaut")
    @SlashChoice("Dev", "dev")
    @SlashOption("what", { description: "What are you?" })
    what: string,
    interaction: CommandInteraction
  ) {
    interaction.reply(what);
  }

  @Slash("choice")
  async choice(
    @SlashChoice({ name: "are you good?", value: "good" })
    @SlashChoice({ name: "are you okay?", value: "okay" })
    @SlashOption("text")
    what: string,
    interaction: CommandInteraction
  ) {
    interaction.reply(what);
  }
}
