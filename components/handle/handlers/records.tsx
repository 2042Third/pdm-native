import { useAppDispatch } from "../redux/hooks"
import { changePageOpened } from "../redux/reducers/settings/appSettings";

export const recordPageChange = (page:string) => {
  const dispatch = useAppDispatch();
  dispatch(changePageOpened(page));
  console.log("Page change complete => "+page);
}

