// resources/topics/mukb/data/sections/01-kundenakte.js

export const section = {
    id: 'kundenakte',
    titleDe: '1. Kundenakte: Kanzlei Bergmann',
    titleEn: '1. Case File: Bergmann Law Firm',
    introDe: 'Fiktive Kundin Nora Bergmann eröffnet ihre eigene Kanzlei. Wie ihre Büro-IT aussehen wird, sollt ihr mit ihr herausfinden, aus der Akte, euren Fragen und euren Entscheidungen.',
    introEn: 'Fictional client Nora Bergmann is opening her own law firm. Together you will determine what her office IT looks like, from the case file, your questions and your decisions.',
    subtopics: [
        {
            id: 'steckbrief',
            titleDe: '1.1 Steckbrief & Eckdaten',
            titleEn: '1.1 Profile & Key Facts',
            htmlDe: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th class="w-1/4">Merkmal</th><th>Angabe</th></tr>
            <tr><td><strong>Name</strong></td><td class="text-[var(--text-muted)]">Kanzlei Bergmann · Nora Bergmann, Rechtsanwältin</td></tr>
            <tr><td><strong>Standort</strong></td><td class="text-[var(--text-muted)]">Lindenweg 18, 00000 Lindenhagen. Name und Anschrift erfunden. Alleinige Nutzung des Erdgeschossgebäudes.</td></tr>
            <tr><td><strong>Person</strong></td><td class="text-[var(--text-muted)]">43 Jahre, seit 14 Jahren als Rechtsanwältin tätig. Schwerpunkt Arbeitsrecht und allgemeines Zivilrecht. Keine notarielle Tätigkeit.</td></tr>
            <tr><td><strong>Mandantschaft</strong></td><td class="text-[var(--text-muted)]">Privatpersonen und kleinere Unternehmen.</td></tr>
            <tr><td><strong>Öffnung</strong></td><td class="text-[var(--text-muted)]">Mo–Do 08:30–17:00, Fr 08:30–14:00; Termine nach Vereinbarung.</td></tr>
            <tr><td><strong>Team zum Start</strong></td><td class="text-[var(--text-muted)]">Nora Bergmann; Lea König (RA-Fachangestellte, Vollzeit); Eva Reuter (RA-Fachangestellte, Teilzeit); Mila Winter (Auszubildende).</td></tr>
            <tr><td><strong>Perspektive</strong></td><td class="text-[var(--text-muted)]">Eine weitere Anwältin könnte in ca. 18 Monaten hinzukommen. Keine verbindliche Zusage.</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th class="w-1/4">Feature</th><th>Detail</th></tr>
            <tr><td><strong>Name</strong></td><td class="text-[var(--text-muted)]">Kanzlei Bergmann · Nora Bergmann, attorney</td></tr>
            <tr><td><strong>Location</strong></td><td class="text-[var(--text-muted)]">Lindenweg 18, 00000 Lindenhagen. Name and address fictional. Sole use of ground floor.</td></tr>
            <tr><td><strong>Person</strong></td><td class="text-[var(--text-muted)]">43 years old, 14 years as attorney. Labour law and general civil law. No notarial work.</td></tr>
            <tr><td><strong>Client base</strong></td><td class="text-[var(--text-muted)]">Private individuals and smaller companies.</td></tr>
            <tr><td><strong>Opening hours</strong></td><td class="text-[var(--text-muted)]">Mon–Thu 08:30–17:00, Fri 08:30–14:00; appointments by arrangement.</td></tr>
            <tr><td><strong>Starting team</strong></td><td class="text-[var(--text-muted)]">Nora Bergmann; Lea König (full-time legal assistant); Eva Reuter (part-time legal assistant); Mila Winter (trainee).</td></tr>
            <tr><td><strong>Outlook</strong></td><td class="text-[var(--text-muted)]">Possible additional attorney in ~18 months. Not confirmed.</td></tr>
            </table></div>`
        },
        {
            id: 'kundenanfrage',
            titleDe: '1.2 Die Kundenanfrage',
            titleEn: '1.2 The Customer Enquiry',
            htmlDe: `
            <blockquote class="border-l-4 border-[var(--accent-amber)] pl-4 italic text-[var(--text-color)] my-3">
              „Ich möchte in zwölf Wochen mit meiner eigenen Kanzlei starten. Die Räume habe ich, aber bisher keinen Internetanschluss und keine eigene Büro-IT.“
            </blockquote>
            <p class="text-[var(--text-muted)]">„In der bisherigen Kanzlei konnte ich Briefe schreiben, in Akten nachsehen und mit Gerichten kommunizieren. Um die Technik hat sich jemand anderes gekümmert. Welche Verträge oder Programme ich davon mitnehmen kann, weiß ich noch nicht.“</p>
            <p class="text-[var(--text-muted)]">„Meine Assistenz und ich müssen zuverlässig zusammenarbeiten können. Ich bin außerdem regelmäßig bei Gericht und möchte nicht jedes Mal alles ausdrucken. Mir ist wichtig, dass vertrauliche Dinge vertraulich bleiben. Was wir dafür genau benötigen, möchte ich mit Ihnen besprechen.“</p>
            <p class="text-[var(--text-muted)]">„Bitte machen Sie mir nach unserem Gespräch einen nachvollziehbaren Vorschlag. Ich möchte verstehen, was ich kaufe, was dauerhaft kostet und wer später mein Ansprechpartner ist.“</p>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Rollenverständnis:</strong> Euer Team übernimmt die Rolle eines IT-Systemhauses. Die Unterlagen beschreiben den Startpunkt. Euer Pflichtenheft und eure Lösung entstehen aus eigener Anforderungsanalyse, Recherche und dem Kundengespräch.
            </div>`,
            htmlEn: `
            <blockquote class="border-l-4 border-[var(--accent-amber)] pl-4 italic text-[var(--text-color)] my-3">
              "I want to open my own law firm in twelve weeks. I have the premises, but no internet connection and no office IT of my own."
            </blockquote>
            <p class="text-[var(--text-muted)]">"At my previous firm I could write letters, look up files and communicate with courts. Someone else took care of the technology. I don't yet know which contracts or programs I can take with me."</p>
            <p class="text-[var(--text-muted)]">"My assistant and I must be able to collaborate reliably. I'm also in court regularly and don't want to print everything each time. It's important to me that confidential matters stay confidential. I want to discuss exactly what we need with you."</p>
            <p class="text-[var(--text-muted)]">"Please give me a comprehensible proposal after our conversation. I want to understand what I'm buying, what costs recur, and who my contact will be later."</p>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Role understanding:</strong> Your team takes the role of an IT systems house. The documents describe the starting point. Your specification and solution arise from your own requirements analysis, research and customer interview.
            </div>`
        },
        {
            id: 'alltag',
            titleDe: '1.3 Arbeitsalltag',
            titleEn: '1.3 Daily Work Routine',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Ein Vormittag in der Kanzlei</h4>
                <p class="text-sm text-[var(--text-muted)]">Lea öffnet die Post und prüft neue Nachrichten. Eva meldet einen Mandanten an, während das Telefon klingelt. Eine neue Unterlage muss noch vor Noras Besprechung in die richtige Akte gelangen.</p>
                <p class="text-sm text-[var(--text-muted)]">Nora arbeitet an einem Schriftsatz. Später fährt sie zu einem Gerichtstermin und will dort wichtige Unterlagen griffbereit haben. Mila bereitet unter Anleitung eine neue Akte vor. Eine Frist darf dabei nicht zwischen E-Mail, Papiernotiz und Kalender verloren gehen.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Die Zusammenarbeit</h4>
                <p class="text-sm text-[var(--text-muted)]">Nora entscheidet über Mandatsannahme, juristische Inhalte und Freigaben. Lea organisiert den Kanzleialltag, bearbeitet Akten und bereitet Abrechnungen vor. Eva übernimmt vor allem vormittags Empfang, Telefon und Post. Mila unterstützt unter Anleitung.</p>
                <p class="text-sm text-[var(--text-muted)]">Wie sich diese Aufgaben in der neuen Kanzlei digital abbilden, ist noch nicht festgelegt. Die Abläufe der alten Sozietät werden nicht automatisch übernommen.</p>
              </div>
            </div>
            <p class="text-xs text-[var(--text-muted)] mt-3">Diese Alltagsskizze ist ein Gesprächseinstieg. Verbindliche Arbeitsabläufe, konkrete Zugriffsrechte und technische Anforderungen müssen erst ermittelt werden.</p>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">A morning at the firm</h4>
                <p class="text-sm text-[var(--text-muted)]">Lea opens the mail and checks new messages. Eva registers a client while the phone rings. A new document must reach the right file before Nora's meeting.</p>
                <p class="text-sm text-[var(--text-muted)]">Nora is working on a brief. Later she drives to a court appointment and wants important documents at hand. Mila prepares a new file under supervision. A deadline must not get lost between email, paper note and calendar.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Collaboration</h4>
                <p class="text-sm text-[var(--text-muted)]">Nora decides on client intake, legal content and approvals. Lea organises daily operations, processes files and prepares billing. Eva mostly handles reception, phone and mail in the morning. Mila assists under supervision.</p>
                <p class="text-sm text-[var(--text-muted)]">How these tasks will be represented digitally is not yet determined. The old firm's processes are not automatically carried over.</p>
              </div>
            </div>
            <p class="text-xs text-[var(--text-muted)] mt-3">This sketch is a conversation starter. Binding workflows, access rights and technical requirements must first be established.</p>`
        },
        {
            id: 'budget-termine',
            titleDe: '1.4 Budget und Termine',
            titleEn: '1.4 Budget and Deadlines',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Finanzierung</h4>
                <p class="text-sm text-[var(--text-muted)]">Für den Start stehen <strong>35.000 € brutto</strong> bereit. Darin sollen IT-Ausstattung, Einrichtung, Anschluss- und Installationsleistungen, Einweisung sowie einmalige Software- oder Anbietergebühren enthalten sein.</p>
                <p class="text-sm text-[var(--text-muted)]">Innerhalb dieses Betrags sollen <strong>3.500 € als Reserve</strong> verbleiben. Für die erste Planung bleiben <strong>31.500 €</strong>.</p>
                <p class="text-sm text-[var(--text-muted)]">Laufende IT-Kosten sollen zusammen möglichst <strong>950 € brutto pro Monat</strong> nicht überschreiten (Programme, Kommunikation, IT-Betrieb, Betreuung). Miete, Möbel und allgemeine Renovierung sind separat finanziert.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Termine & Zusammenarbeit</h4>
                <p class="text-sm text-[var(--text-muted)]">Geplante Eröffnung: <strong>zwölf Kalenderwochen nach dem Kick-off</strong>. Schlüssel übergeben; größere bauliche Arbeiten benötigen Zustimmung der Vermietung.</p>
                <p class="text-sm text-[var(--text-muted)]">Nora möchte ihre Auswahl nach verständlicher Beratung treffen. Es wurde noch nichts bestellt. Liefer- und Bereitstellungszeiten sind relevant.</p>
                <p class="text-sm text-[var(--text-muted)]">Lea koordiniert Rückfragen und Termine. Nora entscheidet über Investitionen und nimmt den Auftrag ab. Die Lehrkraft übernimmt diese Rollen im Gespräch.</p>
              </div>
            </div>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Funding</h4>
                <p class="text-sm text-[var(--text-muted)]"><strong>€35,000 gross</strong> is available for the launch, covering IT equipment, setup, connection and installation services, training and one-off software or provider fees.</p>
                <p class="text-sm text-[var(--text-muted)]"><strong>€3,500 is to remain as reserve</strong>. Initial planning amount: <strong>€31,500</strong>.</p>
                <p class="text-sm text-[var(--text-muted)]">Recurring IT costs should together not exceed <strong>€950 gross per month</strong> (programs, communication, operations, support). Rent, furniture and renovation are separately funded.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Dates & Collaboration</h4>
                <p class="text-sm text-[var(--text-muted)]">Planned opening: <strong>twelve calendar weeks after kick-off</strong>. Keys handed over; larger structural work requires landlord approval.</p>
                <p class="text-sm text-[var(--text-muted)]">Nora wants to make selections after comprehensible advice. Nothing has been ordered yet. Delivery and provisioning times matter.</p>
                <p class="text-sm text-[var(--text-muted)]">Lea coordinates queries and appointments. Nora decides on investments and signs off. The teacher takes these roles in the interview.</p>
              </div>
            </div>`
        },
        {
            id: 'raeume',
            titleDe: '1.5 Räume (Grundriss)',
            titleEn: '1.5 Premises (Floor Plan)',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Außenmaß <strong>18,0 × 12,0 m = 216 m² Gebäudegrundfläche</strong>. Außenwände 25 cm, Trennwände 15 cm. Gerundete Raumflächen ergeben ca. 155,5 m²; ca. 35 m² Flur und ca. 25,5 m² Wand-/Konstruktionsflächen. Die 216 m² sind keine vermietbare Nettofläche.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Raum</th><th>Fläche / Maße</th><th>Nutzung</th></tr>
            <tr><td>01 · Büro Bergmann</td><td class="text-[var(--text-muted)]">24,0 m² · 5 × 4,8 m</td><td class="text-[var(--text-muted)]">Schreibtisch, Besprechungsplätze, Aktenschrank.</td></tr>
            <tr><td>02 · Teambüro</td><td class="text-[var(--text-muted)]">18,2 m² · 3,8 × 4,8 m</td><td class="text-[var(--text-muted)]">Gemeinsamer Arbeitsraum der Assistenz.</td></tr>
            <tr><td>03 · Besprechung</td><td class="text-[var(--text-muted)]">18,2 m² · 3,8 × 4,8 m</td><td class="text-[var(--text-muted)]">Vertrauliche Mandantengespräche, bis 6 Personen.</td></tr>
            <tr><td>04 · Büro / Reserve</td><td class="text-[var(--text-muted)]">21,4 m² · 4,45 × 4,8 m</td><td class="text-[var(--text-muted)]">Projekt-/Ausweichraum; mögliche weitere Anwältin.</td></tr>
            <tr><td>05 · Empfang / Warten</td><td class="text-[var(--text-muted)]">22,0 m² · 5 × 4,4 m</td><td class="text-[var(--text-muted)]">Anmeldung, Postannahme, vier Warteplätze.</td></tr>
            <tr><td>06 · Küche / Pause</td><td class="text-[var(--text-muted)]">16,7 m² · 3,8 × 4,4 m</td><td class="text-[var(--text-muted)]">Küchenzeile, Kühlschrank, gemeinsamer Tisch.</td></tr>
            <tr><td>07 · Aktenarchiv</td><td class="text-[var(--text-muted)]">8,8 m² · 2 × 4,4 m</td><td class="text-[var(--text-muted)]">Papierakten, vertrauliche Unterlagen.</td></tr>
            <tr><td>08 · Technik / Abstell</td><td class="text-[var(--text-muted)]">8,8 m² · 2 × 4,4 m</td><td class="text-[var(--text-muted)]">Bisher Abstellraum; TK-Eintritt an Ostwand.</td></tr>
            <tr><td>09 · Personal-WC</td><td class="text-[var(--text-muted)]">8,6 m² · 1,95 × 4,4 m</td><td class="text-[var(--text-muted)]">Separates Personal-WC.</td></tr>
            <tr><td>10 · Mandanten-WC</td><td class="text-[var(--text-muted)]">8,8 m² · 2 × 4,4 m</td><td class="text-[var(--text-muted)]">Separates Besucher-WC.</td></tr>
            </table></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Bekannt aus der Besichtigung</h4>
                <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1">
                  <li>Keine nutzbare Datenverkabelung, keine vorhandenen IT-Geräte.</li>
                  <li>Steckdosen vorhanden; Zustand, Stromkreise und Versorgung noch nicht geprüft.</li>
                  <li>Innenwände überwiegend Leichtbau, Außenwände Mauerwerk.</li>
                  <li>Leere Kabelkanäle abschnittsweise im Flur; Durchführungen und Freigaben offen.</li>
                  <li>Raum 08 abschließbar, kein Fenster, keine aktive Kühlung, TK-Eintritt vorhanden.</li>
                </ul>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Hinweise der Vermietung</h4>
                <p class="text-sm text-[var(--text-muted)]">Mara Voigt ist Ansprechpartnerin für Gebäudezugang und Änderungen. Die eingezeichneten Möbel sind ein unverbindlicher Einrichtungsvorschlag und überwiegend noch nicht gekauft.</p>
                <p class="text-sm text-[var(--text-muted)]">Die Zeichnung ersetzt keine reale Begehung. Leitungswege, Elektroversorgung und bauliche Eignung sind noch nicht bestätigt. Ob Raum 08 für die technische Planung geeignet ist, wurde nicht untersucht.</p>
              </div>
            </div>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">Outer dimensions <strong>18.0 × 12.0 m = 216 m² gross building area</strong>. Outer walls 25 cm, partitions 15 cm. Rounded room areas total approx. 155.5 m²; corridor approx. 35 m²; wall/structure approx. 25.5 m². The 216 m² are not lettable net area.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Room</th><th>Area / Dimensions</th><th>Use</th></tr>
            <tr><td>01 · Bergmann office</td><td class="text-[var(--text-muted)]">24.0 m² · 5 × 4.8 m</td><td class="text-[var(--text-muted)]">Desk, meeting seats, filing cabinet.</td></tr>
            <tr><td>02 · Team office</td><td class="text-[var(--text-muted)]">18.2 m² · 3.8 × 4.8 m</td><td class="text-[var(--text-muted)]">Shared assistant workspace.</td></tr>
            <tr><td>03 · Meeting</td><td class="text-[var(--text-muted)]">18.2 m² · 3.8 × 4.8 m</td><td class="text-[var(--text-muted)]">Confidential client meetings, up to 6 people.</td></tr>
            <tr><td>04 · Office / Reserve</td><td class="text-[var(--text-muted)]">21.4 m² · 4.45 × 4.8 m</td><td class="text-[var(--text-muted)]">Project/overflow; possible additional attorney.</td></tr>
            <tr><td>05 · Reception / Waiting</td><td class="text-[var(--text-muted)]">22.0 m² · 5 × 4.4 m</td><td class="text-[var(--text-muted)]">Registration, mail intake, four waiting seats.</td></tr>
            <tr><td>06 · Kitchen / Break</td><td class="text-[var(--text-muted)]">16.7 m² · 3.8 × 4.4 m</td><td class="text-[var(--text-muted)]">Kitchenette, fridge, shared table.</td></tr>
            <tr><td>07 · Records archive</td><td class="text-[var(--text-muted)]">8.8 m² · 2 × 4.4 m</td><td class="text-[var(--text-muted)]">Paper files, confidential documents.</td></tr>
            <tr><td>08 · Technical / Storage</td><td class="text-[var(--text-muted)]">8.8 m² · 2 × 4.4 m</td><td class="text-[var(--text-muted)]">Former storage; telecom entry on east wall.</td></tr>
            <tr><td>09 · Staff WC</td><td class="text-[var(--text-muted)]">8.6 m² · 1.95 × 4.4 m</td><td class="text-[var(--text-muted)]">Separate staff WC.</td></tr>
            <tr><td>10 · Visitor WC</td><td class="text-[var(--text-muted)]">8.8 m² · 2 × 4.4 m</td><td class="text-[var(--text-muted)]">Separate visitor WC.</td></tr>
            </table></div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Known from the site visit</h4>
                <ul class="text-sm text-[var(--text-muted)] list-disc pl-5 space-y-1">
                  <li>No usable data cabling, no existing IT equipment.</li>
                  <li>Power sockets present; condition, circuits and supply not yet professionally checked.</li>
                  <li>Interior walls mostly lightweight, outer walls masonry.</li>
                  <li>Empty cable ducts in sections of the corridor; penetrations and approvals open.</li>
                  <li>Room 08 lockable, no window, no active cooling, telecom entry present.</li>
                </ul>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Landlord notes</h4>
                <p class="text-sm text-[var(--text-muted)]">Mara Voigt handles building access and changes. The furniture shown is an indicative layout suggestion, mostly not yet purchased.</p>
                <p class="text-sm text-[var(--text-muted)]">The drawing does not replace an actual site inspection. Cable routes, power supply and structural suitability have not been confirmed. Whether room 08 is suitable for technical planning has not been investigated.</p>
              </div>
            </div>`
        },
        {
            id: 'unterlagen',
            titleDe: '1.6 Weitere Kundenunterlagen',
            titleEn: '1.6 Further Customer Documents',
            htmlDe: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Unterlage</th><th>Bisherige Information</th></tr>
            <tr><td>Internet / Telefon</td><td class="text-[var(--text-muted)]">Noch kein Anschluss beauftragt. Vermietung nennt unverbindlich DSL bis 100/40 Mbit/s in 4–6 Wochen, Glasfaser 500/100 Mbit/s in 10–14 Wochen. Keine bestätigte Verfügbarkeit; Mobilfunk im Gebäude ungemessen. Bisherige geschäftliche Rufnummer soll möglichst behalten werden; Übertragbarkeit offen.</td></tr>
            <tr><td>Programme</td><td class="text-[var(--text-muted)]">In der alten Sozietät wurden Kanzleianwendung, Textverarbeitung, E-Mail, Kalender und elektronischer Rechtsverkehr genutzt. Keine eigene Vertragsübersicht bei Nora. Für den neuen Standort noch kein Produkt ausgewählt.</td></tr>
            <tr><td>Geräte</td><td class="text-[var(--text-muted)]">Ein privates, ca. sechs Jahre altes Notebook und ein privates Smartphone sind vorhanden. Keine weiteren Endgeräte, Drucker oder Server beschafft. Ob Altgeräte eingesetzt werden sollen, ist ungeklärt.</td></tr>
            <tr><td>Akten</td><td class="text-[var(--text-muted)]">Für die Planung: etwa 280 laufende und 650 abgeschlossene Akten mit Bezug zu Noras bisheriger Tätigkeit. Erste unverbindliche Größenangabe: 180 GB. Kein freigegebener Übernahmebestand.</td></tr>
            <tr><td>Papier</td><td class="text-[var(--text-muted)]">Viele Unterlagen kommen weiter auf Papier. Lea schätzt 60 eingehende Scan-Seiten und 40 Druckseiten pro Arbeitstag. Noch keine neue Ablage- oder Scanregel.</td></tr>
            <tr><td>Zusammenarbeit</td><td class="text-[var(--text-muted)]">Nora und Lea überwiegend täglich vor Ort. Eva vormittags, Mila nach Ausbildungsplan. Zahl und Art der zu beschaffenden Geräte noch nicht entschieden.</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-3">Alle Zahlen und Aussagen sind fiktive Ausgangsdaten. Verbindlichkeit, Übernahmerechte und Vollständigkeit sind nicht automatisch geklärt.</p>`,
            htmlEn: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Document</th><th>Information so far</th></tr>
            <tr><td>Internet / Telephone</td><td class="text-[var(--text-muted)]">No connection ordered yet. Landlord mentions non-binding DSL up to 100/40 Mbit/s in 4–6 weeks, fibre 500/100 Mbit/s in 10–14 weeks. No confirmed availability; mobile signal unmeasured. Previous business number should be retained if possible; portability open.</td></tr>
            <tr><td>Programs</td><td class="text-[var(--text-muted)]">Previous firm used legal practice software, word processing, email, calendar and electronic legal communications. No contract overview in Nora's hands. No product selected for the new location.</td></tr>
            <tr><td>Devices</td><td class="text-[var(--text-muted)]">A private notebook approx. six years old and a private smartphone exist. No other endpoints, printers or servers procured. Whether old devices should be used is unresolved.</td></tr>
            <tr><td>Files</td><td class="text-[var(--text-muted)]">For planning: approx. 280 active and 650 closed files related to Nora's previous work. First non-binding estimate: 180 GB. No approved transfer set.</td></tr>
            <tr><td>Paper</td><td class="text-[var(--text-muted)]">Many documents remain on paper. Lea estimates 60 incoming scan pages and 40 printed pages per working day. No new filing or scanning rule yet.</td></tr>
            <tr><td>Collaboration</td><td class="text-[var(--text-muted)]">Nora and Lea mostly on site daily. Eva in the mornings, Mila according to training plan. Number and type of devices not yet decided.</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-3">All figures and statements are fictional starting data. Validity, transfer rights and completeness are not automatically established.</p>`
        },
        {
            id: 'auftrag',
            titleDe: '1.7 Euer Auftrag',
            titleEn: '1.7 Your Assignment',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Bereitet ein Kundengespräch vor und erarbeitet auf Basis der Akte, eurer Recherche und der Gesprächsergebnisse ein eigenes Pflichtenheft. Entwickelt einen begründeten, bezahlbaren Vorschlag für den Kanzleistart und macht den Weg von der Kundenäußerung zu eurer Entscheidung nachvollziehbar.</p>
            <p class="text-[var(--text-muted)]">Die Kundin erwartet eine verständliche Entscheidungsgrundlage. Wie ihr technische Alternativen untersucht, eure Arbeit organisiert und die Funktionsfähigkeit der gewählten Lösung nachweist, begründet ihr selbst. Die Lehrkraft vereinbart mit euch den konkreten Labor- und Abgabeumfang.</p>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              <strong>Für die Unterrichtsumsetzung:</strong> Arbeitet nur in freigegebenen Laborumgebungen mit erfundenen Akten und Personen. Keine realen Mandatsdaten oder produktiven Postfächer verwenden. Reale externe Dienste dürfen nicht als funktionierend ausgegeben werden, wenn sie nur simuliert wurden.
            </div>
            <p class="text-[var(--text-muted)] mt-3">In dieser Kundenakte sind keine fertige technische Architektur, priorisierte Anforderungsliste, vorab festgelegte Gerätezahl oder ausgearbeitete Testfälle enthalten. Fehlende Informationen werden im Rollenspiel erfragt und anschließend von euch dokumentiert.</p>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">Prepare a customer interview and, based on the case file, your research and the interview results, produce your own specification. Develop a reasoned, affordable proposal for the firm's launch and make the path from customer statement to your decision traceable.</p>
            <p class="text-[var(--text-muted)]">The client expects a comprehensible decision basis. How you investigate technical alternatives, organise your work and prove the functionality of the chosen solution is for you to justify. The teacher agrees the specific lab and submission scope with you.</p>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              <strong>For the classroom:</strong> Work only in approved lab environments with fictional files and persons. No real case data or production mailboxes. Real external services must not be presented as working if only simulated.
            </div>
            <p class="text-[var(--text-muted)] mt-3">This case file contains no finished technical architecture, prioritised requirements list, pre-set device count or elaborated test cases. Missing information is obtained in the role-play and then documented by you.</p>`
        },
        {
            id: 'notizen',
            titleDe: '1.8 Eigene Gesprächsnotizen',
            titleEn: '1.8 Your Interview Notes',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Die Felder sind freiwillige Notizen. Lokal speichern gilt nur für diesen Browser, ohne Übertragung oder gemeinsame Teamablage. Bei lokalen Dateien kann die Speicherung eingeschränkt sein. Exportiert eure Notizen regelmäßig.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <label class="block text-sm font-semibold mb-1" for="mukb-team">Team / Projekt</label>
                <input id="mukb-team" data-save type="text" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3">
                <label class="block text-sm font-semibold mb-1" for="mukb-fragen">Unsere Gesprächsfragen</label>
                <textarea id="mukb-fragen" data-save rows="4" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3"></textarea>
                <label class="block text-sm font-semibold mb-1" for="mukb-antworten">Antworten und bestätigte Kundenangaben</label>
                <textarea id="mukb-antworten" data-save rows="4" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)]"></textarea>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <label class="block text-sm font-semibold mb-1" for="mukb-recherche">Unsere Recherche und Quellen</label>
                <textarea id="mukb-recherche" data-save rows="3" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3"></textarea>
                <label class="block text-sm font-semibold mb-1" for="mukb-offen">Offene Punkte und eigene Annahmen</label>
                <textarea id="mukb-offen" data-save rows="3" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3"></textarea>
                <label class="block text-sm font-semibold mb-1" for="mukb-naechstes">Nächste Schritte</label>
                <textarea id="mukb-naechstes" data-save rows="2" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)]"></textarea>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-3">
              <button id="mukb-save" class="px-3 py-1.5 rounded bg-[var(--link-color)] text-white text-sm font-semibold">Lokal speichern</button>
              <button id="mukb-export" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Notizen exportieren</button>
              <button id="mukb-print" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Drucken / PDF</button>
              <button id="mukb-reset" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Notizen löschen</button>
            </div>
            <p id="mukb-status" class="text-xs text-[var(--text-muted)] mt-2" role="status"></p>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">These fields are optional notes. Local storage applies to this browser only, with no transfer or shared team storage. Storage may be limited for local files. Export your notes regularly.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <label class="block text-sm font-semibold mb-1" for="mukb-team">Team / project</label>
                <input id="mukb-team" data-save type="text" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3">
                <label class="block text-sm font-semibold mb-1" for="mukb-fragen">Our interview questions</label>
                <textarea id="mukb-fragen" data-save rows="4" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3"></textarea>
                <label class="block text-sm font-semibold mb-1" for="mukb-antworten">Answers and confirmed customer statements</label>
                <textarea id="mukb-antworten" data-save rows="4" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)]"></textarea>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <label class="block text-sm font-semibold mb-1" for="mukb-recherche">Our research and sources</label>
                <textarea id="mukb-recherche" data-save rows="3" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3"></textarea>
                <label class="block text-sm font-semibold mb-1" for="mukb-offen">Open points and our assumptions</label>
                <textarea id="mukb-offen" data-save rows="3" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)] mb-3"></textarea>
                <label class="block text-sm font-semibold mb-1" for="mukb-naechstes">Next steps</label>
                <textarea id="mukb-naechstes" data-save rows="2" class="w-full p-2 rounded border border-[var(--border-color)] bg-[var(--code-bg)] text-[var(--text-color)]"></textarea>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-3">
              <button id="mukb-save" class="px-3 py-1.5 rounded bg-[var(--link-color)] text-white text-sm font-semibold">Save locally</button>
              <button id="mukb-export" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Export notes</button>
              <button id="mukb-print" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Print / PDF</button>
              <button id="mukb-reset" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Delete notes</button>
            </div>
            <p id="mukb-status" class="text-xs text-[var(--text-muted)] mt-2" role="status"></p>`
        }
    ]
};
