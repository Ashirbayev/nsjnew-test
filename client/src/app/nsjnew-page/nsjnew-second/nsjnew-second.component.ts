import {Component, OnInit} from '@angular/core';
import {NewnsjService} from "../../shared/services/newnsj.service";
import {Answer, Question, Region, TestNsj} from "../../shared/interfaces";

@Component({
  selector: 'app-nsjnew-second',
  templateUrl: './nsjnew-second.component.html',
  styleUrls: ['./nsjnew-second.component.css']
})
export class NsjnewSecondComponent implements OnInit {

  questions: Question [] = []

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


  answers: Answer [] = []
  answer: Answer
  quest1: boolean = false


  constructor(private newnsjsService: NewnsjService) {
  }

  ngOnInit(): void {
    this.getQuestion()
  }

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




  createSends() {
    this.yes()
  this.answers.map(answer => {
    console.log(answer)

      if (!answer.ID_ANSWER) {


      } else {
        this.newnsjsService.createAnswer(answer).subscribe(test => {
          console.log(test)

      })}
    this.answers = [];


  })}


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
