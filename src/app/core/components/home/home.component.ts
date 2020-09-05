import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { GetOtpService } from "../../services/get-otp.service";
import { VerifyOtpService } from "../../services/verify-otp.service";
import { Router } from "@angular/router";
import { formError } from "../../models/formErrors";
import { validationMsg, validatorFields } from "../../models/validations";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  userFullName: String;

  otpFieldHidden = true;
  otpLinkHidden = true;
  otpLinkDisabled = true;
  setAlert = false;
  counter = 0;

  formErrors = formError;
  validationMessages = validationMsg;
  validatonFields = validatorFields;

  constructor(
    private fb: FormBuilder,
    private getOtpService: GetOtpService,
    private verifyOtpService: VerifyOtpService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm(): void {
    this.userForm = this.fb.group(this.validatonFields);
    this.userForm.controls["otp"].disable();
    this.userForm.valueChanges.subscribe((data) => {
      this.onValueChanged(data);
    });
  }

  clearOTPValidators() {
    this.userForm.controls["otp"].clearValidators();
  }

  callOtp() {
    this.clearOTPValidators();
    const checkUser = this.userForm.valid;
    if (checkUser) {
      this.userFullName = this.userForm.value.fullName;
      this.getOtpService
        .postOtpRequest(this.userForm.value)
        .subscribe((response) => {
          if (response.ok) {
            this.setOTPValidator();
            this.callOtpFunction();
          }
        });
    }
  }

  callOtpFunction() {
    let setTimerMinute = 3 * 10 * 1000;
    let setTimerHour = 60 * 60 * 1000;

    this.userForm.controls["otp"].enable();
    this.otpFieldHidden = false;
    this.otpLinkHidden = false;

    if (this.counter < 2) {
      setTimeout(() => {
        this.otpLinkDisabled = false;
      }, setTimerMinute);

      this.otpLinkDisabled = true;
      this.counter = this.counter + 1;
    } else {
      this.setAlert = true;
      this.otpLinkDisabled = true;

      setTimeout(() => {
        this.otpLinkHidden = false;
        this.otpLinkDisabled = false;
      }, setTimerHour);

      this.counter = 0;
    }
  }

  setOTPValidator() {
    this.userForm.controls["otp"].setValidators([
      Validators.required,
      Validators.maxLength(4),
      Validators.required,
    ]);
  }

  goToSuccessPage() {
    this.router.navigate(["/success"], {
      queryParams: { userName: this.userFullName },
    });
  }

  verifyOtp() {
    this.verifyOtpService
      .postOtpRequest(this.userForm.value)
      .subscribe((response) => {
        if (response.ok) {
          this.goToSuccessPage();
        }
      });
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }
}
