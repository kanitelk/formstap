import { action, computed, observable, toJS } from "mobx";
import { createContext } from "react";
import config from "../config";
import { TForm, Answer, RewardResponce } from "../components/Form/types";
import { httpErrorHandler } from "../services/utils";
import { getForm, sendAnswers, getFingerprint, getIPdata } from "../services/formAPI";

class FormStore {
  @observable isLoading: boolean = false;
  @observable form: TForm | null = null;
  @observable current_step: number = 0;
  @observable answers: Answer[] = [];
  @observable formView: boolean = false;
  @observable isSubmitted: boolean = false;
  @observable reward: RewardResponce | null = null;
  @observable isSubmittedError: boolean = false;
  @observable isSubmitting: boolean = false;

  @action async getForm(id: string) {
    try {
      this.isLoading = true;
      const form = await getForm(id);
      this.form = form;
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
      answer: value,
    };
    this.answers.push(answer);
    if (this.current_step === this.form?.fields!.length - 1) {
      this.submit();
    } else {
      this.current_step++;
    }
  }

  @action async submit() {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    try {
      const user_data = {
        fingerprint: getFingerprint(),
        ip_data: await getIPdata()
      }
      this.reward = await sendAnswers(this.form?._id!, this.answers, user_data);
    } catch (error) {
      httpErrorHandler(error);
      this.isSubmittedError = true;
    } finally {
      this.isSubmitted = true;
      this.isSubmitting = false;
    }
  }

  @action async updateCurrentForm() {
    this.getForm(this.form?._id!);
  }

  @action clear() {
    this.form = null;
    this.current_step = 0;
    this.answers = [];
    this.isSubmitted = false;
    this.reward = null;
    this.isSubmittedError = false;
  }
}

export const FormStoreContext = createContext(new FormStore());
