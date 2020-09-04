import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { GetOtpService } from "../../services/get-otp.service";
import { VerifyOtpService } from "../../services/verify-otp.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @ViewChild("fform") feedbackFormDirective;

  user: User;
  userForm: FormGroup;
  userFullName: String;

  otpFieldHidden = true;
  otpLinkHidden = true;
  otpLinkDisabled = true;
  setAlert = false;
  counter = 0;

  formErrors = {
    city: "",
    panNumber: "",
    fullName: "",
    email: "",
    mobile: "",
    otp: "",
  };

  validationMessages = {
    city: {
      required: "City is required.",
    },
    panNumber: {
      required: "Pan number is required.",
      pattern: "Pan number must be in valid format.",
      maxlength: "Pan Number cannot be more than 10 characters long.",
    },
    fullName: {
      required: "Full Name is required.",
      maxlength: "Full Name cannot be more than 140 characters long.",
    },
    email: {
      required: "Email is required.",
      pattern: "Email must be in valid format.",
      maxlength: "Email cannot be more than 255 characters long.",
    },
    mobile: {
      required: "Mobile number is required.",
      pattern: "Mobile number must be in valid format.",
      maxlength: "Mobile number cannot be more than 10 character long.",
    },
    otp: {
      required: "OTP is required.",
      pattern: "OTP must be in NUMBER ONLY format",
      maxlength: "OTP cannot not be more than 4 characters long.",
    },
  };

  constructor(
    private fb: FormBuilder,
    private getOtpService: GetOtpService,
    private verifyOtpService: VerifyOtpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
    this.userForm.controls["otp"].disable();
  }

  ngOnInit() {}

  createForm(): void {
    this.userForm = this.fb.group({
      city: ["", [Validators.required]],
      panNumber: [
        "",
        [Validators.required, Validators.pattern, Validators.maxLength(10)],
      ],
      fullName: ["", [Validators.required, Validators.maxLength(140)]],
      email: [
        "",
        [Validators.required, Validators.pattern, Validators.maxLength(255)],
      ],
      mobile: [
        "",
        [Validators.required, Validators.pattern, Validators.maxLength(10)],
      ],
      otp: [
        "",
        [Validators.required, Validators.pattern, Validators.maxLength(4)],
      ],
    });

    this.userForm.valueChanges.subscribe((data) => {
      this.onValueChanged(data);
    });
    this.onValueChanged();
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
    let setTimerMinute = 10 * 1000;
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

// resetForm() {
//   this.userForm.reset({
//     city: "",
//     panNumber: "",
//     fullName: "",
//     email: "",
//     mobile: null,
//     otp: null,
//   });
//   this.feedbackFormDirective.resetForm();
//   this.user = null;
// }
