import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ChatData } from '../modelos/chat-data.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  private itemsCollection!: AngularFirestoreCollection<ChatData>;

  public chats: ChatData[] = [];

  constructor(
    private firestore: AngularFirestore,
    private authServices: SeguridadService
  ) {}

  getChats() {
    this.itemsCollection = this.firestore.collection<ChatData>('chats', (ref) => ref.orderBy('fecha', 'desc'));
    //

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: ChatData[]) => {
        console.log(mensajes);

        this.chats = [];

        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

        return this.chats;
      })
    );
  }

  enviarMensaje(mensaje: string) {
    let chat: ChatData = {
      mensaje: mensaje,
      nombre: this.authServices.obtenerSession().datos.nombre,
      idUser: this.authServices.obtenerSession().datos.id,
      rol: this.authServices.obtenerSession().rolUsuario.codigo,
      fecha: new Date().getTime(),
    };

    return this.itemsCollection.add(chat);
  }
}
