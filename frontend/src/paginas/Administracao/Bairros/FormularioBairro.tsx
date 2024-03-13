import { Box, Button, TextField, Typography } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IBairro from "../../../interfaces/IBairro"
import IMunicipio from "../../../interfaces/IMunicipio";

const FormularioBairro = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.codigoBairro) {
            http.get<IBairro>(`bairro/${parametros.codigoBairro}`)
                .then(resposta =>
                    {
                        setNomeBairro(resposta.data.nome)
                        setCodigoMunicipioBairro(resposta.data.codigoMunicipio)
                        setStatusBairro(resposta.data.status)
                    }                                      
                )
        }else {
            console.log(parametros)
        }
    }, [parametros])

    const [municipios, setMunicipios] = useState<IMunicipio[]>([])

    useEffect(() => {
        http.get<IMunicipio[]>('municipio/')
            .then(resposta => setMunicipios(resposta.data))
    }, [])

    const [codigoMunicipioBairro, setCodigoMunicipioBairro] = useState('')
    const [nomeBairro, setNomeBairro] = useState('')
    const [statusBairro, setStatusBairro] = useState('')
    
    // const [municipio, setMunicipio] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setCodigoMunicipioBairro(event.target.value as string);
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.codigoBairro) {
            http.put(`bairro/${parametros.codigoBairro}`, {
                codigoMunicipio: codigoMunicipioBairro,
                nome: nomeBairro,
                status: statusBairro
            })
                .then(() => {
                    alert("Bairro atualizado com sucesso!")
                })
        } else {
            http.post('bairro/', {
                codigoMunicipio: codigoMunicipioBairro,
                nome: nomeBairro,
                status: statusBairro
            })
                .then(() => {
                    alert("Bairro cadastrada com sucesso!")
                })
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Bairros</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
            <InputLabel id="demo-simple-select-label">Municípios</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={codigoMunicipioBairro}
                    label="Age"
                    onChange={handleChange}
                    >
                    {municipios.map((municipio, index)=>{
                        return(
                            <MenuItem value={municipio.codigoMunicipio}>{municipio.nome}</MenuItem>    
                        )
                    })}
                    </Select>
                <TextField
                    value={nomeBairro}
                    onChange={evento => setNomeBairro(evento.target.value)}
                    label="Nome da Bairro"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={statusBairro}
                    onChange={evento => setStatusBairro(evento.target.value)}
                    label="Status da Bairro"
                    variant="standard"
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioBairro