// resources/topics/mukb/data/sections/02-lastenheft.js

export const section = {
    id: 'lastenheft',
    titleDe: '2. Lastenheft (Auftraggeberin)',
    titleEn: '2. Requirements Specification (Client)',
    introDe: 'Das Lastenheft beschreibt aus Sicht der Auftraggeberin, was die Kanzlei leisten können soll. Es ist Grundlage für Angebot und weitere Abstimmung.',
    introEn: 'The requirements specification describes, from the clients perspective, what the firm must be able to do. It is the basis for the offer and further coordination.',
    subtopics: [
        {
            id: 'rahmen',
            titleDe: '2.1 Ausgangslage und Projektziel',
            titleEn: '2.1 Starting Situation and Project Goal',
            htmlDe: `
            <blockquote class="border-l-4 border-[var(--accent-amber)] pl-4 italic text-[var(--text-color)] my-3">
              „Ich möchte meine eigene Kanzlei eröffnen und mich auf meine Arbeit verlassen können. Bitte entwickeln Sie eine Lösung, die zu meinem Alltag, meinem Team und meinem Budget passt.“
            </blockquote>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th class="w-1/4">Merkmal</th><th>Angabe</th></tr>
            <tr><td>Auftraggeberin</td><td class="text-[var(--text-muted)]">Nora Bergmann, Rechtsanwältin, Kanzlei Bergmann</td></tr>
            <tr><td>Projektstandort</td><td class="text-[var(--text-muted)]">Lindenweg 18, 00000 Lindenhagen (fiktiv)</td></tr>
            <tr><td>Dokumentstand</td><td class="text-[var(--text-muted)]">Version 1.0 / 21.10.2026</td></tr>
            <tr><td>Geplanter Start</td><td class="text-[var(--text-muted)]">12 Kalenderwochen nach Kick-off</td></tr>
            <tr><td>Finanzrahmen</td><td class="text-[var(--text-muted)]">35.000 € brutto einmalig, davon 3.500 € Reserve; 950 € brutto monatlich Zielobergrenze</td></tr>
            </table></div>
            <p class="text-[var(--text-muted)] mt-3">Ich verlasse eine bisherige Sozietät und eröffne eine eigene Einzelkanzlei für Arbeitsrecht und allgemeines Zivilrecht. Eine notarielle Tätigkeit ist nicht vorgesehen. Die Räume sind angemietet, die Schlüssel übergeben. Eine eigene betriebsfähige Büro-IT ist noch nicht vorhanden.</p>
            <p class="text-[var(--text-muted)]">Ich beauftrage Sie, meinen Bedarf mit mir zu klären und eine wirtschaftliche, verlässliche und betreubare IT-Lösung vorzuschlagen. Dieses Lastenheft beschreibt meine Erwartungen aus Kundensicht. Die konkrete technische Umsetzung, Produktauswahl und Ausarbeitung des Pflichtenhefts liegen bei Ihnen und werden mit mir abgestimmt.</p>`,
            htmlEn: `
            <blockquote class="border-l-4 border-[var(--accent-amber)] pl-4 italic text-[var(--text-color)] my-3">
              "I want to open my own law firm and be able to rely on my work. Please develop a solution that fits my everyday life, my team and my budget."
            </blockquote>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th class="w-1/4">Feature</th><th>Detail</th></tr>
            <tr><td>Client</td><td class="text-[var(--text-muted)]">Nora Bergmann, attorney, Kanzlei Bergmann</td></tr>
            <tr><td>Project location</td><td class="text-[var(--text-muted)]">Lindenweg 18, 00000 Lindenhagen (fictional)</td></tr>
            <tr><td>Document version</td><td class="text-[var(--text-muted)]">Version 1.0 / 21 Oct 2026</td></tr>
            <tr><td>Planned start</td><td class="text-[var(--text-muted)]">12 calendar weeks after kick-off</td></tr>
            <tr><td>Financial frame</td><td class="text-[var(--text-muted)]">€35,000 gross one-off, of which €3,500 reserve; €950 gross monthly target ceiling</td></tr>
            </table></div>
            <p class="text-[var(--text-muted)] mt-3">I am leaving my previous firm and opening a sole practice in labour law and general civil law. No notarial work is planned. The premises are rented, keys handed over. No operational office IT exists yet.</p>
            <p class="text-[var(--text-muted)]">I instruct you to establish my needs with me and propose an economical, reliable and supportable IT solution. This specification describes my expectations from the customer's perspective. The concrete technical implementation, product selection and elaboration of the specification are your responsibility and are agreed with me.</p>`
        },
        {
            id: 'team-arbeitsablaeufe',
            titleDe: '2.2 Team und Arbeitsumgebung',
            titleEn: '2.2 Team and Working Environment',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Zum Start arbeiten vier Personen in der Kanzlei: ich als Rechtsanwältin, Lea König als Rechtsanwaltsfachangestellte in Vollzeit, Eva Reuter als Rechtsanwaltsfachangestellte in Teilzeit sowie Mila Winter als Auszubildende. Alle vier können gleichzeitig vor Ort arbeiten. In etwa 18 Monaten könnte eine weitere Anwältin hinzukommen; eine Zusage gibt es noch nicht.</p>
            <p class="text-[var(--text-muted)]">Das Gebäude hat 216 m² Grundfläche nach Außenmaß. Büro, Teambüro, Empfang, Besprechung, Reservebüro, Küche, Archiv, Technik-/Abstellraum und getrennte WCs sind in der Raumskizze der Kundenakte dargestellt. Die passende Zahl und Art der IT-Geräte soll aus den Aufgaben ermittelt werden.</p>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">At launch four people work in the firm: myself as attorney, Lea König as full-time legal assistant, Eva Reuter as part-time legal assistant, and Mila Winter as trainee. All four can work on site simultaneously. In about 18 months an additional attorney could join; no commitment yet.</p>
            <p class="text-[var(--text-muted)]">The building has 216 m² gross floor area. Offices, team office, reception, meeting room, reserve office, kitchen, archive, technical/storage room and separate WCs are shown in the case file floor plan. The appropriate number and type of IT devices are to be determined from the tasks.</p>`
        },
        {
            id: 'anforderungen-l01-l04',
            titleDe: '2.3 Anforderungen L-01 bis L-04',
            titleEn: '2.3 Requirements L-01 to L-04',
            htmlDe: `
            <div class="space-y-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-01 · Gemeinsame Akten- und Dokumentenarbeit</h4>
                <p class="text-sm text-[var(--text-muted)]">Mein Team und ich sollen die für unsere Aufgaben benötigten Akten und Dokumente zuverlässig finden, bearbeiten und eindeutig zuordnen können. Verwechslungen, unkontrollierte Mehrfachstände und versehentliche Überschreibungen sollen vermieden werden. Zuständigkeiten und Freigaben sind mit mir abzustimmen.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-02 · Post, Fristen und elektronischer Rechtsverkehr</h4>
                <p class="text-sm text-[var(--text-muted)]">Eingehende Papier- und elektronische Post soll zeitnah in die Bearbeitung gelangen. Fristen, Vertretung und Kontrollen müssen im neuen Arbeitsablauf berücksichtigt werden. Ich besitze bereits ein eigenes beA aus meiner bisherigen Tätigkeit. Welche Zugänge, Berechtigungen und technischen Voraussetzungen beim Wechsel zu prüfen oder anzupassen sind, ist Teil Ihrer Bedarfsklärung. Die juristische Verantwortung verbleibt bei mir.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-03 · Kommunikation, Drucken und Scannen</h4>
                <p class="text-sm text-[var(--text-muted)]">Empfang und Teambüro sollen telefonisch erreichbar sein und zwei externe Gespräche gleichzeitig bearbeiten können. Die bisherige geschäftliche Rufnummer möchte ich behalten, sofern dies vereinbart und möglich ist. Unterlagen sollen gemeinsam gedruckt und beidseitig gescannt werden können. Als Mengengerüst gelten etwa 60 Scan-Seiten und 40 Druckseiten je Arbeitstag. Vertrauliche Ausdrucke dürfen nicht unbeaufsichtigt für Besucher zugänglich sein.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-04 · Arbeiten bei Gericht und von zu Hause</h4>
                <p class="text-sm text-[var(--text-muted)]">Ich habe ungefähr drei Gerichtstermine pro Woche und möchte etwa an einem Abend pro Woche von zu Hause arbeiten. Wichtige Unterlagen sollen bedarfsgerecht verfügbar sein. Unterwegs ist eine Internetverbindung nicht immer gesichert. Den benötigten Funktionsumfang, geeignete Geräte und die Grenzen mobiler Arbeit möchte ich mit Ihnen festlegen.</p>
              </div>
            </div>`,
            htmlEn: `
            <div class="space-y-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-01 · Shared file and document work</h4>
                <p class="text-sm text-[var(--text-muted)]">My team and I must be able to find, edit and unambiguously assign the files and documents needed for our tasks. Confusion, uncontrolled duplicate versions and accidental overwrites must be avoided. Responsibilities and approvals are to be agreed with me.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-02 · Mail, deadlines and electronic legal communications</h4>
                <p class="text-sm text-[var(--text-muted)]">Incoming paper and electronic mail must reach processing promptly. Deadlines, representation and controls must be considered in the new workflow. I already have my own beA (electronic attorney mailbox) from my previous work. Which accesses, permissions and technical prerequisites must be checked or adjusted during the transition is part of your requirements analysis. Legal responsibility remains with me.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-03 · Communication, printing and scanning</h4>
                <p class="text-sm text-[var(--text-muted)]">Reception and team office must be reachable by telephone and handle two external calls simultaneously. I want to keep the previous business number if agreed and possible. Documents must be printable jointly and scannable double-sided. Volume: approx. 60 scan pages and 40 printed pages per working day. Confidential printouts must not be unattended and accessible to visitors.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-04 · Working at court and from home</h4>
                <p class="text-sm text-[var(--text-muted)]">I have about three court appointments per week and want to work from home roughly one evening per week. Important documents must be available as needed. Internet connectivity is not always assured on the move. I want to agree the required scope of functions, suitable devices and limits of mobile working with you.</p>
              </div>
            </div>`
        },
        {
            id: 'anforderungen-l05-l09',
            titleDe: '2.4 Anforderungen L-05 bis L-09',
            titleEn: '2.4 Requirements L-05 to L-09',
            htmlDe: `
            <div class="space-y-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-05 · Schutz vertraulicher Informationen</h4>
                <p class="text-sm text-[var(--text-muted)]">Mandatsinformationen, persönliche Daten, Personalunterlagen und Zugangsdaten sind vor unbefugtem Zugriff zu schützen. Jede Person soll nur die Informationen und Funktionen nutzen können, die sie für ihre Aufgabe benötigt. Besucher oder private Geräte dürfen keinen unberechtigten Zugang erhalten. Das gilt auch für Bildschirmansichten, Ausdrucke und die Arbeit außerhalb der Kanzlei.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-06 · Geeignete Software und geregelte Dienstleisterzugriffe</h4>
                <p class="text-sm text-[var(--text-muted)]">Für die eingesetzten Programme benötige ich nachvollziehbare Nutzungsrechte für den vereinbarten Kanzleibetrieb. Verträge oder Lizenzen der alten Sozietät dürfen nicht ohne belegte Berechtigung übernommen werden. Berücksichtigen Sie die für meine Tätigkeit relevanten Anforderungen an Verschwiegenheit, Datenschutz und elektronischen Rechtsverkehr. Externe Betreuung oder Cloud-Dienste schließe ich nicht aus; Zugriffe, Zuständigkeiten und benötigte Vereinbarungen müssen vorab transparent sein.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-07 · Datenerhalt und Wiederanlauf</h4>
                <p class="text-sm text-[var(--text-muted)]">Akten und wichtige Arbeitsdaten sollen gegen Verlust geschützt und nach einer Störung wieder nutzbar sein. Mein Planungsziel bei einem lokalen Systemausfall ist, innerhalb von vier Stunden wieder am wesentlichen Aktenbestand arbeiten zu können. Mehr als zwei Betriebsstunden verlorene Änderungen wären für mich problematisch. Prüfen Sie die Erreichbarkeit dieser Ziele und erläutern Sie Voraussetzungen, Kosten, abgedeckte Störungen und verbleibende Grenzen, bevor ich die Lösung freigebe.</p>
                <p class="text-sm text-[var(--text-muted)]"><strong>Besonderer Fall: drohender Fristablauf.</strong> Bei einer kurzfristig ablaufenden Gerichtsfrist kann bereits eine deutlich kürzere Unterbrechung kritisch sein. Deshalb benötige ich neben dem technischen Wiederanlauf einen abgestimmten organisatorischen Notfallweg. Rechtsfragen, Zuständigkeiten und zulässige Ersatzverfahren werden gesondert mit mir geklärt.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-08 · Bedienung, Betreuung und Wartung</h4>
                <p class="text-sm text-[var(--text-muted)]">Die Lösung soll für mich und mein Team verständlich bedienbar sein. Ich benötige eine praktische Einweisung, kurze Anleitungen und einen eindeutigen Ansprechpartner. Gewünscht ist Betreuung werktags von 08:00 bis 18:00 Uhr mit möglichst erster Rückmeldung innerhalb von 30 Minuten bei einem Totalausfall. Verbindliche Serviceleistungen sind gesondert zu vereinbaren. Wartung ist nach Absprache dienstags nach 18:00 Uhr oder freitags nach 15:00 Uhr möglich.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-09 · Erweiterung und späterer Wechsel</h4>
                <p class="text-sm text-[var(--text-muted)]">Eine zusätzliche Anwältin soll ohne unnötigen grundlegenden Neuaufbau eingebunden werden können. Bei einem späteren Anbieterwechsel müssen meine Daten in einem vereinbarten nutzbaren Umfang zugänglich und übernehmbar bleiben. Erläutern Sie dabei auch mögliche Abhängigkeiten und Zusatzkosten.</p>
              </div>
            </div>`,
            htmlEn: `
            <div class="space-y-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-05 · Protection of confidential information</h4>
                <p class="text-sm text-[var(--text-muted)]">Case information, personal data, HR records and access credentials must be protected from unauthorised access. Each person shall only be able to use the information and functions needed for their task. Visitors or private devices must not obtain unauthorised access. This also applies to screen views, printouts and work outside the firm.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-06 · Suitable software and regulated service-provider access</h4>
                <p class="text-sm text-[var(--text-muted)]">For the programs used I require verifiable usage rights for the agreed firm operation. Contracts or licences of the old firm must not be adopted without documented entitlement. Consider the requirements for confidentiality, data protection and electronic legal communications relevant to my work. I do not exclude external support or cloud services; accesses, responsibilities and required agreements must be transparent in advance.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-07 · Data retention and restart</h4>
                <p class="text-sm text-[var(--text-muted)]">Files and important working data must be protected against loss and usable again after a disruption. My planning target in a local system failure is to work on the essential file base again within four hours. More than two operating hours of lost changes would be problematic for me. Check the achievability of these targets and explain prerequisites, costs, covered disruptions and remaining limits before I approve the solution.</p>
                <p class="text-sm text-[var(--text-muted)]"><strong>Special case: imminent deadline.</strong> With a court deadline expiring at short notice, even a significantly shorter interruption can be critical. I therefore need, alongside technical restart, an agreed organisational emergency path. Legal questions, responsibilities and permissible substitute procedures are to be clarified separately with me.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-08 · Operation, support and maintenance</h4>
                <p class="text-sm text-[var(--text-muted)]">The solution must be understandable and operable for me and my team. I need practical training, short guides and a clear contact person. Support on working days 08:00–18:00 with initial response within 30 minutes in case of total failure is desired. Binding service levels are to be agreed separately. Maintenance is possible by arrangement on Tuesdays after 18:00 or Fridays after 15:00.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">L-09 · Expansion and later change of provider</h4>
                <p class="text-sm text-[var(--text-muted)]">An additional attorney must be able to be integrated without an unnecessary fundamental rebuild. In a later provider change, my data must remain accessible and transferable to an agreed usable extent. Explain possible dependencies and additional costs.</p>
              </div>
            </div>`
        },
        {
            id: 'kosten-termine',
            titleDe: '2.5 Kosten und Freigaben',
            titleEn: '2.5 Costs and Approvals',
            htmlDe: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Rahmen</th><th>Erwartung der Auftraggeberin</th></tr>
            <tr><td>Einmalige Kosten</td><td class="text-[var(--text-muted)]">35.000 € brutto insgesamt. Enthalten sein sollen IT-Ausstattung, Einrichtung, notwendige Anschluss-/Installationsleistungen, Einweisung und einmalige Anbieter- oder Softwaregebühren.</td></tr>
            <tr><td>Reserve</td><td class="text-[var(--text-muted)]">3.500 € bleiben innerhalb des Gesamtbudgets als Reserve. Zunächst verplanbarer Betrag: 31.500 € brutto. Nutzung der Reserve nur nach Abstimmung.</td></tr>
            <tr><td>Laufende Kosten</td><td class="text-[var(--text-muted)]">Möglichst höchstens 950 € brutto pro Monat für notwendige Programme, Kommunikation, IT-Betrieb und Betreuung. Verbrauchskosten und optionale Leistungen getrennt ausweisen.</td></tr>
            <tr><td>Kostenübersicht</td><td class="text-[var(--text-muted)]">Einmalige und wiederkehrende Kosten, Vertragslaufzeiten und Gesamtkosten über 36 Monate nachvollziehbar darstellen.</td></tr>
            <tr><td>Nicht enthalten</td><td class="text-[var(--text-muted)]">Miete, Möbel und allgemeine Renovierung sind separat finanziert. Benötigte IT-bezogene Fremdleistungen gehören in die Projektkalkulation.</td></tr>
            </table></div>
            <p class="text-[var(--text-muted)] mt-3">Mehrkosten oder Änderungen des Umfangs dürfen nicht stillschweigend entstehen. Legen Sie Auswirkungen auf Budget, Termin und Leistung zur Entscheidung vor. Eine zusätzliche Finanzierung ist bisher nicht zugesagt.</p>`,
            htmlEn: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Frame</th><th>Client expectation</th></tr>
            <tr><td>One-off costs</td><td class="text-[var(--text-muted)]">€35,000 gross in total, covering IT equipment, setup, necessary connection/installation services, training and one-off provider or software fees.</td></tr>
            <tr><td>Reserve</td><td class="text-[var(--text-muted)]">€3,500 to remain within the total budget as reserve. Initially plannable amount: €31,500 gross. Use of reserve only by agreement.</td></tr>
            <tr><td>Recurring costs</td><td class="text-[var(--text-muted)]">At most €950 gross per month where possible for necessary programs, communication, IT operations and support. Show consumption costs and optional services separately.</td></tr>
            <tr><td>Cost overview</td><td class="text-[var(--text-muted)]">Show one-off and recurring costs, contract terms and total costs over 36 months transparently.</td></tr>
            <tr><td>Not included</td><td class="text-[var(--text-muted)]">Rent, furniture and general renovation are separately funded. Required IT-related third-party services belong in the project calculation.</td></tr>
            </table></div>
            <p class="text-[var(--text-muted)] mt-3">Additional costs or scope changes must not arise silently. Present impacts on budget, schedule and performance for decision. Additional financing has not been committed.</p>`
        },
        {
            id: 'termine-raeume-abhaengigkeiten',
            titleDe: '2.6 Termin, Räume und externe Abhängigkeiten',
            titleEn: '2.6 Schedule, Premises and External Dependencies',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Die Eröffnung ist zwölf Kalenderwochen nach dem Kick-off geplant. Ein eigener Anschluss ist noch nicht beauftragt. Unverbindlich genannt wurden DSL bis 100/40 Mbit/s in vier bis sechs Wochen und Glasfaser 500/100 Mbit/s in zehn bis vierzehn Wochen. Verfügbarkeit, Verträge und Termine sind nicht bestätigt; Mobilfunk wurde nicht gemessen.</p>
            <p class="text-[var(--text-muted)]">Es gibt keine nutzbare Datenverkabelung. Vorhandene Steckdosen, mögliche Kabelwege und der abschließbare Technik-/Abstellraum sind noch nicht fachlich auf Eignung geprüft. Bauliche Eingriffe und Arbeiten an der Elektroinstallation benötigen Zustimmung der Vermietung sowie geeignete Fachbetriebe.</p>
            <p class="text-[var(--text-muted)]">Lea koordiniert Rückfragen und Termine. Über Budget, Leistungen und Freigaben entscheidet Nora. Für Gebäudeänderungen ist Mara Voigt als Vertreterin der Vermietung einzubeziehen. Abhängigkeiten von Anbietern oder Fachbetrieben sollen früh sichtbar werden; ungeklärte Lieferzeiten dürfen nicht als gesichert eingeplant werden.</p>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">The opening is planned twelve calendar weeks after kick-off. No own connection has been ordered yet. Non-binding indications: DSL up to 100/40 Mbit/s in four to six weeks; fibre 500/100 Mbit/s in ten to fourteen weeks. Availability, contracts and dates are unconfirmed; mobile signal unmeasured.</p>
            <p class="text-[var(--text-muted)]">No usable data cabling exists. Existing sockets, possible cable routes and the lockable technical/storage room have not been professionally assessed for suitability. Structural interventions and work on the electrical installation require landlord approval and qualified specialist firms.</p>
            <p class="text-[var(--text-muted)]">Lea coordinates queries and appointments. Nora decides on budget, services and approvals. Mara Voigt represents the landlord for building changes. Dependencies on providers or specialist firms must become visible early; unresolved delivery times must not be planned as secure.</p>`
        },
        {
            id: 'datenuebernahme',
            titleDe: '2.7 Datenübernahme und offene Entscheidungen',
            titleEn: '2.7 Data Transfer and Open Decisions',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Mit meiner bisherigen Tätigkeit stehen etwa 280 laufende und 650 abgeschlossene Akten in Verbindung. Als erste Größenannahme gelten 180 GB Daten und etwa 30 GB jährliches Wachstum. Welche Mandate tatsächlich übernommen werden und welche Unterlagen übertragen werden dürfen, ist noch nicht vereinbart. Ein freigegebener Export liegt nicht vor. Eine vollständige Kopie des Sozietätsbestands ist nicht beauftragt.</p>
            <p class="text-[var(--text-muted)]">Vor einer Umsetzung sind insbesondere folgende Punkte mit mir oder den zuständigen Stellen zu klären:</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Entscheidungsfeld</th><th>Noch zu vereinbaren oder nachzuweisen</th></tr>
            <tr><td>Arbeitsorganisation</td><td class="text-[var(--text-muted)]">Benötigte Funktionen, Rollen, Freigaben, Fristenkontrolle und Vertretung.</td></tr>
            <tr><td>Programme und Daten</td><td class="text-[var(--text-muted)]">Produktauswahl, Lizenz-/Vertragslage, nutzbarer Übernahmebestand, Format und Freigaben.</td></tr>
            <tr><td>Technik und Termine</td><td class="text-[var(--text-muted)]">Gerätebedarf, Standortbedingungen, Anschluss, Rufnummer und Bereitstellung externer Dienste.</td></tr>
            <tr><td>Betrieb und Störungen</td><td class="text-[var(--text-muted)]">Mobile Arbeit, Wiederanlaufziele, Notfallweg, Betreuung und Verantwortliche.</td></tr>
            </table></div>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">My previous work is associated with about 280 active and 650 closed files. First size estimate: 180 GB data and about 30 GB annual growth. Which mandates are actually taken over and which documents may be transferred is not yet agreed. No approved export exists. A complete copy of the firm's holdings is not commissioned.</p>
            <p class="text-[var(--text-muted)]">Before implementation, the following points in particular must be clarified with me or the responsible parties:</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Decision area</th><th>To be agreed or demonstrated</th></tr>
            <tr><td>Work organisation</td><td class="text-[var(--text-muted)]">Required functions, roles, approvals, deadline control and representation.</td></tr>
            <tr><td>Programs and data</td><td class="text-[var(--text-muted)]">Product selection, licence/contract situation, usable transfer set, format and approvals.</td></tr>
            <tr><td>Technology and dates</td><td class="text-[var(--text-muted)]">Device needs, site conditions, connection, telephone number and provisioning of external services.</td></tr>
            <tr><td>Operations and disruptions</td><td class="text-[var(--text-muted)]">Mobile work, restart targets, emergency path, support and responsible parties.</td></tr>
            </table></div>`
        },
        {
            id: 'abnahme',
            titleDe: '2.8 Entscheidungsgrundlage, Übergabe und Abnahme',
            titleEn: '2.8 Decision Basis, Handover and Acceptance',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Ich erwarte ein verständliches Angebot mit begründeter Empfehlung, nachvollziehbaren Alternativen, vollständigen Kosten und einem realistischen Terminplan. Halten Sie offene Fragen, Annahmen und erforderliche Freigaben fest. Ihr Pflichtenheft soll beschreiben, wie Sie die abgestimmten Anforderungen erfüllen und überprüfen möchten.</p>
            <p class="text-[var(--text-muted)]">Vor der Übergabe möchte ich die vereinbarten Arbeitsabläufe demonstriert bekommen. Datenerhalt und Wiederherstellung, Schutz vor unberechtigten Zugriffen sowie verbleibende Einschränkungen müssen nachvollziehbar belegt sein. Die konkreten Abnahmekriterien und Nachweise schlagen Sie im Pflichtenheft vor und stimmen sie mit mir ab.</p>
            <p class="text-[var(--text-muted)]">Zur Übergabe gehören Einweisung, verständliche Betriebs- und Notfallinformationen, Zuständigkeiten und eine dokumentierte Übersicht offener Mängel. Die Abnahme erfolgt anhand der vereinbarten Leistungen. Nicht behobene kritische Mängel oder ungeklärte Voraussetzungen für den Kanzleistart müssen vor einer Freigabe ausdrücklich entschieden werden.</p>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              <strong>Durchführung im Unterricht:</strong> Praktische Umsetzung ausschließlich in der freigegebenen Laborumgebung mit erfundenen Akten und Personen. Externe Dienste dürfen nach Absprache simuliert werden; Simulationen und tatsächlich geprüfte Funktionen sind klar zu unterscheiden. Reale Mandatsdaten oder produktive Postfächer sind nicht Bestandteil des Unterrichtsauftrags.
            </div>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">I expect a comprehensible offer with a reasoned recommendation, traceable alternatives, complete costs and a realistic schedule. Record open questions, assumptions and required approvals. Your specification should describe how you intend to fulfil and verify the agreed requirements.</p>
            <p class="text-[var(--text-muted)]">Before handover I want the agreed workflows demonstrated. Data retention and recovery, protection against unauthorised access and remaining limitations must be demonstrably evidenced. Propose the concrete acceptance criteria and evidence in the specification and agree them with me.</p>
            <p class="text-[var(--text-muted)]">Handover includes training, comprehensible operating and emergency information, responsibilities and a documented list of open defects. Acceptance is against the agreed services. Unresolved critical defects or unclear prerequisites for the firm launch must be explicitly decided before approval.</p>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              <strong>Classroom execution:</strong> Practical implementation only in the approved lab environment with fictional files and persons. External services may be simulated by agreement; simulations and actually tested functions must be clearly distinguished. Real case data or production mailboxes are not part of the classroom assignment.
            </div>`
        }
    ]
};