import React from "react";
import "../CSS/DashboardGerencialOperacao.css";

function DashboardGerencialOperacao() {
  return (
    <div className="operacao-wrapper">
      <div className="operacao-header">
        <h2>Dashboard Gerencial da Operação</h2>
        <button className="operacao-filter-button">
          <span className="operacao-filter-icon">🔍</span>
          Add filtro
        </button>
      </div>

      <section className="operacao-section">
        <h3>Visão geral</h3>
        <div className="operacao-summary-cards">
          {/* Tipo de pessoa */}
          <div className="operacao-card operacao-chart-card">
            <h4>Tipo de pessoa</h4>
            <div className="operacao-bar-chart">
              <div className="operacao-bar">
                <div className="operacao-bar-value pf">805</div>
                <span>Pessoa Física</span>
              </div>
              <div className="operacao-bar">
                <div className="operacao-bar-value pj">972</div>
                <span>Pessoa Jurídica</span>
              </div>
            </div>
          </div>

          {/* Total de Ordens de Serviços */}
          <div className="operacao-card operacao-big-number-card">
            <h4>Total de Ordens de Serviços</h4>
            <div className="operacao-big-number">10.478</div>
          </div>

          {/* Último trimestre */}
          <div className="operacao-card operacao-chart-card">
            <h4>Último trimestre</h4>
            <div className="operacao-bar-chart">
              <div className="operacao-bar">
                <div className="operacao-bar-value pf">805</div>
                <span>Mar 2025</span>
              </div>
              <div className="operacao-bar">
                <div className="operacao-bar-value pj">972</div>
                <span>Abr 2025</span>
              </div>
              <div className="operacao-bar">
                <div className="operacao-bar-value pf">404</div>
                <span>Mai 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="operacao-section">
        <h3>Instalações</h3>
        <div className="operacao-summary-cards">
          <div className="operacao-card">
            <h4>Instalações por estado</h4>
            <div className="operacao-state-installations">
              <div>
                <strong>SC</strong>
                <p>438</p>
              </div>
              <div>
                <strong>RS</strong>
                <p>269</p>
              </div>
            </div>
          </div>

          <div className="operacao-card operacao-big-number-card">
            <h4>Total de Instalações</h4>
            <div className="operacao-big-number">1.491</div>
          </div>

          <div className="operacao-card operacao-big-number-card">
            <h4>% atingido da Meta</h4>
            <div className="operacao-big-number">48%</div>
          </div>
        </div>
      </section>

      <section className="operacao-section">
        <h3>Manutenções</h3>
        <div className="operacao-summary-cards">
          <div className="operacao-card">
            <h4>Manutenções por estado</h4>
            <div className="operacao-state-installations">
              <div>
                <strong>SC</strong>
                <p>350</p>
              </div>
              <div>
                <strong>RS</strong>
                <p>310</p>
              </div>
            </div>
          </div>

          <div className="operacao-card operacao-big-number-card">
            <h4>Total de Manutenções</h4>
            <div className="operacao-big-number">660</div>
          </div>

          <div className="operacao-card operacao-big-number-card">
            <h4>% atingido da Meta</h4>
            <div className="operacao-big-number">36%</div>
          </div>
        </div>
      </section>

      <section className="operacao-section operacao-table-section">
        <div className="operacao-table-card">
          <h4>Tipos de OS</h4>
          <table className="operacao-table">
            <thead>
              <tr>
                <th></th>
                <th>Descrição</th>
                <th>Qtd.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>SEM ACESSO (SEM SINAL GPON)</td>
                <td>
                  <strong>1.788</strong>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>INSTALAÇÃO GPON</td>
                <td>
                  <strong>1.491</strong>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>RECOLHIMENTO DE EQUIPAMENTO POR CAN...</td>
                <td>
                  <strong>887</strong>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>INSTALAÇÃO GPON (PRÉDIO ADAPTADO)</td>
                <td>
                  <strong>733</strong>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>APOIO TÉCNICO ORDEM DE SERVIÇO</td>
                <td>
                  <strong>690</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="operacao-table-card">
          <h4>Usuário de fechamento</h4>
          <table className="operacao-table">
            <thead>
              <tr>
                <th></th>
                <th>Usuário</th>
                <th>Qtd.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>(RECOLHIMENTO) LUIS ALEXANDRE</td>
                <td>
                  <strong>491</strong>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>(RECOLHIMENTO) JOÃO DOS SANTOS</td>
                <td>
                  <strong>363</strong>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>(INST.)(TAPERA) ADRIANO DA SILVA</td>
                <td>
                  <strong>318</strong>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>(INST.)(SUL) RAFAEL DE SOUZA</td>
                <td>
                  <strong>313</strong>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>(MANUTENÇÃO/INST.)(INGLESES) MICHEL PAIVA</td>
                <td>
                  <strong>306</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="operacao-section operacao-extra-section">
        <div className="operacao-card operacao-chart-donut">
          <h4>OS por cidade</h4>
          {/* Aqui futuramente você pode usar <PieChart> do Recharts */}
          <div className="donut-placeholder">[Gráfico de pizza aqui]</div>
          <ul className="donut-legend">
            <li>
              <span className="legend-dot black"></span> Florianópolis{" "}
              <strong>238</strong> 52.1%
            </li>
            <li>
              <span className="legend-dot orange"></span> Caxias do Sul{" "}
              <strong>189</strong> 22.8%
            </li>
            <li>
              <span className="legend-dot yellow"></span> São José{" "}
              <strong>98</strong> 13.9%
            </li>
            <li>
              <span className="legend-dot red"></span> Palhoça{" "}
              <strong>32</strong> 11.2%
            </li>
          </ul>
        </div>

        <div className="operacao-card operacao-table-card">
          <h4>OS por bairro</h4>
          <table className="operacao-table">
            <thead>
              <tr>
                <th></th>
                <th>Bairro</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>INGLÊS DO RIO VERMELHO</td>
                <td>
                  <strong>48</strong>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>SÃO JOÃO DO RIO VERMELHO</td>
                <td>
                  <strong>43</strong>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>CACHOEIRA DO BOM JESUS</td>
                <td>
                  <strong>38</strong>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>CANASVIEIRAS</td>
                <td>
                  <strong>33</strong>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>JURERÊ</td>
                <td>
                  <strong>26</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="operacao-section operacao-extra-section">
        <div className="operacao-card operacao-table-card">
          <h4>Qtd. média de produção</h4>
          <table className="operacao-table">
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Dias úteis</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>JOÃO SILVA DOS SANTOS</td>
                <td>34</td>
                <td>
                  <strong>87</strong>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>JOSÉ DE SOUZA SILVA</td>
                <td>32</td>
                <td>
                  <strong>83</strong>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>MARIANA SANTOS MEDEIROS</td>
                <td>28</td>
                <td>
                  <strong>78</strong>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>JORGE ARAGÃO DE OLIVEIRA</td>
                <td>21</td>
                <td>
                  <strong>77</strong>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>MARIA BRAGA DE JESUS</td>
                <td>19</td>
                <td>
                  <strong>69</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="operacao-card operacao-table-card">
          <h4>Motivos de fechamento</h4>
          <table className="operacao-table">
            <thead>
              <tr>
                <th></th>
                <th>Motivo</th>
                <th>Qtd.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>INSTALAÇÃO - CONCLUÍDA NO PADRÃO</td>
                <td>
                  <strong>53</strong>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>SEM ACESSO/TROCA DE DROP - CAMINHÃO...</td>
                <td>
                  <strong>17</strong>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>TROCA DE ENDEREÇO - CABO NOVO</td>
                <td>
                  <strong>15</strong>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>UPGRADE REALIZADO COM SUCESSO</td>
                <td>
                  <strong>10</strong>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>MANUTENÇÃO - REALIZADA COM SUCESSO</td>
                <td>
                  <strong>7</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="operacao-section operacao-final-section">
        <div className="operacao-card operacao-table-card">
          <h4>Últimas Ordens de Serviço</h4>
          <table className="operacao-table large">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome/Razão Social</th>
                <th>Tipo</th>
                <th>Descrição abertura</th>
                <th>Descrição fechamento</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>ÉBER ROSSI</td>
                <td>INSTALAÇÃO GPON (PREDIO ADAPTADO)</td>
                <td>ID CLIENTE SERVIÇO: 53689 PLANO...</td>
                <td>Cliente satisfeito com a instala...</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>2.</td>
                <td>ANGELO FARIA LIMA</td>
                <td>INSTALAÇÃO GPON</td>
                <td>ID CLIENTE SERVIÇO: 52796 PLANO...</td>
                <td>Finalizado via API</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>3.</td>
                <td>ZINGA MERCADO LTDA</td>
                <td>DESISTÊNCIA INSTALAÇÃO</td>
                <td>ID CLIENTE SERVIÇO: 54052 PLANO...</td>
                <td>Inviabilidade técnica</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>4.</td>
                <td>JOANA SILVEIRA</td>
                <td>MANUTENÇÃO CLIENTE</td>
                <td>Cliente deseja realocar equipam...</td>
                <td>Passado um cabo novo</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
              <tr>
                <td>5.</td>
                <td>MARIANA FERREIRA</td>
                <td>APOIO TÉCNICO ORDEM DE SERVIÇO</td>
                <td>Apoio ao técnico Adriano.</td>
                <td>Atividade de apoio realizado</td>
                <td>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    🔗
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default DashboardGerencialOperacao;
