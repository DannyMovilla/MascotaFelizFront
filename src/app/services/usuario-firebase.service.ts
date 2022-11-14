import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { DatosLogin } from '../modelos/datos-login';

@Injectable({
  providedIn: 'root',
})
export class UsuarioFirebaseService {
  private itemsCollection!: AngularFirestoreCollection<DatosLogin>;

  public chats: DatosLogin[] = [];

  constructor(private firestore: AngularFirestore) {}

  getUsuarios() {
    this.itemsCollection = this.firestore.collection<DatosLogin>('usuarios');

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: DatosLogin[]) => {
        console.log(mensajes);

        this.chats = [];

        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

        return this.chats;
      })
    );
  }

  loguearUsuario(dataLogin: DatosLogin) {
    this.itemsCollection = this.firestore.collection<DatosLogin>('usuarios');

    const id = this.firestore.createId();
    localStorage.setItem('userId', id);
    this.itemsCollection.doc(id).set(dataLogin);
  }

  public deleteUser() {
    let documentId = localStorage.getItem('userId');
    if (documentId) {
      this.firestore.collection('usuarios').doc(documentId).delete();
      localStorage.removeItem('userId');
    }
  }
}
