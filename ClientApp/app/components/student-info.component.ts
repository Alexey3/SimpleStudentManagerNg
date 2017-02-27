import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentDataService, Student } from '../services/student-data.service'

@Component({
    templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit{
    student = new Student();
    errorMessage: string;
    firstName: string;
    lastName: string;

    constructor(
        private route: ActivatedRoute,
        private service:StudentDataService) {}

    ngOnInit(){
        let id = +this.route.snapshot.params['id'];
        this.getStudent(id);
    }

    getStudent(id: number) {
        this.service.getStudent(id)
            .subscribe(
                result => { 
                    this.student = result;
                    var sa = this.student.name.trim().split(' ');
                    if (sa.length > 0)
                        this.firstName = sa[0];
                    if (sa.length > 1) {
                        this.lastName = sa.splice(1).map(o => o).join(' ');
                    }
                },
                error => { this.errorMessage = error }
            );
    }
}