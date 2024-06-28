import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  productForm:FormGroup = new FormGroup({
    // images:new FormControl(null,[Validators.required])
    image:new FormControl(null,[Validators.required])



  })


  categoryName: any;
  categoryImageURL:any;
  description:any;
  constructor(public fb: FormBuilder, public myService: AdminService) {
    this.addCategoryForm = this.fb.group({
      categoryName: new FormControl('categoryName', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description:new FormControl('description',[
        Validators.required


      ]),
      categoryImageURL: new FormControl('categoryImageURL', [
        Validators.required
        // Validators.minLength(3),
      ]),
      
      // categoryImageURL:new FormControl('categoryImageURL',[
      //   Validators.required
      // ])

    });
  }
  categories: any;
  //Calling Api [ngOnInit]
  ngOnInit(): void {
    this.myService.getCategories().subscribe({
      next: (res: any) => {
        console.log(res)
        this.categories = res;
        console.log(this.categories);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  delete(id: any) {
    var res = confirm('Do you want to delete this category?');
    if (res) {
      this.myService.deleteCategory(id).subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  // uploadFile(event: any) {
  //   const file = (event.target as HTMLInputElement).files![0];
  //   this.addCategoryForm.patchValue({
  //     categoryImageURL: file,
  //   });
  //   this.addCategoryForm.get('categoryImageURL')!.updateValueAndValidity();
  // }
  // s











 


myreponse:any;
myreponse2:any;


  submitAddForm(productForm:FormGroup){
    // this.isloadind=true;

const formData = new FormData();



const fileInput=<HTMLInputElement>document.getElementById('fileInput');
if(fileInput.files && fileInput.files.length>0){
formData.append('image',fileInput.files[0]);

}

this.myService.addimage(formData).subscribe({
next: (response) => {
  
console.log(response);
this.myreponse=response;
this.myreponse2=this.myreponse.imageUrl;
localStorage.setItem('message',this.myreponse2)
},
error: (e) => {
  console.log(e);
}


});



  



}


addCategory() {
  
  let url=localStorage.getItem('message');
  let newCategory = { categoryName: this.categoryName ,description:this.description,categoryImageURL:url};
  localStorage.setItem('description',this.description)
  this.myService.addCategory(newCategory).subscribe(
    () => {
      location.reload();
      
    },
    (error) => {
      console.log(error);
    }
    
  );
  
  
}


}
