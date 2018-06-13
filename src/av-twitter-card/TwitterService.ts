import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TwitterService {

  twitData: TwitterData;

  constructor(public http: HttpClient) {

  }

  getTwitterData(twitURL: string): any {

    return this.http.get(twitURL)
      .subscribe((data: TwitterData) => {
        return data;
      });
      }
}
