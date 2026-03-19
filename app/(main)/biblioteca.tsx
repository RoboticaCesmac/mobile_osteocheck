import AppText from "@/components/appText.component";
import Container from "@/components/container.component";
import colors from "@/constants/colors";
import textSize from "@/constants/textSize";
import { AppContext, ScreenName } from "@/context/appContext";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

interface FAQItemProps {
  question: string;
  answer: string;
}

const faqs: FAQItemProps[] = [
  {
    question: "O que são drogas antirreabsortivas (DAs)?",
    answer: "São agentes modificadores ósseos que inibem a atividade dos osteoclastos, reduzindo a perda de massa óssea e o risco de fraturas. São usadas no tratamento de osteoporose, doença de Paget e em pacientes oncológicos (Ruggiero et al., 2022; Yarom et al., 2019)."
  },
  {
    question: "Quais DAs estão disponíveis no mercado?",
    answer: "As principais classes são os bisfosfonatos (alendronato, risedronato, ibandronato, ácido zoledrônico) e o anticorpo monoclonal denosumabe. (Yarom et al., 2019; Ruggiero et al., 2022)."
  },
  {
    question: "Quais são os mecanismos de ação das DAs?",
    answer: "Bisfosfonatos ligam-se à hidroxiapatita da matriz óssea e induzem apoptose de osteoclastos. O denosumabe bloqueia a ligação RANKL-RANK, impedindo a diferenciação e ativação dos osteoclastos de forma reversível (Fleisch, 1998; Cummings et al., 2009; Ruggiero et al., 2022)."
  },
  {
    question: "Quais as indicações médicas para o uso das DAs?",
    answer: "Osteoporose (homens e mulheres), doença de Paget e prevenção de complicações esqueléticas em pacientes oncológicos com metástases ósseas, mieloma múltiplo ou hipercalcemia maligna (Yarom et al., 2019; Ruggiero et al., 2022)."
  },
  {
    question: "Quais as diferenças entre as vias de administração das DAs?",
    answer: 'As medicações orais são mais utilizadas na osteoporose, exigindo uso contínuo e cuidados com a posologia para garantir absorção. As intravenosas são indicadas principalmente em oncologia, com maior potência e risco de osteonecrose dos maxilares. E a subcutânea (denosumabe) é administrada em intervalos regulares podendo ser mensal, bimestral, trimestral ou semestral, com meia-vida de 6 meses e ação reversível, utilizada tanto na osteoporose quanto na oncologia (Yarom et al., 2019; Ruggiero et al., 2022).'
  },
  {
    question: 'Interações medicamentosas relevantes',
    answer: 'Corticosteroides, quimioterápicos, imunossupressores e agentes antiangiogênicos potencializam o risco de ONM-RM. Medicamentos que causam xerostomia também aumentam o risco (Ruggiero et al., 2022; Yarom et al., 2019).'
  },
  {
    question: 'Osteonecrose dos maxilares: epidemiologia e fatores de risco',
    answer: 'Maior incidência em pacientes oncológicos (0,7%-6,7%) vs. osteoporose (<0,05%). Fatores de risco: via IV, duração do tratamento, comorbidades, tabagismo e procedimentos odontológicos invasivos (Ruggiero et al., 2022; Dioguardi et al., 2023).'
  },
  {
    question: 'Sinais clínicos e diagnóstico precoce',
    answer: 'Sinal cardinal: osso exposto >8 semanas. Sinais precoces (Estágio 0): dor óssea, parestesia, mobilidade dentária inexplicável, alterações radiográficas e ulcerações mucosas persistentes (Ruggiero et al., 2022; Yarom et al., 2019).'
  },
  {
    question: 'Orientações pré-tratamento com agentes antirreabsortivos',
    answer: 'Avaliação odontológica completa antes do início da terapia. Identificar e tratar focos infecciosos, remover dentes com prognóstico desfavorável e orientar o paciente sobre higiene e sinais de alerta (Ruggiero et al., 2022; Yarom et al., 2019).'
  },
  {
    question: 'Prevenção de complicações em pacientes sob bisfosfonatos',
    answer: 'Abordagem minimamente invasiva. Priorizar procedimentos conservadores como a endodontia. Em cirurgias, usar técnicas atraumáticas, antissepsia rigorosa, antibioticoprofilaxia e fechamento primário (Ruggiero et al., 2022).'
  },
  {
    question: 'Drug holiday: o que dizem as evidências',
    answer: 'A suspensão temporária é controversa. Evidências atuais não mostraram benefício clínico consistente. A decisão deve ser individualizada, pesando risco de eventos esqueléticos versus risco de osteonecrose (Ruggiero et al., 2022).'
  },
];

function FAQItem({ question, answer }: FAQItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqContainer}>
      <TouchableOpacity
        style={styles.faqHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <AppText
          content={question}
          size={textSize.regular}
          textProps={{ style: { flex: 1, fontWeight: "bold" } }}
        />
        <AntDesign name={expanded ? "up" : "down"} size={20} color={colors.mainWhite} />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqBody}>
          <AppText
            content={answer}
            size={textSize.regular}
          />
        </View>
      )}
    </View>
  );
}

export default function BibliotecaScreen() {
  const appContext = useContext(AppContext);

  useFocusEffect(
    useCallback(() => {
      appContext.handleShowHeaderComponent(true, ScreenName.Library);
    }, [])
  );

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <AppText
          content="Biblioteca Rápida"
          size={textSize.big}
          textProps={{ style: { marginBottom: 20, fontWeight: "bold" } }}
        />
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingInline: 30,
    paddingBottom: 40,
  },
  faqContainer: {
    backgroundColor: colors.opaqueBlue,
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.opaqueBlue,
  },
  faqBody: {
    padding: 20,
    paddingTop: 0,
  }
});
