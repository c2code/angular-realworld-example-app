import { Pipe, PipeTransform } from '@angular/core';

 import { HttpClient, HttpRequest } from '@angular/common/http';
 import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/switchMap';
 import { JwtService } from '../core/services';
import { Observable } from 'rxjs';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, 
              private jwtService: JwtService) {}

  transform(url: string) {

    const token = this.jwtService.getToken(); 

    return new Observable<string>((observer) => {
      const {next, error} = observer;
      this.http.get(url, {
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
        responseType: 'blob'
      }).subscribe(response => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = function() {
          observer.next(reader.result as string);
        };
      });

      return {unsubscribe() {  }};
    });

  }

}
