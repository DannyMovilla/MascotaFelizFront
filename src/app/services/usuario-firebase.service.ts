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

  public usuarios: DatosLogin[] = [];

  constructor(private firestore: AngularFirestore) {}

  getUsuarios() {
    this.itemsCollection = this.firestore.collection<DatosLogin>('usuarios');

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: DatosLogin[]) => {
        this.usuarios = [];
        for (let mensaje of mensajes) {
          this.usuarios.unshift(mensaje);
        }
        return this.usuarios;
      })
    );
  }

  loguearUsuario(dataLogin: DatosLogin) {
    this.itemsCollection = this.firestore.collection<DatosLogin>('usuarios');

    let usuariosChat: DatosLogin[] = [];

    this.itemsCollection.valueChanges().pipe(
      map((mensajes: DatosLogin[]) => {
        usuariosChat = [];
        for (let mensaje of mensajes) {
          usuariosChat.unshift(mensaje);
        }
      })
    );

    for (let index = 0; index < usuariosChat.length; index++) {
      const element = usuariosChat[index];
      console.log(element)
    }

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
