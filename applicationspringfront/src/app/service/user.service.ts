import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  private url = "/api/user";
  constructor(private data: DataService) {}

  login(user): Observable<any> {
    return this.data.post(this.url + "/login", user);
  }

  save(user): Observable<any> {
    return this.data.post(this.url + "/", user);
  }
}
