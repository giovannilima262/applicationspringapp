import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};


@Injectable()
export class DataService {

    apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    get(url): Observable<any> {
        return this.httpClient.get<JSON>(this.apiUrl + url, httpOptions);
    }

    post(url, body): Observable<any> {
        return this.httpClient.post<JSON>(this.apiUrl + url, body, httpOptions);
    }

    put(url, product): Observable<any> {
        return this.httpClient.put(url, JSON.stringify(product), httpOptions);
    }

    delete(url): Observable<any> {
        return this.httpClient.delete<any>(this.apiUrl + url, httpOptions);
    }

}
