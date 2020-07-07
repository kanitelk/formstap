import { action, observable, toJS, computed } from "mobx";
import { createContext } from "react";

import { Answer, TFormEditor, Responce } from "../components/Form/types";
import { getAnswers, getFormForEditor } from "../services/editorAPI";
import { httpErrorHandler } from "../services/utils";

class ResponcesStore {
  @observable isLoading: boolean = false;
  @observable responces: Responce[] | null = null;
  @observable id: string | null = null;
  @observable form: TFormEditor | null = null;
  @observable showBlank: boolean = true;

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

  @computed get dataWithoutBlanks(): Responce[] | undefined {
      return this.responces?.filter(item => {
        let existNotEmpty = false;
        for (let i = 0; i< item.answers.length; i++) {
          if (item.answers[i].answer !== '') {
            existNotEmpty = true
          }
        }
        if (existNotEmpty) return true;
        return false
      })
  }

  @action clear() {
    this.responces = null;
    this.id = null;
    this.isLoading = false;
    this.form = null;
  }
}

export const ResponcesStoreContext = createContext(new ResponcesStore());
