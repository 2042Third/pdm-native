export class ChatStore {
  newChat: ChatMsg;
  messages: ChatMsg[];
}
export class ChatMsg {
  id: number;
  msg: string = null;
  sentTime: number = -1;
}
