import { DataService } from "./data.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ProductService {
  private url = "/api/product";
  constructor(private data: DataService) {}

  findAllByIdUser(id: number): Observable<any> {
    return this.data.get(this.url + `/user/${id}`);
  }

  findById(id: number): Observable<any> {
    return this.data.get(this.url + `/${id}`);
  }

  save(product): Observable<any> {
    return this.data.post(this.url + "/", product);
  }

  delete(idProduct) {
    return this.data.delete(this.url + "/" + idProduct);
  }
}
