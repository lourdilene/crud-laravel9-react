import { Box, Button, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import http from "../../../http"
import IPessoa from "../../../interfaces/IPessoa"
import IEndereco from "../../../interfaces/IEndereco"
import FormularioEndereco from "../../../componentes/FormularioEndereco";
import IBairro from "../../../interfaces/IBairro";
import IUf from "../../../interfaces/IUf";
import IMunicipio from "../../../interfaces/IMunicipio";

const FormularioPessoa = () => {    

    const parametros = useParams()    

    const [uf, setUf] = useState('')

    const [ufs, setUfs] = useState<IUf[]>([])

    const handleChangeUf = (event: SelectChangeEvent) => {
        setUf((event.target.value as string));
      };

      useEffect(() => {
        http.get<IUf[]>('uf/')
            .then(resposta => setUfs(resposta.data))
    }, [])


    const [municipio, setMunicipio] = useState('')

    const [municipios, setMunicipios] = useState<IMunicipio[]>([])

    const handleChangeMunicipio = (event: SelectChangeEvent) => {
        setMunicipio((event.target.value as string));
      };

    //   useEffect(() => {
    //     http.get<IMunicipio[]>(`municipio?codigoUF=${uf}`)
    //         .then(resposta => setMunicipios(resposta.data))
    // }, [])

    const fetchMunicipios = useCallback(async () => {
        const res = http.get<IMunicipio[]>(`municipio?codigoUF=${uf}`
        ).then((res) => res.data);
        const municipios = await res;
        console.log(municipios);
        setMunicipios(municipios);        
      }, [uf]);
    
      useEffect(() => {
        fetchMunicipios();        
      }, [fetchMunicipios]);

    useEffect(() => {
        if (parametros.codigoPessoa) {
            http.get<IPessoa>(`pessoa?codigoPessoa=${parametros.codigoPessoa}`)
                .then(resposta => 
                    {
                        const {nome, sobrenome, idade, login, senha, status, enderecos} = resposta.data
                        setNomePessoa(nome)
                        setSobrenomePessoa(sobrenome)
                        setIdadePessoa(idade)
                        setLoginPessoa(login)
                        setSenhaPessoa(senha)
                        setStatusPessoa(status)

                        // setEnderecos(enderecos)
                        
                        setEnderecos(enderecos)
                        // setCodigoEndereco(enderecos[0].codigoEndereco)
                        // setCodigoBairro(enderecos[0].codigoBairro)
                        // setNomeRua(enderecos[0].nomeRua)
                        // setNumero(enderecos[0].numero)
                        // setComplemento(enderecos[0].complemento)
                        // setCep(enderecos[0].cep)
                        // console.log(enderecos[0]);
                    }  
                )
        }
    }, [parametros])

    const [nomePessoa, setNomePessoa] = useState('')
    const [sobrenomePessoa, setSobrenomePessoa] = useState('')
    const [idadePessoa, setIdadePessoa] = useState('')
    const [loginPessoa, setLoginPessoa] = useState('')
    const [senhaPessoa, setSenhaPessoa] = useState('')
    const [statusPessoa, setStatusPessoa] = useState('')

    const handleChangeStatusPessoa = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusPessoa((event.target as HTMLInputElement).value);
      };

    const [codigoEndereco, setCodigoEndereco] = useState('')
    const [codigoBairroEndereco, setCodigoBairro] = useState('')
    const [nomeRuaEndereco, setNomeRua] = useState('')
    const [numeroEndereco, setNumero] = useState('')
    const [complementoEndereco, setComplemento] = useState('')
    const [cepEndereco, setCep] = useState('')
    
    const [enderecos, setEnderecos] = useState<IEndereco[]>([])

    const [bairros, setBairros] = useState<IBairro[]>([])

    // useEffect(() => {
    //     http.get<IBairro[]>('bairro/')
    //         .then(resposta => setBairros(resposta.data))
    // }, [])

    // // const [bairro, setBairro] = useState('');

    // const handleChange = (event: SelectChangeEvent) => {
    //     setCodigoBairro(event.target.value as string);
    // };        

    const handleChange = (event: SelectChangeEvent) => {
        setCodigoBairro((event.target.value as string));
      };

    //   useEffect(() => {
    //     http.get<IMunicipio[]>(`municipio?codigoUF=${uf}`)
    //         .then(resposta => setMunicipios(resposta.data))
    // }, [])

    const fetchBairros = useCallback(async () => {
        const res = http.get<IBairro[]>(`bairro?codigoMunicipio=${municipio}`
        ).then((res) => res.data);
        const bairros = await res;
        console.log(bairros);
        setBairros(bairros);        
      }, [municipio]);
    
      useEffect(() => {
        fetchBairros();        
      }, [fetchBairros]);

    // console.log(bairro);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        // console.log(enderecos);

        if (parametros.codigoPessoa) {
            http.put(`pessoa/${parametros.codigoPessoa}`, {
                nome: nomePessoa,
                sobrenome: sobrenomePessoa,
                idade: idadePessoa,
                login: loginPessoa,
                senha: senhaPessoa,
                status: statusPessoa,

                enderecos
            })
                .then(() => {
                    alert("Pessoa atualizada com sucesso!")
                    document.location.href = "/admin/pessoas";
                })
                .catch(function (errors) {
                    alert(errors.response.data.message);
                });                
        } else {            
            http.post('pessoa/', {
                nome: nomePessoa,
                sobrenome: sobrenomePessoa,
                idade: idadePessoa,
                login: loginPessoa,
                senha: senhaPessoa,
                status: statusPessoa,

                enderecos
            })
                .then(() => {
                    alert("Pessoa cadastrada com sucesso!")
                    document.location.href = "/admin/pessoas";
                })
                .catch(function (errors) {
                    alert(errors.response.data.message);
                }); 
        }

    }

    function handleAddEndereco(){

        const endereco: IEndereco = {
            // codigoEndereco: codigoEndereco!,
            cep:cepEndereco,
            codigoBairro: codigoBairroEndereco,            
            complemento: complementoEndereco,
            nomeRua: nomeRuaEndereco,
            numero: numeroEndereco
        }

        if (codigoEndereco){
            endereco.codigoEndereco = codigoEndereco;
        }

        setEnderecos([...enderecos, endereco])
        setCep('')
        setCodigoBairro('')
        setCodigoEndereco('')
        setComplemento('')
        setNomeRua('')
        setNumero('')

        console.log(enderecos);
    }

    function handleDeleteAddress(index:number){
        const firstPartEndereco = enderecos.slice(0,index);
        const lastPartEndereco = enderecos.slice(index+1);

        const finalListEndereco = [...firstPartEndereco,...lastPartEndereco];

        setEnderecos(finalListEndereco);
        console.log(finalListEndereco);        
    }

    function handleEditAddress(endereco:IEndereco, index:number){
        const firstPartEndereco = enderecos.slice(0,index);
        const lastPartEndereco = enderecos.slice(index+1);

        const finalListEndereco = [...firstPartEndereco,...lastPartEndereco];

        setEnderecos(finalListEndereco);

        console.log('handleEditAddress'+endereco.codigoEndereco);
        setCodigoEndereco(endereco.codigoEndereco!)
        setCodigoBairro(endereco.codigoBairro)
        setNomeRua(endereco.nomeRua)
        setNumero(endereco.numero)
        setComplemento(endereco.complemento)
        setCep(endereco.cep)        
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pessoas</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>                
                <TextField
                    value={nomePessoa}
                    onChange={evento => setNomePessoa(evento.target.value)}
                    label="Nome da Pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={sobrenomePessoa}
                    onChange={evento => setSobrenomePessoa(evento.target.value)}
                    label="Sobrenome da pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={idadePessoa}
                    onChange={evento => setIdadePessoa(evento.target.value)}
                    label="Idade da Pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={loginPessoa}
                    onChange={evento => setLoginPessoa(evento.target.value)}
                    label="Login da Pessoa"
                    variant="standard"
                    fullWidth
                    required
                />
                <TextField
                    value={senhaPessoa}
                    onChange={evento => setSenhaPessoa(evento.target.value)}
                    label="Senha da Pessoa"
                    variant="standard"
                    type="password"
                    fullWidth
                    required
                />
                <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={statusPessoa}
                        onChange={handleChangeStatusPessoa}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Ativo" />
                        <FormControlLabel value="2" control={<Radio />} label="Inativo" />
                    </RadioGroup>

<Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Endereço</Typography>            
            <InputLabel id="demo-simple-select-label">Ufs</InputLabel>
                    <Select                    
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={uf}
                        label="Age"
                        onChange={handleChangeUf}
                        >
                        {ufs.map((uf, index)=>{
                            return(
                                <MenuItem key={uf.codigoUF} value={uf.codigoUF}>{uf.nome}</MenuItem>    
                            )
                        })}
                    </Select>
            <InputLabel id="demo-simple-select-label">Município</InputLabel>
                    <Select                    
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={municipio}
                        label="Age"
                        onChange={handleChangeMunicipio}
                        >
                        {municipios.map((municipio, index)=>{
                            return(
                                <MenuItem key={municipio.codigoMunicipio} value={municipio.codigoMunicipio}>{municipio.nome}</MenuItem>    
                            )
                        })}
                    </Select>
            <InputLabel id="demo-simple-select-label">Bairro</InputLabel>
                    <Select                    
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={codigoBairroEndereco}
                        label="Age"
                        onChange={handleChange}
                        >
                        {bairros.map((bairro, index)=>{
                            return(
                                <MenuItem key={bairro.codigoBairro} value={bairro.codigoBairro}>{bairro.nome}</MenuItem>    
                            )
                        })}
                    </Select>
                <TextField
                    value={nomeRuaEndereco}
                    onChange={evento => setNomeRua(evento.target.value)}
                    label="Nome da rua"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={numeroEndereco}
                    onChange={evento => setNumero(evento.target.value)}
                    label="Numero"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={complementoEndereco}
                    onChange={evento => setComplemento(evento.target.value)}
                    label="Complemento"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={cepEndereco}
                    onChange={evento => setCep(evento.target.value)}
                    label="Cep"
                    variant="standard"
                    fullWidth
                    
               />

                <Button sx={{ marginTop: 1 }} type="button" fullWidth variant="outlined" onClick={handleAddEndereco}>Incluir novo endereço</Button>

                <List dense>
              {enderecos.map((endereco, index)=>{                
                return (                    
                        <ListItem key={index}
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={()=>{
                                handleDeleteAddress(index)
                            }}>
                              <DeleteIcon />                                                            
                            </IconButton>                            
                          }                          
                        >
                <TextField
                    value={index+1}                    
                    label="Nº"
                    variant="standard"
                    fullWidth                    
               />                                                                                                        
                <TextField
                    value={endereco.codigoBairro}
                    onChange={evento => setCodigoBairro(evento.target.value)}
                    label="Código do Bairro"
                    variant="standard"
                    fullWidth                    
                />
                <TextField
                    value={endereco.nomeRua}
                    onChange={evento => setNomeRua(evento.target.value)}
                    label="Nome da rua"
                    variant="standard"
                    fullWidth                    
                    />                    
                <TextField
                    value={endereco.numero}
                    onChange={evento => setNumero(evento.target.value)}
                    label="Numero"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={endereco.complemento}
                    onChange={evento => setComplemento(evento.target.value)}
                    label="Complemento"
                    variant="standard"
                    fullWidth
                    
                />
                <TextField
                    value={endereco.cep}
                    onChange={evento => setCep(evento.target.value)}
                    label="Cep"
                    variant="standard"
                    fullWidth
                    
               />
                <IconButton edge="end" aria-label="delete" onClick={()=>{
                            handleEditAddress(endereco, index)
                        }}>
                    <EditIcon />                                                            
                </IconButton> 
                </ListItem>                      
                )
              })}
            </List>
        </Box>            
                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>

            </Box>
        </Box>
    )
}

export default FormularioPessoa