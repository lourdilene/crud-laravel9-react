import { Routes, Route } from 'react-router-dom';
import AdministracaoBairros from './paginas/Administracao/Bairros/AdministracaoBairros';
import FormularioBairro from './paginas/Administracao/Bairros/FormularioBairro';
import AdministracaoMunicipios from './paginas/Administracao/Municipios/AdministracaoMunicipios';
import FormularioMunicipio from './paginas/Administracao/Municipios/FormularioMunicipio';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';
import AdministracaoPessoas from './paginas/Administracao/Pessoas/AdministracaoPessoas';
import FormularioPessoa from './paginas/Administracao/Pessoas/FormularioPessoa';
import AdministracaoUfs from './paginas/Administracao/Ufs/AdministracaoUfs';
import FormularioUf from './paginas/Administracao/Ufs/FormularioUf';

function App() {

  return (
    <Routes>
      <Route path="/" element={<PaginaBaseAdmin />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>

        <Route path="ufs" element={<AdministracaoUfs />} />
        <Route path="ufs/novo" element={<FormularioUf />} />
        <Route path="ufs/:codigoUF" element={<FormularioUf />} />

        <Route path="pessoas" element={<AdministracaoPessoas />} />
        <Route path="pessoas/novo" element={<FormularioPessoa />} />
        <Route path="pessoas/:codigoPessoa" element={<FormularioPessoa />} />

        <Route path="municipios" element={<AdministracaoMunicipios />} />
        <Route path="municipios/novo" element={<FormularioMunicipio />} />
        <Route path="municipios/:codigoMunicipio" element={<FormularioMunicipio />} />

        <Route path="bairros" element={<AdministracaoBairros />} />
        <Route path="bairros/novo" element={<FormularioBairro />} />
        <Route path="bairros/:codigoBairro" element={<FormularioBairro />} />
      </Route>

    </Routes>
  );
}

export default App;
