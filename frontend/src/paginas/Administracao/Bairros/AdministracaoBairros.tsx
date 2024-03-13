import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import IBairro from "../../../interfaces/IBairro"

const AdministracaoBairros = () => {

    const [Bairro, setBairro] = useState<IBairro[]>([])

    useEffect(() => {
        http.get<IBairro[]>('bairro/')
            .then(resposta => setBairro(resposta.data))
    }, [])

    const excluir = (BairroAhSerExcluido: IBairro) => {
        http.delete(`bairro/${BairroAhSerExcluido.codigoBairro}`)
            .then(() => {
                const listaBairro = Bairro.filter(Bairro => Bairro.codigoBairro !== BairroAhSerExcluido.codigoBairro)
                setBairro([...listaBairro])
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
                    {Bairro.map(Bairro => <TableRow key={Bairro.codigoBairro}>
                        <TableCell>
                            {Bairro.nome}
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`/admin/bairros/${Bairro.codigoBairro}`}>editar</RouterLink> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(Bairro)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoBairros