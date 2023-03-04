export class ServicoRequest {
    servico?: Servico;
    tipoServico?: TipoServico;
}

export class Servico {
    id?: string;
    nome?: string;
    descricao: string = "";
    imagem?: string;
    tipoServicoId?: number;
    dataCriacao?: Date;
    habilitado?: boolean;

}

export class TipoServico {
    id?: string;
    nome?: string;
    dataCriacao?: Date;
    habilitado?: boolean;
}