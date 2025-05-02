export class ValidacaoService {
    validarEmail(email: string): boolean {
      return /^[\w.-]+@(gmail|outlook)\.com$/.test(email);
    }
  
    validarSenha(senha: string): boolean {
      return /^[A-Z][\w\d@$!%*?&]{7,}$/.test(senha);
    }
  }
  