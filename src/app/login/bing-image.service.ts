import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../domain/entities';

@Injectable({
  providedIn: 'root'
})
export class BingImageService {

  imageUrl: string;
  headers = new HttpHeaders({'Content-Type': 'application/json', 'Ocp-Apim-Subsciption-Key': 'enter-your-api-key-here'});
  constructor(private http: HttpClient) {
    const q = ' 北极 + 墙纸';
    const baseUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search';
    this.imageUrl = baseUrl + '?q=${q}&count=5&mkt-zh-CN&imageType=Photo&size=Large';
  }

  getImageUrl(): Observable<Image[]> {
    return this.http.get<Image[]>(this.imageUrl, {headers: this.headers});
  }
}
