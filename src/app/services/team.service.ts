import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseApiUrl = environment.apiUrl;
  private apiTeamUrl = `${this.baseApiUrl}/teams`;
  constructor(private http: HttpClient) {}

  getTeam(id: number) {
    return this.http.get(`${this.apiTeamUrl}/${id}`);
  }
  getAllTeams(): Observable<any> {
    return this.http.get(`${this.apiTeamUrl}`);
  }
}
