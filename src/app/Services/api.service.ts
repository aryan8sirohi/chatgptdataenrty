import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apiUrl: string = environment.apiUrl;
    constructor(
        private httpClient: HttpClient,
    ) { }

    public Get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(this.apiUrl + url);
    }

    public Post<T>(url: string, Data: any, option?: any): Observable<T> {
        return this.httpClient.post<T>(this.apiUrl + url, Data);
    }

    public PostMessage(url: string, Data: object, httpOptions: any): Observable<any> {
        return this.httpClient.post(this.apiUrl, Data, { headers: httpOptions.headers });
    }
}

