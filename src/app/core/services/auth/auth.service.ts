import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { api_url } from '../../custom-injection/api_url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userdata:any

  constructor( private httpClient:HttpClient , @Inject(api_url) private apipath:string) { }
  private readonly router= inject(Router)


  sendregesterform(data:object):Observable<any>{
   return  this.httpClient.post(this.apipath+ `/auth/signup`,data)
  }
  sendloginform(data:object):Observable<any>{
    return  this.httpClient.post(this.apipath+ `/auth/signin`,data)
   }

   getuserdata():void{
    this.userdata = jwtDecode(localStorage.getItem("token")!);
    console.log(this.userdata)

   }
   logout():void{
    localStorage.removeItem("token");
    this.userdata=null;
    this.router.navigate(['/login'])

   }

   setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(this.apipath+`/auth/forgotPasswords`,data)
   }
   setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(this.apipath+`/auth/verifyResetCode`,data)
   }
   setpasswordVerify(data:object):Observable<any>{
    return this.httpClient.put(this.apipath+`/auth/resetPassword`,data)
   }
}
