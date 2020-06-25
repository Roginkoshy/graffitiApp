import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SHA256, enc } from "crypto-js";
import { UserService } from '../user.service';
import { GlobalDataService } from '../global-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:UserService,private global:GlobalDataService,private router:Router) { }


  form = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    firstName : new FormControl('',Validators.required),
    lastName : new FormControl('',Validators.required),
    department : new FormControl('',Validators.required),
  });

  department="COED";
  ngOnInit() {
  }


  setDepartment(v){
    this.department=v;
  }

  signup(){
    let username=this.form.get('username').value;
    let firstName=this.form.get('firstName').value;
    let lastName=this.form.get('lastName').value;
    let password=this.form.get('password').value;
    const hashedPass = SHA256(password).toString(enc.Hex);
    this.userService.createUser({"userId":username,"firstName":firstName,"lastName":lastName,"password":hashedPass,"department":this.department}).subscribe(res=>{
      if(!res.action){
        console.log(res.message);
      }
      else{
        this.global.loggedInUsername=username;
        this.router.navigate([`/dashboard/${this.global.loggedInUsername}`]);
      }
    })
  }

}
