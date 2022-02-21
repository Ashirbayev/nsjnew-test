import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AnalyticsPage, Category, OverviewPage, Position, StatmentT, TestNsj} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  fetch(): Observable<StatmentT[]> {
    return this.http.get<StatmentT[]>('/api/statment');
  }

  //
  // getById(id: string): Observable<StatmentT> {
  //   return this.http.get<StatmentT>(`/api/statment/${id}`)
  // }

  getById(id: number): Observable<StatmentT[]> {
    return this.http.get<StatmentT[]>(`/api/statment/${id}`)
  }



}
