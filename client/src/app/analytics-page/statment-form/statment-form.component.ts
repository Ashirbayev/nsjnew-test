import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {of} from "rxjs";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  Anderaiting,
  Answers,
  Category,
  Client,
  Dpokr,
  Nagruz,
  Obtain,
  Position,
  StatmentT
} from "../../shared/interfaces";
import {map, switchMap} from "rxjs/operators";
import {MaterialService} from "../../shared/classes/material.service";
import {AnalyticsService} from "../../shared/services/analytics.service";
import {NewnsjService} from "../../shared/services/newnsj.service";




@Component({
  selector: 'app-statment-form',
  templateUrl: './statment-form.component.html',
  styleUrls: ['./statment-form.component.css']
})
export class StatmentFormComponent implements OnInit, AfterViewInit {
  @ViewChild('input') inputRef: ElementRef

  form: FormGroup

  tabcontent: number = 0
  maincontent: number = 1
  image: File


  statment: StatmentT
  numZav: any

  answers: Answers[] = []

  STRAHOVATEL: Client
  ZASTRAHOVAN: Client
  strahovat: string = ''
  zasttrahov: string = ''

  age;
  showAge;

  Pokrs: Dpokr [] = []
  nagruzki: Nagruz[] = []

  growth: string
  weight: string

  obtains: Obtain [] = []
  obtainDeaths: Obtain [] = []
  obtainLifes: Obtain [] = []
  obtainClientFIO : string


  smertPoLuboiPrichine: number [] = []
  smertPoLuboiPrichineValue: number
  smertVrezultateNS: number [] = []
  smertVrezultateNSValue: number
  invalidnosGrup: number [] = []
  invalidnosGrupValue: number
  travmaRezultateNS: number [] = []
  travmaRezultateNSValue: number
  vrmennayaNetrudoSposobnost: number [] = []
  vrmennayaNetrudoSposobnostValue: number
  gospitalizaciaNS: number [] = []
  gospitalizaciaNSValue: number

  smertPoLuboiPrichinePromil: number [] = []
  smertPoLuboiPrichineValuePromil: number
  smertVrezultateNSPromil: number [] = []
  smertVrezultateNSValuePromil: number
  invalidnosGrupPromil: number [] = []
  invalidnosGrupValuePromil: number
  travmaRezultateNSPromil: number [] = []
  travmaRezultateNSValuePromil: number
  vrmennayaNetrudoSposobnostPromil: number [] = []
  vrmennayaNetrudoSposobnostValuePromil: number
  gospitalizaciaNSPromil: number [] = []
  gospitalizaciaNSValuePromil: number


  anderaiting: Anderaiting = {}






  constructor(private route: ActivatedRoute,
              private analyticsService: AnalyticsService,
              private newnsjsService: NewnsjService,
              private  router: Router) {
  }

  ngOnInit(): void {
    this.route.params //Основное
      .subscribe(
        (statment) => {
          this.numZav = statment
        },
        error => MaterialService.toast(error.error.message)
      ),
      map(
        (statments: StatmentT[]) => {
          return statments.map(statments => {
            // statments. = 1
            return statments
          })
        }
      )
    this.loadMoreStatment()
    this.loadMoreAnswers()
  }



  loadMoreStatment() {
    return this.analyticsService.getById(this.numZav.id)
      .subscribe(test => {
        this.statment = test[0]
        console.log(test)
      })
  }

  loadMoreAnswers() {
    return this.analyticsService.getAnswerById(this.numZav.id)
      .subscribe(test => {
        this.answers = test
        console.log(test)

        this.answers.map(answer => {
          if (answer.ID_QUESTION == 81) {
            this.growth = answer.ID_ANSWER
          } else if (answer.ID_QUESTION == 82) {
            this.weight = answer.ID_ANSWER
          }
        })
      })
  }

  loadMoreDpokrs() {
    return this.analyticsService.getDopPokrById(this.numZav.id)
      .subscribe(test => {
        this.Pokrs = test
        console.log(test)
      })
  }

  loadMoreObtains() {
    return this.analyticsService.getObtainById(this.numZav.id)
      .subscribe(test => {
        console.log(test)
        this.obtainDeaths = []
   console.log(this.obtainDeaths)
        this.obtains = test
        this.obtains.map(obtain => {
          var tets: string
          if (obtain.TYPE == 1) {
            this.obtainDeaths.push(obtain)
          } else {
            this.obtainLifes.push(obtain)
          }
            })

        this.obtainDeaths.map(client => {
          var clientString: string
          return this.analyticsService.getClientById(client.SICID_OBTAIN )
            .subscribe(test => {
              var str1 = new String(test[0].LASTNAME);
              var str2 = new String(test[0].FIRSTNAME);
              var str3 = new String(test[0].MIDDLENAME);
              client.FIO  = str1.toString() + ' ' + str2.toString() + ' ' + str3.toString();
              console.log(clientString)
              return clientString
            })
        })

        this.obtainLifes.map(client => {
          var clientString: string
          return this.analyticsService.getClientById(client.SICID_OBTAIN )
            .subscribe(test => {
              var str1 = new String(test[0].LASTNAME);
              var str2 = new String(test[0].FIRSTNAME);
              var str3 = new String(test[0].MIDDLENAME);
              client.FIO  = str1.toString() + ' ' + str2.toString() + ' ' + str3.toString();
              console.log(clientString)
              return clientString
            })
        })

      })
  }

  loadMoreNagruz() {
    return this.analyticsService.getNagruzById(this.numZav.id)
      .subscribe(test => {
        this.nagruzki = test
        console.log(test)
      })
  }




  ngAfterViewInit(): void {
    this.getLoadClientStrahovatel()
    this.getLoadClientZastrahovan()
    this.loadMoreDpokrs()
    this.loadMoreNagruz()
    this.loadMoreObtains()

  }

  getLoadClientStrahovatel() {
    return this.analyticsService.getClientById(this.statment.STRAHOVATEL)
      .subscribe(test => {
        this.STRAHOVATEL = test[0]

        var str1 = new String(this.STRAHOVATEL.LASTNAME);
        var str2 = new String(this.STRAHOVATEL.FIRSTNAME);
        var str3 = new String(this.STRAHOVATEL.MIDDLENAME);
        this.strahovat  += str1.toString() + ' ' + str2.toString() + ' ' + str3.toString();
      })
  }



   getFIObySICID(sicid: number){ //Функция преоброзования ФИО по СИКИД
     var clientString: string
    return this.analyticsService.getClientById(sicid )
      .subscribe(test => {
        var str1 = new String(test[0].LASTNAME);
        var str2 = new String(test[0].FIRSTNAME);
        var str3 = new String(test[0].MIDDLENAME);
        clientString  += str1.toString() + ' ' + str2.toString() + ' ' + str3.toString();
        console.log(clientString)
   return clientString
      })
  }



  getLoadClientZastrahovan() {
    return this.analyticsService.getClientById(this.statment.ZASTRAHOVAN)
      .subscribe(test => {
        this.ZASTRAHOVAN = test[0]
        var str1 = new String(this.ZASTRAHOVAN.LASTNAME);
        var str2 = new String(this.ZASTRAHOVAN.FIRSTNAME);
        var str3 = new String(this.ZASTRAHOVAN.MIDDLENAME);
        this.zasttrahov  += str1.toString() + ' ' + str2.toString() + ' ' + str3.toString();


        // var strData = this.ZASTRAHOVAN.BIRTHDATE.toString()
        // var str: string = strData[8].toString()+strData[9].toString()+'.'+strData[5].toString()+strData[6].toString()+'.'+strData[0].toString()+strData[1].toString()+strData[2].toString()+strData[3].toString()

        // if(this.ZASTRAHOVAN.BIRTHDATE.getDate() < 10 && this.ZASTRAHOVAN.BIRTHDATE.getMonth() < 10 ) {
        //   var str: string = '0' + strData[8].toString()+strData[9].toString()+'.'+'0'+strData[5].toString()+strData[6].toString()+'.'+strData[0].toString()+strData[1].toString()+strData[2].toString()+strData[3].toString()
        // }
        // else if ((this.ZASTRAHOVAN.BIRTHDATE.getMonth() + 1) < 10) {
        //   var str: string = strData[8].toString()+strData[9].toString()+'.'+'0'+strData[5].toString()+strData[6].toString()+'.'+strData[0].toString()+strData[1].toString()+strData[2].toString()+strData[3].toString()
        // }
        // else if (this.ZASTRAHOVAN.BIRTHDATE.getDate() < 10) {
        //   var str: string = '0'+strData[8].toString()+strData[9].toString()+'.'+strData[5].toString()+strData[6].toString()+'.'+strData[0].toString()+strData[1].toString()+strData[2].toString()+strData[3].toString()
        // } else
        // {
        //   var str: string = strData[8].toString()+strData[9].toString()+'.'+strData[5].toString()+strData[6].toString()+'.'+strData[0].toString()+strData[1].toString()+strData[2].toString()+strData[3].toString()
        // }


       this.ageCalculator(this.ZASTRAHOVAN.BIRTHDATE)
      })
  }



  ageCalculator(age: Date){
    if(age){
      const convertAge = new Date(age);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
      console.log(this.showAge)

    }
  }




  setTabcontentTrue() {
    this.tabcontent = 1
  }


  setTabcontentFalse() {
    this.tabcontent = 0
  }

  setTabcontentRashet() {
    this.maincontent = 2
  }

  setTabcontentMain() {
    this.maincontent = 1
  }

  setTabcontentUtver() {
    this.maincontent = 3
  }

  updateStatus51() {
    return this.analyticsService.update(this.statment)
      .subscribe( (cnctid: {cnctid?: number}) => {

        this.loadMoreStatment()
        console.log(cnctid)

      })
  }


  sumArraySmertPoLuboi() {
    this.smertPoLuboiPrichineValue = 0
    this.smertPoLuboiPrichine.map(test => {
      this.smertPoLuboiPrichineValue = test * 1 +  this.smertPoLuboiPrichineValue
    })
  }



  sumArraysmertVrezultateNS() {
    this.smertVrezultateNSValue = 0
    this.smertVrezultateNS.map(test => {
      this.smertVrezultateNSValue = test * 1 +  this.smertVrezultateNSValue
    })
  }


  sumArrayInvalidnosGrup() {
    this.invalidnosGrupValue = 0
    this.invalidnosGrup.map(test => {
      this.invalidnosGrupValue = test * 1 +  this.invalidnosGrupValue
    })
  }

  sumArrayTravmaRezultateNS() {
    this.travmaRezultateNSValue = 0
    this.travmaRezultateNS.map(test => {
      this.travmaRezultateNSValue = test * 1 +  this.travmaRezultateNSValue
    })
  }


  sumArrayVrmennayaNetrudoSposobnost() {
    this.vrmennayaNetrudoSposobnostValue = 0
    this.vrmennayaNetrudoSposobnost.map(test => {
      this.vrmennayaNetrudoSposobnostValue = test * 1 +  this.vrmennayaNetrudoSposobnostValue
    })
  }

  sumArrayGospitalizaciaNS() {
    this.gospitalizaciaNSValue = 0
    this.gospitalizaciaNS.map(test => {
      this.gospitalizaciaNSValue = test * 1 +  this.gospitalizaciaNSValue
    })
  }








  sumArraySmertPoLuboiPromil() {
    this.smertPoLuboiPrichineValuePromil = 0
    this.smertPoLuboiPrichinePromil.map(test => {
      this.smertPoLuboiPrichineValuePromil = test * 1 +  this.smertPoLuboiPrichineValuePromil
    })
  }



  sumArraysmertVrezultateNSPromil() {
    this.smertVrezultateNSValuePromil = 0
    this.smertVrezultateNSPromil.map(test => {
      this.smertVrezultateNSValuePromil = test * 1 +  this.smertVrezultateNSValuePromil
    })
  }


  sumArrayInvalidnosGrupPromil() {
    this.invalidnosGrupValuePromil = 0
    this.invalidnosGrupPromil.map(test => {
      this.invalidnosGrupValuePromil = test * 1 +  this.invalidnosGrupValuePromil
    })
  }

  sumArrayTravmaRezultateNSPromil() {
    this.travmaRezultateNSValuePromil = 0
    this.travmaRezultateNSPromil.map(test => {
      this.travmaRezultateNSValuePromil = test * 1 +  this.travmaRezultateNSValuePromil
    })
  }


  sumArrayVrmennayaNetrudoSposobnostPromil() {
    this.vrmennayaNetrudoSposobnostValuePromil = 0
    this.vrmennayaNetrudoSposobnostPromil.map(test => {
      this.vrmennayaNetrudoSposobnostValuePromil = test * 1 +  this.vrmennayaNetrudoSposobnostValuePromil
    })
  }

  sumArrayGospitalizaciaNSPromil() {
    this.gospitalizaciaNSValuePromil = 0
    this.gospitalizaciaNSPromil.map(test => {
      this.gospitalizaciaNSValuePromil = test * 1 +  this.gospitalizaciaNSValuePromil
    })
  }


   rashetCalculator() {
     this.anderaiting.SMERT_PO_LYUBOI_PRICHINE_PER = this.smertPoLuboiPrichineValue
     this.anderaiting.SMERT_V_RES_NS_PER = this.smertVrezultateNSValue
     this.anderaiting.INVALID_PER_VTOR_RES_NS_PER = this.invalidnosGrupValue
     this.anderaiting.TRAVMA_RES_NS_PER = this.travmaRezultateNSValue
     this.anderaiting.VREM_NETRUDOSPOSOB_NS_PER = this.vrmennayaNetrudoSposobnostValue
     this.anderaiting.GOSPITAL_RES_NS_PER = this.gospitalizaciaNSValue
     this.anderaiting.CNCT_ID = this.numZav.id
     this.anderaiting.ID_RISK = 1
     this.anderaiting.SMERT_PO_LYUBOI_PRICHINE_PRO = this.smertPoLuboiPrichineValuePromil
     this.anderaiting.SMERT_V_RES_NS_PRO = this.smertVrezultateNSValuePromil
     this.anderaiting.INVALID_PER_VTOR_RES_NS_PRO = this.invalidnosGrupValuePromil
     this.anderaiting.TRAVMA_RES_NS_PRO = this.travmaRezultateNSValuePromil
     this.anderaiting.VREM_NETRUDOSPOSOB_NS_PRO = this.vrmennayaNetrudoSposobnostValuePromil
     this.anderaiting.GOSPITAL_RES_NS_PRO = this.gospitalizaciaNSValuePromil

     console.log(this.anderaiting)

     this.analyticsService.anderaiting(this.anderaiting).subscribe(
       (cnctid: {cnctid?: number}) => {
         // this.dopPokrStrahSum.CNCT_ID = cnctid.cnctid
         // this.dopPokrStrahSum.DOP_POKRS_SUMS = this.pokrStringMassive
         // this.newnsjsService.setPokrs(this.dopPokrStrahSum).subscribe(
         //   test =>   console.log(test)
         // )
         // this.router.navigate([`/statment/${cnctid.cnctid}`] )
         console.log(cnctid)
       },
       error => {
         MaterialService.toast(error.error.message)
         this.form.enable()
       }
     )

  this.setTabcontentUtver()


   }
  //   this.answerGen()
  //   this.obtainGenMassiveString()
  //   this.genMassiveStringNagruz()
  //   this.createPokrsString()
  //   //this.yes()
  //   this.answers.map(answer => {
  //     if (!answer.ID_ANSWER) {
  //     } else {
  //       var str1 = new String(answer.ID_QUESTION.toString());
  //       var str2 = new String(answer.ID_ANSWER.toString());
  //       this.massive += str1.toString() + ':' + str2.toString() + ':;';
  //       console.log(this.massive)
  //     }
  //   })
  //
  //   console.log(this.massive)
  //   if (this.agentSelect !== null ) {this.agentSelect = 0} else {this.agentSelect}
  //   if (this.agentRashod !== null ) {this.agentRashod = 0} else {this.agentRashod}
  //
  //   this.statment.BRANCH_ID = this.region.RFBN_ID
  //   this.statment.ZAV_NUMBER = this.numzav
  //   this.statment.DATE_ZAV = this.dateString// {(Date|number|string)}
  //   this.statment.STRAH_VZNOS = this.strahVznos
  //   this.statment.SELECT_ID_AGENT = this.agentSelect
  //   this.statment.AGENT_RASHOD = this.agentRashod
  //   this.statment.PERIOD = this.selectedPeriod.NAME
  //   this.statment.SROK_STRAH = this.srokStrah
  //   this.statment.MAIN_POKR = 1
  //   this.statment.GOD_DOHOD = this.godDohod
  //   this.statment.VIGODO_SMERT = this.stringMassiveSmerts
  //   this.statment.VIGODO_ZHIZN = this.stringMassiveZhizns
  //   this.statment.STRAHOVATEL = this.strahovatel.ID
  //   this.statment.ZASTRAHOVAN = this.zastrahovan.ID
  //   this.statment.ANSWERS = this.massive
  //   this.statment.EMPID = 3853
  //   this.statment.RISK = this.stringMassiveNagruz
  //   console.log(this.statment)
  //
  //   this.massive = '';
  //   this.newnsjsService.createZayav(this.statment).subscribe(
  //     (cnctid: {cnctid?: number}) => {
  //       this.dopPokrStrahSum.CNCT_ID = cnctid.cnctid
  //       this.dopPokrStrahSum.DOP_POKRS_SUMS = this.pokrStringMassive
  //       this.newnsjsService.setPokrs(this.dopPokrStrahSum).subscribe(
  //         test =>   console.log(test)
  //       )
  //       this.router.navigate([`/statment/${cnctid.cnctid}`] )
  //       console.log(cnctid)
  //     },

  //     error => {
  //       MaterialService.toast(error.error.message)
  //       this.form.enable()
  //     }


  //   )
  // }








}
