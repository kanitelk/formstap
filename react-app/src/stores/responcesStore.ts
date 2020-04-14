import { action, observable, toJS } from "mobx";
import { createContext } from "react";

import { Answer, TFormEditor, Responce } from "../components/Form/types";
import { getAnswers, getFormForEditor } from "../services/editorAPI";
import { httpErrorHandler } from "../services/utils";

class ResponcesStore {
  @observable isLoading: boolean = false;
  @observable responces: Responce[] | null = null;
  @observable id: string | null = null;
  @observable form: TFormEditor | null = null;

  @action async getAnswers(id: string) {
    try {
      this.isLoading = true;
      this.id = id;
      this.responces = await getAnswers(id);
      this.form = await getFormForEditor(id);
      console.log(toJS(this.responces));
    } catch (error) {
      httpErrorHandler(error);
    } finally {
      this.isLoading = false;
    }
  }

  @action async updateCurrentAnswers() {
    this.getAnswers(this.id!);
  }

  @action clear() {
    this.responces = null;
    this.id = null;
    this.isLoading = false;
    this.form = null;
  }
}

export const ResponcesStoreContext = createContext(new ResponcesStore());
