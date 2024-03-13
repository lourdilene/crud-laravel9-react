import IEndereco from "./IEndereco"

export default interface IPessoa {
  codigoPessoa: number
  nome: string
  sobrenome: string
  idade: string    
  login: string
  senha: string
  status: string
  enderecos: IEndereco[]
}