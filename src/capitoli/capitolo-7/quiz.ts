// Quiz del capitolo 7: venti domande, cinque opzioni ciascuna.
// +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 se vuota.
// «giusta» è la posizione dell'opzione giusta: 0 = A … 4 = E.
// «slide» è il nome del file della slide da ripassare (senza .astro).
import type { Domanda } from "../../lib/quiz";

const quiz: Domanda[] = [
  // 7.1 UX e UI
  {
    domanda: "Quale di queste osservazioni sul sito della trattoria riguarda la UX e non la UI?",
    opzioni: [
      "Il pulsante «Prenota» è di un arancione troppo acceso rispetto al resto della pagina.",
      "Il carattere dei titoli è troppo sottile e stona con quello del testo.",
      "Le foto dei piatti hanno colori freddi, che non si accordano con lo sfondo crema.",
      "Dal telefono, per prenotare, ci si perde a metà e non si capisce cosa succede.",
      "Tra un piatto e l'altro del menu c'è troppo poco spazio vuoto, e sembra tutto attaccato.",
    ],
    giusta: 3,
    spiegazione: "La UX riguarda com'è vissuto il prodotto: se si riesce a prenotare dal telefono e si capisce cosa succede dopo il clic. Colori, caratteri, foto e spazi sono la UI, cioè come appare. Le due cose vanno insieme, ma si parte dalla UX.",
    slide: "ux-ui-diversi",
  },
  {
    domanda: "Rina vuole che nella home «si veda tutto»: nome, orari, indirizzo, telefono e pulsante, tutti grandi e in grassetto. Cosa le rispondete, secondo la slide sulla gerarchia?",
    opzioni: [
      "Che se tutto è grande niente è importante: deve vincere una cosa, qui il nome e il pulsante.",
      "Che va bene, purché ogni elemento abbia un colore diverso, così si distinguono tra loro.",
      "Che va bene sul computer, ma sul telefono conviene rimpicciolire tutto allo stesso modo.",
      "Che conviene scrivere tutto in maiuscolo invece che in grassetto, così si legge meglio.",
      "Che conviene ingrandire tutto ancora, perché dal telefono i testi sembrano sempre piccoli.",
    ],
    giusta: 0,
    spiegazione: "La gerarchia decide cosa si legge per primo, con dimensione, peso, colore e posizione. Se tutto è grande e in grassetto, niente spicca; dare a ogni cosa un colore diverso ripete lo stesso errore con il colore.",
    slide: "gerarchia",
  },
  {
    domanda: "Nel menu della trattoria nomi dei piatti e descrizioni sono tutti alla stessa distanza, e non si capisce quale descrizione va con quale piatto. Cosa lo risolve, secondo la slide?",
    opzioni: [
      "Togliere le descrizioni dei piatti: sul telefono occupano spazio e nessuno le legge.",
      "Dare a ogni piatto un colore diverso, così la sua descrizione si riconosce dal colore.",
      "Stringere ancora le righe: lo spazio vuoto è spazio sprecato, soprattutto sul telefono.",
      "Allineare tutto il menu al centro della pagina, così sembra più ordinato e si legge meglio.",
      "Avvicinare ogni descrizione al suo piatto e lasciare più spazio tra un piatto e l'altro.",
    ],
    giusta: 4,
    spiegazione: "Lo spazio vuoto raggruppa le cose che stanno insieme e separa quelle diverse: nella slide il testo resta identico, ma con le distanze giuste si vede che i piatti sono tre e ogni descrizione ha il suo. Un colore per piatto confonde, e togliere spazio peggiora.",
    slide: "spazio",
  },
  // 7.2 Gli stati dell'interfaccia
  {
    domanda: "Una docente cerca in PrenotaAula un'aula libera per giovedì, ma sono già tutte prenotate. Quale stato deve mostrare la pagina?",
    opzioni: [
      "Errore: qualcosa è andato storto, e bisogna spiegare cosa fare adesso.",
      "Non consentito: non può prenotare, e bisogna dirle a chi chiedere.",
      "Vuoto: non c'è niente da mostrare, e bisogna dirlo chiaramente.",
      "Caricamento: la richiesta sta ancora viaggiando, e la pagina aspetta.",
      "Iniziale: la pagina torna com'era, pronta per una nuova ricerca.",
    ],
    giusta: 2,
    spiegazione: "Nessuna aula libera non è un errore: la ricerca ha funzionato, semplicemente non c'è niente da mostrare, ed è lo stato vuoto. L'errore è quando qualcosa va storto, per esempio l'aula è già occupata al momento di prenotarla; il non consentito è quando manca il permesso.",
    slide: "sei-stati",
  },
  {
    domanda: "Su PrenotaAula alcuni docenti si ritrovano con due prenotazioni identiche. Qual è la causa più probabile, secondo la slide, e la correzione?",
    opzioni: [
      "Supabase salva ogni prenotazione due volte: va cambiata un'impostazione del database.",
      "Dopo il clic non vedevano niente e hanno ricliccato: il pulsante si deve disattivare.",
      "La connessione lenta duplica le richieste: serve un servizio di hosting più veloce.",
      "Gli utenti sono distratti: basta scrivere sotto il pulsante «non cliccate due volte».",
      "Il browser ripete il clic se la pagina è lenta: va consigliato un browser diverso.",
    ],
    giusta: 1,
    spiegazione: "Se dopo il clic non succede niente di visibile, chi usa il sito clicca di nuovo e prenota due volte. La correzione è nell'interfaccia: il pulsante si disattiva e cambia testo («Prenoto…») mentre la richiesta viaggia. Un avviso scritto non basta, e il database o il browser non c'entrano.",
    slide: "riscontro-clic",
  },
  {
    domanda: "Chiedete a Claude «la pagina per prenotare un'aula». Cosa vi dovete aspettare, secondo la slide, e come lo controllate?",
    opzioni: [
      "Tutti gli stati, perché Claude li conosce bene: basta rileggerli nel codice per controllarli.",
      "Solo il caso felice, e va bene così: gli altri stati li gestiscono da soli browser e Supabase.",
      "Tutti gli stati, purché nel prompt scriviate «fai una pagina completa e professionale».",
      "Solo lo stato iniziale: per il caricamento e per gli errori serve una libreria esterna.",
      "Quasi solo il caso felice: chiedete gli stati per nome e provate i casi brutti, senza wi-fi.",
    ],
    giusta: 4,
    spiegazione: "Senza indicazioni l'AI disegna la pagina quando tutto va bene. Gli stati si chiedono uno per uno, con i loro testi, e si controllano provando davvero i casi brutti: wi-fi staccato, doppia prenotazione, utente senza permessi. Rileggere il codice o chiedere una pagina «completa» non basta.",
    slide: "caso-felice",
  },
  // 7.3 Il design system
  {
    domanda: "Nel CSS della trattoria il colore dell'accento è scritto a mano, con il suo codice, in quaranta punti diversi. Rina vuole cambiarlo. Cosa avrebbe evitato il problema?",
    opzioni: [
      "Una variabile CSS, come <code>--accento</code>, definita in un punto e usata ovunque per nome.",
      "Usare il nome inglese del colore, come <code>red</code>, che è più facile da cercare e sostituire.",
      "Scrivere il codice del colore in un commento in cima al file, come promemoria per chi lo cambia.",
      "Chiedere a Claude di evitare i colori accesi, così non c'è un accento da cambiare.",
      "Mettere il CSS di ogni pagina in un file separato, così ogni modifica resta piccola.",
    ],
    giusta: 0,
    spiegazione: "Con una variabile CSS il colore ha un nome ed è definito in un punto solo: tutto il sito usa il nome, e per cambiarlo basta una riga. Un file per pagina moltiplica i punti da toccare, e un commento non cambia niente.",
    slide: "variabili-css",
  },
  {
    domanda: "Serve un pulsante «Vedi il menu», meno evidente di «Prenota». Cosa si fa, secondo la slide?",
    opzioni: [
      "Si copia il pulsante «Prenota» e gli si cambia il colore a mano, solo in quella pagina.",
      "Si crea un componente nuovo, <code>PulsanteMenu</code>, con il suo CSS e i suoi colori.",
      "Si usa un link normale, senza componente, così il design system resta com'è.",
      "Si aggiunge al componente <code>Pulsante</code> una variante con un nome, come «secondario».",
      "Si lascia scegliere a Claude il colore più adatto a quella pagina, caso per caso.",
    ],
    giusta: 3,
    spiegazione: "Il componente è il design system in pratica: un pulsante scritto una volta, con le sue varianti. Serve un aspetto diverso? Si aggiunge una variante con un nome. Copiare il pulsante o crearne uno nuovo fa nascere tanti pulsanti quasi uguali, e la coerenza si perde.",
    slide: "design-system-componenti",
  },
  {
    domanda: "A ogni pagina nuova Claude inventa colori, spaziature e pulsanti diversi. Quale regola conviene scrivere nel CLAUDE.md, secondo la slide?",
    opzioni: [
      "«Scegli per ogni pagina i colori e gli spazi più adatti al contenuto, purché restino armoniosi.»",
      "«Prima di scrivere una pagina, guarda quelle già fatte e cerca di fare qualcosa di simile.»",
      "«Non scrivere colori, caratteri o spazi a mano: usa le variabili e i componenti che ci sono.»",
      "«Alla fine di ogni pagina controlla che i colori somiglino agli altri, e correggi a occhio.»",
      "«Prima di ogni pagina nuova chiedimi quali colori, caratteri e spazi voglio usare stavolta.»",
    ],
    giusta: 2,
    spiegazione: "Se il design system sta solo nella vostra testa, l'AI ne inventa uno a ogni pagina. La regola più utile vieta i valori scritti a mano e rimanda a variabili e componenti esistenti; se ne serve uno nuovo, Claude lo chiede. Scegliere, somigliare o decidere ogni volta riporta le scelte pagina per pagina.",
    slide: "design-system-claude-md",
  },
  {
    domanda: "Secondo la slide, qual è il prezzo di partire da Tailwind e shadcn/ui senza personalizzarli?",
    opzioni: [
      "Si parte più lentamente, perché i componenti vanno costruiti e provati da zero.",
      "Il sito somiglia a tutti quelli che li usano, e ci sono dipendenze in più da seguire.",
      "I componenti non sono accessibili, e vanno rifatti prima di pubblicare il sito.",
      "L'AI li conosce poco, e sbaglia spesso quando deve usarli in un progetto vero.",
      "Tailwind obbliga a scrivere tutto il CSS a mano, in un file separato dall'HTML.",
    ],
    giusta: 1,
    spiegazione: "Le librerie fanno partire subito, con componenti accessibili e provati, e l'AI le conosce benissimo. Il prezzo è che, senza personalizzarle, i siti si somigliano, e sono dipendenze in più da capire e aggiornare. Tailwind, anzi, evita di scrivere CSS: si mettono classi pronte nell'HTML.",
    slide: "librerie-componenti",
  },
  {
    domanda: "Il sito usa design token a tre livelli: valore, significato, componente. Rina vuole che tutte le azioni passino dall'arancio al rosso mattone. Cosa si cambia?",
    opzioni: [
      "Uno per uno i token del livello componente, perché è lì che si decide dove va il colore.",
      "Tutti e tre i livelli, perché ogni cambio di colore deve scendere dal valore al componente.",
      "Il CSS di ogni componente, perché i token valgono solo nei file di design, non nel codice.",
      "Il nome di ogni componente, che deve dire il colore che usa: <code>pulsante-rosso</code>.",
      "Una riga sola: il token di significato <code>accento</code>, che punterà al nuovo colore.",
    ],
    giusta: 4,
    spiegazione: "Con tre livelli, i componenti dicono dove si usa un colore e il significato dice a cosa serve: per cambiare l'accento si tocca una riga sola, e i componenti restano uguali. Un token vale ovunque, nel CSS come nel file di design, e un nome che dice il colore invece del compito si rompe al primo cambio.",
    slide: "design-token",
  },
  // 7.4 Il design con l'AI
  {
    domanda: "Perché, senza indicazioni, i siti fatti con l'AI si somigliano tutti?",
    opzioni: [
      "Perché i fornitori dei modelli impongono uno stile di marca a tutto quello che generano.",
      "Perché il modello sceglie la risposta più probabile: colori, caratteri e schemi visti più spesso.",
      "Perché il CSS permette pochi stili diversi, e i modelli li usano tutti allo stesso modo.",
      "Perché l'AI parte sempre da Tailwind e shadcn/ui, che hanno un solo tema possibile.",
      "Perché i modelli sono addestrati su un unico sito di esempio, che poi ripetono ogni volta.",
    ],
    giusta: 1,
    spiegazione: "Senza indicazioni il modello fa la scelta più probabile (1.2): la sfumatura viola, il titolo centrato, le tre schede con un'icona. Non c'è uno stile imposto né un unico sito da copiare: c'è quello che il modello ha visto più spesso.",
    slide: "siti-si-somigliano",
  },
  {
    domanda: "Quale di queste mosse, secondo la slide, <strong>non</strong> aiuta a dare un'identità al sito della trattoria?",
    opzioni: [
      "Indicare a Claude due o tre siti di riferimento, e cosa piace di ciascuno.",
      "Dargli le foto del locale, il logo, il menu cartaceo e l'insegna.",
      "Ricavare tre o quattro colori dalle tovaglie, dai muri, dal legno.",
      "Descrivere lo stile con tre aggettivi ben scelti: «moderno, elegante, caldo».",
      "Scrivere i divieti: niente gradienti, niente emoji, niente testi inventati.",
    ],
    giusta: 3,
    spiegazione: "Un'identità non si descrive con aggettivi: si mostra e si delimita, con riferimenti, materiale vero, una palette e i divieti. «Moderno ed elegante» va bene per qualsiasi sito, ed è proprio la strada che porta alla pagina anonima.",
    slide: "dare-identita",
  },
  {
    domanda: "Claude, collegato a un browser, apre la pagina della trattoria, la prova a larghezze diverse e corregge. Cosa resta comunque a voi, secondo la slide?",
    opzioni: [
      "Il giudizio sul gusto e sul cliente: se la pagina «sa di trattoria».",
      "Accorgervi di un pulsante fuori posto, perché Claude non vede la pagina.",
      "Controllare le larghezze diverse, perché Claude prova solo quella del computer.",
      "Niente: con il browser collegato Claude vede tutto quello che vedreste voi.",
      "Scrivere le correzioni, perché dal browser Claude può solo segnalare i problemi.",
    ],
    giusta: 0,
    spiegazione: "Se gli fate vedere la pagina, con uno screenshot o un browser collegato, Claude trova da solo molti errori, anche a larghezze diverse. Quello che non sa giudicare è il gusto: se la pagina sa di trattoria e va bene per quel cliente. Quel giudizio resta vostro.",
    slide: "claude-guarda",
  },
  // 7.5 Responsive
  {
    domanda: "Quasi tutti i clienti della trattoria arriveranno dal telefono. Cosa conviene scrivere nel prompt quando chiedete a Claude la home?",
    opzioni: [
      "«Fai la versione per il computer: sul telefono il browser la rimpicciolisce da solo.»",
      "«Progetta per il computer, poi sul telefono nascondi quello che non ci sta.»",
      "«Progetta prima per il telefono, a 375 pixel di larghezza; poi adatta al computer.»",
      "«Fai due siti separati, uno per il telefono e uno per il computer, con due indirizzi.»",
      "«Usa misure fisse in pixel, così la pagina ha la stessa forma su ogni schermo.»",
    ],
    giusta: 2,
    spiegazione: "Si progetta prima lo schermo stretto e poi si allarga: quello che sta bene in largo, sul telefono va schiacciato. Se non lo dite all'inizio, Claude disegna per lo schermo grande e il telefono diventa un ripensamento. Le misure fisse sono il contrario di una pagina che si adatta.",
    slide: "prima-telefono",
  },
  {
    domanda: "Volete che orari e mappa stiano uno sotto l'altro sul telefono e affiancati dai 900 pixel in su. Quale strumento del CSS chiedete a Claude, per nome?",
    opzioni: [
      "Una misura fluida, in percentuale, che si allarga e si stringe da sola.",
      "Una griglia che va a capo, con tante colonne quante ne stanno nello schermo.",
      "Una variabile CSS, che cambia valore da sola quando lo schermo si allarga.",
      "La modalità dispositivo del browser, che sceglie la larghezza giusta.",
      "Una media query: regole che valgono solo sopra o sotto una certa larghezza.",
    ],
    giusta: 4,
    spiegazione: "Una regola che vale solo da una certa larghezza in su è una media query: è proprio l'esempio della slide, con orari e mappa affiancati dai 900 pixel. Misure fluide e griglie che vanno a capo si adattano da sole, senza una soglia precisa; la modalità dispositivo serve a provare la pagina, non a scriverla.",
    slide: "pagina-si-adatta",
  },
  // 7.6 Accessibilità
  {
    domanda: "Quale di queste affermazioni sulle basi dell'accessibilità è <strong>falsa</strong>?",
    opzioni: [
      "Il contrasto conta soprattutto per i titoli: il testo normale può essere più chiaro, se è leggibile.",
      "Ogni immagine che dice qualcosa ha bisogno di un testo alternativo che la descriva.",
      "Con il solo tasto Tab si deve arrivare a ogni link e pulsante, vedendo sempre dove si è.",
      "Un titolo principale per pagina, poi i sottotitoli in ordine: il lettore di schermo li usa come indice.",
      "Ogni campo di un modulo deve dire cosa chiede, anche quando ci si è già dentro.",
    ],
    giusta: 0,
    spiegazione: "È il contrario: il testo normale chiede più contrasto di quello grande, almeno 4,5 a 1 contro 3 a 1. Le altre sono regole della slide: testi alternativi, tastiera, titoli in ordine, etichette nei moduli.",
    slide: "basi-accessibilita",
  },
  {
    domanda: "Lighthouse non segnala nessun problema di accessibilità sul sito della trattoria. Cosa fate ancora, secondo la slide?",
    opzioni: [
      "Niente: Lighthouse controlla tutte le regole WCAG, quindi il sito è già accessibile.",
      "Rifate il controllo di Lighthouse con un altro browser, per avere una conferma.",
      "Chiedete a Claude di confermare il risultato, così i controlli automatici sono due.",
      "Lo usate a mano: provate a prenotare solo con la tastiera, e con il testo al 200%.",
      "Alzate ancora un po' il contrasto di tutti i colori, per tenervi un margine.",
    ],
    giusta: 3,
    spiegazione: "Gli strumenti automatici trovano solo una parte dei problemi. Il resto si trova usando il sito in modo diverso dal solito: solo tastiera, testo ingrandito, magari due minuti con un lettore di schermo. Ripetere un controllo automatico, o farlo confermare, non aggiunge quello che manca.",
    slide: "come-si-prova",
  },
  {
    domanda: "Chiedete a Claude di controllare l'accessibilità del codice della home. Quale di questi problemi, secondo la slide, rischia di sfuggirgli?",
    opzioni: [
      "Un'immagine del pergolato senza testo alternativo.",
      "Un campo del modulo di prenotazione senza etichetta.",
      "Un testo alternativo che c'è, ma non dice niente di utile.",
      "Un titolo di terzo livello subito dopo quello principale.",
      "Un pulsante che non si raggiunge con la tastiera.",
    ],
    giusta: 2,
    spiegazione: "Leggendo il codice Claude trova bene ciò che manca o è fuori regola: testi alternativi assenti, etichette mancanti, titoli fuori ordine, pulsanti irraggiungibili. Non sa dire se un testo alternativo è davvero utile, né se la pagina si capisce ascoltata: lì serve una persona.",
    slide: "claude-accessibilita",
  },
  {
    domanda: "La trattoria Da Rina è una microimpresa, con un sito di menu e orari. Cosa dice la slide sull'obbligo di renderlo accessibile?",
    opzioni: [
      "È obbligata: dal 2025 l'European Accessibility Act vale per tutti i siti italiani.",
      "Probabilmente non è obbligata, ma conviene: è meglio per tutti e costa poco dall'inizio.",
      "È obbligata, perché la legge Stanca vale per ogni azienda che ha un sito internet.",
      "Non è obbligata, e conviene evitarlo: l'accessibilità costa molto e rallenta il sito.",
      "Non è obbligata: l'obbligo vale solo per le aziende sopra i 500 milioni di fatturato.",
    ],
    giusta: 1,
    spiegazione: "L'obbligo dipende dal cliente e da cosa offre il sito: pubbliche amministrazioni, grandi aziende, servizi ai consumatori come commercio online e banche. Una microimpresa con menu e orari probabilmente è fuori, ma un sito accessibile è migliore per tutti, e farlo dall'inizio costa poco.",
    slide: "legge-accessibilita",
  },
];

export default quiz;
