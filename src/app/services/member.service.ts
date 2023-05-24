import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Member {
  first_name: string;
  last_name: string;
  job_title: string;
  team_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseApiUrl = environment.apiUrl;
  private apiMemberUrl = `${this.baseApiUrl}/members`;

  constructor(private http: HttpClient, private auth: AuthServiceService) {}

  getMember(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiMemberUrl}/${id}`);
  }

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiMemberUrl);
  }

  createMember(member: Member): Observable<Member> {
    const headers = { Authorization: 'Bearer ' + this.auth.getToken() };
    return this.http.post<Member>(this.apiMemberUrl, member, { headers });
  }

  updateMember(member: Member): Observable<Member> {
    const headers = { Authorization: 'Bearer ' + this.auth.getToken() };
    return this.http.put<Member>(
      `${this.apiMemberUrl}/${member.team_id}`,
      member,
      { headers }
    );
  }

  deleteMember(id: number): Observable<{}> {
    const headers = { Authorization: 'Bearer ' + this.auth.getToken() };
    return this.http.delete(`${this.apiMemberUrl}/${id}`, { headers });
  }
}
