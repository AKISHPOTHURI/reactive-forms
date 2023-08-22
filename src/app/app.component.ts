import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  promise!:any;
  userIsRestricted = false;
  constructor(private fb: FormBuilder){
    
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

}
