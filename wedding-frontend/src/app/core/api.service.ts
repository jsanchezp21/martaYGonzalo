import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  // Público (invitados)
  rsvp(payload: any) {
    return this.http.post(`${this.base}/rsvp`, payload);
  }

  // ==== Admin (JWT) ====
  adminLogin(username: string, password: string) {
    return this.http.post<{ ok: boolean; token: string }>(`${this.base}/auth/login`, { username, password });
  }

  private authHeaders() {
    const t = sessionStorage.getItem('adminToken') || '';
    return new HttpHeaders({ Authorization: `Bearer ${t}` });
  }

  // Devuelve directamente el array de RSVPs
  listRsvps(params?: {
    attending?: boolean;
    dietaryRestrictions?: boolean;
    bus?: 'ida'|'ida_vuelta'|'ninguno';
    q?: string;
  }) {
    let httpParams = new HttpParams();
    if (params) {
      if (params.attending !== undefined) httpParams = httpParams.set('attending', String(params.attending));
      if (params.dietaryRestrictions !== undefined) httpParams = httpParams.set('dietaryRestrictions', String(params.dietaryRestrictions));
      if (params.bus) httpParams = httpParams.set('bus', params.bus);
      if (params.q) httpParams = httpParams.set('q', params.q);
    }

    return this.http
      .get<{ ok: boolean; items: any[] }>(`${this.base}/rsvp`, {
        headers: this.authHeaders(),
        params: httpParams,
        observe: 'body' as const
      })
      .pipe(map(res => res.items));
  }

  deleteRsvp(id: string) {
    return this.http.delete<{ ok: boolean }>(`${this.base}/rsvp/${id}`, {
      headers: this.authHeaders(),
      observe: 'body' as const
    });
  }
}
