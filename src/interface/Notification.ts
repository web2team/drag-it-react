import { GridLayoutItemProps } from "interface/GridLayout";
import { User } from "interface/User";
import { Styled } from "interface/global";

export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;

  user: User;

  gridLayoutItemProps: GridLayoutItemProps;
}

export interface NotificationCenterProps extends Styled {
  userId: number;
}
