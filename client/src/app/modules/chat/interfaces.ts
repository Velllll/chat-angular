export interface IUser {
  email: string;
  name: string;
  photoPath?: string;
}

export interface IUsers extends IUser {
  userID: number;
}

export interface IMessage {
  method: string;
  message: string;
  recipientID: number;
  senderID: number;
  date: string;
}

export interface IChats {
  chatID: number;
  senderID: number;
  recipientID: number;
}

export interface IPhotos {
  photoID: number;
  userID: number;
  photoPath: string
}