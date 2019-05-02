import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { DataService } from '../data.service'; 
import { SessionStorageService} from '../session-storage.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
    
  }
}
