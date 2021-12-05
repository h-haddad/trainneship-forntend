import { Component, OnInit } from '@angular/core';
import {CatalogueService} from "../../services/catalogue.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  categories;
  mode = 'list';
  currentCategory;

  constructor(private catalogueService: CatalogueService,
              private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.onGetAllCategories();
  }

  onGetAllCategories() {
    this.categoryService.getAllCategories()
      .subscribe({
        next: (data) => {
          this.categories = data
        },
        error: (error) => console.error(error)
      })
  }

  onDeleteCategory(category) {
    let confirmDelete = confirm("Are you sure about deleting this category?");
    if (!confirmDelete) {
      return;
    }
    this.catalogueService.deleteResource(category._links.self.href)
      .subscribe({
        next: (data) => {
          this.onGetAllCategories();
        },
        error: (error) => {
          if (error.status === 409) {
            return alert("you can't delete this category, its related to training")
          }
          console.error(error)
        }
      })
  }

  onNewCategory() {
    this.mode = 'new-category'
  }

  onSaveCategory(value: any) {
    let url = this.catalogueService.host + "/categories"

    this.catalogueService.postResource(url, value)
      .subscribe({
        next: (data) => {
         this. mode = 'list';
          this.onGetAllCategories();
        },
        error: (error) => console.error(error)
      })
  }

  onEditCategory(category) {
    this.catalogueService.getResource(category._links.self.href)
      .subscribe({
        next: (data) => {
          this.currentCategory = data;
          this.mode = 'edit-category'
        },
        error: (error) => console.error(error)
      })
  }

  onUpdateCategory(category) {
    this.catalogueService.putResource(this.currentCategory._links.self.href, category)
      .subscribe({
        next: (data) => {
          this. mode = 'list';
          this.onGetAllCategories();
        },
        error: (error) => console.error(error)
      })
  }
}
