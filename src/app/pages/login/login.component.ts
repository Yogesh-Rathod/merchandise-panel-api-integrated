import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit {

  public loginForm: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public isHidden: boolean = true;
  public isError: boolean = false;
  errorMessage: string = '';

  constructor(fb: FormBuilder, public router: Router) {
    this.loginForm = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }


    ngOnInit() {
        window.location.href = `http://localhost:4300`;
    }


    public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.isHidden = false;
      this.router.navigate(['/']).then(() => {
              this.isHidden = false;
      });
    }
  }
}
