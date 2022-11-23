import { AbstractControl } from '@angular/forms';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password')?.value;
    let confirmPassword = abstractControl.get('confirmarPassword')?.value;

    if (password != confirmPassword || confirmPassword != password) {
      abstractControl.get('confirmarPassword')?.setErrors({
        MatchPassword: true,
      });
    } else {
      return null;
    }
  }
}
