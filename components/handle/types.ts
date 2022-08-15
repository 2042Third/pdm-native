export class ChatStore {
  newChat:  ChatMsg;
  messages:  ChatMsg[]=[];
}
export class ChatMsg {
  id: number=-1;
  msg: string = '';
  sentTime:  number = -1;
}

export class UserInfoGeneral{
  msg: string="";
  username: string="";
  msgh: string="";
  email: string="";
  val: string="";
  type:  string="";
  h: string ="";
  sender:  string="";
  sess: string = '';
  status: string = "fail";
  receiver:  string="";
  authdata?: string="";
  time: number=-1;
  update_time: number=-1;
  utime: string='';
  pdmSecurityVersion: string='';
  checker: string= "";
  ctime: string='';
}

