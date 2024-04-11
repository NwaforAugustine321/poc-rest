export interface IOnEvent {
  event: string;
  handler: (...payload: any[]) => Promise<void> | void;
}

export interface IJoinRoom {
  room: string;
  userId: string;
  userType: string;
}
