export interface ISchedule {
  id: string;
  staffId: string;
  dayOfWeek: number;
  startTime: number | null;
  endTime: number | null;
}

export interface IUpdateSchedule extends Omit<ISchedule, 'staffId'> {}