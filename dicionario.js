/**
 * Dicionário Clínico — Termos médicos em linguagem simples
 * 
 * Para tornar o sistema acessível a pessoas leigas,
 * explicando palavras técnicas usadas nas outras abas.
 */

document.addEventListener('DOMContentLoaded', function() {
    initDicionario();
});

const dicionarioTermos = [
    // === A ===
    { term: 'Acolia', simple: 'Fezes muito claras (esbranquiçadas)', detail: 'Acontece quando a bile não chega ao intestino, geralmente por obstrução das vias biliares (cálculos ou tumores). As fezes ficam sem a cor marrom habitual.' },
    { term: 'Adenopatia', simple: 'Ínguas inchadas', detail: 'Aumento dos gânglios linfáticos (linfonodos). Pode ser por infecção, inflamação ou, mais raramente, câncer.' },
    { term: 'Anasarca', simple: 'Inchaço generalizado por todo o corpo', detail: 'Acúmulo de líquido nos tecidos de forma difusa. Pode ocorrer na insuficiência cardíaca, renal ou hepática avançada.' },
    { term: 'Anisocoria', simple: 'Pupilas de tamanhos diferentes', detail: 'Quando um olho tem a pupila maior que o outro. Pode indicar lesão neurológica grave (AVC, herniação cerebral).' },
    { term: 'Anosmia', simple: 'Perda do olfato', detail: 'Incapacidade de sentir cheiros. Ficou conhecida como sintoma de COVID-19, mas pode ter outras causas.' },
    { term: 'Anticoagulação', simple: 'Uso de remédios que "afinam o sangue"', detail: 'Medicamentos que impedem a formação de coágulos. Usados em arritmias (FA), trombose, embolia pulmonar.' },
    { term: 'Arritmia', simple: 'Coração batendo de forma irregular', detail: 'O coração pode bater rápido demais, devagar demais ou de forma desorganizada. Algumas são inofensivas, outras são emergências.' },
    { term: 'Ascite', simple: 'Barriga cheia de líquido', detail: 'Acúmulo de líquido dentro do abdome. Causa mais comum: cirrose hepática (doença do fígado por álcool).' },
    { term: 'Ataxia', simple: 'Falta de coordenação nos movimentos', detail: 'A pessoa anda cambaleando, como se estivesse bêbada, mesmo sem ter bebido. Pode indicar problema no cerebelo.' },

    // === B ===
    { term: 'Bradicardia', simple: 'Coração batendo muito devagar (< 60 bpm)', detail: 'A frequência cardíaca está abaixo do normal. Pode ser normal em atletas, mas se causar tontura ou desmaio, requer avaliação.' },
    { term: 'Broncoscopia', simple: 'Exame que "olha dentro" dos pulmões com uma câmera', detail: 'Um tubo fino com câmera entra pela boca/nariz até os brônquios. Serve para investigar tosse com sangue, massas pulmonares, etc.' },

    // === C ===
    { term: 'Cianose', simple: 'Lábios e extremidades roxos/azulados', detail: 'Indica que o sangue não está recebendo oxigênio suficiente. É um sinal de gravidade que requer atendimento imediato.' },
    { term: 'Colúria', simple: 'Urina escura como coca-cola', detail: 'Urina muito escura por excesso de bilirrubina. Junto com icterícia e acolia, sugere obstrução das vias biliares.' },
    { term: 'Crepitações', simple: 'Sons de "estalo" no pulmão (ouvidos com estetoscópio)', detail: 'Ruídos finos que o médico ouve ao auscultar o pulmão. Podem indicar líquido nos pulmões (pneumonia, insuficiência cardíaca).' },

    // === D ===
    { term: 'Disfagia', simple: 'Dificuldade para engolir', detail: 'Sensação de comida "travando" na garganta ou no peito. Pode ser por problemas no esôfago (estreitamento, tumor, espasmo).' },
    { term: 'Dispneia', simple: 'Falta de ar / dificuldade para respirar', detail: 'Sensação subjetiva de não conseguir respirar bem. Pode ser por problemas no coração, pulmão, anemia ou ansiedade.' },
    { term: 'Disúria', simple: 'Dor ou ardência ao urinar', detail: 'Geralmente causada por infecção urinária (cistite). Mais comum em mulheres.' },
    { term: 'Diurese', simple: 'Quantidade de urina produzida', detail: '"Boa diurese" = urinando normalmente. "Oligúria" = pouca urina. "Anúria" = sem urina.' },

    // === E ===
    { term: 'Edema', simple: 'Inchaço por acúmulo de líquido', detail: 'Pernas inchadas, olhos inchados, ou inchaço em qualquer parte. Causas: coração fraco, rim doente, fígado doente, ou problema nas veias.' },
    { term: 'Embolia Pulmonar (TEP)', simple: 'Coágulo de sangue que entope uma artéria do pulmão', detail: 'Um coágulo (geralmente da perna) viaja pelo sangue e fica preso no pulmão. Causa falta de ar súbita e pode ser fatal. Emergência.' },
    { term: 'Epistaxe', simple: 'Sangramento pelo nariz', detail: 'Na maioria das vezes é benigno (vasos frágeis na frente do nariz). Se for intenso ou recorrente, investigar pressão alta ou problemas de coagulação.' },
    { term: 'Estridor', simple: 'Ruído agudo ao respirar (como um assobio/chiado na garganta)', detail: 'Indica obstrução na parte alta das vias aéreas (laringe/traqueia). Pode ser por corpo estranho, alergia grave ou infecção. É uma emergência.' },
    { term: 'Exantema', simple: 'Manchas vermelhas espalhadas pela pele', detail: 'Erupção cutânea difusa. Causas: dengue, sarampo, rubéola, alergia a medicamentos, outras viroses.' },

    // === F ===
    { term: 'Febre de Origem Desconhecida (FOD)', simple: 'Febre que dura semanas e ninguém sabe a causa', detail: 'Febre > 38,3°C por mais de 3 semanas sem diagnóstico após investigação inicial. Requer investigação aprofundada.' },
    { term: 'Fibrilação Atrial (FA)', simple: 'Coração batendo de forma irregular e desorganizada', detail: 'A parte de cima do coração treme ao invés de bater. Aumenta muito o risco de AVC. Tratamento inclui anticoagulação.' },

    // === G ===
    { term: 'Glasgow (Escala de)', simple: 'Pontuação que mede o nível de consciência', detail: 'Vai de 3 (coma profundo) a 15 (totalmente acordado). Avalia: abertura dos olhos, fala e movimentos. Glasgow ≤ 8 = necessidade de intubação.' },
    { term: 'Glicemia', simple: 'Nível de açúcar no sangue', detail: 'Normal em jejum: 70-99 mg/dL. Acima de 126 em jejum = diabetes. Abaixo de 60 = hipoglicemia (perigoso).' },

    // === H ===
    { term: 'Hematêmese', simple: 'Vômito com sangue', detail: 'Sangue vindo do estômago ou esôfago (pode ser vermelho vivo ou escuro como borra de café). Emergência.' },
    { term: 'Hematúria', simple: 'Sangue na urina', detail: 'Pode ser visível (urina vermelha/rosada) ou só detectável em exame. Causas: infecção, cálculos, ou mais raramente tumores.' },
    { term: 'Hemoptise', simple: 'Tossir sangue', detail: 'Sangue que sai com a tosse, vindo dos pulmões. Diferente de sangue que vem do estômago (hematêmese). Investigar sempre.' },
    { term: 'Hiperglicemia', simple: 'Açúcar alto no sangue', detail: 'Glicose sanguínea acima do normal. Se muito alta (> 300-400), pode causar cetoacidose diabética — uma emergência.' },
    { term: 'Hipotensão', simple: 'Pressão baixa', detail: 'Pressão arterial abaixo de 90/60 mmHg. Pode causar tontura, desmaio. Se grave, indica choque — o corpo não recebe sangue suficiente.' },
    { term: 'Hipoxemia', simple: 'Pouco oxigênio no sangue', detail: 'O sangue não está carregando oxigênio suficiente. Medido pela oximetria (SpO2). Normal: ≥ 95%. Abaixo de 92% = grave.' },

    // === I ===
    { term: 'Icterícia', simple: 'Pele e olhos amarelados', detail: 'Causada por acúmulo de bilirrubina (pigmento amarelo). Indica problema no fígado, na bile, ou destruição excessiva de glóbulos vermelhos.' },
    { term: 'Intubação Orotraqueal (IOT)', simple: 'Colocar um tubo na garganta para a pessoa respirar com ajuda de máquina', detail: 'Procedimento de emergência quando o paciente não consegue respirar sozinho ou está em coma (Glasgow ≤ 8).' },
    { term: 'Isquemia', simple: 'Falta de sangue em um órgão', detail: 'Quando uma artéria fica entupida e o órgão não recebe sangue/oxigênio. Ex: isquemia cardíaca (infarto), isquemia cerebral (AVC).' },

    // === K ===
    { term: 'Kussmaul (respiração de)', simple: 'Respiração muito profunda e rápida', detail: 'O corpo tenta compensar uma acidose (sangue ácido demais). Clássico da cetoacidose diabética. Parece que a pessoa está "ofegante" mas consciente.' },

    // === L ===
    { term: 'Lactato', simple: 'Substância que aumenta no sangue quando os órgãos estão sofrendo', detail: 'Lactato elevado indica que os tecidos não estão recebendo oxigênio adequadamente. Usado como marcador de gravidade em sepse.' },
    { term: 'Leucocitose', simple: 'Aumento dos glóbulos brancos no sangue', detail: 'Os "soldados" do corpo estão aumentados — geralmente por infecção ou inflamação. Leucócitos normais: 4.000-11.000.' },
    { term: 'Linfonodomegalia', simple: 'Ínguas/caroços aumentados', detail: 'Gânglios linfáticos inchados. Pode ser por infecção próxima, doenças autoimunes ou linfoma (câncer do sangue).' },

    // === M ===
    { term: 'Melena', simple: 'Fezes pretas e com cheiro muito forte', detail: 'Sangue digerido nas fezes (veio do estômago/intestino alto). As fezes ficam pretas, pastosas e fétidas. Diferente de sangue vivo (hematoquezia).' },
    { term: 'Meningismo', simple: 'Sinais de irritação da membrana que envolve o cérebro', detail: 'Rigidez de nuca + dor ao flexionar o pescoço. Sugere meningite (infecção das meninges) ou hemorragia subaracnoidea.' },

    // === N ===
    { term: 'Noctúria', simple: 'Acordar à noite para urinar', detail: 'Normal: 0-1 vez. Se acorda várias vezes, pode indicar próstata aumentada (homens), diabetes, insuficiência cardíaca.' },

    // === O ===
    { term: 'Oligúria', simple: 'Produzir pouca urina', detail: 'Menos de 400-500 mL por dia (ou menos de 0,5 mL/kg/hora). Sinal de que os rins estão falhando ou o corpo está desidratado.' },
    { term: 'Ortopneia', simple: 'Falta de ar ao deitar', detail: 'A pessoa precisa usar travesseiros altos ou sentar para conseguir respirar. Clássico de insuficiência cardíaca.' },
    { term: 'Oximetria (SpO2)', simple: 'Aparelhinho no dedo que mede o oxigênio do sangue', detail: 'Normal: 95-100%. Entre 92-94%: atenção. Abaixo de 92%: grave, precisa de oxigênio suplementar.' },

    // === P ===
    { term: 'Papiledema', simple: 'Inchaço do nervo óptico no fundo do olho', detail: 'Visto pelo médico ao examinar o olho com uma lanterna especial. Indica pressão aumentada dentro do crânio — pode ser tumor, hemorragia ou hidrocefalia.' },
    { term: 'Peritonismo', simple: 'Dor ao pressionar e soltar a barriga', detail: 'Quando o médico pressiona o abdome e solta, a dor piora (descompressão dolorosa). Indica irritação do peritônio — possível abdome agudo cirúrgico.' },
    { term: 'Petéquias', simple: 'Pontinhos vermelhos/roxos na pele que não somem ao pressionar', detail: 'São micro-hemorragias na pele. Podem indicar problemas de coagulação, dengue grave, ou infecção gravíssima (meningococcemia).' },
    { term: 'Pneumotórax', simple: 'Ar preso entre o pulmão e a parede do tórax', detail: 'O pulmão "murcha" parcialmente. Causa dor súbita e falta de ar. Se grande (hipertensivo), é emergência — precisa de drenagem imediata.' },
    { term: 'Polidipsia', simple: 'Sede excessiva e constante', detail: 'Beber muita água sem parar de ter sede. Junto com poliúria (urinar muito), é um sinal clássico de diabetes.' },
    { term: 'Poliúria', simple: 'Urinar em grande quantidade', detail: 'Produzir mais de 3 litros de urina por dia. Causas: diabetes mellitus, diabetes insipidus, excesso de líquidos.' },
    { term: 'Procalcitonina', simple: 'Exame de sangue que diferencia infecção bacteriana de viral', detail: 'Quando elevada, sugere infecção por bactéria (não por vírus). Ajuda o médico a decidir se precisa de antibiótico.' },
    { term: 'Púrpura', simple: 'Manchas roxas na pele (maiores que petéquias)', detail: 'Sangramento sob a pele. Não some ao pressionar. Pode ser por plaquetas baixas, vasculite ou uso de anticoagulantes.' },

    // === Q ===
    { term: 'qSOFA', simple: 'Teste rápido para ver se a pessoa pode estar com infecção grave (sepse)', detail: '3 perguntas simples: pressão baixa? Respiração rápida? Confusão mental? Se 2 ou mais: alta suspeita de sepse — precisa de antibiótico e soro imediatos.' },

    // === R ===
    { term: 'Rebaixamento de consciência', simple: 'Pessoa sonolenta, confusa ou inconsciente', detail: 'Pode variar de confusão leve até coma profundo. Causas: AVC, hipoglicemia, intoxicação, infecção grave, traumatismo.' },

    // === S ===
    { term: 'Sepse', simple: 'Infecção que se espalhou e está fazendo os órgãos falharem', detail: 'Uma infecção (pneumonia, urinária, etc.) que provoca uma reação descontrolada do corpo, lesando órgãos. Pode matar em horas. Emergência.' },
    { term: 'Sibilos', simple: 'Chiado no peito (som de "gato miando" ao respirar)', detail: 'Causado pelo estreitamento dos brônquios. Típico de asma e bronquite. Ouvido com estetoscópio ou, se intenso, a olho nu.' },
    { term: 'Síncope', simple: 'Desmaio com recuperação rápida', detail: 'Perda breve de consciência por falta temporária de sangue no cérebro. Pode ser benigno (emocional) ou grave (arritmia cardíaca).' },
    { term: 'Supra ST', simple: 'Alteração no eletrocardiograma que indica infarto', detail: 'Quando o "traçado" do ECG mostra uma elevação em certas partes, significa que uma artéria do coração está completamente entupida. Emergência.' },

    // === T ===
    { term: 'Taquicardia', simple: 'Coração batendo rápido demais (> 100 bpm)', detail: 'Pode ser normal (exercício, febre, ansiedade) ou indicar problemas sérios (arritmia, choque, embolia, desidratação).' },
    { term: 'Taquipneia', simple: 'Respiração muito rápida (> 20 por minuto)', detail: 'O corpo está tentando compensar falta de oxigênio ou excesso de acidez no sangue. Sinal de alerta.' },
    { term: 'Trombólise', simple: 'Medicamento que dissolve coágulo', detail: 'Remédio potente dado na veia para desfazer um coágulo no coração (infarto) ou no cérebro (AVC). Precisa ser dado em poucas horas.' },
    { term: 'Trombose Venosa Profunda (TVP)', simple: 'Coágulo de sangue na veia da perna', detail: 'A perna fica inchada, vermelha e dolorida. O perigo é o coágulo se soltar e ir para o pulmão (embolia pulmonar).' },
    { term: 'Troponina', simple: 'Exame de sangue que detecta lesão no coração', detail: 'Quando o músculo do coração sofre (infarto), libera troponina no sangue. Se elevada, confirma que houve dano cardíaco.' },
    { term: 'Turgência Jugular', simple: 'Veias do pescoço saltadas/ingurgitadas', detail: 'As veias jugulares ficam visíveis e distendidas. Indica que o coração direito está com dificuldade de receber sangue (IC direita, tamponamento).' },

    // === U ===
    { term: 'Urticária', simple: 'Placas vermelhas com coceira que aparecem e somem pelo corpo', detail: 'Reação alérgica na pele. As lesões "migram" — somem de um lugar e aparecem em outro. Se acompanhada de inchaço na garganta, é emergência (anafilaxia).' },

    // === V ===
    { term: 'Vasopressor', simple: 'Remédio que aumenta a pressão em pacientes graves', detail: 'Dado na veia em UTI quando a pressão está muito baixa (choque). Ex: noradrenalina. Mantém os órgãos recebendo sangue.' },

    // === X ===
    { term: 'Xantocromia', simple: 'Líquido da coluna amarelado (indica sangramento antigo)', detail: 'Quando o líquido da punção lombar sai amarelado, indica que houve sangramento no cérebro horas antes. Confirma hemorragia subaracnoidea.' },

    // === TERMOS ADICIONAIS DO SITE ===
    // (doenças, condições e procedimentos mencionados nas outras abas)

    { term: 'Acalásia', simple: 'O esôfago não consegue empurrar a comida para o estômago', detail: 'Doença em que o músculo na parte final do esôfago não relaxa. A comida "trava" e a pessoa pode regurgitar alimentos não digeridos.' },
    { term: 'Acidose metabólica', simple: 'O sangue ficou ácido demais', detail: 'pH do sangue abaixo de 7,35 por causas metabólicas (diabetes descompensado, insuficiência renal, intoxicações). O corpo tenta compensar respirando mais rápido (Kussmaul).' },
    { term: 'Adenomiose', simple: 'Endométrio (tecido do útero) invadindo a parede muscular do útero', detail: 'Causa sangramento menstrual abundante e cólicas fortes. Mais comum após os 35 anos. Tratamento: hormônios ou histerectomia em casos graves.' },
    { term: 'Aneurisma', simple: 'Dilatação ("balão") em uma artéria', detail: 'A parede de uma artéria fica fraca e se dilata. Se romper, causa hemorragia grave. Mais comuns: aorta abdominal e artérias cerebrais.' },
    { term: 'Aterosclerose', simple: 'Acúmulo de gordura nas artérias (entupimento)', detail: 'Placas de colesterol se depositam nas paredes das artérias ao longo dos anos, estreitando-as. Causa de infarto, AVC e doença vascular periférica.' },
    { term: 'Carcinoma', simple: 'Tipo de câncer que nasce nos tecidos de revestimento', detail: 'Câncer que se origina nas células epiteliais (pele, mucosas, órgãos internos). Ex: carcinoma renal = câncer do rim, carcinoma de pulmão = câncer do pulmão.' },
    { term: 'Carcinoma renal', simple: 'Câncer do rim', detail: 'Tumor maligno que nasce no rim. Pode causar sangue na urina, dor lombar e perda de peso. Às vezes descoberto acidentalmente em exames de imagem.' },
    { term: 'Cetoacidose diabética', simple: 'Complicação grave do diabetes — o corpo produz ácidos tóxicos', detail: 'Sem insulina, o corpo queima gordura e produz cetonas (ácidos). Causa hálito frutado, respiração rápida, confusão e pode levar ao coma. Emergência.' },
    { term: 'Colangite', simple: 'Infecção das vias biliares (canais da bile)', detail: 'Geralmente causada por cálculo biliar que obstrui o canal. Tríade de Charcot: febre + icterícia + dor abdominal direita. Emergência.' },
    { term: 'Colestase', simple: 'A bile está "parada" e não flui normalmente', detail: 'Pode ser por cálculos, tumores ou doenças do fígado. Causa coceira intensa, icterícia e fezes claras.' },
    { term: 'Decorticação', simple: 'Postura anormal com braços dobrados e pernas esticadas', detail: 'Sinal de lesão cerebral grave. A pessoa flexiona os braços junto ao corpo e estica as pernas. Indica dano acima do tronco cerebral.' },
    { term: 'Descerebração', simple: 'Postura anormal com braços e pernas completamente esticados', detail: 'Sinal de lesão cerebral muito grave (pior que decorticação). Toda musculatura fica em extensão. Indica dano no tronco cerebral.' },
    { term: 'Diálise', simple: 'Máquina que faz o trabalho dos rins quando eles param', detail: 'Filtra o sangue artificialmente, removendo toxinas e excesso de líquido. Necessária na insuficiência renal terminal ou aguda grave.' },
    { term: 'Dissecção de aorta', simple: 'A parede da aorta (maior artéria do corpo) se rasga', detail: 'O sangue entra entre as camadas da parede arterial. Causa dor torácica/lombar "rasgante" de início abrupto. Pode ser fatal em minutos. Emergência cirúrgica.' },
    { term: 'Diverticulite', simple: 'Inflamação de "bolsinhas" no intestino grosso', detail: 'Divertículos são pequenas bolsas na parede do intestino que podem inflamar. Causa dor no lado esquerdo da barriga, febre e alteração intestinal.' },
    { term: 'Eclâmpsia', simple: 'Convulsão na gravidez por pressão muito alta', detail: 'Complicação grave da pré-eclâmpsia. A gestante convulsiona por causa da hipertensão severa. Risco de morte para mãe e bebê.' },
    { term: 'Encefalopatia', simple: 'O cérebro não está funcionando bem', detail: 'Termo geral para disfunção cerebral. Pode ser hepática (fígado não filtra toxinas), urêmica (rins falhando) ou metabólica.' },
    { term: 'Endocardite', simple: 'Infecção das válvulas do coração', detail: 'Bactérias se instalam nas válvulas cardíacas. Causa febre prolongada, sopro novo e pode soltar pedaços infectados para o corpo (êmbolos).' },
    { term: 'Endometriose', simple: 'Tecido do útero cresce em lugares errados (fora do útero)', detail: 'Causa dor menstrual intensa, dor na relação sexual e dificuldade para engravidar. Comum em mulheres em idade fértil.' },
    { term: 'Estenose', simple: 'Estreitamento de um canal ou válvula', detail: 'Ex: estenose aórtica = válvula do coração estreita e não abre direito. Estenose uretral = canal da urina estreitado.' },
    { term: 'Glomerulonefrite', simple: 'Inflamação dos filtros do rim', detail: 'Os glomérulos (pequenos filtros nos rins) ficam inflamados. Causa sangue e proteína na urina, inchaço e pressão alta.' },
    { term: 'Hemólise', simple: 'Destruição acelerada dos glóbulos vermelhos', detail: 'Os glóbulos vermelhos se rompem antes do tempo normal. Causa anemia, icterícia e urina escura. Pode ser por doenças autoimunes, infecções ou medicamentos.' },
    { term: 'Hepatite', simple: 'Inflamação do fígado', detail: 'Pode ser por vírus (A, B, C), álcool, medicamentos ou autoimune. Causa fadiga, icterícia, dor abdominal e alteração das enzimas hepáticas.' },
    { term: 'Herniação cerebral', simple: 'O cérebro inchado é empurrado para um lado ou para baixo', detail: 'Complicação gravíssima de lesões cerebrais (tumor, hemorragia, edema). O cérebro é comprimido contra estruturas ósseas. Pode ser rapidamente fatal.' },
    { term: 'Hiperplasia prostática', simple: 'Próstata aumentada (cresceu demais)', detail: 'Comum em homens > 50 anos. A próstata aumentada comprime a uretra, dificultando urinar. Causa jato fraco, noctúria e esvaziamento incompleto.' },
    { term: 'Hipotireoidismo', simple: 'Tireoide funcionando de menos (lenta)', detail: 'A tireoide não produz hormônios suficientes. Causa cansaço, ganho de peso, pele seca, prisão de ventre e intolerância ao frio.' },
    { term: 'Hipertireoidismo', simple: 'Tireoide funcionando demais (acelerada)', detail: 'A tireoide produz hormônios em excesso. Causa perda de peso, taquicardia, tremor, ansiedade e intolerância ao calor.' },
    { term: 'Linfoma', simple: 'Câncer do sistema linfático (gânglios)', detail: 'Tumor que nasce nos linfonodos (ínguas). Sintomas: ínguas indolores que crescem, febre, sudorese noturna e perda de peso (sintomas B).' },
    { term: 'Manitol', simple: 'Medicamento para reduzir o inchaço do cérebro', detail: 'Líquido dado na veia que "puxa" água do cérebro edemaciado. Usado em emergências como herniação cerebral e hipertensão intracraniana.' },
    { term: 'Miastenia gravis', simple: 'Doença que causa fraqueza muscular progressiva ao longo do dia', detail: 'O sistema imune ataca a comunicação entre nervos e músculos. A pessoa fica com pálpebras caídas e fraqueza que piora com atividade e melhora com repouso.' },
    { term: 'Neuropatia', simple: 'Dano nos nervos periféricos', detail: 'Os nervos das mãos e pés são os mais afetados. Causa dormência, formigamento, dor em queimação. Causa mais comum: diabetes.' },
    { term: 'Nimodipino', simple: 'Remédio usado para prevenir espasmo nas artérias do cérebro', detail: 'Dado após hemorragia subaracnoidea para evitar que as artérias cerebrais se contraiam (vasoespasmo), o que pioraria o dano cerebral.' },
    { term: 'Pancreatite', simple: 'Inflamação do pâncreas', detail: 'Causa dor intensa na parte superior da barriga que irradia para as costas, náusea e vômito. Causas mais comuns: cálculos biliares e álcool.' },
    { term: 'Pericardite', simple: 'Inflamação da membrana que envolve o coração', detail: 'Causa dor no peito que piora ao deitar e melhora ao sentar-se para frente. Pode ser por vírus, autoimune ou após infarto.' },
    { term: 'Peritonite', simple: 'Infecção/inflamação da membrana que reveste o abdome por dentro', detail: 'Emergência cirúrgica. Causa dor abdominal intensa, barriga rígida ("em tábua"), febre. Geralmente por perfuração de víscera (apendicite, úlcera).' },
    { term: 'Pneumonia', simple: 'Infecção no pulmão', detail: 'Os alvéolos pulmonares se enchem de pus/líquido. Causa tosse com catarro, febre, falta de ar e dor ao respirar. Tratamento: antibióticos.' },
    { term: 'Pré-eclâmpsia', simple: 'Pressão alta na gravidez com dano a órgãos', detail: 'Pressão ≥ 140/90 após 20 semanas de gravidez + proteína na urina. Grave: pode causar convulsão (eclâmpsia), AVC e morte fetal. Tratamento: sulfato de magnésio + parto.' },
    { term: 'Prolactinoma', simple: 'Tumor benigno na hipófise que produz excesso de prolactina', detail: 'Causa produção de leite fora da gravidez (galactorreia) e menstruação irregular/ausente. Tratamento geralmente com medicamentos (cabergolina).' },
    { term: 'Prostatite', simple: 'Inflamação/infecção da próstata', detail: 'Causa dor ao urinar, dor perineal (entre escroto e ânus), febre e dificuldade para urinar. Pode ser aguda (bacteriana) ou crônica.' },
    { term: 'Reticulocitose', simple: 'Aumento de glóbulos vermelhos jovens no sangue', detail: 'A medula óssea está produzindo mais hemácias para compensar uma perda ou destruição. Indica que a anemia é por hemólise ou sangramento, não por falta de produção.' },
    { term: 'Síndrome nefrótica', simple: 'Os rins perdem muita proteína na urina', detail: 'Causa inchaço generalizado (especialmente nos olhos pela manhã), urina espumosa, colesterol alto e risco de trombose. Perda de proteína > 3,5g/dia.' },
    { term: 'Tamponamento cardíaco', simple: 'Líquido apertando o coração e impedindo-o de encher', detail: 'Acúmulo de líquido (ou sangue) no saco que envolve o coração. O coração não consegue se expandir e bombear. Tríade: hipotensão + jugulares distendidas + bulhas abafadas.' },
    { term: 'Trombocitopenia', simple: 'Plaquetas baixas no sangue', detail: 'Plaquetas são as células que ajudam o sangue a coagular. Quando muito baixas (< 50.000), há risco de sangramento espontâneo.' },
    { term: 'Vasculite', simple: 'Inflamação dos vasos sanguíneos', detail: 'O sistema imune ataca os vasos, causando inflamação. Pode afetar vasos de qualquer tamanho e qualquer órgão. Causa variada de sintomas.' },
    { term: 'Vasoespasmo', simple: 'Artéria que se contrai (aperta) de repente', detail: 'A artéria fica mais estreita por contração muscular. No cérebro após hemorragia, pode causar AVC secundário. No coração, pode simular infarto (angina de Prinzmetal).' }
];

// ============================================================
// LÓGICA
// ============================================================
function initDicionario() {
    renderAlphabet();
    renderDicionario(dicionarioTermos);

    const searchInput = document.getElementById('dict-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            // Reset alphabet buttons
            document.querySelectorAll('.dict-letter-btn').forEach(b => b.classList.remove('active'));
            if (query.length === 0) {
                renderDicionario(dicionarioTermos);
                return;
            }
            const filtered = dicionarioTermos.filter(t =>
                t.term.toLowerCase().includes(query) ||
                t.simple.toLowerCase().includes(query) ||
                t.detail.toLowerCase().includes(query)
            );
            renderDicionario(filtered);
        });
    }
}

function renderAlphabet() {
    const alphabetEl = document.getElementById('dict-alphabet');
    if (!alphabetEl) return;
    const letters = [...new Set(dicionarioTermos.map(t => t.term[0].toUpperCase()))].sort();
    alphabetEl.innerHTML = letters.map(l => `<button class="dict-letter-btn" data-letter="${l}">${l}</button>`).join('');

    alphabetEl.querySelectorAll('.dict-letter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.dict-letter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('dict-search').value = '';
            const letter = btn.dataset.letter;
            const filtered = dicionarioTermos.filter(t => t.term[0].toUpperCase() === letter);
            renderDicionario(filtered);
        });
    });
}

function renderDicionario(data) {
    const container = document.getElementById('dict-content');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = '<p class="dict-no-results">Nenhum termo encontrado. Tente outra busca.</p>';
        return;
    }

    container.innerHTML = data.map(t => `
        <div class="dict-card">
            <div class="dict-card-header">
                <h4 class="dict-term">${t.term}</h4>
                <p class="dict-simple">${t.simple}</p>
            </div>
            <p class="dict-detail">${t.detail}</p>
        </div>
    `).join('');
}
