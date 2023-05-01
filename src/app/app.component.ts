import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { MongoResult, Result } from './models';

const BGG_URL = 'http://localhost:8080/api/bgg'
const BGG_MONGO_URL = 'http://localhost:8080/api/bgg/mongo' // for mongo

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  form!:FormGroup
  result$!:Subscription
  notFound = false
  // results!: Result[] // method 1
  // results: Result[] = [] // method 2
  mongoResult!: MongoResult // method 3

  constructor(private fb:FormBuilder, private http:HttpClient){}

  ngOnInit(): void {
    this.form = this.createForm()
  }

  createForm(): FormGroup {
    return this.fb.group({
      name:this.fb.control('',Validators.required)
    })
  }

  // // // ======== Method 1: ========
  // // // GET http://localhost:8080/api/bgg?name=NAME
  // search(){

  //   this.notFound = false // reset notFound

  //   // create query param
  //   const params = new HttpParams().set('name',this.form.value['name'])

  //   this.result$ = this.http.get(BGG_URL,{params}).subscribe({
  //     next: r => {this.results = r as Result[]},
  //     error: err => {
  //       this.notFound = true
  //       console.error('ERROR: ', err)
  //     },
  //     complete() {
  //       console.warn('......COMPLETE: ')
  //     }
  //   })

  // }

  // // ======== Method 2: ========
  // // GET http://localhost:8080/api/bgg?name=NAME
  // search(){

  //   this.notFound = false // reset notFound

  //   // create query param
  //   const params = new HttpParams().set('name',this.form.value['name'])

  //   this.result$ = this.http.get(BGG_URL,{params})
  //     .pipe(
  //       map((r:any) => r as any[]), // extract as a array
  //       map((ar:any[]) => ar.map( e => {e as Result ; this.results.push(e)} )) // use array.map() to extract every element in the array as Result
  //       )
  //     .subscribe({})

  // }

   // // ======== Method 3 (MongoDB): ========
  // // GET http://localhost:8080/api/bgg/mongo?name=NAME
  search(){

    this.notFound = false // reset notFound

    // create query param
    const params = new HttpParams().set('name',this.form.value['name'])

    this.result$ = this.http.get(BGG_MONGO_URL,{params}).subscribe({
      next: r => {this.mongoResult = r as MongoResult, console.info(">> r is ", r)},
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
