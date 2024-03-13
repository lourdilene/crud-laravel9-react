import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import IPessoa from "../../../interfaces/IPessoa"

const AdministracaoPessoas = () => {    

    const [Pessoa, setPessoa] = useState<IPessoa[]>([])

    useEffect(() => {
        http.get<IPessoa[]>('pessoa/')
            .then(resposta => setPessoa(resposta.data))
    }, [])

    const excluir = (pessoaAhSerExcluido: IPessoa) => {
        http.delete(`pessoa/${pessoaAhSerExcluido.codigoPessoa}/`)
            .then(() => {
                const listapessoa = Pessoa.filter(pessoa => pessoa.codigoPessoa !== pessoaAhSerExcluido.codigoPessoa)
                setPessoa([...listapessoa])
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Pessoa.map(pessoa => <TableRow key={pessoa.codigoPessoa}>
                        <TableCell>
                            {pessoa.nome}
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`/admin/pessoas/${pessoa.codigoPessoa}`}>editar</RouterLink> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(pessoa)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoPessoas