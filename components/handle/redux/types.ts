export class ChatStore {
  newChat: ChatMsg;
  messages: ChatMsg[];
}
export class ChatMsg {
  msg: string = null;
  sentTime: number = -1;

}
