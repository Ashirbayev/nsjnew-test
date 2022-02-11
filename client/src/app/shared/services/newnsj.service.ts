import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {
  Answer,
  Category,
  DataIIN,
  findIIN, Message,
  Numzav,
  Order,
  Question,
  Region,
  Statment,
  TestNsj,
  Vigodo
} from "../interfaces";


@Injectable({
  providedIn: 'root'
})

export class NewnsjService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<TestNsj[]> {
    return this.http.get<TestNsj[]>('/api/nsjnew');
  }

  getById(id: number): Observable<TestNsj[]> {
    return this.http.get<TestNsj[]>(`/api/nsjnew/${id}`)
  }

  getAllRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(`/api/regions`)
  }

  getAgents(): Observable<Region[]> {
    return this.http.get<Region[]>(`/api/agents`)
  }

  getZavNum(id: number): Observable<Numzav[]> {
    return this.http.get<Numzav[]>(`/api/regions/${id}`)
  }

  getAllQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`/api/question`)
  }

  getPokrs(): Observable<Question[]> {
    return this.http.get<Question[]>(`/api/pokrs`)
  }

  setPokrs(): Observable<Question[]> {
    return this.http.get<Question[]>(`/api/pokrs`)
  }

  getAllAgents(): Observable<Question[]> {
    return this.http.get<Question[]>(`/api/agents`)
  }


  createAnswer(answer: Answer) {
    //const body = {ID_QUESTION: answer.ID_QUESTION, ID_ANSWER: answer.ID_ANSWER};

    return this.http.post('/api/nsjnew', answer)
    //console.log(body)
  }

  createZayav(statment: Statment) {
    //const body = {ID_QUESTION: answer.ID_QUESTION, ID_ANSWER: answer.ID_ANSWER};

    return this.http.post('/api/statment', statment)
    //console.log(body)
  }

  createObtain(vigodo: Vigodo) {
    //const body = {ID_QUESTION: answer.ID_QUESTION, ID_ANSWER: answer.ID_ANSWER};

    return this.http.post('/api/vigodos', vigodo)
    //console.log(body)
  }

  deleteObtain(ID: number) :any {
     this.http.delete(`/api/vigodos${ID}`)
  }


  // findByIIN(params: any = {}): Observable<DataIIN[]> {
  //   return this.http.get<DataIIN[]>('/api/nsjnew',
  //     {
  //       params: new HttpParams({
  //         fromObject{
  //
  //         }
  //       })
  //     })
 // }





}
