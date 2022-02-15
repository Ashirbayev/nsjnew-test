import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {Observable} from "rxjs";
import {OverviewPage} from "../shared/interfaces";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef
  tapTarget: MaterialInstance
  data$: Observable<OverviewPage>

  yesterday = new Date()



  constructor(private service: AnalyticsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getOverview()

    this.yesterday.setDate(this.yesterday.getDate()-1)
  }

  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)

  }


  ngOnDestroy(): void {
  }


  openInfo() {
    this.tapTarget.open()
  }


  //additionalItems: any[]=[];
  myAdditional = '';
  primaryItemType: any[] = [];
  arrayStuff: any[] = [];

  selectedItems = [
    { name: 'FirstVal', key: 1, additionalInfo: 'The is first in the row' },
    { name: 'SecondVal', key: 2, additionalInfo: 'The is second in the row' },
    { name: 'SecondVal3', key: 3, additionalInfo: 'The is second in the row' },
  ];

  additionalItems = [
    { name: 'ThirdVal', key: 3, additionalInfo: 'The is third in the row' },
    { name: 'FourthVal', key: 4, additionalInfo: 'The is fourth in the row' },
    { name: 'FifthVal', key: 5, additionalInfo: 'The is fifth in the row' },
  ];

  mySelectedItem = this.selectedItems[1].key;


  setAdditionalItems(additionalItem: any) {
    console.log('ping!', additionalItem);
  }

  setChangedItem(changedItem: any) {
    //some logic
    console.log('setChangedItem', changedItem);
    this.setTypeByItem(changedItem);
  }

  setTypeByItem(changedItem: any) {
    this.primaryItemType = this.arrayStuff.filter((matchItem) => {
      if (matchItem.key === changedItem) {
        return matchItem.matchValue;
      }
    });
    return this.primaryItemType;
  }

}
