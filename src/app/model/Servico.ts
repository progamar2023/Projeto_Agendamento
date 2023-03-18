export class ServicoRequest {
    servico?: Servico;
    tipoServico?: TipoServico;
    imagemBase64?: string;
}

export class Servico {
    id?: string;
    nome?: string;
    descricao: string = "";
    imagem?: string;
    tipoServicoId?: number;
    dataCriacao?: Date;
    habilitado?: boolean;
    imagemBase64?: string;

}

export class TipoServico {
    id?: string;
    nome?: string;
    dataCriacao?: Date;
    habilitado?: boolean;
}