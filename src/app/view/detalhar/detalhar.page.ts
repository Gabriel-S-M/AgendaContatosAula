import { Component, OnInit } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/contato';
import { IonicModule, AlertController } from '@ionic/angular';
import { Firebase } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalharPage implements OnInit {
  contato!: Contato
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  maxDate!: string;
  editar: boolean = true;

  constructor(private router: Router,
    private alertController: AlertController,
<<<<<<< Updated upstream
    private contatoService: ContatoService) { }
=======
    private firebase: Firebase,
    private formBuilder: FormBuilder) {}
>>>>>>> Stashed changes

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if(nav?.extras?.state?.['objeto']){
      this.contato = nav?.extras?.state?.['objeto']
      this.nome = this.contato.nome;
      this.telefone = this.contato.telefone;
      this.genero = this.contato.genero;
      this.dataNascimento = this.contato.dataNascimento;
    }
  }

<<<<<<< Updated upstream
  salvar(){
    this.dataNascimento = this.dataNascimento.split('T')[0];
     if(!this.validar(this.nome) || !this.validar(this.telefone)){
      this.presentAlert("Erro ao Cadastrar", "Campos Obrigatórios")
      return;
    }
    if(this.contatoService.update(this.contato, this.nome, this.telefone,
      this.genero, this.dataNascimento)){
=======
  get errorControl(){
    return this.formDetalhar.controls;
  }

  async salvar(){
    try{
      await this.firebase.update(
        this.contato,
        this.formDetalhar.value['nome'],
        this.formDetalhar.value['telefone'],
        this.formDetalhar.value['genero'],
        this.formDetalhar.value['email'];
>>>>>>> Stashed changes
        this.presentAlert('Atualizar', 'Contato atualizado com sucesso')
        this.router.navigate(['/home']);
      );
    }catch(error){
      this.presentAlert('Atualizar', 'Erro ao Atualizar o Contatos')
    }
  }

<<<<<<< Updated upstream
  excluir(){
    this.presentConfirmAlert("Excluir Contato",
      "Você realmente deseja excluir contato?",
      this.excluirContato()
    )
  }
  excluirContato(){
    if(this.contatoService.delete(this.contato)){
      this.presentAlert("Excluir", "Exclusão efetuada com sucesso!");
      this.router.navigate(['/home'])
    }else{
      this.presentAlert("Erro ao Excluir", "Contato não Encontrado");
=======
  async excluir(){
    try{
      await this.firebase.delete(this.contato.id);
      this.presentAlert('Excluir', 'Exclusão efetuada com sucesso!');
      this.router.navigate(['/home']);
    }catch (error){
      this.presentAlert('Erro ao Excluir', 'Contato Não Encotrado');
>>>>>>> Stashed changes
    }
  }

  alterarEdicao(){
    if(this.editar == false){
      this.editar = true;
    }else{
      this.editar = false;
    }
  }

   private validar(campo: any) : boolean{
    if(!campo){
      return false;
    }
    return true;
  }


   async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['ok'],
    });
    await alert.present();
  }

    async presentConfirmAlert(subHeader: string, message: string, acao: any) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancelar', role: 'cancelar', cssClass: 'secondary', handler:()=>{}},
        {text: 'Confirmar', handler:(acao)=>{acao}}
      ],
    });
    await alert.present();
  }




}
