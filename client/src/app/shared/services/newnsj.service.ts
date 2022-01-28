import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Category, DataIIN, findIIN, Order, TestNsj} from "../interfaces";
import { map } from 'rxjs/operators';

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
