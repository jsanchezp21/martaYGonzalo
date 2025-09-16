import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Router } from '@angular/router';

interface Rsvp {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  attending: boolean;
  plusOnes: number;
  companions?: string;
  bus: 'ida'|'ida_vuelta'|'ninguno';
  dietaryRestrictions: boolean;
  dietaryDetails?: string;
  message?: string;
  createdAt?: string;
}

type BoolFilter = 'all' | 'yes' | 'no';
type BusFilter = 'all' | 'ida' | 'ida_vuelta' | 'ninguno';

@Component({
  standalone: true,
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, DatePipe],
  template: `
    <section class="container py-10 space-y-6">
      <div class="flex flex-wrap items-end gap-3">
        <h1 class="font-display text-3xl">Admin</h1>
        <span class="badge" *ngIf="filtered().length">Mostrando {{filtered().length}} / {{items().length}}</span>
        <div class="ml-auto flex gap-2">
          <button class="btn btn-primary" (click)="reload()" [disabled]="loading">Refrescar</button>
          <button class="btn btn-outline" (click)="exportCsv()" [disabled]="!filtered().length">Exportar Excel</button>
		  <button class="btn btn-outline" (click)="logout()">Salir</button>
        </div>
      </div>

      <!-- FILTROS -->
      <div class="card grid md:grid-cols-5 gap-3">
        <div>
          <label class="text-sm text-grayText">Asistencia</label>
          <select class="border rounded-xl px-3 py-2 w-full" [(ngModel)]="attendingF">
            <option value="all">Todos</option>
            <option value="yes">Sí asisten</option>
            <option value="no">No asisten</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-grayText">Intolerancias</label>
          <select class="border rounded-xl px-3 py-2 w-full" [(ngModel)]="dietaryF">
            <option value="all">Todas</option>
            <option value="yes">Con restricciones</option>
            <option value="no">Sin restricciones</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-grayText">Bus</label>
          <select class="border rounded-xl px-3 py-2 w-full" [(ngModel)]="busF">
            <option value="all">Todos</option>
            <option value="ida">Ida</option>
            <option value="ida_vuelta">Ida y vuelta</option>
            <option value="ninguno">No necesita</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="text-sm text-grayText">Buscar (nombre, apellidos, email)</label>
          <input class="border rounded-xl px-3 py-2 w-full" [(ngModel)]="q" placeholder="Buscar...">
        </div>
        <div class="md:col-span-5">
          <button class="btn btn-outline" (click)="clearFilters()">Limpiar filtros</button>
        </div>
      </div>

      <!-- LISTA EN TARJETAS -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <article *ngFor="let r of filtered()" class="card">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-semibold text-lg">{{ r.firstName }} {{ r.lastName }}</h3>
              <div class="text-sm text-grayText">{{ r.email || '—' }}</div>
            </div>
            <span class="badge" [ngClass]="r.attending ? 'bg-greenSoft/40' : 'bg-graySoft'">
              {{ r.attending ? 'Asiste' : 'No asiste' }}
            </span>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div><b>Acompañantes:</b> {{ r.plusOnes ?? 0 }}</div>
            <div><b>Bus:</b> {{ r.bus }}</div>
            <div class="col-span-2" *ngIf="r.companions"><b>Compañeros:</b> {{ r.companions }}</div>
            <div class="col-span-2">
              <b>Restricciones:</b>
              <ng-container *ngIf="r.dietaryRestrictions; else sinDiet">
                {{ r.dietaryDetails || 'Sí' }}
              </ng-container>
              <ng-template #sinDiet>—</ng-template>
            </div>
            <div class="col-span-2" *ngIf="r.message"><b>Mensaje:</b> {{ r.message }}</div>
            <div class="col-span-2 text-grayText">{{ r.createdAt ? (r.createdAt | date:'short') : '' }}</div>
          </div>

          <div class="mt-3 flex gap-2">
            <button class="btn btn-outline" (click)="remove(r)">Borrar</button>
          </div>
        </article>
      </div>

      <div class="text-red-600" *ngIf="error">{{error}}</div>
      <div *ngIf="!loading && !filtered().length" class="text-grayText">No hay resultados con los filtros actuales.</div>
    </section>
  `
})
export class AdminPage implements OnInit {
  items = signal<Rsvp[]>([]);
  loading = false;
  error = '';

  // Filtros UI
  attendingF: BoolFilter = 'all';
  dietaryF: BoolFilter = 'all';
  busF: BusFilter = 'all';
  q = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const t = sessionStorage.getItem('adminToken');
    if (!t) { this.router.navigateByUrl('/__login'); return; }
    this.reload();
  }

  logout() {
    sessionStorage.removeItem('adminToken');
    this.items.set([]);
    this.router.navigateByUrl('/__login');
  }

  clearFilters() {
    this.attendingF = 'all';
    this.dietaryF = 'all';
    this.busF = 'all';
    this.q = '';
  }

  // Filtrado en cliente (rápido). Si prefieres servidor, usa this.api.listRsvps({...})
  filtered = computed(() => {
    const q = this.q.trim().toLowerCase();
    return this.items().filter(r => {
      if (this.attendingF !== 'all' && r.attending !== (this.attendingF === 'yes')) return false;
      if (this.dietaryF !== 'all' && r.dietaryRestrictions !== (this.dietaryF === 'yes')) return false;
      if (this.busF !== 'all' && r.bus !== this.busF) return false;
      if (q) {
        const hay = (r.firstName + ' ' + r.lastName + ' ' + (r.email || '')).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  });
  
  
  exportCsv() {
  const rows = this.filtered();
  if (!rows.length) return;

  const headers = [
    'Fecha','Nombre','Apellidos','Email','Asiste','Acompañantes','Compañeros',
    'Bus','Restricciones','Detalles','Mensaje'
  ];

  const esc = (v: any) => {
    const s = (v ?? '').toString().replace(/"/g, '""');
    return `"${s}"`;
  };

  const lines = [headers.map(esc).join(';')]; // ; para Excel ES

  for (const r of rows) {
    const fecha = r.createdAt ? new Date(r.createdAt).toLocaleString('es-ES') : '';
    const line = [
      fecha,
      r.firstName || '',
      r.lastName || '',
      r.email || '',
      r.attending ? 'Sí' : 'No',
      r.plusOnes ?? 0,
      r.companions || '',
      r.bus || '',
      r.dietaryRestrictions ? 'Sí' : 'No',
      r.dietaryRestrictions ? (r.dietaryDetails || '') : '',
      r.message || ''
    ].map(esc).join(';');
    lines.push(line);
  }

  // BOM para que Excel respete UTF-8
  const csv = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const ts = new Date();
  const pad = (n:number) => (n < 10 ? '0'+n : ''+n);
  const fname = `rsvps_${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}_${pad(ts.getHours())}${pad(ts.getMinutes())}.csv`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fname;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

  
  

reload() {
  this.loading = true; this.error = '';
  this.api.listRsvps().subscribe({
    next: (items) => { // ahora llega directamente el array
      this.items.set(items as Rsvp[]);
      this.loading = false;
    },
    error: (e) => {
      this.loading = false;
      this.error = e?.error?.message || 'Error cargando';
      if (e?.status === 401) this.logout();
    }
  });
}



  remove(r: Rsvp) {
    if (!confirm(`¿Borrar a ${r.firstName} ${r.lastName}?`)) return;
    this.api.deleteRsvp(r._id).subscribe({
      next: () => this.reload(),
      error: (e) => { this.error = e?.error?.message || 'No se pudo borrar'; if (e?.status === 401) this.logout(); }
    });
  }
}
