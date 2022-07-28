export interface IUser {
  email: string;
  name: string;
}

export interface IUsers extends IUser {
  userID: number
}

export interface IMessage {
  method: string;
  message: string;
  recipientID: number,
  senderID: number,
  date: string;
}