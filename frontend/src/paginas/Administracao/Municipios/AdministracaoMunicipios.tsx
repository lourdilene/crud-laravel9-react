import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"

import { Link as RouterLink } from 'react-router-dom'
import IMunicipio from "../../../interfaces/IMunicipio"

const AdministracaoMunicipios = () => {

    const [Municipio, setMunicipio] = useState<IMunicipio[]>([])

    useEffect(() => {
        http.get<IMunicipio[]>('municipio/')
            .then(resposta => setMunicipio(resposta.data))
    }, [])

    const excluir = (MunicipioAhSerExcluido: IMunicipio) => {
        http.delete(`municipio/${MunicipioAhSerExcluido.codigoMunicipio}`)
            .then(() => {
                const listaMunicipio = Municipio.filter(Municipio => Municipio.codigoMunicipio !== MunicipioAhSerExcluido.codigoMunicipio)
                setMunicipio([...listaMunicipio])
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
                    {Municipio.map(Municipio => <TableRow key={Municipio.codigoMunicipio}>
                        <TableCell>
                            {Municipio.nome}
                        </TableCell>
                        <TableCell>
                            [ <RouterLink to={`/admin/Municipios/${Municipio.codigoMunicipio}`}>editar</RouterLink> ]
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" color="error" onClick={() => excluir(Municipio)}>
                                Excluir
                            </Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoMunicipios