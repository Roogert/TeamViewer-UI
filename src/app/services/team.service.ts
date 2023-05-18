import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

interface Team {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseApiUrl = environment.apiUrl;
  private apiTeamUrl = `${this.baseApiUrl}/teams`;

  constructor(private http: HttpClient, private auth: AuthServiceService) {}

  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiTeamUrl}/${id}`);
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiTeamUrl);
  }

  createTeam(team: Team) {
    const headers = { Authorization: 'Bearer ' + this.auth.getToken() };
    return this.http.post<Team>(this.apiTeamUrl, team, { headers });
  }
}
