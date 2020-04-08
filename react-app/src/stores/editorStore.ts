import { action, computed, observable } from "mobx";
import { createContext } from "react";
import config from "../config";

class EditorStore {
  @observable form_id: string | null = null;
}

export const EditorStoreContext = createContext(new EditorStore());
