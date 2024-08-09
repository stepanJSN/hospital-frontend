import { INotification } from "@/types/notifications.type";
import { axiosWithAuth } from "./api";
import { getUserId } from "./auth-token";

class NotificationsService {

	async getAllByUserId() {
		return (await axiosWithAuth.get<INotification[]>(`/notifications/${await getUserId()}`)).data;
	};

  async markAsRead(messageId: string) {
    axiosWithAuth.patch(`/notifications/${messageId}`);
  }
}

export const notificationsService = new NotificationsService();