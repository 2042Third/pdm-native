import { createSelector } from "reselect";
import React, { useCallback, useEffect } from "react";
import { NoteHead, NotesMenu } from "../../types";
import { createStoreHook, shallowEqual, useSelector } from "react-redux";
import { useAppSelector } from "../hooks";
// @ts-ignore
import get from "lodash/get";
// @ts-ignore
import orderBy from "lodash/orderBy";
import { NoteSortingTypes } from "../reducers/notes/notesMenuReducer";
import { selectNoteByKey } from "../reducers/notes/notesHeadsReducer";
import { RootState } from "../store";
import notesMenu from "../../../views/Notes/NotesMenu";



