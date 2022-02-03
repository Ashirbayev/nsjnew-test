import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataIIN, Filter, Region, TestNsj, Numzav} from "../../shared/interfaces";
import {MaterialDatepicker, MaterialInstance, MaterialService} from "../../shared/classes/material.service";
import {NewnsjService} from "../../shared/services/newnsj.service";
import {Observable} from "rxjs";


@Component({
  selector: 'app-nsjnew-first',
  templateUrl: './nsjnew-first.component.html',
  styleUrls: ['./nsjnew-first.component.css']
})
export class NsjnewFirstComponent implements OnInit, AfterViewInit {

  categories$: Observable<TestNsj[]>
  regions: Region[] = []
  region: Region
  nsjs: TestNsj [] = []
  nsjs2: TestNsj [] = []
  vigodosSmert: TestNsj [] = []
  vigodosZhizn: TestNsj [] = []
  data: DataIIN[] = []
  filter: Filter = {}
  IIN: number
  prosent: number
  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('modal2') modalRef2: ElementRef
  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef
  @ViewChild('modalReg') modalRegionRef: ElementRef
  @ViewChild('modalNagruz') modalNagruzRef: ElementRef

  modal: MaterialInstance
  modal2: MaterialInstance
  modalRegion: MaterialInstance
  modalNagruz: MaterialInstance
  numzavs: Numzav[]
  numzav: string
  strahVznos: number
  godDohod: number
  srokStrah: number
  nagruzki: ['ddd', 'dsdsd']


  zastrahovan: TestNsj
  strahovatel: TestNsj
  vigodopreodetatelSmert: TestNsj
  vigodopreodetatelSmerts: TestNsj [] = []
  vigodopreodetatelZhizn: TestNsj
  vigodopreodetatelZhizns: TestNsj [] = []
  start: MaterialDatepicker
  end: MaterialDatepicker

  constructor(private newnsjsService: NewnsjService) {
  }

  ngOnInit(): void {
    this.newnsjsService.getAllRegions().subscribe( regions => {
      this.regions  = regions
      console.log('nsjs: ', regions)
    })

  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
    this.modal2 = MaterialService.initModal(this.modalRef2)
    this.modalRegion = MaterialService.initModal(this.modalRegionRef)
    this.modalNagruz = MaterialService.initModal(this.modalNagruzRef)

    this.start= MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    this.end= MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
  }
  validate() {
    if (this.start.date) {
      // this.isValid = true
      return
    }
  }

  getZavNum(){
    return this.newnsjsService.getZavNum(this.region.RFBN_ID)
      .subscribe(test => {
        this.numzavs = test
        this.numzav = this.numzavs[0].CN
        console.log( this.numzav)
      })
  }







  private fetch() {
    return this.newnsjsService.getById(this.IIN)
      .subscribe(nsjs => {
        this.nsjs = nsjs
        console.log(nsjs)
      })
  }





  loadMore(){
    this.fetch()
  }

  loadMore2(){
    return this.newnsjsService.getById(this.IIN)
      .subscribe(vigodosSmert => {
        this.vigodosSmert = vigodosSmert
        console.log(vigodosSmert)
      })
  }


  open() {
    console.log('Открылась')
    this.modal.open()
  }

  open2() {
    console.log('Открылась  2')
    this.modal2.open()
  }

  submit() {
    this.modal.close()
  }

  addToOrder(i: TestNsj) {
    this.zastrahovan = i
    this.nsjs = []
    console.log(i)
  }


  addToOrder3(i: TestNsj) {
    this.strahovatel = i
    this.nsjs2 = []
    console.log(i)
  }


  addToOrder2(i: TestNsj) {
    this.vigodopreodetatelSmert = i
    this.vigodopreodetatelSmerts.push(i)
    this.vigodosSmert = []
    // this.nsjs = []
    console.log(i)
    this.modal.close()
  }



  open3() {
    this.modalRegion.open()
  }

  open4() {
    this.modalNagruz.open()
  }

  loadMore3() {
    return this.newnsjsService.getById(this.IIN)
      .subscribe(nsjs2 => {
        this.nsjs2 = nsjs2
      })
  }

  VigodaSmert() {

  }

  selectToRegion(i: Region) {
    this.region = i
    this.getZavNum()
    this.modalRegion.close()
  }

  loadMore4() {

    return this.newnsjsService.getById(this.IIN)
      .subscribe(vigodosSmert => {
        this.vigodosZhizn = vigodosSmert
        console.log(vigodosSmert)
      })

  }

  addToOrder4(i: any) {

    this.vigodopreodetatelZhizn = i
    this.vigodopreodetatelZhizns.push(i)
    this.vigodosSmert = []
    // this.nsjs = []
    //console.log(this.vigodopreodetatelSmerts)
    this.modal.close()


  }




}
