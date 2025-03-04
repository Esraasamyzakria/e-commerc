import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_url } from '../../custom-injection/api_url';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private httpClient:HttpClient, @Inject(api_url) private apipath:string) { }
  checkoutpayment(id:string,data:object):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress":data
      }
    )
  }
}
