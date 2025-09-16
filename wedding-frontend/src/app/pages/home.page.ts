import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { ApiService } from '../core/api.service';

type Bus = 'ida'|'ida_vuelta'|'ninguno';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  template: `
    <!-- HERO -->
    <section class="relative min-h-[80vh] grid place-items-center overflow-hidden">
      <img class="absolute inset-0 w-full h-full object-cover hero-img" [src]="env.wedding.heroImageUrl" alt="Pareja" />
      <div class="absolute inset-0 hero-overlay"></div>
      <div class="relative container text-center text-white">
        <h1 class="font-display text-5xl md:text-7xl tracking-tight">Gonzalo & Marta</h1>
        <div class="mt-6 inline-block">
          <div class="flex items-center gap-3 justify-center">
            <div class="bg-white/15 backdrop-blur rounded-xl px-3 py-2"><span class="font-semibold">{{cd().days}}</span> días</div>
            <div class="bg-white/15 backdrop-blur rounded-xl px-3 py-2"><span class="font-semibold">{{cd().hours}}</span> horas</div>
            <div class="bg-white/15 backdrop-blur rounded-xl px-3 py-2"><span class="font-semibold">{{cd().minutes}}</span> min</div>
            <div class="bg-white/15 backdrop-blur rounded-xl px-3 py-2"><span class="font-semibold">{{cd().seconds}}</span> seg</div>
          </div>
          <div class="gold-line mt-3"></div>
        </div>
      </div>
	  <!-- BOTÓN CONFIRMAR EN HERO (nuevo) -->
<div class="absolute inset-x-0 bottom-6 flex justify-center">
  <button class="btn btn-primary text-sm px-4 py-2 shadow-lg shadow-black/20"
          (click)="open=true">
    Confirmar asistencia
  </button>
</div>

    </section>

    <main class="container space-y-12 py-12">
      <!-- NUESTRA HISTORIA -->
      <section class="card bg-cream2 text-greenDark text-center">
        <h2 class="font-display text-3xl">NUESTRA HISTORIA</h2>
        <div class="separator"><span class="dot"></span></div>
        <p class="max-w-3xl mx-auto text-lg">
          Nos conocimos por casualidad y desde entonces caminamos juntos. Compartimos risas, viajes y sueños
          que hoy nos traen hasta aquí. Gracias por formar parte de esta historia que continúa.
        </p>
      </section>

      <!-- CARRUSEL 3D COVERFLOW -->
      <section class="card">
        <h2 class="font-display text-3xl mb-4 text-center">Sí, Quiero</h2>
        <div class="carousel3d relative">
          <button class="btn btn-outline arrow3d left" (click)="prev()" aria-label="Anterior">‹</button>
          <div class="stage3d">
            <figure *ngFor="let p of photos; let i = index"
                    class="slide3d"
                    [ngStyle]="styleFor(i)"
                    [style.zIndex]="zFor(i)"
                    (click)="goTo(i)">
              <img [src]="p" [alt]="'Foto ' + (i+1)">
            </figure>
          </div>
          <button class="btn btn-outline arrow3d right" (click)="next()" aria-label="Siguiente">›</button>
        </div>
      </section>

      <!-- CTA + DETALLES -->
      <section class="grid md:grid-cols-2 gap-6">
        <div class="card">
          <h3 class="font-display text-2xl mb-2">¿Vienes a celebrar con nosotros?</h3>
          <p class="text-grayText mb-4">Confírmanos tu asistencia para poder organizarlo todo con cariño <span class="text-greenSoft">💚</span></p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-primary" (click)="open=true">Confirmar asistencia</button>
              <a class="btn btn-outline" [href]="calendarUrl" target="_blank" rel="noopener">
    <!-- Icono "G" de Google -->
    <svg class="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.2 3.5l6.2-6.2C35.3 2.7 29.9 0.5 24 0.5 14.6 0.5 6.5 5.9 2.5 13.4l7.6 5.9C12 13.5 17.5 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.5-.1-2.9-.4-4.3H24v8.1h12.6c-.5 2.6-2.1 4.8-4.4 6.3l6.8 5.3c4-3.7 6.5-9.1 6.5-15.4z"/>
      <path fill="#FBBC05" d="M10.1 19.3l-7.6-5.9C.9 16 0 19.9 0 24c0 4 1 7.8 2.8 11.1l7.6-5.9C9.6 27.1 9 25.6 9 24s.6-3.1 1.1-4.7z"/>
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-6.8-5.3c-1.9 1.3-4.4 2.1-9 2.1-6.5 0-12-4-13.9-9.5l-7.6 5.9C6.5 42.1 14.6 48 24 48z"/>
    </svg>
    Añadir al calendario
  </a>
          </div>
        </div>

        <div class="card">
          <div class="flex gap-2 mb-4">
            <button class="pill" [ngClass]="{ 'active': tab==='ceremony' }" (click)="tab='ceremony'">Ceremonia</button>
            <button class="pill" [ngClass]="{ 'active': tab==='banquet' }" (click)="tab='banquet'">Banquete</button>
          </div>

          <ng-container *ngIf="tab==='ceremony'; else banquete">
            <h4 class="font-semibold text-lg">Ceremonia</h4>
            <p><b>Fecha:</b> 15/05/2026 · <b>Hora:</b> 12:00</p>
            <p><b>Dirección:</b> {{ env.wedding.locationCeremonyName }}</p>
            <iframe class="w-full h-72 rounded-xl shadow-lg mt-2" [src]="mapSrc(env.wedding.mapsCeremonyQuery)" loading="lazy"></iframe>
            <div class="text-center mt-3">
              <a class="btn btn-primary" [href]="dirUrl(env.wedding.mapsCeremonyQuery)" target="_blank">Llévame</a>
            </div>
          </ng-container>

          <ng-template #banquete>
            <h4 class="font-semibold text-lg">Banquete</h4>
            <p><b>Fecha:</b> 15/05/2026 · <b>Hora:</b> 15:00</p>
            <p><b>Dirección:</b> {{ env.wedding.locationBanquetName }}</p>
            <iframe class="w-full h-72 rounded-xl shadow-lg mt-2" [src]="mapSrc(env.wedding.mapsBanquetQuery)" loading="lazy"></iframe>
            <div class="text-center mt-3">
              <a class="btn btn-primary" [href]="dirUrl(env.wedding.mapsBanquetQuery)" target="_blank">Llévame</a>
            </div>
          </ng-template>
        </div>
      </section>

      <!-- MODAL RSVP -->
      <div *ngIf="open" class="fixed inset-0 bg-black/50 grid place-items-center z-50">
        <div class="bg-white rounded-2xl shadow-2xl w-[95%] max-w-2xl p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold">Confirmación de asistencia</h3>
            <button class="btn btn-outline" (click)="open=false">Cerrar</button>
          </div>
          <form (ngSubmit)="submit()" class="grid gap-3 mt-4">
            <label class="font-semibold">¿Contamos contigo?</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2"><input type="radio" name="attending" [(ngModel)]="form.attending" [value]="true" required> Sí</label>
              <label class="flex items-center gap-2"><input type="radio" name="attending" [(ngModel)]="form.attending" [value]="false"> No</label>
            </div>
            <div class="grid md:grid-cols-2 gap-3">
              <input class="border rounded-xl px-3 py-2" placeholder="Nombre *" name="firstName" [(ngModel)]="form.firstName" required />
              <input class="border rounded-xl px-3 py-2" placeholder="Apellidos *" name="lastName" [(ngModel)]="form.lastName" required />
            </div>
            <input class="border rounded-xl px-3 py-2" type="email" placeholder="Email" name="email" [(ngModel)]="form.email" />
            <div class="grid md:grid-cols-2 gap-3">
              <input class="border rounded-xl px-3 py-2" type="number" min="0" max="10" placeholder="Número de acompañantes" name="plusOnes" [(ngModel)]="form.plusOnes" />
              <input class="border rounded-xl px-3 py-2" placeholder="Nombres y apellidos de acompañantes" name="companions" [(ngModel)]="form.companions" />
            </div>
            <label class="font-semibold">Autobús</label>
            <div class="flex flex-wrap gap-4">
              <label class="flex items-center gap-2"><input type="radio" name="bus" [(ngModel)]="form.bus" value="ida"> Ida</label>
              <label class="flex items-center gap-2"><input type="radio" name="bus" [(ngModel)]="form.bus" value="ida_vuelta"> Ida y vuelta</label>
              <label class="flex items-center gap-2"><input type="radio" name="bus" [(ngModel)]="form.bus" value="ninguno"> No necesito</label>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" name="dietaryRestrictions" [(ngModel)]="form.dietaryRestrictions" id="dietary">
              <label for="dietary">Tengo restricciones alimentarias</label>
            </div>
            <textarea *ngIf="form.dietaryRestrictions" class="border rounded-xl px-3 py-2" placeholder="Cuéntanos los detalles" name="dietaryDetails" [(ngModel)]="form.dietaryDetails"></textarea>
            <textarea class="border rounded-xl px-3 py-2" placeholder="Mensaje opcional" name="message" [(ngModel)]="form.message"></textarea>
            <button class="btn btn-primary mt-2" [disabled]="loading">Enviar</button>
            <div *ngIf="ok" class="badge">¡Gracias, {{form.firstName}}! Hemos registrado tu respuesta.</div>
            <div *ngIf="error" class="text-red-600">{{error}}</div>
          </form>
        </div>
      </div>

      <!-- TIMELINE -->
      <section class="card">
        <h2 class="font-display text-3xl mb-4">Timing del día</h2>
        <div class="timeline grid grid-cols-5 gap-4">
          <div class="timeline-item"><div class="timeline-time">12:00</div><div class="timeline-dot"></div><div class="timeline-title">💍 Ceremonia</div><div class="timeline-desc">Comienza la celebración</div></div>
          <div class="timeline-item"><div class="timeline-time">13:30</div><div class="timeline-dot"></div><div class="timeline-title">🥂 Cóctel</div><div class="timeline-desc">Brindis y fotos</div></div>
          <div class="timeline-item"><div class="timeline-time">15:00</div><div class="timeline-dot"></div><div class="timeline-title">🍽️ Banquete</div><div class="timeline-desc">¡A disfrutar!</div></div>
          <div class="timeline-item"><div class="timeline-time">18:30</div><div class="timeline-dot"></div><div class="timeline-title">🕺 Baile</div><div class="timeline-desc">A la pista</div></div>
          <div class="timeline-item"><div class="timeline-time">20:00</div><div class="timeline-dot"></div><div class="timeline-title">🍹 Barra libre</div><div class="timeline-desc">¡A celebrar!</div></div>
        </div>
        <p class="text-grayText mt-3"><em>* Horarios aproximados. ¡Lo importante es celebrar juntos! 💚</em></p>
      </section>

      <!-- GALERÍA -->
      <section class="card bg-gradient-to-r from-insta1 to-insta2 text-white text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-2xl">📷</span>
          <h2 class="font-display text-3xl">Comparte tus momentos</h2>
        </div>
        <p class="opacity-90">En este álbum puedes compartir cada momento que vivas en nuestra boda y crear recuerdos inolvidables.</p>
        <a class="btn mt-4 bg-white text-insta1 hover:opacity-90" [href]="env.wedding.googlePhotosAlbumUrl" target="_blank">Ver galería</a>
      </section>

      <!-- FOOTER -->
      <footer class="text-center bg-graySoft text-grayText rounded-2xl py-8">
        <p>Gracias por acompañarnos en este día tan especial 💚</p>
        <p>© 2025 Marta & Gonzalo</p>
      </footer>
    </main>
  `
})
export class HomePage implements OnInit, OnDestroy {
  env = environment;

  // Countdown
  date = new Date('2026-05-15T12:00:00+02:00');
  cd = signal({days:0,hours:0,minutes:0,seconds:0});
  private timerId: any;

  // Carrusel 3D
  photos = Array.from({ length: 10 }, (_, i) => `assets/photos/p${i + 1}.jpg`);
  active = signal(0);
  private autoplayId: any;

  // Ajustes de efecto
  private spacing = 120;
  private depthStep = 90;
  private scaleStep = 0.10;
  private maxBlur = 3;
  private centerBoostZ = 140;

  // RSVP
  open = false;
  tab: 'ceremony'|'banquet' = 'ceremony';
  form:any={attending:true,firstName:'',lastName:'',email:'',plusOnes:0,companions:'',bus:'ninguno' as Bus,dietaryRestrictions:false,dietaryDetails:'',message:''};
  loading=false; ok=false; error='';

  constructor(private api: ApiService) {}

  ngOnInit() {
    const tick = () => {
      const diff = Math.max(0, this.date.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      this.cd.set({days:d, hours:h, minutes:m, seconds:s});
    };
    tick(); this.timerId = setInterval(tick, 1000);
    this.startAutoplay();
  }

  ngOnDestroy() { clearInterval(this.timerId); clearInterval(this.autoplayId); }

  startAutoplay(){ clearInterval(this.autoplayId); this.autoplayId=setInterval(()=>this.next(),3500); }
  goTo(i:number){ this.active.set(i); this.startAutoplay(); }
  next(){ this.active.set((this.active()+1)%this.photos.length); }
  prev(){ this.active.set((this.active()-1+this.photos.length)%this.photos.length); }

  private dist(i:number){ const n=this.photos.length; const a=this.active(); let d=i-a; if(d>n/2)d-=n; if(d<-n/2)d+=n; return d; }
  zFor(i:number){ const d=Math.abs(this.dist(i)); return 100-d; }
  styleFor(i:number){
    const d=this.dist(i), ad=Math.abs(d);
    const x=d*this.spacing;
    const z=-ad*this.depthStep + (ad===0? this.centerBoostZ:0);
    const s=Math.max(0.6,1-ad*this.scaleStep)*(ad===0?1.06:1);
    const blur=(ad/(this.photos.length/2))*this.maxBlur;
    const opacity=Math.max(0.4,1-ad*0.12);
    return { transform:`translate(-50%, -50%) translateX(${x}px) translateZ(${z}px) scale(${s})`, filter:`blur(${blur}px)`, opacity: `${opacity}` };
  }

  submit(){
    this.loading=true; this.ok=false; this.error='';
    this.api.rsvp({...this.form}).subscribe({
      next:()=>{ this.loading=false; this.ok=true; },
      error:(e)=>{ this.loading=false; this.error=e?.error?.message||'No se pudo enviar'; }
    });
  }

  mapSrc(q:string){return 'https://www.google.com/maps?q='+encodeURIComponent(q)+'&output=embed'}
  dirUrl(q:string){return 'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(q)}
  get calendarUrl(){
    const start=this.date, end=new Date(this.date.getTime()+8*3600000);
    const pad=(n:number)=>n<10?'0'+n:''+n;
    const fmt=(d:Date)=>`${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
    const params=new URLSearchParams({action:'TEMPLATE',text:'Boda Gonzalo & Marta',details:'¡Te esperamos! 💚',location:this.env.wedding.locationCeremonyName,dates:`${fmt(start)}/${fmt(end)}`,ctz:'Europe/Madrid'});
    return 'https://calendar.google.com/calendar/u/0/r/eventedit?'+params.toString();
  }
}
