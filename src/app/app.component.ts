import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms'
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator'
import { Observable, exhaustMap, filter, interval, switchMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  promise!:any;
  userIsRestricted = false;
  constructor(private fb: FormBuilder, private http:HttpClient){
    this.Maps();
  }

  registrationForm = this.fb.group({
    userName:['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)],this.isRestrictedUser],
    password:[''],
    confirmPassword:['',PasswordValidator],
    address:this.fb.group({
      city:[''],
      state:[''],
      postalCode:['']
    })
  });

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Akish'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

  loadApiData() {
    this.registrationForm.patchValue({
      userName: 'Dell',
      password: 'Dell',
      confirmPassword: 'Dell',
    });
  }

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

 user(data:any){
  console.log(data);
 }

  // Async Validators
  isRestrictedUser(control:FormControl) : Promise<any> | Observable<any> {

    let promise = new Promise((resolve,reject) =>{
      setTimeout(() => {
        if(control.value === 'akash'){ //this name is restricted
          resolve({'restricted': true})
        } else {
          resolve(null)
        }
      }, 2000)
    } )
    return promise;
  }


  // MergeMap vs ConcatMap vs SwitchMap vs ExhaustMap
  Maps(){
    let postIds = interval(1).pipe(
      filter((val) => val > 0),
      take(5)
    );
    postIds.pipe(
      switchMap((id) => {
        return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      })
    )
    .subscribe((postDetails) => {
      console.log(postDetails);
      
    })
  }

}
