import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {
  AnalyticsPage, Anderaiting,
  Answers,
  Category,
  Client,
  Dpokr, Nagruz, Obtain,
  OverviewPage,
  Position, Statment,
  StatmentT,
  TestNsj
} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/statments/overview')
  }

  fetch(): Observable<StatmentT[]> {
    return this.http.get<StatmentT[]>('/api/statment');
  }


  getById(id: number): Observable<StatmentT[]> {
    return this.http.get<StatmentT[]>(`/api/statment/${id}`)
  }

  getAnswerById(id: number): Observable<Answers[]> {
    return this.http.get<Answers[]>(`/api/answers/${id}`)
  }

  getClientById(id: number): Observable<Client[]> {
    return this.http.get<Client[]>(`/api/client/${id}`)
  }

  getDopPokrById(id: number): Observable<Dpokr[]> {
    return this.http.get<Dpokr[]>(`/api/dpokrs/${id}`)
  }

  getObtainById(id: number): Observable<Obtain[]> {
    return this.http.get<Obtain[]>(`/api/obtain/${id}`)
  }

  getNagruzById(id: number): Observable<Nagruz[]> {
    return this.http.get<Nagruz[]>(`/api/nagruz/${id}`)
  }


  update(statmentT: StatmentT) {
    return this.http.patch(`/api/statment/${statmentT.CNCT_ID}`, statmentT)
  }



  anderaiting(anderaiting: Anderaiting) {
    //const body = {ID_QUESTION: answer.ID_QUESTION, ID_ANSWER: answer.ID_ANSWER};
    return this.http.post('/api/anderaiting', anderaiting)
    //console.log(body)
  }



  // update(id: number): Observable<Category> {
  //     return this.http.patch<Category>(`/api/category/${id}`)
  // }





}
