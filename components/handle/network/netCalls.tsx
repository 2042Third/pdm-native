import Net from "./net";

export default class NetCalls {
  private static signinURL: string='https://pdm.pw/auth/signin';
  static async signin(umail:any, upw:any){
    let httpOut= await Net.post(this.signinURL, JSON.stringify({ "umail": umail, "upw": upw }));
    // const data = await httpOut.json();
    // console.log(data);
    httpOut.then(data=>{
      console.log(`httpOut: ${data}`);
    });
  }
}
