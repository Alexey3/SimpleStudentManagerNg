import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

const getStudentsUrl = '/api/StudentData/List';
const getStudentUrl = '/api/StudentData/Get';
const saveStudentsUrl ='/api/StudentData/Save';
const deleteStudentsUrl ='/api/StudentData/Delete';

const getRandomUserUrl = 'https://randomuser.me/api/';

@Injectable()
export class StudentDataService {
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    getStudents(): Observable<Student[]> {
        return this.http.get(getStudentsUrl)
            .map(result => { return result.json() })
            .catch(this.handleError)
    }

    getRandomUser(){
        return this.http.get(getRandomUserUrl)
            .map(result => { 
                var user = result.json().results[0];
                return { name: user.name.first + ' ' + user.name.last, photoUrl: user.picture.large}
            })
            .catch(this.handleError)
    }

    getStudent(id: number){
        return this.http.get(getStudentUrl + '/' + id)
            .map(result => { return result.json() })
            .catch(this.handleError)
    }

    saveStudent(student: Student): Observable<Student> {
        return this.http.post(saveStudentsUrl, student, this.options)
            .map(result => { return result.json() })
            .catch(this.handleError)
    }

    deleteStudent(id: number): Observable<Response> {
        console.log('deleting stud')
        return this.http.delete(deleteStudentsUrl + '/' + id)
            .catch(this.handleError)
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}

export class Student {
    id?: number;
    name: string;
    photoUrl: string;
}
