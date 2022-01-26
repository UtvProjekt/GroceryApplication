import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Grocery } from "./Grocery";

@Injectable({providedIn: 'root'})
export class GroceryService {

    constructor(public httpClient: HttpClient) { }

    public getSearchData(searchString: String): Observable<String> {
        return this.httpClient.post<String>(`http://localhost:25000/grocery/page/grocery/searchforgroceries/`, searchString)
    }

    public getGroceryData(): Observable<Grocery[]> {
        return this.httpClient.get<Grocery[]>('http://localhost:25000/grocery/page/grocery/getallgroceries')
    }

    public createGrocery(grocery: Grocery): Observable<Grocery>{
        return this.httpClient.post<Grocery>('http://localhost:25000/grocery/page/grocery/addgrocery', grocery)
    }

    public deleteGrocery(grocery: Number): Observable<Number>{
        return this.httpClient.delete<Number>("http://localhost:25000/grocery/page/grocery/deletegrocery/" + grocery)
    }

    public filterGrocery(filter: String): Observable<Grocery[]> {
        return this.httpClient.get<Grocery[]>("http://localhost:25000/grocery/page/grocery/filtergroceries/" + filter)
    }
}