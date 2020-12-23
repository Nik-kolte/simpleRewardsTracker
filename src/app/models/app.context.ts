export class HeartPoints {
  id?: any;
  value: number = 0;
  modifyDate: any;
}

export class Task {
  id?: any;
  message: string;
  points: number;
  date: any;
}

export class Reward {
  id?: any;
  name: string;
  cost: number;
}

export class Log {
  id?: any;
  message: string;
  date: any;
}
