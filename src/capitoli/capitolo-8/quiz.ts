// Quiz del capitolo 8: venti domande, cinque opzioni ciascuna.
// +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 se vuota.
// «giusta» è la posizione dell'opzione giusta: 0 = A … 4 = E.
// «slide» è il nome del file della slide da ripassare (senza .astro).
import type { Domanda } from "../../lib/quiz";

const quiz: Domanda[] = [
  // 8.1 Contenuti e codice
  {
    domanda: "Quale abbinamento tra contenuto e posto in cui tenerlo è quello consigliato dal corso?",
    opzioni: [
      "Le prenotazioni di PrenotaAula, scritte dagli studenti: in file di dati nel repository",
      "Il menu della trattoria, cambiato da Rina: scritto nell'HTML della pagina, per semplicità",
      "Il menu della trattoria, cambiato da Rina: in file nel repository, modificati da un pannello",
      "Le prenotazioni di PrenotaAula: in un CMS basato su Git, con un commit per prenotazione",
      "Il menu della trattoria: in un database, perché i prezzi sono dati che prima o poi cambiano",
    ],
    giusta: 2,
    spiegazione: "Per il menu il posto giusto è un CMS: i contenuti restano file nel repository e Rina li cambia dal suo pannello. Il database serve per i dati che cambiano di continuo e li scrivono gli utenti, come le prenotazioni di PrenotaAula. Nell'HTML, ogni prezzo sarebbe una modifica al codice.",
    slide: "dove-contenuti",
  },
  {
    domanda: "Rina chiede di poter cambiare dal pannello, oltre ai prezzi, anche i colori del sito e l'ordine delle pagine. Cosa suggerisce il corso?",
    opzioni: [
      "Di solito no: colori e pagine sono struttura, e il confine si decide prima, nel piano",
      "Sì: tutto quello che si vede sul sito è contenuto, e il contenuto spetta sempre al cliente",
      "Sì, purché Rina cambi i colori a mano nei file del repository, e non dal pannello",
      "No, e nemmeno i prezzi: un cliente che cambia il sito da solo rischia di romperlo",
      "Sì: con Keystatic ogni parte del sito diventa da sola un campo del pannello di Rina",
    ],
    giusta: 0,
    spiegazione: "Lo sviluppatore cambia la struttura (pagine, componenti, aspetto), che cambia di rado; il cliente cambia i contenuti, che cambiano spesso. Logo, colori e ordine delle pagine di solito restano a voi, e cosa può cambiare il cliente è la prima domanda del piano. I campi del pannello li decidete voi nello schema.",
    slide: "chi-fa-cosa",
  },

  // 8.2 I CMS
  {
    domanda: "Un cliente vuole modificare il sito trascinando i blocchi nel browser, con tutto incluso e senza pensare alla sicurezza. Sceglie un costruttore. Quale svantaggio deve conoscere?",
    opzioni: [
      "Dovrà aggiornare di continuo il sistema e i plugin, o il sito diventa un bersaglio",
      "Andarsene sarà difficile e la libertà di design è bassa: tutto dipende dal fornitore",
      "Il sito sarà statico, e per cambiare un contenuto dovrà sempre chiamare uno sviluppatore",
      "I contenuti saranno file nel repository, e per modificarli dovrà imparare a usare Git",
      "Gli servirà uno sviluppatore che costruisca il sito e chieda i contenuti a un'API",
    ],
    giusta: 1,
    spiegazione: "Con un costruttore come Wix o Squarespace è tutto incluso, ma tutto nelle mani del fornitore: dipendenza alta e libertà di design bassa. Gli aggiornamenti continui sono il problema dei CMS tradizionali, l'API è tipica degli headless, e nei CMS basati su Git il cliente usa comunque un pannello.",
    slide: "pro-contro-cms",
  },
  {
    domanda: "Un nuovo cliente ha già un sito WordPress e lo sa usare; chi lo seguirà dopo di voi conosce solo WordPress. Cosa suggerisce il corso?",
    opzioni: [
      "Rifarlo subito in Astro, perché ormai WordPress non lo usa quasi più nessuno",
      "Rifarlo in Astro, perché con WordPress non si può lavorare in nessun modo con l'AI",
      "Tenerlo, perché WordPress non ha bisogno di aggiornamenti né di manutenzione",
      "Spostarlo su un costruttore come Wix, che non lega il cliente a un fornitore",
      "Valutare di tenerlo: conta chi terrà in vita il sito, e con quali competenze",
    ],
    giusta: 4,
    spiegazione: "La domanda giusta non è «WordPress o Astro?», ma chi terrà in vita il sito tra due anni, e con quali competenze: qui WordPress può essere ancora la scelta giusta. Lavora con l'AI via plugin e API, ma chiede aggiornamenti continui di sistema, tema e plugin.",
    slide: "wordpress-oggi",
  },
  {
    domanda: "Il sito di «Da Rina» usa Keystatic. Volete chiedere a Claude Code di rendere più invitanti le descrizioni di tutti i piatti. Cosa raccomanda il corso?",
    opzioni: [
      "Lasciar perdere: Claude Code vede il codice, ma i contenuti sono chiusi nel pannello",
      "Chiedere prima a Rina, perché i contenuti sono suoi, e poi controllare il diff",
      "Farlo liberamente: le descrizioni sono solo testo, e non possono rompere niente",
      "Farlo fare a Rina dal pannello: Claude Code non sa modificare i file di Keystatic",
      "Passare a un CMS headless, perché solo lì l'AI può lavorare sui contenuti del sito",
    ],
    giusta: 1,
    spiegazione: "Con un CMS basato su file i contenuti sono testo nel repository, e Claude li legge e li modifica come il codice. Ma i contenuti sono del cliente: prima si chiede a lui, poi si controlla il diff, perché una descrizione «migliorata» può dire una cosa non vera.",
    slide: "cms-ai",
  },

  // 8.3 Keystatic: come funziona
  {
    domanda: "Progettate lo schema di Keystatic per «Da Rina». Quale scelta è <strong>giusta</strong>?",
    opzioni: [
      "I piatti come singolo, perché il menu del sito è una pagina sola",
      "Gli eventi come singolo, perché una volta creati si modificano e basta",
      "La storia del locale come collezione, perché è un testo lungo e formattato",
      "Gli orari come singolo, con un campo elenco per i diversi giorni",
      "I contatti come collezione, con un file per ogni numero di telefono",
    ],
    giusta: 3,
    spiegazione: "Gli orari esistono una volta sola e si modificano soltanto: sono un singolo, e i giorni stanno in un campo elenco. Piatti ed eventi sono collezioni, tanti elementi uguali che il cliente aggiunge e toglie, uno per file. Un testo lungo non diventa per questo una collezione: per lui c'è il campo testo formattato.",
    slide: "schema-keystatic",
  },
  {
    domanda: "Keystatic salva i testi lunghi formattati, come la storia del locale, in Markdoc. Che differenza c'è tra Markdoc e Markdown?",
    opzioni: [
      "Markdoc estende Markdown: aggiunge tag tra graffe per inserire componenti nel testo",
      "Markdoc serve per i dati come prezzi e allergeni; Markdown per i testi formattati lunghi",
      "Nessuna: Markdoc è solo il nome che Keystatic dà al Markdown che usa nei suoi file",
      "Markdown lo legge solo un programma; Markdoc si legge anche da una persona",
      "Markdoc è Markdown senza formattazione, per i testi semplici come gli orari",
    ],
    giusta: 0,
    spiegazione: "Markdown scrive il testo formattato con caratteri semplici: un cancelletto per il titolo, due asterischi per il grassetto. Markdoc lo estende con tag tra graffe per inserire componenti, come un avviso, che il cliente aggiunge dal pannello senza vederli. I dati come prezzi e allergeni vanno in YAML o JSON.",
    slide: "markdoc-markdown",
  },
  {
    domanda: "Mentre sviluppate, aprite il pannello di Keystatic su localhost e cambiate il prezzo delle tagliatelle. Cosa succede?",
    opzioni: [
      "Il prezzo nuovo compare subito anche sul sito online, davanti a tutti i clienti",
      "Il prezzo cambia nel database del pannello, e le pagine lo leggono da lì",
      "Il file del piatto cambia nella cartella del progetto; il commit lo fate voi",
      "Niente: in locale il pannello mostra i contenuti, ma non riesce a salvarli",
      "Keystatic apre una pull request, che Rina deve approvare dal suo telefono",
    ],
    giusta: 2,
    spiegazione: "In modalità locale il pannello gira sul vostro computer e salva i file nella cartella del progetto: il commit lo fate voi. È in modalità GitHub, sul sito online, che ogni salvataggio diventa un commit. In nessuno dei due casi c'è un database.",
    slide: "locale-github",
  },
  {
    domanda: "Rina cambia un prezzo dal pannello sul sito online e preme Salva. Quale descrizione di quello che succede è <strong>giusta</strong>?",
    opzioni: [
      "Keystatic scrive il prezzo in un database, e Vercel aggiorna la pagina leggendolo",
      "Keystatic manda un'email a voi; voi fate il commit e Vercel pubblica il sito",
      "Keystatic cambia la pagina online direttamente, senza passare da GitHub",
      "Keystatic fa un commit su GitHub; Vercel lo vede, rifà la build e pubblica",
      "Keystatic apre una pull request; il prezzo va online quando la approvate voi",
    ],
    giusta: 3,
    spiegazione: "Rina salva, Keystatic fa un commit del file del piatto su GitHub, Vercel vede il commit e ricostruisce il sito: poco dopo il prezzo nuovo è online, senza che voi facciate niente. E se una modifica rompe la build, Vercel non pubblica e il sito resta com'era.",
    slide: "salvataggio-online",
  },

  // 8.4 Implementare Keystatic con Claude Code
  {
    domanda: "Chiedete a Claude Code, in plan mode, di aggiungere Keystatic al sito della trattoria: Rina deve cambiare piatti, orari ed eventi, il resto resta fisso. Quale punto del piano che vi propone dovrebbe <strong>insospettirvi</strong>?",
    opzioni: [
      "Le pagine leggeranno i piatti dai file, invece di averli scritti dentro",
      "Ogni piatto avrà nome, categoria, prezzo, descrizione e allergeni",
      "Logo, colori e testi della home resteranno fuori dal pannello di Rina",
      "Non verrà installato niente prima che abbiate approvato il piano",
      "Verrà aggiunta anche una libreria per mostrare le foto in galleria",
    ],
    giusta: 4,
    spiegazione: "Nel piano si controlla che i campi siano quelli che servono a Rina, che le pagine leggano i dati dai file e che non compaiano librerie che non avete chiesto: una galleria nessuno l'ha chiesta, quindi chiedete perché. Gli altri punti sono proprio quello che serve.",
    slide: "piano-keystatic",
  },
  {
    domanda: "Nello schema dei piatti, la categoria è un campo a scelta (primi, secondi…) e non un testo libero. Perché?",
    opzioni: [
      "Perché Keystatic non sa salvare un testo libero dentro i file YAML del repository",
      "Perché così nessuno scrive «primo» o «Primi piatti»: i valori restano uguali",
      "Perché i campi a scelta sono gli unici che Claude Code riesce a leggere nei file",
      "Perché un testo libero andrebbe in un database, e Keystatic non ne usa nessuno",
      "Perché una scelta occupa nel repository molto meno spazio di un testo libero",
    ],
    giusta: 1,
    spiegazione: "Una scelta, non un testo libero: così la categoria è scritta sempre allo stesso modo. Per lo stesso motivo gli allergeni vengono da un elenco, quello del regolamento europeo, e non sono inventati. Il testo libero Keystatic lo salva senza problemi, come la descrizione del piatto.",
    slide: "schema-trattoria",
  },
  {
    domanda: "Mettete online il pannello di Keystatic in modalità GitHub. Cosa cambia nel sito della trattoria?",
    opzioni: [
      "Diventa tutto dinamico: ogni pagina viene costruita sul server a ogni visita",
      "Nulla: il pannello online funziona anche su un sito del tutto statico",
      "Serve un database su Vercel, dove il pannello salva i contenuti cambiati",
      "Le pagine restano statiche; solo /keystatic ha una parte che gira sul server",
      "Le pagine restano statiche, ma leggono i contenuti da GitHub a ogni visita",
    ],
    giusta: 3,
    spiegazione: "Il pannello ha bisogno di una piccola parte che gira sul server, per parlare con GitHub: per questo si aggiunge l'adattatore di Vercel. Le pagine della trattoria restano statiche; solo /keystatic no. I contenuti restano file nel repository, senza database.",
    slide: "online-github",
  },
  {
    domanda: "Claude Code ha scritto lo schema di Keystatic, ma la build si ferma: campo sconosciuto <code>fields.price</code>. Qual è il primo sospetto, e cosa fate?",
    opzioni: [
      "Un errore di battitura nel vostro prompt: basta rilanciare la stessa richiesta",
      "Keystatic non gestisce i prezzi: il prezzo va scritto dentro la descrizione",
      "Un problema di Vercel: la build va rilanciata finché non passa da sola",
      "Manca un pacchetto: chiedete a Claude di installare una libreria per i prezzi",
      "Un campo inventato: date a Claude la documentazione attuale di Keystatic",
    ],
    giusta: 4,
    spiegazione: "Keystatic è giovane e cambia, e il modello spesso ne conosce una versione vecchia: inventa campi plausibili, come <code>fields.price</code>, che non esistono. Se la build si lamenta di un campo sconosciuto, il primo sospetto è un'invenzione, e la difesa è dare a Claude la documentazione attuale. Per il prezzo, Keystatic ha il campo numero.",
    slide: "ai-sbaglia-keystatic",
  },

  // 8.5 Scrivere per il web
  {
    domanda: "Nella pagina «Eventi» di «Da Rina», quale testo per il pulsante principale segue meglio i consigli del corso?",
    opzioni: [
      "«Prenota per la serata di venerdì»",
      "«Scopri di più sulle nostre serate»",
      "«Invia la tua richiesta al locale»",
      "«Clicca qui per tutti i dettagli»",
      "«Leggi tutti gli eventi in programma»",
    ],
    giusta: 0,
    spiegazione: "Ogni pagina ha un obiettivo, e quello della pagina Eventi è riempire le serate a tema: il pulsante dice cosa succede dopo, cioè prenotare. «Invia», «Clicca qui» e «Scopri di più» sono etichette che non dicono cosa succede, e leggere altri eventi non porta all'obiettivo.",
    slide: "titoli-inviti",
  },
  {
    domanda: "Volete che i testi scritti da Claude per «Da Rina» abbiano il tono di Rina. Cosa funziona meglio, secondo il corso?",
    opzioni: [
      "Scrivere nel <code>CLAUDE.md</code> cinque aggettivi: caldo, familiare, genuino, semplice, accogliente",
      "Non scrivere niente: il tono di Claude va già bene per tutti i siti di ristoranti",
      "Mettere nel <code>CLAUDE.md</code> poche regole e due o tre frasi scritte davvero da Rina",
      "Ripetere a ogni messaggio «scrivi come Rina», senza spiegare come parla lei",
      "Copiare il tono di una trattoria famosa, così il sito sembra più professionale",
    ],
    giusta: 2,
    spiegazione: "Se il tono non è scritto, l'AI usa il suo, che è quello di tutti. Va scritto nel <code>CLAUDE.md</code>, così vale in ogni sessione; e gli esempi contano più delle regole: due o tre frasi di Rina, o del menu cartaceo, insegnano il tono meglio di una lista di aggettivi.",
    slide: "tono-claude-md",
  },
  {
    domanda: "Claude propone per la home: «Dal 1950, un viaggio tra i sapori: un'esperienza unica, autentica e indimenticabile.» Cosa va fatto prima di pubblicarla?",
    opzioni: [
      "Niente: il testo è scorrevole, e Claude conosce già la storia del locale",
      "Solo togliere gli aggettivi: la data è un fatto, e sui fatti l'AI non sbaglia",
      "Solo controllare la data: lo stile è quello che i clienti si aspettano",
      "Chiedere a Claude di aggiungere premi e recensioni, per renderlo credibile",
      "Verificare con Rina il «dal 1950» e togliere tic come «un viaggio tra i sapori»",
    ],
    giusta: 4,
    spiegazione: "Ogni testo passa da due controlli: è vero? Suona come il cliente? Date come «dal 1950», premi e recensioni sono spesso inventati e vanno verificati; «un viaggio tra i sapori», «un'esperienza unica» e le liste di tre aggettivi sono tic dell'AI da togliere. L'ultima parola è di Rina.",
    slide: "ai-scrive-voi",
  },

  // 8.6 Immagini e media
  {
    domanda: "Trovate una bella foto di un piatto di tagliatelle con licenza Creative Commons BY-NC. Si può usare sul sito di «Da Rina»?",
    opzioni: [
      "Sì: basta citare l'autore, perché BY chiede solo questo",
      "Sì: le immagini Creative Commons sono tutte libere da usare",
      "No: NC vieta l'uso commerciale, e il sito di un ristorante lo è",
      "No: NC vieta di modificarla, e Astro la ridimensiona per pubblicarla",
      "Sì, ma solo se la convertite in WebP prima di pubblicarla",
    ],
    giusta: 2,
    spiegazione: "Nelle licenze Creative Commons conta la sigla: BY chiede di citare l'autore, NC vieta l'uso commerciale, ND vieta le modifiche. Il sito di un ristorante è commerciale, quindi NC lo esclude. E comunque le foto di piatti che non sono suoi ingannano i clienti: meglio poche foto vere.",
    slide: "dove-trovarle",
  },
  {
    domanda: "Rina vuole un logo nuovo e vi chiede di farlo con l'AI. Cosa consiglia il corso?",
    opzioni: [
      "Partire dalla storia del locale e controllare che non somigli a un logo esistente",
      "Chiedere un logo «come quello di» un marchio famoso: l'AI lo ridisegna, ed è nuovo",
      "Nessun controllo: un logo generato dall'AI è originale per definizione",
      "Prendere un'icona da una raccolta libera, senza perdere tempo a leggerne la licenza",
      "Registrare subito il marchio: così anche un logo simile a un altro diventa vostro",
    ],
    giusta: 0,
    spiegazione: "«Fai un logo come quello di…» è il modo più veloce per avere un problema: si chiede un'idea originale, partendo dalla storia del locale, e si controlla che non somigli troppo a un logo esistente. Il marchio si registra dopo, se il cliente vuole proteggerlo.",
    slide: "icone-loghi-marchi",
  },
  {
    domanda: "Volete pubblicare sul sito la foto della sala piena il sabato sera, con alcuni clienti riconoscibili. Cosa dice il corso?",
    opzioni: [
      "Si può: le foto scattate in un locale aperto al pubblico si pubblicano senza chiedere",
      "Basta il consenso di Rina, che è la titolare del locale e ha scattato la foto",
      "Serve il consenso solo per i minori: gli adulti lo danno entrando nel locale",
      "Chi è riconoscibile deve aver detto sì; se no, si inquadrano mani, piatti e spalle",
      "Si può, purché prima l'AI rigeneri la foto partendo da quella vera",
    ],
    giusta: 3,
    spiegazione: "Il volto di una persona riconoscibile è un dato personale, e in Italia l'immagine di una persona non si pubblica senza il suo consenso. Il consenso è di chi sta nella foto, non del titolare del locale, e si può ritirare: allora la foto va tolta.",
    slide: "foto-persone",
  },
  {
    domanda: "Quale uso di un'immagine generata dall'AI va bene per il sito di «Da Rina»?",
    opzioni: [
      "La «foto» di un piatto nuovo che in cucina non hanno ancora mai preparato",
      "Un'illustrazione decorativa per lo sfondo della pagina con le serate a tema",
      "La sala generata più grande e luminosa del vero, per sembrare più accogliente",
      "Un gruppo di clienti sorridenti generati, presentato come la serata di sabato",
      "Il volto generato di un attore famoso che consiglia le tagliatelle della casa",
    ],
    giusta: 1,
    spiegazione: "Illustrazioni, icone e sfondi decorativi sono l'uso giusto: non fanno credere niente di falso. La foto di un piatto che non esiste, il locale più bello del vero e persone che sembrano clienti ingannano chi guarda; il volto di una persona reale generato senza il suo consenso può essere un reato.",
    slide: "media-generati",
  },
];

export default quiz;
