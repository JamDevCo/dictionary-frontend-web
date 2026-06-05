export type Word = {
  id?: string | number;
  word: string;
  pronounciation: string;
  pronunciation?: string;
  language?: string;
  part_of_speech?: string;
  slug?: string;
};

export type Meaning = {
  definition: string;
  example: string;
  part_of_speech: string;
};

export type ThesaurusItem = {
  synonym: { word: string };
  meaning: { definition: string; example: string };
};
