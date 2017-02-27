import { Component, OnInit } from '@angular/core';

import { StudentDataService, Student } from '../services/student-data.service'

@Component({
    templateUrl: './student-list.component.html'
})
export class StudentListComponent implements OnInit {
    students: Student[];
    errorMessage: string;

    constructor(private service: StudentDataService) {}

    ngOnInit(){
        this.getStudents();
    }

    getStudents() {
        this.service.getStudents()
            .subscribe(
                result => { this.students = result; },
                error => { this.errorMessage = error }
            );
    }
}

