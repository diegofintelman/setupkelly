import { useState, useEffect, useCallback } from "react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

// =============================================
// CONTEÚDO DO GUIA
// =============================================
const STEPS = [
  {
    phase: 1,
    day: "Dia 1",
    title: "Criar Perfil Pessoal no Facebook",
    icon: "👤",
    color: "#2E75B6",
    why: "Esse perfil será a base de toda a sua estrutura profissional. Ele precisa ser criado do zero, separado do seu perfil antigo, para garantir que a Meta reconheça você como uma conta americana desde o início.",
    alert: "⚠️ NÃO use o mesmo e-mail ou telefone do seu perfil antigo. Use dados novos.",
    instructions: [
      { text: "Abra o navegador do celular (Safari ou Chrome)", detail: "Não use o app do Facebook. Pelo navegador você tem mais controle das configurações.", img: "🌐" },
      { text: "Acesse facebook.com e clique em \"Criar nova conta\"", detail: "Use seu nome real (Kelly Belem). A Meta pode pedir verificação de identidade depois.", link: "https://www.facebook.com/r.php", linkLabel: "Abrir página de cadastro do Facebook", img: "➕" },
      { text: "Use um e-mail NOVO (que nunca usou no Facebook)", detail: "Se precisar, crie um Gmail novo rapidinho. Não use o e-mail do perfil antigo.", link: "https://accounts.google.com/signup", linkLabel: "Criar um Gmail novo", img: "📧" },
      { text: "Coloque seu TELEFONE AMERICANO", detail: "Esse número será usado para verificação. Use o número do seu chip dos EUA.", img: "📱" },
      { text: "Na data de nascimento, coloque a real", detail: "A Meta pode pedir documento depois. Se os dados não baterem, bloqueia.", img: "🎂" },
      { text: "Confirme o e-mail (abra o e-mail e clique no link)", detail: "Verifique a caixa de spam se não aparecer na caixa de entrada.", img: "✅" },
      { text: "Pronto! Perfil criado. Agora AQUEÇA A CONTA por 2 DIAS antes do próximo passo.", detail: "A Meta monitora contas novas. Se você criar tudo no mesmo dia, pode levantar suspeita e bloquear.\n\nDurante esses 2 dias, USE o perfil normalmente:\n✅ Adicione amigos e familiares\n✅ Curta posts e páginas\n✅ Comente em publicações\n✅ Compartilhe algo no seu feed\n✅ Coloque foto de perfil e capa\n\nIsso mostra pra Meta que é uma pessoa real usando a conta. Paciência aqui é essencial.", img: "⏰" },
    ],
    checklist: [
      "Usei um e-mail novo (nunca usado no Facebook)",
      "Coloquei meu telefone americano",
      "Meu nome está igual ao do meu documento",
      "Confirmei o e-mail pelo link enviado",
      "Adicionei amigos e interagi com o perfil",
      "Vou esperar 2 dias antes do próximo passo",
    ],
  },
  {
    phase: 2,
    day: "Dia 3",
    title: "Criar a Página no Facebook",
    icon: "📄",
    color: "#1B6B3A",
    why: "A Página é o que aparece publicamente quando você anuncia. É a \"identidade\" do seu negócio dentro do Facebook e Instagram. Sem ela, não dá pra criar conta de anúncios.",
    alert: "⚠️ Crie a página pelo PERFIL NOVO que você criou no Dia 1. Não use o perfil antigo.",
    instructions: [
      { text: "Entre no Facebook com o PERFIL NOVO", detail: "Certifique-se de estar logada no perfil que criou no Dia 1, não no antigo.", link: "https://www.facebook.com/", linkLabel: "Abrir Facebook", img: "🔑" },
      { text: "Vá direto para a criação de Página", detail: "Clique no link abaixo. Se pedir login, entre com o perfil NOVO. Depois é só preencher as informações.", link: "https://www.facebook.com/pages/create", linkLabel: "Criar nova Página", img: "➕" },
      { text: "Nome da Página: coloque o nome do seu negócio", detail: "Use o nome que seus clientes conhecem. Pode mudar depois, mas é melhor já acertar.", img: "✏️" },
      { text: "Categoria: escolha a que mais se encaixa no seu negócio", detail: "Digite palavras-chave e o Facebook sugere. Ex: \"Consultoria\", \"Loja\", \"Serviço profissional\".", img: "🏷️" },
      { text: "Preencha a descrição (pode ser simples por enquanto)", detail: "Uma ou duas frases sobre o que você faz. Depois a gente melhora.", img: "📝" },
      { text: "Foto de perfil e capa: pode colocar provisória", detail: "Coloque qualquer imagem por enquanto. O importante é a página existir. Depois a gente capricha.", img: "🖼️" },
      { text: "Pronto! Página criada. AQUEÇA A PÁGINA por 2 DIAS antes do próximo passo.", detail: "Mesma lógica do perfil: a Meta precisa \"confiar\" na sua conta antes de liberar funcionalidades de negócios.\n\nDurante esses 2 dias, MOVIMENTE a página:\n✅ Faça pelo menos 2-3 publicações (pode ser simples)\n✅ Convide amigos para curtir a página\n✅ Responda qualquer comentário que aparecer\n✅ Preencha as informações da página (sobre, horário, contato)\n✅ Compartilhe a página no seu perfil pessoal\n\nPágina com atividade = menos chance de bloqueio.", img: "⏰" },
    ],
    checklist: [
      "Estou logada no perfil NOVO (não no antigo)",
      "Criei a Página com o nome do meu negócio",
      "Escolhi a categoria correta",
      "Coloquei pelo menos uma foto de perfil",
      "Fiz publicações e movimentei a página",
      "Vou esperar 2 dias antes do próximo passo",
    ],
  },
  {
    phase: 3,
    day: "Dia 5",
    title: "Criar o Business Manager e adicionar Diego",
    icon: "🏢",
    color: "#D4A017",
    why: "O Business Manager (Gerenciador de Negócios) é o painel central que controla tudo: páginas, contas de anúncio, pessoas com acesso. É aqui que a gente vai configurar sua conta de anúncios americana corretamente.",
    alert: "⚠️ Preste MUITA atenção nas configurações de país e idioma. É aqui que o problema antigo aconteceu.",
    instructions: [
      { text: "Abra o navegador e acesse o Business Manager", detail: "Use o computador se possível. Pelo celular funciona, mas o computador é mais fácil de visualizar.", link: "https://business.facebook.com/overview", linkLabel: "Abrir Business Manager", img: "💻" },
      { text: "Faça login com o PERFIL NOVO", detail: "O mesmo que você criou no Dia 1 e usou pra criar a Página.", img: "🔑" },
      { text: "Clique em \"Criar conta\" (Create Account)", detail: "Se aparecer em inglês, não se preocupe. Vou te guiar.", img: "➕" },
      { text: "Nome do negócio: coloque o nome da sua empresa ou seu nome profissional", detail: "Ex: \"Kelly Belem\" ou o nome do seu negócio.", img: "✏️" },
      { text: "Seu nome: Kelly Belem", detail: "Coloque exatamente como está no seu documento americano.", img: "👤" },
      { text: "E-mail comercial: use o MESMO e-mail novo do perfil", detail: "Mantenha tudo consistente. Mesmo e-mail que usou no perfil do Facebook.", img: "📧" },
      { text: "🔴 ATENÇÃO — Nas configurações do Business Manager, verifique:", detail: "País: United States (Estados Unidos)\nMoeda: USD (Dólar americano)\nFuso horário: Eastern Time\n\nSe alguma dessas opções aparecer como Brasil ou BRL, MUDE ANTES DE CONTINUAR. Essa é a parte mais importante de todo o processo.", img: "🚨" },
      { text: "Agora, adicione o Diego como administrador", detail: "Vá em Configurações > Pessoas > Adicionar pessoa\n\nDigite o e-mail: diegofintelman@gmail.com\n\nDê permissão de ADMINISTRADOR (não apenas analista)\n\nIsso permite que o Diego faça as configurações técnicas da conta de anúncios, pixel e tudo mais — sem risco de erro.\n\nA partir daqui, o Diego assume a parte técnica. Ele vai criar a conta de anúncios, configurar o fuso horário, a moeda, vincular a página e o Instagram. Você só vai precisar adicionar o cartão de crédito quando ele pedir.", img: "🤝" },
    ],
    checklist: [
      "Acessei business.facebook.com com o perfil NOVO",
      "Criei a conta do Business Manager",
      "País está como United States / Estados Unidos",
      "Moeda está como USD (Dólar)",
      "Fuso horário está como Eastern Time",
      "Adicionei diegofintelman@gmail.com como administrador",
    ],
  },
];

// =============================================
// HOOK: PROGRESSO NO SUPABASE
// =============================================
interface CheckedState {
  [key: string]: boolean;
}

function useProgresso(slug: string) {
  const [checked, setCheckedState] = useState<CheckedState>({});
  const [activeStep, setActiveStepState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    async function load() {
      const { data, error } = await supabase
        .from("progresso")
        .select("checked, active_step")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        setCheckedState((data.checked as CheckedState) || {});
        setActiveStepState((data.active_step as number) ?? 0);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  const persist = useCallback(async (newChecked: CheckedState, newStep: number) => {
    if (!slug) return;
    setSaving(true);
    await supabase.from("progresso").upsert(
      { slug, checked: newChecked, active_step: newStep },
      { onConflict: "slug" }
    );
    setSaving(false);
  }, [slug]);

  const toggleCheck = useCallback((stepIdx: number, checkIdx: number) => {
    const key = `${stepIdx}-${checkIdx}`;
    setCheckedState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      persist(next, activeStep);
      return next;
    });
  }, [activeStep, persist]);

  const goToStep = useCallback((i: number) => {
    setActiveStepState(i);
    persist(checked, i);
  }, [checked, persist]);

  return { checked, activeStep, loading, saving, toggleCheck, goToStep };
}

// =============================================
// COMPONENTE: CARD DE ETAPA
// =============================================
interface StepCardProps {
  step: typeof STEPS[number];
  isActive: boolean;
  onClick: () => void;
  isComplete: boolean;
}

function StepCard({ step, isActive, onClick, isComplete }: StepCardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        ...s.phaseBtn,
        borderColor: isActive ? step.color : isComplete ? "#A5D6A7" : "#E2E6EC",
        background: isActive ? `${step.color}08` : isComplete ? "#f0f9f3" : "#fff",
        transform: isActive ? "scale(1.02)" : "scale(1)",
      }}
    >
      <div style={{ ...s.phaseBadge, background: isComplete ? "#2E8B57" : step.color }}>
        {isComplete ? "✓" : step.phase}
      </div>
      <div style={s.phaseInfo}>
        <div style={s.phaseDay}>{step.day}</div>
        <div style={s.phaseTitle}>{step.title}</div>
      </div>
      <div style={{ fontSize: 24 }}>{step.icon}</div>
    </button>
  );
}

// =============================================
// COMPONENTE PRINCIPAL
// =============================================
export default function GuiaKelly() {
  const slug = new URLSearchParams(window.location.search).get("cliente") || "demo";
  const { checked, activeStep, loading, saving, toggleCheck, goToStep } = useProgresso(slug);
  const [expandedInstr, setExpandedInstr] = useState<Record<number, boolean>>({});

  const step = STEPS[activeStep];

  const isStepComplete = (stepIdx: number) =>
    STEPS[stepIdx].checklist.every((_, ci) => checked[`${stepIdx}-${ci}`]);

  const allComplete = STEPS.every((_, i) => isStepComplete(i));

  const toggleInstr = (idx: number) =>
    setExpandedInstr(prev => ({ ...prev, [idx]: !prev[idx] }));

  if (loading) {
    return (
      <div style={{ ...s.app, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
          <p style={{ color: "#555", fontSize: 15 }}>Carregando seu progresso...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.app}>
      {/* HEADER */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div>
            <h1 style={s.headerTitle}>Guia de Configuração</h1>
            <p style={s.headerSub}>Siga cada etapa com calma. Sem pressa!</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 6 }}>
            <img src={logo} alt="Diego Fintelman - Tráfego Pago" style={{ height: 48, width: "auto", objectFit: "contain" }} />
            <div style={s.headerBadge}>
              {STEPS.filter((_, i) => isStepComplete(i)).length} de {STEPS.length} etapas
            </div>
            {saving && (
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>💾 Salvando...</div>
            )}
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div style={s.timeline}>
        {STEPS.map((st, i) => (
          <StepCard
            key={i}
            step={st}
            isActive={activeStep === i}
            isComplete={isStepComplete(i)}
            onClick={() => goToStep(i)}
          />
        ))}
      </div>

      {/* CONTEÚDO */}
      <div style={s.content}>
        <div style={{ ...s.phaseHeader, borderLeftColor: step.color }}>
          <div style={s.phaseHeaderTop}>
            <span style={{ fontSize: 32 }}>{step.icon}</span>
            <div>
              <div style={{ ...s.dayLabel, color: step.color }}>{step.day}</div>
              <h2 style={s.contentTitle}>{step.title}</h2>
            </div>
          </div>
          <p style={s.whyText}>{step.why}</p>
          <div style={s.alertBox}>{step.alert}</div>
        </div>

        {/* INSTRUÇÕES */}
        <div style={s.instrList}>
          <p style={s.sectionLabel}>📋 Passo a passo</p>
          {step.instructions.map((instr, idx) => {
            const isOpen = expandedInstr[idx];
            return (
              <div
                key={idx}
                style={{
                  ...s.instrCard,
                  boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
                  border: isOpen ? `1px solid ${step.color}30` : "1px solid #E8EBF0",
                }}
              >
                <div style={s.instrHeader} onClick={() => toggleInstr(idx)}>
                  <div style={{ ...s.instrNum, background: step.color }}>{idx + 1}</div>
                  <div style={s.instrIcon}>{instr.img}</div>
                  <div style={s.instrText}>{instr.text}</div>
                  <div style={s.instrChevron}>{isOpen ? "▲" : "▼"}</div>
                </div>
                {isOpen && (
                  <div style={s.instrDetail}>
                    {instr.detail.split("\n").map((line, li) => (
                      <p key={li} style={s.instrDetailLine}>{line}</p>
                    ))}
                    {instr.link && (
                      <a href={instr.link} target="_blank" rel="noopener noreferrer" style={s.instrLink}>
                        🔗 {instr.linkLabel}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CHECKLIST */}
        <div style={s.checkSection}>
          <p style={s.sectionLabel}>✅ Checklist — marque o que já fez</p>
          <div style={s.checkList}>
            {step.checklist.map((item, ci) => {
              const key = `${activeStep}-${ci}`;
              const done = !!checked[key];
              return (
                <button
                  key={ci}
                  onClick={() => toggleCheck(activeStep, ci)}
                  style={{
                    ...s.checkItem,
                    borderColor: done ? step.color : "#E2E6EC",
                    background: done ? `${step.color}08` : "#fff",
                  }}
                >
                  <div style={{
                    ...s.checkBox,
                    background: done ? step.color : "transparent",
                    borderColor: done ? step.color : "#CCC",
                  }}>
                    {done && <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>✓</span>}
                  </div>
                  <span style={{
                    ...s.checkText,
                    color: done ? "#333" : "#555",
                    textDecoration: done ? "line-through" : "none",
                  }}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTÃO PRÓXIMA ETAPA */}
        {!allComplete && (
          <button
            onClick={() => {
              if (activeStep < STEPS.length - 1) goToStep(activeStep + 1);
            }}
            disabled={!isStepComplete(activeStep)}
            style={{
              ...s.nextBtn,
              background: isStepComplete(activeStep)
                ? `linear-gradient(135deg, ${step.color}, ${step.color}CC)`
                : "#E0E0E0",
              cursor: isStepComplete(activeStep) ? "pointer" : "not-allowed",
              color: isStepComplete(activeStep) ? "#fff" : "#999",
            }}
          >
            {isStepComplete(activeStep)
              ? activeStep < STEPS.length - 1
                ? `Ir para ${STEPS[activeStep + 1].title} →`
                : "Concluir ✓"
              : "Complete o checklist para avançar"}
          </button>
        )}

        {/* TELA FINAL */}
        {allComplete && (
          <div style={s.doneBox}>
            <div style={{ fontSize: 48 }}>🎉</div>
            <h3 style={s.doneTitle}>Setup completo!</h3>
            <p style={s.doneText}>
              Você concluiu todas as etapas. Agora é só aguardar o Diego finalizar a parte técnica.
              Em breve sua conta de anúncios estará 100% americana e pronta para rodar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================
// ESTILOS
// =============================================
const s: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    background: "#F4F6FA",
    minHeight: "100vh",
    paddingBottom: 40,
  },
  header: {
    background: "linear-gradient(135deg, #1a2744 0%, #2E75B6 100%)",
    padding: "28px 24px 48px",
  },
  headerInner: {
    maxWidth: 700,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  headerTitle: {
    margin: 0,
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
  },
  headerSub: {
    margin: "4px 0 0",
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
  },
  headerBadge: {
    background: "rgba(255,255,255,0.12)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  timeline: {
    maxWidth: 700,
    margin: "-16px auto 0",
    padding: "0 24px",
    display: "flex",
    flexWrap: "wrap" as const,
    gap: 10,
  },
  phaseBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 14px",
    background: "#fff",
    border: "2px solid #E2E6EC",
    borderRadius: 14,
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
    fontFamily: "inherit",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  phaseBadge: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    flexShrink: 0,
  },
  phaseInfo: { flex: 1, minWidth: 0 },
  phaseDay: {
    fontSize: 11,
    fontWeight: 600,
    color: "#8892A4",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  phaseTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a1a2e",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  content: {
    maxWidth: 700,
    margin: "20px auto 0",
    padding: "0 24px",
  },
  phaseHeader: {
    background: "#fff",
    borderRadius: 16,
    padding: 24,
    borderLeft: "5px solid",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    marginBottom: 20,
  },
  phaseHeaderTop: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    color: "#0F1724",
  },
  whyText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.65,
    margin: "0 0 14px",
  },
  alertBox: {
    padding: "12px 16px",
    background: "#FFF3E0",
    border: "1px solid #FFB74D",
    borderRadius: 10,
    fontSize: 13,
    color: "#E65100",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  instrList: { marginBottom: 20 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "#8892A4",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    margin: "0 0 12px",
  },
  instrCard: {
    background: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    border: "1px solid #E8EBF0",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  instrHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
  },
  instrNum: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    flexShrink: 0,
  },
  instrIcon: { fontSize: 20, flexShrink: 0 },
  instrText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 600,
    color: "#1a1a2e",
    lineHeight: 1.4,
  },
  instrChevron: { color: "#AAA", fontSize: 12, flexShrink: 0 },
  instrDetail: { padding: "0 16px 14px 70px" },
  instrDetailLine: {
    fontSize: 13,
    color: "#666",
    lineHeight: 1.6,
    margin: "0 0 4px",
  },
  instrLink: {
    display: "inline-block",
    marginTop: 10,
    padding: "10px 18px",
    background: "linear-gradient(135deg, #2E75B6, #1B3A5C)",
    color: "#fff",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    transition: "all 0.15s",
    boxShadow: "0 2px 8px rgba(46,117,182,0.25)",
  },
  checkSection: { marginBottom: 24 },
  checkList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  checkItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 16px",
    background: "#fff",
    border: "1.5px solid #E2E6EC",
    borderRadius: 10,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
    transition: "all 0.15s",
    width: "100%",
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    border: "2px solid #CCC",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.15s",
  },
  checkText: {
    fontSize: 14,
    lineHeight: 1.4,
    transition: "all 0.15s",
  },
  nextBtn: {
    width: "100%",
    padding: "16px 24px",
    border: "none",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "inherit",
    textAlign: "center",
    marginBottom: 20,
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    transition: "all 0.2s",
  },
  doneBox: {
    background: "linear-gradient(135deg, #f0f9f3, #e8f5e9)",
    border: "2px solid #A5D6A7",
    borderRadius: 16,
    padding: 32,
    textAlign: "center",
    marginTop: 8,
  },
  doneTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1B6B3A",
    margin: "12px 0 8px",
  },
  doneText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 1.6,
    maxWidth: 450,
    margin: "0 auto",
  },
};
