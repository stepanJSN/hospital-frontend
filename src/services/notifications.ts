import { INotification } from '@/types/notifications.type';
import { axiosWithAuth } from './api';
import { getUserId } from './cookie';

class NotificationsService {
  async getAllByUserId(onlyUnread: boolean) {
    return (
      await axiosWithAuth.get<INotification[]>(
        `/notifications/${await getUserId()}`,
        {
          params: {
            onlyUnread,
          },
        },
      )
    ).data;
  }

  async markAsRead(messageId: string) {
    axiosWithAuth.patch(`/notifications/${messageId}`);
  }
}

export const notificationsService = new NotificationsService();
