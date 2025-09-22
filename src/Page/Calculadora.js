// Calculator.jsx
import React, { useState } from "react";
import imgLogo from "../Images/logo-sim.png";
import "../CSS/Calculator.css";

function Calculator() {
  const [inputs, setInputs] = useState({
    // ================= REFERÊNCIA =================
    tipoServico: "IP Mitigado",
    velocidade: 0,
    periodoContratual: 12,
    qtdCircuitos: 0,
    valorMensalReferencia: 0,
    paybackReferencia: 0,

    habilitarValorExtra: false,
    valorExtra: 0,

    // ================= CUSTO ÚNICO =================
    custoSimDigital: 0,
    instalacaoTerceiro: 0,
    instalacaoCliente: 0,
    redundanciaBackup: "",

    // ================= CUSTO RECORRENTE =================
    valorMensalTerceiro: 0,
    outrosCustosMensais: 0,

    // ================= GERAL =================
    periodoContratualDesejado: 12,
    faturamentoContratualDesejado: 0,
    valorBrutoMensal: 0,

    // ================= COMPOSIÇÃO NF =================
    valorLiquidoMensal: 0,
    valorMensalImpostos: 0,
    valorCustosTerceirosImp: 0,
    valorMensalNF: 0,

    // ================= IMPOSTOS =================
    // Observação: estes números podem ser passados como 0.17 (decimal) ou 17 (porcentagem).
    impostos: {
      icms: 17,
      cofins: 3,
      pis: 0.65,
      fust: 0.015,
    },

    Custos: {
      megaCompartilhado: 0,
      megaDedicado: 0,
      megaL2L: 0,
    },
  });

  const [inputsFaturamento, setInputsFaturamento] = useState({
    modalidade: "",
    icms: 17,
    cofins: 3,
    pis: 0.65,
    fustFuntell: 0,
    total: 0,
    instalacao: 0,
    // campos usados no JSX — garantir que existam
    custoSimDigitalFat: 0,
    instalacaoTerceiroFat: 0,
    instalacaoClienteFat: 0,
    valorMensalTerceiroFat: 0,
    outrosCustosMensaisFat: 0,
    periodoContratual: 12,
    paybackMeses: 0,
    valorBrutoMensal: 0,
    valorLiquidoMensal: 0,
    valorMensalImpostos: 0,
    valorCustosTerceirosImp: 0,
    valorMensalNF: 0,
  });

  const [resultados, setResultados] = useState(null);
  const [resultadosFaturamento, setResultadosFaturamento] = useState(null);

  // Função para formatar em moeda BR (apenas para exibição — não no value do input)
  const formatCurrency = (value) => {
    if (value === null || value === undefined) return "";
    const n = Number(value);
    if (isNaN(n)) return "";
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  // ===== Handlers PAYBACK =====
  // Currency inputs: aguardamos texto, transformamos em número para state
  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    // aceita strings com números; remove tudo que não é dígito e interpreta como centavos
    const numeric = value.replace(/\D/g, "");
    const floatValue = numeric ? Number(numeric) / 100 : 0;
    setInputs((prev) => ({ ...prev, [name]: floatValue }));
  };

  // generic change para inputs não-moeda
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // ===== Handlers FATURAMENTO =====
  const handleCurrencyChangeFaturamento = (e) => {
    const { name, value } = e.target;
    const numeric = value.replace(/\D/g, "");
    const floatValue = numeric ? Number(numeric) / 100 : 0;
    setInputsFaturamento((prev) => ({ ...prev, [name]: floatValue }));
  };

  const handleChangeFaturamento = (e) => {
    const { name, value, type } = e.target;
    setInputsFaturamento((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // ===== chamadas API =====
  const calcular = async () => {
    try {
      const res = await fetch("http://localhost:3001/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inputs,
          impostos: inputs.impostos, // garante envio
        }),
      });
      const data = await res.json();
      setResultados(data);

      // opcional: preencher alguns campos do inputs com os resultados (sincronizar UI)
      setInputs((prev) => ({
        ...prev,
        valorLiquidoMensal: data.valorLiquidoMensal ?? prev.valorLiquidoMensal,
        valorMensalImpostos:
          data.valorMensalImpostos ?? prev.valorMensalImpostos,
        valorMensalNF: data.valorMensalNF ?? prev.valorMensalNF,
      }));
    } catch (err) {
      console.error("erro ao calcular:", err);
    }
  };

  const calcularFaturamento = async () => {
    try {
      const res = await fetch("http://localhost:3001/calcular-faturamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputsFaturamento),
      });
      const data = await res.json();
      setResultadosFaturamento(data);

      // opcional: sincroniza alguns inputsFaturamento com o que veio do backend
      setInputsFaturamento((prev) => ({
        ...prev,
        valorLiquidoMensal: data.valorLiquidoMensal ?? prev.valorLiquidoMensal,
        valorMensalImpostos:
          data.valorMensalImpostos ?? prev.valorMensalImpostos,
        valorMensalNF: data.valorMensalNF ?? prev.valorMensalNF,
      }));
    } catch (err) {
      console.error("erro ao calcular faturamento:", err);
    }
  };

  // ========== Componentes (mantive estrutura similar ao que você tinha) ==========
  const CalculatorBox = () => (
    <div className="calculator-container">
      <h3 className="title-cinza">REFERÊNCIA</h3>
      <div className="section">
        <div className="row">
          <span>TIPO DE SERVIÇOS</span>
          <input
            name="tipoServico"
            value={inputs.tipoServico}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <span>VELOCIDADE MB</span>
          <input
            type="number"
            name="velocidade"
            value={inputs.velocidade}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <span>PERÍODO CONTRATUAL</span>
          <select
            name="periodoContratual"
            value={inputs.periodoContratual}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                periodoContratual: Number(e.target.value),
                periodoContratualDesejado: Number(e.target.value),
              }))
            }
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
        </div>

        <div className="row">
          <span>REDUNDÂNCIA/BACKUP</span>
          <label>
            <input
              type="radio"
              name="redundanciaBackup"
              value="sim"
              checked={inputs.redundanciaBackup === "sim"}
              onChange={handleChange}
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="redundanciaBackup"
              value="nao"
              checked={inputs.redundanciaBackup === "nao"}
              onChange={handleChange}
            />
            Não
          </label>
        </div>

        <div className="row highlight-bruto">
          <span>VALOR MENSAL REFERÊNCIA BRUTO</span>
          {/* input numérico sem formatCurrency no value (evita travamento) */}
          <input
            type="text"
            name="valorMensalReferencia"
            value={inputs.valorMensalReferencia || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row highlight-bruto">
          <span>PAYBACK REFERÊNCIA</span>
          <input
            type="number"
            name="paybackReferencia"
            value={inputs.paybackReferencia}
            onChange={handleChange}
          />
        </div>
      </div>

      <h3 className="title-cinza">PAYBACK</h3>
      <div className="section">
        <h4>Custo Único</h4>
        <div className="row custo-sim">
          <span>Custo SIM Digital</span>
          <input
            type="text"
            name="custoSimDigital"
            value={inputs.custoSimDigital || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row custo-sim">
          <span>Instalação Terceiro</span>
          <input
            type="text"
            name="instalacaoTerceiro"
            value={inputs.instalacaoTerceiro || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row custo-sim">
          <span>Instalação a cobrar do CLIENTE</span>
          <input
            type="text"
            name="instalacaoCliente"
            value={inputs.instalacaoCliente || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <h4>Custo Recorrente</h4>
        <div className="row custo-sim">
          <span>Valor Mensal Terceiro</span>
          <input
            type="text"
            name="valorMensalTerceiro"
            value={inputs.valorMensalTerceiro || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row custo-sim">
          <span>Outros Custos Mensais</span>
          <input
            type="text"
            name="outrosCustosMensais"
            value={inputs.outrosCustosMensais || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <h4>Geral</h4>
        <div className="row custo-sim">
          <span>Período Contratual Desejado</span>
          <select
            name="periodoContratualDesejado"
            value={inputs.periodoContratualDesejado}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                periodoContratualDesejado: Number(e.target.value),
                periodoContratual: Number(e.target.value),
              }))
            }
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
        </div>

        <div className="row custo-sim">
          <span>Faturamento Contratual Desejado</span>
          <input
            type="text"
            className="dolar-custo"
            name="faturamentoContratualDesejado"
            value={inputs.faturamentoContratualDesejado || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row">
          <span>Valor Bruto Mensal</span>
          <input
            type="text"
            name="valorBrutoMensal"
            value={inputs.valorBrutoMensal || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <h4>COMPOSIÇÃO NF</h4>
        <div className="row">
          <span>Valor Líquido Mensal</span>
          <input
            type="text"
            name="valorLiquidoMensal"
            value={inputs.valorLiquidoMensal || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row">
          <span>Valor Mensal dos Impostos</span>
          <input
            type="text"
            name="valorMensalImpostos"
            value={inputs.valorMensalImpostos || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row">
          <span>Valor Custos Terceiros + IMP</span>
          <input
            type="text"
            name="valorCustosTerceirosImp"
            value={inputs.valorCustosTerceirosImp || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>

        <div className="row">
          <span>Valor Mensal NF</span>
          <input
            type="text"
            name="valorMensalNF"
            value={inputs.valorMensalNF || ""}
            onChange={handleCurrencyChange}
            placeholder="0,00"
          />
        </div>
      </div>

      <div className="btn-div">
        <button className="btn-calc" onClick={calcular}>
          Calcular
        </button>
      </div>

      {resultados && (
        <div className="results">
          <h3>APROVAÇÃO</h3>
          <div className="row contrato-abaixo">
            <span>Faturamento Contratual Calculado</span>
            <b>{formatCurrency(resultados.faturamentoContratual)}</b>
          </div>
          <div className="row contrato-acima">
            <span>Payback (Meses)</span>
            <b>{Number(resultados.paybackMeses).toFixed(2)}</b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Bruto Mensal</span>
            <b>{formatCurrency(inputs.valorBrutoMensal)}</b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Mensal NF</span>
            <b>{formatCurrency(resultados.valorMensalNF)}</b>
          </div>
          <div className="row contrato-acima">
            <span>ROI Simplificado</span>
            <b>{Number(resultados.roiSimplificado).toFixed(2)}%</b>
          </div>
        </div>
      )}
    </div>
  );

  // ========== Faturamento ==========
  const CalculatorBoxFaturamento = () => (
    <div className="calculator-container">
      <h3 className="title-cinza">FATURAMENTO</h3>
      <div className="section">
        <div className="row">
          <span>MODALIDADE</span>
          <input
            name="modalidade"
            value={inputsFaturamento.modalidade}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row">
          <span>ICMS</span>
          <input
            type="number"
            name="icms"
            value={inputsFaturamento.icms}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row">
          <span>PIS + COFINS</span>
          <input
            type="number"
            name="cofins"
            value={inputsFaturamento.cofins}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row">
          <span>FUST + FUNTELL</span>
          <input
            type="number"
            name="fustFuntell"
            value={inputsFaturamento.fustFuntell}
            onChange={handleChangeFaturamento}
          />
        </div>

        <div className="row highlight-bruto-blue">
          <span>TOTAL</span>
          <input
            type="text"
            name="total"
            value={inputsFaturamento.total || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row highlight-bruto-blue">
          <span>INSTALAÇÃO</span>
          <input
            type="text"
            name="instalacao"
            value={inputsFaturamento.instalacao || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
      </div>

      <h3 className="title-cinza">FATURAMENTO DETALHADO</h3>
      <div className="section">
        <h4>Custo Único</h4>
        <div className="row custo-sim-orange">
          <span>Custo SIM Digital</span>
          <input
            type="text"
            name="custoSimDigitalFat"
            value={inputsFaturamento.custoSimDigitalFat || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Instalação Terceiro</span>
          <input
            type="text"
            name="instalacaoTerceiroFat"
            value={inputsFaturamento.instalacaoTerceiroFat || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Instalação a cobrar do CLIENTE</span>
          <input
            type="text"
            name="instalacaoClienteFat"
            value={inputsFaturamento.instalacaoClienteFat || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>

        <h4>Custo Recorrente</h4>
        <div className="row custo-sim-orange">
          <span>Valor Mensal Terceiro</span>
          <input
            type="text"
            name="valorMensalTerceiroFat"
            value={inputsFaturamento.valorMensalTerceiroFat || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Outros Custos Mensais</span>
          <input
            type="text"
            name="outrosCustosMensaisFat"
            value={inputsFaturamento.outrosCustosMensaisFat || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>

        <h4>Geral</h4>
        <div className="row custo-sim-orange">
          <span>Período Contratual</span>
          <input
            type="number"
            name="periodoContratual"
            value={inputsFaturamento.periodoContratual}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Payback (meses)</span>
          <input
            className="dolar-custo"
            type="number"
            name="paybackMeses"
            value={inputsFaturamento.paybackMeses}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row">
          <span>Valor Bruto Mensal</span>
          <input
            type="text"
            name="valorBrutoMensal"
            value={inputsFaturamento.valorBrutoMensal || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>

        <h4>COMPOSIÇÃO NF</h4>
        <div className="row">
          <span>Valor Líquido Mensal</span>
          <input
            type="text"
            name="valorLiquidoMensal"
            value={inputsFaturamento.valorLiquidoMensal || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row">
          <span>Valor Mensal dos Impostos</span>
          <input
            type="text"
            name="valorMensalImpostos"
            value={inputsFaturamento.valorMensalImpostos || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row">
          <span>Valor Custos Terceiros + IMP</span>
          <input
            type="text"
            name="valorCustosTerceirosImp"
            value={inputsFaturamento.valorCustosTerceirosImp || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row">
          <span>Valor Mensal NF</span>
          <input
            type="text"
            name="valorMensalNF"
            value={inputsFaturamento.valorMensalNF || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
          />
        </div>
      </div>

      <div className="btn-div">
        <button className="btn-calc" onClick={calcularFaturamento}>
          Calcular
        </button>
      </div>

      {resultadosFaturamento && (
        <div className="results">
          <h3>APROVAÇÃO</h3>
          <div className="row contrato-abaixo">
            <span>Faturamento Contratual Calculado</span>
            <b>{formatCurrency(resultadosFaturamento.faturamentoContratual)}</b>
          </div>
          <div className="row contrato-acima">
            <span>Payback (Meses)</span>
            <b>{Number(resultadosFaturamento.paybackMeses).toFixed(2)}</b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Bruto Mensal</span>
            <b>
              {formatCurrency(
                resultadosFaturamento.valorBrutoMensal ??
                  inputsFaturamento.valorBrutoMensal
              )}
            </b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Mensal NF</span>
            <b>{formatCurrency(resultadosFaturamento.valorMensalNF)}</b>
          </div>
          <div className="row contrato-acima">
            <span>ROI Simplificado</span>
            <b>{Number(resultadosFaturamento.roiSimplificado).toFixed(2)}%</b>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="calculator-header">
        <img src={imgLogo} alt="Logo Empresa" className="calculator-logo" />
        <div className="calculator-header-right">
          <h1 className="calculator-title">Planilha de Cálculo de Venda</h1>
        </div>
      </div>

      <div className="calculators-wrapper">
        {CalculatorBox()}
        {CalculatorBoxFaturamento()}
      </div>
    </div>
  );
}

export default Calculator;
