import { Time } from "@angular/common";

export class Configuracao {
    id?: number;
    local?: string;
    tipo?: string;
    descricao?: string;
    valor: string = '';
    posicao?: number;
    dataInicial?: Time;
    dataFinal?: Time;
    imagemBase64?: string;
}