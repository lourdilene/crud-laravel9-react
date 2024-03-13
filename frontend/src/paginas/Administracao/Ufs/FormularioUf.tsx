import { Box, Button, TextField, Typography } from "@mui/material"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IUf from "../../../interfaces/IUf"

const FormularioUf = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.codigoUF) {
            http.get<IUf>(`uf?codigoUF=${parametros.codigoUF}`)
                .then(resposta =>
                    {
                        setNomeUf(resposta.data.nome)
                        setSiglaUf(resposta.data.sigla)
                        setStatusUf(resposta.data.status)
                    }                                      
                )
        }else {
            console.log(parametros)
        }
    }, [parametros])

    const [siglaUf, setSiglaUf] = useState('')
    const [nomeUf, setNomeUf] = useState('')
    const [statusUf, setStatusUf] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusUf((event.target as HTMLInputElement).value);
      };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.codigoUF) {
            http.put(`uf/${parametros.codigoUF}/`, {
                sigla: siglaUf,
                nome: nomeUf,
                status: statusUf
            })
                .then(() => {
                    alert("Uf atualizado com sucesso!")
                })
        } else {
            http.post('uf/', {
                sigla: siglaUf,
                nome: nomeUf,
                status: statusUf
            })
                .then(() => {
                    alert("Uf cadastrada com sucesso!")
                })
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de UFs</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={siglaUf}
                    onChange={evento => setSiglaUf(evento.target.value)}
                    label="Sigla da Uf"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={nomeUf}
                    onChange={evento => setNomeUf(evento.target.value)}
                    label="Nome da Uf"
                    variant="standard"
                    fullWidth
                    required
                />
                <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={statusUf}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Ativo" />
                        <FormControlLabel value="2" control={<Radio />} label="Inativo" />
                    </RadioGroup>
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioUf