import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
FormBuilder

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})


export class EditCategoryComponent implements OnInit {

  ID: any;
  categoryName = '';
  description:any;
  Image:any;

  constructor(
    myActivated: ActivatedRoute,
    private myService: AdminService,
    private router: Router
  ) {
    this.ID = myActivated.snapshot.params['_id'];
  }

  ngOnInit(): void {
    this.myService.getCategoryByID(this.ID).subscribe({
      next: (res: any) => {
        // console.log(res)
        this.categoryName = res.categoryName;
        this.description=res.description;
        this.Image=res.categoryImageURL;
        localStorage.setItem('catImage',this.Image)
      },
      error(err) {
        console.log(err);
      },
    });
  }

  editCategory(categoryname: any,desc:any) {
    let editedCategory = {
      categoryId: this.ID,
      categoryName: categoryname,
      description:desc,
      categoryImageURL:this.Image
    };
    this.myService.UpdateCategoryById(this.ID, editedCategory).subscribe(() => {
      this.router.navigate(['/category']);
    });
  }

  editCategoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.minLength(3)]),
  });

























  // //editProductForm: FormGroup;
  // ID = 1;
  // Name = '';
  // Description = '';
  // Category = '';
  // Image: any;
  // category: any;
  // changePhoto = false;
  // choosen = false;
  // submitted = false;
  // image: any;
  // editProductForm: FormGroup;
  // categories: any[]=[];

  // constructor(
  //   public fb: FormBuilder,
  //   myActivated: ActivatedRoute,
  //   private myService: AdminService,
  //   private router: Router
  // ) {
  //   this.ID = myActivated.snapshot.params['_id'];
  //   this.editProductForm = this.fb.group({
  //     name: new FormControl('Name', [
  
  //     ]),
     
  //     description: [''],
  //     productImage: new FormControl('', [Validators.required]),
  //   });
  // }
  // ngOnInit(): void {
  //   this.myService.getCategoryByID(this.ID).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       // console.log(res.inStock)
  //       this.category = res;
  //       this.Name=res.categoryName;
  //       this.Description = res.description;
  //       this.Image = res.categoryImageURL;

  //       localStorage.setItem('categoryImageURL',this.Name)
  //     },
  //     error(err) {
  //       console.log(err);
  //     },
  //   });

  //   // this.myService.getCategories().subscribe({
  //   //   next: (res: any) => {
  //   //     // console.log(res)
  //   //     this.categories = res;
  //   //     console.log(this.categories);
  //   //   },
  //   //   error(err) {
  //   //     console.log(err);
  //   //   },
  //   // });
  //   // this.getSelectedCateory(event);
  // }
 
  // Edit(
  //   name: any,  
  //   description: any,
  // ) {
  //   // Construct the updated product object
  //   let product = {
  //     productId: this.ID, // Assuming this.ID is defined somewhere
  //     name,
     
  //     description,
  //   };
  
  //   // Set 'name' to local storage - Verify if this is the intended action
  //   localStorage.setItem("name", product.name);
  //   let myid :any=this.ID;
  //   localStorage.setItem("myId", myid);
  
  //   // Call the service method to update the product
  //   this.myService.UpdateCategoryById(myid, {categoryName:name,description:description}).subscribe(
  //     () => {
  //       // Navigate to the products page after a successful update
  //       this.router.navigate(['/products']);
  //     },
  //     error => {
  //       // Handle any errors here
  //       console.error('Error updating product:', error);
  //       localStorage.setItem('error',"Error updating product")
  //       // Optionally, you can add user-friendly error handling or display messages
  //       // Example: this.errorMessage = 'Failed to update product. Please try again.';
  //     }
  //   );
  // }
 

  // // Edit(
  // //   name: any,
  // //   price: any,
  // //   sale: any,
  // //   quantity: any,
  // //   description: any,
  // //   category: any
  // // ) {

  // //   //  categoryName = this.categories.find((obj:any) => obj.categoryName == this.Category)?.categoryId;
  // //   let product = {
  // //     productId: this.ID,
  // //     name,
  // //     price,
  // //     sale,
  // //     quantity,
  // //     description,
  // //     categoryId: category,
  // //   };
  // //   localStorage.setItem("name",product.name)
  // //   // this.myService.UpdateProductByID(this.ID, product).subscribe(() => {
  // //   //   this.router.navigate(['/products']);
  // //   // });
  // //   this.myService.UpdateProductByID(this.ID, product).subscribe(
  // //         () => {
  // //           // Navigate to the products page after a successful update
  // //           this.router.navigate(['/products']);
  // //         },
  // //         error => {
  // //           // Handle any errors here
  // //           console.error('Error updating product:', error);
  // //         }
  // //       );
  // //   //  console.log(this.Category);
  // // }
  // // Edit(
  // //   name: any,
  // //   price: any,
  // //   sale: any,
  // //   quantity: any,
  // //   description: any,
  // //   category: any
  // // ) {
  // //   // Ensure that 'category' is an ID and doesn't need to be looked up again
  // //   let product = {
  // //     productId: this.ID,
  // //     name,
  // //     price,
  // //     sale,
  // //     quantity,
  // //     description,
  // //     categoryId: category, // Directly use the categoryId from the selected option
  // //   };
  
  // //   // Call the service to update the product by ID
  // //   this.myService.UpdateProductByID(this.ID, product).subscribe(
  // //     () => {
  // //       // Navigate to the products page after a successful update
  // //       this.router.navigate(['/products']);
  // //     },
  // //     error => {
  // //       // Handle any errors here
  // //       console.error('Error updating product:', error);
  // //     }
  // //   );
  // // }
  // openFile() {
  //   document.getElementById('input_file')!.click();
  // }
  // fileChoosen(event: any) {
  //   if (event.target.value) {
  //     this.image = <File>event.target.files[0];
  //     this.choosen = true;
  //     this.submitPhoto();
  //     // document.getElementById('route')!.click();
  //   }
  // }

  // submitPhoto() {
  //   let fd = new FormData();
  //   this.submitted = true;
  //   if (this.image) {
  //     fd.append('Image', this.image, this.image.name);
  //     this.myService.UpdateCategoryImage(fd).subscribe(() => {
  //       location.reload();
  //     });
  //   }
  //   console.log(this.image.name);
  // }

  // // getSelectedCateory(event: any) {
  // //   if (event.target.value) {
  // //     this.editProductForm.get('category')!.setValue(event.target.value);
  // //   } else {
  // //     this.editProductForm.get('category')!.setValue(this.Category);
  // //   }

  // //   console.log(this.editProductForm);
  // // }

  // // getStock(event: any) {
  // //   this.editProductForm.get('inStock')!.setValue(event.target.value);
  // //   console.log(this.editProductForm);
  // // }

  // // onSubmit() {
  // //   if (this.editProductForm.invalid) return;
  // // }
  // // get nameValid() {
  // //   return this.editProductForm.controls['name'].valid;
  // // }

  // // get priceValid() {
  // //   return this.editProductForm.controls['price'].valid;
  // // }
  // // get quantityValid() {
  // //   return this.editProductForm.controls['quantity'].valid;
  // // }
  // // get categoryValid() {
  // //   return this.editProductForm.controls['category'].valid;
  // // }

  // // get imageValid() {
  // //   return this.editProductForm.controls['productImage'].valid;
  // // }
}

