// Quiz del capitolo 5: venti domande, cinque opzioni ciascuna.
// +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 se vuota.
// «giusta» è la posizione dell'opzione giusta: 0 = A … 4 = E.
// «slide» è il nome del file della slide da ripassare (senza .astro).
import type { Domanda } from "../../lib/quiz";

const quiz: Domanda[] = [
  // 5.1 Dove vanno i dati
  {
    domanda: "Rina, la titolare della trattoria, vi chiede: «Ma l'AI è sicura per i miei dati?». Secondo la slide, quale domanda conviene farsi al posto di questa?",
    opzioni: [
      "Il modello gira sul telefono o sul computer? Se l'app è installata, i dati restano lì dentro.",
      "La connessione è cifrata? Se lo è, il fornitore non può leggere i messaggi.",
      "Cosa conserva il fornitore, per quanto tempo, chi lo legge, e se lo usa per addestrare?",
      "Il servizio è a pagamento? Se si paga, i messaggi non lasciano mai il computer.",
      "Il modello è tra i più capaci? I modelli migliori proteggono meglio i dati.",
    ],
    giusta: 2,
    spiegazione: "Il modello non sta nel vostro telefono: ogni messaggio arriva ai server del fornitore, che lo legge per rispondere. La cifratura protegge il viaggio, non quello che succede dopo: contano cosa si conserva, per quanto, chi lo legge e se serve ad addestrare.",
    slide: "viaggio-messaggio",
  },
  {
    domanda: "Uno studente scopre che nel suo account personale l'interruttore dell'addestramento era acceso da mesi, e lo spegne. Cosa succede, secondo la slide?",
    opzioni: [
      "Il fornitore toglie dai modelli quello che avevano imparato dalle sue vecchie chat.",
      "Vale per le conversazioni future: quello che è già servito ad addestrare non si toglie.",
      "Si cancella anche la cronologia, perché addestramento e cronologia sono la stessa cosa.",
      "Nessuna sua chat potrà più essere usata, nemmeno quelle segnalate per sicurezza.",
      "Non cambia niente: negli account personali l'addestramento non si può escludere.",
    ],
    giusta: 1,
    spiegazione: "Spegnere l'interruttore vale da quel momento in poi: quello che è già stato usato non si recupera. Cronologia e addestramento sono impostazioni diverse, e per il pollice su o giù o le chat segnalate per sicurezza possono valere regole diverse.",
    slide: "addestramento-dipende",
  },
  // 5.2 I dati degli altri
  {
    domanda: "Nel registro degli errori di PrenotaAula c'è questa riga: «prenotazione 4512, IP 203.0.113.8, aula 3, giovedì». Non c'è nessun nome. È un dato personale?",
    opzioni: [
      "No: senza nome e cognome nessuno può risalire alla persona che ha prenotato.",
      "No: un indirizzo IP indica un dispositivo, quindi non riguarda mai una persona precisa.",
      "Sì, ma solo perché le prenotazioni rientrano tra le categorie particolari.",
      "Solo se il registro viene pubblicato online: finché resta interno, non lo è.",
      "Sì: numero di prenotazione e indirizzo IP, uniti ad altro, portano alla persona.",
    ],
    giusta: 4,
    spiegazione: "Un dato è personale se, mettendolo insieme ad altre informazioni, si può risalire alla persona, anche senza il nome: indirizzo IP e numero di prenotazione sono proprio nell'elenco della slide. Le categorie particolari sono un'altra cosa (salute, religione…), e un dato resta personale anche se non esce dall'azienda.",
    slide: "dato-personale",
  },
  {
    domanda: "Volete che Claude riassuma quaranta email di clienti, con nomi, numeri d'ordine e indirizzi. Quale modo di procedere segue la slide?",
    opzioni: [
      "Togliere nomi e dati prima di incollare, o usare l'account di lavoro previsto.",
      "Usare una chat temporanea: non resta in cronologia, quindi i dati non escono.",
      "Spegnere prima l'addestramento: così il fornitore non riceve le email.",
      "Incollarle a gruppi di dieci, così nessuna chat contiene tutti i dati insieme.",
      "Scrivere nel prompt «non salvare questi dati»: il modello ne terrà conto.",
    ],
    giusta: 0,
    spiegazione: "Incollare è consegnare: con la chat temporanea, l'addestramento spento o il testo diviso in pezzi, le email arrivano comunque ai server del fornitore. Si tolgono i dati prima, oppure si usa l'account di lavoro che l'azienda ha previsto per questo.",
    slide: "incollare-consegnare",
  },
  {
    domanda: "Per provare il modulo di PrenotaAula vi serve un centinaio di prenotazioni. Secondo la slide, da dove le prendete?",
    opzioni: [
      "Dal database vero, ma solo quelle dell'anno scorso, che ormai sono chiuse.",
      "Da un'esportazione del database, togliendo le email e lasciando i nomi.",
      "Dal database vero, chiedendo a Claude di ignorare la colonna con i nomi.",
      "Le fate generare all'AI: dati finti come «Mario Rossi, aula 3», su una copia.",
      "Da una copia del database vero, aperta in sola lettura per non rompere niente.",
    ],
    giusta: 3,
    spiegazione: "Per provare il sito servono dati finti, e si lavora su una copia, non sul database vero. Prenotazioni vecchie, in sola lettura o senza email restano dati di persone reali; e chiedere all'agente di ignorare una colonna non impedisce che i dati gli arrivino.",
    slide: "progetti-web-dati",
  },
  {
    domanda: "Un'azienda pubblica un nuovo modello «a pesi aperti». Quale affermazione è corretta, secondo la slide?",
    opzioni: [
      "È open source: si scaricano pesi, dati e codice di addestramento, e si usa senza limiti.",
      "Si scaricano i pesi, ma spesso non i dati di addestramento, e la licenza può porre limiti.",
      "Le regole di sicurezza le decide il fornitore, e chi lo scarica non può toglierle.",
      "Si usa solo attraverso il servizio del fornitore, ma senza pagare l'abbonamento.",
      "I dati che gli date vanno comunque al fornitore, che li usa per aggiornarlo.",
    ],
    giusta: 1,
    spiegazione: "Pesi aperti vuol dire che il file del modello si scarica e si fa girare dove si vuole, e i dati restano lì. Non vuol dire open source: dati e codice di addestramento spesso mancano, la licenza può porre limiti, e chi lo scarica può cambiare o togliere le regole di sicurezza.",
    slide: "pesi-aperti-chiusi",
  },
  // 5.3 Sicurezza con gli agenti
  {
    domanda: "Una issue di PrenotaAula, aperta da uno sconosciuto, nella pagina di GitHub sembra innocua. Perché un agente che la legge può eseguire ordini nascosti?",
    opzioni: [
      "Perché gli ordini nascosti sono scritti in un linguaggio che il modello esegue come un programma.",
      "Perché il modello riconosce le vostre istruzioni, ma dà la precedenza a quelle più recenti.",
      "Perché riceve anche i commenti che la pagina non mostra, e per lui ordini e contenuti sono testo.",
      "Perché lo sconosciuto, aprendo la issue, ottiene sul repository gli stessi permessi dell'agente.",
      "Perché gli ordini nascosti funzionano solo se l'agente ha i permessi di amministratore.",
    ],
    giusta: 2,
    spiegazione: "Per un modello tutto è testo: le vostre istruzioni e il contenuto di una issue arrivano nello stesso modo, e i commenti HTML, invisibili nella pagina, all'agente arrivano. Non è codice che si esegue, e il modello non distingue le vostre istruzioni: sono frasi che può scambiare per ordini vostri.",
    slide: "istruzioni-nascoste",
  },
  {
    domanda: "Volete che, anche se un agente viene ingannato, non abbia una chiave vera di Supabase da rubare. Cosa fate?",
    opzioni: [
      "Tenete le chiavi vere fuori dalla sua cartella, e in sviluppo usate chiavi di prova.",
      "Mettete il file <code>.env</code> nel <code>.gitignore</code>: così l'agente non può più leggerlo.",
      "Scrivete nel CLAUDE.md «non leggere mai il file <code>.env</code>»: l'agente lo rispetterà.",
      "Gli impedite il push su main: se non può pubblicare niente, la chiave non può uscire.",
      "Gli date la chiave in chat solo per un attimo, e poi cancellate subito la conversazione.",
    ],
    giusta: 0,
    spiegazione: "È l'isolamento: se nella cartella dell'agente ci sono solo chiavi di prova con pochi poteri, non c'è niente di prezioso da rubare. Il <code>.gitignore</code> tiene il file fuori da Git, non lontano dall'agente; un'istruzione scritta può essere scavalcata da una nascosta; e la chiave può uscire anche senza push, per esempio in un commento alla issue.",
    slide: "difese-agenti",
  },
  {
    domanda: "Claude propone di installare una libreria dal nome credibile. Controllate: nel registro dei pacchetti esiste davvero. Perché, secondo la slide, non basta?",
    opzioni: [
      "Perché il problema riguarda solo i modelli aperti: va controllato quale modello state usando.",
      "Perché va controllato anche che il nome sia scritto giusto; il resto lo garantisce il registro.",
      "Perché il registro controlla la sicurezza delle librerie, ma non se funzionano davvero.",
      "Perché Claude conosce le librerie fino alla sua data di taglio: può esserci una versione nuova.",
      "Perché chi attacca registra proprio i nomi inventati dall'AI: contano età, autore e download.",
    ],
    giusta: 4,
    spiegazione: "È lo «slopsquatting»: l'AI inventa un nome credibile, chi attacca lo registra e ci mette codice malevolo. Per questo non basta che esista: si guarda da quanto tempo esiste, chi la pubblica, quanti la scaricano. Lo studio della slide trova librerie inesistenti anche tra quelle suggerite dai modelli commerciali, e nessun registro garantisce le librerie.",
    slide: "librerie-inesistenti",
  },
  {
    domanda: "OpenAI ha definito l'attacco a Hugging Face «senza precedenti». Quale argomento porta la slide <strong>contro</strong> questa definizione?",
    opzioni: [
      "Nessun umano dirigeva gli agenti: hanno attaccato da soli, per superare un test.",
      "Hugging Face non ha mai confermato l'intrusione: la conosciamo solo da OpenAI.",
      "L'attacco è stato scoperto da un sistema di sorveglianza basato su un LLM, non da persone.",
      "Già nel 2025 Anthropic aveva descritto un attacco svolto in gran parte da Claude Code.",
      "Gli articoli concordano su date e numero di agenti, quindi la notizia è verificata.",
    ],
    giusta: 3,
    spiegazione: "La slide mette a confronto i due lati: a favore, nessun umano dirigeva gli agenti; contro, un attacco svolto in gran parte da agenti AI era già stato descritto da Anthropic nel 2025. Hugging Face ha reso pubblica l'intrusione per prima, e le fonti non sono d'accordo su date e numero di agenti.",
    slide: "leggere-fonti-caso",
  },
  // 5.4 Uso consapevole
  {
    domanda: "Quale di questi è un caso di «abdicare», e non di «delegare», secondo la slide?",
    opzioni: [
      "Un'insegnante si fa preparare da Claude la bozza di una circolare, poi la rilegge e la corregge.",
      "Uno sviluppatore esperto si fa scrivere il codice ripetitivo di un modulo e lo rilegge.",
      "Una studentessa che non conosce Git chiede a Claude di spiegarle un comando prima di usarlo.",
      "Un grafico si fa proporre tre palette dall'AI e sceglie quella che va bene per il cliente.",
      "Un ragazzo che non ha mai letto un contratto chiede a Claude se una clausola va bene, e firma.",
    ],
    giusta: 4,
    spiegazione: "Abdicare è affidare all'AI una cosa che non sapete fare e firmarla senza poterla controllare, come il contratto. Negli altri casi chi usa l'AI sa riconoscere un risultato giusto, oppure la usa per imparare («spiegami»), che è proprio quello che la slide consiglia.",
    slide: "non-so-controllarlo",
  },
  {
    domanda: "Un ragazzo crea con l'AI un fotomontaggio realistico di un compagno e lo gira nel gruppo WhatsApp della classe, «per scherzo». Cosa dice la slide?",
    opzioni: [
      "Non è un problema se è per scherzo: per la legge conta solo l'intenzione di chi lo crea.",
      "Il reato riguarda solo chi crea l'immagine: girarla nel gruppo non aggiunge niente.",
      "Non è reato, perché un gruppo WhatsApp è privato e non conta come diffusione.",
      "Diffonderlo senza consenso, se inganna e fa un danno ingiusto, può essere reato.",
      "È vietato solo se ritrae un personaggio pubblico, la cui immagine è tutelata.",
    ],
    giusta: 3,
    spiegazione: "La legge punisce chi diffonde, senza consenso, contenuti falsificati con l'AI capaci di ingannare e che causano un danno ingiusto. Crearlo è facile; è diffonderlo che può essere reato. La slide dice che vale anche «per scherzo», e che il gruppo WhatsApp è proprio il caso più comune.",
    slide: "persone-reali",
  },
  {
    domanda: "Un sistema per selezionare il personale, addestrato su anni di assunzioni quasi solo maschili, penalizzava i curriculum delle donne. Perché, secondo la slide?",
    opzioni: [
      "Chi l'aveva programmato aveva scritto una regola che dava meno punti alle donne.",
      "Il sistema aveva visto troppo pochi curriculum per imparare qualcosa di utile.",
      "Ha imparato dagli esempi: se il passato è sbilanciato, lo sono anche le risposte.",
      "I curriculum delle donne avevano un formato diverso, che il sistema leggeva male.",
      "È un errore casuale, che si corregge chiedendo al modello di essere imparziale.",
    ],
    giusta: 2,
    spiegazione: "Un modello impara dagli esempi: se le assunzioni passate erano quasi solo maschili, il sistema prende il passato come regola e lo ripete in grande. Nessuno aveva scritto una regola contro le donne, e non è un errore casuale: lo squilibrio è nei dati.",
    slide: "pregiudizi-dati",
  },
  // 5.5 Responsabilità e diritti
  {
    domanda: "Nel sito che avete consegnato alla trattoria, un testo scritto da Claude indica un allergene sbagliato. Chi ne risponde verso la cliente, secondo la slide?",
    opzioni: [
      "Voi: avete consegnato il sito, e «l'ha scritto l'AI» non è una difesa.",
      "Il fornitore del modello, perché l'errore è nato dentro il suo modello.",
      "Nessuno: l'errore è dell'AI, e l'AI non è una persona che può rispondere.",
      "Voi e il fornitore del modello, in parti uguali, perché il testo è nato insieme.",
      "La cliente, che doveva rileggere il menu prima di pubblicarlo sul sito.",
    ],
    giusta: 0,
    spiegazione: "L'AI non firma e non paga: rispondono le persone intorno a lei. Il fornitore ha i suoi obblighi su sicurezza e trasparenza, ma il sito che consegnate, con i suoi errori, è vostro verso il cliente. Per questo si controlla.",
    slide: "chi-risponde",
  },
  {
    domanda: "Per il sito della trattoria, il logo è stato generato dall'AI con un prompt di una riga, senza altri interventi. Cosa dovete dire alla cliente, secondo la slide?",
    opzioni: [
      "Che il logo è vostro, perché il diritto d'autore spetta sempre a chi scrive il prompt.",
      "Che lì i diritti possono essere deboli, perché manca un vero contributo creativo umano.",
      "Che il logo appartiene al fornitore del modello, che ve lo concede solo in uso.",
      "Che il logo è protetto come gli altri, purché sul sito si dichiari che è fatto con l'AI.",
      "Che il logo è protetto, perché la legge del 2025 tutela tutto ciò che si fa con l'AI.",
    ],
    giusta: 1,
    spiegazione: "Il diritto d'autore protegge le opere dell'ingegno umano, anche fatte con l'aiuto dell'AI, purché siano frutto del lavoro intellettuale dell'autore. Un prompt di una riga difficilmente basta: al cliente si dice quali parti sono generate e che lì i diritti possono essere deboli.",
    slide: "di-chi-e",
  },
  // 5.6 Domande aperte
  {
    domanda: "Un modello risponde benissimo a una domanda difficile. Quale conclusione è coerente con la slide sulle domande aperte?",
    opzioni: [
      "Ha capito di sicuro: una semplice imitazione non risponderebbe bene a domande così difficili.",
      "Sta solo imitando, di sicuro: un modello prevede la parola dopo, quindi non può capire niente.",
      "Ha capito se supera il test di Turing, che oggi è il criterio accettato da tutti i ricercatori.",
      "La domanda non ha senso: un modello è un programma come gli altri, e i programmi non capiscono.",
      "È una domanda aperta: una buona risposta non basta a dire se capisce o se sta solo imitando.",
    ],
    giusta: 4,
    spiegazione: "La slide presenta «capisce o imita?» come una domanda su cui persone serie e preparate rispondono in modi opposti. Le conclusioni che danno per certa una delle due posizioni, o che liquidano la domanda, saltano il dibattito; e il test di Turing, per molti, misura solo l'imitazione.",
    slide: "quattro-domande",
  },
  {
    domanda: "Nell'esperimento della stanza cinese, quale argomento usa chi risponde a Searle?",
    opzioni: [
      "Manipolare simboli seguendo regole non basta per capire, e un computer fa proprio questo.",
      "A forza di usare il manuale, la persona nella stanza finisce per imparare il cinese.",
      "Forse non capisce la persona, ma il sistema intero: persona, manuale e stanza insieme.",
      "Un manuale così non si potrebbe mai scrivere, quindi l'esperimento non dimostra niente.",
      "Se le risposte sono perfette, la persona nella stanza capisce il cinese anche senza saperlo.",
    ],
    giusta: 2,
    spiegazione: "«Manipolare simboli non basta per capire» è la tesi di Searle, non la risposta dei suoi critici. Chi gli risponde sposta la domanda: forse non capisce la persona, ma il sistema intero; e chiede cosa faccia, in fondo, il nostro cervello.",
    slide: "stanza-cinese",
  },
  // 5.7 Le regole
  {
    domanda: "Quale di queste affermazioni sul GDPR è <strong>falsa</strong>?",
    opzioni: [
      "Vale anche per il sito di una piccola trattoria, se tratta dati di persone nell'Unione.",
      "Chi raccoglie dati deve spiegare alle persone cosa ne fa, con un'informativa.",
      "Una persona può chiedere di vedere i propri dati, di correggerli e di farli cancellare.",
      "I dati di una prenotazione si possono tenere quanto si vuole, purché siano ben protetti.",
      "Se c'è una violazione dei dati, chi li tratta deve avvisare il Garante in tempi stretti.",
    ],
    giusta: 3,
    spiegazione: "Il GDPR chiede il minimo indispensabile: solo i dati che servono, e solo per il tempo che serve. Proteggerli bene è un obbligo in più, non un permesso di tenerli per sempre. Le altre affermazioni corrispondono alle idee della slide.",
    slide: "gdpr-cinque-idee",
  },
  {
    domanda: "Un cliente prenota un tavolo sul sito della trattoria e lascia nome e telefono. Su quale base giuridica la trattoria può usarli per gestire la prenotazione?",
    opzioni: [
      "Il contratto: per prenotare servono nome e telefono, e il cliente li dà per questo.",
      "Il consenso, chiesto con una casella da spuntare a parte: senza, non si possono usare.",
      "L'obbligo di legge, come per le fatture, perché una prenotazione è un documento fiscale.",
      "L'interesse pubblico, perché la ristorazione è un servizio aperto a tutti.",
      "Il legittimo interesse della trattoria a riempire i tavoli, senza alcun bilanciamento.",
    ],
    giusta: 0,
    spiegazione: "Tra le sei basi del GDPR c'è il contratto, e l'esempio della slide è proprio questo: la prenotazione richiede nome e telefono. Il consenso è una delle basi, non l'unica; l'obbligo di legge riguarda casi come le fatture; e il legittimo interesse va sempre bilanciato con i diritti della persona.",
    slide: "gdpr-basi-diritti",
  },
  {
    domanda: "Sul sito della trattoria mettete un chatbot che risponde su orari e menu. Cosa chiede l'AI Act, secondo la slide?",
    opzioni: [
      "Niente: rientra nel rischio minimo, come il correttore o il filtro antispam.",
      "Che dica a chi scrive che sta parlando con un'AI: è un obbligo di trasparenza.",
      "Le regole dell'alto rischio, perché il chatbot tratta i dati dei clienti.",
      "È vietato, perché un chatbot può manipolare chi gli scrive senza che se ne accorga.",
      "Niente, perché l'AI Act riguarda solo chi sviluppa i modelli, non chi li usa.",
    ],
    giusta: 1,
    spiegazione: "Il caso più comune per i vostri siti è la trasparenza: chi parla con un chatbot deve saperlo. L'alto rischio riguarda l'AI che decide su scuola, lavoro, credito e servizi pubblici; i divieti, pratiche come il punteggio sociale; e l'AI Act non vale solo per chi sviluppa i modelli.",
    slide: "ai-act-pagina",
  },
];

export default quiz;
