import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

export function RequiredIf(
  name: string,
  other: string,
  otherValue: any
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // control.get()
    // console.log("control", control)
    const elValue = control.get(name)?.value;
    const matchingControlValue = control.get(other)?.value;
    if (
      !elValue &&
      typeof otherValue === 'string' &&
      matchingControlValue === otherValue
    ) {
      // console.log('1');
      control.get(name)?.setErrors({ required: true } )
      return { [name]: { required: true } };
    } else if (
      !elValue &&
      typeof otherValue === 'object' &&
      otherValue.constructor.name === 'Array' &&
      otherValue.includes(matchingControlValue)
    ) {
      // console.log('1');
      control.get(name)?.setErrors({ required: true } )
      return { [name]: { required: true } };
    } else {
      // console.log('3');
      control.get(name)?.setErrors(null )
      return null;
    }
  };
}
