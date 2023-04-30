import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Result } from './models';

const BGG_URL = 'http://localhost:8080/api/bgg'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  form!:FormGroup
  result$!:Subscription
  results: any
  notFound = false

  constructor(private fb:FormBuilder, private http:HttpClient){}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      name:this.fb.control('',Validators.required)
    })
  }

  // GET http://localhost:8080/api/bgg?name=NAME
  search(){

    this.notFound = false // reset notFound

    // create query param
    const params = new HttpParams().set('name',this.form.value['name'])

    this.result$ = this.http.get(BGG_URL,{params}).subscribe({
      next: r => {this.results = r},
      error: err => {
        this.notFound = true
        console.error('ERROR: ', err)
      },
      complete() {
        console.warn('......COMPLETE: ')
      }
    })

  }
  
}
