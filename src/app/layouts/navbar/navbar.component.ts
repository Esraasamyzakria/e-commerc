import { Component, inject, input, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService ,private authService:AuthService ,private cartService:CartService){}
  cartnumber!:number
//  private readonly authService = inject(AuthService)
//  private readonly cartService = inject(CartService)
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }

  islogin=input<boolean>(true)
  logout():void{
this.authService.logout()
this.cartService.cartnumber.subscribe({
  next:(res)=>{
this.cartnumber=res
console.log(this.cartnumber=res)
  }
})
  }

}
