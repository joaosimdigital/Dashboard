// Calculator.jsx
import React, { useState } from "react";
import imgLogo from "../Images/logo-sim.png";
import imgAsk from "../Images/ask.png";
import "../CSS/Calculator.css";

function Calculator() {
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [inputs, setInputs] = useState({
    // ================= REFERÊNCIA =================
    tipoServico: "",
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
    equipamento: "",
    sva: "",
    suporteCliente: "",

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
      fust: 1.5,
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
    fustFuntell: 1.5,
    total: 0,
    instalacao: 0,
    // campos usados no JSX — garantir que existam
    custoSimDigitalFat: 0,
    instalacaoTerceiroFat: 0,
    periodoContratualFat: 0,
    equipamentoFat: "",
    svaFat: "",
    suporteClienteFat: "",
    instalacaoClienteFat: 0,
    valorMensalTerceiroFat: 0,
    outrosCustosMensaisFat: 0,
    periodoContratual: 12,
    paybackMeses: 0,
    valorBrutoMensal: 0,
    suporteCliente: "",
    valorLiquidoMensal: 0,
    valorMensalImpostos: 0,
    valorCustosTerceirosImp: 0,
    valorMensalNF: 0,
  });

  const [resultados, setResultados] = useState(null);
  const [resultadosFaturamento, setResultadosFaturamento] = useState(null);

  const impostosTable = [
    { nome: "PIS", valor: "0,65%" },
    { nome: "COFINS", valor: "3,00%" },
    { nome: "ISS", valor: "2,00%" },
    { nome: "ICMS", valor: "17,00%" },
  ];

  // Função para formatar em moeda BR (apenas para exibição — não no value do input)
  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === "") return "R$ 0,00";
    const n = Number(value);
    if (isNaN(n)) return "R$ 0,00";
    return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const formatCurrencyInput = (rawValue) => {
  // remove tudo que não for número
  const onlyDigits = rawValue.replace(/\D/g, "");

  if (!onlyDigits) return "";

  // transforma em número (centavos)
  const numberValue = parseFloat(onlyDigits) / 100;

  // retorna formatado (sem símbolo de R$ para evitar travamento)
  return numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

  // ===== Handlers PAYBACK =====
  // Currency inputs: aguardamos texto, transformamos em número para state
  const handleCurrencyChange = (e) => {
  const { name, value } = e.target;

  const formatted = formatCurrencyInput(value);
  setInputs((prev) => ({
    ...prev,
    [name]: formatted,
  }));
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

  const formatted = formatCurrencyInput(value);
  setInputsFaturamento((prev) => ({
    ...prev,
    [name]: formatted,
  }));
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
          <select
            name="tipoServico"
            value={inputs.tipoServico}
            onChange={handleChange}
          >
            <option value="Mega Compartilhado">Mega Compartilhado</option>
            <option value="Mega Dedicado">Mega Dedicado</option>
            <option value="Mega L2L">Mega L2L</option>
          </select>
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

        <div className="row check-boxes">
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

        <div className="row check-boxes-equipamento">
          <span>EQUIPAMENTO</span>

          <label>
            <input
              type="radio"
              name="equipamento"
              value="sim"
              checked={inputs.equipamento === "sim"}
              onChange={handleChange}
            />
            Sim
          </label>

          <label>
            <input
              type="radio"
              name="equipamento"
              value="nao"
              checked={inputs.equipamento === "nao"}
              onChange={handleChange}
            />
            Não
          </label>

          {/* Exibe o select apenas se "Sim" estiver selecionado */}
          {inputs.equipamento === "sim" && (
            <select
              className="select-equipamento"
              name="tipoEquipamento"
              value={inputs.tipoEquipamento || ""}
              onChange={handleChange}
              style={{ padding: "5px" }}
            >
              <option value="">Selecione o equipamento</option>
              <option value="equipamento1">Equipamento 1</option>
              <option value="equipamento2">Equipamento 2</option>
              <option value="equipamento3">Equipamento 3</option>
            </select>
          )}
        </div>

        <div className="row">
          <span>SUPORTE AO CLIENTE</span>
          <label>
            <input
              type="radio"
              name="suporteCliente"
              value="sim"
              checked={inputs.suporteCliente === "sim"}
              onChange={handleChange}
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="suporteCliente"
              value="nao"
              checked={inputs.suporteCliente === "nao"}
              onChange={handleChange}
            />
            Não
          </label>
        </div>

        <div className="row">
          <span>SVA</span>
          <label>
            <input
              type="radio"
              name="sva"
              value="sim"
              checked={inputs.sva === "sim"}
              onChange={handleChange}
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="sva"
              value="nao"
              checked={inputs.sva === "nao"}
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
          <select
            name="paybackReferencia"
            value={inputs.paybackReferencia}
            onChange={handleChange}
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
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

          <div
            className={`row ${
              resultados.faturamentoContratual > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Faturamento Contratual Calculado</span>
            <b>{formatCurrency(resultados.faturamentoContratual)}</b>
          </div>

          <div
            className={`row ${
              resultados.paybackMeses > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Payback (Meses)</span>
            <b>{Number(resultados.paybackMeses).toFixed(2)}</b>
          </div>

          <div
            className={`row ${
              (resultados.valorBrutoMensal ??
                inputsFaturamento.valorBrutoMensal) > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Valor Bruto Mensal</span>
            <b>
              {formatCurrency(
                resultados.valorBrutoMensal ??
                  inputsFaturamento.valorBrutoMensal
              )}
            </b>
          </div>

          <div
            className={`row ${
              resultados.valorMensalNF > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Valor Mensal NF</span>
            <b>{formatCurrency(resultados.valorMensalNF)}</b>
          </div>

          <div
            className={`row ${
              resultados.roiSimplificado > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
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
            disabled
            name="modalidade"
            value={"R$"}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row">
          <span>ICMS</span>
          <input
            disabled
            type="number"
            name="icms"
            value={inputsFaturamento.icms}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row">
          <span>PIS + COFINS</span>
          <input
            disabled
            type="number"
            name="cofins"
            value={inputsFaturamento.cofins}
            onChange={handleChangeFaturamento}
          />
        </div>
        <div className="row">
          <span>FUST + FUNTELL</span>
          <input
            disabled
            type="text"
            name="fustFuntell"
            value={inputsFaturamento.fustFuntell}
            onChange={handleChangeFaturamento}
          />
        </div>

        <div className="row">
          <span>EQUIPAMENTO</span>

          <label>
            <input
              type="radio"
              name="equipamentoFat"
              value="sim"
              checked={inputs.equipamentoFat === "sim"}
              onChange={handleChange}
            />
            Sim
          </label>

          <label>
            <input
              type="radio"
              name="equipamentoFat"
              value="nao"
              checked={inputs.equipamentoFat === "nao"}
              onChange={handleChange}
            />
            Não
          </label>

          {/* Exibe o select somente quando SIM for selecionado */}
          {inputs.equipamentoFat === "sim" && (
            <select
              name="tipoEquipamento"
              value={inputs.tipoEquipamento || ""}
              onChange={handleChange}
              style={{ marginTop: "8px" }}
            >
              <option value="">Selecione o equipamento</option>
              <option value="equipamento1">Equipamento 1</option>
              <option value="equipamento2">Equipamento 2</option>
              <option value="equipamento3">Equipamento 3</option>
            </select>
          )}
        </div>

        <div className="row">
          <span>SUPORTE AO CLIENTE</span>
          <label>
            <input
              type="radio"
              name="suporteClienteFat"
              value="sim"
              checked={inputs.suporteClienteFat === "sim"}
              onChange={handleChange}
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="suporteClienteFat"
              value="nao"
              checked={inputs.suporteClienteFat === "nao"}
              onChange={handleChange}
            />
            Não
          </label>
        </div>

        <div className="row">
          <span>SVA</span>
          <label>
            <input
              type="radio"
              name="svaFat"
              value="sim"
              checked={inputs.svaFat === "sim"}
              onChange={handleChange}
            />
            Sim
          </label>
          <label>
            <input
              type="radio"
              name="svaFat"
              value="nao"
              checked={inputs.svaFat === "nao"}
              onChange={handleChange}
            />
            Não
          </label>
        </div>

        <div className="row highlight-bruto-blue">
          <span>TOTAL</span>
          <input
            type="text"
            name="total"
            value={inputsFaturamento.total || ""}
            onChange={handleChangeFaturamento}
            placeholder="0,00"
          />
        </div>
        <div className="row highlight-bruto-blue">
          <span>INSTALAÇÃO</span>
          <input
            type="text"
            name="instalacao"
            value={inputsFaturamento.instalacao || ""}
            onChange={handleChangeFaturamento}
            placeholder="0,00"
          />
        </div>
      </div>

      <h3 className="title-cinza">FATURAMENTO</h3>
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
          <select
            name="periodoContratualFat"
            value={inputs.periodoContratualFat}
            onChange={handleChangeFaturamento}
          >
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={36}>36</option>
            <option value={48}>48</option>
          </select>
        </div>
        <div className="row custo-sim-orange">
          <span>Payback (meses)</span>
          <input
            type="text"
            name="paybackMeses"
            value={inputsFaturamento.paybackMeses || ""}
            onChange={handleCurrencyChangeFaturamento}
            placeholder="0,00"
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

          <div
            className={`row ${
              resultadosFaturamento.faturamentoContratual > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Faturamento Contratual Calculado</span>
            <b>{formatCurrency(resultadosFaturamento.faturamentoContratual)}</b>
          </div>

          <div
            className={`row ${
              resultadosFaturamento.paybackMeses > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Payback (Meses)</span>
            <b>{Number(resultadosFaturamento.paybackMeses).toFixed(2)}</b>
          </div>

          <div
            className={`row ${
              (resultadosFaturamento.valorBrutoMensal ??
                inputsFaturamento.valorBrutoMensal) > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Valor Bruto Mensal</span>
            <b>
              {formatCurrency(
                resultadosFaturamento.valorBrutoMensal ??
                  inputsFaturamento.valorBrutoMensal
              )}
            </b>
          </div>

          <div
            className={`row ${
              resultadosFaturamento.valorMensalNF > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
            <span>Valor Mensal NF</span>
            <b>{formatCurrency(resultadosFaturamento.valorMensalNF)}</b>
          </div>

          <div
            className={`row ${
              resultadosFaturamento.roiSimplificado > 500
                ? "contrato-acima"
                : "contrato-abaixo"
            }`}
          >
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
          <div
            className="tabela-impostos-link"
            onClick={() => setMostrarTabela(!mostrarTabela)}
            style={{
              cursor: "pointer",
              marginTop: "5px",
              color: "#000000ff",
              fontWeight: "bold",
            }}
          >
            Tabela de Impostos
            <img src={imgAsk} alt="ask" className="ask" />
          </div>

          {mostrarTabela && (
            <div className="tabela-impostos">
              <table className="impostos">
                <tbody>
                  {impostosTable.map((imp, index) => (
                    <tr key={index}>
                      <td>{imp.nome}</td>
                      <td>{imp.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
