import { Component, OnInit } from '@angular/core';
import { RequiredIf } from '../../_helpers/required-if.validator';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard[class="h-100 w-100"]',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group(
      {
        type: new FormControl('', [Validators.required]),
        from: new FormControl('', [Validators.required]),
        to: new FormControl('', [Validators.required]),
        departureDate: new FormControl('', [Validators.required]),
        returnDate: new FormControl(''),
        isBusiness: new FormControl('', [Validators.required]),
      },
      {
        validators: Validators.compose([
          RequiredIf('returnDate', 'type', 'round_trip'),
        ]),
      }
    );
    // console.log('this.searchForm', this.searchForm);
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('this.searchForm', this.searchForm);
    if (this.searchForm.invalid) return;
    if (this.searchForm.controls.isBusiness.value === 'y') {
      this.router.navigate(['/order/premium-order'], {
        queryParams: this.searchForm.value,
      });
    } else {
      // this.router.navigateByUrl('/order/normal-order');
      this.router.navigate(['/order/normal-order'], {
        queryParams: this.searchForm.value,
      });
    }
    // if
    // console.log('this', this.searchForm);
  }
}
