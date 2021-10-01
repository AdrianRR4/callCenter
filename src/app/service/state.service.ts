import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../model/state.interfaz';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private state: State[]= [

    {
      id:1,
      // eslint-disable-next-line @typescript-eslint/quotes
      nombre: "Aguascalientes",
      abreviatura: "AGS",
      ciudad:"Aguascalientes"  
      },
  
     {
      id:2,
      nombre: "Baja California",
      abreviatura: "BC",
      ciudad:"Mexicali"  
      },
  {
      id:3,
      nombre: "Baja California Sur",
      abreviatura: "BCS",
      ciudad:"La Paz"  
  
      },
  {
      id:4,
      nombre: "Campeche",
      abreviatura: "CAM",
      ciudad:"San Francisco de Campeche"
      },
  
  {
      id:5,
      nombre: "Chiapas",
      abreviatura: "CHIS",
      ciudad:"Tuxtla Gutiérrez"  
      },
  
  {
      id:6,
      nombre: "Chihuahua",
      abreviatura: "CHIH",
      ciudad:"Chihuahua"  
      },
  
  {
      id:7,
      nombre: "Coahuila",
      abreviatura: "COAH",
      ciudad:"Saltillo"  
      },
  
  {
      id:8,
      nombre: "Ciudad de México",
      abreviatura: "CDMX",
      ciudad:""  
      },
  
  {
      id:9,
      nombre: "Colima",
      abreviatura: "COL",
      ciudad:"Colima"  
      },
  
  {
      id:10,
      nombre: "Durango",
      abreviatura: "DGO",
      ciudad:"Durango"  
      },
  
  {
      id:11,
      nombre: "Guanajuato",
      abreviatura: "GTO",
      ciudad:"Guanajuato"  
      },
  
  {
      id:12,
      nombre: "Guerrero",
      abreviatura: "GRO",
      ciudad:"Chilpancingo"  
      },
  
  {
      id:13,
      nombre: "Hidalgo",
      abreviatura: "HGO",
      ciudad:"Pachuca"  
      },
  
  {
      id:14,
      nombre: "Jalisco",
      abreviatura: "JAL",
      ciudad:"Guadalajara"  
      },
  
  {
      id:15,
      nombre: "Estado de México",
      abreviatura: "MEX",
      ciudad:"Toluca de Lerdo"  
      },
  
  {
      id:16,
      nombre: "Michoacán",
      abreviatura: "MICH" ,
      ciudad:"Morelia" 
      },
  
  {
      id:17,
      nombre: "Morelos",
      abreviatura: "MOR",
      ciudad:"Cuernavaca"  
      },
  
  {
      id:18,
      nombre: "Nayarit",
      abreviatura: "NAY",
      ciudad:"Tepic"  
      },
      {
      id:19,
      nombre: "Nuevo León",
      abreviatura: "NL" ,
      ciudad:"Monterrey" 
      },
  
  {
      id:20,
      nombre: "Oaxaca",
      abreviatura: "OAX",
      ciudad:"Oaxaca de Juárez"  
      },
  {
      id:21,
      nombre: "Puebla",
      abreviatura: "PUE",
      ciudad:"Puebla de Zaragoza"  
      },
  
  {
      id:22,
      nombre: "Querétaro",
      abreviatura: "QRO",
      ciudad:"Santiago de Querétaro"  
      },
  
  {
      id:23,
      nombre: "Quintana Roo",
      abreviatura: "QROO",
      ciudad:"Chetumal"  
      },
  {
      id:24,
      nombre: "San Luis Potosí",
      abreviatura: "SLP",
      ciudad:"San Luis Potosí"  
      },
  {
      id:25,
      nombre: "Sinaloa",
      abreviatura: "SIN",
      ciudad:"Culiacán Rosales"  
      },
  {
      id:26,
      nombre: "Sonora",
      abreviatura: "SON",
      ciudad:"Hermosillo"  
      },
      {
      id:27,
      nombre: "Tabasco",
      abreviatura: "TAB",
      ciudad:"Villahermosa"    
      },
  {
      id:28,
      nombre: "Tamaulipas",
      abreviatura: "TAMPS",
      ciudad:" Ciudad Victoria"    
      },
  {
      id:29,
      nombre: "Tlaxcala",
      abreviatura: "TLAX",
      ciudad:"Tlaxcala de Xicohténcatl"    
      },
  {
      id:30,
      nombre: "Veracruz",
      abreviatura: "VER",
      ciudad:"Xalapa"    
      },
  
  {
      id:31,
      nombre: "Yucatán",
      abreviatura: "YUC",
      ciudad:"Mérida"    
      },
  {
      id:32,
      nombre: "Zacatecas",
      abreviatura: "ZAC",
      ciudad:"Zacatecas"    
      },


  ];

  constructor(private http:HttpClient) { }

 
getStates():State[]{
  return this.state;
}

}
