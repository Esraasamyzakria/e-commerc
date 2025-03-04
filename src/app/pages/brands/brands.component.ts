import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { Icategoy } from '../../shared/interfaces/icategoy';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandService } from '../../core/services/brand/brand.service';
import { Ibrand } from '../../shared/interfaces/ibrand';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-brands',
  imports: [NgIf],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
brandid: any;
brandsdetails:Ibrand={}as Ibrand;
brands:Ibrand[]=[];
isModalOpen: boolean = false;
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly brandService=inject(BrandService);
ngOnInit(): void {
  this.flowbiteService.loadFlowbite(flowbite => {
    // Your custom code here
    console.log('Flowbite loaded', flowbite);
  });
  this.getallbrand();
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
      this.brandid=res.get("id");
      console.log(this.brandid)
      this.brandService.getspecificbrand(this.brandid).subscribe({
  next:(res)=>{
  console.log(res)
  this.brandsdetails=res.data
        },
      })

    },
    error:(err)=>{

    },
  })

}
getallbrand():void{
  this.brandService.getallbrand().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.brands=res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

openModal(brand: Ibrand): void {
  this.brandsdetails = brand;
  this.isModalOpen = true;
}

// ✅ إغلاق المودال
closeModal(): void {
  this.isModalOpen = false;
}

}
