import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { AppComponent } from './components/app.component'
import { HomeComponent } from './components/home-menu.component';
import { EditStudentComponent } from './components/edit-student.component';
import { StudentListComponent } from './components/student-list.component';
import { StudentInfoComponent } from './components/student-info.component';

import { StudentDataService } from './services/student-data.service'

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        StudentListComponent,
        StudentInfoComponent,
        EditStudentComponent,
        HomeComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'menu', pathMatch: 'full' },
            { path: 'menu', component: HomeComponent },
            { path: 'list', component: StudentListComponent },
            { path: 'info/:id', component: StudentInfoComponent },
            { path: 'add', component: EditStudentComponent },
            { path: 'edit/:id', component: EditStudentComponent },
            { path: '**', redirectTo: '' }
        ])
    ],
    providers:[ StudentDataService ]
})
export class AppModule {
}
