import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {
  Agent,
  Answer, Category,
  DataIIN, DopPokrStrahSum, DopPokrSum,
  Filter, Nagruz,
  Numzav,
  Order, Period, Pokr,
  Question,
  Region,
  Statment,
  TestNsj,
  Vigodo
} from "../shared/interfaces";
import {Observable} from "rxjs";
import {NewnsjService} from "../shared/services/newnsj.service";
import {MaterialDatepicker, MaterialInstance, MaterialService} from "../shared/classes/material.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-nsjnew-page',
  templateUrl: './nsjnew-page.component.html',
  styleUrls: ['./nsjnew-page.component.css']
})
export class NsjnewPageComponent implements OnInit, AfterViewInit {
  countries = [
    {ID: 1, NAME: "Андерайтинг риска свободного времени"},
    {ID: 2, NAME: "Профессиональный"},
    {ID: 3, NAME: "Медицинский"},
    {ID: 4, NAME: "Андерайтинг риска пребывания в странах"}
  ];
  selectedValue = null;
  nagruz: string
  nagruzki: Nagruz[] = []
  nagruzka: Nagruz = {}
  stringMassiveNagruz: string = ''

  loading = false

  periods: Period[] = [
    {ID: 0, NAME: "Единовременно"},
    {ID: 1, NAME: "Ежегодно"},
    {ID: 2, NAME: "Раз в пол года"},
    {ID: 3, NAME: "Ежеквартально"},
    {ID: 4, NAME: "Ежемесячно"}
  ];
  selectedPeriod: Period = {ID: 0, NAME: "Единовременно"};


  strahSumsTravmaNS = [
    {ID: 0, NAME: "500000"},
    {ID: 1, NAME: "750000"},
    {ID: 2, NAME: "1000000"},
    {ID: 3, NAME: "15000000"}
  ];
  strahSum = null;
  keyTrue = false

  strahSumsNetrudNS = [
    {ID: 0, NAME: "500000"},
    {ID: 1, NAME: "750000"},
    {ID: 2, NAME: "1000000"},
    {ID: 3, NAME: "15000000"}
  ];

  strahSumsGospitalNS = [
    {ID: 0, NAME: "2000000"},
    {ID: 1, NAME: "3000000"},
    {ID: 2, NAME: "4000000"},
    {ID: 3, NAME: "5000000"}
  ];


  dopPokrStrahSum: DopPokrStrahSum = {}
  pokritiesMain: Pokr[] = []
  pokritiesDop: Pokr[] = []
  selectedDop = null;
  pokritiesSelected: Pokr[] = []
  pokrStringMassive: string = ''
  dopPokrSums: DopPokrSum[] = []



  form!: FormGroup
  categories$: Observable<TestNsj[]>

  regions: Region[] = []
  region: Region
  agent: Agent
  agents: Agent[] = []
  selectedAgents = null
  agen: string
  agentSelect: number
  agentRashod: number



  statment: Statment = {}


  nsjs: TestNsj [] = []
  nsjs2: TestNsj [] = []
  vigodosSmert: TestNsj [] = []
  vigodosZhizn: TestNsj [] = []
  smert: Vigodo = {}
  zhizn: Vigodo = {}


  data: DataIIN[] = []
  filter: Filter = {}
  IIN: number
  IIN2: number
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



  zastrahovan: TestNsj
  strahovatel: TestNsj
  vigodopreodetatelSmert: TestNsj = {}
  vigodopreodetatelSmert2: TestNsj
  vigodopreodetatelSmerts: TestNsj [] = []
  stringMassiveSmerts: string = ''
  stringMassiveZhizns: string = ''

  vigodopreodetatelZhizn: TestNsj = {}
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
  s: number

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


  constructor(private newnsjsService: NewnsjService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.newnsjsService.getAllRegions().subscribe(regions => {
      this.regions = regions
      //console.log('nsjs: ', regions)
    })
    this.getAgents()
    this.getPokrs()
    this.getQuestion()


    for (var i = 1; i < 38; i++) {
      this.answersRadio[i] = 'нет'
      console.log(this.answersRadio[i])
      // Iterate over numeric indexes from 0 to 5, as everyone expects.

    }

  }




  getAgents() {
    this.newnsjsService.getAgents().subscribe(agents => {
      this.agents = agents

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
      console.log((this.start.date.getMonth() + 1))
      console.log(this.start.date.getDate())
      console.log(this.start.date.getFullYear())
      if (this.start.date.getDate() < 10 && (this.start.date.getMonth() + 1) < 10) {
        this.dateString = '0' + this.start.date.getDate() + '.' + '0' + (this.start.date.getMonth() + 1) + '.' + this.start.date.getFullYear()
      } else if ((this.start.date.getMonth() + 1) < 10) {
        this.dateString = this.start.date.getDate() + '.' + '0' + (this.start.date.getMonth() + 1) + '.' + this.start.date.getFullYear()
      } else if (this.start.date.getDate() < 10) {
        this.dateString = '0' + this.start.date.getDate() + '.' + (this.start.date.getMonth() + 1) + '.' + this.start.date.getFullYear()
      } else {
        this.dateString = this.start.date.getDate() + '.' + (this.start.date.getMonth() + 1) + '.' + this.start.date.getFullYear()
      }
      console.log(this.dateString)
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

  getPokrs() {
    return this.newnsjsService.getPokrs()
      .subscribe(test => {
        console.log(test)

        test.map((pokr: Pokr) => {
          if(pokr.PMAIN == 0){
           console.log(pokr.ID)
            this.pokritiesDop.push(pokr)
          } else {
            this.pokritiesMain.push(pokr)
          }
        })
      })
  }


  private fetch() {
    return this.newnsjsService.getById(this.IIN2)
      .subscribe(nsjs => {

        this.nsjs = nsjs
        console.log(nsjs)
        this.IIN2 = this.s
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
        this.IIN = this.s
      })
  }


  open() {
 if (!this.zastrahovan) {
   MaterialService.toast('Пустое Поле "Застрахованный!')
 } else {
   //
   console.log('Открылась')
   this.modal.open()
 }



  }

  open2() {

    if (!this.zastrahovan) {
      MaterialService.toast('Пустое Поле "Застрахованный!')
    } else {
      console.log('Открылась  2')
      this.modal2.open()
    }


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
    //this.vigodopreodetatelSmerts.push(i)
    this.vigodosSmert = []
    this.nsjs = []
    console.log(i)
    // this.modal.close()
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
        this.IIN = this.s
      })
  }

  VigodaSmert() {
    //console.log(this.vigodopreodetatelSmert)
    this.smert.M_SICID = this.zastrahovan.ID
    this.smert.VIGODO_PRECENT =''
    this.smert.VIGODO_PRECENT = this.vigodopreodetatelSmert.ID+ ':' + this.prosent
    this.smert.TYPE_VIGODA = 1
    this.vigodopreodetatelSmert.PRECENT = this.prosent

    console.log(this.smert)
    return this.newnsjsService.createObtain(this.smert)
      .subscribe(smert => {
        console.log(smert)
        this.vigodopreodetatelSmerts.push(this.vigodopreodetatelSmert)
        this.vigodosSmert = []
        this.vigodopreodetatelSmert = {}
        console.log(this.vigodopreodetatelSmerts)
        this.modal.close()
      })
  }



  deleteVigodaSmert(smer: TestNsj) {
    let keyValue = smer.ID
    let objectIndex = this.vigodopreodetatelSmerts.findIndex(e => e.ID == keyValue);
    if(objectIndex != -1) {
      this.vigodopreodetatelSmerts.splice(objectIndex, 1); // Remove one element from array
    }
    console.log(this.vigodopreodetatelSmerts)
  }

  deleteVigodaZhizn(zhiz: TestNsj) {
    let keyValue = zhiz.ID
    let objectIndex = this.vigodopreodetatelZhizns.findIndex(e => e.ID == keyValue);
    if(objectIndex != -1) {
      this.vigodopreodetatelZhizns.splice(objectIndex, 1); // Remove one element from array
    }
    console.log(this.vigodopreodetatelZhizns)
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
        this.IIN = this.s
      })
  }

  addToOrder4(i: any) {
    this.vigodopreodetatelZhizn = i
   // this.vigodopreodetatelZhizns.push(i)
    this.vigodosZhizn = []
    this.nsjs = []
    console.log(this.vigodopreodetatelSmerts)
    //this.modal2.close()
    // this.vigodopreodetatelSmert = i
    // //this.vigodopreodetatelSmerts.push(i)
    // this.vigodosSmert = []
    // this.nsjs = []
    // console.log(i)
    // // this.modal.close()
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
    if (!this.numzav) {
      MaterialService.toast('Поле "Номер заявления" не может быть пустой!')
      }
    else if (!this.start.date){
      MaterialService.toast('Поле "Поле "Дата заявления" не может быть пустой!')
    }

    else if (!this.strahVznos){
      MaterialService.toast('Поле "Размер страхового взноса" не может быть пустой!')
    }
    else if (!this.godDohod){
      MaterialService.toast('Поле "Поле "Годовой доход страхуемого лица" не может быть пустой!')
    }
    else if (!this.srokStrah){
      MaterialService.toast('Поле "Срок страхования" не может быть пустой!')
    }


    else {
      console.log(this.isFirstVisible)
      this.isFirstVisible = false
    }



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


  answerGen() {
    this.yes()
    this.answers.map(answer => {
      if (answer.ID_ANSWER) {
        this.newnsjsService.createAnswer(answer).subscribe(test => {
          console.log(test)
        })
      }
    })
  }

  createPokrsString() {
    this.dopPokrSums.map(pokr => {
      if (!pokr.ID) {
      }
      else {
        var str1 = new String(pokr.ID.toString());
        var str2 = new String(pokr.SUM);
        this.pokrStringMassive += str1.toString() + ':' + str2.toString() + ';';
      } })
    console.log(this.pokrStringMassive)
  }

  obtainGenMassiveString (){
    ////////////////////// Формирования стринг массива выгодоприобретателей смерти
    console.log(this.vigodopreodetatelSmerts)
    this.vigodopreodetatelSmerts.map(
      (answer, i, arr) => {
        if (arr.length - 1 === i) {
          // last one
          var str1 = new String(this.zastrahovan.ID);
          var str2 = new String(answer.ID.toString());

          this.stringMassiveSmerts += str1.toString() + ':' + str2.toString() + ',';
          console.log('Смерть: ' + this.stringMassiveSmerts)

      } else {

          var str1 = new String(this.zastrahovan.ID);
          var str2 = new String(answer.ID.toString());

          this.stringMassiveSmerts += str1.toString() + ':' + str2.toString() + ',';
          console.log('Смерть: ' + this.stringMassiveSmerts)

      }
    })
    ////////////////////// Формирования стринг массива выгодоприобретателей дожития
    this.vigodopreodetatelZhizns.map(
      (answer, i, arr) => {
        if (arr.length - 1 === i) {
          // last one
          var str1 = new String(this.zastrahovan.ID);
          var str2 = new String(answer.ID.toString());

          this.stringMassiveZhizns += str1.toString() + ':' + str2.toString() + ';';
          console.log('Жизнь: ' + this.stringMassiveZhizns)
        } else {
          // not last one
            var str1 = new String(this.zastrahovan.ID);
            var str2 = new String(answer.ID.toString());
            this.stringMassiveZhizns += str1.toString() + ':' + str2.toString() + ',';
            console.log('Жизнь: ' + this.stringMassiveZhizns)
        }
      }
      )
    console.log('Финал смерть: ' + this.stringMassiveSmerts)
    console.log('Финал Жизнь: ' + this.stringMassiveZhizns)
  }


  genMassiveStringNagruz (){
    ////////////////////// Формирования стринг массива нагрузок рисков
    console.log(this.nagruzki)

    this.nagruzki.map(
      (answer, i, arr) => {
        if (arr.length - 1 === i) {
          // last one
          var str1 = new String(answer.ID.toString());
          var str2 = new String(answer.NAME);
          this.stringMassiveNagruz += str1.toString() + ':' + str2.toString() + ';' ;
          console.log('Нагрузки: ' + this.stringMassiveNagruz)
        } else {
          // not last one
          var str1 = new String(answer.ID.toString());
          var str2 = new String(answer.NAME);
          this.stringMassiveNagruz += str1.toString() + ':' + str2.toString() + ',';
          console.log('Нагрузки: ' + this.stringMassiveNagruz)
        }
        }
        )
    console.log('конец'+this.nagruzki)
  }


  createSends() {
    this.loading =true
    this.answerGen()
    this.obtainGenMassiveString()
    this.genMassiveStringNagruz()
    this.createPokrsString()
    //this.yes()
    this.answers.map(answer => {
      if (!answer.ID_ANSWER) {
      } else {
        var str1 = new String(answer.ID_QUESTION.toString());
        var str2 = new String(answer.ID_ANSWER.toString());
        this.massive += str1.toString() + ':' + str2.toString() + ':;';
        //console.log(this.massive)
      }
    })

    //console.log(this.massive)
    if (this.agentSelect == null ) {this.agentSelect = 0}
    if (this.agentRashod == null ) {this.agentRashod = 0}
    if (this.godDohod == null ) {this.godDohod = 0}
    if (this.selectedPeriod.NAME == null ) {this.selectedPeriod.NAME = ''}
    if (this.stringMassiveSmerts == null ) {this.stringMassiveSmerts = ''}
    if (this.stringMassiveZhizns == null ) {this.stringMassiveZhizns = ''}
    if (this.stringMassiveNagruz == null ) {this.stringMassiveNagruz = ''}


    this.statment.BRANCH_ID = this.region.RFBN_ID
    this.statment.ZAV_NUMBER = this.numzav
    this.statment.DATE_ZAV = this.dateString// {(Date|number|string)}
    this.statment.STRAH_VZNOS = this.strahVznos
    this.statment.SELECT_ID_AGENT = this.agentSelect
    this.statment.AGENT_RASHOD = this.agentRashod
    this.statment.PERIOD = this.selectedPeriod.NAME
    this.statment.SROK_STRAH = this.srokStrah
    this.statment.MAIN_POKR = 1
    this.statment.GOD_DOHOD = this.godDohod
    this.statment.VIGODO_SMERT = this.stringMassiveSmerts
    this.statment.VIGODO_ZHIZN = this.stringMassiveZhizns
    this.statment.STRAHOVATEL = this.strahovatel.ID
    this.statment.ZASTRAHOVAN = this.zastrahovan.ID
    this.statment.ANSWERS = this.massive
    this.statment.EMPID = 3853
    this.statment.RISK = this.stringMassiveNagruz
    console.log(this.statment)
    this.massive = '';
    this.newnsjsService.createZayav(this.statment).subscribe(
      (cnctid: {cnctid?: number}) => {
        this.dopPokrStrahSum.CNCT_ID = cnctid.cnctid
        this.dopPokrStrahSum.DOP_POKRS_SUMS = this.pokrStringMassive
        this.newnsjsService.setPokrs(this.dopPokrStrahSum).subscribe(
          test => console.log(test)
        )
        this.loading = false
        this.router.navigate([`/statment/${cnctid.cnctid}`] )
        console.log(cnctid)
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
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


  VigodaZhizn() {
    console.log(this.vigodopreodetatelZhizn)
    this.zhizn.M_SICID = this.zastrahovan.ID
    this.zhizn.VIGODO_PRECENT = ''
    this.zhizn.VIGODO_PRECENT = this.vigodopreodetatelZhizn.ID+ ':' + this.prosent
    this.zhizn.TYPE_VIGODA = 2
    this.vigodopreodetatelZhizn.PRECENT = this.prosent

    return this.newnsjsService.createObtain(this.zhizn)
      .subscribe(zhizn => {
        console.log(zhizn)
        this.vigodopreodetatelZhizns.push(this.vigodopreodetatelZhizn)
        this.vigodosZhizn = []
        this.vigodopreodetatelZhizn = {}
        console.log(this.vigodopreodetatelZhizns)
        this.modal2.close()
      })
  }


  addNagruz() {
    console.log(this.selectedValue)
    console.log(this.nagruz)
    this.nagruzka.ID = this.selectedValue.ID
    this.nagruzka.NAME = this.nagruz
    this.nagruzka.TYPE = this.selectedValue.NAME
    this.nagruzki.push(this.nagruzka)
    this.nagruzka = {}
    console.log(this.nagruzki)
  }


  deleteNagruz(nagr: Nagruz) {
    let keyValue = nagr.ID
    let objectIndex = this.nagruzki.findIndex(e => e.ID == keyValue);
    if(objectIndex != -1) {
      this.nagruzki.splice(objectIndex, 1); // Remove one element from array
    }
    console.log(this.nagruzki)
  }





  onChangeAgent(t: any) {
   this.agen = ': Договор  № ' + t
    console.log(t)
    this.agentSelect = t
  }

  onChangePeriod(s: any) {
    console.log(s)
    console.log(this.selectedPeriod)
  }


  onChangeDops(t: any) {
    this.remove(t)
    if (t == 5) {
      this.dopPokrSums.push({
        ID: 5,
        SUM: "2000000"
      })
    }
    if (t == 4) {
      this.dopPokrSums.push({
        ID: 4,
        SUM: "500000"
      })
    }
    if (t == 3) {
      this.dopPokrSums.push({
        ID: 3,
        SUM: "500000"
      })
    }
    if (t == 2) {
      this.dopPokrSums.push({
        ID: 2,
        SUM: "0"
      })
    }
    if (t == 1) {
      this.dopPokrSums.push({
        ID: 1,
        SUM: "0"
      })
    }
   console.log(t)
    console.log(this.dopPokrSums)
  }







  remove(keyValue: number) {
    let objectIndex = this.pokritiesDop.findIndex(e => e.ID == keyValue);
    this.pokritiesSelected.push(this.pokritiesDop[objectIndex])
    if(objectIndex != -1) {
      this.pokritiesDop.splice(objectIndex, 1); // Remove one element from array
   // console.log(this.pokritiesSelected)
    }
  }


  RemoveDopPok(pok: Pokr) {
    let keyValue = pok.ID
    let objectIndex = this.pokritiesSelected.findIndex(e => e.ID == keyValue);
    this.pokritiesDop.push(this.pokritiesSelected[objectIndex])
    if(objectIndex != -1) {
      this.pokritiesSelected.splice(objectIndex, 1); // Remove one element from array

    }
    if (keyValue !== 6) {
      let objectIndex = this.dopPokrSums.findIndex(e => e.ID == keyValue);
      if(objectIndex != -1) {
        this.dopPokrSums.splice(objectIndex, 1); // Remove one element from array
      }
    }
    //console.log(pok)
  }

  onAddDops3(value: string) {
    console.log(value)
    this.dopPokrSums.map(dokr => {
      if (dokr.ID == 3) {
        dokr.SUM = value.toString()
      }
      console.log(this.dopPokrSums)
    })
  }


  onAddDops4(value: string) {
    console.log(value)
    this.dopPokrSums.map(dokr => {
      if (dokr.ID == 4) {
        dokr.SUM = value.toString()
      }
    })
    console.log(this.dopPokrSums)
  }

  onAddDops5(value: string) {
    console.log(value)
    this.dopPokrSums.map(dokr => {
      if (dokr.ID == 5) {
        dokr.SUM = value.toString()
      }
    })
    console.log(this.dopPokrSums)
  }


  genMassiveStringDopPokr() {

    ////////////////////// Формирования стринг массива дополнительных покрытий
    console.log('конец'+this.dopPokrSums)

  }

  // deleteObtain(){
  //   this.newnsjsService.deleteObtain(1086).subscribe(
  //     test => console.log(test)
  //   )
  // }
}


















