// Quiz del capitolo 10: venti domande, cinque opzioni ciascuna.
// +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 se vuota.
// «giusta» è la posizione dell'opzione giusta: 0 = A … 4 = E.
// «slide» è il nome del file della slide da ripassare (senza .astro).
import type { Domanda } from "../../lib/quiz";

const quiz: Domanda[] = [
  // 10.1 Dal sito alla webapp
  {
    domanda: "Quale di queste richieste di un cliente vi dice che serve davvero una webapp, e che non basta un sito?",
    opzioni: [
      "«Voglio cambiare da solo il menu e gli orari del locale, senza dover chiamare voi ogni volta.»",
      "«I docenti prenotano le aule, la segreteria le gestisce tutte, e le prenotazioni non si accavallano.»",
      "«Voglio che chi compila il modulo dei contatti sul sito mi faccia arrivare subito una mail.»",
      "«Voglio che dal sito i clienti mi chiamino o mi scrivano su WhatsApp per prenotare un tavolo.»",
      "«Voglio un sito con tante pagine e molte animazioni, che dal telefono sembri proprio un'app.»",
    ],
    giusta: 1,
    spiegazione: "Account con ruoli diversi e regole da far rispettare, come due prenotazioni che non si sovrappongono, sono i segnali di una webapp. Menu e orari modificabili con Keystatic, un modulo che manda una mail e le prenotazioni per telefono stanno bene in un sito; pagine e animazioni non cambiano la natura del progetto.",
    slide: "quando-non-serve",
  },

  // 10.2 Progettare i dati
  {
    domanda: "In PrenotaAula l'«Aula 3» viene rinominata «Aula Magna». Con lo schema del corso, cosa bisogna cambiare nel database?",
    opzioni: [
      "Ogni prenotazione di quell'aula, perché in ognuna è ricopiato il nome dell'aula.",
      "La chiave primaria dell'aula, che deve corrispondere sempre al nome nuovo.",
      "Niente: il nome delle aule non sta nel database, ma nel codice delle pagine.",
      "Una riga sola, nella tabella <code>aule</code>: le prenotazioni puntano all'aula con <code>aula_id</code>.",
      "La colonna <code>aula_id</code> di tutte le prenotazioni, da aggiornare con il nome nuovo.",
    ],
    giusta: 3,
    spiegazione: "Una prenotazione non ricopia il nome dell'aula: punta alla sua riga con una chiave esterna, <code>aula_id</code>. La chiave primaria <code>id</code> è unica e non cambia, quindi basta modificare il nome nella riga dell'aula.",
    slide: "chiavi-relazioni",
  },
  {
    domanda: "Il codice di PrenotaAula, prima di salvare, controlla già se l'aula è libera. Perché serve anche un vincolo nel database?",
    opzioni: [
      "Se due docenti premono «Prenota» nello stesso istante, il controllo può dire sì a entrambe; il vincolo no.",
      "Il controllo nel codice funziona solo in locale: online, a decidere se l'aula è libera è sempre il database.",
      "Il vincolo guarda anche le altre aule dell'edificio, mentre il controllo nel codice guarda solo quella scelta.",
      "Il vincolo rende il salvataggio più veloce, e così il controllo nel codice si può togliere del tutto.",
      "Il vincolo controlla anche i permessi: chi non è docente non riesce a salvare la prenotazione.",
    ],
    giusta: 0,
    spiegazione: "Il vincolo è una regola che il database fa rispettare da solo, qualunque cosa faccia il codice: è l'ultima difesa. Con due richieste nello stesso istante il controllo nel codice può sbagliare, il vincolo rifiuta la seconda. I permessi sono un'altra cosa: le regole sulle righe.",
    slide: "vincoli-dati",
  },
  {
    domanda: "Nel CLAUDE.md di PrenotaAula c'è la regola «ogni modifica allo schema è una migrazione, mai a mano dal pannello». A cosa serve?",
    opzioni: [
      "A tenere lo schema fuori dal repository, dove l'agente non può modificarlo per sbaglio.",
      "A permettere a Claude di cambiare lo schema del progetto vero senza chiedere ogni volta.",
      "A niente di pratico: dal pannello di Supabase le tabelle non si possono comunque modificare.",
      "A non dover leggere l'SQL, perché le migrazioni si controllano e si applicano da sole.",
      "A dare a ogni cambiamento dei dati una storia nel repository, da leggere prima di applicarlo.",
    ],
    giusta: 4,
    spiegazione: "Una migrazione è un file SQL con una modifica allo schema, salvato nel repository: ogni cambiamento ai dati ha la sua storia, come il codice, e voi leggete l'SQL prima di applicarlo. Non dà all'agente il permesso di toccare il progetto vero: si prova su quello di prova.",
    slide: "schema-claude-md",
  },
  {
    domanda: "Sui backup di PrenotaAula, quale affermazione è <strong>falsa</strong>?",
    opzioni: [
      "Se un agente cancella una tabella, servono copie del database fatte apposta.",
      "Una copia vostra del database va tenuta fuori da Supabase e fuori dal repository.",
      "Il repository su GitHub fa da backup anche per le prenotazioni degli utenti.",
      "Un backup che non avete mai provato a ripristinare non conta come backup.",
      "Il ripristino di un backup si prova nel progetto di prova, non in quello vero.",
    ],
    giusta: 2,
    spiegazione: "Git salva il codice, non le prenotazioni: i dati stanno nel database e servono copie fatte apposta, tenute altrove e provate almeno una volta nel progetto di prova. È lì che si scopre se mancava qualcosa.",
    slide: "backup-dati",
  },

  // 10.3 Le quattro operazioni
  {
    domanda: "Una docente annulla per sbaglio una prenotazione, poi se ne accorge e vorrebbe recuperarla. Quale scelta, fatta nei criteri prima del codice, permette di rimediare?",
    opzioni: [
      "Chiedere una conferma prima di annullare: così un errore del genere non può più capitare.",
      "Mandare un'email alla docente a ogni annullamento, così si accorge subito dell'errore.",
      "Non cancellare la riga, ma segnarla «annullata»: resta la storia, e la prenotazione si recupera.",
      "Cancellare la riga con <code>delete</code>, così l'aula torna subito libera per gli altri.",
      "Permettere di annullare solo fino al giorno prima, così c'è tempo per accorgersi dell'errore.",
    ],
    giusta: 2,
    spiegazione: "Spesso conviene non cancellare la riga ma segnarla «annullata»: resta la storia e un errore si ripara. Una conferma o un'email riducono gli sbagli ma non li riparano, e cancellare la riga li rende definitivi. Per questo la scelta va scritta nei criteri, prima del codice.",
    slide: "crud-operazioni",
  },

  // 10.4 Chi sei e cosa puoi fare
  {
    domanda: "La prof.ssa Bianchi entra in PrenotaAula con la sua email e la sua password. Poi prova ad annullare una prenotazione del collega Rossi, e l'app le risponde di no. Cosa è successo?",
    opzioni: [
      "L'autenticazione è fallita: l'app non sa chi sia, e per questo le blocca l'annullamento.",
      "L'autorizzazione è riuscita, ma l'autenticazione va ripetuta prima di ogni modifica ai dati.",
      "Il vincolo sulle sovrapposizioni ha rifiutato la richiesta, perché l'aula era già occupata.",
      "Il ruolo di docente non permette di annullare nessuna prenotazione, nemmeno le proprie.",
      "L'autenticazione è riuscita; è l'autorizzazione a stabilire che quella prenotazione non è sua.",
    ],
    giusta: 4,
    spiegazione: "L'autenticazione risponde a «chi sei?», ed è riuscita: l'app sa che è la prof.ssa Bianchi. L'autorizzazione risponde a «cosa puoi fare?»: un docente annulla solo le sue prenotazioni. Il vincolo sulle sovrapposizioni riguarda le prenotazioni nuove, non i permessi.",
    slide: "autenticazione-autorizzazione",
  },
  {
    domanda: "Nel modulo di registrazione di PrenotaAula, Claude ha messo un menu a tendina in cui ognuno sceglie il proprio ruolo: studente, docente o segreteria. Cosa c'è che non va?",
    opzioni: [
      "Niente, purché il ruolo scelto venga salvato nel database e non resti solo nel browser.",
      "Il ruolo lo assegna chi ha già quel potere, la scuola: così chiunque si dichiara segreteria.",
      "Basta togliere dal menu la voce «segreteria»: studente e docente si possono scegliere da soli.",
      "Mancano dei ruoli: i permessi andrebbero decisi persona per persona, non per gruppi.",
      "Il ruolo andrebbe chiesto a ogni accesso, non una volta sola al momento della registrazione.",
    ],
    giusta: 1,
    spiegazione: "Il ruolo lo decide la scuola, non l'utente: nessuno sceglie da solo di essere segreteria, e nemmeno docente, che può prenotare le aule. Salvarlo nel database non basta se a sceglierlo è l'utente; e i permessi si decidono per ruolo, non persona per persona.",
    slide: "ruoli-prenotaula",
  },
  {
    domanda: "Claude ha fatto in modo che il pulsante «Annulla» compaia solo sulle prenotazioni di chi è collegato. Provate l'app e sembra a posto. Cosa chiedete a Claude?",
    opzioni: [
      "Dove si controlla il permesso; se solo nel browser, la regola nel database e come provarla.",
      "Niente: se il pulsante non compare, nessuno ha modo di annullare le prenotazioni degli altri.",
      "Di nascondere del tutto le prenotazioni degli altri, così nessuno può vederle né cliccarle.",
      "Di bloccare gli strumenti per sviluppatori, così nessuno può far ricomparire il pulsante.",
      "Di aggiungere nel browser un secondo controllo, con un avviso per chi preme il pulsante sbagliato.",
    ],
    giusta: 0,
    spiegazione: "Il browser è di chi lo usa: dagli strumenti per sviluppatori si può mandare la richiesta «cancella la prenotazione 57» senza passare dal pulsante. Nascondere o controllare nel browser rende l'app comoda; sicura la rende solo la regola nel database, provata con un secondo utente.",
    slide: "controllo-nel-browser",
  },
  {
    domanda: "Avete collegato «Accedi con Google» a PrenotaAula, e con il vostro account della scuola funziona. Quale prova manca ancora?",
    opzioni: [
      "Nessuna: se Google conferma chi siete, l'accesso è sicuro e non serve provare altro.",
      "Una password sbagliata, per controllare il messaggio d'errore che vede la persona.",
      "Che la password Google degli utenti sia salvata cifrata nella tabella di Supabase.",
      "Un account personale, non della scuola: entra anche quello? E deve poter entrare?",
      "Nessuna in locale: localhost non può stare tra gli indirizzi dove l'utente torna.",
    ],
    giusta: 3,
    spiegazione: "Con «Accedi con Google» non ci sono password da gestire: Google conferma chi siete e Supabase crea l'account. Resta da decidere chi deve entrare, e va provato con un account della scuola e con uno personale. Localhost si aggiunge tra gli indirizzi consentiti, proprio per provare.",
    slide: "accedi-google",
  },

  // 10.5 Quando le cose vanno storte
  {
    domanda: "State per far scrivere a Claude l'annullamento delle prenotazioni. Quando e come gli chiedete i casi limite?",
    opzioni: [
      "Dopo il codice: prima una versione che funziona, poi gli chiedete cosa potrebbe romperla.",
      "Non glieli chiedete: i casi limite li scopre chi usa l'app, e arrivano con le segnalazioni.",
      "Gli dite di gestirli tutti senza elencarli, così il codice è completo dalla prima versione.",
      "Prima del codice: li elenca con cosa vede l'utente, e voi scegliete quali diventano criteri.",
      "Dopo il merge: dagli errori nei log di Vercel capite quali casi limite contano davvero.",
    ],
    giusta: 3,
    spiegazione: "Claude è bravo a immaginare cosa può andare storto, ma solo se glielo chiedete prima: dopo tende a difendere il codice che ha scritto. Non tutti i casi meritano codice: quelli che scegliete diventano criteri di accettazione.",
    slide: "casi-limite-prima",
  },
  {
    domanda: "Uno studente prova a prenotare un'aula, e il database risponde <code>new row violates row-level security policy</code>. Quale messaggio deve leggere lo studente?",
    opzioni: [
      "«Solo i docenti possono prenotare le aule. Se pensate sia un errore, scrivete alla segreteria.»",
      "«L'aula è già prenotata in quell'orario. Scegliete un'altra aula oppure un altro orario.»",
      "«Non riusciamo a collegarci. La prenotazione non è stata salvata: riprovate tra poco.»",
      "«Errore: new row violates row-level security policy. Riprovate, o contattate l'assistenza.»",
      "«Qualcosa è andato storto durante la prenotazione. Riprovate più tardi, per favore.»",
    ],
    giusta: 0,
    spiegazione: "L'errore viene dalle regole sulle righe: lo studente non ha il permesso di prenotare. Il messaggio dice cosa è successo, in parole comuni, e cosa fare adesso. Aula occupata e rete assente sono altri errori; il testo del database o un generico «qualcosa è andato storto» non aiutano la persona.",
    slide: "errori-per-persone",
  },

  // 10.6 API esterne e chiavi
  {
    domanda: "Con la chiave pubblica, la pagina di PrenotaAula non mostrava nessuna prenotazione. Claude ha «risolto» mettendo nel codice della pagina la chiave <code>sb_secret_…</code>, poi ha fatto commit e push. Ora funziona. Cosa fate?",
    opzioni: [
      "Va bene così, purché il repository su GitHub sia privato e lo vedano solo le persone della squadra.",
      "Spostate la chiave in una variabile con il prefisso <code>PUBLIC_</code>, così non è più scritta nel codice.",
      "La togliete dalla pagina, la revocate e ne create una nuova; poi cercate la regola sulle righe che manca.",
      "La lasciate solo nelle anteprime di Vercel, e per la produzione rimettete la chiave pubblica di prima.",
      "La lasciate dov'è, ma nascondete nel browser i pulsanti per modificare e cancellare le prenotazioni.",
    ],
    giusta: 2,
    spiegazione: "La chiave segreta salta tutte le regole: nella pagina chiunque la legge, e dopo il push è uscita, quindi va revocata. Con il prefisso <code>PUBLIC_</code> arriverebbe comunque al browser. La chiave pubblica fa solo quello che le regole sulle righe permettono: se non mostrava niente, mancava una regola.",
    slide: "chiavi-pubbliche-segrete",
  },
  {
    domanda: "Le anteprime di PrenotaAula devono usare il progetto Supabase di prova, la produzione quello vero. Come si ottiene, secondo il corso?",
    opzioni: [
      "Con due file, <code>.env.anteprima</code> e <code>.env.produzione</code>, salvati nel repository insieme al codice.",
      "Con le chiavi dei due progetti scritte nel codice, e un <code>if</code> che sceglie in base all'indirizzo.",
      "Con due repository su GitHub, uno collegato al progetto di prova e uno a quello vero.",
      "Con una sola chiave per tutti e due i progetti, con il prefisso <code>PUBLIC_</code> perché Vercel la trovi.",
      "Con le variabili su Vercel: stessi nomi, valori diversi per l'anteprima e per la produzione.",
    ],
    giusta: 4,
    spiegazione: "Le chiavi non si scrivono nel codice, e il file <code>.env</code> non va su GitHub. Su Vercel le stesse variabili hanno valori diversi per l'anteprima e per la produzione; dopo una modifica serve un nuovo deploy.",
    slide: "env-vercel",
  },
  {
    domanda: "PrenotaAula fa pagare l'affitto di una sala con Stripe. In quale momento segnate la prenotazione come «pagata» nel database?",
    opzioni: [
      "Quando la persona preme «Paga» sulla vostra pagina, prima di passare a Stripe.",
      "Quando arriva l'avviso automatico di Stripe, il webhook, che dice «pagato».",
      "Quando il browser torna sulla vostra pagina di conferma, dopo il pagamento.",
      "Quando la vostra funzione crea la sessione di pagamento con la chiave segreta.",
      "Quando la persona ha inserito la carta nel modulo di pagamento della vostra app.",
    ],
    giusta: 1,
    spiegazione: "Si segna «pagata» solo dopo l'avviso di Stripe, non perché il browser lo dice: il browser è di chi lo usa. La carta, poi, non passa mai dalla vostra app: la persona la inserisce nella pagina di Stripe.",
    slide: "pagamenti-online",
  },

  // 10.7 Un modello AI dentro la webapp
  {
    domanda: "L'assistente di PrenotaAula risponde bene alla prima domanda. Alla seconda, «e il giorno dopo?», non sa più di quale giorno si parlava. Qual è la causa più probabile?",
    opzioni: [
      "Le istruzioni di sistema valgono solo per il primo messaggio, e poi il modello le dimentica.",
      "Il modello più piccolo non ha memoria: per ricordare la conversazione ne serve uno più grande.",
      "Il valore di <code>max_tokens</code> è troppo basso, e il modello cancella le risposte di prima.",
      "La chiamata parte dalla funzione su Vercel e non dal browser, dove resta la conversazione.",
      "Il codice manda solo l'ultima domanda: l'API non ricorda niente, va rimandato tutto.",
    ],
    giusta: 4,
    spiegazione: "L'API non ricorda niente: a ogni chiamata si rimanda tutta la conversazione, dall'inizio. Le istruzioni di sistema valgono per tutta la conversazione, <code>max_tokens</code> limita solo la lunghezza della risposta, e la chiamata dal server è proprio quella giusta.",
    slide: "api-come-funziona",
  },
  {
    domanda: "Per l'assistente di PrenotaAula un compagno propone un secondo strumento, <code>cancella_prenotazione</code>, «così fa tutto lui». Cosa rispondete?",
    opzioni: [
      "Sì, ma nelle istruzioni di sistema si scrive chiaro «non cancellare mai senza permesso».",
      "No: solo strumenti per leggere. Uno che scrive è un potere per chi sa convincere il modello.",
      "Sì: il modello usa lo strumento direttamente sul database, con i permessi dell'utente.",
      "Sì, purché nome e descrizione dello strumento spieghino bene quando il modello deve usarlo.",
      "Sì, purché lo strumento usi la chiave segreta, così funziona anche con le regole sulle righe.",
    ],
    giusta: 1,
    spiegazione: "Il modello non tocca il database: chiede, e il vostro codice esegue con i permessi dell'utente. Gli strumenti restano in sola lettura perché un testo nascosto nei dati può convincere il modello, e un'istruzione di sistema non basta a impedirlo. L'assistente propone; la prenotazione passa dal pulsante normale.",
    slide: "strumenti-al-modello",
  },
  {
    domanda: "La chiave API di PrenotaAula finisce per errore su GitHub, e qualcuno la usa con un suo script per mandare migliaia di domande. Quale misura limita il danno, anche se quelle richieste non passano dalla vostra app?",
    opzioni: [
      "Un tetto di spesa: raggiunto il limite, l'API si ferma.",
      "Un valore basso di <code>max_tokens</code>, che tiene corte le risposte.",
      "Il modello più piccolo, che costa meno per ogni domanda.",
      "Un numero massimo di domande al giorno per ogni utente dell'app.",
      "Istruzioni di sistema che chiedono al modello di rispondere in breve.",
    ],
    giusta: 0,
    spiegazione: "Il tetto di spesa si imposta nella Console, sull'account: raggiunto il limite, l'API si ferma, chiunque la stia usando. <code>max_tokens</code>, il limite per utente, la scelta del modello e le istruzioni di sistema stanno nel vostro codice, e chi usa la chiave rubata li salta.",
    slide: "costi-limiti-modello",
  },
  {
    domanda: "La segreteria incolla l'email di un docente, «mi servirebbe il laboratorio martedì prossimo dalle 14 alle 16», e il modello restituisce un JSON che rispetta lo schema. Cosa resta da fare?",
    opzioni: [
      "Niente: se il JSON rispetta lo schema, anche aula, giorno e orari sono per forza giusti.",
      "Controllare che il JSON sia scritto bene, perché il modello a volte sbaglia le parentesi.",
      "Controllare il contenuto prima di salvare: il formato è garantito, «martedì prossimo» no.",
      "Rimandare la stessa email al modello più capace, che con le date non sbaglia mai.",
      "Salvare subito: se il giorno è sbagliato, il vincolo del database rifiuta la prenotazione.",
    ],
    giusta: 2,
    spiegazione: "Con le risposte strutturate il JSON è sempre valido, ma il contenuto no: «martedì prossimo» può essere capito male, e la segreteria controlla prima di salvare. Il vincolo del database blocca le sovrapposizioni, non le date sbagliate.",
    slide: "risposte-strutturate",
  },

  // 10.8 Quanto costa
  {
    domanda: "State preparando il preventivo di PrenotaAula per una scuola vera. Quale affermazione sui costi è <strong>falsa</strong>?",
    opzioni: [
      "Il dominio non è mai gratis: si paga ogni anno, e conviene guardare il prezzo del rinnovo.",
      "L'API di Claude si paga a consumo, a ogni domanda, e va protetta con un tetto di spesa.",
      "I servizi si intestano alla scuola, che li paga, e non a voi che sviluppate l'app.",
      "I piani gratuiti usati nel corso bastano anche per la scuola, finché gli utenti sono pochi.",
      "I prezzi cambiano ogni pochi mesi: prima di fare il preventivo, si ricontrollano.",
    ],
    giusta: 3,
    spiegazione: "Il passaggio al piano a pagamento arriva appena il progetto è di un cliente, non quando crescono gli utenti: per esempio per l'uso commerciale o per avere i backup del database. Le altre affermazioni sono nella mappa dei costi; i numeri aggiornati stanno nella scheda U.6.",
    slide: "mappa-costi",
  },
];

export default quiz;
