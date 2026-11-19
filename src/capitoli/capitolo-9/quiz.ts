// Quiz del capitolo 9: venti domande, cinque opzioni ciascuna.
// +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 se vuota.
// «giusta» è la posizione dell'opzione giusta: 0 = A … 4 = E.
// «slide» è il nome del file della slide da ripassare (senza .astro).
import type { Domanda } from "../../lib/quiz";

const quiz: Domanda[] = [
  // 9.1 Come funziona la ricerca
  {
    domanda: "Pubblicate sul sito di Da Rina la pagina «Eventi», ma nessun link porta lì, né dal sito né da fuori, e non è nella sitemap. Cosa succede, con ogni probabilità?",
    opzioni: [
      "Il crawler non la trova: non entra nell'indice e non compare nei risultati",
      "Entra nell'indice, ma compare in fondo alla classifica finché non riceve link",
      "Il crawler la trova lo stesso, perché legge tutte le cartelle del server del sito",
      "Compare nei risultati, ma solo a chi cerca esattamente il titolo della pagina",
      "Viene indicizzata, ma nei risultati compare senza il suo title e la description",
    ],
    giusta: 0,
    spiegazione: "Il crawler scopre le pagine seguendo i link, e la sitemap gli dice cosa c'è. Senza l'uno e l'altra la pagina non viene letta: niente indice, quindi nessuna classifica. Il primo lavoro è farsi leggere.",
    slide: "scansione-indice-classifica",
  },
  {
    domanda: "Qualcuno cerca su Google «trattoria pasta fatta in casa Torino». Cosa succede <em>in quel momento</em>?",
    opzioni: [
      "Il crawler visita in quel momento i siti delle trattorie di Torino, per leggerli",
      "Google legge la sitemap di ogni trattoria, per scoprire quali pagine ha",
      "Tra le pagine già nell'indice si scelgono le più utili, e si mettono in ordine",
      "Le pagine vengono indicizzate, e chi è stato pubblicato per primo compare prima",
      "Si leggono i robots.txt delle trattorie, per sapere quali pagine mostrare",
    ],
    giusta: 2,
    spiegazione: "Scansione, indice e classifica sono tre lavori fatti in momenti diversi. Il crawler legge le pagine prima, giorno e notte; al momento della ricerca si sceglie solo tra quelle che sono già nell'indice.",
    slide: "scansione-indice-classifica",
  },
  {
    domanda: "Quale di queste affermazioni su cosa conta per la classifica è <strong>falsa</strong>?",
    opzioni: [
      "Conta la pertinenza: la pagina deve parlare davvero di quello che si cerca",
      "Conta l'esperienza: la pagina si apre veloce e si legge bene dal telefono",
      "Per «trattoria vicino a me» il profilo su Google Maps pesa più del sito",
      "Quello che serve a Google, in gran parte, è quello che serve alle persone",
      "Le regole esatte della classifica sono pubbliche, anche se cambiano spesso",
    ],
    giusta: 4,
    spiegazione: "Le regole esatte non sono pubbliche, e in più cambiano spesso: per questo chi promette «la formula» va preso con cautela. Stabili sono i principi: pertinenza, qualità, esperienza, vicinanza.",
    slide: "cosa-conta-ricerca",
  },
  // 9.2 SEO di base
  {
    domanda: "Nel sito Astro di Da Rina il layout ha un <code>&lt;title&gt;</code> fisso, uguale per tutte le pagine. Gli eventi, invece, li pubblica Rina con Keystatic. Come si sistema, secondo il corso?",
    opzioni: [
      "Ogni pagina passa al layout titolo e descrizione come props; per gli eventi, due campi nello schema",
      "Si tiene il title fisso e si aggiunge nel layout una description lunga, valida per tutto il sito",
      "Si scrivono titolo e descrizione di ogni pagina nella sitemap, che Google legge al posto del <code>&lt;head&gt;</code>",
      "Si mettono titolo e descrizione di ogni evento nel robots.txt, così il crawler li trova subito",
      "Claude aggiunge a mano nel codice il titolo di ogni evento, ogni volta che Rina ne pubblica uno",
    ],
    giusta: 0,
    spiegazione: "Ogni pagina ha title e description suoi: le pagine Astro li passano al layout, che li mette nel <code>&lt;head&gt;</code>. Per gli eventi di Keystatic si aggiungono allo schema due campi, titolo per Google e descrizione: così li scrive Rina, e non restano vuoti.",
    slide: "title-description",
  },
  {
    domanda: "Quale di queste scelte <strong>non</strong> aiuta motori e persone a capire il sito di Da Rina?",
    opzioni: [
      "Un solo <code>&lt;h1&gt;</code> per pagina, e sotto <code>&lt;h2&gt;</code> e <code>&lt;h3&gt;</code> in ordine, senza salti",
      "L'indirizzo <code>/dove-siamo</code> per la pagina con la mappa e gli orari",
      "Il file <code>tagliatelle-al-ragu.webp</code>, con un testo alternativo che descrive il piatto",
      "Il titolo «Un'esperienza gastronomica autentica» come <code>&lt;h1&gt;</code> della home",
      "La frase «Trattoria a Torino con pasta fatta in casa» nel testo della home",
    ],
    giusta: 3,
    spiegazione: "Nei testi servono le parole che usano i clienti quando cercano, come «trattoria a Torino con pasta fatta in casa»: «esperienza gastronomica autentica» suona bene ma non dice niente a nessuno. Titoli in ordine, indirizzi leggibili e immagini con nome e testo alternativo aiutano.",
    slide: "titoli-testi-indirizzi",
  },
  {
    domanda: "Rina ha una pagina per i fornitori, con i prezzi all'ingrosso. Le basta una riga <code>Disallow</code> nel robots.txt per tenerla riservata?",
    opzioni: [
      "Sì: con <code>Disallow</code> nessun programma e nessuna persona può più aprirla",
      "Sì, purché la pagina non compaia anche nella sitemap che date a Google",
      "No: va tolta dalla sitemap, che è il vero lucchetto delle pagine del sito",
      "No: robots.txt è una richiesta ai crawler, non impedisce a nessuno di aprirla",
      "Sì, se il robots.txt sta nella cartella principale e non in una sottocartella",
    ],
    giusta: 3,
    spiegazione: "robots.txt è una richiesta, non un lucchetto: i crawler seri la rispettano, gli altri no, e chiunque abbia l'indirizzo apre la pagina. La sitemap, poi, è solo un elenco: toglierne una pagina non la protegge.",
    slide: "sitemap-robots",
  },
  {
    domanda: "La pagina «Eventi» non compare su Google. Quale strumento vi dice se Google l'ha letta e quali errori ha trovato?",
    opzioni: [
      "Il profilo dell'attività su Google, nella parte dedicata al sito della trattoria",
      "Search Console, collegata al dominio, a cui avete dato la sitemap",
      "Il robots.txt, che registra le visite dei crawler a ogni pagina del sito",
      "La sitemap.xml, che segna quali pagine Google ha già letto e quali no",
      "Le statistiche senza cookie, che contano anche le visite dei motori",
    ],
    giusta: 1,
    spiegazione: "Search Console è lo strumento per voi: dice se Google ha letto le pagine, con quali ricerche compaiono e quali errori trova. Il profilo dell'attività è la scheda per i clienti; robots.txt e sitemap parlano ai crawler, ma non registrano niente.",
    slide: "search-console-scheda",
  },
  {
    domanda: "Chi deve essere il proprietario del profilo della trattoria su Google e su Maps?",
    opzioni: [
      "Voi, che fate il sito: così lo aggiornate insieme alle pagine del sito",
      "L'account della vostra agenzia, per gestire tutti i clienti in un posto solo",
      "Chi ha registrato il dominio, che sia Rina o la persona che ha fatto il sito",
      "Nessuno in particolare: basta che qualcuno risponda alle recensioni",
      "Rina, con il suo account: voi lo collegate al sito e le insegnate a usarlo",
    ],
    giusta: 4,
    spiegazione: "Come il dominio, il profilo è del cliente e sta sul suo account. Voi lo collegate al sito e insegnate a Rina a tenerlo aggiornato: orari, foto e recensioni sono la prima cosa che i clienti guardano.",
    slide: "search-console-scheda",
  },
  {
    domanda: "Chiedete a Claude di rivedere la SEO del sito di Da Rina. Quale di queste sue risposte <strong>non</strong> dovete prendere per buona?",
    opzioni: [
      "«La pagina eventi ha la stessa description della home: conviene cambiarla.»",
      "«Tre immagini della pagina del menu non hanno il testo alternativo.»",
      "«Nella pagina dove siamo c'è un <code>&lt;h3&gt;</code> subito dopo l'<code>&lt;h1&gt;</code>.»",
      "«Ogni mese 2.400 persone cercano <em>trattoria Torino</em>, e voi siete ottavi.»",
      "«La sitemap non comprende la pagina degli eventi, pubblicata ieri.»",
    ],
    giusta: 3,
    spiegazione: "Claude legge bene il codice delle pagine, quindi description, testi alternativi, titoli e sitemap li può controllare. Volumi di ricerca e posizioni invece non li vede: li stima o li inventa. I dati veri li dà Search Console.",
    slide: "claude-revisore-seo",
  },
  // 9.3 La ricerca con l'AI
  {
    domanda: "Sempre più persone fanno una domanda a un'AI invece di scorrere una lista di link. Cosa vuol dire per il sito di Da Rina?",
    opzioni: [
      "Più clic, perché l'AI rimanda sempre al sito delle fonti che cita nella risposta",
      "Meno clic, ma chi arriva ha già scelto: il sito deve rendere facile prenotare",
      "Nessun cambiamento: le AI riportano i risultati di Google, nello stesso ordine",
      "Il sito non serve più: l'AI risponde da sola, e nessuno lo aprirà più",
      "Meno clic, quindi conviene lasciar perdere il sito e puntare tutto sui social",
    ],
    giusta: 1,
    spiegazione: "Quando la risposta arriva già scritta, molti non cliccano. Ma chi clicca dalla risposta di un'AI vuole prenotare, chiamare o sapere la strada: il sito deve renderlo facile. E resta la fonte che l'AI legge e cita.",
    slide: "risposte-al-posto-link",
  },
  {
    domanda: "A cosa servono, nel sito di Da Rina, i dati strutturati di schema.org come <code>\"@type\": \"Restaurant\"</code>?",
    opzioni: [
      "A dare i dati principali in un formato standard, che le macchine leggono senza indovinare",
      "A garantire alla trattoria il primo posto nelle ricerche su Google e nelle risposte delle AI",
      "A dire ai crawler dei motori e delle AI quali pagine del sito possono visitare e quali no",
      "A elencare per i crawler tutte le pagine del sito, con la data del loro ultimo aggiornamento",
      "A mostrare ai clienti orari e telefono in un riquadro ben visibile in cima a ogni pagina",
    ],
    giusta: 0,
    spiegazione: "I dati strutturati descrivono la trattoria (nome, cucina, telefono, orari) con un vocabolario standard che motori e AI capiscono. Aiutano a farsi capire e citare, ma non garantiscono nessuna posizione; dove entrare e cosa c'è lo dicono robots.txt e sitemap.",
    slide: "farsi-citare",
  },
  {
    domanda: "Molti clienti chiedono alle AI se da Rina c'è un menu senza glutine. Cosa rende più probabile che l'AI risponda citando il sito?",
    opzioni: [
      "Una foto del menu cartaceo, che l'AI può leggere e interpretare da sola",
      "La parola «senza glutine» ripetuta in ogni paragrafo della pagina del menu",
      "Un testo di domande frequenti nascosto alle persone e visibile solo ai crawler",
      "Una frase chiara nella pagina del menu: se c'è, e quali piatti comprende",
      "Una recensione scritta apposta, che loda i piatti senza glutine della trattoria",
    ],
    giusta: 3,
    spiegazione: "Un'AI cita le fonti che capisce bene: una risposta chiara alla domanda vera, scritta nel testo. Parole ripetute, testo nascosto e recensioni finte sono proprio quello che i motori puniscono, e una foto lascia all'AI il lavoro di indovinare.",
    slide: "farsi-citare",
  },
  {
    domanda: "Su Google Maps la trattoria chiude alle 15, sul sito alle 14.30, su Instagram alle 15.30. Un cliente chiede a un'AI fino a che ora è aperta. Qual è il problema?",
    opzioni: [
      "Google toglie il sito dall'indice finché i tre orari non coincidono di nuovo",
      "Motori e AI non sanno di quale dato fidarsi, né quale fonte citare",
      "L'AI sceglie sempre l'orario più tardi dei tre e lo presenta come quello vero",
      "Nessuno: un'AI legge soltanto il sito ufficiale e ignora Maps e i social",
      "Nessuno, se l'orario giusto è scritto almeno nei dati strutturati del sito",
    ],
    giusta: 1,
    spiegazione: "Indirizzo, telefono e orari devono essere identici dappertutto: se non coincidono, motori e AI non sanno di quale fidarsi, e un'AI cita le fonti di cui si fida. Vanno sistemati sul sito, ma anche su Maps e sui social.",
    slide: "farsi-citare",
  },
  {
    domanda: "Rina non vuole che i testi del sito servano ad addestrare i modelli di AI, ma vuole che la trattoria compaia nelle loro risposte. Cosa scrivete nel robots.txt?",
    opzioni: [
      "Bloccate tutti i crawler delle AI: per comparire nelle risposte basta essere su Google",
      "Bloccate i crawler di ricerca e lasciate entrare quelli che addestrano i modelli",
      "Niente: non si può, chi blocca l'addestramento sparisce anche dalle risposte",
      "Niente nel robots.txt: basta togliere dalla sitemap le pagine con i testi",
      "Bloccate i crawler che addestrano i modelli e lasciate entrare quelli che cercano",
    ],
    giusta: 4,
    spiegazione: "Ogni azienda di AI ha più crawler, per scopi diversi, e robots.txt li tratta uno per uno. Bloccare l'addestramento protegge i testi e non toglie il sito dalle risposte; bloccare anche la ricerca vuol dire non essere citati.",
    slide: "crawler-ai",
  },
  {
    domanda: "Un'agenzia propone a Rina cento pagine generate con l'AI, quasi uguali: «Trattoria a Torino», «Trattoria a Moncalieri», «Trattoria a Rivoli»… Cosa le consigliate?",
    opzioni: [
      "Di accettare, purché ogni pagina abbia title e description diversi dalle altre",
      "Di accettare, purché tutte le pagine siano nella sitemap e quindi indicizzate",
      "Di rifiutare: è contenuto in massa per la classifica, e i motori lo puniscono",
      "Di accettare, ma senza link nel menu del sito, così i clienti non le vedono",
      "Di accettare solo le pagine dei comuni dove la trattoria ha già dei clienti",
    ],
    giusta: 2,
    spiegazione: "Cento pagine quasi uguali, una per parola chiave, sono contenuto prodotto in massa per manipolare la classifica: i motori hanno imparato a riconoscerlo e lo trattano come spam. Title diversi o pagine nascoste ai clienti non cambiano la sostanza.",
    slide: "cosa-non-fare-ricerca",
  },
  {
    domanda: "Rina scrive con l'aiuto di Claude la pagina «La nostra storia», poi la rilegge e corregge i fatti. Secondo la regola di Google riportata nel corso, cosa conta?",
    opzioni: [
      "Che in fondo alla pagina sia dichiarato che il testo viene da un'AI",
      "Che Google non se ne accorga: i testi riconosciuti come generati vengono puniti",
      "Che la pagina sia utile alle persone, chiunque l'abbia scritta",
      "Che la parola chiave principale compaia in ogni paragrafo del testo",
      "Che la pagina sia lunga almeno quanto quelle dei concorrenti",
    ],
    giusta: 2,
    spiegazione: "Per Google conta se il contenuto è utile alle persone, non se l'ha scritto una persona o un'AI. Il problema è il contenuto prodotto in massa per manipolare la classifica, con o senza AI. Che Rina controlli i fatti resta comunque necessario.",
    slide: "cosa-non-fare-ricerca",
  },
  // 9.4 Condividere e misurare
  {
    domanda: "Mandate su WhatsApp il link del sito di Da Rina, e l'anteprima compare senza immagine. Cosa controllate?",
    opzioni: [
      "Il testo alternativo della prima immagine che compare nella home",
      "Il meta tag <code>og:image</code>, con l'indirizzo completo dell'immagine",
      "Il <code>&lt;title&gt;</code> della pagina, che le chat usano anche per l'immagine",
      "La sitemap, che deve elencare anche le immagini da mostrare nelle anteprime",
      "La description della pagina, da cui le chat ricavano l'immagine da mostrare",
    ],
    giusta: 1,
    spiegazione: "L'anteprima di un link la decidono alcuni meta tag nel layout: <code>og:title</code>, <code>og:description</code> e <code>og:image</code>. Non si vedono nella pagina, ma li leggono social e chat. Testo alternativo, title e sitemap servono ad altro.",
    slide: "anteprime-social",
  },
  {
    domanda: "Le statistiche del sito di Da Rina dicono che molti toccano «Prenota», ma pochissimi completano la prenotazione. Dove conviene lavorare per primo?",
    opzioni: [
      "Sul modulo di prenotazione: forse è troppo lungo o difficile",
      "Sulla SEO, per portare più visite al sito della trattoria",
      "Sul pulsante «Prenota», che forse dal telefono non si vede",
      "Sulla pagina del menu, che forse non convince abbastanza",
      "Sulle anteprime sui social, per far girare di più il link",
    ],
    giusta: 0,
    spiegazione: "Si lavora dove ci si perde. Se molti toccano «Prenota» e pochi prenotano, il pulsante si vede e il menu ha convinto: il problema viene dopo, nel modulo. Più visite porterebbero solo più persone allo stesso ostacolo.",
    slide: "sito-ottenere",
  },
  {
    domanda: "Rina è contenta: questo mese il sito ha avuto il doppio delle visite. Cosa le fate notare?",
    opzioni: [
      "Che va bene così: più visite vogliono dire sempre più prenotazioni",
      "Che conta soprattutto quanto tempo le persone restano sul sito",
      "Che conta solo la posizione del sito nei risultati di Google",
      "Che bisogna sapere chi sono i visitatori, usando i cookie",
      "Che conta quante visite diventano prenotazioni, non quante sono",
    ],
    giusta: 4,
    spiegazione: "Le visite non sono l'obiettivo: l'obiettivo è che qualcuno prenoti. La conversione è la percentuale di visitatori che arriva in fondo; il doppio delle visite con le stesse prenotazioni vuol dire una conversione dimezzata.",
    slide: "sito-ottenere",
  },
  {
    domanda: "Volete contare le visite al sito di Da Rina. Quale scelta segue la regola del Garante riportata nel corso?",
    opzioni: [
      "Uno strumento con cookie che manda i dati a terzi, senza banner, perché le statistiche servono solo a Rina",
      "Nessuno strumento: contare le visite richiede sempre il consenso di ogni visitatore",
      "Uno strumento senza cookie, che non identifica le persone, indicato nell'informativa",
      "Qualsiasi strumento, purché il sito abbia poche visite e nessun modulo di contatto",
      "Uno strumento che segue ogni visitatore, purché i dati restino su un server italiano",
    ],
    giusta: 2,
    spiegazione: "Per contare le visite non serve seguire le persone. Gli strumenti statistici possono fare a meno del consenso solo se i dati sono ridotti al minimo e non servono a profilare: nel dubbio si sceglie il meno invadente, e lo si scrive nell'informativa.",
    slide: "statistiche-privacy",
  },
];

export default quiz;
