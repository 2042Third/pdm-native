import { NativeModules } from "react-native";
import { useSelector } from "react-redux";
import { useRef } from "react";

const { PdmNativeCryptModule } = NativeModules;
export default PdmNativeCryptModule;

export function useCancelToken() {
  const token = useRef({ cancelled: true });
  const cancel = () => token.current.cancelled = true;
  return [token.current, cancel];
}


export const echoer = async (a:string) => {
  const { PdmNativeCryptModule } = NativeModules;
  return PdmNativeCryptModule.echoer(a);
}

export const getHash = async (a:string) => {
  const { PdmNativeCryptModule } = NativeModules;
  return (await PdmNativeCryptModule.getHash(a)).toString();
}

/**
 * Same as getHash, but return a promise,
 *
 */
export const makeHash = async (a: string) => {
  const { PdmNativeCryptModule } = NativeModules;
  const out: string = PdmNativeCryptModule.getHash( a);
  return out;
}

export const dec = async (upw: string, a: string) => {
  const { PdmNativeCryptModule } = NativeModules;
  // console.log(`dec called with ps: ${upw}`);
  try {
    const out: string = (await PdmNativeCryptModule.dec(upw, a)).toString();
    // console.log(`Dec requested => ${out}\n \ttype: ${typeof out}`);
    return out;
  }
  catch (e) {
    console.log(e);
    return '';
  }
}

export const enc = async (upw: string, plain: string) => {
  const { PdmNativeCryptModule } = NativeModules;
  try {
    const out: string = (await PdmNativeCryptModule.enc(upw, plain)).toString();
    // console.log(`Enc requested => ${out}\n \ttype: ${typeof out}`);
    return out;
  }
  catch (e) {
    console.log(e);
    return '';
  }
}

 export class cryptModule {
    private PdmNativeCryptModule:any;
    constructor () {
      let { PdmNativeCryptModule } = NativeModules;
      this.PdmNativeCryptModule = PdmNativeCryptModule;
    }

    async echoer (a:string){
      try{
        const out: string = this.PdmNativeCryptModule.echoer(a);
        return out;
      }
      catch (e) {
        console.log(e);
        return null;
      }
    }


    async getHash(a:string){
      try {
        const out: string =(await this.PdmNativeCryptModule.getHash(a)).toString();
        return out;
      }
      catch (e) {
        console.log(e);
        return null;
      }
    }

    async enc(upw: string, plain: string) {
      try {
        const out: string = (await this.PdmNativeCryptModule.enc(upw, plain)).toString();
        // console.log(`Enc requested => ${out}\n \ttype: ${typeof out}`);
        return out;
      }
      catch (e) {
        console.log(e);
        return '';
      }
    }

   async dec (upw: string, a: string) {
     try {
       const out: string = (await this.PdmNativeCryptModule.dec(upw, a)).toString();
       // console.log(`Dec requested => ${out}\n \ttype: ${typeof out}`);
       return out;
     }
     catch (e) {
       console.log(e);
       return '';
     }
   }
  }

