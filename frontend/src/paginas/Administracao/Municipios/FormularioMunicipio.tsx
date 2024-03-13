import { Box, Button, TextField, Typography } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IMunicipio from "../../../interfaces/IMunicipio"
import IUf from "../../../interfaces/IUf";

const FormularioMunicipios = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.codigoMunicipio) {
            http.get<IMunicipio>(`municipio/${parametros.codigoMunicipio}`)
                .then(resposta =>
                    {
                        setNomeMunicipio(resposta.data.nome)                        
                        setStatusMunicipio(resposta.data.status)
                        setCodigoUFMunicipio(resposta.data.codigoUF)
                    }                                      
                )
        }else {
            console.log(parametros)
        }
    }, [parametros])

    const [ufs, setUfs] = useState<IUf[]>([])

    useEffect(() => {
        http.get<IUf[]>('uf/')
            .then(resposta => setUfs(resposta.data))
    }, [])

    // const [uf, setUf] = useState('');

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setCodigoUFMunicipio(event.target.value as string);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusMunicipio((event.target as HTMLInputElement).value);
      };
    
    const [nomeMunicipio, setNomeMunicipio] = useState('')
    const [statusMunicipio, setStatusMunicipio] = useState('')
    const [codigoUFMunicipio, setCodigoUFMunicipio] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.codigoMunicipio) {
            http.put(`municipio/${parametros.codigoMunicipio}`, {                
                codigoUF: codigoUFMunicipio,
                nome: nomeMunicipio,
                status: statusMunicipio
            })
                .then(() => {
                    alert("Municipio atualizado com sucesso!")
                })
        } else {
            http.post('municipio/', {                                
                nome: nomeMunicipio,
                status: statusMunicipio,
                codigoUF: codigoUFMunicipio
            })
                .then(() => {
                    alert("Municipio cadastrado com sucesso!")
                })
        }

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Municipios</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <InputLabel id="demo-simple-select-label">Ufs</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={codigoUFMunicipio}
                    label="Age"
                    onChange={handleChangeSelect}
                    >
                    {ufs.map((uf, index)=>{
                        return(
                            <MenuItem value={uf.codigoUF}>{uf.nome}</MenuItem>    
                        )
                    })}
                    </Select>
                <TextField
                    value={nomeMunicipio}
                    onChange={evento => setNomeMunicipio(evento.target.value)}
                    label="Nome do Municipio"
                    variant="standard"
                    fullWidth
                    required
                />
                <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={statusMunicipio}
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

export default FormularioMunicipios