export interface IAttribute {
  current: number;
  max: number;
};

export interface ICharacter {
  skill: IAttribute;
  energy: IAttribute;
  luck: IAttribute;
  gold: number;
  rations: number;
  equipment: string;
};
