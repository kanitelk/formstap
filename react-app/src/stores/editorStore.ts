import { action, computed, observable } from "mobx";
import { createContext } from "react";
import config from "../config";
import { TForm } from "../components/Form/types";
import { httpErrorHandler } from "../services/utils";
import { getForm } from "../services/editorAPI";

class EditorStore {
  @observable isLoading: boolean = false;
  @observable form: TForm | null = null;
}

export const EditorStoreContext = createContext(new EditorStore());
