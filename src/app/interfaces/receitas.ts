export interface Receita {
    nomeReceita: string;
    descricaoReceita: string;
    sentimentoReceita: string[];
    preparos: {
      ingredientes: string[];
      modoPreparo: string;
    }[];
    tempoPreparo: string;
    imagemReceita: string;
    qtdeFinal: number;
    observacoesUsuario?: string;
  }
  