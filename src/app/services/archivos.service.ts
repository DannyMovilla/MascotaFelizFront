import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArchivosService {
  constructor(private storage: AngularFireStorage) {}

  uploadFiles(file: File) {
    //this.completed = false;
    const filePath = file.name;
    const task = this.storage.upload(filePath, file);

    // this.uploadPercent = task.percentageChanges();

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log('Imagen cargada correctamente 1');
        })
      )
      .subscribe((data: any) => {
        console.log('Almancenado 2');
        console.log('Data' + data);
      });
  }

  uploadImageToFirebase(file: File) {
    const randomId =
      new Date().getTime() + Math.random().toString(36).substring(2);
    const ref = this.storage.ref(randomId);
    const task = ref.put(file);
    return {
      task: task.snapshotChanges(),
      ref,
      path: randomId,
    };
  }
}
