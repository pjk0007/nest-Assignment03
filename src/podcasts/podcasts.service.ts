import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ok } from 'assert';
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
import { Episode } from 'src/podcasts/entities/episode.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';
import { Repository } from 'typeorm';

const PodcastNotFound = (id: number) => `There is no podcast id:${id}`;
const EpisodeNotFound = (id: number, episodeId: number) =>
  `There is no episode id:${episodeId} in podcast id:${id}`;

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcastRepository: Repository<Podcast>,
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async createPodcast(
    createPodcastInput: CreatePodcastInput,
  ): Promise<CommonOutput> {
    try {
      await this.podcastRepository.save(
        this.podcastRepository.create(createPodcastInput),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getPodcast(id: number): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcastRepository.findOne({
        where: { id },
        relations: ['episodes'],
      });
      if (podcast) return { ok: true, podcast };
      else return { ok: false, error: PodcastNotFound(id) };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getAllPodcasts(): Promise<AllPodcastOutput> {
    try {
      const podcasts = await this.podcastRepository.find({
        relations: ['episodes'],
      });
      return { ok: true, podcasts };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async updatePodcast(
    id: number,
    updatePodcastInput: UpdatePodcastInput,
  ): Promise<PodcastOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) return { ok, error };
      podcast.update(updatePodcastInput);
      await this.podcastRepository.save(podcast);
      return { ok: true, podcast: podcast };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deletePodcast(id: number): Promise<CommonOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) return { ok, error };
      await this.podcastRepository.delete(id);
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createEpisode(
    id: number,
    createEpisodeInput: CreateEpisodeInput,
  ): Promise<PodcastOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) return { ok, error };
      await this.episodeRepository.save(
        this.episodeRepository.create({ ...createEpisodeInput, podcast }),
      );
      return { ok: true, podcast };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async getEpisodes(id: number): Promise<EpisodesOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) return { ok, error };
      return { ok: false, episodes: podcast.episodes };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async removeEpisode(id: number, episodeId: number): Promise<CommonOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) return { ok, error };

      const index = podcast.episodes.findIndex((es) => {
        return es.id === episodeId;
      });

      if (index < 0)
        return { ok: false, error: EpisodeNotFound(id, episodeId) };

      await this.episodeRepository.delete(episodeId);
      return { ok: true };

    } catch (error) {
      return { ok: false, error };
    }
  }

  async updateEpisode(
    id: number,
    episodeId: number,
    updateEpisodeInput: UpdateEpisodeInput,
  ): Promise<EpisodesOutput> {
    try {
      const { ok, error, podcast } = await this.getPodcast(id);
      if (!ok) return { ok, error };

      const index = podcast.episodes.findIndex((es) => {
        return es.id === episodeId;
      });

      if (index < 0)
        return { ok: false, error: EpisodeNotFound(id, episodeId) };

      podcast.episodes[index].update(updateEpisodeInput);
      await this.episodeRepository.save(podcast.episodes[index]);
      return { ok: true, episodes:podcast.episodes };

    } catch (error) {
      return { ok: false, error };
    }
  }
}
