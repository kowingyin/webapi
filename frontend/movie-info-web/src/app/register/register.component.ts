import { NgModule,Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { SessionStorageService} from '../session-storage.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message:object;
  messageForm: FormGroup;   submitted = false;   success = false; Newuseradded = false;messageForm2: FormGroup; registered =false;
 
  constructor(private formBuilder: FormBuilder, private data: DataService, private session: SessionStorageService,private router: Router) { } 
    

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required,Validators.minLength(6)]],
    email: ['', [Validators.required,Validators.email]]
    });
  }
  onSubmit(){
      this.registered = true; 
      if (this.messageForm.invalid) { return window.alert("Invalid input!!Pls. enter again !");}
      this.data.addUser(this.messageForm.controls.name.value,this.messageForm.controls.username.value, this.messageForm.controls.password.value,this.messageForm.controls.email.value)
      .subscribe(data=>{
            this.message = data ;			
        console.log(this.message)
        this.success = true;
      this.Newuseradded = true;
      this.session.setItem("success", `${this.success}`);
      this.session.setItem("username", `${this.messageForm.controls.username.value}`);
      this.session.setItem("password", `${this.messageForm.controls.password.value}`);
    //window.alert( 'New user added. Pls. send confirmation code to complete registration')
    console.log(this.session.getItem("success"))
    console.log(this.session.getItem("username"))
    console.log(this.session.getItem("password"))
    console.log('all set')
    this.router.navigate(['/'])
    })
  }
}