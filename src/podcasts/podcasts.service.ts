import { Injectable } from '@nestjs/common';
import { CommonOutput } from 'src/common/dto/common-output.dto';
import {
  CreateEpisodeInput,
  CreatePodcastInput,
  UpdateEpisodeInput,
  UpdatePodcastInput,
} from 'src/podcasts/dto/podcast-input.dto';
import {
  AllPodcastOutput,
  EpisodesOutput,
  PodcastOutput,
} from 'src/podcasts/dto/podcast-output.dto';
import { Podcast } from 'src/podcasts/entities/podcast.entity';

@Injectable()
export class PodcastsService {
  public podcasts: Podcast[] = [];
  public currentId = 1;
  public currentEpisodeId = 1;

  createPodcast(createPodcastInput: CreatePodcastInput): CommonOutput {
    this.podcasts.push({
      id: this.currentId++,
      ...createPodcastInput,
      episodes: [],
    });
    return { ok: true };
  }

  getAllPodcast(id: number): PodcastOutput {
    const index = this.podcasts.findIndex((pc) => pc.id === id);
    if (index < 0) return { ok: false, error: `There is no podcast id:${id}` };
    else
      return {
        ok: true,
        podcast: this.podcasts[index],
      };
  }

  getAllPodcasts(): AllPodcastOutput {
    return { ok: true, podcasts: this.podcasts };
  }

  updatePodcast(
    id: number,
    updatePodcastInput: UpdatePodcastInput,
  ): PodcastOutput {
    const index = this.podcasts.findIndex((pc) => pc.id === id);
    if (index < 0) return { ok: false, error: `There is no podcast id:${id}` };
    this.podcasts[index].title =
      updatePodcastInput.title ?? this.podcasts[index].title;
    this.podcasts[index].category =
      updatePodcastInput.category ?? this.podcasts[index].category;
    this.podcasts[index].rating =
      updatePodcastInput.rating ?? this.podcasts[index].rating;
    return { ok: true, podcast: this.podcasts[index] };
  }

  deletePodcast(id: number) {
    const res = this.getAllPodcast(id);
    if (res.ok) {
      this.podcasts = this.podcasts.filter((pc) => pc.id !== id);
    }
    return res;
  }

  createEpisode(
    id: number,
    createEpisodeInput: CreateEpisodeInput,
  ): PodcastOutput {
    const index = this.podcasts.findIndex((pc) => pc.id === id);
    if (index < 0) return { ok: false, error: `There is no podcast id:${id}` };
    this.podcasts[index].episodes.push({
      id: this.currentEpisodeId++,
      ...createEpisodeInput,
    });
    return { ok: true, podcast: this.podcasts[index] };
  }

  getEpisodes(id: number): EpisodesOutput {
    const index = this.podcasts.findIndex((pc) => pc.id === id);
    if (index < 0) return { ok: false, error: `There is no podcast id:${id}` };
    return { ok: true, episodes: this.podcasts[index].episodes };
  }

  removeEpisode(id: number, episodeId: number): CommonOutput {
    const index = this.podcasts.findIndex((pc) => pc.id === id);
    if (index < 0) return { ok: false, error: `There is no podcast id:${id}` };
    const episode = this.podcasts[index].episodes.find(
      (ep) => ep.id === episodeId,
    );
    if (episode === undefined)
      return {
        ok: false,
        error: `There is no episode id:${episodeId} in podcast id:${id}`,
      };
    this.podcasts[index].episodes = this.podcasts[index].episodes.filter(
      (ep) => ep.id !== episodeId,
    );
    return { ok: true };
  }

  updateEpisode(
    id: number,
    episodeId: number,
    updateEpisodeInput: UpdateEpisodeInput,
  ): EpisodesOutput {
    const index = this.podcasts.findIndex((pc) => pc.id === id);
    if (index < 0) return { ok: false, error: `There is no podcast id:${id}` };
    const episodeIndex = this.podcasts[index].episodes.findIndex(
      (ep) => ep.id === episodeId,
    );
    if (episodeIndex < 0)
      return {
        ok: false,
        error: `There is no episode id:${episodeId} in podcast id:${id}`,
      };
    if (updateEpisodeInput.title === '') {
      return {
        ok: false,
        error: 'Title must be exist',
      };
    }
    this.podcasts[index].episodes[episodeIndex].title = updateEpisodeInput.title;
    return { ok: true, episodes: this.podcasts[index].episodes };
  }
}
