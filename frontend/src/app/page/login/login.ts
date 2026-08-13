import { Component, NgModule } from '@angular/core';
import { Api } from '../../service/api';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})

export class Login {
  // Atributos
  credenciais = {login: "", senha: ""};

  constructor(private api:Api, private router: Router){}

  entrar(){
    this.api.login(this.credenciais).subscribe({
      next: (usuario) => {
        // Armazenar no localStorage (cache do navegador)
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        
        // Navegar para a página home
        this.router.navigate(["/home"]);
      },

      // Verificar erro
      error: () => {
        alert("Falha de autenticação. Usuário ou senha incorreto(s)");
      }
    });
  }
}
