import { Breed } from "../models/breed";

export const findBridById = (id: string, breeds: Breed[]): Breed | null => {
  return breeds.find((breed) => breed.id === id) || null;
};

export const searchResultText = (count: number): string => {
  if (count === 0) {
    return `breeds not found`;
  } else if (count === 1) {
    return `found ${count} result`;
  } else {
    return `found ${count} results`;
  }
};
