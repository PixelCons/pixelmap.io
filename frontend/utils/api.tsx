import getConfig from "next/config";
import { PixelMapTile } from "@pixelmap/common/types/PixelMapTile";

export const fetchTiles = async () => {
  try {
    const res = await fetch("https://pixelmap.art/tiledata.json");
    const tiles: Array<PixelMapTile> = await res.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return tiles;
  } catch (err) {
    return [];
  }
};

export const fetchSingleTile = async (id: string) => {
  let tile: PixelMapTile;
  if (id != undefined) {
    try {
      const res = await fetch(`https://pixelmap.art/tile/${id}.json`);
      tile = await res.json();
    } catch (err) {}
  }

  return tile;
};

export interface TimeCapsuleTile {
  tileId?: number;
  orderImageSetOnTile?: number;
  currentOwner?: number;
  claimed?: boolean;
}

export const fetchTimeCapsuleTiles = async () => {
  try {
    const res = await fetch("https://pixelmap.art/timecapsuleI.json");
    const tiles: Array<TimeCapsuleTile> = await res.json();

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return tiles;
  } catch (err) {
    return [];
  }
};
