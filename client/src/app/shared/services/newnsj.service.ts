import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Answer, Category, DataIIN, findIIN, Numzav, Order, Question, Region, TestNsj} from "../interfaces";


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

  getZavNum(id: number): Observable<Numzav[]> {
    return this.http.get<Numzav[]>(`/api/regions/${id}`)
  }

  getAllQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(`/api/question`)
  }


  createAnswer(answer: Answer) {
    const body = {ID_QUESTION: answer.ID_QUESTION, ID_ANSWER: answer.ID_ANSWER};
    return this.http.post('/api/nsjnew', body)
    console.log(body)
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
