export interface Character {
  id: string;
  name: string;
  japaneseName: string;
  kanjiTitle: string;
  role: string;
  division?: string;
  zanpakuto: string;
  releaseCommand: string;
  bankaiName?: string;
  quote: string;
  description: string;
  accentColor: string; // Hex color code
  glowColor: string;
  image: string;
  stats: {
    reiatsu: number;
    zanjutsu: number;
    hoho: number; // Agility / Flash Step
    kido: number;
  };
  signatureMoves: string[];
}

export interface Realm {
  id: string;
  name: string;
  japaneseName: string;
  category: string;
  description: string;
  atmosphere: string;
  governingForce: string;
  image: string;
  spiritualDensity: string;
  landmarks: string[];
}

export interface SoundEffectOptions {
  volume?: number;
  pitch?: number;
}
