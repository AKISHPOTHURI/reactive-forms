import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { forbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private fb: FormBuilder){
    
  }

  registrationForm = this.fb.group({
    userName:['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
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
}
