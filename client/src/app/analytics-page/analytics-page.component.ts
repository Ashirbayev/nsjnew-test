import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage, Category, StatmentT} from "../shared/interfaces";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements OnInit {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef


  average: number
  pending = true
  ///////////////////////

  loading = false
  statments$: Observable<StatmentT[]>

  constructor(private analyticsService: AnalyticsService) {

  }

  ngOnInit(): void {
    this.statments$ = this.analyticsService.fetch()
  }


}
