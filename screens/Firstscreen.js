import Phaser from 'Phaser';
export default class Firstscreen extends Phaser.Scene
{
  preload(){

  }
  create(){
    this.add.text(400,250, "Bem vindo ao SumikaHell")
  }
}