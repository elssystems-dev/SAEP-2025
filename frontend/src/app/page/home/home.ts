import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  nomeUsuario: string = "";
  
  constructor(private router:Router){}

  // Será executado antes da renderização da página
  ngOnInit(){
    // Pegar as informações do localStorage
    const user = JSON.parse(localStorage.getItem("usuarioLogado") ?? "{}");
    this.nomeUsuario = user.nome || "Visitante";
  }

  logout(){
    localStorage.removeItem("usuarioLogado");
    this.router.navigate(["/login"]);
  }
}
