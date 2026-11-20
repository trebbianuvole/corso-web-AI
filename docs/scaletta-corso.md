# Costruire siti web con l'AI — scaletta completa del corso

Corso ENGIM sull'AI e sul vibe coding. Versione 2, 18 novembre 2026. Rivista dopo i commenti di Beatrice e Gilberto e le indicazioni del docente.

## Principi

1. **È un corso sull'AI e sul vibe coding.** Ogni argomento tecnico (web, Git, CMS, database, test) c'è perché serve a dirigere l'AI e a verificare quello che produce. Non è un corso di sviluppo web generico.
   - Ogni capitolo dal 2 in poi ha slide **[Con l'AI]**: come lo si chiede a Claude, cosa l'AI tende a sbagliare, come si controlla.
2. **Un percorso principale, più approfondimenti.**
   - Il percorso principale è uguale per tutte le classi.
   - Gli approfondimenti si aprono dalla slide a cui sono legati. Il docente sceglie quali mostrare.
3. **Contenuti stabili e contenuti che invecchiano sono separati.** Versioni dei modelli, prodotti, prezzi e interfacce degli strumenti stanno in **schede aggiornabili** con la data dell'ultimo controllo. Le slide le richiamano senza ripeterle.
4. **Due esempi che accompagnano tutto il corso:**
   - la trattoria «Da Rina», cioè il **sito**: contenuti, CMS, visibilità;
   - PrenotaAula, cioè la **webapp**: squadra, dati, utenti, permessi.
   
   Gli studenti, in parallelo, lavorano al proprio progetto.
5. **Lo stack del corso è Astro + Keystatic + GitHub + Vercel.** Per la webapp si aggiunge Supabase. Keystatic funziona solo dentro un framework (Astro, Next.js, Remix), quindi il sito degli studenti si fa in Astro fin dall'inizio. Le pagine di Astro sono quasi HTML, e i componenti nascono da sé.
   - I capitoli già pubblicati (2.4.4, 2.4.8, 2.4.9, 2.6.9, 3.1.3, 3.4.11) sono stati portati ad Astro nell'obiettivo 1.

## Come leggere questa scaletta

- **Numerazione:** capitolo.sezione.slide.
  - **X.0** è la copertina del capitolo.
  - **X.Y.0** è l'apertura di una sezione.
- **Approfondimenti:** **X.Y.a1, X.Y.a2…**, numerati di seguito dentro la sezione. Ogni gruppo indica la slide da cui si apre («si apre da X.Y.Z»).

Etichette:
- **[Attività]**: esercizio in aula
- **[Compito]**: lavoro per la volta successiva
- **[Demo]**: elemento interattivo
- **[Con l'AI]**: slide sul lavoro con l'AI in quel tema
- **[Checklist]**: strumento da riusare
- **[Scheda aggiornabile]**: rimanda a una scheda con data
- **[Verificare]**: fatto da ricontrollare sulle fonti quando si scrive

**Come si comportano gli approfondimenti sul sito** (realizzato; il primo è 1.1.a1–a8):
- Sulle slide che hanno un approfondimento c'è un pulsante blu-viola.
- Cliccandolo, la pagina corrente si stringe in una barra verticale a sinistra, con il numero della sezione e il titolo della slide in piccolo.
- Il resto dello schermo lo occupano le slide dell'approfondimento, con colori sul blu e sul rosa al posto dell'arancione e del beige.
- Dalla barra a sinistra si torna al punto esatto della lezione.

**Il quiz di fine capitolo** (realizzato per tutti i capitoli): ogni capitolo si chiude con una slide «Quiz finale», fuori dalla numerazione (indirizzo `capitolo-N/#quiz`, pulsante «Quiz» nella barra in alto), che porta alla pagina del quiz. I dettagli sono in «I quiz dei capitoli», in fondo.

---

## Capitolo 1 — Capire l'AI e orientarsi negli strumenti

**1.0 Copertina.**

### 1.1 Breve storia dell'AI
- 1.1.0 Apertura
- 1.1.1 **Cinque ere, una dopo l'altra.** Le ere, otto date cliccabili, il pulsante «Dal 2017 a oggi» (serpentina di undici tappe).
- 1.1.2 **Regole o esempi? Il filtro antispam.**
- 1.1.3 **Le reti neurali, il motore del deep learning.** Il neurone, l'addestramento, perché «deep». Apre l'approfondimento.
- 1.1.4 **Una dentro l'altra, come le matrioske.**
- 1.1.5 **Perché proprio adesso?** Internet, GPU, Transformer.

*Approfondimento «Le reti neurali da vicino» (si apre da 1.1.3). Nessuna formula, solo intuizioni e una demo.*
- 1.1.a1 **Un neurone artificiale.** Ingressi, pesi, somma, soglia. Esempio: «vado al mare?» con sole, caldo, amici.
- 1.1.a2 **Dalla soglia alla curva.** La funzione di attivazione: perché la rete non risponde solo sì o no.
- 1.1.a3 **Gli strati.** Dai pixel ai bordi, alle forme, agli oggetti: ogni strato vede qualcosa di più astratto.
- 1.1.a4 **Come impara.** Sbaglia, misura l'errore, sposta un po' i pesi, riprova. La discesa nella nebbia verso il fondo della valle.
- 1.1.a5 **[Demo] Una rete minuscola che impara.** Punti di due colori da separare; si guarda il confine cambiare a ogni giro.
- 1.1.a6 **Studiare o imparare a memoria.** Dati di addestramento e dati di prova; l'overfitting.
- 1.1.a7 **Quanto sono grandi.** Da qualche centinaio di pesi a centinaia di miliardi; perché servono le GPU.
- 1.1.a8 **Le parole diventano numeri.** Gli embedding: parole simili stanno vicine. Il ponte verso gli LLM.

### 1.2 Come funziona un LLM
- 1.2.0 Apertura
- 1.2.1 **Fa una cosa sola: indovina il pezzo successivo.**
- 1.2.2 **I token, i mattoncini del testo.**
- 1.2.3 **Il contesto, la memoria di lavoro.**
- 1.2.4 **[Attività] Indovina la parola successiva.**
- 1.2.5 **Quando e perché il modello inventa.** Unisce le vecchie 1.2.5 e 1.2.6: testo plausibile, non verificato; le quattro cause.
- 1.2.6 **Dove si nascondono le invenzioni.** Fonti, codice, numeri; gli avvocati e le sentenze inventate.
- 1.2.7 **Come difendersi.**
- 1.2.8 **Multimodalità: non solo testo.**

*Approfondimento «Dentro un LLM» (si apre da 1.2.1).*
- 1.2.a1 **Il Transformer in una slide.** Embedding, strati, previsione.
- 1.2.a2 **L'attenzione.** Ogni parola guarda le altre: «la riva della banca» e «il conto in banca».
- 1.2.a3 **Scegliere il pezzo successivo.** Probabilità e temperatura: perché la stessa domanda dà risposte diverse.

*Approfondimento «Come si addestra un LLM» (si apre da 1.2.5).*
- 1.2.a4 **Il pre-addestramento.** Leggere una parte enorme del web e indovinare la parola successiva.
- 1.2.a5 **Da completatore ad assistente.** Il fine-tuning sulle conversazioni.
- 1.2.a6 **Il giudizio umano.** Il feedback delle persone e i principi scritti; perché il modello tende a compiacere.
- 1.2.a7 **I modelli che ragionano.** Pensare per passaggi prima di rispondere; cosa cambia e cosa no.
- 1.2.a8 **La data di taglio.** Il modello non sa cosa è successo dopo l'addestramento. Ripreso in 2.4.10 e 8.4.7.

### 1.3 Il mercato e cosa sta succedendo
- 1.3.0 Apertura
- 1.3.1 **Chi costruisce i modelli.** **[Scheda aggiornabile]** con l'elenco dei laboratori.
- 1.3.2 **Gli strumenti per creare siti e app.** Chiedi e copi, descrivi e guardi, scrivi con un aiuto, deleghi.
- 1.3.3 **Modello e applicazione non sono la stessa cosa.** Claude, ChatGPT e Gemini sono prodotti; dentro ci sono modelli diversi. Novità, da Gilberto.
- 1.3.4 **Come si sceglie un modello.** Qualità, capacità nel codice, velocità, contesto, costo, uso degli strumenti, autonomia. Non esiste il migliore in assoluto. Novità.
- 1.3.5 **Le classifiche e i loro limiti.** Cos'è un benchmark, perché il primo in classifica può non essere il migliore per il vostro progetto, i modelli che «studiano per il test». Novità.
- 1.3.6 **Cosa ci insegna la matematica.** Unisce le vecchie 1.3.3 e 1.3.4: i risultati in sintesi, poi la lezione. Produrre è facile, verificare è il lavoro vero, il dibattito è aperto. Apre l'approfondimento.

*Approfondimento «L'AI e la matematica, da vicino» (si apre da 1.3.6).*
- 1.3.a1 **Oro alle Olimpiadi (luglio 2025).**
- 1.3.a2 **I problemi di Erdős (gennaio 2026).**
- 1.3.a3 **La congettura Jacobiana (luglio 2026).** Il controesempio e la verifica in Lean.
- 1.3.a4 **Fermat riscritto in Lean (settembre 2026).**
- 1.3.a5 **Cos'è una dimostrazione verificata dal computer.** Perché Lean cambia il rapporto tra produrre e verificare.

### 1.4 Claude
- 1.4.0 Apertura
- 1.4.1 **Dove si usa.**
- 1.4.2 **I modelli di Claude: la taglia giusta.** Il principio resta nella slide; nomi e versioni vanno nella **[Scheda aggiornabile]**. Oggi il sito dice Fable 5.1, l'ultima è la 5.2 **[Verificare]**.
- 1.4.3 **Le parole da conoscere.** Chatbot, agente, artifact, skill.
- 1.4.4 **Come è nato questo sito.**

---

## Capitolo 2 — Progettare un prodotto web

**2.0 Copertina.** Cosa costruire, per chi, con quali strumenti, e come si capisce quando è finito.

### 2.1 Organizzare un progetto
- 2.1.0 Apertura
- 2.1.1 **Un sito è una ricetta.**
- 2.1.2 **Il piano si fa a mano, prima.**
- 2.1.3 **La differenza la fa il brief.** **[Con l'AI]**
- 2.1.4 **Prima di accendere i fornelli.** **[Checklist]**
- 2.1.5 **[Attività] Pensate al vostro sito.**
- *Tolta per ora:* la slide «La mappa del corso» (idea di Gilberto con le parole della ricetta: la ricetta, i fornelli, l'assaggio, l'impiattamento, il giorno dopo) e il «siete qui» sulle copertine dei capitoli. Creava confusione. Il componente `SieteQui` resta nel codice, con tappe e capitoli: per rimetterla basta richiamarlo.

### 2.2 Dal piano al progetto
- 2.2.0 Apertura
- 2.2.1 **Prima di tutto: si può fare?** Il POC. **[Con l'AI]**: con l'AI un POC costa pochissimo.
- 2.2.2 **MVP: la versione più piccola che funziona.**
- 2.2.3 **Il MVP della trattoria «Da Rina».**
- 2.2.4 **POC, prototipo, MVP.**
- 2.2.5 **Il target decide le scelte tecniche.**
- 2.2.6 **Sito, web app o app?** Da qui il corso segue due strade: il sito di Da Rina e la webapp PrenotaAula (Gilberto).
- 2.2.7 **Architettura: dove sta ogni cosa.**
- 2.2.8 **Quanto costa cambiare idea.**
- 2.2.9 **Le domande che tutti dimenticano.** Aggiungere: chi aggiornerà i contenuti, cioè il CMS (capitolo 8).

*Approfondimento «Tre modi di mettere insieme un'applicazione» (si apre da 2.2.7).*
- 2.2.a1 **Tutto in un pezzo.** L'applicazione monolitica.
- 2.2.a2 **Un pezzo per lavoro.** Client e server, servizi esterni.
- 2.2.a3 **Il backend già pronto.** Backend-as-a-Service. Quale architettura propone l'AI se non le dite niente.

### 2.3 Com'è fatto un sito web
- 2.3.0 Apertura
- 2.3.1 **Cosa succede quando aprite un sito.**
- 2.3.2 **Client e server.**
- 2.3.3 **Anatomia di un indirizzo.**
- 2.3.4 **Dominio e hosting.**
- 2.3.5 **HTML, CSS, JavaScript.**
- 2.3.6 **[Demo] Accendete gli strati, uno alla volta.**
- 2.3.7 **Frontend, backend, database.**
- 2.3.8 **Cosa succede quando premo «Prenota».** Novità, da Gilberto: frontend → richiesta → controllo → database → risposta. Ripreso nel capitolo 10.
- 2.3.9 **Statico o dinamico?**
- 2.3.10 **I CMS: il sito con il pannello di controllo.** Rivista: quattro famiglie (WordPress, i costruttori come Wix, i CMS headless, i CMS basati su Git come Keystatic). «Noi useremo Keystatic: capitolo 8.»
- 2.3.11 **Un sito, tanti schermi.**
- 2.3.12 **Ogni sito si può aprire e leggere.**
- 2.3.13 **Le parole da conoscere.**

### 2.4 Lo stack
- 2.4.0 Apertura
- 2.4.1 **Linguaggi, librerie, framework, servizi.**
- 2.4.2 **Una pila di strumenti, strato per strato.**
- 2.4.3 **I linguaggi più diffusi, e dove si usano.**
- 2.4.4 **Il frontend: a mano o con un framework.** Aggiungere Astro e spiegare perché lo usiamo: pagine quasi HTML, componenti, ottimo per i siti di contenuti.
- 2.4.5 **La cucina e la dispensa.** Backend e database.
- 2.4.6 **Oltre il web.**
- 2.4.7 **Gli attrezzi comuni a tutti.** Con rimando al capitolo 4.
- 2.4.8 **Tre progetti, tre stack.** Il sito della trattoria diventa Astro + Keystatic + GitHub + Vercel.
- 2.4.9 **Come si sceglie lo stack.** «Il nostro stack»: Astro, Keystatic, GitHub, Vercel; Supabase per la webapp.
- 2.4.10 **[Con l'AI] Lo stack che l'AI conosce meglio.** Novità. I modelli lavorano meglio con tecnologie diffuse e stabili. Con una versione uscita dopo la data di taglio, l'AI scrive codice vecchio: bisogna darle la documentazione aggiornata.

### 2.5 API e dati
*MCP passa al capitolo 3, come proposto da Gilberto.*
- 2.5.0 Apertura
- 2.5.1 **Al ristorante.** La metafora rivista: cliente, menu, cucina. Il cameriere tornerà nella 3.3.
- 2.5.2 **L'API è il menu.**
- 2.5.3 **I formati dei dati.** Novità: JSON, CSV, YAML e Markdown, letti senza paura. YAML e Markdown sono anche i formati in cui Keystatic salva i contenuti.
- 2.5.4 **Le API sono ovunque, e le loro chiavi.**
- 2.5.5 **[Con l'AI] Usare un'API con Claude.** Gli si dà la documentazione e lui scrive la chiamata. Voi controllate chiavi, costi e limiti.

### 2.6 Funzionalità e criteri di accettazione
*Sezione nuova, da Gilberto.*
- 2.6.0 Apertura
- 2.6.1 **Dall'idea al problema da risolvere.**
- 2.6.2 **Utenti e casi d'uso.** «Come [chi] voglio [cosa] per [perché].»
- 2.6.3 **Il percorso dell'utente.** Dal primo contatto all'obiettivo raggiunto, per Da Rina e per PrenotaAula.
- 2.6.4 **Cosa succede quando clicco.** Il flusso di una funzione, compresi gli errori.
- 2.6.5 **Requisiti funzionali e non funzionali.** Cosa fa, e come deve farlo: veloce, accessibile, sicuro.
- 2.6.6 **Criteri di accettazione: quando una funzione è finita.** Ripresi nel prompt (6.5) e nei test (11.2).
- 2.6.7 **[Con l'AI] Claude come analista.** Gli si chiedono storie, casi limite e domande dimenticate. Poi decidete voi.
- 2.6.8 **[Attività] Progettare una funzione di PrenotaAula.** «Prenotare un'aula»: storia, percorso, criteri.
- 2.6.9 **Tutto per iscritto, in un file.** Il documento di progetto, spostato dalla 2.2.10, ora con funzionalità e criteri. Anticipa il CLAUDE.md.

---

## Capitolo 3 — Parlare con l'AI e farla lavorare

**3.0 Copertina.**

### 3.1 Prompt e contesto
- 3.1.0 Apertura
- 3.1.1 **Claude sa solo quello che gli dite.**
- 3.1.2 **Sei ingredienti di un buon prompt.**
- 3.1.3 **Un prompt smontato.** Aggiornare l'esempio allo stack in Astro.
- 3.1.4 **Cinque mosse che funzionano.**
- 3.1.5 **Come si segnala un problema.**
- 3.1.6 **Il primo risultato è una bozza.**
- 3.1.7 **Gli sbagli che fanno tutti.**
- 3.1.8 **Un modello da copiare.**
- 3.1.9 **Non basta il prompt: serve il contesto.** Novità, da Gilberto. Il context engineering: documento di progetto, struttura dei file, regole, design system, codice esistente, issue, esempi. Prepara il CLAUDE.md (6.2).
- 3.1.10 **Scrivere bene è pensare bene.**

*Approfondimento «Il contesto da vicino» (si apre da 3.1.9).*
- 3.1.a1 **Istruzioni di sistema e messaggi.** Come è fatta davvero una conversazione con un modello.
- 3.1.a2 **Quando il contesto è troppo.** Informazioni perse nel mezzo, sessioni lunghe, riassunti.

### 3.2 Gli agenti
- 3.2.0 Apertura
- 3.2.1 **Dal chatbot all'agente.**
- 3.2.2 **Com'è fatto un agente.** Arricchita con il ciclo di Gilberto: obiettivo, piano, scelta dello strumento, azione, osservazione, decisione. Ogni passo può introdurre un errore.
- 3.2.3 **Workflow o agente?**
- 3.2.4 **Gli agenti, ovunque.**
- 3.2.5 **Gli agenti di Claude.** **[Scheda aggiornabile]**
- 3.2.6 **Chi lavora e cosa sa.** Agente e skill.
- 3.2.7 **Skill, subagent, MCP: a cosa serve cosa.**
- 3.2.8 **Affidare un lavoro, senza perdere il controllo.** Autonomia non vuol dire affidabilità.

*Approfondimento «Come un modello usa gli strumenti» (si apre da 3.2.2).*
- 3.2.a1 **Il modello non clicca.** Chiede di usare uno strumento, e un programma esegue al posto suo.
- 3.2.a2 **Un ciclo dal vivo.** Il registro di un agente, passo per passo.
- 3.2.a3 **Perché gli errori si sommano.** Probabilità di successo su dieci passi.

### 3.3 MCP e connettori
*Sezione spostata dalla 2.5.*
- 3.3.0 Apertura
- 3.3.1 **Il cameriere.** Riprende la metafora della 2.5: l'agente che ordina in cucina.
- 3.3.2 **Ogni menu è scritto in una lingua diversa.** Il problema N×M.
- 3.3.3 **MCP: un modo comune di servire ai tavoli.**
- 3.3.4 **Un ordine, passo per passo.**
- 3.3.5 **In Claude si chiamano connettori.**
- 3.3.6 **Il cameriere ha le chiavi della cucina.** Rimando alla 5.3.

*Approfondimento «MCP da vicino» (si apre da 3.3.3).*
- 3.3.a1 **La storia di MCP.**
- 3.3.a2 **Cosa c'è dentro un server MCP.** Strumenti, risorse, istruzioni.
- 3.3.a3 **Server locali e remoti.**

### 3.4 Vibe coding e Claude Code
- 3.4.0 Apertura
- 3.4.1 **Da dove viene la parola.**
- 3.4.2 **Uno spettro, non un interruttore.** Rinforzata con le tre modalità di Gilberto: assistente, collaboratore, agente, e quando usare ciascuna.
- 3.4.3 **Quando sì, quando con cautela.**
- 3.4.4 **Il ciclo di lavoro.**
- 3.4.5 **Claude Code: un agente dentro il progetto.**
- 3.4.6 **Chat o Claude Code?**
- 3.4.7 **Come lavora.**
- 3.4.8 **Gli strumenti da conoscere.** Il checkpoint con rimando al commit (4.7).
- 3.4.9 **Dal piano al sito online.**
- 3.4.10 **Le regole del vibe coder con giudizio.**
- 3.4.11 **[Compito] Scrivete il documento del vostro progetto.** Con funzionalità e criteri (2.6). Diventerà il primo commit (4.8.4).

---

## Capitolo 4 — Git e GitHub

**4.0 Copertina.** La storia di un progetto e il lavoro in squadra: la rete di sicurezza per lavorare con gli agenti.

### 4.1 Perché serve
- 4.1.0 Apertura
- 4.1.1 **Il problema: chi ha la versione giusta?**
- 4.1.2 **Cosa risolvono Git e GitHub.**
- 4.1.3 **Git non è GitHub.**
- 4.1.4 **[Con l'AI] Perché con un agente serve ancora di più.** Un agente modifica decine di file in un minuto.

### 4.2 Il terminale in due minuti
- 4.2.0 Apertura
- 4.2.1 **Cos'è il terminale.**
- 4.2.2 **Tre comandi per orientarsi.** `pwd`, `ls`, `cd`. Restano nel percorso principale: senza, non si lancia nessun comando.
- 4.2.3 **Se il terminale fa paura.** VS Code e GitHub Desktop. **[Con l'AI]**: Claude Code dà i comandi, ma voi dovete capirli.
- 4.2.4 **[Attività] Primo giro nel terminale.**

### 4.3 Git sul vostro computer
- 4.3.0 Apertura
- 4.3.1 **Il repository.**
- 4.3.2 **Il commit, una fotografia del progetto.**
- 4.3.3 **Dal file alla storia, in tre posti.**
- 4.3.4 **Guardare la storia.** `status`, `log`, `diff`.
- 4.3.5 **Messaggi che servono.**
- 4.3.6 **Cosa non salvare: il .gitignore.**
- 4.3.7 **Tornare indietro.** `restore`, `revert`.
- 4.3.8 **Git non è un backup.** Novità, da Gilberto: non salva il database, gli account, i file esclusi, le credenziali. Ripreso in 10.2.7 e 12.2.
- 4.3.9 **[Attività] Il primo repository.**

*Approfondimento «I comandi da maneggiare con cura» (si apre da 4.3.7).*
- 4.3.a1 **`reset --hard`.**
- 4.3.a2 **`push --force`.**
- 4.3.a3 **Ritrovare un commit perso.** Il `reflog`.

### 4.4 Rami: main e branch
- 4.4.0 Apertura
- 4.4.1 **Il ramo main e i branch.**
- 4.4.2 **Creare e cambiare ramo.**
- 4.4.3 **Il merge.**
- 4.4.4 **I conflitti: due mani sulla stessa riga.**
- 4.4.5 **Risolvere un conflitto.** **[Con l'AI]**: chiedere a Claude di spiegarlo prima di risolverlo.
- 4.4.6 **[Attività] Un conflitto apposta.**

### 4.5 GitHub: la casa online del progetto
- 4.5.0 Apertura
- 4.5.1 **GitHub è la casa online del progetto.**
- 4.5.2 **Account e repository.**
- 4.5.3 **Pubblico o privato.**
- 4.5.4 **Dal vostro computer a GitHub.** Comprende un accesso semplice dal terminale o da VS Code.
- 4.5.5 **Le issue.** **[Con l'AI]**: una buona issue è anche un buon prompt.
- 4.5.6 **Le pull request.**
- 4.5.7 **La code review.**

*Approfondimento «Accessi e strumenti di GitHub» (si apre da 4.5.4).*
- 4.5.a1 **Token e chiavi SSH.**
- 4.5.a2 **Projects: la bacheca.**
- 4.5.a3 **Pages: siti statici gratuiti.**

### 4.6 Il metodo in squadra: PrenotaAula
- 4.6.0 Apertura
- 4.6.1 **Ogni modifica segue lo stesso giro.**
- 4.6.2 **Il progetto PrenotaAula.**
- 4.6.3 **Anna lavora alla issue #12.**
- 4.6.4 **Dopo il merge, il sito si aggiorna da solo.** Vercel, e in alternativa Actions con Pages.
- 4.6.5 **Release e tag.**
- 4.6.6 **Se qualcosa va storto.**

*Approfondimento «Automazioni su GitHub» (si apre da 4.6.4).*
- 4.6.a1 **GitHub Actions.** I test a ogni push.
- 4.6.a2 **Proteggere main.** Solo pull request approvate.

### 4.7 Git e l'AI
- 4.7.0 Apertura
- 4.7.1 **La rete di sicurezza dell'agente.**
- 4.7.2 **Checkpoint o commit?**
- 4.7.3 **Un ramo per ogni esperimento.**
- 4.7.4 **Leggere il diff prima di approvare.**
- 4.7.5 **Claude fa commit e apre pull request.** Claude come secondo revisore.
- 4.7.6 **Cosa non deve finire nel repository.**

*Approfondimento «Più agenti in parallelo» (si apre da 4.7.3).*
- 4.7.a1 **Una cartella per agente: i worktree.**
- 4.7.a2 **Dividere il lavoro senza pestarsi i piedi.**

### 4.8 Tirare le fila
- 4.8.0 Apertura
- 4.8.1 **Questo sito, su GitHub.**
- 4.8.2 **Sei regole d'oro per lavorare in squadra.**
- 4.8.3 **Le parole da conoscere.**
- 4.8.4 **[Compito] Il vostro progetto su GitHub.**

---

## Capitolo 5 — Usare l'AI con giudizio

**5.0 Copertina.**

### 5.1 Dove vanno i dati
- 5.1.0 Apertura
- 5.1.1 **Il viaggio di un messaggio.**
- 5.1.2 **Addestramento: sì, no, dipende.** **[Scheda aggiornabile]**
- 5.1.3 **Account personale e account di lavoro.**
- 5.1.4 **Memoria, cronologia, connettori.**
- 5.1.5 **[Attività] Aprite le impostazioni.**

### 5.2 I dati degli altri
- 5.2.0 Apertura
- 5.2.1 **Cos'è un dato personale.**
- 5.2.2 **Dati che chiedono più attenzione.**
- 5.2.3 **Incollare è consegnare.**
- 5.2.4 **Le regole pratiche.**
- 5.2.5 **Nei progetti web.** CLAUDE.md, screenshot, dati di prova, log, database.
- 5.2.6 **Quando i dati non devono uscire.** I modelli in locale, in breve.
- 5.2.7 **[Attività] Si può incollare?**

*Approfondimento «Modelli aperti e locali» (si apre da 5.2.6).*
- 5.2.a1 **Pesi aperti e pesi chiusi.**
- 5.2.a2 **Hugging Face, il catalogo dei modelli.**
- 5.2.a3 **Far girare un modello sul proprio computer.** Cosa serve, cosa si perde. **[Verificare]**

### 5.3 Sicurezza con gli agenti
*Il caso Hugging Face resta come aggancio. L'attività centrale diventa la simulazione proposta da Gilberto.*
- 5.3.0 Apertura
- 5.3.1 **Un agente agisce a nome vostro.**
- 5.3.2 **Le istruzioni nascoste.**
- 5.3.3 **Un caso vero: luglio 2026.** Hugging Face in una slide, come aggancio. Apre l'approfondimento.
- 5.3.4 **[Attività] Un agente compromesso.** Simulazione:
  1. l'agente ha accesso a GitHub;
  2. legge una issue con istruzioni malevole;
  3. modifica il progetto;
  4. cerca una variabile d'ambiente;
  5. propone una libreria;
  6. prova a pubblicare.
  
  La classe trova dove fermarlo.
- 5.3.5 **Le difese.** Ricavate dalla simulazione: permessi minimi, isolamento, conferma prima delle azioni irreversibili, chiavi mai in chat.
- 5.3.6 **Librerie che non esistono.**
- 5.3.7 **Anche chi attacca usa l'AI.** Phishing, voci clonate, truffe.

*Approfondimento «Il caso Hugging Face da vicino» (si apre da 5.3.3).*
- 5.3.a1 **Cronologia.** Dall'intrusione alla dichiarazione di OpenAI.
- 5.3.a2 **Il modello che bara.** Superare il test invece di risolverlo.
- 5.3.a3 **I filtri che fermano chi difende.** L'analisi con un modello aperto in casa.
- 5.3.a4 **Leggere le fonti.** «Senza precedenti» è contestato.

### 5.4 Uso consapevole
- 5.4.0 Apertura
- 5.4.1 **Sicuro di sé non vuol dire giusto.**
- 5.4.2 **Se non so farlo, non so controllarlo.**
- 5.4.3 **Dichiarare l'uso.**
- 5.4.4 **L'AI come amico.** Resta nel percorso principale: con una classe giovane è un tema concreto.
- 5.4.5 **Immagini e voci di persone reali.** **[Verificare]** le norme penali.
- 5.4.6 **I pregiudizi nei dati.**

*Approfondimento «L'impronta dell'AI» (si apre da 5.4.1).*
- 5.4.a1 **Energia, acqua, chip.** Le stime e perché sono discusse.
- 5.4.a2 **Cosa può fare chi la usa.** La taglia giusta del modello (1.4.2).

### 5.5 Responsabilità e diritti
*Resta nel percorso principale: sono le prime domande di un cliente.*
- 5.5.0 Apertura
- 5.5.1 **Chi risponde se l'AI sbaglia?** Chi la usa, chi la costruisce, chi la vende.
- 5.5.2 **Di chi è il codice? Di chi sono le immagini?** Il contributo umano e cosa dire al cliente. **[Verificare]**
- 5.5.3 **Addestrare sulle opere degli altri.** Le cause in corso, le licenze, cosa significa per chi pubblica.
- 5.5.4 **Il lavoro: cosa cambia.** Ripreso in 12.4.

### 5.6 Domande aperte
*Nel percorso principale restano la domanda e il dibattito; gli approfondimenti tengono la parte filosofica.*
- 5.6.0 Apertura
- 5.6.1 **Quattro domande senza risposta facile.** Capisce o imita? Chi è responsabile? Può essere pericolosa? Può avere esperienze? Ogni domanda apre il suo approfondimento.
- 5.6.2 **[Attività] Il tribunale dell'AI.**

*Approfondimento «Capire o imitare» (si apre da 5.6.1).*
- 5.6.a1 **Il test di Turing.**
- 5.6.a2 **La stanza cinese.**
- 5.6.a3 **«Pappagalli stocastici» e capacità emergenti.**

*Approfondimento «Rischi e allineamento» (si apre da 5.6.1).*
- 5.6.a4 **Cosa vuol dire allineare un modello.**
- 5.6.a5 **Chi è preoccupato, chi no, e perché.**

*Approfondimento «Un modello può avere esperienze?» (si apre da 5.6.1).*
- 5.6.a6 **La domanda e perché se ne discute.**
- 5.6.a7 **Le posizioni in campo.**

### 5.7 Le regole
*Reso pratico: cosa devo fare io.*
- 5.7.0 Apertura
- 5.7.1 **Cosa devo fare io.** **[Checklist]** in dieci righe, per chi usa l'AI e per chi fa un sito.
- 5.7.2 **Il GDPR in cinque idee.**
- 5.7.3 **L'AI Act in una pagina.**
- 5.7.4 **La legge italiana 132/2025.** Minori: sotto i 14 anni serve il consenso dei genitori.
- 5.7.5 **[Attività] Il patto d'aula.**
- 5.7.6 **Le parole da conoscere.**

*Approfondimento «Le norme da vicino» (si apre da 5.7.2).*
- 5.7.a1 **GDPR: basi giuridiche e diritti.**
- 5.7.a2 **AI Act: livelli di rischio e scadenze.** **[Verificare]**
- 5.7.a3 **Legge 132/2025: cosa prevede.** **[Verificare]**

---

## Capitolo 6 — Costruire con l'AI

**6.0 Copertina.** Dal CLAUDE.md a un sito in Astro, online, costruito una funzionalità alla volta.

### 6.1 Il banco di lavoro
- 6.1.0 Apertura
- 6.1.1 **Cosa serve.** Account; VS Code; Git; Node.js; Claude Code. **[Checklist]**
- 6.1.2 **Node.js e npm: perché servono.** Astro e Keystatic si installano così.
- 6.1.3 **VS Code in dieci minuti.**
- 6.1.4 **Installare Claude Code.** **[Verificare]**
- 6.1.5 **Creare il progetto Astro.** Con Claude in plan mode, nel repository del 4.8.4.
- 6.1.6 **[Attività] Funziona tutto?**

### 6.2 Il CLAUDE.md
- 6.2.0 Apertura
- 6.2.1 **Dal documento di progetto al CLAUDE.md.** Il contesto della 3.1.9, messo in pratica.
- 6.2.2 **Un CLAUDE.md commentato.** Da Rina, in Astro.
- 6.2.3 **Cosa non ci va.**
- 6.2.4 **Il CLAUDE.md cresce con il progetto.** Quando Claude sbaglia due volte la stessa cosa, si aggiunge una regola.

*Approfondimento (si apre da 6.2.1).*
- 6.2.a1 **Farlo scrivere a Claude con `/init`.**
- 6.2.a2 **Skill di progetto e documentazione aggiornata.** Come dare all'AI la versione giusta di una libreria. **[Verificare]**

### 6.3 La prima sessione
- 6.3.0 Apertura
- 6.3.1 **Plan mode in pratica.**
- 6.3.2 **Il primo prompt.**
- 6.3.3 **Guardare il risultato.**
- 6.3.4 **Un passo alla volta.** Ogni passo finisce con un commit.
- 6.3.5 **I permessi.**
- 6.3.6 **Le sessioni lunghe.**

### 6.4 I componenti
*Sezione nuova: richiesta dal docente, d'accordo con Gilberto.*
- 6.4.0 Apertura
- 6.4.1 **Cos'è un componente.** Un pezzo di interfaccia riutilizzabile: la scheda di un piatto, il pulsante WhatsApp, il piè di pagina.
- 6.4.2 **I componenti in Astro.** Un file `.astro`: quasi HTML, con un po' di logica in testa.
- 6.4.3 **Le props.** Lo stesso componente con dati diversi: dieci piatti, una sola scheda.
- 6.4.4 **Il layout.** La cornice comune a tutte le pagine.
- 6.4.5 **Come si scompone una pagina.** **[Attività]** Disegnare i rettangoli di una pagina e dare un nome a ogni componente.
- 6.4.6 **[Con l'AI] Chiedere componenti, non pagine.** L'AI tende a duplicare il codice: come accorgersene e come chiedere di riunirlo.

*Approfondimento (si apre da 6.4.2).*
- 6.4.a1 **Isole interattive.** Quando un componente ha bisogno di JavaScript nel browser.
- 6.4.a2 **Componenti in React, Vue, Svelte dentro Astro.**

### 6.5 Una funzionalità alla volta
*Sezione nuova, da Gilberto, centrata su come si dirige l'AI.*
- 6.5.0 Apertura
- 6.5.1 **Scomporre una funzionalità.** Dalla storia (2.6.2) ai passi.
- 6.5.2 **[Con l'AI] Il prompt con i criteri di accettazione.** «Hai finito quando…»
- 6.5.3 **Prima versione, poi migliorie.**
- 6.5.4 **Iterare senza rompere ciò che funziona.** Rami, commit, prove.
- 6.5.5 **Codice che funziona e codice che si capisce.** I quattro livelli di Gilberto: funziona, si capisce, è organizzato, si mantiene.
- 6.5.6 **[Demo] Un refactoring.** Lo stesso risultato, codice migliore. **[Con l'AI]**: chiedere a Claude di semplificare senza cambiare il comportamento.
- 6.5.7 **[Attività] Una funzionalità completa.** Dalla storia al commit.

### 6.6 Pubblicare
- 6.6.0 Apertura
- 6.6.1 **Collegare GitHub a Vercel.**
- 6.6.2 **Un'anteprima per ogni ramo.**
- 6.6.3 **Il dominio.**

*Approfondimento (si apre da 6.6.1).*
- 6.6.a1 **Le alternative: Netlify, GitHub Pages.**

### 6.7 Quando qualcosa si rompe
- 6.7.0 Apertura
- 6.7.1 **Dove guardare.**
- 6.7.2 **Leggere un messaggio d'errore.**
- 6.7.3 **Spiegarlo a Claude.**
- 6.7.4 **[Con l'AI] Quando l'agente gira in tondo.** Ampliata, da Beatrice: riconoscere il ciclo (stessa correzione, stesso errore).
- 6.7.5 **[Con l'AI] Uscire dal ciclo.** Fermarsi, tornare al commit, sessione nuova con un riassunto, restringere il problema, cambiare domanda.
- 6.7.6 **[Con l'AI] Quando l'AI usa una versione vecchia.** Codice scritto per una versione superata: dare la documentazione attuale.
- 6.7.7 **Gli errori classici dei principianti.**
- 6.7.8 **[Compito] Il vostro MVP online.**

---

## Capitolo 7 — Design e interfacce

**7.0 Copertina.**

### 7.1 UX e UI
- 7.1.0 Apertura
- 7.1.1 **UX e UI non sono la stessa cosa.** Novità, da Gilberto: com'è vissuto il prodotto, e come appare.
- 7.1.2 **La gerarchia.**
- 7.1.3 **Lo spazio.**
- 7.1.4 **I caratteri.**
- 7.1.5 **Il colore.**
- 7.1.6 **La coerenza.**
- 7.1.7 **[Attività] Smontare un sito.**

### 7.2 Gli stati dell'interfaccia
*Sezione nuova, da Gilberto.*
- 7.2.0 Apertura
- 7.2.1 **Non esiste solo la schermata perfetta.** Iniziale, caricamento, successo, errore, vuoto, non consentito.
- 7.2.2 **Cosa succede quando clicco.** I messaggi di riscontro: il pulsante si disattiva, compare un messaggio.
- 7.2.3 **[Con l'AI] L'AI disegna solo il caso felice.** Come chiedere tutti gli stati. Ripreso in 10.5.

### 7.3 Il design system
- 7.3.0 Apertura
- 7.3.1 **Cos'è un design system.** Colori, caratteri, spazi, componenti con varianti.
- 7.3.2 **Le variabili CSS.**
- 7.3.3 **Dal design system ai componenti.** Collega la 6.4.
- 7.3.4 **[Con l'AI] Scriverlo nel CLAUDE.md.**

*Approfondimento (si apre da 7.3.1).*
- 7.3.a1 **Librerie di componenti.** Tailwind, shadcn/ui.
- 7.3.a2 **I design token.**

### 7.4 Il design con l'AI
*Sezione nuova, per mantenere il fuoco sull'AI.*
- 7.4.0 Apertura
- 7.4.1 **Perché i siti fatti con l'AI si somigliano tutti.** Gli stessi colori, caratteri e schemi di default.
- 7.4.2 **Dare un'identità.** Riferimenti, schizzi, palette, divieti espliciti.
- 7.4.3 **Dallo schizzo al codice.** Una foto a Claude (1.2.8).
- 7.4.4 **Claude guarda il risultato.** Screenshot e browser per correggere quello che vede.
- 7.4.5 **Gli strumenti di design con l'AI.** **[Scheda aggiornabile]**
- 7.4.6 **Mostrare al cliente.**

### 7.5 Responsive
- 7.5.0 Apertura
- 7.5.1 **Prima il telefono.**
- 7.5.2 **Come si adatta una pagina.**
- 7.5.3 **Provare su tanti schermi.**

### 7.6 Accessibilità
- 7.6.0 Apertura
- 7.6.1 **Un sito per tutti.**
- 7.6.2 **Le basi.**
- 7.6.3 **Come si prova.**
- 7.6.4 **[Con l'AI] Far controllare l'accessibilità a Claude.** Cosa trova e cosa no.
- 7.6.5 **È anche una legge.** **[Verificare]**
- 7.6.6 **[Attività] Tre controlli sul vostro sito.**

---

## Capitolo 8 — Contenuti e CMS

**8.0 Copertina.** Il sito è online; il cliente vuole cambiare un prezzo. Chi lo fa, e come?

### 8.1 Contenuti e codice sono due cose diverse
*Sezione nuova, da Gilberto.*
- 8.1.0 Apertura
- 8.1.1 **Il cliente vuole cambiare un prezzo.** Oggi deve chiamare voi: non va bene.
- 8.1.2 **Dove possono stare i contenuti.** Nel codice, in file di dati, in un pannello, in un database.
- 8.1.3 **Chi fa cosa.** Lo sviluppatore cambia la struttura, il cliente i contenuti.

### 8.2 I CMS
- 8.2.0 Apertura
- 8.2.1 **Quattro famiglie di CMS.** Ripresa ampliata della 2.3.10: tradizionali (WordPress), costruttori (Wix, Squarespace), headless (via API), basati su Git (Keystatic, Decap, Tina).
- 8.2.2 **Pro e contro.** Costi, sicurezza, aggiornamenti, libertà di design, dipendenza dal fornitore.
- 8.2.3 **Perché Keystatic.** Gratuito, contenuti come file nel repository, niente database da gestire, un pannello semplice per il cliente.
- 8.2.4 **[Con l'AI] CMS e AI.** Con un CMS basato su file, Claude legge e modifica anche i contenuti. Il cliente usa il pannello, voi l'agente.

*Approfondimento (si apre da 8.2.1).*
- 8.2.a1 **Headless da vicino.** Contenuti via API, servizi in cloud.
- 8.2.a2 **WordPress oggi.** Quando è ancora la scelta giusta.

### 8.3 Keystatic: come funziona
- 8.3.0 Apertura
- 8.3.1 **Il pannello `/keystatic`.** Cosa vede il cliente.
- 8.3.2 **Lo schema.** Collezioni (i piatti, gli eventi) e singoli (gli orari, i contatti).
- 8.3.3 **I campi.** Testo, numero, immagine, data, elenco, testo formattato.
- 8.3.4 **Dove finiscono i contenuti.** File YAML, JSON e Markdoc nel repository (2.5.3).
- 8.3.5 **Modalità locale e modalità GitHub.** In GitHub, ogni salvataggio è un commit (capitolo 4).
- 8.3.6 **Dal salvataggio al sito online.** Il cliente salva → commit su GitHub → Vercel pubblica (4.6.4).

*Approfondimento (si apre da 8.3.4).*
- 8.3.a1 **Markdoc e Markdown.**
- 8.3.a2 **Keystatic Cloud.** **[Verificare]**

### 8.4 Implementare Keystatic con Claude Code
- 8.4.0 Apertura
- 8.4.1 **Il piano.** Plan mode: cosa diventa modificabile e cosa resta fisso.
- 8.4.2 **Installare.** Integrazioni React e Markdoc, i pacchetti Keystatic, la configurazione. **[Verificare]**
- 8.4.3 **Progettare lo schema della trattoria.** Menu (piatti, prezzi, categorie, allergeni), orari, eventi. **[Attività]**
- 8.4.4 **Leggere i contenuti nelle pagine.** Componenti (6.4) che mostrano i dati di Keystatic.
- 8.4.5 **Online con la modalità GitHub.** L'adattatore per Vercel, l'app GitHub, l'accesso del cliente. **[Verificare]**
- 8.4.6 **[Attività] La prova del cliente.** Un compagno fa il cliente e cambia un prezzo dal pannello. Il sito si aggiorna?
- 8.4.7 **[Con l'AI] Cosa sbaglia l'AI con Keystatic.** Configurazioni di versioni vecchie, campi inventati: si dà a Claude la documentazione attuale (6.7.6).
- 8.4.8 **[Compito] Il CMS nel vostro sito.**

### 8.5 Scrivere per il web
- 8.5.0 Apertura
- 8.5.1 **Online si legge a salti.**
- 8.5.2 **Titoli e inviti all'azione.** Ogni pagina ha un obiettivo: prenotare, chiamare, venire.
- 8.5.3 **Il tono, scritto nel CLAUDE.md.**
- 8.5.4 **[Con l'AI] L'AI scrive, voi decidete.** Controllare i fatti, togliere i tic tipici dell'AI.

### 8.6 Immagini e media
- 8.6.0 Apertura
- 8.6.1 **Formati e peso.**
- 8.6.2 **Dove trovarle, e con quale licenza.**
- 8.6.3 **Le foto di persone.**
- 8.6.4 **[Con l'AI] Immagini, video e voci generati.** Quando ha senso, quando inganna. **[Scheda aggiornabile]**
- 8.6.5 **Diritti e trasparenza delle immagini generate.** **[Verificare]**

*Approfondimento (si apre da 8.6.2).*
- 8.6.a1 **Icone, loghi e marchi degli altri.**

---

## Capitolo 9 — Farsi trovare

**9.0 Copertina.** Dai motori di ricerca alle risposte delle AI.

### 9.1 Come funziona la ricerca
- 9.1.0 Apertura
- 9.1.1 **Scansione, indice, classifica.**
- 9.1.2 **Cosa conta.**

### 9.2 SEO di base
- 9.2.0 Apertura
- 9.2.1 **Title e description.** Nel layout di Astro e nei campi di Keystatic (8.3.3).
- 9.2.2 **Titoli, testi, indirizzi, immagini.**
- 9.2.3 **sitemap.xml e robots.txt.**
- 9.2.4 **Google Search Console e scheda dell'attività.**
- 9.2.5 **[Con l'AI] Claude come revisore SEO.** Cosa chiedere, cosa non credere.

### 9.3 La ricerca con l'AI
*Il cuore del capitolo, per restare sul tema.*
- 9.3.0 Apertura
- 9.3.1 **Le risposte al posto dei link.** **[Verificare]**
- 9.3.2 **Farsi citare.** Contenuti chiari, dati strutturati, informazioni verificabili.
- 9.3.3 **I crawler delle AI.** Lasciarli entrare o no: le scelte e le conseguenze. **[Verificare]**
- 9.3.4 **Cosa non fare.** Pagine generate in massa.

### 9.4 Condividere e misurare
- 9.4.0 Apertura
- 9.4.1 **Le anteprime sui social.**
- 9.4.2 **Il sito deve ottenere qualcosa.** La conversione in una slide, da Gilberto: dalla visita alla prenotazione.
- 9.4.3 **Statistiche rispettose della privacy.**
- 9.4.4 **[Compito] Il vostro sito si trova?**

---

## Capitolo 10 — Sviluppare una webapp con l'AI

**10.0 Copertina.** Da Da Rina a PrenotaAula: dal sito al prodotto software.

### 10.1 Dal sito alla webapp
- 10.1.0 Apertura
- 10.1.1 **Cosa cambia.** Utenti, dati, permessi, responsabilità (Gilberto).
- 10.1.2 **Quando non serve.** A volte bastano un CMS e un modulo.
- 10.1.3 **[Con l'AI] Dove l'AI rischia di più.** I dati veri degli utenti: qui il vibe coding puro non basta.

### 10.2 Progettare i dati
*Sezione nuova, da Gilberto e Beatrice.*
- 10.2.0 Apertura
- 10.2.1 **Le cose di cui parla l'app.** Utenti, aule, prenotazioni.
- 10.2.2 **Tabelle, righe, colonne.**
- 10.2.3 **Chiavi e relazioni.** Ogni prenotazione punta a un'aula e a un utente.
- 10.2.4 **Vincoli.** Due prenotazioni non possono sovrapporsi.
- 10.2.5 **[Con l'AI] Lo schema nel CLAUDE.md.** Far proporre lo schema a Claude e verificarlo con la classe.
- 10.2.6 **Supabase passo per passo.** **[Verificare]**
- 10.2.7 **I backup.** Riprende «Git non è un backup» (4.3.8).

### 10.3 Le quattro operazioni
- 10.3.0 Apertura
- 10.3.1 **CRUD.** Creare, leggere, modificare, cancellare una prenotazione.
- 10.3.2 **Dal pulsante al database.** Riprende la 2.3.8.
- 10.3.3 **[Attività] Il CRUD delle prenotazioni.** Con Claude Code, criteri compresi.

### 10.4 Chi sei e cosa puoi fare
- 10.4.0 Apertura
- 10.4.1 **Autenticazione e autorizzazione.** Chi sei, e cosa puoi fare.
- 10.4.2 **Ruoli.** Studente, docente, segreteria.
- 10.4.3 **Non inventatevi l'autenticazione.**
- 10.4.4 **I permessi sulle righe.**
- 10.4.5 **[Con l'AI] L'errore classico del codice generato.** Il controllo fatto solo nel browser.

*Approfondimento (si apre da 10.4.3).*
- 10.4.a1 **«Accedi con Google».**

### 10.5 Quando le cose vanno storte
- 10.5.0 Apertura
- 10.5.1 **I casi limite.** Aula occupata, doppio clic, rete che cade, utente non autorizzato.
- 10.5.2 **Messaggi d'errore per le persone.** Riprende la 7.2.
- 10.5.3 **[Con l'AI] Chiedere i casi limite prima del codice.**

### 10.6 API esterne e chiavi
- 10.6.0 Apertura
- 10.6.1 **Chiavi pubbliche e segrete.**
- 10.6.2 **Il file .env e le variabili su Vercel.**
- 10.6.3 **Un piccolo backend senza server.** Le funzioni serverless.

*Approfondimento (si apre da 10.6.3).*
- 10.6.a1 **I pagamenti online.**

### 10.7 Un modello AI dentro la webapp
- 10.7.0 Apertura
- 10.7.1 **Cosa si può fare.** Un assistente che trova un'aula libera.
- 10.7.2 **Come funziona.** L'API del modello, la chiave sul server, le istruzioni di sistema.
- 10.7.3 **Dare strumenti al modello.** Interrogare il database in modo controllato (3.2).
- 10.7.4 **Costi e limiti.** Token, tetti di spesa.
- 10.7.5 **I rischi.** Risposte sbagliate, istruzioni nascoste (5.3.2), dire che è un'AI.
- 10.7.6 **[Attività] L'assistente di PrenotaAula.**

*Approfondimento (si apre da 10.7.3).*
- 10.7.a1 **Risposte strutturate.** Il modello che risponde in JSON.
- 10.7.a2 **Scegliere il modello per un'app.** Riprende 1.3.4.

### 10.8 Quanto costa
- 10.8.0 Apertura
- 10.8.1 **La mappa dei costi.** **[Scheda aggiornabile]**
- 10.8.2 **[Compito] Una funzione con i dati.**

---

## Capitolo 11 — Verificare: test e qualità

**11.0 Copertina.** Non fidarsi di un prodotto solo perché sembra funzionare.

### 11.1 Verificare è il lavoro vero
- 11.1.0 Apertura
- 11.1.1 **Verificare è il lavoro vero.** Riprende la 1.3.6.
- 11.1.2 **Tre livelli di test.** Funziona? È facile da usare? È sicuro, veloce, accessibile? (Gilberto)
- 11.1.3 **«Controlla che tutto funzioni» non è un test.**

### 11.2 Test con l'AI
- 11.2.0 Apertura
- 11.2.1 **Test ricavati dai criteri di accettazione.** Riprende la 2.6.6.
- 11.2.2 **[Con l'AI] Claude scrive i test.** Test automatici leggeri, poi controllare che controllino davvero (Beatrice).
- 11.2.3 **[Con l'AI] Claude prova nel browser.** Navigare il sito e segnalare i problemi.
- 11.2.4 **[Con l'AI] Un secondo agente che rilegge.**
- 11.2.5 **Prove a mano con le persone.** Un test di usabilità in cinque minuti.

*Approfondimento (si apre da 11.2.2).*
- 11.2.a1 **Playwright da vicino.**
- 11.2.a2 **Test che girano a ogni push.** Riprende 4.6.a1.

### 11.3 La sicurezza del codice generato
- 11.3.0 Apertura
- 11.3.1 **Pensare come chi attacca.**
- 11.3.2 **[Con l'AI] Gli errori di sicurezza tipici dell'AI.** Chiavi nel frontend, controlli solo nel browser, database aperto, librerie vecchie o inventate.
- 11.3.3 **Le iniezioni.** L'idea e la difesa.
- 11.3.4 **Aggiornare le dipendenze.**
- 11.3.5 **[Con l'AI] La revisione di sicurezza.** Cosa chiedere a Claude.

*Approfondimento (si apre da 11.3.1).*
- 11.3.a1 **La OWASP Top 10.**

### 11.4 Privacy e prestazioni
- 11.4.0 Apertura
- 11.4.1 **Cookie e informativa.**
- 11.4.2 **I servizi esterni che raccolgono dati.**
- 11.4.3 **Velocità.** Lighthouse e le correzioni più comuni.

### 11.5 Dopo il lancio
*Sezione nuova, da Gilberto.*
- 11.5.0 Apertura
- 11.5.1 **Pubblicare non è finire.**
- 11.5.2 **Log ed errori in produzione.** Dove guardarli su Vercel e Supabase.
- 11.5.3 **[Con l'AI] Dal log alla correzione.** Dare a Claude l'errore vero, senza dati personali (5.2).

### 11.6 Prima del lancio
- 11.6.0 Apertura
- 11.6.1 **La checklist di pubblicazione.** **[Checklist]**
- 11.6.2 **[Attività] Revisione incrociata.**

---

## Capitolo 12 — Gestire e consegnare il prodotto

**12.0 Copertina.**

### 12.1 Il debito tecnico
*Sezione nuova, da Gilberto.*
- 12.1.0 Apertura
- 12.1.1 **Le scorciatoie di oggi sono il lavoro di domani.**
- 12.1.2 **[Con l'AI] Perché il vibe coding accumula debito.** Si produce troppo in fretta per capire tutto.
- 12.1.3 **[Con l'AI] Ripagare il debito.** Refactoring guidati (6.5.6), CLAUDE.md aggiornato.

### 12.2 La consegna professionale
*Diventa una sezione centrale, come chiede Gilberto.*
- 12.2.0 Apertura
- 12.2.1 **Di chi sono le chiavi.** Repository, dominio, Vercel, Supabase, accessi a Keystatic: intestati al cliente.
- 12.2.2 **Come il cliente aggiorna i contenuti.** Il pannello Keystatic e un breve manuale.
- 12.2.3 **Backup e ripristino.**
- 12.2.4 **Documentare.** README, CLAUDE.md, decisioni prese.
- 12.2.5 **[Con l'AI] Il passaggio a un altro sviluppatore, o a un altro agente.** Il CLAUDE.md è la documentazione per l'AI di chi verrà dopo.
- 12.2.6 **[Checklist] La consegna.**

### 12.3 Lavorare con gli agenti nel tempo
- 12.3.0 Apertura
- 12.3.1 **Agenti in background e su GitHub.** **[Scheda aggiornabile]**
- 12.3.2 **Più agenti in parallelo.** Riprende 4.7.a1.
- 12.3.3 **Attività programmate.**
- 12.3.4 **Restare al comando.**

### 12.4 I mestieri del web con l'AI
- 12.4.0 Apertura
- 12.4.1 **Cosa cambia con l'AI.** Riprende la 5.5.4.
- 12.4.2 **Le competenze che contano di più.** Capire, verificare, comunicare, dirigere.
- 12.4.3 **Continuare a imparare.**

### 12.5 Chiusura del corso
- 12.5.0 Apertura
- 12.5.1 **Il portfolio.** Raccontare un progetto: cosa ha fatto l'AI e cosa avete fatto voi.
- 12.5.2 **Come si presenta un progetto.** Prodotto, problema, scelte, stack, limiti, verifiche, istruzioni per mantenerlo (Gilberto).
- 12.5.3 **La rubrica di valutazione.** Funzionalità, UX e UI, qualità tecnica, sicurezza, accessibilità, affidabilità, autonomia, documentazione.
- 12.5.4 **[Attività] Presentazioni finali.**
- 12.5.5 **Retrospettiva.**
- 12.5.6 **[Attività] Il dibattito conclusivo.** Le domande della 5.6, con l'esperienza fatta.
- 12.5.7 **Fine.**

---

## Pagine di consultazione

Realizzate; indice in `/schede/`, richiamate dalla home e dalle slide collegate.

**Schede operative:**
- S.1 Glossario unico, con rimando alle slide: `/schede/glossario/`, generato dalle voci scritte nelle slide
- S.2 Comandi del terminale: `/schede/terminale/`
- S.3 Comandi di Git e problemi tipici: `/schede/git/`
- S.4 Modelli di prompt: `/schede/prompt/`
- S.5 CLAUDE.md di partenza (sito Astro + Keystatic, webapp con Supabase): `/schede/claude-md/`
- S.6 Schema Keystatic di partenza: `/schede/schema-keystatic/`
- S.7 Template: brief, storie utente e criteri di accettazione, requisiti: `/schede/template-progetto/`
- S.8 Checklist dei dati: «si può incollare?»: `/schede/si-puo-incollare/`
- S.9 Checklist di sicurezza: `/schede/checklist-sicurezza/`
- S.10 Checklist di accessibilità: `/schede/checklist-accessibilita/`
- S.11 Checklist SEO: `/schede/checklist-seo/`
- S.12 Checklist di test: `/schede/checklist-test/`
- S.13 Checklist di pubblicazione: `/schede/checklist-pubblicazione/`
- S.14 Checklist di consegna: `/schede/checklist-consegna/`
- S.15 Rubrica di valutazione: `/schede/rubrica/` (i quattro livelli sono una proposta da rivedere)

**Schede aggiornabili,** ognuna con la data dell'ultimo controllo:
- U.1 I laboratori e i loro modelli: `/schede/laboratori-modelli/`
- U.2 I modelli di Claude: `/schede/modelli-claude/`
- U.3 I prodotti e gli agenti di Claude: `/schede/prodotti-claude/`
- U.4 Impostazioni sulla privacy dei principali servizi: `/schede/privacy-servizi/`
- U.5 Strumenti di design e generazione di media: `/schede/strumenti-design/`
- U.6 Costi e piani gratuiti: `/schede/costi-piani/`

**Per saperne di più:** le fonti, capitolo per capitolo: `/fonti/`, generata dai link delle slide.

## I quiz dei capitoli

Realizzati; uno per capitolo, in `/capitolo-N/quiz/`. Le domande stanno in `src/capitoli/capitolo-N/quiz.ts`.

- **Come si svolge.**
  - 20 domande a risposta multipla, 5 opzioni (A–E), una sola giusta.
  - Una domanda alla volta: si può saltare una domanda, tornare indietro, cambiare la risposta o lasciarla in bianco fino alla consegna.
  - Le risposte restano nel browser finché non si rifà il quiz.
- **Punteggio in centesimi.**
  - +5 per ogni risposta giusta, −1 per ogni sbagliata, 0 per ogni domanda lasciata vuota.
  - Il massimo è 100; il minimo è −20, e si mostra così com'è.
- **Dopo la consegna,** per ogni domanda:
  - la risposta giusta e quella data;
  - una spiegazione breve: perché è giusta e dov'era la trappola;
  - il link alla slide da ripassare.
- **Su cosa vertono.**
  - Circa 16-17 domande sul percorso principale, distribuite su tutte le sezioni.
  - 2-4 sugli approfondimenti, nei capitoli che ne hanno.
  - Solo quello che dicono le slide, e niente che invecchia: versioni, prezzi, prodotti e interfacce stanno nelle schede aggiornabili.
- **Come sono scritte.**
  - Non banali, con qualche trabocchetto leale: casi concreti (Da Rina, PrenotaAula), concetti vicini da distinguere, «quale **non**…», affermazioni quasi giuste.
  - Opzioni di lunghezza simile.
  - Ogni lettera è quella giusta 4 volte per capitolo.
- **Non è una prova sicura.** Il sito è statico: le risposte stanno nella pagina, codificate ma leggibili da chi le cerca. Serve per l'autoverifica, o come prova in aula sotto gli occhi del docente.

## Cosa non ho accolto dei commenti, e perché

- **Spostare la pratica prima di Git e dell'etica** (Beatrice). La pratica in aula comincia già dal capitolo 1; il sito non la riporta.
- **La filosofia tutta in appendice** (tutti e due). Responsabilità e diritti restano nel percorso principale; la parte speculativa va negli approfondimenti, il dibattito resta.
- **Il capitolo 2 che parte dal web** (Gilberto). «Cosa e per chi» viene prima delle tecnologie.
- **Il terminale, lo spettro degli strumenti, le parole chiave, la tabella skill e subagent, i linguaggi in appendice** (Gilberto). Sono il cuore del corso. Diventano schede aggiornabili solo gli elenchi che invecchiano.
- **La SEO dentro i capitoli 6 e 7** (Beatrice). Resta un capitolo a sé, più snello e centrato sulla ricerca con l'AI.
- **Gli approfondimenti su Docker, TypeScript e i framework a confronto** (Gilberto). Sono sviluppo generico, fuori tema.
- **Funnel e statistiche approfonditi** (Gilberto). Ridotti a una slide sulla conversione.
- **Il nome «AI-assisted product development»** (Gilberto). Al massimo un sottotitolo per le aziende.
