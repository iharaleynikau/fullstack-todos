import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

export interface Todo {
  id: string;
  creatorId: string;
  todoText: string;
  isCompleted: boolean;
}

export interface User {
  id: string;
  login: string;
  friendsList: string[];
}
