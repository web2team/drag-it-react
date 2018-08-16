import { User } from "interface/User";
import { GridLayoutProps } from "interface/GridLayout";
import { Styled } from "interface/global";

export interface ChatThread {
  id: number;
  users: [User];
}

export interface ChattingProps extends GridLayoutProps, Styled {
  chatThread: ChatThread;
}
