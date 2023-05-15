import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = ''; //TODO: Replace with your Rails API URL
  constructor(private http: HttpClient) {}

  getTeam(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
