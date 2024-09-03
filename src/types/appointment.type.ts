/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IGetAppointments {
  fromDate?: string;
  toDate?: string;
  isCompleted?: boolean;
  staffName?: string;
  customerName?: string;
  returnType: 'staff' | 'customer';
}

export interface IGetCustomerAppointmentsForm
  extends Omit<IGetAppointments, 'returnType' | 'customerName'> {}

export interface IGetStaffAppointmentsForm
  extends Omit<IGetAppointments, 'returnType' | 'staffName'> {}

export interface IAppointmentPayload {
  staffId: string;
  dateTime: string;
}

export interface IAppointment {
  id: string;
  dateTime: string;
  isCompleted: boolean;
  staff: {
    name: string;
    surname: string;
    specialization: {
      title: string;
    };
  };
  customer: {
    id: string;
    name: string;
    surname: string;
  };
}

export interface IChangeStatus {
  isCompleted: boolean;
}
