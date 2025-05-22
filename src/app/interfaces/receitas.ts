export interface Preparo {
  ingredientes: string[];
  modoPreparo: string;
}

export interface Receita {
  id?: number;
  nomeReceita: string;
  descricaoReceita: string;
  sentimentoReceita: string[];
  preparos: Preparo[];
  tempoPreparo: string;
  imagemReceita: string;
  qtdeFinal: number;
  observacoesUsuario?: string;
  autorId?: string;
  qtdAvaliacao: number;
  favorited_by?: string[];
}