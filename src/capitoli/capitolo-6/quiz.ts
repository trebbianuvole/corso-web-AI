// Quiz del capitolo 6: venti domande, cinque opzioni ciascuna.
// +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 se vuota.
// «giusta» è la posizione dell'opzione giusta: 0 = A … 4 = E.
// «slide» è il nome del file della slide da ripassare (senza .astro).
import type { Domanda } from "../../lib/quiz";

const quiz: Domanda[] = [
  // 6.1 Il banco di lavoro
  {
    domanda: "Un compagno clona il repository di Da Rina e lancia subito <code>npm run dev</code>. Risposta: «Cannot find module». Qual è la causa più probabile?",
    opzioni: [
      "Su GitHub manca la cartella <code>node_modules</code>: qualcuno ha dimenticato di caricarla con il push.",
      "Il file <code>package.json</code> è stato scritto su un altro computer, e su questo va rifatto da capo.",
      "Non ha lanciato <code>npm install</code>, che scarica le librerie elencate in <code>package.json</code>.",
      "Ha installato la versione LTS di Node.js, mentre Astro funziona solo con la versione più recente.",
      "Non ha ancora avviato Claude Code, che serve a far partire il sito in locale sul computer.",
    ],
    giusta: 2,
    spiegazione: "npm scarica le librerie elencate in <code>package.json</code> nella cartella <code>node_modules</code>: dopo un clone si lancia <code>npm install</code>. <code>node_modules</code> non sta su GitHub apposta, perché è nel <code>.gitignore</code> e si ricrea; e la versione da usare è proprio la LTS.",
    slide: "node-npm",
  },
  {
    domanda: "Su un sito che non conoscete trovate un comando di una riga, da incollare nel terminale, per «installare Claude Code più in fretta». Cosa fate?",
    opzioni: [
      "Non lo usate: scarica ed esegue un programma, e comandi così si copiano solo dalla pagina ufficiale.",
      "Lo usate se il sito sembra serio e il comando è corto, perché così si capisce subito cosa fa.",
      "Lo provate prima sul computer di un compagno e, se lì funziona, lo lanciate anche sul vostro.",
      "Lo lanciate, e subito dopo controllate con <code>claude --version</code> che la versione installata sia quella giusta.",
      "Lo lanciate dentro una cartella vuota, così non può toccare i file dei vostri progetti.",
    ],
    giusta: 0,
    spiegazione: "Questi comandi scaricano un programma e lo eseguono sul vostro computer: da un sito qualsiasi potreste installare tutt'altro. Che sia corto, che funzioni da un compagno o che giri in una cartella vuota non lo rende sicuro; vale solo la pagina ufficiale.",
    slide: "installare-claude-code",
  },

  // 6.2 Il CLAUDE.md
  {
    domanda: "Quale di queste righe va bene nel CLAUDE.md della trattoria Da Rina?",
    opzioni: [
      "«Il codice deve essere sempre pulito, moderno e di qualità, come quello di un professionista.»",
      "«Ieri abbiamo sistemato il menu dei dolci; oggi si lavora alla pagina degli orari.»",
      "«Password del pannello di Vercel: rina2026, così si può pubblicare senza chiedere.»",
      "«Ogni pagina usa il layout Base.astro; i pezzi che si ripetono diventano componenti.»",
      "«Elenco di tutti i file: index.astro, menu.astro, orari.astro, Piatto.astro, Base.astro…»",
    ],
    giusta: 3,
    spiegazione: "Una regola precisa, come «ogni pagina usa il layout Base.astro», aiuta davvero. Le regole vaghe non aiutano, il diario del lavoro va nei commit, i segreti non vanno mai in un file del repository, e l'elenco dei file Claude lo legge da solo dal codice.",
    slide: "cosa-non-ci-va",
  },
  {
    domanda: "Per la seconda volta Claude scrive i prezzi del menu senza il simbolo dell'euro. Cosa conviene fare?",
    opzioni: [
      "Ripetere la correzione nel prompt, con più insistenza: «ricordati sempre l'euro, è importante».",
      "Aggiungere al CLAUDE.md una regola precisa sui prezzi, con un commit, così vale in ogni sessione.",
      "Scrivere la regola in un commento nella pagina del menu: Claude la troverà quando apre il file.",
      "Aprire una sessione nuova: la memoria di lavoro è piena, ed è per questo che Claude dimentica.",
      "Riscrivere da capo tutto il CLAUDE.md, perché evidentemente Claude non lo sta leggendo.",
    ],
    giusta: 1,
    spiegazione: "È la regola delle due volte: quando Claude sbaglia due volte la stessa cosa, non si ripete la correzione, si aggiunge una regola al CLAUDE.md. Un commento in una pagina Claude lo vede solo se apre quel file, mentre il CLAUDE.md si carica a ogni sessione; e una sessione nuova non insegna niente sui prezzi.",
    slide: "claude-md-cresce",
  },
  {
    domanda: "Nel progetto di Da Rina, che esiste già, lanciate <code>/init</code>. Cosa vi potete aspettare?",
    opzioni: [
      "Un CLAUDE.md completo: <code>/init</code> legge anche il documento di progetto e ne ricava scopo e divieti.",
      "Che il CLAUDE.md scritto a mano venga sostituito da uno nuovo, ricavato soltanto dal codice.",
      "L'elenco di tutti i file e di ogni componente, che è proprio quello che serve a Claude nel CLAUDE.md.",
      "Niente: <code>/init</code> funziona solo nei progetti nuovi, prima che ci sia del codice da leggere.",
      "Una prima versione con comandi e cartelle; perché esiste il sito e cosa non fare lo scrivete voi.",
    ],
    giusta: 4,
    spiegazione: "<code>/init</code> fa leggere il codice a Claude: trova comandi e cartelle, ma non sa per chi è il sito né cosa è vietato, e quella parte la scrivete voi dal documento di progetto. Se un CLAUDE.md c'è già, propone miglioramenti invece di sovrascriverlo.",
    slide: "init-claude-md",
  },

  // 6.3 La prima sessione
  {
    domanda: "In plan mode chiedete a Claude la pagina degli orari. Nel piano leggete che vuole aggiungere una libreria per gestire le date, che non vi serve. Cosa fate?",
    opzioni: [
      "Approvate comunque: le scelte tecniche spettano all'agente, a voi spetta solo l'obiettivo.",
      "Correggete il piano, «niente libreria per le date», e approvate solo quando vi convince.",
      "Approvate e poi, se la libreria non vi piace, la togliete voi tornando al commit di prima.",
      "Uscite dal plan mode e riscrivete il prompt da capo, perché un piano non si può correggere.",
      "Lasciate fare: in plan mode Claude non può installare niente, quindi la proposta non conta.",
    ],
    giusta: 1,
    spiegazione: "Il plan mode serve proprio a leggere il piano e correggerlo prima che Claude scriva: solo dopo l'approvazione modifica i file. Approvare un piano che non vi convince sposta il problema a dopo, e anche il CLAUDE.md di Da Rina dice «niente librerie nuove senza chiedere».",
    slide: "plan-mode-pratica",
  },
  {
    domanda: "Claude scrive: «Ho finito, la home è pronta». Come verificate che sia vero?",
    opzioni: [
      "Gli chiedete di rileggere il suo lavoro e di confermarvi, punto per punto, che è tutto a posto.",
      "Fate subito il commit e il push: se c'è qualche errore, ve lo segnala la build su Vercel.",
      "Controllate che <code>npm run build</code> passi: se la build passa, anche la pagina è giusta.",
      "Guardate la pagina nel browser, anche dal telefono, il diff dei file e la build nel terminale.",
      "Aprite la pagina su localhost dal computer: se si vede bene, il lavoro è finito davvero.",
    ],
    giusta: 3,
    spiegazione: "«Ho finito» lo dice Claude; se è vero lo decidete voi, in tre posti: il browser (anche dal telefono, e con i testi giusti, non inventati), il diff e il terminale. Le altre risposte guardano un posto solo, oppure si fidano di Claude o della build online.",
    slide: "guardare-risultato",
  },
  {
    domanda: "Avete finito il piè di pagina di Da Rina, la build passa e avete fatto il commit. Il prossimo lavoro è la pagina «Dove siamo», che con il piè di pagina non c'entra. Cosa conviene fare?",
    opzioni: [
      "Ripartire con una conversazione nuova e il contesto vuoto: il CLAUDE.md si ricarica da solo.",
      "Restare nella stessa sessione, così Claude ricorda bene tutto quello che avete fatto finora.",
      "Aspettare che il contesto si riempia: a quel punto Claude riassume da solo e si riparte puliti.",
      "Chiedere a Claude, nella stessa sessione, di dimenticare il lavoro fatto sul piè di pagina.",
      "Copiare nel primo prompt tutta la conversazione di prima, per non perdere nessun dettaglio.",
    ],
    giusta: 0,
    spiegazione: "La regola pratica è «un lavoro, una sessione»: una sessione piena di cose vecchie lavora peggio, anche se a un certo punto Claude riassume da solo. Le regole del progetto non si perdono, perché il CLAUDE.md si carica a ogni sessione.",
    slide: "sessioni-lunghe",
  },

  // 6.4 I componenti
  {
    domanda: "Sul componente <code>PulsanteWhatsApp.astro</code> di Da Rina, quale affermazione è <strong>falsa</strong>?",
    opzioni: [
      "La parte in testa, tra le due righe di trattini, gira solo mentre si costruisce il sito.",
      "Le graffe inseriscono nell'HTML i valori calcolati nella parte in testa.",
      "Lo stile scritto nel componente vale solo per lui, non per il resto del sito.",
      "In una pagina si usa scrivendo <code>&lt;PulsanteWhatsApp /&gt;</code>, dopo averlo importato.",
      "Il JavaScript della parte in testa arriva al browser e gira quando il visitatore clicca.",
    ],
    giusta: 4,
    spiegazione: "La testa di un file <code>.astro</code> gira solo durante la build: nel sito finito non c'è. Le altre quattro affermazioni descrivono come funziona davvero un componente di Astro.",
    slide: "componenti-astro",
  },
  {
    domanda: "Avete chiesto a Claude cinque pagine per Da Rina. Funzionano, ma per cambiare il numero di telefono nel piè di pagina dovete modificare cinque file. Cosa chiedete a Claude?",
    opzioni: [
      "Di usare cerca e sostituisci su tutti i file ogni volta che il numero cambia: è la via più rapida.",
      "Di scrivere il piè di pagina nel CLAUDE.md, così lo ricopia sempre uguale in ogni pagina nuova.",
      "Di cercare il codice ripetuto e proporre componenti per riunirlo, senza cambiare l'aspetto.",
      "Di unire le cinque pagine in una sola pagina lunga, così il piè di pagina compare una volta sola.",
      "Di aggiungere React al progetto, perché in Astro un componente non si può usare in più pagine.",
    ],
    giusta: 2,
    spiegazione: "Se chiedete pagine, l'AI tende a copiare lo stesso codice in ognuna: il segnale è proprio una modifica che tocca cinque file. Si chiede di riunire il codice ripetuto in componenti, a parità di aspetto. Ricopiare meglio, unire le pagine o aggiungere un framework non risolvono la duplicazione.",
    slide: "componenti-non-pagine",
  },
  {
    domanda: "Per il menu a tendina del sito di Da Rina, Claude propone di aggiungere React al progetto. Cosa dice il corso?",
    opzioni: [
      "Chiedetevi se serve: per un menu a tendina basta Astro con un po' di JavaScript.",
      "Va bene: React è l'unico modo per avere in Astro un componente che reagisce ai clic.",
      "Non si può: Astro non accetta nella stessa pagina componenti di altri framework.",
      "Va bene, purché poi tutti i componenti del sito vengano riscritti in React, per coerenza.",
      "Va bene: Astro manda già tutto il JavaScript al browser, e React non pesa di più.",
    ],
    giusta: 0,
    spiegazione: "L'AI conosce molto bene React e tende a proporlo anche quando non serve: un framework in più è più codice da capire e da aggiornare. Astro può ospitarlo, ma per default manda al browser solo HTML e CSS e accende il JavaScript solo dove serve.",
    slide: "react-vue-svelte",
  },

  // 6.5 Una funzionalità alla volta
  {
    domanda: "Dividete in passi la storia «Come cliente voglio vedere il menu del giorno dal telefono». Un compagno propone come primo passo «il menu completo, funzionante», e non sapete dire come provarlo da solo. Cosa ne concludete?",
    opzioni: [
      "Va bene così, purché nel prompt per Claude ci siano criteri di accettazione molto dettagliati.",
      "Va bene se Claude lavora in plan mode, perché il piano scomporrà il passo al posto vostro.",
      "È troppo grande: un passo si fa in una sessione, si prova da solo e finisce con un commit.",
      "È troppo piccolo: un passo deve coprire una storia intera, dall'inizio alla fine.",
      "Il problema è la storia, non il passo: va riscritta in modo da provarla tutta insieme.",
    ],
    giusta: 2,
    spiegazione: "Se non riuscite a dire come provare un passo, è troppo grande. Una storia non è un compito: va divisa in passi piccoli, per esempio prima il componente Piatto, poi la pagina, poi le sezioni. Criteri più lunghi o un piano non sostituiscono questa scomposizione.",
    slide: "scomporre-funzionalita",
  },
  {
    domanda: "Alla fine del prompt avete scritto: «Per ogni criterio, dimmi come l'hai verificato». Per «sul telefono niente scorrimento orizzontale» Claude risponde: «dovrebbe funzionare». Cosa fate?",
    opzioni: [
      "Lo considerate verificato: se la build passa, la pagina funziona anche sul telefono.",
      "Gli chiedete di rispondere di nuovo, finché per quel criterio non scrive «verificato».",
      "Togliete il criterio: se Claude non sa verificarlo, vuol dire che non era un buon criterio.",
      "Fate il commit e lasciate quel controllo al compagno che rivedrà la pull request.",
      "Quel criterio lo controllate voi, a mano: aprite la pagina su uno schermo stretto.",
    ],
    giusta: 4,
    spiegazione: "«Dovrebbe funzionare» vuol dire che non l'ha provato: quel criterio va controllato a mano. La build non dice niente sullo scorrimento, e far ripetere la risposta a Claude o rimandare il controllo a dopo il commit non cambia le cose.",
    slide: "prompt-criteri",
  },
  {
    domanda: "Quale di queste modifiche alla pagina del menu di Da Rina <strong>non</strong> è un refactoring?",
    opzioni: [
      "Raccogliere i piatti in un elenco e mostrarli tutti con un ciclo e il componente Piatto.",
      "Dare nomi più chiari alle variabili, senza cambiare niente di quello che si vede.",
      "Spostare in un componente un blocco di codice ripetuto, lasciando la pagina identica.",
      "Aggiungere un filtro per i piatti vegetariani, scritto in modo semplice e ordinato.",
      "Dividere una pagina di 400 righe in componenti più piccoli, con lo stesso aspetto.",
    ],
    giusta: 3,
    spiegazione: "Un refactoring rende il codice più semplice e chiaro senza cambiare niente di quello che si vede. Il filtro è una funzionalità nuova: anche se scritta bene, cambia quello che fa la pagina. Per questo il prompt del refactoring dice «senza cambiare niente di quello che si vede».",
    slide: "demo-refactoring",
  },

  // 6.6 Pubblicare
  {
    domanda: "Avete rifatto il menu di Da Rina su un ramo, con una pull request aperta. Rina vuole vederlo prima che vada online. Cosa fate?",
    opzioni: [
      "Fate il merge su main: Rina lo guarda sul sito vero e, se non le piace, tornate indietro.",
      "Le mostrate l'anteprima del ramo; il sito vero cambia solo con il merge, dopo il suo sì.",
      "Le mandate il link a localhost:4321, così vede la versione che avete sul vostro computer.",
      "Le mostrate il ramo su GitHub: leggendo i file nuovi capisce com'è diventato il menu.",
      "Le mandate qualche foto dello schermo, perché le anteprime non si aprono dal telefono.",
    ],
    giusta: 1,
    spiegazione: "Ogni ramo e ogni pull request ricevono un indirizzo di prova: è il sito vero, non ancora pubblicato, e si apre anche dal telefono. Il merge si fa dopo il sì del cliente. Localhost esiste solo sul vostro computer, e fare il merge per far vedere vuol dire già pubblicare.",
    slide: "anteprima-ramo",
  },
  {
    domanda: "Un sito Astro statico, come quello di Da Rina, si può pubblicare quasi ovunque: Vercel, Netlify, GitHub Pages. Perché?",
    opzioni: [
      "Perché questi servizi fanno girare Astro a ogni visita, e Astro funziona su ogni server.",
      "Perché, finita la build, il sito è solo una cartella di file: HTML, CSS e JavaScript.",
      "Perché i browser leggono direttamente i file <code>.astro</code>: basta caricarli così come sono.",
      "Perché i tre servizi hanno gli stessi prezzi e le stesse condizioni, quindi uno vale l'altro.",
      "Perché la build la fa il browser di chi visita il sito, e il server non deve fare niente.",
    ],
    giusta: 1,
    spiegazione: "Dopo la build, un sito Astro statico è una cartella di file, che quasi ogni servizio sa pubblicare. Le differenze stanno nella comodità, come le anteprime o le parti dinamiche, e in prezzi e condizioni, che cambiano spesso e vanno confrontati prima.",
    slide: "netlify-pages",
  },

  // 6.7 Quando qualcosa si rompe
  {
    domanda: "La build di Da Rina si ferma con questo errore:<br><code>Rollup failed to resolve import \"../components/Piato.astro\" from \"src/pages/menu.astro\".</code><br>Cosa vi dice?",
    opzioni: [
      "Che dentro il componente Piatto c'è un errore di codice, e il componente va riscritto da capo.",
      "Che manca una libreria in <code>node_modules</code>, e basta lanciare di nuovo <code>npm install</code>.",
      "Che il problema è solo su Vercel: in locale la build funziona, e il messaggio si può ignorare.",
      "Che la pagina del menu è vuota, e per questo Astro non trova niente da costruire.",
      "Che la pagina del menu importa un file che non esiste: il nome è scritto male, Piato.",
    ],
    giusta: 4,
    spiegazione: "Il messaggio dice cosa è successo (la build si è fermata), cosa cercava (<code>../components/Piato.astro</code>) e dove (<code>menu.astro</code>). Il percorso è un vostro file, non una libreria: il nome è scritto male, Piato invece di Piatto.",
    slide: "leggere-errore",
  },
  {
    domanda: "Dopo aver aggiunto la pagina degli orari, <code>npm run build</code> si ferma con un errore. Quale messaggio a Claude segue meglio i consigli del corso?",
    opzioni: [
      "«La build si ferma con questo errore: [errore completo]. Prima funzionava; ho aggiunto solo la pagina degli orari. Spiegami la causa prima di correggere.»",
      "«La build si è rotta con un errore su un import, mi pare qualcosa come orari. Correggilo tu e poi fai subito il commit, così andiamo avanti con la pagina del menu.»",
      "«Il sito non funziona più dopo le ultime modifiche che abbiamo fatto oggi. Sistemalo come preferisci, anche riscrivendo le pagine che servono.»",
      "«Ecco l'errore: [errore completo]. Riscrivi da capo la pagina degli orari e il layout Base, così l'errore sparisce di sicuro e non ci pensiamo più.»",
      "«C'è un errore rosso nel terminale, non so bene dove. Prova a cambiare i file che vuoi finché la build non passa, e poi dimmi cosa hai fatto.»",
    ],
    giusta: 0,
    spiegazione: "Un buon rapporto d'errore dà l'errore esatto, copiato e non riassunto, cosa stavate facendo, cosa è cambiato, e chiede la causa prima della correzione. «Non va», un errore riassunto o «riscrivi tutto» spingono Claude a tentare a caso.",
    slide: "spiegarlo-claude",
  },
  {
    domanda: "Da tre giri Claude alterna due correzioni al CSS del menu: <code>grid</code>, poi <code>flex</code>, poi di nuovo <code>grid</code>. L'errore torna sempre. Cosa fate?",
    opzioni: [
      "Scrivete «riprova, con più attenzione»: dopo tanti tentativi Claude sa meglio cosa non va.",
      "Gli chiedete di riscrivere da capo tutto il CSS del sito, così il problema sparisce di sicuro.",
      "Passate alla modalità che salta tutti i controlli, così Claude prova più soluzioni in meno tempo.",
      "Lo fermate, tornate all'ultimo commit buono e ripartite in una sessione nuova, con un riassunto.",
      "Lo lasciate andare avanti da solo: prima o poi una delle correzioni sarà quella giusta.",
    ],
    giusta: 3,
    spiegazione: "La stessa correzione e lo stesso errore sono il segnale del ciclo: più si insiste, più il contesto si riempie di tentativi sbagliati, e le modifiche sempre più grandi sono un altro segnale. Si esce fermandosi, tornando a un punto pulito e ripartendo con un riassunto e un problema più stretto.",
    slide: "uscire-ciclo",
  },
  {
    domanda: "Claude scrive la configurazione di Astro. La build dice che un'opzione non è riconosciuta, e un avviso parla di una funzione «deprecated». Qual è la spiegazione più probabile?",
    opzioni: [
      "Il CLAUDE.md è così lungo che Claude non l'ha letto: va accorciato sotto le duecento righe.",
      "Node.js è troppo vecchio: va installata una versione più recente al posto della LTS.",
      "Claude conosce Astro com'era alla sua data di taglio: dategli la versione e la documentazione attuale.",
      "È un errore di Vercel, e in locale la build funzionerà comunque: l'avviso si può ignorare.",
      "Claude ha inventato quelle opzioni per mettere alla prova la build: basta chiedergli di toglierle tutte.",
    ],
    giusta: 2,
    spiegazione: "Il modello ha imparato le librerie com'erano alla sua data di taglio: se nel frattempo sono cambiate, scrive codice per una versione superata. Gli si dice quale versione si usa e gli si dà la documentazione aggiornata, per esempio con il server MCP di Astro.",
    slide: "versione-vecchia",
  },
];

export default quiz;
