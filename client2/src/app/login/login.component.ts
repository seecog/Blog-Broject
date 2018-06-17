import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth : AngularFireAuth) { }

  ngOnInit() {
  }

  loginf(){
    this._auth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
  
  }

  login(){
    this._auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

}
