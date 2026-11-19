// Quiz del capitolo 4: venti domande, cinque opzioni ciascuna.
// +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 se vuota.
// «giusta» è la posizione dell'opzione giusta: 0 = A … 4 = E.
// «slide» è il nome del file della slide da ripassare (senza .astro).
import type { Domanda } from "../../lib/quiz";

const quiz: Domanda[] = [
  // 4.1 Perché serve
  {
    domanda: "Siete in treno, senza internet, e lavorate al sito di Da Rina. Cosa potete fare con Git?",
    opzioni: [
      "Niente: la storia del progetto sta su GitHub, e senza connessione non si salva",
      "Solo modificare i file: i commit si fanno soltanto quando GitHub è raggiungibile",
      "Fare commit e guardare la storia: Git lavora sul computer, anche senza internet",
      "Fare commit, ma <code>git log</code> vi mostrerà la storia solo quando tornerete online",
      "Usare Git solo se avete GitHub Desktop, che tiene una copia del progetto sul computer",
    ],
    giusta: 2,
    spiegazione: "Git è un programma sul vostro computer: salva la storia nella cartella <code>.git</code> e funziona anche senza internet. GitHub è il servizio online che ne conserva una copia: serve per condividere, non per fare commit o leggere la storia.",
    slide: "git-non-github",
  },
  {
    domanda: "Perché, secondo il corso, Git serve ancora di più quando lavorate con un agente come Claude Code?",
    opzioni: [
      "Perché un agente tocca decine di file in un minuto: Git mostra quali e vi fa tornare indietro",
      "Perché senza Git l'agente non riesce a salvare sul vostro computer i file che modifica per voi",
      "Perché Git controlla il codice scritto dall'agente e blocca da solo le modifiche che contengono errori",
      "Perché Git impedisce all'agente di cancellare o spostare i file che non gli avete chiesto di toccare",
      "Perché con Git l'agente può pubblicare il sito da solo, senza aspettare la vostra revisione",
    ],
    giusta: 0,
    spiegazione: "Potete lasciar lavorare un agente proprio perché sapete tornare indietro: un commit prima, il diff dopo, e decidete voi. Git non giudica se il codice è giusto e non blocca niente: registra, mostra e permette di annullare.",
    slide: "agente-serve-ancora",
  },
  // 4.2 Il terminale
  {
    domanda: "Aprite il terminale e lanciate <code>git status</code>. Git risponde che qui non c'è nessun repository, ma ieri avete fatto <code>git init</code> nella cartella <code>sito-rina</code>. Cosa fate per prima cosa?",
    opzioni: [
      "<code>git init</code> di nuovo: il repository di ieri si è perso e va ricreato",
      "<code>git log</code>, per controllare se i commit di ieri sono ancora nella storia",
      "Chiudete e riaprite il terminale: ha perso il collegamento con Git",
      "<code>pwd</code>, per vedere in che cartella siete: ogni comando lavora lì",
      "<code>git clone</code> del progetto, per riportare il repository nel terminale",
    ],
    giusta: 3,
    spiegazione: "Ogni comando lavora nella cartella in cui siete, e probabilmente il terminale si è aperto altrove. Con <code>pwd</code> lo scoprite, poi entrate con <code>cd sito-rina</code>. Un nuovo <code>git init</code> nella cartella sbagliata creerebbe un secondo repository, vuoto.",
    slide: "tre-comandi-orientarsi",
  },
  // 4.3 Git sul vostro computer
  {
    domanda: "Avete modificato <code>index.astro</code> e <code>menu.astro</code>. Lanciate <code>git add index.astro</code> e poi <code>git commit</code>. Cosa succede alla modifica di <code>menu.astro</code>?",
    opzioni: [
      "Entra nel commit anche lei: un commit fotografa sempre tutti i file cambiati",
      "Resta nella cartella, non salvata: non è passata dall'area di preparazione",
      "Va persa: al momento del commit Git scarta tutte le modifiche non preparate",
      "Entra nel commit, ma resta fuori dal push finché non fate anche <code>git add</code>",
      "Git la sposta in un ramo nuovo, per non mescolarla al commit appena fatto",
    ],
    giusta: 1,
    spiegazione: "Il commit prende solo quello che è nell'area di preparazione, cioè quello che avete scelto con <code>git add</code>. La modifica a <code>menu.astro</code> resta nella cartella, intatta, pronta per un prossimo commit.",
    slide: "tre-posti-git",
  },
  {
    domanda: "Ieri avete fatto un commit con un numero di telefono sbagliato, e quel commit è già su GitHub. Qual è il modo sicuro per annullarlo?",
    opzioni: [
      "<code>git restore</code> del file, che lo riporta a com'era prima di quel commit",
      "<code>git reset --hard</code> al commit precedente, e poi un nuovo push verso GitHub",
      "Cancellare il commit da GitHub, poi <code>git pull</code> per allineare il computer",
      "Correggere il numero a mano e fare <code>git push --force</code> per sostituire la storia",
      "<code>git revert</code> con il codice del commit: ne crea uno nuovo che fa il contrario",
    ],
    giusta: 4,
    spiegazione: "<code>git revert</code> non cancella niente: aggiunge un commit che annulla quello sbagliato, e la storia resta intera anche su GitHub. <code>git restore</code> serve per le modifiche non ancora salvate; <code>reset --hard</code> e <code>push --force</code> riscrivono una storia che altri hanno già.",
    slide: "tornare-indietro-git",
  },
  {
    domanda: "Il repository di PrenotaAula è su GitHub, aggiornato. Quale di queste cose <strong>non</strong> potreste recuperare da lì?",
    opzioni: [
      "Le prenotazioni fatte dai docenti, salvate nel database dell'app",
      "Le immagini delle aule che stanno nella cartella del progetto",
      "La versione dell'app di tre settimane fa, prima del filtro per data",
      "Un file del progetto cancellato per sbaglio qualche commit fa",
      "Chi ha cambiato la pagina delle aule, quando e con quale motivo",
    ],
    giusta: 0,
    spiegazione: "Git salva i file del progetto e la loro storia, comprese le immagini nella cartella. Il database con le prenotazioni, gli account, le chiavi nel <code>.env</code> e le impostazioni dei servizi non sono nel repository: il loro backup è un lavoro a parte.",
    slide: "git-non-backup",
  },
  {
    domanda: "Su un ramo solo vostro, mai mandato su GitHub, lanciate <code>git reset --hard a1b2c3d</code>. Subito dopo vi accorgete che il commit successivo, <code>e4f91a2</code>, vi serviva. Cosa fate?",
    opzioni: [
      "<code>git log</code>: la storia del ramo mostra ancora <code>e4f91a2</code>, basta tornarci",
      "<code>git pull</code>: GitHub conserva una copia di tutti i commit del vostro ramo",
      "<code>git revert a1b2c3d</code>: annulla il reset e rimette i commit che ha tolto",
      "Niente: <code>reset --hard</code> cancella i commit tolti in modo definitivo",
      "<code>git reflog</code> per ritrovare il commit, poi un ramo nuovo che parte da lì",
    ],
    giusta: 4,
    spiegazione: "Git tiene sul computer un diario di dove siete stati, il reflog: lì ritrovate <code>e4f91a2</code> e lo recuperate con <code>git switch -c recupero e4f91a2</code>. <code>git log</code> mostra solo i commit ancora nel ramo, e su GitHub il ramo non c'è mai stato.",
    slide: "ritrovare-commit-perso",
  },
  // 4.4 Rami
  {
    domanda: "Nel file della home di Da Rina, Anna cambia la riga degli orari nel suo ramo; Luca, nel suo, cambia la riga del telefono. Cosa succede quando tutti e due i rami vengono uniti a main?",
    opzioni: [
      "Un conflitto: hanno toccato lo stesso file, e Git chiede di scegliere",
      "Vince il ramo unito per ultimo, che sovrascrive la modifica dell'altro",
      "Git unisce da solo le due modifiche, perché sono su righe diverse",
      "Git rifiuta il secondo merge finché uno dei due non annulla la sua modifica",
      "Un conflitto, ma solo se i due commit sono stati fatti nello stesso giorno",
    ],
    giusta: 2,
    spiegazione: "Il conflitto nasce solo quando due rami cambiano la stessa riga. Su righe diverse, anche nello stesso file, Git unisce da solo. E un conflitto non è un errore: è Git che chiede a voi di decidere.",
    slide: "conflitti-stessa-riga",
  },
  {
    domanda: "Durante un merge, il file degli orari contiene due versioni separate da <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> e <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Volete l'aiuto di Claude. Quale richiesta segue il metodo del corso?",
    opzioni: [
      "«Risolvi il conflitto tenendo la versione più recente delle due, poi fai il commit.»",
      "«Tieni la versione di main, che è quella buona, togli i segni e chiudi il merge.»",
      "«Annulla il merge e rifai su main, a mano, le modifiche di tutti e due i rami.»",
      "«Spiegami cosa voleva fare ogni ramo e proponi una soluzione, senza applicarla.»",
      "«Togli i segni lasciando nel file tutte e due le righe, così non si perde niente.»",
    ],
    giusta: 3,
    spiegazione: "Prima si capisce, poi si risolve: Claude spiega le due intenzioni e propone, voi decidete. L'AI tende a tenere una versione e buttare l'altra, quindi controllate che non si perda niente; «la più recente» o «quella di main» non sono per forza quelle giuste.",
    slide: "risolvere-conflitto",
  },
  // 4.5 GitHub
  {
    domanda: "Anna ha fatto tre commit sul suo computer, ma nel repository su GitHub non li vede. Qual è il motivo più probabile?",
    opzioni: [
      "Non ha fatto <code>git pull</code>, il comando che manda i commit dal computer a GitHub",
      "Non ha fatto <code>git push</code>: i commit restano sul computer finché non li manda",
      "Non ha fatto <code>git add</code>, che serve a caricare online i commit già fatti",
      "GitHub mostra i commit di un ramo solo dopo che la sua pull request è stata unita",
      "I commit arrivano su GitHub da soli, ma ci mettono qualche ora a comparire",
    ],
    giusta: 1,
    spiegazione: "Il commit salva sul computer; il push lo manda su GitHub. Pull fa il contrario: scarica i commit degli altri. <code>git add</code> prepara il commit, non lo carica da nessuna parte.",
    slide: "computer-github",
  },
  {
    domanda: "Luca apre una issue che dice solo «Il calendario non va» e chiede a Claude Code di lavorarci. Qual è il problema principale?",
    opzioni: [
      "Manca un'etichetta di priorità: senza, Claude Code la mette in fondo alla lista",
      "Non è assegnata ad Anna, che nella squadra si occupa delle pagine dei docenti",
      "È troppo corta: per essere letta da un agente, una issue deve occupare una pagina",
      "Mancano cosa succede, cosa si vuole e quando è fatta: l'agente deve indovinare",
      "Le issue servono alle persone: a Claude Code le richieste vanno scritte in chat",
    ],
    giusta: 3,
    spiegazione: "Una buona issue ha gli stessi ingredienti di un buon prompt: contesto, obiettivo, criteri di accettazione. «Il calendario non va» non dice quale calendario, cosa succede e cosa dovrebbe succedere: chi la legge, persona o agente, deve indovinare. E a Claude Code si può dire proprio «lavora alla issue #12».",
    slide: "issue-github",
  },
  // 4.6 In squadra
  {
    domanda: "Vi accorgete di aver modificato tre file direttamente su <code>main</code>, senza fare commit. Come spostate il lavoro in un ramo senza perderlo?",
    opzioni: [
      "<code>git switch -c nome-ramo</code>: il ramo nasce e le modifiche non salvate vengono con voi",
      "<code>git restore</code> dei tre file, poi un ramo nuovo con <code>git switch -c</code> e rifate tutto lì",
      "<code>git switch nome-ramo</code>, senza <code>-c</code>: crea il ramo e ci porta le modifiche",
      "Un commit su main, poi <code>git revert</code>: il revert sposta quel lavoro in un ramo a parte",
      "<code>git reset --hard</code> su main, poi <code>git switch -c nome-ramo</code> per ripartire puliti",
    ],
    giusta: 0,
    spiegazione: "<code>git switch -c</code> crea il ramo e ci entra, e le modifiche non ancora salvate vi seguono: poi fate il commit lì. Senza <code>-c</code> si passa solo a un ramo che esiste già; <code>restore</code> e <code>reset --hard</code> buttano proprio il lavoro che volevate tenere.",
    slide: "qualcosa-va-storto",
  },
  {
    domanda: "Anna apre la pull request del filtro per data. Il repository di PrenotaAula è collegato a Vercel. Quando cambia il sito vero, quello che usano i docenti?",
    opzioni: [
      "Subito: Vercel pubblica in produzione ogni push, su qualsiasi ramo del repository",
      "Appena la docente approva la revisione nella pull request, anche prima del merge",
      "Dopo il merge su main: prima c'è solo un'anteprima, con un indirizzo di prova",
      "Quando Anna carica a mano su Vercel i file prodotti dalla build del suo ramo",
      "Solo quando qualcuno crea un tag di release sul ramo, per esempio <code>v1.1</code>",
    ],
    giusta: 2,
    spiegazione: "Per ogni pull request Vercel prepara un'anteprima, un indirizzo di prova solo per quella modifica. Il sito vero si aggiorna dopo il merge su main. Approvare non basta: è il merge che porta la modifica dentro main.",
    slide: "merge-sito-aggiorna",
  },
  {
    domanda: "Nel repository c'è il file <code>.github/workflows/controlli.yml</code>, con <code>on: [pull_request]</code> e, tra i passi, <code>npm ci</code> e <code>npm run build</code>. Cosa fa?",
    opzioni: [
      "A ogni pull request, GitHub fa la build e pubblica il sito online al posto di Vercel",
      "A ogni pull request, GitHub installa le dipendenze e prova a fare la build, da solo",
      "A ogni pull request, GitHub fa la build e, se riesce, unisce da solo il ramo a main",
      "A ogni push su main, GitHub rifà la build per controllare il sito già pubblicato",
      "Prima di aprire la pull request, fa partire la build sul computer di chi la apre",
    ],
    giusta: 1,
    spiegazione: "Una GitHub Action è un piccolo programma che GitHub fa girare da solo: questa parte a ogni pull request e controlla che la build riesca. Non pubblica il sito e non fa il merge: quello lo decide una persona.",
    slide: "github-actions",
  },
  // 4.7 Git e l'AI
  {
    domanda: "Avete modificato a mano tre pagine del sito di Da Rina, senza fare commit. Poi chiedete a Claude Code di riorganizzare tutte le pagine, e il risultato non vi piace. Che problema avete, con Git?",
    opzioni: [
      "Nessuno: <code>git restore</code> annulla le modifiche dell'agente e lascia stare le vostre",
      "Nessuno: Git fa da solo un commit prima di ogni lavoro dell'agente, e si torna lì",
      "Nessuno: <code>git revert</code> dell'ultimo commit toglie tutto il lavoro fatto dall'agente",
      "Le modifiche dell'agente sono già su GitHub, e da lì non si possono più annullare",
      "Le vostre modifiche e quelle dell'agente sono mescolate: tornando indietro le perdete tutte",
    ],
    giusta: 4,
    spiegazione: "Prima di un lavoro grosso il progetto deve essere pulito, tutto salvato in un commit. Git non sa quali righe avete scritto voi e quali l'agente: <code>restore</code> riporta all'ultimo commit e le butta tutte, e <code>revert</code> annulla un commit vecchio, non il lavoro appena fatto.",
    slide: "rete-sicurezza-agente",
  },
  {
    domanda: "Chiedete a Claude Code di aggiungere i piatti del giorno alla pagina del menu. Il diff mostra i file del menu cambiati, ma anche 57 righe tolte da <code>style.css</code>. Cosa fate?",
    opzioni: [
      "Niente: se nel browser il sito si vede bene, quelle righe non servivano",
      "Accettate: con un agente è normale che una richiesta piccola tocchi molti file",
      "Fate commit e push: il controllo vero lo farà la code review su GitHub",
      "Vi fermate: righe tolte che non avevate chiesto vanno capite prima di approvare",
      "Approvate, e chiedete a Claude di non toccare più il CSS nelle prossime richieste",
    ],
    giusta: 3,
    spiegazione: "Non serve capire ogni riga del diff: serve accorgersi di quello che non vi aspettavate. Righe tolte senza motivo, file che non c'entrano e tante modifiche per una richiesta piccola sono segnali da controllare subito; se il CSS non andava toccato, lo riportate com'era.",
    slide: "leggere-diff",
  },
  {
    domanda: "Claude Code ha scritto il codice, ha aperto la pull request e, su vostra richiesta, l'ha anche rivista: dice che va tutto bene. Cosa manca prima del merge su main?",
    opzioni: [
      "Una revisione vostra: se scrive e rivede lui, il lavoro non l'ha rivisto nessuno",
      "Niente: la revisione di Claude conta come quella di una persona della squadra",
      "Una seconda revisione di Claude, in una sessione nuova, che confermi la prima",
      "Un tag di release, senza il quale GitHub non permette il merge su main",
      "Un commit di Claude che riassuma la revisione, per lasciarne traccia nella storia",
    ],
    giusta: 0,
    spiegazione: "Claude può scrivere, e può anche rivedere il lavoro di altri, ma il merge su main è una decisione vostra. Se lo stesso agente scrive e rivede, gli stessi errori passano due volte: serve un altro paio d'occhi, il vostro.",
    slide: "claude-commit-pr",
  },
  {
    domanda: "Un commit fatto da Claude Code contiene una chiave segreta di Supabase, ed è già su GitHub. Qual è la prima cosa da fare?",
    opzioni: [
      "Aggiungere il file al <code>.gitignore</code>: così sparisce dal repository e dalla storia",
      "Fare un nuovo commit che toglie la chiave dal codice: così non c'è più",
      "Cambiare la chiave su Supabase: quella vecchia resta leggibile nella storia",
      "Rendere privato il repository: così nessuno può più leggere la chiave",
      "Fare <code>git revert</code> di quel commit: la chiave viene annullata anche su GitHub",
    ],
    giusta: 2,
    spiegazione: "Una chiave finita in un commit resta nella storia anche se la togliete dopo, e chi ha il repository la può leggere: va cambiata subito nel servizio da cui viene. Il <code>.gitignore</code> non toglie i file già salvati, e un repository privato può tornare pubblico con tutta la sua storia.",
    slide: "non-nel-repository",
  },
  {
    domanda: "Tre agenti hanno lavorato in parallelo al sito della trattoria, ognuno nel suo worktree e sul suo ramo, con la sua pull request. Hanno finito tutti. Come procedete?",
    opzioni: [
      "Unite le tre pull request tutte insieme, così main cambia una volta sola",
      "Chiedete al terzo agente di unire da solo le pull request degli altri due",
      "Unite i tre rami fra loro e aprite un'unica pull request finale da rivedere",
      "Unite tutto su main e poi leggete il diff complessivo, che è uno solo e più corto",
      "Una pull request alla volta: leggete il diff, provate, unite, poi la prossima",
    ],
    giusta: 4,
    spiegazione: "Si unisce una pull request alla volta, controllando: tre agenti fanno tre diff da leggere, e il collo di bottiglia siete voi. Unire tutto insieme, o lasciare il merge a un agente, vuol dire rinunciare a rivedere.",
    slide: "dividere-lavoro-agenti",
  },
  // 4.8 Tirare le fila
  {
    domanda: "Quale di queste definizioni è <strong>sbagliata</strong>?",
    opzioni: [
      "Diff: le righe aggiunte e tolte tra due versioni",
      "Clone: la copia di un repository, senza la sua storia",
      "Merge: l'unione di un ramo in un altro",
      "Tag: un'etichetta fissa su un commit, come «versione 1.0»",
      "Issue: una scheda per una cosa da fare, con un numero",
    ],
    giusta: 1,
    spiegazione: "<code>git clone</code> scarica un repository con tutta la sua storia: per questo, dopo un clone, potete tornare a qualsiasi versione. Le altre definizioni sono quelle del corso.",
    slide: "parole-git",
  },
];

export default quiz;
