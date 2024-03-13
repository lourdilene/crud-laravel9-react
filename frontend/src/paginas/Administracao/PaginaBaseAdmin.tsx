import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper } from "@mui/material"

import { Link as RouterLink, Outlet } from 'react-router-dom'

const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>

                        <Link component={RouterLink} to="/admin/pessoas">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Pessoas
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pessoas/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Nova Pessoa
                                </Button>
                            </Link>

                            <Link component={RouterLink} to="/admin/ufs">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Ufs
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/ufs/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Nova UF
                                </Button>
                            </Link>

                            <Link component={RouterLink} to="/admin/municipios">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Municípios
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/municipios/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Município
                                </Button>
                            </Link>

                            <Link component={RouterLink} to="/admin/bairros">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Bairros
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/bairros/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Bairro
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default PaginaBaseAdmin