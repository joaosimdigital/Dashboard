import React, { useState } from "react";
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

    // ================= CUSTO ÚNICO =================
    custoSimDigital: 0,
    instalacaoTerceiro: 0,
    instalacaoCliente: 0,

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

    // remove tudo que não é número
    const numericValue = value.replace(/\D/g, "");

    // divide por 100 para ter casas decimais (R$ 1234 => 12,34)
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

  return (
    <div className="calculator-container">
      {/* ================= REFERÊNCIA ================= */}
      <div className="section">
        <h3>REFERÊNCIA</h3>
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
          <input
            type="number"
            name="periodoContratual"
            value={inputs.periodoContratual}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <span>QTDE DE CIRCUITOS</span>
          <input
            type="number"
            name="qtdCircuitos"
            value={inputs.qtdCircuitos}
            onChange={handleChange}
          />
        </div>
        <div className="row highlight">
          <span>VALOR MENSAL REFERÊNCIA BRUTO</span>
          <input
            name="valorMensalReferencia"
            value={formatCurrency(inputs.valorMensalReferencia)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
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
      <div className="section">
        <h3>PAYBACK</h3>

        {/* ---- CUSTO ÚNICO ---- */}
        <h4>Custo Único</h4>
        <div className="row">
          <span>Custo SIM Digital</span>
          <input
            name="custoSimDigital"
            value={formatCurrency(inputs.custoSimDigital)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Instalação Terceiro</span>
          <input
            name="instalacaoTerceiro"
            value={formatCurrency(inputs.instalacaoTerceiro)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Instalação a cobrar do CLIENTE</span>
          <input
            name="instalacaoCliente"
            value={formatCurrency(inputs.instalacaoCliente)}
            onChange={handleCurrencyChange}
          />
        </div>

        {/* ---- CUSTO RECORRENTE ---- */}
        <h4>Custo Recorrente</h4>
        <div className="row">
          <span>Valor Mensal Terceiro</span>
          <input
            name="valorMensalTerceiro"
            value={formatCurrency(inputs.valorMensalTerceiro)}
            onChange={handleCurrencyChange}
          />
        </div>
        <div className="row">
          <span>Outros Custos Mensais</span>
          <input
            name="outrosCustosMensais"
            value={formatCurrency(inputs.outrosCustosMensais)}
            onChange={handleCurrencyChange}
          />
        </div>

        {/* ---- GERAL ---- */}
        <h4>Geral</h4>
        <div className="row">
          <span>Período Contratual Desejado</span>
          <input
            type="number"
            name="periodoContratualDesejado"
            value={inputs.periodoContratualDesejado}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <span>Faturamento Contratual Desejado</span>
          <input
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

        {/* ---- COMPOSIÇÃO NP ---- */}
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

      {/* ================= BOTÃO ================= */}
      <button className="btn-calc" onClick={calcular}>
        Calcular
      </button>

      {/* ================= RESULTADOS ================= */}
      {resultados && (
        <div className="results">
          <h3>APROVAÇÃO</h3>
          <div className="row">
            <span>Faturamento Contratual Calculado</span>
            <b>R$ {resultados.faturamentoContratual.toFixed(2)}</b>
          </div>
          <div className="row">
            <span>Payback (Meses)</span>
            <b>{resultados.paybackMeses.toFixed(2)}</b>
          </div>
          <div className="row">
            <span>Valor Bruto Mensal</span>
            <b>R$ {inputs.valorBrutoMensal.toFixed(2)}</b>
          </div>
          <div className="row">
            <span>Valor Mensal NF</span>
            <b>R$ {resultados.valorMensalNF.toFixed(2)}</b>
          </div>
          <div className="row">
            <span>ROI Simplificado</span>
            <b>{resultados.roiSimplificado.toFixed(2)}%</b>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculator;
