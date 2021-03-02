import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationErrors } from './errors';

@Component({
  selector: 'v-message',
  template: `
    <div
      class="invalid-feedback"
      [style]="{ display: 'block' }"
      *ngIf="errorMessage !== null"
    >
      {{ errorMessage }}
    </div>
  `,
})
export class ValidationMessageComponent {
  @Input() control?: FormControl;
  @Input() submitted?: Boolean;
  constructor() {}

  get errorMessage() {
    if (this.control) {
      if (typeof this.control.errors === 'string') {
        return this.control.errors;
      }

      for (let propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          (this.control.touched || this.submitted)
        ) {
          const error = validationErrors[propertyName];
          return error ? error : propertyName;
        }
      }
    }

    return null;
  }
}
