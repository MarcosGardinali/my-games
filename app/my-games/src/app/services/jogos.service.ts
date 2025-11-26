import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Jogo {
  id?: number;
  nome: string;
  descricao: string;
  ano: number;
  plataforma: string;
  foto_url?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class JogosService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getJogos(): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(`${this.apiUrl}/jogos`);
  }

  getJogo(id: number): Observable<Jogo> {
    return this.http.get<Jogo>(`${this.apiUrl}/jogos/${id}`);
  }

  createJogo(jogo: Jogo): Observable<Jogo> {
    return this.http.post<Jogo>(`${this.apiUrl}/jogos`, jogo);
  }

  updateJogo(id: number, jogo: Jogo): Observable<Jogo> {
    return this.http.put<Jogo>(`${this.apiUrl}/jogos/${id}`, jogo);
  }

  deleteJogo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jogos/${id}`);
  }
}