import { User } from "interface/User";

export interface Message {
  user: User;
  contents: string;
  createdAt: string;
}
