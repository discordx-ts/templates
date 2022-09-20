import type { CommandInteraction, Guild } from "discord.js";
import {
  ApplicationCommandOptionType,
  EmbedBuilder,
  GuildMember,
} from "discord.js";
import type { ArgsOf } from "discordx";
import {
  ButtonComponent,
  Discord,
  On,
  Slash,
  SlashGroup,
  SlashOption,
} from "discordx";

import type { MyQueue } from "./music.js";
import { MyPlayer } from "./music.js";

@Discord()
// Create music group
@SlashGroup({ description: "music", name: "music" })
// Assign all slashes to music group
@SlashGroup("music")
export class music {
  player;

  constructor() {
    this.player = new MyPlayer();
  }

  @On()
  voiceStateUpdate([oldState, newState]: ArgsOf<"voiceStateUpdate">): void {
    const queue = this.player.getQueue(oldState.guild);

    if (
      !queue.isReady ||
      !queue.voiceChannelId ||
      (oldState.channelId != queue.voiceChannelId &&
        newState.channelId != queue.voiceChannelId) ||
      !queue.channel
    ) {
      return;
    }

    const channel =
      oldState.channelId === queue.voiceChannelId
        ? oldState.channel
        : newState.channel;

    if (!channel) {
      return;
    }

    const totalMembers = channel.members.filter((m) => !m.user.bot);

    if (queue.isPlaying && !totalMembers.size) {
      queue.pause();
      queue.channel.send(
        "> To save resources, I have paused the queue since everyone has left my voice channel."
      );

      if (queue.timeoutTimer) {
        clearTimeout(queue.timeoutTimer);
      }

      queue.timeoutTimer = setTimeout(() => {
        queue.channel?.send(
          "> My voice channel has been open for 5 minutes and no one has joined, so the queue has been deleted."
        );
        queue.leave();
      }, 5 * 60 * 1000);
    } else if (queue.isPause && totalMembers.size) {
      if (queue.timeoutTimer) {
        clearTimeout(queue.timeoutTimer);
        queue.timeoutTimer = undefined;
      }
      queue.resume();
      queue.channel.send(
        "> There has been a new participant in my voice channel, and the queue will be resumed. Enjoy the music 🎶"
      );
    }
  }

  validateControlInteraction(
    interaction: CommandInteraction
  ): MyQueue | undefined {
    if (
      !interaction.guild ||
      !interaction.channel ||
      !(interaction.member instanceof GuildMember)
    ) {
      interaction.reply(
        "> Your request could not be processed, please try again later"
      );
      return;
    }

    const queue = this.player.getQueue(interaction.guild, interaction.channel);

    if (interaction.member.voice.channelId !== queue.voiceChannelId) {
      interaction.reply(
        "> To use the controls, you need to join the bot voice channel"
      );

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    return queue;
  }

  @ButtonComponent({ id: "btn-next" })
  async nextControl(interaction: CommandInteraction): Promise<void> {
    const queue = this.validateControlInteraction(interaction);
    if (!queue) {
      return;
    }
    queue.skip();
    await interaction.deferReply();
    interaction.deleteReply();
  }

  @ButtonComponent({ id: "btn-pause" })
  async pauseControl(interaction: CommandInteraction): Promise<void> {
    const queue = this.validateControlInteraction(interaction);
    if (!queue) {
      return;
    }
    queue.isPause ? queue.resume() : queue.pause();
    await interaction.deferReply();
    interaction.deleteReply();
  }

  @ButtonComponent({ id: "btn-leave" })
  async leaveControl(interaction: CommandInteraction): Promise<void> {
    const queue = this.validateControlInteraction(interaction);
    if (!queue) {
      return;
    }
    queue.leave();
    await interaction.deferReply();
    interaction.deleteReply();
  }

  @ButtonComponent({ id: "btn-repeat" })
  async repeatControl(interaction: CommandInteraction): Promise<void> {
    const queue = this.validateControlInteraction(interaction);
    if (!queue) {
      return;
    }
    queue.setRepeat(!queue.repeat);
    await interaction.deferReply();
    interaction.deleteReply();
  }

  @ButtonComponent({ id: "btn-queue" })
  queueControl(interaction: CommandInteraction): void {
    const queue = this.validateControlInteraction(interaction);
    if (!queue) {
      return;
    }
    queue.view(interaction);
  }

  @ButtonComponent({ id: "btn-mix" })
  async mixControl(interaction: CommandInteraction): Promise<void> {
    const queue = this.validateControlInteraction(interaction);
    if (!queue) {
      return;
    }
    queue.mix();
    await interaction.deferReply();
    interaction.deleteReply();
  }

  @ButtonComponent({ id: "btn-controls" })
  async controlsControl(interaction: CommandInteraction): Promise<void> {
    const queue = this.validateControlInteraction(interaction);
    if (!queue) {
      return;
    }
    queue.updateControlMessage({ force: true });
    await interaction.deferReply();
    interaction.deleteReply();
  }

  async processJoin(
    interaction: CommandInteraction
  ): Promise<MyQueue | undefined> {
    if (
      !interaction.guild ||
      !interaction.channel ||
      !(interaction.member instanceof GuildMember)
    ) {
      interaction.reply(
        "> Your request could not be processed, please try again later"
      );

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    if (
      !(interaction.member instanceof GuildMember) ||
      !interaction.member.voice.channel
    ) {
      interaction.reply("> You are not in the voice channel");

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    await interaction.deferReply();
    const queue = this.player.getQueue(interaction.guild, interaction.channel);

    if (!queue.isReady) {
      queue.channel = interaction.channel;
      await queue.join(interaction.member.voice.channel);
    }

    return queue;
  }

  @Slash({ description: "Play a song" })
  async play(
    @SlashOption({
      description: "song url or title",
      name: "song",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    songName: string,
    interaction: CommandInteraction
  ): Promise<void> {
    const queue = await this.processJoin(interaction);
    if (!queue) {
      return;
    }
    const song = await queue.play(songName, { user: interaction.user });
    if (!song) {
      interaction.followUp("The song could not be found");
    } else {
      const embed = new EmbedBuilder();
      embed.setTitle("Enqueued");
      embed.setDescription(`Enqueued song **${song.title}****`);
      interaction.followUp({ embeds: [embed] });
    }
  }

  @Slash({ description: "Play a playlist" })
  async playlist(
    @SlashOption({
      description: "playlist name",
      name: "playlist",
      required: true,
      type: ApplicationCommandOptionType.String,
    })
    playlistName: string,
    interaction: CommandInteraction
  ): Promise<void> {
    const queue = await this.processJoin(interaction);
    if (!queue) {
      return;
    }
    const songs = await queue.playlist(playlistName, {
      user: interaction.user,
    });
    if (!songs) {
      interaction.followUp("The playlist could not be found");
    } else {
      const embed = new EmbedBuilder();
      embed.setTitle("Enqueued");
      embed.setDescription(`Enqueued  **${songs.length}** songs from playlist`);
      interaction.followUp({ embeds: [embed] });
    }
  }

  validateInteraction(
    interaction: CommandInteraction
  ): undefined | { guild: Guild; member: GuildMember; queue: MyQueue } {
    if (
      !interaction.guild ||
      !(interaction.member instanceof GuildMember) ||
      !interaction.channel
    ) {
      interaction.reply(
        "> Your request could not be processed, please try again later"
      );

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    if (!interaction.member.voice.channel) {
      interaction.reply(
        "> To use the music commands, you need to join voice channel"
      );

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    const queue = this.player.getQueue(interaction.guild, interaction.channel);

    if (
      !queue.isReady ||
      interaction.member.voice.channel.id !== queue.voiceChannelId
    ) {
      interaction.reply(
        "> To use the music commands, you need to join the bot voice channel"
      );

      setTimeout(() => interaction.deleteReply(), 15e3);
      return;
    }

    return { guild: interaction.guild, member: interaction.member, queue };
  }

  @Slash({ description: "skip track" })
  skip(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;

    queue.skip();
    interaction.reply("> skipped current song");
  }

  @Slash({ description: "mix tracks" })
  mix(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;

    queue.mix();
    interaction.reply("> mixed current queue");
  }

  @Slash({ description: "pause music" })
  pause(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;

    if (queue.isPause) {
      interaction.reply("> already paused");
      return;
    }

    queue.pause();
    interaction.reply("> paused music");
  }

  @Slash({ description: "resume music" })
  resume(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;

    if (queue.isPlaying) {
      interaction.reply("> already playing");
      return;
    }

    queue.resume();
    interaction.reply("> resumed music");
  }

  @Slash({ description: "seek music" })
  seek(
    @SlashOption({
      description: "seek time in seconds",
      name: "time",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    time: number,
    interaction: CommandInteraction
  ): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;

    if (!queue.isPlaying || !queue.currentTrack) {
      interaction.reply("> currently not playing any song");
      return;
    }

    const state = queue.seek(time * 1000);
    if (!state) {
      interaction.reply("> could not seek");
      return;
    }
    interaction.reply("> current music seeked");
  }

  @Slash({ description: "stop music" })
  leave(interaction: CommandInteraction): void {
    const validate = this.validateInteraction(interaction);
    if (!validate) {
      return;
    }

    const { queue } = validate;
    queue.leave();
    interaction.reply("> stopped music");
  }
}
