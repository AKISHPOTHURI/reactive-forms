import { AbstractControl, FormControl } from '@angular/forms';

export function PasswordValidator(control: AbstractControl): {[key: string]: boolean} | null {
    
    let password:any = control.get(['password'])
    const confirmPassword = control.get(['confirmPassword']);
    console.log(control);

    console.log(confirmPassword);

 
    return (password && confirmPassword && password.value !== confirmPassword.value) ? {'misMAtch': true}: null;
}
