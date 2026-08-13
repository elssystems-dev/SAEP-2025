import { Component, OnInit } from '@angular/core';
import { Api } from '../../service/api';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [FormsModule, RouterLink],
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  produtos : any[] = []; // Uma lista com os produtos
  termoBusca: string = ""; // Termo para pesquisa SSR
  produtoAtual = {nome: "", descricao: "", estoqueMinimo: null} // Refere-se aos campos do formulário

  constructor(private api:Api){}

  carregar(){
    this.api.getProdutos().subscribe(res => this.produtos = res); // Preenchendo o vetor de produtos
  }

  // Buscar produtos pelo termo SSR
  buscarServer(){
    this.api.buscarProdutos(this.termoBusca).subscribe(res => this.produtos = res);
  }

  // Busca produtos pelo termo (CSR)
  buscarClient(){
    let produtosFiltrados: any[] = [];
    produtosFiltrados = this.produtos.filter((e) => e.contains(this.termoBusca));
    this.produtos = produtosFiltrados;
  }

  // Salvar produto na API
  salvar(){
    this.api.postProduto(this.produtoAtual).subscribe(() => {
      alert("Produto salvo com sucesso!");
      this.produtoAtual = {nome: "", descricao: "", estoqueMinimo: null};
      this.carregar();
    });
  }

  // Excluir produto na API
  excluir(id:number){
    if (confirm("Tem certeza de sua ação?")) {
      this.api.deleteProduto(id).subscribe(() => {
        this.carregar();
      });
    }
  }

  // Método ao iniciar
  ngOnInit() {
    this.carregar();
  }

}
