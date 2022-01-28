import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticsPage} from "../shared/interfaces";

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef


  average: number
  pending = true

  constructor(private service: AnalyticsService) {

  }

 ngAfterViewInit(): void {
    this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      //console.log(data)

    })
 }

}
