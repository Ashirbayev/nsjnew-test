import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {
  AnalyticsPage,
  Answers,
  Category,
  Client,
  Dpokr,
  OverviewPage,
  Position,
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



}
