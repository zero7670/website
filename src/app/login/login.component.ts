import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  // An array of objects representing signed-up users
  signupUsers: any[] = [];
  // An object representing the current user being signed up
  signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  // An object representing the current user logging in
  loginObj: any = {
    userName: '',
    password:''
  };
  constructor( public nav: NavbarService ) {}      
  ngOnInit(): void {
    this.nav.hide();
    // Load sign-up data from local storage on component initialization
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null){
      this.signupUsers = JSON.parse(localData);
    }
  }
  // Function to sign up a new user by adding the current signupObj to the signupUsers array and saving to local storage
  onSignUp(){
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signUpUsers',JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      email: '',
      password: ''
    };
  }
  // Function to log in a user by checking if the loginObj matches an object in the signupUsers array
  onLogin(){
    const isUserExist = this.signupUsers.find(m => m.userName == this.loginObj.userName && m.password == this.loginObj.password);  
    if(isUserExist != undefined){
      alert('User Login Successfully')
    } else {
      alert('User Account Does Not Exist')
    }
  }
}
