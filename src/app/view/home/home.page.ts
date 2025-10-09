import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline  } from 'ionicons/icons';
import { Contato } from 'src/app/model/contato';
import { Firebase } from 'src/app/service/firebase.service';

addIcons({add:add, 'create-outline':createOutline})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  contatos: Contato[] = [];
  contosSubscription: Subscription | undefined;

  constructor(private router: Router,
    private firebase: Firebase,
  ) {
    this.carregarContatos();
  }

  async carregarContatos(){
    await this.firebase.getAllContacts()
    .subcribe({
      next: (contatosRecebidos: Contato[]) => {
        this.contatos = contatosRecebidos;
        console.log("Contatos Carregados");
      },error: (error)=>{
        console.error("Erro ao Careegar Contatos!")
      }
    })
  }

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"])
  }

  detalhar(contato: Contato){
    console.log("aqui");
   this.router.navigateByUrl('/detalhar', { state: {objeto: contato}})
  }
}
