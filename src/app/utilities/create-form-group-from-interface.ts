import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export function createFormGroupFromInterface(formBuilder: FormBuilder, model: object): FormGroup {
    const formGroup = formBuilder.group({});
    Object.keys(model).forEach(key => {
      formGroup.addControl(key, formBuilder.control('', Validators.required));
    });
    return formGroup;
  }