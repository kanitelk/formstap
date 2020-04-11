import { action, computed, observable, toJS } from "mobx";
import { createContext } from "react";
import config from "../config";
import { TForm } from "../components/Form/types";
import { httpErrorHandler } from "../services/utils";
import { getForm } from "../services/editorAPI";

class EditorStore {
  @observable isLoading: boolean = false;
  @observable form: TForm | null = null;

  @action async getForm(id: string) {
    try {
      this.isLoading = true;
      const form = await getForm(id);
      this.form = form;
      console.log(toJS(this.form));
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
