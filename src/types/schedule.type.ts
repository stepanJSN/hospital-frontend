export interface ISchedule {
  id: string;
  staffId: string;
  dayOfWeek: number;
  startTime: number;
  endTime: number;
}

export interface IChangeSchedule {
  staffId: string;

  schedule: Array<{
    dayOfWeek: number;
    startTime: number;
    endTime: number;
  }>;
}