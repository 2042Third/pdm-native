export class ChatStore {
  newChat: ChatMsg = new ChatMsg;
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
  statusInfo: string = "None";
  receiver:  string="";
  authdata?: string="";
  time: number=-1;
  update_time: number=-1;
  utime: string='';
  pdmSecurityVersion: string='';
  checker: string= "";
  ctime: string='';
  netStatus:string = 'none';
}


export class NoteHeadList{
  heads: NoteHead[] = [];
  netHash: string = '';
  netStatus: string = 'pending'; // pending/fulfilled/rejected
}

export class NoteHead{
  head: string = '';
  note_id: string = '';
  id: number=-1;
  time: number=-1;
  update_time: number=-1;
  utime: string = '';
  ctime: string = '';
  key:number=-1;
}

export class NotesMsg extends NoteHead{
  content:  string = '';
  email: string = '';
  // note_id: string = '';
  session: string = '';
  ntype: string = ''; // 0 update, 1 new, 2 heads, 3 retrieve
  sess: string = '';
  h: string = '';
  username: string = '';
  status: string = '';
  statusInfo: string = 'none';
  encry: string = "yes";
  hash: string = '';
  // pdm security version should be tracked always whenever there is an encryption
  // pdmSecurityVersion;
}

export class NotesHeaderInfo {
  updateInfo: string = '';
  updateTimeDistance: string = '';
}

export class UserEnter {
  upw: string = "";
  umail: string = "";
  upwServer: string = "";
  sess: string = "";
};

export class AppSettings{
  lastPageOpened: string = 'Notes';
};

export class EncrptedUserEnter{
  userEnter: string = '';
  dateTimeUpdated: number = -1;
};
