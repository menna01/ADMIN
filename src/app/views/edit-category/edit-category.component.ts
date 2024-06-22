import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  ID: any;
  categoryName = '';

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
      },
      error(err) {
        console.log(err);
      },
    });
  }

  editCategory(category: any) {
    let editedCategory = {
      categoryId: this.ID,
      categoryName: category,
    };
    this.myService.UpdateCategoryById(this.ID, editedCategory).subscribe(() => {
      this.router.navigate(['/category']);
    });
  }

  editCategoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.minLength(3)]),
  });
}
