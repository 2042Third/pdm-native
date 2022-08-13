import { NativeModules } from 'react-native';
const { PdmNativeCryptModule } = NativeModules;
interface PdmNativeCryptModuleInterface {
  echoer(a: string, callback: any): void;
}
export default PdmNativeCryptModule as PdmNativeCryptModuleInterface;
