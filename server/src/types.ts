export interface User {
  id: string;
  login: string;
  password: string;
  friendsList: string[];
}

export interface Todo {
  id: string;
  todoText: string;
  isCompleted: boolean;
  creatorId: string;
}
