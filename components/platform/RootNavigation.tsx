import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function toggleDrawer(){
  if (navigationRef.isReady()) {
    navigationRef.toggleDrawer();
  }
}
export function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}