import { NativeModules } from "react-native";

export async function tryMakeUser (umail:string,upw:string, back:any) {
  const {PdmNativeCryptModule} = NativeModules;
  // const callBack = async (res:string)=>{
  //   console.log(`async callBack returning: ${res}`);
  //   return res;
  // };
  PdmNativeCryptModule.getHash(upw + upw, back);
  // PdmNativeCryptModule.getHash(upw + upw, callBack);
  // const res = await callBack;
  // return res;
}
