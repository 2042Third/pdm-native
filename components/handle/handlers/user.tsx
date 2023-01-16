import { NativeModules } from "react-native";
import { useSelector } from "react-redux";

const { PdmNativeCryptModule } = NativeModules;
export default PdmNativeCryptModule;

export const echoer = async (a:string) => {
  const { PdmNativeCryptModule } = NativeModules;
  return PdmNativeCryptModule.echoer(a);
}

export const getHash = async (a:string) => {
  const { PdmNativeCryptModule } = NativeModules;
  return PdmNativeCryptModule.getHash(a);
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
    return null;
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
    return null;
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
        const out: string = this.PdmNativeCryptModule.getHash(a);
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
        return null;
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
       return null;
     }
   }
  }

