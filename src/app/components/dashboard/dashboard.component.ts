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
        from: new FormControl('', [Validators.required]),
        to: new FormControl('', [Validators.required]),
        departureDate: new FormControl('', [Validators.required]),
        returnDate: new FormControl('', RequiredIf('type', 'round_trip')),
        type: new FormControl('', [Validators.required]),
        isBusiness: new FormControl('', [Validators.required]),
      }
    );
    // console.log('this.searchForm', this.searchForm);
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.searchForm.invalid) return;
    if (this.searchForm.controls.isBusiness.value === 'y') {
      this.router.navigateByUrl('/order/premium-order');
    } else {
      this.router.navigateByUrl('/order/normal-order');
    }
    // if
    // console.log('this', this.searchForm);
  }
}
