import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentDataService, Student } from '../services/student-data.service'

@Component({
    templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit{
    student = new Student();
    errorMessage: string;

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
                result => { this.student = result },
                error => { this.errorMessage = error }
            );
    }
}