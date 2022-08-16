import Net from "./net";

export default class NetCalls {
  private static signinURL: string='https://pdm.pw/auth/signin';
  static async signin(umail:any, upw:any){
    Net.post(this.signinURL, JSON.stringify({ "umail": umail, "upw": upw }))
      .then(function(res){
        return res.json();
      })
      .then(function(data){
          console.log(`http return1: ${data.umail}`)
          console.log(`http return2: ${JSON.stringify(data)}`)
          return data;
        });
  }
}
