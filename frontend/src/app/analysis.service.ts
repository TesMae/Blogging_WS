import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  searchArticle(url) {
    return this.http.post(`${this.uri}/api/search`, url);
  }
}
