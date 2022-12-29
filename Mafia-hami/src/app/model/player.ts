export class Player {
  id!: string;
  name!: string;
  alive!: boolean;
  role: string = '';
  turn!: boolean;
  selected!: boolean;
  mafia!: boolean;
  life!: number;
  isSaved!: boolean;
  selfsaved!: boolean;
  image: any[] | undefined;
  hasSelect!: boolean;
}
