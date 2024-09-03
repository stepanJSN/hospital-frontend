export interface INotification {
  _id: string;
  sender: string;
  senderName: string;
  receiversId: string[];
  type: 'Info' | 'Warning' | 'Error';
  message: string;
  isRead: boolean;
  date: Date;
}
