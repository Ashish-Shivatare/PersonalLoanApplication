import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { getOtpUrl } from "../models/geturl";
import { HttpHandlerService } from "./http-handler.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GetOtpService {
  constructor(
    private http: HttpClient,
    private httpHandler: HttpHandlerService
  ) {}

  postOtpRequest(user: User) {
    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http
      .post<User>(getOtpUrl, user, {
        headers: httpHeaders,
        observe: "response",
        responseType: "json",
      })
      .pipe(catchError(this.httpHandler.handleError));
  }
}
