import { Component, OnInit } from '@angular/core';
import {NewnsjService} from "../../shared/services/newnsj.service";
import {Answer, Question, TestNsj} from "../../shared/interfaces";

@Component({
  selector: 'app-nsjnew-second',
  templateUrl: './nsjnew-second.component.html',
  styleUrls: ['./nsjnew-second.component.css']
})
export class NsjnewSecondComponent implements OnInit {


  questions: Question [] = []


  answer1: string
  answer2: string


  answers: Answer [] = []
  answer: Answer
  quest1: boolean = false


  constructor(private newnsjsService: NewnsjService) { }

  ngOnInit(): void {
    this.getQuestion()
  }

getQuestion(){
  return this.newnsjsService.getAllQuestion()
    .subscribe(test => {
      this.questions = test
      console.log(test)
    })
}




  yes() {
    this.answer = {ID_QUESTION: 1,
                   ID_ANSWER: this.answer1}
    this.newnsjsService.createAnswer(this.answer).subscribe(test => {

      console.log( test)
    })
    console.log(this.answer)


    // answer: Answer
    //
    // answer.ID_QUESTION = 1
    // answer.ID_ANSWER = "да"
    // this.answers.push(this.answer1)

  }

  no() {
    this.quest1 = false
    this.answers[0][1] = 0
    console.log(this.answers)
  }
}
