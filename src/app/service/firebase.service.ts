import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contato } from '../model/contato';
import { addDoc, collection, deleteDoc, doc, Firestore, updateDoc } from 'firebase/firestore';
import { collectionData, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _PATH: string = 'contato'

  constructor(@Inject(Firestore) private firestore: Firestore) { }

  getContact(id: string): Observable<Contato | undefined>{
    const contatoDocument = doc(this.firestore, `&{this._PATH}/&{id}`);
    return docData(contatoDocument, {idField : 'id'}) as Observable<Contato | undefined>;
  }

  getAllContacts(): Observable<Contato[]>{
    const contatoCollection = collection(this.firestore, this._PATH);
    return collectionData(contatoCollection,{idField: 'id'}) as Observable<Contato[]>
  }
  
  create(contato: Contato): Promise<any>{
    const contatoCollection = collection(this.firestore, this._PATH);
    const contatoParaSalvar = {
      nome: contato.nome, telefone: contato.telefone,
      genero: contato.genero, email: contato.email
    };
    return addDoc(contatoCollection, contatoParaSalvar);
  }

  update(contatoExistete: Contato, nome: string, telefone: string, genero: string, email: string): Promise<void>{
    const db= this.firestore;
    const contatoRef = doc(db, this._PATH, contatoExistete.id);
    return updateDoc(contatoRef, {nome: nome, telefone: telefone, genero: genero, email: email});
  }

  delete(id: string): Promise<void>{
    const contatoDocument = doc(this.firestore, `&{this._PATH}/&{id}`);
    return deleteDoc(contatoDocument);
  }
}
