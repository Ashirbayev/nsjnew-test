
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataIIN, Filter, Order, TestNsj} from "../shared/interfaces";
import {Observable} from "rxjs";
import {NewnsjService} from "../shared/services/newnsj.service";
import {MaterialInstance, MaterialService} from "../shared/classes/material.service";


@Component({
  selector: 'app-nsjnew-page',
  templateUrl: './nsjnew-page.component.html',
  styleUrls: ['./nsjnew-page.component.css']
})
export class NsjnewPageComponent implements OnInit, AfterViewInit{

 categories$: Observable<TestNsj[]>
  nsjs: TestNsj [] = []
  data: DataIIN[] = []
  filter: Filter = {}
  IIN: number
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance


  constructor(private newnsjsService: NewnsjService) {
  }

  ngOnInit(): void {
    //this.categories$ = this.newnsjsService.fetch()
    this.newnsjsService.fetch().subscribe( nsjs => {
      this.nsjs = nsjs
      console.log('nsjs: ', nsjs)
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }




  private fetch() {


    return this.newnsjsService.getById(this.IIN)
    .subscribe(nsjs => {
      console.log(nsjs)
    })
  }





  loadMore(){

    this.fetch()

  }


  open() {
    console.log('Открылась')
    this.modal.open()

  }

  submit() {
    this.modal.close()
  }
}
