export interface DetallesReservaCliente {
  ID_Reservas: number;
  ID_Carro: number;
  Marca: string;
  Modelo: string;
  Generacion: number;
  Tipo: string;
  Transmision: string;
  CostoXDia: number;
  PagoTotal: number;
  FechaInicio: string;
  FechaFin: string;
  Estado: string;
}
