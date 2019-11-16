import { Pipe, PipeTransform } from '@angular/core';

 import { HttpClient, HttpRequest } from '@angular/common/http';
 import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/switchMap';
 import { JwtService } from '../core/services';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private http: HttpClient, 
              private jwtService: JwtService) {}

  transform(url: string) {

    const token = this.jwtService.getToken(); 

    const headersConfig = { 
      'Content-Type': 'application/json', 
      'Accept': '' 
    }; 

    headersConfig['Authorization'] = `Token ${token}`; 
    const req = new HttpRequest('GET', url); 
    const request = req.clone({ setHeaders: headersConfig }); 
    return this.http.request(request)
  }

}

