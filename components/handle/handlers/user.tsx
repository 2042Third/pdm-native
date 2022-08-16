import { NativeModules } from "react-native";
import NetCalls from "../network/netCalls";

export default class User {
  tryMakeUser(umail:string,upw:string){
    console.log(`User start:${upw}`);
    const {PdmNativeCryptModule} = NativeModules;
    setTimeout(()=>{
      PdmNativeCryptModule.getHash(upw+upw, back => {
        console.log(`User maker:${back}`);
        NetCalls.signin(umail, back);
      });
    },50);
  }
}
