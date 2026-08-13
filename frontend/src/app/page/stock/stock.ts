import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../../service/api';

@Component({
  selector: 'app-stock',
  imports: [FormsModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})

export class Stock {
  produtos: any[] = []; // Vetor para armazenar os produtos
  movimentacoes : any[] = []; // Vetor para armazenar as movimentações
  novaMovimentacao = {produto: {id:null}, usuario: {id:null}, tipo: "", quantidade: 0, dataMovimentacao: ""}

  constructor(private api: Api){}

  carregar(){
    this.api.getMovimentacao().subscribe(res => this.movimentacoes = res);
    this.api.getProdutos().subscribe(res => this.produtos = res);
    this.ordenarProdutos();
  }


  // Ordenar as movimentações por produto
  // Ordenar produtos em ordem alfabética
  ordenarProdutos(){ // CSR
    this.movimentacoes.sort((a, b) => a.produto.nome.localeCompare(b.produto)); // Ordena a lista de movimentações em ordem alfabética de produtos
    this.produtos.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena a lista de produtos em ordem alfabética do nome do produto
  }

  registrarMovimentacao() {
    // Validar se a quantidade é maior que a solicitada
    const produtoSel = this.produtos.find(p => p.id === this.novaMovimentacao.produto.id); // Procurando se o produto existe
    if (this.novaMovimentacao.tipo === "saida" && this.novaMovimentacao.quantidade > produtoSel.estoqueAtual) {
      alert("Erro: Quantidade de saída maior que a quantidade em estoque");
      return;
    }

    // Atualizo a quantidade de produtos
    produtoSel.estoqueAtual = this.novaMovimentacao.tipo === "saida" 
    ? produtoSel.estoqueAtual - this.novaMovimentacao.quantidade 
    : produtoSel.estoqueAtual + this.novaMovimentacao.quantidade

    this.api.postMovimentacao(this.novaMovimentacao).subscribe(() => {
      next: () => {
        alert(`Movimentação: [{this.novaMovimentacao.tipo.}] registrada com sucesso`);
        // Atualizar produto
        this.api.putProduto(produtoSel.id, produtoSel);
        this.carregar();
        this.novaMovimentacao = {
          produto: {id:null}, 
          usuario: {id:null}, 
          tipo: "", 
          quantidade: 0, 
          dataMovimentacao: ""
        }
      }
      error: (e:any) => {
        alert(`Erro: ${e.message}`);
      }
    })
  }
}