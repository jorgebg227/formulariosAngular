import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern )]],
    email: ['', [Validators.required, Validators.pattern( this.validatorService.emailPattern )], [ this.emailValidator ]],
    username: ['', [Validators.required, this.validatorService.noPudeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2')]
  });

  get emailErrorMsg(): string {
    const error = this.miFormulario.get('email')?.errors;
    if( error?.required ){
      return 'El email es obligatorio';
    }else if( error?.pattern ){
      return 'El formato del email no es valido';
    }else if( error?.emailUsado ){
      return 'Ese email ya existe';
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Jorge Bahamonde',
      email: 'test1@test.com',
      username: 'userName'
    });
  }

  campoNoValido( campo: string ): boolean | undefined {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(): void{
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
