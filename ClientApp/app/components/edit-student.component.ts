import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentDataService, Student } from '../services/student-data.service'

@Component({
    templateUrl: './edit-student.component.html'
})
export class EditStudentComponent implements OnInit {
    student = new Student();
    errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router, 
        private service:StudentDataService) {        
    }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        if (id) 
            this.getStudent(id);
        else
            this.student.photoUrl = '/images/noavatar.png';
    }

    getStudent(id: number) {
        this.service.getStudent(id)
            .subscribe(
                result => { this.student = result },
                error => { this.errorMessage = error }
            );
    }

    getRandomStudent() {
        this.service.getRandomUser()
            .subscribe(
                result =>{ this.student = result },
                error => { this.errorMessage = error }
            );
    }

    cancelClick(){
        this.navigateBack();
    }

    deleteClick() {
        this.service.deleteStudent(this.student.id)
        .subscribe(
            result => { this.router.navigate(['/list']) },
            error => { this.errorMessage = error }
        );
    }

    saveStudent() {
		if (this.student.name) {
            this.service.saveStudent(this.student)
            .subscribe(
                result =>{ 
                    this.student = result;
                    this.navigateBack();
                },
                error => { this.errorMessage = error }
            );
        }
        else{
            this.errorMessage = "Please enter student's name";
        }
    }

    private navigateBack(){
        if (this.student.id)
            this.router.navigate(['/list']);
        else
            this.router.navigate(['/menu']);
    }
}