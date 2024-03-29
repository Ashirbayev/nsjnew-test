import {Component, OnInit} from '@angular/core';
import {Category} from "../../shared/interfaces";
import {Observable} from "rxjs";
import {CategoriesService} from "../../shared/services/categories.service";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
  }

}
