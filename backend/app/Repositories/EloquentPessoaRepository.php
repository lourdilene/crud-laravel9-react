<?php

namespace App\Repositories;

use App\Http\Requests\StorePessoaRequest;
use App\Models\Endereco;
use App\Models\Pessoa;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EloquentPessoaRepository implements PessoaRepository
{
    public function add(StorePessoaRequest $request): Pessoa
    {
        return DB::transaction(function () use ($request) {
            $pessoa= new Pessoa($request->all());
            $pessoa->save();

            foreach ($request->enderecos as $endereco) {
                $enderecos[] = array_merge($endereco, ['codigo_pessoa'=>$pessoa->codigo_pessoa]);
            }
            Log::alert($enderecos);
            Endereco::insert($enderecos);

            return $pessoa;
        });
    }

    public function update($request,$id): Pessoa
    {
        return DB::transaction(function () use ($request, $id) {
            $pessoa = Pessoa::findOrFail($id);
            $pessoa->fill($request->all());
            $pessoa->save();

            $codigosEnderecoRequest = [];
            $novosEnderecos = [];
            $enderecosParaAtualizar = [];

            foreach ($request->enderecos as $endereco) {

                if (!isset($endereco['codigoEndereco'])){
                    Log::alert('Entrou em novos endereços',[!isset($endereco['codigoEndereco'])]);

                    $novosEnderecos[] = new Endereco([
                        //$teste
                        'codigo_bairro' => $endereco['codigoBairro'],
                        'codigo_pessoa' => $id,
                        'nome_rua' => $endereco['nomeRua'],
                        'numero' => $endereco['numero'],
                        'complemento' => $endereco['complemento'],
                        'cep' => $endereco['cep']
                    ]);
                }

                if (isset($endereco['codigoEndereco'])){
//                    Log::alert("enderecos para atualizar",$endereco);
                    $enderecosParaAtualizar = [
                        'codigo_pessoa' => $id,
                        'codigo_endereco' => $endereco['codigoEndereco'],
                        'codigo_bairro' => $endereco['codigoBairro'],
                        'nome_rua' => $endereco['nomeRua'],
                        'numero' => $endereco['numero'],
                        'complemento' => $endereco['complemento'],
                        'cep' => $endereco['cep']
                    ];


                    $pessoa->enderecos()->where('codigo_endereco', $endereco['codigoEndereco'])->update($enderecosParaAtualizar);

                    $codigosEnderecoRequest[] = $endereco['codigoEndereco'];
                }
            }

            //$user = Endereco::first();

            //dd($user->toArray());

            Log::alert('novos enderecos',[$novosEnderecos]);

//            if (isset($endereco['codigoEndereco'])) {
            $pessoa->enderecos()->whereNotIn('codigo_endereco', $codigosEnderecoRequest)->delete();
//            }

//            Log::alert('Para cadastrar',[$novosEnderecos]);
            $pessoa->enderecos()->saveMany($novosEnderecos);

            return $pessoa;
        });
    }
}
