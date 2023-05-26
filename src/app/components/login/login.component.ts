import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailValue: string = '';
  passwordValue: string = '';
  UserRole = UserRole;
  user = 'user';
  Admin = 'Admin';
  nameValue: string = ''; // Agregue esta línea para almacenar el valor del campo Nombre
  roleValue: UserRole = UserRole.User; // Agregue esta línea para almacenar el valor del campo Rol
  isRegistering: boolean = false; // Agregue esta línea para almacenar el estado del registro

  constructor(private authService: AuthService, 
    private router: Router,
    private userService: UserService) { }


  ngOnInit(): void {
      
  }
  
  onSubmit() {
    if (!this.emailValue || !this.passwordValue) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa los campos de correo usuario y contraseña.',
      });
      return;
    }

    // Validar el correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.emailValue)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo electrónico inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
      });
      return;
    }

    // Validar la contraseña
    if (this.passwordValue.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 8 caracteres.',
      });
      return;
    }

    if (this.isRegistering){
      const nuevoUsuario: User = {name:this.nameValue, email: this.emailValue, password: this.passwordValue, rol: this.roleValue };
      this.userService.createUser(nuevoUsuario).subscribe(usuario => {
        Swal.fire({
          icon: 'success',
          title: `Se ha Registado el usuario ${usuario.name} con éxito!`,
          text: "Recuerda que debes verificar tu cuenta"
        }).then(() => { this.router.navigate(['/']) });
      }); 
    } else {
      this.authService.login({ email: this.emailValue, password: this.passwordValue }).subscribe(() => {
        this.router.navigate(['/']);
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en el inicio de sesión',
          text: error.error.message || 'Hubo un problema al iniciar sesión. Inténtalo de nuevo más tarde.',
        });
      });
    };
  }

}