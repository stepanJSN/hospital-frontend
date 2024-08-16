export interface IGetAppointments {
  fromDate?: string;
  toDate?: string;
  isCompleted?: boolean;
  staffName?: string;
  customerName?: string;
  returnType: 'staff' | 'customer'
}

export interface IGetCustomerAppointmentsForm extends Omit<IGetAppointments, 'returnType' | 'customerName'> {}

export interface IAvailableTime {
  dayOfWeek: number;
  startTime: number;
  endTime: number;
  bookedTime: number[];
}

export interface IAppointmentPayload {
  staffId: string;
  dateTime: string;
}

export interface IAppointment {
  id: string;
  dateTime: string;
  isCompleted: boolean;
  staff?: {
    name: string;
    surname: string;
    specialization: {
      title: string;
    },
  },
  customer?: {
    id: string;
    name: string;
    surname: string;
  }
}

export interface IStaffAppointments {
  id: string;
  dateTime: Date;
  isCompleted: boolean;
  customer: {
    id: string;
    name: string;
    surname: string;
  }
}

// export interface IGetAppointments {
//   staffId: string
//   startDate?: string;
//   endDate?: string;
//   isCompleted?: boolean;
// }

export interface IChangeStatus {
  isCompleted: boolean;
}