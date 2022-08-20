import { NativeModules } from "react-native";

export async function tryMakeUser (umail:string,upw:string, back:any) {
  const {PdmNativeCryptModule} = NativeModules;
  PdmNativeCryptModule.getHash(upw + upw, back);
}
