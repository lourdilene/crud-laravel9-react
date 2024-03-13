import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import IUf from "../../../interfaces/IUf"

const AdministracaoUfs = () => {

    const [Uf, setUf] = useState<IUf[]>([])

    useEffect(() => {
        http.get<IUf[]>('uf/')
            .then(resposta => setUf(resposta.data))
    }, [])

    const excluir = (ufAhSerExcluido: IUf) => {
        http.delete(`uf/${ufAhSerExcluido.codigoUF}`)
            .then(() => {
                const listauf = Uf.filter(uf => uf.codigoUF !== ufAhSerExcluido.codigoUF)
                setUf([...listauf])
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
                    {Uf.map(uf => <TableRow key={uf.codigoUF}>
                        <TableCell>
                            {uf.sigla}
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`/admin/ufs/${uf.codigoUF}`}>editar</RouterLink> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(uf)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoUfs