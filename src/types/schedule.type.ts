export interface ISchedule {
  dayOfWeek: number;
  startTime: number | null;
  endTime: number | null;
}

export interface IChangeSchedule {
  staffId: string;

  schedule: Array<{
    dayOfWeek: number;
    startTime: number;
    endTime: number;
  }>;
}