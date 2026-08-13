import { HttpClient } from '@angular/common/http'; // Biblioteca nativa do Angular
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

// Classe de conexão com a API

@Service()
export class Api {

    // Atributo
    private baseUrl = "http://localhost:8080/api";

    // Injetando a biblioteca HttpClient
    private http = inject(HttpClient);

    // Métodos:

    // Login
    login(dados: any): Observable<any> { // Observable => Conexão assíncrona com API
        return this.http.post(`${this.baseUrl}/auth/login`, dados); // Estabelece conexão com a API passando a URL e o body (dados)
    }

    // getProdutos
    getProdutos(): Observable<any> {
        return this.http.get(`${this.baseUrl}/produtos`);
    }

    // buscarProdutos (por partes)
    buscarProdutos(termo:String):Observable<any> {
        return this.http.get(`${this.baseUrl}/produtos?termo=${termo}`);
    }

    // postProdutos
    postProduto(produto:any):Observable<any> {
        return this.http.post(`${this.baseUrl}/produtos`, produto)
    }

    // putProduto
    putProduto(produto:any, id:number):Observable<any> {
        return this.http.put(`${this.baseUrl}/produtos/${id}`, produto)
    }

    //deleteProdutos
    deleteProduto(id:number):Observable<any> {
        return this.http.delete(`${this.baseUrl}/produtos/${id}`)
    }

    //postMovimentacao
    postMovimentacao(movimentacao:any):Observable<any> {
        return this.http.post(`${this.baseUrl}/movimentacao`, movimentacao)
    }

    //getMovimentacao
    getMovimentacao():Observable<any> {
        return this.http.get(`${this.baseUrl}/movimentacao`)
    }
}
