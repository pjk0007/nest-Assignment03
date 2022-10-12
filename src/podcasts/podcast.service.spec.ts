import { Test, TestingModule } from '@nestjs/testing';
import { PodcastsService } from '../podcasts/podcasts.service';

describe('PodcastService', () => {
  let service: PodcastsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PodcastsService],
    }).compile();

    service = module.get<PodcastsService>(PodcastsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const testPodcastInput = {
      title: 'title-test',
      category: 'category-test',
      rating: 9.9,
    };
    it('should create first podcast', () => {
      const res = service.createPodcast(testPodcastInput);
      expect(service.currentId).toEqual(2);
      expect(service.podcasts).toHaveLength(1);
      expect(res).toEqual({ ok: true });
    });

    it('should create second podcast', () => {
      const res = service.createPodcast(testPodcastInput);
      expect(service.currentId).toEqual(3);
      expect(service.podcasts).toHaveLength(2);
      expect(res).toEqual({ ok: true });
    });
  });

  describe('findAll', () => {
    const testPodcastsOutput = [
      {
        id: 1,
        title: 'title-test',
        category: 'category-test',
        rating: 9.9,
        episodes: [],
      },
      {
        id: 2,
        title: 'title-test',
        category: 'category-test',
        rating: 9.9,
        episodes: [],
      },
    ];
    it('should find all podcasts', () => {
      const { ok, podcasts } = service.getAllPodcasts();
      expect(ok).toEqual(true);
      expect(podcasts).toHaveLength(2);
      expect(podcasts).toEqual(testPodcastsOutput);
      expect(podcasts[0]).toEqual(testPodcastsOutput[0]);
      expect(podcasts[1]).toEqual(testPodcastsOutput[1]);
    });
  });

  describe('findOne', () => {
    const testPodcastOutput = {
      id: 1,
      title: 'title-test',
      category: 'category-test',
      rating: 9.9,
      episodes: [],
    };
    it('should find podcast id:1', () => {
      const { ok, podcast, error } = service.getAllPodcast(1);

      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(podcast).toEqual(testPodcastOutput);
    });

    it('should fail to find id:1234', () => {
      const { ok, podcast, error } = service.getAllPodcast(1234);
      expect(ok).toEqual(false);
      expect(error).toEqual('There is no podcast id:1234');
      expect(podcast).toEqual(undefined);
    });
  });

  describe('remove', () => {
    it('should remove id:2', () => {
      const { ok } = service.deletePodcast(2);
      expect(ok).toEqual(true);
      expect(service.podcasts).toHaveLength(1);
    });

    it('should fail remove id:1234', () => {
      const { ok } = service.deletePodcast(1234);
      expect(ok).toEqual(false);
      expect(service.podcasts).toHaveLength(1);
    });

    const testPodcastInput = {
      title: 'title-test',
      category: 'category-test',
      rating: 9.9,
    };

    it('should create episode id:3', () => {
      const { ok } = service.createPodcast(testPodcastInput);
      expect(ok).toEqual(true);
      expect(service.getAllPodcast(3).ok).toEqual(true);
    });
  });

  describe('update', () => {
    const testPodcastUpdateInput = {
      title: 'update-test',
      category: 'update-test',
      rating: 9.0,
    };
    it('should update podcast id:1', () => {
      const { ok, error, podcast } = service.updatePodcast(
        1,
        testPodcastUpdateInput,
      );
      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(podcast.title).toEqual(testPodcastUpdateInput.title);
      expect(podcast.category).toEqual(testPodcastUpdateInput.category);
      expect(podcast.rating).toEqual(testPodcastUpdateInput.rating);
    });

    it('should maintain same podcast id:1 when input is empty object', () => {
      const { title, category, rating } = service.getAllPodcast(1).podcast;
      const { ok, error, podcast } = service.updatePodcast(1, {});
      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(podcast.title).toEqual(title);
      expect(podcast.category).toEqual(category);
      expect(podcast.rating).toEqual(rating);
    });

    it('should fail update id:1234', () => {
      const { ok, error, podcast } = service.updatePodcast(
        1234,
        testPodcastUpdateInput,
      );
      expect(ok).toEqual(false);
      expect(error).toEqual('There is no podcast id:1234');
      expect(podcast).toEqual(undefined);
    });
  });

  describe('createEpisodes', () => {
    const testEpisodeInput = {
      title: 'title-test',
      category: 'cat-test',
      rating: 5.5,
    };
    const testPodcastOutput = [
      {
        id: 1,
        title: 'update-test',
        category: 'update-test',
        rating: 9.0,
        episodes: [
          { id: 1, title: 'title-test', category: 'cat-test', rating: 5.5 },
        ],
      },
      {
        id: 1,
        title: 'update-test',
        category: 'update-test',
        rating: 9.0,
        episodes: [
          { id: 1, title: 'title-test', category: 'cat-test', rating: 5.5 },
          { id: 2, title: 'title-test', category: 'cat-test', rating: 5.5 },
        ],
      },
    ];
    it('should create episode in podcast id:1', () => {
      const { ok, error, podcast } = service.createEpisode(1, testEpisodeInput);
      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(podcast).toEqual(testPodcastOutput[0]);
    });
    it('should create episode in podcast id:1', () => {
      const { ok, error, podcast } = service.createEpisode(1, testEpisodeInput);
      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(podcast).toEqual(testPodcastOutput[1]);
    });
    it('should fail create episode in podcast id:1234', () => {
      const { ok, error, podcast } = service.createEpisode(
        1234,
        testEpisodeInput,
      );
      expect(ok).toEqual(false);
      expect(error).toEqual('There is no podcast id:1234');
      expect(podcast).toEqual(undefined);
    });
  });

  describe('findEpisodes', () => {
    it('should find episodes in podcast id:1', () => {
      const { ok, error, episodes } = service.getEpisodes(1);
      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(episodes).toHaveLength(2);
      episodes.forEach((ep, index) => expect(ep.id).toEqual(index + 1));
    });

    it('should fail find episodes in podcast id:1234', () => {
      const { ok, error, episodes } = service.getEpisodes(1234);
      expect(ok).toEqual(false);
      expect(error).toEqual('There is no podcast id:1234');
      expect(episodes).toEqual(undefined);
    });
  });

  describe('removeEpisode', () => {
    it('should delete episode id:2 in podcast id:1', () => {
      const { ok, error } = service.removeEpisode(1, 2);
      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(service.getEpisodes(1).episodes).toHaveLength(1);
      expect(service.getEpisodes(1).episodes[0].id).toEqual(1);
    });
    it('should fail delete episode id:1 in podcast id:1234', () => {
      const { ok, error } = service.removeEpisode(1234, 1);
      expect(ok).toEqual(false);
      expect(error).toEqual('There is no podcast id:1234');
    });
    it('should fail delete episode id:1234 in podcast id:1', () => {
      const { ok, error } = service.removeEpisode(1, 1234);
      expect(ok).toEqual(false);
      expect(error).toEqual(`There is no episode id:1234 in podcast id:1`);
    });
  });

  describe('updateEpisode', () => {
    const testEpisodeUpdateInput = {
      title: 'update-test',
    };
    const testEpisodesUpdateOutput = [
      {
        id: 1,
        title: 'update-test',
        category: 'cat-test',
        rating: 5.5,
      },
    ];
    it('should update episode id:1 in podcast id:1', () => {
      const { ok, error, episodes } = service.updateEpisode(
        1,
        1,
        testEpisodeUpdateInput,
      );
      expect(ok).toEqual(true);
      expect(error).toEqual(undefined);
      expect(episodes).toEqual(testEpisodesUpdateOutput);
    });

    it('should fail update episode id:1 in podcast id:1234', () => {
      const { ok, error, episodes } = service.updateEpisode(
        1234,
        1,
        testEpisodeUpdateInput,
      );
      expect(ok).toEqual(false);
      expect(error).toEqual('There is no podcast id:1234');
      expect(episodes).toEqual(undefined);
    });

    it('should fail update episode id:1234 in podcast id:1', () => {
      const { ok, error, episodes } = service.updateEpisode(
        1,
        1234,
        testEpisodeUpdateInput,
      );
      expect(ok).toEqual(false);
      expect(error).toEqual('There is no episode id:1234 in podcast id:1');
      expect(episodes).toEqual(undefined);
    });

    it('should fail update empty title episode id:1 in podcast id:1', () => {
      const { ok, error, episodes } = service.updateEpisode(1, 1, {
        title: '',
      });
      expect(ok).toEqual(false);
      expect(error).toEqual('Title must be exist');
      expect(episodes).toEqual(undefined);
    });
  });
});
