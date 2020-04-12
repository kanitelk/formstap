import { action, computed, observable, toJS } from "mobx";
import { createContext } from "react";
import config from "../config";
import { TForm, TFormEditor } from "../components/Form/types";
import { httpErrorHandler } from "../services/utils";
import { getFormForEditor } from "../services/editorAPI";

export enum EditorTabsEnum {
  fields = "fields",
  rewards = "rewards",
  settings = "settings"
}

class EditorStore {
  @observable isLoading: boolean = false;
  @observable form: TFormEditor | null = null;
  @observable newFieldActive: boolean = false;
  @observable editorTab: EditorTabsEnum = EditorTabsEnum.fields;

  @action async getForm(id: string) {
    try {
      this.isLoading = true;
      const form = await getFormForEditor(id);
      this.form = form;
      console.log(`Editor Form: `, toJS(this.form));
    } catch (error) {
      httpErrorHandler(error);
    } finally {
      this.isLoading = false;
    }
  }

  @action async updateCurrentForm() {
    this.getForm(this.form?._id!);
  }
}

export const EditorStoreContext = createContext(new EditorStore());
