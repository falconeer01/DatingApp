import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(
    private formBuilder:FormBuilder,
    private accountService:AccountService,
    private toastrService:ToastrService
  ){}

  // Bir parent component ile haberleşmek için Input nesneleri kullanılır. Child componentten parent componente veri göndermek için ise Output nesneleri kullanılır.
  @Input() usersFromHomeComponent:any;
  @Output() cancelRegister = new EventEmitter();

  registerForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  register(){
    this.accountService.register(this.registerForm).subscribe({
      next: user => {
        console.log(user);
        this.cancel();
      },
      error: error => {
        this.toastrService.error(error.error);
        console.log(error);
      }
    });
  }

  cancel(){
    // İlk olarak childdan dışarıya false değeri gönderildi:
    this.cancelRegister.emit(false);
  }
}
