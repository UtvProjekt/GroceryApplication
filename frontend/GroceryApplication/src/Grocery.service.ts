import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class GroceryService {

    constructor(public httpClient: HttpClient) { }

    public getSearchData(searchString: String): Observable<String> {
        return this.httpClient.post<String>(`http://localhost:25000/grocery/page/grocery/searchforgroceries/`, searchString)
    }
}