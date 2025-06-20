import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';
import { Modal, Spinner } from 'react-bootstrap';
//import { registerLocale } from "react-datepicker";


import logobranca from '../Images/logobrnaca.png'
//import DatePicker from 'react-datepicker';
//import ptBR from "date-fns/locale/pt-BR";
import grafico from '../Images/chart-graphic.png'
import '../CSS/DashboardChurnGerencial.css'
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

//registerLocale("pt-BR", ptBR);

function DashboardChurnGerencial() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [anoSelecionado, setAnoSelecionado] = useState(currentYear);
  const [mesSelecionado, setMesSelecionado] = useState(currentMonth);
    const [churnMensal, setChurnMensal] = useState(null);
    const [projecao, setProjecao] = useState(0);
    const [cancelamentosPJ, setCancelamentosPJ] = useState(0);
    const [cancelamentosPF, setCancelamentosPF] = useState(0);
    const [churnUltimosMeses, setChurnUltimosMeses] = useState([]);
    const [churnPorBairro, setChurnPorBairro] = useState([]);
    const [churnPorCidade, setChurnPorCidade] = useState([]);
    const [diaSelecionado, setDiaSelecionado] = useState('');
    const [dataInicial, setDataInicial] = useState(null);
    const [dataFinal, setDataFinal] = useState(null);
    const [downgradeAtendimentos, setDowngradeAtendimentos] = useState([]);
    const [motivosCancelamentos, setMotivosCancelamentos] = useState([]);
    const [atendimentosTipo257, setAtendimentosTipo257] = useState([]);
    const [valorMensalCancelamento, setValorMensalCancelamento] = useState(0);
    const [valorAnualCancelamento, setValorAnualCancelamento] = useState(0);
    const [churnAnual, setChurnAnual] = useState([]);
    const [planosCancelados , setPlanosCancelados] = useState([]);
    const [clientesHabilitados12Meses, setClientesHabilitados12Meses] = useState([]);
    const [cancelamentosDetalhados, setCancelamentosDetalhados] = useState([]);
    const [clientesRepetidos, setClientesRepetidos] = useState([]);
    const [clientesRepetidosAtendimento, setClientesRepetidosAtendimento] = useState([]);
    const [motivoSelecionado, setMotivoSelecionado] = useState(null);
    const [cidadeSelecionada, setCidadeSelecionada] = useState(null);
    const [ordenarPorCancelamentos, setOrdenarPorCancelamentos] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [bairroSelecionado, setBairroSelecionado] = useState(null);
    const [limiteMeta, setLimiteMeta] = useState({ porcentagem_batida: 0, porcentagem_restante: 100 });
    const [statusMeta, setStatusMeta] = useState('');
    const [tipoPessoaSelecionado, setTipoPessoaSelecionado] = useState('');
    const dataMeta = [
      { name: '', value: limiteMeta.porcentagem_batida },
      { name: 'Restante', value: limiteMeta.porcentagem_restante }
    ];
    
    const COLORS = ['#F45742', '#00000']; // Cores para Batido e Restante

  const fetchChurnMensal = async () => {
  try {
    const params = new URLSearchParams();

    if (dataInicial) {
      params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    }

    if (dataFinal) {
      params.append('data_fim', dataFinal.toISOString().split('T')[0]);
    }

    if (cidadeSelecionada) {
      params.append('cidade', cidadeSelecionada);
    }

    if (bairroSelecionado) {
      params.append('bairro', bairroSelecionado);
    }

    if (motivoSelecionado) {
      params.append('motivo', motivoSelecionado);
    }

    if (tipoPessoaSelecionado) {
      params.append('tipo_pessoa', tipoPessoaSelecionado);
    }

    const url = `http://38.224.145.3:3007/churn-mensal?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setChurnMensal(data.total_cancelamentos); // Ou setChurnMensal(data.churn_mensal) se for o percentual
    } else {
      console.error('Erro ao buscar churn mensal:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar churn mensal:', error);
  }
};


    const fetchLimiteMeta = async () => {
      try {
        let url = `http://38.224.145.3:3007/limitemeta?ano=${anoSelecionado}&mes=${mesSelecionado}`;
    
        if (cidadeSelecionada) url += `&cidade=${encodeURIComponent(cidadeSelecionada)}`;
        if (bairroSelecionado) url += `&bairro=${encodeURIComponent(bairroSelecionado)}`;
        if (motivoSelecionado) url += `&motivo=${encodeURIComponent(motivoSelecionado)}`;
          if (tipoPessoaSelecionado) url += `&tipo_pessoa=${encodeURIComponent(tipoPessoaSelecionado)}`;
        //if (dataInicial) url += `&data_inicial=${encodeURIComponent(dataInicial.toISOString().split('T')[0])}`;
        //if (dataFinal) url += `&data_final=${encodeURIComponent(dataFinal.toISOString().split('T')[0])}`;
    
        const response = await fetch(url);
        const data = await response.json();
    
        if (response.ok) {
          setLimiteMeta({
            porcentagem_batida: parseFloat(data.porcentagem_batida),
            porcentagem_restante: parseFloat(data.porcentagem_restante)
          });
        } else {
          console.error('Erro:', data.error);
        }
      } catch (error) {
        console.error('Erro ao buscar limite de meta:', error);
      }
    };
    
    const fetchChurnTipoPessoa = async () => {
  try {
    let url = `http://38.224.145.3:3007/churn-mensal_tipo_pessoa`;

    const params = new URLSearchParams();

    if (dataInicial) {
      params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    }

    if (dataFinal) {
      params.append('data_fim', dataFinal.toISOString().split('T')[0]);
    }

    if (cidadeSelecionada) {
      params.append('cidade', cidadeSelecionada);
    }

      if (bairroSelecionado) {
      params.append('bairro', bairroSelecionado);
    }

    if (motivoSelecionado) {
      params.append('motivo', motivoSelecionado);
    }

    const response = await fetch(`${url}?${params.toString()}`);
    const data = await response.json();

    if (response.ok) {
      setCancelamentosPJ(data.cancelamentos.PJ || 0);
      setCancelamentosPF(data.cancelamentos.PF || 0);
    } else {
      console.error('Erro na resposta:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar churn tipo pessoa:', error);
  }
};

      
  const fetchChurn3Meses = async () => {
  try {
    const params = new URLSearchParams();

    if (dataInicial) {
      params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    }

    if (dataFinal) {
      params.append('data_fim', dataFinal.toISOString().split('T')[0]);
    }

    if (cidadeSelecionada) {
      params.append('cidade', cidadeSelecionada);
    }

    if (bairroSelecionado) {
      params.append('bairro', bairroSelecionado);
    }

    if (motivoSelecionado) {
      params.append('motivo', motivoSelecionado);
    }

    if (tipoPessoaSelecionado) {
      params.append('tipo_pessoa', tipoPessoaSelecionado);
    }

    const url = `http://38.224.145.3:3007/churn-mensal-3meses?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const nomesMeses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];

      const dadosFormatados = data.map(item => ({
        mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
        churn: item.churn_mensal
      }));

      setChurnUltimosMeses(dadosFormatados);
    } else {
      console.error('Erro ao buscar últimos 3 meses:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar churn últimos meses:', error);
  }
};


      
    const fetchChurnPorCidade = async () => {
  try {
    let url = `http://38.224.145.3:3007/churn-cidade`;

    const params = new URLSearchParams();

    // Adiciona os filtros principais
    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (motivoSelecionado) params.append('motivo', motivoSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);

    // ✅ Adiciona filtros por período se disponíveis
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setChurnPorCidade(data);
    } else {
      console.error('Erro ao buscar churn por cidade:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar churn por cidade:', error);
  }
};

    
  const fetchChurnPorBairro = async () => {
  try {
    let url = `http://38.224.145.3:3007/churn-bairro`;

    const params = new URLSearchParams();
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (motivoSelecionado) params.append('motivo', motivoSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);

    // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setChurnPorBairro(data);
    } else {
      console.error('Erro ao buscar churn por bairro:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar churn por bairro:', error);
  }
};



  const fetchDowngradeAtendimentos = async () => {
  try {
    const params = new URLSearchParams();

    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);
     // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    const url = `http://38.224.145.3:3007/atendimentos_tipo_downgrade?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const nomesMeses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];

      const ultimosMeses = data.meses.map(item => ({
        mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
        PF: item.PF,
        PJ: item.PJ
      }));

      setDowngradeAtendimentos(ultimosMeses);
    } else {
      console.error('Erro na requisição downgrade:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar atendimentos tipo downgrade:', error);
  }
};


      const fetchMotivosCancelamento = async () => {
  try {
    const params = new URLSearchParams();

    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (bairroSelecionado) params.append('bairro', bairroSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);
     // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    const url = `http://38.224.145.3:3007/motivos_cancelamentos?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setMotivosCancelamentos(data.motivos);
    } else {
      console.error('Erro ao buscar motivos:', data.error);
    }
  } catch (error) {
    console.error('Erro na requisição de motivos de cancelamento:', error);
  }
};


               
           const fetchReversaoCancelamento = async () => {
  try {
    const params = new URLSearchParams();

    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);
     // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    const url = `http://38.224.145.3:3007/atendimentos_tipo?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const nomesMeses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];

      const ultimos12Meses = data.meses.map(item => ({
        mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
        total: item.total_atendimentos
      }));

      setAtendimentosTipo257(ultimos12Meses);
    } else {
      console.error('Erro na requisição downgrade:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar atendimentos tipo downgrade:', error);
  }
};


const fetchValorCancelamentoMensal = async () => {
  try {
    const params = new URLSearchParams();

    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (bairroSelecionado) params.append('bairro', bairroSelecionado);
    if (motivoSelecionado) params.append('motivo', motivoSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);
     // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    const url = `http://38.224.145.3:3007/valor-cancelamento-mensal?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setValorMensalCancelamento(parseFloat(data.valor_total_perdido));
    } else {
      console.error('Erro ao buscar valor mensal:', data.error);
    }
  } catch (error) {
    console.error('Erro na requisição valor mensal:', error);
  }
};

                
        const fetchValorCancelamentoAnual = async () => {
          try {
            let url = `http://38.224.145.3:3007/valor-cancelamento-anual?ano=${anoSelecionado}`;
            if (cidadeSelecionada) url += `&cidade=${encodeURIComponent(cidadeSelecionada)}`;
            if (bairroSelecionado) url += `&bairro=${encodeURIComponent(bairroSelecionado)}`;
            if (motivoSelecionado) url += `&motivo=${encodeURIComponent(motivoSelecionado)}`;
             if (tipoPessoaSelecionado) url += `&tipo_pessoa=${encodeURIComponent(tipoPessoaSelecionado)}`;
        
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
              setValorAnualCancelamento(parseFloat(data.valor_total_perdido));
            } else {
              console.error('Erro ao buscar valor anual:', data.error);
            }
          } catch (error) {
            console.error('Erro na requisição valor anual:', error);
          }
        };



const fetchChurnAnual = async () => {
  try {
    const params = new URLSearchParams();

    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (bairroSelecionado) params.append('bairro', bairroSelecionado);
    if (motivoSelecionado) params.append('motivo', motivoSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);
     // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    const url = `http://38.224.145.3:3007/churn-mensal-12meses?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      const nomesMeses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];

      const dadosFormatados = data.map(item => ({
        mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
        churn: item.churn_mensal,
        total_cancelamentos: item.total_cancelamentos
      }));

      setChurnAnual(dadosFormatados);
    } else {
      console.error('Erro ao buscar churn anual:', data.error);
    }
  } catch (error) {
    console.error('Erro na requisição de churn anual:', error);
  }
};

        
      const fetchClientesHabilitados = async () => {
  try {
    const params = new URLSearchParams();

    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (bairroSelecionado) params.append('bairro', bairroSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);
     // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    const url = `http://38.224.145.3:3007/total-clientes-habilitados-ultimos-12-meses?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.total_clientes_habilitados) {
      const nomesMeses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ];

      const dadosFormatados = data.total_clientes_habilitados.map(item => ({
        mes: `${nomesMeses[item.mes - 1]}/${item.ano.toString().slice(-2)}`,
        total: parseInt(item.total_clientes_habilitados)
      }));

      setClientesHabilitados12Meses(dadosFormatados);
    } else {
      console.error('Erro na resposta:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar habilitações:', error);
  }
};


          
    const fetchCancelamentosDetalhados = async () => {
  try {
    const params = new URLSearchParams();

    if (anoSelecionado) params.append('ano', anoSelecionado);
    if (mesSelecionado) params.append('mes', mesSelecionado);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (bairroSelecionado) params.append('bairro', bairroSelecionado);
    if (motivoSelecionado) params.append('motivo', motivoSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);
     // ✅ Correção aqui: 'data_inicio' e 'data_fim' (não 'data_inicial' e 'data_final')
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    const url = `http://38.224.145.3:3007/churn-descricao?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setCancelamentosDetalhados(data.cancelamentos_detalhados || []);
    } else {
      console.error('Erro ao buscar cancelamentos detalhados:', data.error);
    }
  } catch (error) {
    console.error('Erro na requisição de cancelamentos detalhados:', error);
  }
};



const fetchClientesRepetidos = async () => {
  try {
    let url = `http://38.224.145.3:3007/clientes-repetidos-3meses`;

    // Adiciona tipo de pessoa se estiver selecionado
    if (tipoPessoaSelecionado) {
      url += `?tipo_pessoa=${encodeURIComponent(tipoPessoaSelecionado)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.clientes_repetidos) {
      setClientesRepetidos(data.clientes_repetidos);
    } else {
      console.error('Erro na resposta de clientes repetidos:', data.error);
    }
  } catch (error) {
    console.error('Erro ao buscar clientes repetidos:', error);
  }
};


   const fetchClientesRepetidosAtendimento = async () => {
  try {
    let url = `http://38.224.145.3:3007/clientes-repetidos-atendimentos`;

    const params = new URLSearchParams();
   if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);

    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);

    url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.clientes_repetidos_atendimento) {
      setClientesRepetidosAtendimento(data.clientes_repetidos_atendimento);
      console.log(setClientesRepetidosAtendimento)
    } else {
      console.error('Erro na resposta de atendimentos repetidos:', data.error);
    }
  } catch (error) {
    console.error('Erro na requisição de atendimentos repetidos:', error);
  }
};



const fetchPlanosCancelados = async () => {
  try {
    let url = `http://38.224.145.3:3007/churn-mensal`;

    const params = new URLSearchParams();
    if (dataInicial) params.append('data_inicio', dataInicial.toISOString().split('T')[0]);
    if (dataFinal) params.append('data_fim', dataFinal.toISOString().split('T')[0]);
    if (cidadeSelecionada) params.append('cidade', cidadeSelecionada);
    if (bairroSelecionado) params.append('bairro', bairroSelecionado);
    if (motivoSelecionado) params.append('motivo', motivoSelecionado);
    if (tipoPessoaSelecionado) params.append('tipo_pessoa', tipoPessoaSelecionado);

    url += `?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.planos_mais_cancelados) {
      setPlanosCancelados(data.planos_mais_cancelados);
    } else {
      console.error('Erro ao buscar planos cancelados:', data.error);
    }
  } catch (error) {
    console.error('Erro na requisição de planos cancelados:', error);
  }
};


        const fetchStatusMeta = async () => {
          try {
            const response = await fetch(`http://38.224.145.3:3007/meta?ano=${anoSelecionado}&mes=${mesSelecionado}`);
            const data = await response.json();
            if (response.ok) {
              setStatusMeta(data.status); // "acima" ou "abaixo"
            } else {
              console.error('Erro ao buscar status da meta:', data.error);
            }
          } catch (error) {
            console.error('Erro na requisição do status da meta:', error);
          }
        };


        const fetchAll = async (showLoading = false) => {
          if (showLoading) {
            setLoading(true);
            setProgress(0);
          }
      
          const tasks = [
            fetchLimiteMeta,
            fetchChurnMensal,
            fetchChurnTipoPessoa,
            fetchChurn3Meses,
            fetchChurnPorBairro,
            fetchChurnPorCidade,
            fetchDowngradeAtendimentos,
            fetchMotivosCancelamento,
            fetchReversaoCancelamento,
            fetchValorCancelamentoMensal,
            fetchValorCancelamentoAnual,
            fetchChurnAnual,
            fetchClientesHabilitados,
            fetchCancelamentosDetalhados,
            fetchClientesRepetidos,
            fetchClientesRepetidosAtendimento,
            fetchStatusMeta,
            fetchPlanosCancelados
          ];
      
          for (let i = 0; i < tasks.length; i++) {
            await tasks[i]();
            if (showLoading) setProgress(Math.round(((i + 1) / tasks.length) * 100));
          }
      
          if (showLoading) {
            setLoading(false);
            setProgress(0);
          }
        };

        const handleClick = (tipo) => {
          setTipoPessoaSelecionado(tipo);
       
        };

   useEffect(() => {
  fetchAll(false);
  const intervalo = setInterval(() => fetchAll(false), 2000);
  return () => clearInterval(intervalo);
}, [anoSelecionado, mesSelecionado, dataInicial, dataFinal, cidadeSelecionada, bairroSelecionado, motivoSelecionado, tipoPessoaSelecionado]);



    const handleUserInteraction = async (callback) => {
      setLoading(true);
      setProgress(0);
      await callback();
      await fetchAll(true); // true ativa o loading
    };


    useEffect(() => {
  const hoje = new Date();
  const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  setDataInicial(primeiroDiaMes);
  setDataFinal(hoje);
}, []);

    

    const anos = Array.from({ length: currentYear - 2018 + 1 }, (_, i) => 2018 + i);
  
    const meses = [
       'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

  return (
    <div style={{backgroundColor: 'white', alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%'}}>
                <div className='head-gerencial-body'>
                    <h1 className='h1-head-gerencial-body'>DASHBOARD GERENCIAL</h1>
                    <h1  className='h2-head-gerencial-body'>CHURN</h1>
                    <img  className='logo-head-gerencial-body' src={logobranca}/>
                </div>

    
                <div className='div-body-opcao'>

      <div className='div-body-opcao1'>
        <h3 className='h1-body-opcao'>Data inicial</h3>
        <DatePicker
          selected={dataInicial}
          onChange={(date) => handleUserInteraction(() => setDataInicial(date))}
          dateFormat="yyyy-MM-dd"
          className="button-body-opcao"
          placeholderText="Selecione a data inicial"
          locale="pt-BR"
        />
      </div>

      <div className='div-body-opcao1'>
        <h3 className='h1-body-opcao'>Data final</h3>
        <DatePicker
          selected={dataFinal}
          onChange={(date) => handleUserInteraction(() => setDataFinal(date))}
          dateFormat="yyyy-MM-dd"
          className="button-body-opcao"
          placeholderText="Selecione a data final"
          locale="pt-BR"
        />
      </div>
      

       <div className='div-body-opcao1'>
    <h3 className='h1-body-opcao'>Tipo Pessoa</h3>
    <select
      className='button-body-opcao'
      value={tipoPessoaSelecionado}
      onChange={(e) => handleUserInteraction(() => setTipoPessoaSelecionado(e.target.value))}
    >
      <option value="">Todos</option>
      <option value="pf">Pessoa Física (PF)</option>
      <option value="pj">Pessoa Jurídica (PJ)</option>
    </select>
  </div>



      <button
  className="botao-limparfiltros"
  onClick={() =>  handleUserInteraction(() => {
    setCidadeSelecionada(null);
    setBairroSelecionado(null);
    setMotivoSelecionado(null);
    setDataInicial(null);
    setDataFinal(null);
    setTipoPessoaSelecionado('')
    setAnoSelecionado(currentYear);
    setMesSelecionado(currentMonth);
  })}
>
  Limpar Filtros
</button>

    </div>

                <div className='row-gerencial-body1'>

                    <div className='div-gerencial-body1'>
                        <div className='grafico-div-gerencial-body1'>
                            
                            <div className='grafico-card1-div-gerencial-body1'>
                            <h1 className='h1-card1-div-gerencial-body1'>Churn Mês</h1>
                            <h1  className='h2-card1-div-gerencial-body1'>Indicador que mede o churn mensal.</h1>

                                {churnUltimosMeses.length > 0 ? (
                                                <ResponsiveContainer width="90%" height={270}>
                                                   <BarChart
                                                          data={churnUltimosMeses}
                                                          onClick={(data) =>  handleUserInteraction(() => {
                                                            if (data && data.activeLabel) {
                                                              const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                                              const mesesNomes = [
                                                                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                                                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                                              ];
                                                              const mesIndex = mesesNomes.indexOf(mesTexto);
                                                              if (mesIndex !== -1) {
                                                                setMesSelecionado(mesIndex + 1);
                                                                setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                                                              }
                                                            }
                                                          })}
                                                        >
                                                        <CartesianGrid strokeDasharray="2 2" />
                                                        <XAxis dataKey="mes" tick={{ fill: 'black' }} fontWeight='bold' />
                                                        <YAxis  tick={{ fill: 'black' }} />
                                                        <Tooltip  />
                                                       
                                                        <Bar dataKey="churn" stackId="a" fill="#F45742">
                                                         
                                                            <LabelList dataKey="churn" position="inside" fill="#fff" fontWeight='bold'  formatter={(value) => value.toFixed(2)}  />
                                                        </Bar>
                                                      
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            ) : (
                                                <p>Carregando dados...</p>
                                            )}


                                            <img src={grafico} style={{height: 100}}/>

                            </div>

                        </div>
                    </div>

                    <div  className='div-gerencial-body1'>

                    <div className='card1-div-gerencial-body1'>
                            <h1 className='h1-div-gerencial-body2'>Churn</h1>
                            <h1 className='h2-div-gerencial-body1'>
                              {churnMensal !== null ? `${churnMensal} ` : 'Carregando...'}
                            </h1>
                          </div>

                            <div className='card2-div-gerencial-body1'>
                            <h1 className='h1-div-gerencial-body2'>Limite de Meta</h1>

                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: '', value: limiteMeta.porcentagem_batida },
                                      { name: 'Restante', value: limiteMeta.porcentagem_restante }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                    label={({ name, value }) => `${name} ${value.toFixed(2)}%`}
                                  >
                                    {[
                                      limiteMeta.porcentagem_batida,
                                      limiteMeta.porcentagem_restante
                                    ].map((_, index) => (
                                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                  </Pie>
                                  <Tooltip />
                                </PieChart>
                              </ResponsiveContainer>


                                
        
                            </div>
                    </div>

                    <div  className='div-gerencial-body1'>


                    <div className='card1-div-gerencial-body1'>
                                <h1 className='h1-div-gerencial-body2'>Projeção</h1>
                                <h1 className='h2-div-gerencial-body1'>{statusMeta.toLocaleUpperCase()}</h1>
                            </div>

                            <div className='card3-div-gerencial-body1' onClick={() => handleClick('PF')} style={{ cursor: 'pointer' }}>
                                <h1 className='h1-div-gerencial-body1'>PF</h1>
                                <h1 className='h2-div-gerencial-body1'>{cancelamentosPF}</h1>
                            </div>

                            <div className='card3-div-gerencial-body1'onClick={() => handleClick('PJ')} style={{ cursor: 'pointer' }}>
                                <h1 className='h1-div-gerencial-body1'>PJ</h1>
                                <h1 className='h2-div-gerencial-body1'>{cancelamentosPJ}</h1>
                            </div>
                    </div>

                </div>


               <div className='div2-gerencial-body1'>
  <div className='lista-div2-gerencial-body1'>
    <h1 className='h1-div-gerencial-gerencial'>Churn por Bairro</h1>

    <table className="tabela-bairros-gerencial">
      <thead>
        <tr style={{ backgroundColor: 'white' }}>
          <th className='h1-tabela-bairros-gerencial'>Bairro</th>
          <th className='h1-tabela-bairros-gerencial'>Tipo</th>
          <th className='h1-tabela-bairros-gerencial'>
            Cancelamentos
            <span
              onClick={() => setOrdenarPorCancelamentos(prev => !prev)}
              style={{ cursor: 'pointer', marginLeft: 5 }}
              title="Ordenar por número de cancelamentos"
            >
              ↓
            </span>
          </th>
          <th className='h1-tabela-bairros-gerencial'>Clientes Ativos</th>
          <th className='h1-tabela-bairros-gerencial'>Churn Inad.</th>
          <th className='h1-tabela-bairros-gerencial'>Churn Opção</th>
          <th className='h1-tabela-bairros-gerencial'>Churn</th>
        </tr>
      </thead>

      <tbody>
        {churnPorBairro
          .filter(item =>
            (!cidadeSelecionada || item.cidade_nome === cidadeSelecionada) &&
            (!motivoSelecionado || cancelamentosDetalhados.some(cancel =>
              cancel.bairro === item.bairro_nome &&
              cancel.motivo_cancelamento === motivoSelecionado
            ))
          )
          .sort((a, b) =>
            ordenarPorCancelamentos ? b.total_cancelamentos - a.total_cancelamentos : 0
          )
          .map((item, index) => (
            <tr
              key={index}
              className='link-tabela-bairros'
              onClick={() => handleUserInteraction(() => {
                setBairroSelecionado(prev => prev === item.bairro_nome ? null : item.bairro_nome);
                setCidadeSelecionada(item.cidade_nome);
              })}
              style={{
                cursor: 'pointer',
                backgroundColor: bairroSelecionado === item.bairro_nome ? '#f2f2f2' : 'white'
              }}
            >
              <td className='h2-tabela-bairros-gerencial'>{item.bairro_nome}</td>
              <td className='h2-tabela-bairros-gerencial'>
                {item.tipo_pessoa === 'pf' ? 'PF' : item.tipo_pessoa === 'pj' ? 'PJ' : 'Todos'}
              </td>
              <td className='h2-tabela-bairros-gerencial'>{item.total_cancelamentos}</td>
              <td className='h2-tabela-bairros-gerencial'>{item.total_clientes_ativos}</td>
              <td className='h2-tabela-bairros-gerencial'>{item.pct_pedido}%</td>
              <td className='h2-tabela-bairros-gerencial'>{item.pct_automatico}%</td>
              <td className='h2-tabela-bairros-gerencial'>{item.churn_rate}%</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
</div>



                    <div className='row-gerencial-body2'>

                        <div className='div-gerencial-body2'>
                            <div className='card-div-gerencial-body2'>
                            <h1 className='h1-div-gerencial-gerencial'>Churn por Cidade</h1>
                            <table className="tabela-bairros-gerencial">
                    <thead>
                        <tr style={{backgroundColor: 'white'}}>
                        <th className='h1-tabela-bairros-gerencial'>Cidade</th>
                        <th className='h1-tabela-bairros-gerencial'>Cancelamentos</th>
                        <th className='h1-tabela-bairros-gerencial'>Clientes Ativos</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn Inad.</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn Opção</th>
                        <th className='h1-tabela-bairros-gerencial'>Churn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {churnPorCidade
                          .filter(item => 
                            (!bairroSelecionado || churnPorBairro.find(b => b.bairro_nome === bairroSelecionado && b.cidade_nome === item.cidade_nome)) &&
                            (!motivoSelecionado || cancelamentosDetalhados.some(cancel => 
                              cancel.cidade_nome === item.cidade_nome && cancel.motivo_cancelamento === motivoSelecionado
                            ))
                          )
                          .map((item, index) => (
                            <tr
                              key={index}
                              className='link-tabela-bairros'
                              onClick={() =>  handleUserInteraction(() => {
                                setCidadeSelecionada(prev => prev === item.cidade_nome ? null : item.cidade_nome);
                                setBairroSelecionado(null); // Quando clicar na cidade, reseta bairro
                              })}
                              style={{
                                cursor: 'pointer',
                                backgroundColor: cidadeSelecionada === item.cidade_nome ? '#f2f2f2' : 'white'
                              }}
                            >
                              <td className='h2-tabela-bairros-gerencial'>{item.cidade_nome}</td>
                              <td className='h2-tabela-bairros-gerencial'>{item.total_cancelamentos}</td>
                              <td className='h2-tabela-bairros-gerencial'>{item.total_clientes_ativos}</td>
                              <td className='h2-tabela-bairros-gerencial'>{item.perc_cancelamento_pedido}%</td>
                              <td className='h2-tabela-bairros-gerencial'>{item.perc_cancelamento_automatico}%</td>
                              <td className='h2-tabela-bairros-gerencial'>{item.churn_rate}%</td>
                            </tr>
                          ))}
                      </tbody>

                    </table>
                                </div>
                        </div>

                        <div  className='div-gerencial-body2'>
                               <div className='card-div-gerencial-body2'>
                            <h1 className='h1-div-gerencial-gerencial'>Downgrade de Planos</h1>
                                
                            {downgradeAtendimentos.length > 0 ? (
                                <div style={{ marginTop: 30 }}>
                                  <ResponsiveContainer width="90%" height={270}>
  <BarChart
    data={downgradeAtendimentos}
    onClick={(data) =>
      handleUserInteraction(() => {
        if (data && data.activeLabel) {
          const [mesTexto, anoCurto] = data.activeLabel.split('/');
          const mesesNomes = [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
          ];
          const mesIndex = mesesNomes.indexOf(mesTexto);
          if (mesIndex !== -1) {
            setMesSelecionado(mesIndex + 1);
            setAnoSelecionado(parseInt('20' + anoCurto));
          }
        }
      })
    }
  >
    <CartesianGrid strokeDasharray="2 2" />
    <XAxis dataKey="mes" tick={{ fill: 'black' }} fontWeight="bold" />
    <YAxis tick={{ fill: 'black' }} />
    <Tooltip />
    <Legend />

    {/* PF */}
    {(tipoPessoaSelecionado === 'pf' || tipoPessoaSelecionado === '') && (
      <Bar dataKey="PF" name="Pessoa Física (PF)" fill="#F45742">
        <LabelList dataKey="PF" position="insideTop" fill="#fff" fontWeight="bold" />
      </Bar>
    )}

    {/* PJ */}
    {(tipoPessoaSelecionado === 'pj' || tipoPessoaSelecionado === '') && (
      <Bar dataKey="PJ" name="Pessoa Jurídica (PJ)" fill="#F45742">
        <LabelList dataKey="PJ" position="insideTop" fill="#fff" fontWeight="bold" />
      </Bar>
    )}
  </BarChart>
</ResponsiveContainer>


                                </div>
                                ) : (
                                <p>Carregando atendimentos tipo downgrade...</p>
                                )}


                            </div>
                              
                    
                        </div>


                    </div>


                <div className='div2-gerencial-body1'>
                <div className='lista-div2-gerencial-body1'>
                    <h1 className='h1-div-gerencial-gerencial'>Motivos de Cancelamentos</h1>
                    <table className="tabela-bairros-gerencial">
                    <thead>
                        <tr style={{ backgroundColor: 'white' }}>
                        <th className='h1-tabela-bairros-gerencial'>Motivo</th>
                        <th className='h1-tabela-bairros-gerencial'>Total Cancelamentos</th>
                        </tr>
                    </thead>
                    <tbody>
                    {motivosCancelamentos
                      .filter(item => {
                        if (bairroSelecionado || cidadeSelecionada) {
                          return cancelamentosDetalhados.some(cancelamento =>
                            (!bairroSelecionado || cancelamento.bairro === bairroSelecionado) &&
                            (!cidadeSelecionada || cancelamento.cidade_nome === cidadeSelecionada) &&
                            cancelamento.motivo_cancelamento === item.descricao
                          );
                        }
                        return true; // se não tiver filtro, mostra todos os motivos
                      })
                      .map((item, index) => (
                        <tr
                          key={index}
                          className="link-tabela-bairros"
                          onClick={() =>  handleUserInteraction(() =>
                            setMotivoSelecionado(prev => prev === item.descricao ? null : item.descricao)
                      )}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: motivoSelecionado === item.descricao ? '#f2f2f2' : 'white'
                          }}
                        >
                          <td className="h2-tabela-bairros-gerencial">{item.descricao}</td>
                          <td className="h2-tabela-bairros-gerencial">{item.total_cancelamentos}</td>
                        </tr>
                      ))}
                  </tbody>


                    </table>
                </div>
                </div>

                <div className='div2-gerencial-body1'>
                  <div className='lista-div2-gerencial-body1'>
                      <h1 className='h1-div-gerencial-gerencial'>Planos cancelados</h1>
                      <table className="tabela-bairros-gerencial">
                      <thead>
                          <tr style={{ backgroundColor: 'white' }}>
                          <th className='h1-tabela-bairros-gerencial'>Planos</th>
                          <th className='h1-tabela-bairros-gerencial'>Total Cancelamentos</th>
                          </tr>
                      </thead>
                      <tbody>
                    {planosCancelados.filter(item => {
                        if (bairroSelecionado || cidadeSelecionada) {
                          return cancelamentosDetalhados.some(cancelamento =>
                            (!bairroSelecionado || cancelamento.bairro === bairroSelecionado) &&
                            (!cidadeSelecionada || cancelamento.cidade_nome === cidadeSelecionada)
                          );
                        }
                        return true; // se não tiver filtro, mostra todos os motivos
                      }).map((item, index) => (
                        <tr
                          key={index}
                          className="link-tabela-bairros"
                          style={{ cursor: 'pointer', backgroundColor: 'white' }}
                        >
                          <td className="h2-tabela-bairros-gerencial">{item.nome_plano}</td>
                          <td className="h2-tabela-bairros-gerencial">{item.total_cancelamentos}</td>
                        </tr>
                      ))}

                    </tbody>


                      </table>
                  </div>
                </div>


                <div className='row-div-gerencial-body2'>

                <div  className='div-gerencial-body2'>
                       
                       <div className='card-div-gerencial-body2'>
                       <h1 className='h1-div-gerencial-gerencial'>Reversão de Cancelamento</h1>
                           
                       {atendimentosTipo257.length > 0 ? (
                      <div style={{ marginTop: 30 }}>
                        <ResponsiveContainer width="90%" height={270}>
                          <BarChart data={atendimentosTipo257}
                            onClick={(data) =>  handleUserInteraction(() => {
                              if (data && data.activeLabel) {
                                const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                const mesesNomes = [
                                  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                ];
                                const mesIndex = mesesNomes.indexOf(mesTexto);
                                if (mesIndex !== -1) {
                                  setMesSelecionado(mesIndex + 1);
                                  setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: 25 -> 2025
                                }
                              }
                            })}
                          >
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis dataKey="mes" tick={{ fill: 'black' }} fontWeight='bold' />
                            <YAxis tick={{ fill: 'black' }} />
                            <Tooltip />
                            <Bar dataKey="total" fill="#F45742">
                              <LabelList dataKey="total" position="insideTop" fill="#fff" fontWeight='bold' />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <p>Carregando atendimentos tipo 257...</p>
                    )}

                       </div>
                         
                   </div>

                   <div className='div-prejuizo-empresa'>
                    <div className='card-prejuizo-empresa'>
                           <h1 className='titulo-prejuizo-empresa'>Valor acumulado mensal</h1>
                           <h1 className='h2-div-gerencial-body1'>{valorMensalCancelamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                    </div>
                    <div className='card-prejuizo-empresa'>
                           <h1 className='titulo-prejuizo-empresa'>Valor acumulado anual</h1>
                           <h1 className='h2-div-gerencial-body1'>{valorAnualCancelamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                    </div>
                   </div>

                </div>

              
                <div  className='div-gerencial-body3'>
                       
                <div className='card-div-gerencial-body2'>
                  <h1 className='h1-div-gerencial-gerencial'>Churn porcentagem anual</h1>

                  {churnAnual.length > 0 ? (
                    <div style={{ marginTop: 30 }}>
                      <ResponsiveContainer width="95%" height={270}>
                        <BarChart
                          data={churnAnual}
                          onClick={(data) =>   handleUserInteraction(() =>{
                            if (data && data.activeLabel) {
                              const [mesTexto, anoCurto] = data.activeLabel.split('/');
                              const mesesNomes = [
                                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                              ];
                              const mesIndex = mesesNomes.indexOf(mesTexto);
                              if (mesIndex !== -1) {
                                setMesSelecionado(mesIndex + 1);
                                setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                              }
                            }
                          })}
                        >
                          <CartesianGrid strokeDasharray="2 2" />
                          <XAxis dataKey="mes" tick={{ fill: 'black' }} fontWeight='bold' />
                          <YAxis tick={{ fill: 'black' }} />
                          <Tooltip
                            formatter={(value, name, props) => {
                              if (props.dataKey === 'churn') {
                                return [`${value}%`, 'Churn (%)'];
                              }
                              return value;
                            }}
                            labelFormatter={(label) => `Mês: ${label}`}
                            contentStyle={{ backgroundColor: '#333', borderRadius: '10px', color: '#fff' }}
                          />
                          <Bar dataKey="churn" fill="#F45742">
                            <LabelList
                              dataKey="churn"
                              position="centerTop"
                              fill="#fff"
                              fontWeight="bold"
                              formatter={(value) => `${value}%`}
                            />
                              <LabelList
                              dataKey="total_cancelamentos"
                              position="insideBottom"
                              fill="#fff"
                              fontWeight="bold"
                              formatter={(value) => `${value}`}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <p>Carregando churn anual...</p>
                  )}
                </div>


                        </div>

                
                        <div  className='div-gerencial-body3'>
                       
                       <div className='card-div-gerencial-body2'>
                           <h1 className='h1-div-gerencial-gerencial'>Mês de instalação</h1>
       
                         {clientesHabilitados12Meses.length > 0 ? (
                            <div style={{ marginTop: 30 }}>
                              <ResponsiveContainer width="95%" height={270}>
                                <BarChart data={clientesHabilitados12Meses}      onClick={(data) =>  handleUserInteraction(() => {
                                                            if (data && data.activeLabel) {
                                                              const [mesTexto, anoCurto] = data.activeLabel.split('/');
                                                              const mesesNomes = [
                                                                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                                                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
                                                              ];
                                                              const mesIndex = mesesNomes.indexOf(mesTexto);
                                                              if (mesIndex !== -1) {
                                                                setMesSelecionado(mesIndex + 1);
                                                                setAnoSelecionado(parseInt('20' + anoCurto)); // Ex: '25' vira 2025
                                                              }
                                                            }
                                                          })}
                                                        >
                                  <CartesianGrid strokeDasharray="2 2" />
                                  <XAxis dataKey="mes" tick={{ fill: 'black' }} fontWeight='bold' />
                                  <YAxis tick={{ fill: 'black' }} />
                                  <Tooltip />
                                  <Bar dataKey="total" fill="#F45742">
                                    <LabelList dataKey="total" position="insideTop" fill="#fff" fontWeight='bold' />
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          ) : (
                            <p>Carregando clientes habilitados...</p>
                          )}
                           </div>
       
                               </div>
                

                               <div className='div2-gerencial-body1'>
                                <div className='lista-div2-gerencial-body1'>
                                  <h1 className='h1-div-gerencial-gerencial'>Cancelamentos Detalhados</h1>
                                  <table className="tabela-bairros-gerencial">
                                    <thead>
                                      <tr style={{ backgroundColor: 'white' }}>
                                        <th className='h1-tabela-bairros-gerencial'>Cliente</th>
                                        <th className='h1-tabela-bairros-gerencial'>Bairro</th>
                                        <th className='h1-tabela-bairros-gerencial'>Cidade</th>
                                        <th className='h1-tabela-bairros-gerencial'>Motivo de Cancelamento</th>
                                        <th className='h1-tabela-bairros-gerencial'>Valor</th>
                                        <th className='h1-tabela-bairros-gerencial'>Tipo</th>
                                        <th className='h1-tabela-bairros-gerencial'>Data Cancelamento</th>
                                        <th className='h1-tabela-bairros-gerencial'>Observação</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                                {cancelamentosDetalhados
                                                  .filter(item => 
                                                    (!motivoSelecionado || item.motivo_cancelamento === motivoSelecionado) &&
                                                    (!cidadeSelecionada || item.cidade_nome === cidadeSelecionada) &&
                                                    (!bairroSelecionado || item.bairro === bairroSelecionado)
                                                  )
                                                  .map((item, index) => (
                                                    <tr key={index} className='link-tabela-bairros'>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.nome_razaosocial}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.bairro}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.cidade_nome}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.motivo_cancelamento}</td>
                                                      
                                                      <td className='h2-tabela-bairros-gerencial'>
                                                        {parseFloat(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                      </td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.tipo_pessoa.toUpperCase()}</td>
                                                      <td className='h2-tabela-bairros-gerencial'>
                                                        {new Date(item.data_cancelamento).toLocaleDateString('pt-BR')}
                                                      </td>
                                                      <td className='h2-tabela-bairros-gerencial'>{item.observacao}</td>
                                                    </tr>
                                                ))}
                                              </tbody>

                                  </table>
                                </div>
                                </div>


                                <div className='div-pre-churn-header'>
                                  <h1 className='h1-pre-churn-header'>Pré-Churn</h1>
                                </div>


                                <div className='row-pre-churn'>
                                    
                                    <div className='card1-pre-churn'>
              
                                         <div className='card-div-gerencial-body2'>
                                            <h1 className='h1-div-gerencial-gerencial'>Ordem de Serviço (3 meses)</h1>
                                            <table className="tabela-bairros-gerencial">
                                              <thead>
                                                <tr style={{ backgroundColor: 'white' }}>
                                                  <th className='h1-tabela-bairros-gerencial1'>Cliente</th>
                                                  <th className='h1-tabela-bairros-gerencial1'>Qtd</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {clientesRepetidos.map((item, index) => (
                                                  <tr className='link-tabela-bairros' key={index}>
                                                   <td className='h2-tabela-bairros-gerencial1' title={item.cliente}>
                                                      {item.cliente.split(' ').length > 5
                                                        ? item.cliente.split(' ').slice(0, 5).join(' ') + '...'
                                                        : item.cliente}
                                                    </td>

                                                    <td className='h2-tabela-bairros-gerencial1'>{item.qtd_ordens}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                     
                                        </div>

                 
                                    <div  className='card1-pre-churn'>

                                          <div className='card-div-gerencial-body2'>
                                            <h1 className='h1-div-gerencial-gerencial'>Clientes com Atendimentos (3 meses)</h1>
                                            <table className="tabela-bairros-gerencial">
                                              <thead>
                                                <tr style={{ backgroundColor: 'white' }}>
                                                  <th className='h1-tabela-bairros-gerencial'>Cliente</th>
                                                  <th className='h1-tabela-bairros-gerencial'>Qtd</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {clientesRepetidosAtendimento.map((item, index) => (
                                                  <tr className='link-tabela-bairros' key={index}>
                                                  <td className='h2-tabela-bairros-gerencial1' title={item.cliente}>
                                                      {item.cliente.split(' ').length > 5
                                                        ? item.cliente.split(' ').slice(0, 5).join(' ') + '...'
                                                        : item.cliente}
                                                    </td>
                                                    <td className='h2-tabela-bairros-gerencial'>{item.qtd_atendimentos}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>

                                </div>

            {loading && (
                <div className="loading-overlay">
                  <div className="loading-progress"></div>
                </div>
              )}

    </div>
  )
}

export default DashboardChurnGerencial