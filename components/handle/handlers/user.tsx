import { NativeModules } from "react-native";
import { useSelector } from "react-redux";


export const getHash = async (a:string) => {
  const { PdmNativeCryptModule } = NativeModules;
  return PdmNativeCryptModule.getHash(a);
}
export const dec = async (upw: string, a: string) => {
  const { PdmNativeCryptModule } = NativeModules;
  // console.log(`dec called with ps: ${upw}`);
  try {
    const out: string = PdmNativeCryptModule.dec(upw, a);
    return out;
  }
  catch (e) {
    console.log(e);
    return null;
  }
}

/**
 * Same as getHash, but return a promise,
 * 
*/
export const makeHash = async (a: string) => {
  const { PdmNativeCryptModule } = NativeModules;
  // console.log(`dec called with ps: ${upw}`);
  try {
    const out: string = PdmNativeCryptModule.getHash( a);
    return out;
  }
  catch (e) {
    console.log(e);
    return null;
  }
}

export const enc = async (upw: string, plain: string) => {
  const { PdmNativeCryptModule } = NativeModules;
  // return PdmNativeCryptModule.enc(upw, plain, (a: string) => {
  //   return a;
  // });
  try {
    const out: string = PdmNativeCryptModule.enc(upw, plain);
    return out;
  }
  catch (e) {
    console.log(e);
    return null;
  }
}
