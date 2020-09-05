import { Injectable } from "@angular/core";
import { Otp } from "../models/otp";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { HttpHandlerService } from "./http-handler.service";
import { verifyOtpUrl } from "../models/baseURL";

@Injectable({
  providedIn: "root",
})
export class VerifyOtpService {
  constructor(
    private http: HttpClient,
    private httpHandler: HttpHandlerService
  ) {}

  postOtpRequest(otp: Otp) {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http
      .post<Otp>(verifyOtpUrl, otp, {
        headers: httpHeaders,
        observe: "response",
        responseType: "json",
      })
      .pipe(catchError(this.httpHandler.handleError));
  }
}
