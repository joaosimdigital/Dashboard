import React, { useState } from "react";
import imgLogo from "../Images/logo-sim.png";
import "../CSS/Calculator.css";

function Calculator() {
  const [inputs, setInputs] = useState({
    // ================= REFERÊNCIA =================
    tipoServico: "IP Mitigado",
    velocidade: 0,
    periodoContratual: 0,
    qtdCircuitos: 0,
    valorMensalReferencia: 0,
    paybackReferencia: 0,

    // Novo campo controlado pelo checkbox
    habilitarValorExtra: false,
    valorExtra: 0,

    // ================= CUSTO ÚNICO =================
    custoSimDigital: 0,
    instalacaoTerceiro: 0,
    instalacaoCliente: 0,
    redundanciaBackup: "nao",

    // ================= CUSTO RECORRENTE =================
    valorMensalTerceiro: 0,
    outrosCustosMensais: 0,

    // ================= GERAL =================
    periodoContratualDesejado: 0,
    faturamentoContratualDesejado: 0,
    valorBrutoMensal: 0,

    // ================= COMPOSIÇÃO NF =================
    valorLiquidoMensal: 0,
    valorMensalImpostos: 0,
    valorCustosTerceirosImp: 0,
    valorMensalNF: 0,

    // ================= IMPOSTOS =================
    impostos: {
      icms: 0.3,
      pisCofins: 0.0365,
      fust: 0.015,
    },

    Custos: {
      megaCompartilhado: 0,
      megaDedicado: 0,
      megaL2L: 0,
    },
  });
  const [resultados, setResultados] = useState(null);

  // Função para formatar em moeda BR
  const formatCurrency = (value) => {
    if (!value && value !== 0) return "";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Handler que aceita números e aplica máscara de Real
  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    const floatValue = numericValue ? parseFloat(numericValue) / 100 : 0;

    setInputs((prev) => ({
      ...prev,
      [name]: floatValue,
    }));
  };

  // Handler padrão para inputs que não são moeda
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: isNaN(e.target.value)
        ? e.target.value
        : Number(e.target.value),
    });
  };

  const calcular = async () => {
    const res = await fetch("http://localhost:3001/calcular", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    setResultados(data);
  };

  // componente interno que desenha a calculadora (Payback)
  const CalculatorBox = () => (
    <div className="calculator-container">
      {/* ================= REFERÊNCIA ================= */}
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
        {/* PRIMEIRO DROPDOWN */}
        <div className="row">
          <span>PERÍODO CONTRATUAL</span>
          <select
            name="periodoContratual"
            value={inputs.periodoContratual}
            onChange={(e) =>
              setInputs((prev) => ({
                ...prev,
                periodoContratual: Number(e.target.value),
                periodoContratualDesejado: Number(e.target.value), // sincroniza os dois
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
          <input
            name="valorMensalReferencia"
            value={formatCurrency(inputs.valorMensalReferencia)}
            onChange={handleCurrencyChange}
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

      {/* ================= PAYBACK ================= */}
      <h3 className="title-cinza">PAYBACK</h3>
      <div className="section">
        <h4>Custo Único</h4>
        <div className="row custo-sim">
          <span>Custo SIM Digital</span>
          <input
            name="custoSimDigital"
            value={formatCurrency(inputs.custoSimDigital)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row custo-sim">
          <span>Instalação Terceiro</span>
          <input
            name="instalacaoTerceiro"
            value={formatCurrency(inputs.instalacaoTerceiro)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row custo-sim">
          <span>Instalação a cobrar do CLIENTE</span>
          <input
            name="instalacaoCliente"
            value={formatCurrency(inputs.instalacaoCliente)}
            onChange={handleCurrencyChange}
          />
        </div>

        <h4>Custo Recorrente</h4>
        <div className="row custo-sim">
          <span>Valor Mensal Terceiro</span>
          <input
            name="valorMensalTerceiro"
            value={formatCurrency(inputs.valorMensalTerceiro)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row custo-sim">
          <span>Outros Custos Mensais</span>
          <input
            name="outrosCustosMensais"
            value={formatCurrency(inputs.outrosCustosMensais)}
            onChange={handleCurrencyChange}
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
                periodoContratual: Number(e.target.value),
                periodoContratualDesejado: Number(e.target.value), // mantém sincronizado
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
            className="dolar-custo"
            name="faturamentoContratualDesejado"
            value={formatCurrency(inputs.faturamentoContratualDesejado)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Bruto Mensal</span>
          <input
            name="valorBrutoMensal"
            value={formatCurrency(inputs.valorBrutoMensal)}
            onChange={handleCurrencyChange}
          />
        </div>

        <h4>COMPOSIÇÃO NF</h4>
        <div className="row">
          <span>Valor Líquido Mensal</span>
          <input
            name="valorLiquidoMensal"
            value={formatCurrency(inputs.valorLiquidoMensal)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Mensal dos Impostos</span>
          <input
            name="valorMensalImpostos"
            value={formatCurrency(inputs.valorMensalImpostos)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Custos Terceiros + IMP</span>
          <input
            name="valorCustosTerceirosImp"
            value={formatCurrency(inputs.valorCustosTerceirosImp)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Mensal NF</span>
          <input
            name="valorMensalNF"
            value={formatCurrency(inputs.valorMensalNF)}
            onChange={handleCurrencyChange}
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
            <b>R$ {resultados.faturamentoContratual.toFixed(2)}</b>
          </div>
          <div className="row contrato-acima">
            <span>Payback (Meses)</span>
            <b>{resultados.paybackMeses.toFixed(2)}</b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Bruto Mensal</span>
            <b>R$ {inputs.valorBrutoMensal.toFixed(2)}</b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Mensal NF</span>
            <b>R$ {resultados.valorMensalNF.toFixed(2)}</b>
          </div>
          <div className="row contrato-acima">
            <span>ROI Simplificado</span>
            <b>{resultados.roiSimplificado.toFixed(2)}%</b>
          </div>
        </div>
      )}
    </div>
  );

  // componente interno que desenha a calculadora (Faturamento)
  const CalculatorBoxFaturamento = () => (
    <div className="calculator-container">
      {/* ================= REFERÊNCIA ================= */}
      <h3 className="title-cinza">FATURAMENTO</h3>
      <div className="section">
        <div className="row">
          <span>MODALIDADE</span>
          <input
            name="tipoServico"
            value={inputs.tipoServico}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <span>ICMS</span>
          <input
            type="number"
            name="velocidade"
            value={inputs.velocidade}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <span>PIS + COFINS</span>
          <input
            type="number"
            name="periodoContratual"
            value={inputs.periodoContratual}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <span>FUST + FUNTELL</span>
          <input
            type="number"
            name="qtdCircuitos"
            value={inputs.qtdCircuitos}
            onChange={handleChange}
          />
        </div>

        <div className="row highlight-bruto-blue">
          <span>TOTAL</span>
          <input
            name="valorMensalReferencia"
            value={formatCurrency(inputs.valorMensalReferencia)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row highlight-bruto-blue">
          <span>INSTALAÇÃO</span>
          <input
            type="number"
            name="paybackReferencia"
            value={inputs.paybackReferencia}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* ================= PAYBACK ================= */}
      <h3 className="title-cinza">FATURAMENTO</h3>
      <div className="section">
        <h4>Custo Único</h4>
        <div className="row custo-sim-orange">
          <span>Custo SIM Digital</span>
          <input
            name="custoSimDigital"
            value={formatCurrency(inputs.custoSimDigital)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Instalação Terceiro</span>
          <input
            name="instalacaoTerceiro"
            value={formatCurrency(inputs.instalacaoTerceiro)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Instalação a cobrar do CLIENTE</span>
          <input
            name="instalacaoCliente"
            value={formatCurrency(inputs.instalacaoCliente)}
            onChange={handleCurrencyChange}
          />
        </div>

        <h4>Custo Recorrente</h4>
        <div className="row custo-sim-orange">
          <span>Valor Mensal Terceiro</span>
          <input
            name="valorMensalTerceiro"
            value={formatCurrency(inputs.valorMensalTerceiro)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Outros Custos Mensais</span>
          <input
            name="outrosCustosMensais"
            value={formatCurrency(inputs.outrosCustosMensais)}
            onChange={handleCurrencyChange}
          />
        </div>

        <h4>Geral</h4>
        <div className="row custo-sim-orange">
          <span>Período Contratual</span>
          <input
            type="number"
            name="periodoContratualDesejado"
            value={inputs.periodoContratualDesejado}
            onChange={handleChange}
          />
        </div>
        <div className="row custo-sim-orange">
          <span>Payback (meses)</span>
          <input
            className="dolar-custo"
            name="faturamentoContratualDesejado"
            value={formatCurrency(inputs.faturamentoContratualDesejado)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Bruto Mensal</span>
          <input
            name="valorBrutoMensal"
            value={formatCurrency(inputs.valorBrutoMensal)}
            onChange={handleCurrencyChange}
          />
        </div>

        <h4>COMPOSIÇÃO NF</h4>
        <div className="row">
          <span>Valor Líquido Mensal</span>
          <input
            name="valorLiquidoMensal"
            value={formatCurrency(inputs.valorLiquidoMensal)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Mensal dos Impostos</span>
          <input
            name="valorMensalImpostos"
            value={formatCurrency(inputs.valorMensalImpostos)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Custos Terceiros + IMP</span>
          <input
            name="valorCustosTerceirosImp"
            value={formatCurrency(inputs.valorCustosTerceirosImp)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Valor Mensal NF</span>
          <input
            name="valorMensalNF"
            value={formatCurrency(inputs.valorMensalNF)}
            onChange={handleCurrencyChange}
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
            <b>R$ {resultados.faturamentoContratual.toFixed(2)}</b>
          </div>
          <div className="row contrato-acima">
            <span>Payback (Meses)</span>
            <b>{resultados.paybackMeses.toFixed(2)}</b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Bruto Mensal</span>
            <b>R$ {inputs.valorBrutoMensal.toFixed(2)}</b>
          </div>
          <div className="row contrato-abaixo">
            <span>Valor Mensal NF</span>
            <b>R$ {resultados.valorMensalNF.toFixed(2)}</b>
          </div>
          <div className="row contrato-acima">
            <span>ROI Simplificado</span>
            <b>{resultados.roiSimplificado.toFixed(2)}%</b>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Header único */}
      <div className="calculator-header">
        <img src={imgLogo} alt="Logo Empresa" className="calculator-logo" />
        <div className="calculator-header-right">
          <h1 className="calculator-title">Planilha de Cálculo de Venda</h1>
        </div>
      </div>

      {/* As duas planilhas lado a lado */}
      <div className="calculators-wrapper">
        <CalculatorBox />
        <CalculatorBoxFaturamento />
      </div>
    </div>
  );
}

export default Calculator;
