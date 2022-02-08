import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Answer, DataIIN, Filter, Numzav, Order, Question, Region, Statment, TestNsj} from "../shared/interfaces";
import {Observable} from "rxjs";
import {NewnsjService} from "../shared/services/newnsj.service";
import {MaterialDatepicker, MaterialInstance, MaterialService} from "../shared/classes/material.service";


@Component({
  selector: 'app-nsjnew-page',
  templateUrl: './nsjnew-page.component.html',
  styleUrls: ['./nsjnew-page.component.css']
})
export class NsjnewPageComponent implements OnInit, AfterViewInit {

  categories$: Observable<TestNsj[]>

  regions: Region[] = []
  statment: Statment = {}

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


  /////////////////////second

  questions: Question [] = []
  // @Input() regions: Region[]
  answer1: string
  answer2: string


  height: string
  weight: string


  answersRadio: string [] = []
  fatherLifeAge: string
  fatherCondition: string
  fatherDeadthAge: string
  fatherDiagnosis: string

  motherLifeAge: string
  motherCondition: string
  motherDeadthAge: string
  motherDiagnosis: string

  brothersLifeAge: string
  brothersCondition: string
  brothersDeadthAge: string
  brothersDiagnosis: string

  sistersLifeAge: string
  sistersCondition: string
  sistersDeadthAge: string
  sistersDiagnosis: string

  dateString: string = ''


  answers: Answer [] = []
  massive: string = ''
  answer: Answer
  quest1: boolean = false


  // nsjs: TestNsj [] = []
  // data: DataIIN[] = []
  // filter: Filter = {}
  //IIN: number
  //@ViewChild('modal') modalRef: ElementRef
//  modal: MaterialInstance
  //isFirstVisible: boolean = true
  @Input() isFirstVisible: boolean = true
  fromParent: string = 'String from parent';



  constructor(private newnsjsService: NewnsjService) {
  }

  ngOnInit(): void {

    this.newnsjsService.getAllRegions().subscribe(regions => {
      this.regions = regions
      console.log('nsjs: ', regions)
    })
    this.getAgents()
    console.log(this.fromParent)


  }

  getAgents() {
    this.newnsjsService.getAgents().subscribe(agents => {
      console.log('agents: ', agents)
    })
  }


  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
    this.modal2 = MaterialService.initModal(this.modalRef2)
    this.modalRegion = MaterialService.initModal(this.modalRegionRef)
    this.modalNagruz = MaterialService.initModal(this.modalNagruzRef)

    this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
  }


  validate() {
    if (this.start.date) {

      console.log(  (this.start.date.getMonth()+1)  )
      console.log(  this.start.date.getDate())
      console.log(  this.start.date.getFullYear())
      if (this.start.date.getDate() < 10 && (this.start.date.getMonth()+1) < 10 ) {
        this.dateString = '0' + this.start.date.getDate() + '.' + '0' + (this.start.date.getMonth()+1) + '.' + this.start.date.getFullYear()
      } else if ((this.start.date.getMonth()+1) < 10) {
        this.dateString = this.start.date.getDate() + '.' + '0' + (this.start.date.getMonth()+1) + '.' + this.start.date.getFullYear()
      } else if (this.start.date.getDate() < 10) {
        this.dateString = '0' + this.start.date.getDate() + '.' + (this.start.date.getMonth()+1) + '.' + this.start.date.getFullYear()
      } else {
        this.dateString = this.start.date.getDate() + '.' + (this.start.date.getMonth()+1) + '.' + this.start.date.getFullYear()
      }



      console.log(  this.dateString)
      return
    }
  }

  getZavNum() {
    return this.newnsjsService.getZavNum(this.region.RFBN_ID)
      .subscribe(test => {
        this.numzavs = test
        this.numzav = this.numzavs[0].CN
        console.log(this.numzav)
      })
  }


  private fetch() {
    return this.newnsjsService.getById(this.IIN)
      .subscribe(nsjs => {
        this.nsjs = nsjs
        console.log(nsjs)
      })
  }


  loadMore() {
    this.fetch()
  }

  loadMore2() {
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


  // private fetch() {
  //
  //
  //   return this.newnsjsService.getById(this.IIN)
  //   .subscribe(nsjs => {
  //     console.log(nsjs)
  //   })
  // }


  // loadMore(){
  //   this.fetch()
  // }


  NextPage() {
    console.log(this.isFirstVisible)
    this.isFirstVisible = false

  }

  PreviewPage() {
    this.isFirstVisible = true
  }


////////////////////////////////////////second


  getQuestion() {
    return this.newnsjsService.getAllQuestion()
      .subscribe(test => {
        this.questions = test
        console.log(test)
      })
  }


  yes() {
    this.answers = [{
      ID_QUESTION: 1,
      ID_ANSWER: this.answersRadio[1]
    },
      {
        ID_QUESTION: 2,
        ID_ANSWER: this.answersRadio[2]
      },
      {
        ID_QUESTION: 3,
        ID_ANSWER: this.answersRadio[3]
      },
      {
        ID_QUESTION: 4,
        ID_ANSWER: this.answersRadio[4]
      },
      {
        ID_QUESTION: 5,
        ID_ANSWER: this.answersRadio[5]
      },
      {
        ID_QUESTION: 6,
        ID_ANSWER: this.answersRadio[6]
      },
      {
        ID_QUESTION: 37,
        ID_ANSWER: this.answersRadio[7]
      },
      {
        ID_QUESTION: 38,
        ID_ANSWER: this.answersRadio[8]
      },
      {
        ID_QUESTION: 39,
        ID_ANSWER: this.answersRadio[9]
      },
      {
        ID_QUESTION: 40,
        ID_ANSWER: this.answersRadio[10]
      },
      {
        ID_QUESTION: 41,
        ID_ANSWER: this.answersRadio[11]
      },
      {
        ID_QUESTION: 42,
        ID_ANSWER: this.answersRadio[12]
      },
      {
        ID_QUESTION: 43,
        ID_ANSWER: this.answersRadio[13]
      },
      {
        ID_QUESTION: 44,
        ID_ANSWER: this.answersRadio[14]
      },
      {
        ID_QUESTION: 45,
        ID_ANSWER: this.answersRadio[15]
      },
      {
        ID_QUESTION: 46,
        ID_ANSWER: this.answersRadio[16]
      },
      {
        ID_QUESTION: 47,
        ID_ANSWER: this.answersRadio[17]
      },
      {
        ID_QUESTION: 48,
        ID_ANSWER: this.answersRadio[18]
      },
      {
        ID_QUESTION: 49,
        ID_ANSWER: this.answersRadio[19]
      },
      {
        ID_QUESTION: 50,
        ID_ANSWER: this.answersRadio[20]
      },
      {
        ID_QUESTION: 51,
        ID_ANSWER: this.answersRadio[21]
      },
      {
        ID_QUESTION: 52,
        ID_ANSWER: this.answersRadio[22]
      },
      {
        ID_QUESTION: 53,
        ID_ANSWER: this.answersRadio[23]
      },
      {
        ID_QUESTION: 54,
        ID_ANSWER: this.answersRadio[24]
      },
      {
        ID_QUESTION: 55,
        ID_ANSWER: this.answersRadio[25]
      },
      {
        ID_QUESTION: 56,
        ID_ANSWER: this.answersRadio[26]
      },
      {
        ID_QUESTION: 57,
        ID_ANSWER: this.answersRadio[27]
      },
      {
        ID_QUESTION: 58,
        ID_ANSWER: this.answersRadio[28]
      },
      {
        ID_QUESTION: 59,
        ID_ANSWER: this.answersRadio[29]
      },
      {
        ID_QUESTION: 60,
        ID_ANSWER: this.answersRadio[30]
      },
      {
        ID_QUESTION: 61,
        ID_ANSWER: this.answersRadio[31]
      },
      {
        ID_QUESTION: 62,
        ID_ANSWER: this.answersRadio[32]
      },
      {
        ID_QUESTION: 63,
        ID_ANSWER: this.answersRadio[33]
      },
      {
        ID_QUESTION: 64,
        ID_ANSWER: this.answersRadio[34]
      },
      {
        ID_QUESTION: 65,
        ID_ANSWER: this.answersRadio[35]
      },
      {
        ID_QUESTION: 66,
        ID_ANSWER: this.answersRadio[36]
      },
      {
        ID_QUESTION: 67,
        ID_ANSWER: this.answersRadio[37]
      },
      {
        ID_QUESTION: 81,
        ID_ANSWER: this.height
      },
      {
        ID_QUESTION: 82,
        ID_ANSWER: this.weight
      },
      {
        ID_QUESTION: 121,
        ID_ANSWER: this.fatherLifeAge
      },
      {
        ID_QUESTION: 122,
        ID_ANSWER: this.fatherCondition
      },
      {
        ID_QUESTION: 123,
        ID_ANSWER: this.fatherDeadthAge
      },
      {
        ID_QUESTION: 124,
        ID_ANSWER: this.fatherDiagnosis
      },
      {
        ID_QUESTION: 125,
        ID_ANSWER: this.motherLifeAge
      },
      {
        ID_QUESTION: 126,
        ID_ANSWER: this.motherCondition
      },
      {
        ID_QUESTION: 127,
        ID_ANSWER: this.motherDeadthAge
      },
      {
        ID_QUESTION: 128,
        ID_ANSWER: this.motherDiagnosis
      },
      {
        ID_QUESTION: 129,
        ID_ANSWER: this.brothersLifeAge
      },
      {
        ID_QUESTION: 130,
        ID_ANSWER: this.brothersCondition
      },
      {
        ID_QUESTION: 131,
        ID_ANSWER: this.brothersDeadthAge
      },
      {
        ID_QUESTION: 132,
        ID_ANSWER: this.brothersDiagnosis
      },
      {
        ID_QUESTION: 133,
        ID_ANSWER: this.sistersLifeAge
      },
      {
        ID_QUESTION: 134,
        ID_ANSWER: this.sistersCondition
      },
      {
        ID_QUESTION: 135,
        ID_ANSWER: this.sistersDeadthAge
      },
      {
        ID_QUESTION: 136,
        ID_ANSWER: this.sistersDiagnosis
      }
    ]


    // console.log(this.answers)
    // answer: Answer
    //
    // answer.ID_QUESTION = 1
    // answer.ID_ANSWER = "да"
    // this.answers.push(this.answer1)
  }


  answerGen(){
    this.yes()
    this.answers.map(answer => {
      if (!answer.ID_ANSWER) {
      } else {
        console.log(this.massive)
        var str1 = new String(answer.ID_QUESTION.toString());
        var str2 = new String(answer.ID_ANSWER.toString());

        this.massive += str1.toString() + ':' + str2.toString() + ':;';
        console.log(this.massive)



        //   this.newnsjsService.createAnswer(answer).subscribe(test => {
        //
        //
        //
        //
        // })
      }


    })
  }




  createSends() {
    this.yes()
    this.answers.map(answer => {
      if (!answer.ID_ANSWER) {
      } else {
        var str1 = new String(answer.ID_QUESTION.toString());
        var str2 = new String(answer.ID_ANSWER.toString());

        this.massive += str1.toString() + ':' + str2.toString() + ':;';
        console.log(this.massive)







        //   this.newnsjsService.createAnswer(answer).subscribe(test => {
        //
        //
        //
        //
        // })
      }


    })
    console.log(this.massive)





    this.statment.BRANCH_ID = this.region.RFBN_ID

    this.statment.ZAV_NUMBER = this.numzav
    this.statment.DATE_ZAV = this.dateString// {(Date|number|string)}
    this.statment.STRAH_VZNOS = this.strahVznos
    this.statment.SELECT_ID_AGENT = 1620
    this.statment.AGENT_RASHOD = 0
    this.statment.PERIOD = 'Ежегодно'
    this.statment.SROK_STRAH = this.srokStrah
    this.statment.MAIN_POKR = 1
    this.statment.GOD_DOHOD = this.godDohod
    this.statment.VIGODO_SMERT = ''
    this.statment.VIGODO_ZHIZN = ''
    this.statment.STRAHOVATEL = this.strahovatel.ID
    this.statment.ZASTRAHOVAN = this.zastrahovan.ID
    this.statment.ANSWERS = this.massive
    this.statment.EMPID = 3853
    this.statment.RISK = 0
    console.log(this.statment)

    this.massive = '';
    this.newnsjsService.createZayav(this.statment).subscribe(test => {
      console.log(test)
    })

  }


//   createSends(answer: Answer) {
//
//     this.answers.forEach( function (arrayItem)
//
//
//     {
//       this.newnsjsService.createAnswer(answer).subscribe(test => {
//
//       })
//       if (!arrayItem.ID_ANSWER) {
//
//
//       }
//
//
//
//     });
//
//
// }


  no() {
    this.quest1 = false
    this.answers[0][1] = 0
    console.log(this.answers)
  }


}
