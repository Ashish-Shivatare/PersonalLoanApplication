import { Validators } from "@angular/forms";

export const validationMsg = {
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

export const validatorFields = {
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
  otp: ["", [Validators.required, Validators.pattern, Validators.maxLength(4)]],
};
