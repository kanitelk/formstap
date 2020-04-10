import { action, computed, observable, toJS} from "mobx";
import { createContext } from "react";
import config from "../config";
import { TForm, Answer } from "../components/Form/types";
import { getForm } from "../services/editorAPI";
import { httpErrorHandler } from "../services/utils";

class FormStore {
  @observable isLoading: boolean = false;
  @observable form: TForm | null = null;
  @observable current_step: number = 0;
  @observable answers: Answer[] = [];

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

  @action setAnswer(value: any) {
    let answer: Answer = {
      field_id: this.form!.fields[this.current_step]._id!,
      type: this.form!.fields[this.current_step].type,
      answer: value
    };
    this.answers.push(answer);
    if (this.current_step === (this.form?.fields!.length - 1)) {
      this.submit()
    } else {
      this.current_step++;
    }
  }

  @action async submit() {
    console.log(toJS(this.answers));
  }
}

export const FormStoreContext = createContext(new FormStore());
