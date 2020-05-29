/**
 * @flow
 */

export type AnimeImage = {
  large: string,
  small: string,
};

export type Anime = {
  end_date: number,
  episodes: number,
  image_url: string,
  mal_id: number,
  members: number,
  rank: number,
  score: number,
  start_date: string,
  title: string,
  type: string,
  url: string,
};
