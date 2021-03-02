import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export function RequiredIf(other: string, otherValue: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {


    const matchingControlValue = control.parent
      ? control.parent.value[other]
      : '';
    if (
      !control.value &&
      typeof otherValue === 'string' &&
      matchingControlValue === otherValue
    ) {
      console.log("1")
      return { required: true };
    } else if (
      !control.value &&
      typeof otherValue === 'object' &&
      otherValue.constructor.name === 'Array' &&
      otherValue.includes(matchingControlValue)
    ) {
      console.log("1")
      return { required: true };
    } else {
      console.log("3")
      return null;
    }
  };
}
