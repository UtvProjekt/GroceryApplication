import { Injectable } from "@angular/core";
import { Login } from './Login'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { NgForm } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(private httpClient: HttpClient) { }

    public getData(): Observable<Login[]> {
        return this.httpClient.get<Login[]>('http://localhost:25000/grocery/page/signin/getallusers')
    }

    public createUser(login: Login): Observable<Login>{
        return this.httpClient.post<Login>('http://localhost:25000/grocery/page/signin/adduser', login)
    }

    public getPasswordByEmail(email: string): Observable<string>{
        return this.httpClient.get<string>(`http://localhost:25000/grocery/page/signin/checkpassword/${email}`)
    }

    /* UPDATE AND DELETE
    public updateData(error: ErrorMessage): Observable<ErrorMessage> {
        return this.httpClient.put<ErrorMessage>('http://localhost:25000/ErrorApplication/api/error/updateerror', error)
    }

    public deleteData(id: number): Observable<number> {
        return this.httpClient.delete<number>(`http://localhost:25000/ErrorApplication/api/error/deleteerror/${id}`)
    }
    */
}