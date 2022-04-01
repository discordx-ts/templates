import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption, SlashChoice } from "discordx";

@Discord()
class choicesExample {
  @Slash("choose")
  async choose(
    @SlashChoice("Human", "Astronaut", "Dev")
    @SlashOption("what", { description: "What are you?" })
    what: string,
    interaction: CommandInteraction
  ) {
    interaction.reply(what);
  }

  @Slash("choice")
  async choice(
    @SlashChoice({ name: "are you okay?", value: "okay" })
    @SlashChoice({ name: "are you good?", value: "good" })
    @SlashOption("text")
    what: string,
    interaction: CommandInteraction
  ) {
    interaction.reply(what);
  }
}
