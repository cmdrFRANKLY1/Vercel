// resources/topics/mukb/data/sections/03-lasten-pflichten.js

export const section = {
    id: 'lasten-pflichten',
    titleDe: '3. Lastenheft & Pflichtenheft, Grundlagen',
    titleEn: '3. Requirements Specification & Specification, Fundamentals',
    introDe: 'Kundenbedarf verstehen, Umsetzung abstimmen und Ergebnisse prüfbar vereinbaren.',
    introEn: 'Understand customer needs, agree implementation and make results verifiably agreement.',
    subtopics: [
        {
            id: 'lernziele',
            titleDe: '3.1 Lernziele',
            titleEn: '3.1 Learning Objectives',
            htmlDe: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Fachziel</h4>
                <p class="text-sm text-[var(--text-muted)]">Du unterscheidest Lastenheft und Pflichtenheft nach Zweck, Verantwortung und Inhalt.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Methodenziel</h4>
                <p class="text-sm text-[var(--text-muted)]">Du erhebst Anforderungen, formulierst sie eindeutig und leitest prüfbare Abnahmekriterien ab.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Transferziel</h4>
                <p class="text-sm text-[var(--text-muted)]">Du begründest Umsetzungsvorschläge, erkennst offene Fragen und verfolgst Anforderungen bis zur Prüfung.</p>
              </div>
            </div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Leitfrage:</strong> Wie wird aus einem Kundenwunsch eine gemeinsam verstandene und prüfbare Vereinbarung?
            </div>
            <p class="text-[var(--text-muted)] mt-3">Voraussetzungen: grundlegendes Verständnis von IT-Projekten; keine Programmierkenntnisse nötig. Umfang: 6 × 45 Minuten.</p>`,
            htmlEn: `
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Subject objective</h4>
                <p class="text-sm text-[var(--text-muted)]">Distinguish requirements specification and specification by purpose, responsibility and content.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Method objective</h4>
                <p class="text-sm text-[var(--text-muted)]">Elicit requirements, formulate them unambiguously and derive verifiable acceptance criteria.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Transfer objective</h4>
                <p class="text-sm text-[var(--text-muted)]">Justify implementation proposals, identify open questions and trace requirements through to verification.</p>
              </div>
            </div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Guiding question:</strong> How does a customer wish become a commonly understood and verifiable agreement?
            </div>
            <p class="text-[var(--text-muted)] mt-3">Prerequisites: basic understanding of IT projects; no programming skills required. Scope: 6 × 45 minutes.</p>`
        },
        {
            id: 'fachbegriffe',
            titleDe: '3.2 Fachbegriffe',
            titleEn: '3.2 Glossary',
            htmlDe: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th style="width:22%">Begriff</th><th>Definition</th></tr>
            <tr><td><strong>Abgrenzung</strong></td><td class="text-[var(--text-muted)]">Beschreibung dessen, was zum Projekt gehört und was ausdrücklich außerhalb liegt.</td></tr>
            <tr><td><strong>Abnahme</strong></td><td class="text-[var(--text-muted)]">Erklärung des Auftraggebers, dass er die Leistung als im Wesentlichen vertragsgemäß anerkennt. Ein bestandener Test allein ist noch keine solche Erklärung.</td></tr>
            <tr><td><strong>Abnahmekriterium</strong></td><td class="text-[var(--text-muted)]">Vereinbarte, überprüfbare Bedingung zur Beurteilung, ob eine Leistung die Anforderungen erfüllt.</td></tr>
            <tr><td><strong>Abnahmetest</strong></td><td class="text-[var(--text-muted)]">Geplante Prüfung des vereinbarten Ergebnisses anhand der Abnahmekriterien.</td></tr>
            <tr><td><strong>Agiles Vorgehen</strong></td><td class="text-[var(--text-muted)]">Schrittweises Arbeiten mit regelmäßiger Rückmeldung und Anpassung. Auch dabei müssen Anforderungen und Entscheidungen nachvollziehbar sein.</td></tr>
            <tr><td><strong>Anforderung</strong></td><td class="text-[var(--text-muted)]">Dokumentierte Eigenschaft, Fähigkeit oder Bedingung, die ein Ergebnis erfüllen soll.</td></tr>
            <tr><td><strong>Anforderungs-ID</strong></td><td class="text-[var(--text-muted)]">Eindeutiges Kennzeichen einer Anforderung, etwa L-01.</td></tr>
            <tr><td><strong>Anforderungserhebung</strong></td><td class="text-[var(--text-muted)]">Gezieltes Ermitteln von Bedürfnissen und Bedingungen, etwa durch Gespräche, Beobachtung und Dokumentenanalyse.</td></tr>
            <tr><td><strong>Annahme</strong></td><td class="text-[var(--text-muted)]">Noch nicht bestätigte Voraussetzung, auf der eine Überlegung beruht; sie muss geprüft werden.</td></tr>
            <tr><td><strong>Auftraggeber</strong></td><td class="text-[var(--text-muted)]">Person oder Organisation, die eine Leistung beauftragt und die benötigten Ergebnisse festlegt.</td></tr>
            <tr><td><strong>Auftragnehmer</strong></td><td class="text-[var(--text-muted)]">Person oder Organisation, die die beauftragte Leistung erbringt und die Umsetzung ausarbeitet.</td></tr>
            <tr><td><strong>Benutzerrolle</strong></td><td class="text-[var(--text-muted)]">Zusammenfassung von Aufgaben und Zugriffsrechten für eine Gruppe von Nutzenden.</td></tr>
            <tr><td><strong>Berechtigung</strong></td><td class="text-[var(--text-muted)]">Erlaubnis, eine bestimmte Aktion auszuführen oder bestimmte Daten einzusehen.</td></tr>
            <tr><td><strong>Budget</strong></td><td class="text-[var(--text-muted)]">Verfügbarer oder vereinbarter finanzieller Rahmen.</td></tr>
            <tr><td><strong>CSV</strong></td><td class="text-[var(--text-muted)]">Textformat für tabellarische Daten mit vereinbarten Trennzeichen (Comma-Separated Values). Trennzeichen und Zeichencodierung sind konkret festzulegen.</td></tr>
            <tr><td><strong>Datenformat</strong></td><td class="text-[var(--text-muted)]">Regel, nach der Daten aufgebaut und dargestellt werden.</td></tr>
            <tr><td><strong>Datenmigration</strong></td><td class="text-[var(--text-muted)]">Geplante Übertragung vorhandener Daten in eine neue Umgebung.</td></tr>
            <tr><td><strong>Datensicherung</strong></td><td class="text-[var(--text-muted)]">Anlegen einer zusätzlichen Datenkopie zur Wiederherstellung nach Verlust oder Beschädigung.</td></tr>
            <tr><td><strong>Freigabe</strong></td><td class="text-[var(--text-muted)]">Dokumentierte Zustimmung zu einem Ergebnis oder nächsten Arbeitsschritt. Sie ist von der Abnahme der gelieferten Leistung zu unterscheiden.</td></tr>
            <tr><td><strong>Funktionale Anforderung</strong></td><td class="text-[var(--text-muted)]">Beschreibt, was ein System leisten soll, etwa eine Buchung erfassen.</td></tr>
            <tr><td><strong>Implementierung</strong></td><td class="text-[var(--text-muted)]">Technische Realisierung einer geplanten Lösung.</td></tr>
            <tr><td><strong>Ist-Zustand</strong></td><td class="text-[var(--text-muted)]">Tatsächlich vorgefundene Ausgangslage zu einem benannten Zeitpunkt.</td></tr>
            <tr><td><strong>Konsistenz</strong></td><td class="text-[var(--text-muted)]">Widerspruchsfreiheit von Aussagen und Dokumenten.</td></tr>
            <tr><td><strong>Lastenheft</strong></td><td class="text-[var(--text-muted)]">Dokumentiert die Anforderungen des Auftraggebers an Lieferungen und Leistungen: Was wird benötigt und wozu? Es beschreibt auch Rahmenbedingungen und vereinbarte Prüfkriterien.</td></tr>
            <tr><td><strong>Muss / Soll / Kann</strong></td><td class="text-[var(--text-muted)]">Hier vereinbarte Prioritätsstufen: Muss = für die vereinbarte Lieferung unverzichtbar; Soll = wichtig, Abweichung nur nach Abstimmung; Kann = optional. Die Bedeutung muss im Projekt ausdrücklich vereinbart werden.</td></tr>
            <tr><td><strong>Nichtfunktionale Anforderung</strong></td><td class="text-[var(--text-muted)]">Beschreibt geforderte Qualität oder weitere Bedingungen statt einer einzelnen Funktion.</td></tr>
            <tr><td><strong>Pflichtenheft</strong></td><td class="text-[var(--text-muted)]">Beschreibt aus Sicht des Auftragnehmers, wie die Anforderungen umgesetzt werden sollen, und konkretisiert die vorgesehene Lösung. Es wird mit dem Auftraggeber abgestimmt.</td></tr>
            <tr><td><strong>Priorisierung</strong></td><td class="text-[var(--text-muted)]">Festlegen der relativen Wichtigkeit von Anforderungen.</td></tr>
            <tr><td><strong>Product Backlog</strong></td><td class="text-[var(--text-muted)]">Geordnete, veränderliche Liste der benötigten Arbeit an einem Produkt bei Scrum. Es ist nicht automatisch ein Pflichtenheft.</td></tr>
            <tr><td><strong>Prüfbarkeit</strong></td><td class="text-[var(--text-muted)]">Eigenschaft einer Aussage, deren Erfüllung anhand festgelegter Bedingungen feststellbar ist.</td></tr>
            <tr><td><strong>Qualitätsanforderung</strong></td><td class="text-[var(--text-muted)]">Beschreibt, wie gut ein System eine Leistung erbringen soll, etwa durch eine messbare Antwortzeit.</td></tr>
            <tr><td><strong>Randbedingung</strong></td><td class="text-[var(--text-muted)]">Vorgegebene Begrenzung des Lösungsraums, etwa Budget, Termin oder eine verbindlich zu nutzende Umgebung.</td></tr>
            <tr><td><strong>Review</strong></td><td class="text-[var(--text-muted)]">Systematische Durchsicht eines Arbeitsergebnisses durch Beteiligte, um Fehler oder Unklarheiten zu erkennen.</td></tr>
            <tr><td><strong>Risiko</strong></td><td class="text-[var(--text-muted)]">Unsicheres Ereignis oder eine unsichere Bedingung mit möglicher Auswirkung auf Projektziele.</td></tr>
            <tr><td><strong>Rückverfolgbarkeit / Traceability</strong></td><td class="text-[var(--text-muted)]">Dokumentierte Verbindung zwischen Ursprung einer Anforderung, ihrer Umsetzung und ihrer Prüfung.</td></tr>
            <tr><td><strong>Schnittstelle</strong></td><td class="text-[var(--text-muted)]">Festgelegter Übergang, über den Systeme oder Beteiligte Daten oder Leistungen austauschen.</td></tr>
            <tr><td><strong>Soll-Zustand</strong></td><td class="text-[var(--text-muted)]">Angestrebter Zustand, dessen Erreichen überprüft werden kann.</td></tr>
            <tr><td><strong>Stakeholder</strong></td><td class="text-[var(--text-muted)]">Person oder Gruppe, die ein Vorhaben beeinflusst oder davon betroffen ist.</td></tr>
            <tr><td><strong>Testfall</strong></td><td class="text-[var(--text-muted)]">Beschreibung einer einzelnen Prüfung mit Voraussetzungen, Eingaben, Schritten und erwartetem Ergebnis.</td></tr>
            <tr><td><strong>Testumgebung</strong></td><td class="text-[var(--text-muted)]">Festgelegte technische und organisatorische Bedingungen, unter denen geprüft wird.</td></tr>
            <tr><td><strong>UTF-8</strong></td><td class="text-[var(--text-muted)]">Weit verbreitete Zeichencodierung, die unter anderem Umlaute und viele weitere Schriftzeichen darstellen kann.</td></tr>
            <tr><td><strong>Version / Basisstand</strong></td><td class="text-[var(--text-muted)]">Eine Version kennzeichnet einen Bearbeitungsstand. Ein freigegebener Basisstand (Baseline) ist die vereinbarte Grundlage für weitere Arbeit und Änderungen.</td></tr>
            <tr><td><strong>Vollständigkeit</strong></td><td class="text-[var(--text-muted)]">Abdeckung aller für den vereinbarten Umfang benötigten Informationen; offene Punkte werden sichtbar benannt.</td></tr>
            <tr><td><strong>Änderungsantrag / Change Request</strong></td><td class="text-[var(--text-muted)]">Dokumentierter Vorschlag, eine vereinbarte Grundlage zu ändern, einschließlich Begründung und Folgen.</td></tr>
            <tr><td><strong>Änderungsmanagement</strong></td><td class="text-[var(--text-muted)]">Geregeltes Erfassen, Bewerten, Entscheiden und Dokumentieren von Änderungen.</td></tr>
            </table></div>`,
            htmlEn: `
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th style="width:22%">Term</th><th>Definition</th></tr>
            <tr><td><strong>Boundary</strong></td><td class="text-[var(--text-muted)]">Description of what belongs to the project and what is explicitly out of scope.</td></tr>
            <tr><td><strong>Acceptance</strong></td><td class="text-[var(--text-muted)]">Declaration by the client that the service is recognised as substantially contract-compliant. A passed test alone is not such a declaration.</td></tr>
            <tr><td><strong>Acceptance criterion</strong></td><td class="text-[var(--text-muted)]">Agreed, verifiable condition for assessing whether a service meets the requirements.</td></tr>
            <tr><td><strong>Acceptance test</strong></td><td class="text-[var(--text-muted)]">Planned verification of the agreed result against the acceptance criteria.</td></tr>
            <tr><td><strong>Agile approach</strong></td><td class="text-[var(--text-muted)]">Step-by-step work with regular feedback and adjustment. Requirements and decisions must still be traceable.</td></tr>
            <tr><td><strong>Requirement</strong></td><td class="text-[var(--text-muted)]">Documented property, capability or condition that a result must fulfil.</td></tr>
            <tr><td><strong>Requirement ID</strong></td><td class="text-[var(--text-muted)]">Unique identifier for a requirement, e.g. L-01.</td></tr>
            <tr><td><strong>Requirements elicitation</strong></td><td class="text-[var(--text-muted)]">Targeted determination of needs and conditions, e.g. through interviews, observation and document analysis.</td></tr>
            <tr><td><strong>Assumption</strong></td><td class="text-[var(--text-muted)]">Unconfirmed prerequisite on which a consideration is based; it must be verified.</td></tr>
            <tr><td><strong>Client</strong></td><td class="text-[var(--text-muted)]">Person or organisation commissioning a service and defining the required results.</td></tr>
            <tr><td><strong>Contractor</strong></td><td class="text-[var(--text-muted)]">Person or organisation delivering the commissioned service and elaborating the implementation.</td></tr>
            <tr><td><strong>User role</strong></td><td class="text-[var(--text-muted)]">Combination of tasks and access rights for a group of users.</td></tr>
            <tr><td><strong>Permission</strong></td><td class="text-[var(--text-muted)]">Authorisation to perform a particular action or view particular data.</td></tr>
            <tr><td><strong>Budget</strong></td><td class="text-[var(--text-muted)]">Available or agreed financial frame.</td></tr>
            <tr><td><strong>CSV</strong></td><td class="text-[var(--text-muted)]">Text format for tabular data with agreed separators (Comma-Separated Values). Separators and character encoding must be specified.</td></tr>
            <tr><td><strong>Data format</strong></td><td class="text-[var(--text-muted)]">Rule by which data is structured and presented.</td></tr>
            <tr><td><strong>Data migration</strong></td><td class="text-[var(--text-muted)]">Planned transfer of existing data into a new environment.</td></tr>
            <tr><td><strong>Backup</strong></td><td class="text-[var(--text-muted)]">Creating an additional data copy for recovery after loss or damage.</td></tr>
            <tr><td><strong>Approval</strong></td><td class="text-[var(--text-muted)]">Documented consent to a result or next work step. To be distinguished from acceptance of the delivered service.</td></tr>
            <tr><td><strong>Functional requirement</strong></td><td class="text-[var(--text-muted)]">Describes what a system shall do, e.g. record a booking.</td></tr>
            <tr><td><strong>Implementation</strong></td><td class="text-[var(--text-muted)]">Technical realisation of a planned solution.</td></tr>
            <tr><td><strong>As-is state</strong></td><td class="text-[var(--text-muted)]">Actually found starting situation at a named point in time.</td></tr>
            <tr><td><strong>Consistency</strong></td><td class="text-[var(--text-muted)]">Freedom from contradiction in statements and documents.</td></tr>
            <tr><td><strong>Requirements specification (Lastenheft)</strong></td><td class="text-[var(--text-muted)]">Documents the client's requirements for deliveries and services: what is needed and why? Also describes framework conditions and agreed verification criteria.</td></tr>
            <tr><td><strong>Must / Should / Could</strong></td><td class="text-[var(--text-muted)]">Priority levels agreed here: Must = indispensable for the agreed delivery; Should = important, deviation only by agreement; Could = optional. The meaning must be explicitly agreed in the project.</td></tr>
            <tr><td><strong>Non-functional requirement</strong></td><td class="text-[var(--text-muted)]">Describes required quality or other conditions rather than a single function.</td></tr>
            <tr><td><strong>Specification (Pflichtenheft)</strong></td><td class="text-[var(--text-muted)]">Describes from the contractor's perspective how the requirements are to be implemented and concretises the planned solution. Agreed with the client.</td></tr>
            <tr><td><strong>Prioritisation</strong></td><td class="text-[var(--text-muted)]">Establishing the relative importance of requirements.</td></tr>
            <tr><td><strong>Product Backlog</strong></td><td class="text-[var(--text-muted)]">Ordered, changing list of work needed on a product in Scrum. Not automatically a specification.</td></tr>
            <tr><td><strong>Verifiability</strong></td><td class="text-[var(--text-muted)]">Property of a statement whose fulfilment can be determined under defined conditions.</td></tr>
            <tr><td><strong>Quality requirement</strong></td><td class="text-[var(--text-muted)]">Describes how well a system shall deliver a service, e.g. via measurable response time.</td></tr>
            <tr><td><strong>Constraint</strong></td><td class="text-[var(--text-muted)]">Given limitation of the solution space, e.g. budget, schedule or a mandatory environment.</td></tr>
            <tr><td><strong>Review</strong></td><td class="text-[var(--text-muted)]">Systematic examination of a work result by participants to identify errors or ambiguities.</td></tr>
            <tr><td><strong>Risk</strong></td><td class="text-[var(--text-muted)]">Uncertain event or condition with potential impact on project objectives.</td></tr>
            <tr><td><strong>Traceability</strong></td><td class="text-[var(--text-muted)]">Documented link between the origin of a requirement, its implementation and its verification.</td></tr>
            <tr><td><strong>Interface</strong></td><td class="text-[var(--text-muted)]">Defined transition via which systems or participants exchange data or services.</td></tr>
            <tr><td><strong>To-be state</strong></td><td class="text-[var(--text-muted)]">Target state whose achievement can be verified.</td></tr>
            <tr><td><strong>Stakeholder</strong></td><td class="text-[var(--text-muted)]">Person or group influencing or affected by a project.</td></tr>
            <tr><td><strong>Test case</strong></td><td class="text-[var(--text-muted)]">Description of a single test with preconditions, inputs, steps and expected result.</td></tr>
            <tr><td><strong>Test environment</strong></td><td class="text-[var(--text-muted)]">Defined technical and organisational conditions under which testing occurs.</td></tr>
            <tr><td><strong>UTF-8</strong></td><td class="text-[var(--text-muted)]">Widely used character encoding supporting umlauts and many other characters.</td></tr>
            <tr><td><strong>Version / Baseline</strong></td><td class="text-[var(--text-muted)]">A version marks an editing state. An approved baseline is the agreed basis for further work and changes.</td></tr>
            <tr><td><strong>Completeness</strong></td><td class="text-[var(--text-muted)]">Coverage of all information needed for the agreed scope; open points are explicitly named.</td></tr>
            <tr><td><strong>Change request</strong></td><td class="text-[var(--text-muted)]">Documented proposal to change an agreed basis, including justification and consequences.</td></tr>
            <tr><td><strong>Change management</strong></td><td class="text-[var(--text-muted)]">Regulated recording, assessment, decision and documentation of changes.</td></tr>
            </table></div>`
        },
        {
            id: 'lastenheft-bausteine',
            titleDe: '3.3 Lastenheft: Bausteine',
            titleEn: '3.3 Requirements Specification: Building Blocks',
            htmlDe: `
            <div class="p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Merksatz:</strong> Was wird benötigt und wozu? Verantwortlich ist der Auftraggeber; andere Beteiligte können bei der Erstellung helfen.
            </div>
            <p class="text-[var(--text-muted)] mt-3">Aus Gesprächen und der Analyse des Ist-Zustands entstehen Ziele und Anforderungen. Beschreibe das benötigte Ergebnis möglichst lösungsneutral. Verbindliche technische Randbedingungen dürfen dennoch enthalten sein und müssen begründet werden.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Baustein</th><th>Leitfragen</th></tr>
            <tr><td>Ausgangslage und Ziele</td><td class="text-[var(--text-muted)]">Welches Problem besteht? Welcher Nutzen soll erreicht werden?</td></tr>
            <tr><td>Stakeholder und Einsatz</td><td class="text-[var(--text-muted)]">Wer nutzt das Ergebnis? Unter welchen Bedingungen?</td></tr>
            <tr><td>Projektumfang und Abgrenzung</td><td class="text-[var(--text-muted)]">Welche Leistungen werden benötigt? Welche nicht?</td></tr>
            <tr><td>Anforderungen</td><td class="text-[var(--text-muted)]">Welche Funktionen, Qualitätsmerkmale und Randbedingungen gelten?</td></tr>
            <tr><td>Schnittstellen und Daten</td><td class="text-[var(--text-muted)]">Welche bestehenden Systeme und Daten müssen berücksichtigt werden?</td></tr>
            <tr><td>Budget und Termine</td><td class="text-[var(--text-muted)]">Welcher finanzielle und zeitliche Rahmen gilt?</td></tr>
            <tr><td>Abnahme und offene Punkte</td><td class="text-[var(--text-muted)]">Wie wird Zielerreichung geprüft? Was ist noch zu klären?</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-2">Dies ist eine sinnvolle Gliederung für den Unterricht, keine für jedes Projekt vorgeschriebene Universalvorlage.</p>`,
            htmlEn: `
            <div class="p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Mnemonic:</strong> What is needed and why? The client is responsible; others may assist.
            </div>
            <p class="text-[var(--text-muted)] mt-3">Goals and requirements arise from interviews and analysis of the as-is state. Describe the required result as solution-neutral as possible. Binding technical constraints may still be included and must be justified.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Element</th><th>Guiding questions</th></tr>
            <tr><td>Starting situation and goals</td><td class="text-[var(--text-muted)]">What problem exists? What benefit is to be achieved?</td></tr>
            <tr><td>Stakeholders and usage</td><td class="text-[var(--text-muted)]">Who uses the result? Under what conditions?</td></tr>
            <tr><td>Project scope and boundary</td><td class="text-[var(--text-muted)]">Which services are required? Which are not?</td></tr>
            <tr><td>Requirements</td><td class="text-[var(--text-muted)]">Which functions, quality features and constraints apply?</td></tr>
            <tr><td>Interfaces and data</td><td class="text-[var(--text-muted)]">Which existing systems and data must be considered?</td></tr>
            <tr><td>Budget and dates</td><td class="text-[var(--text-muted)]">What financial and time frame applies?</td></tr>
            <tr><td>Acceptance and open points</td><td class="text-[var(--text-muted)]">How is goal achievement verified? What remains to be clarified?</td></tr>
            </table></div>
            <p class="text-xs text-[var(--text-muted)] mt-2">A sensible outline for the classroom, not a mandatory universal template.</p>`
        },
        {
            id: 'pflichtenheft-bausteine',
            titleDe: '3.4 Pflichtenheft: Bausteine',
            titleEn: '3.4 Specification: Building Blocks',
            htmlDe: `
            <div class="p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Merksatz:</strong> Wie und womit soll der vereinbarte Bedarf erfüllt werden? Der Auftragnehmer erarbeitet die Ausgestaltung und stimmt sie mit dem Auftraggeber ab.
            </div>
            <p class="text-[var(--text-muted)] mt-3">Das Pflichtenheft konkretisiert die Anforderungen zu einer realisierbaren Lösung. Es ist weder nur eine Kopie des Lastenhefts noch bereits der vollständige Programmcode.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Baustein</th><th>Inhalt</th></tr>
            <tr><td>Bezug zum Lastenheft</td><td class="text-[var(--text-muted)]">Zugeordnete Anforderungs-IDs, zugrunde gelegte Version und geklärte Abweichungen</td></tr>
            <tr><td>Lösungsbeschreibung</td><td class="text-[var(--text-muted)]">Geplante Funktionen, Abläufe und Struktur der Lösung</td></tr>
            <tr><td>Daten und Schnittstellen</td><td class="text-[var(--text-muted)]">Datenstruktur, Austauschregeln und Behandlung von Fehlern</td></tr>
            <tr><td>Qualität und Betrieb</td><td class="text-[var(--text-muted)]">Maßnahmen zur geforderten Qualität, Berechtigungen und Datensicherung</td></tr>
            <tr><td>Realisierung und Prüfung</td><td class="text-[var(--text-muted)]">Geplante Umsetzung, Testfälle und Bezug zu Abnahmekriterien</td></tr>
            <tr><td>Offene Punkte und Freigabe</td><td class="text-[var(--text-muted)]">Noch zu klärende Fragen, Annahmen und dokumentierte Zustimmung</td></tr>
            </table></div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              <strong>Beispiel L-01 (Lernbeispiel):</strong> Eine Eingabemaske bietet Felder für Gerätenummer, Person, Ausgabedatum und geplantes Rückgabedatum. Pflichtfelder werden vor dem Speichern geprüft; fehlende Werte werden am jeweiligen Feld angezeigt., Dies ist ein <em>beispielhafter Umsetzungsvorschlag</em>, keine zwingende Lösung. Auch eine andere geeignete Lösung wäre möglich.
            </div>`,
            htmlEn: `
            <div class="p-3 rounded border-l-4 border-[var(--accent-blue)] bg-[var(--panel-color)] text-sm">
              <strong>Mnemonic:</strong> How and with what shall the agreed need be fulfilled? The contractor develops the design and agrees it with the client.
            </div>
            <p class="text-[var(--text-muted)] mt-3">The specification concretises requirements into a realisable solution. It is neither merely a copy of the requirements specification nor the complete program code.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Element</th><th>Content</th></tr>
            <tr><td>Reference to requirements specification</td><td class="text-[var(--text-muted)]">Assigned requirement IDs, version applied and clarified deviations</td></tr>
            <tr><td>Solution description</td><td class="text-[var(--text-muted)]">Planned functions, processes and structure of the solution</td></tr>
            <tr><td>Data and interfaces</td><td class="text-[var(--text-muted)]">Data structure, exchange rules and error handling</td></tr>
            <tr><td>Quality and operations</td><td class="text-[var(--text-muted)]">Measures for required quality, permissions and backup</td></tr>
            <tr><td>Realisation and verification</td><td class="text-[var(--text-muted)]">Planned implementation, test cases and reference to acceptance criteria</td></tr>
            <tr><td>Open points and approval</td><td class="text-[var(--text-muted)]">Questions to clarify, assumptions and documented consent</td></tr>
            </table></div>
            <div class="mt-4 p-3 rounded border-l-4 border-[var(--accent-amber)] bg-[var(--panel-color)] text-sm">
              <strong>Example L-01 (learning example):</strong> A form provides fields for device number, person, issue date and planned return date. Mandatory fields are checked before saving; missing values are shown at the respective field., This is an <em>illustrative implementation proposal</em>, not a mandatory solution. Another suitable solution would also be possible.
            </div>`
        },
        {
            id: 'anforderungen-formulieren',
            titleDe: '3.5 Anforderungen prüfbar formulieren',
            titleEn: '3.5 Formulating Requirements Verifiably',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Gib jeder Anforderung eine ID. Formuliere möglichst eine überprüfbare Aussage pro Anforderung. Nenne die Quelle, Priorität und offene Fragen. Vermeide unbestimmte Wörter wie „schnell“, „modern“ oder „benutzerfreundlich“ ohne Erklärung.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Qualitätsmerkmal</th><th>Prüffrage</th></tr>
            <tr><td>Eindeutig</td><td class="text-[var(--text-muted)]">Verstehen alle Beteiligten dieselbe Leistung?</td></tr>
            <tr><td>Prüfbar</td><td class="text-[var(--text-muted)]">Sind Ergebnis, Bedingungen und Messung festgelegt?</td></tr>
            <tr><td>Konsistent</td><td class="text-[var(--text-muted)]">Widerspricht die Aussage einer anderen Anforderung?</td></tr>
            <tr><td>Vollständig genug</td><td class="text-[var(--text-muted)]">Sind benötigte Angaben enthalten oder offene Punkte benannt?</td></tr>
            <tr><td>Realisierbar</td><td class="text-[var(--text-muted)]">Ist die Leistung unter den Rahmenbedingungen erreichbar?</td></tr>
            <tr><td>Rückverfolgbar</td><td class="text-[var(--text-muted)]">Sind Ursprung, Umsetzung und Prüfung verknüpft?</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">Vom Wunsch zum Testfall, Lernbeispiel</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Wunsch</h4>
                <p class="text-sm text-[var(--text-muted)]">„Die Suche soll schnell sein.“</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Präzisierte Qualitätsanforderung · L-02</h4>
                <p class="text-sm text-[var(--text-muted)]">„Bei 1.000 vorhandenen Gerätedatensätzen und zehn gleichzeitig Suchenden erscheinen in der vereinbarten Testumgebung bei mindestens 95 von 100 Suchanfragen die Ergebnisse innerhalb von zwei Sekunden nach Absenden.“</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Abnahmekriterium</h4>
                <p class="text-sm text-[var(--text-muted)]">Mindestens 95 der 100 unter den vereinbarten Bedingungen gemessenen Suchanfragen erfüllen die Zwei-Sekunden-Grenze.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Testfall · T-02</h4>
                <p class="text-sm text-[var(--text-muted)]">1.000 vereinbarte Testdatensätze bereitstellen. Zehn gleichzeitige Nutzende simulieren. 100 festgelegte Suchanfragen ausführen und Zeit von Absenden bis vollständiger Ergebnisanzeige messen. Trefferzahl und Messprotokoll festhalten.</p>
              </div>
            </div>
            <p class="text-xs text-[var(--text-muted)] mt-2">Testdaten, Suchanfragen und Testumgebung werden vorab gemeinsam festgelegt. Ein einzelner schneller Suchlauf beweist die Anforderung nicht.</p>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">Give each requirement an ID. Formulate ideally one verifiable statement per requirement. Name source, priority and open questions. Avoid vague words such as "fast", "modern" or "user-friendly" without explanation.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Quality feature</th><th>Check question</th></tr>
            <tr><td>Unambiguous</td><td class="text-[var(--text-muted)]">Do all participants understand the same service?</td></tr>
            <tr><td>Verifiable</td><td class="text-[var(--text-muted)]">Are result, conditions and measurement defined?</td></tr>
            <tr><td>Consistent</td><td class="text-[var(--text-muted)]">Does the statement contradict another requirement?</td></tr>
            <tr><td>Sufficiently complete</td><td class="text-[var(--text-muted)]">Are needed details included or open points named?</td></tr>
            <tr><td>Realisable</td><td class="text-[var(--text-muted)]">Is the service achievable under the framework conditions?</td></tr>
            <tr><td>Traceable</td><td class="text-[var(--text-muted)]">Are origin, implementation and verification linked?</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">From wish to test case, learning example</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Wish</h4>
                <p class="text-sm text-[var(--text-muted)]">"The search should be fast."</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Precisified quality requirement · L-02</h4>
                <p class="text-sm text-[var(--text-muted)]">"With 1,000 existing device records and ten simultaneous searchers, in the agreed test environment at least 95 of 100 search queries display results within two seconds of submission."</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Acceptance criterion</h4>
                <p class="text-sm text-[var(--text-muted)]">At least 95 of the 100 search queries measured under the agreed conditions meet the two-second limit.</p>
              </div>
              <div class="bg-[var(--panel-color)] p-4 rounded border border-[var(--panel-border)]">
                <h4 class="mt-0 text-[var(--heading-color)]">Test case · T-02</h4>
                <p class="text-sm text-[var(--text-muted)]">Provide 1,000 agreed test records. Simulate ten simultaneous users. Execute 100 predefined search queries and measure time from submission to complete result display. Record hit count and measurement log.</p>
              </div>
            </div>
            <p class="text-xs text-[var(--text-muted)] mt-2">Test data, search queries and test environment are agreed in advance. A single fast search run does not prove the requirement.</p>`
        },
        {
            id: 'abstimmung-änderung',
            titleDe: '3.6 Abstimmung und Änderungsmanagement',
            titleEn: '3.6 Coordination and Change Management',
            htmlDe: `
            <div class="space-y-3 mt-3">
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>1.</strong> Bedarf erheben und offene Fragen dokumentieren</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>2.</strong> Lastenheft abstimmen</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>3.</strong> Pflichtenheft ausarbeiten und Rückfragen klären</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>4.</strong> Gemeinsames Review und Freigabe des Basisstands</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>5.</strong> Implementierung und Tests</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>6.</strong> Abnahmetest und dokumentierte Abnahmeentscheidung</div>
            </div>
            <p class="text-[var(--text-muted)] mt-3">Rücksprünge sind normal: Eine Umsetzungsidee kann eine neue Rückfrage auslösen. Freigabe und Abnahme haben unterschiedliche Aufgaben. Welche Dokumente verbindlich gelten, muss im konkreten Auftrag vereinbart werden.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Ursprung</th><th>Umsetzung</th><th>Prüfung</th></tr>
            <tr><td>L-01: Ausleihdaten erfassen</td><td class="text-[var(--text-muted)]">P-01: Eingabemaske und Prüfung der Pflichtfelder</td><td class="text-[var(--text-muted)]">T-01: vollständige und unvollständige Eingaben</td></tr>
            <tr><td>L-02: messbare Suchgeschwindigkeit</td><td class="text-[var(--text-muted)]">P-02: beschriebenes Suchverfahren und Maßnahmen zur Antwortzeit</td><td class="text-[var(--text-muted)]">T-02: Messung unter vereinbarter Last</td></tr>
            </table></div>
            <details class="mt-3 p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]">
              <summary class="cursor-pointer font-semibold text-[var(--heading-color)]">Änderung nach der Freigabe: zusätzlicher Datenexport</summary>
              <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 mt-2 space-y-1">
                <li>Änderungsantrag mit Anlass erfassen.</li>
                <li>Auswirkungen auf Umfang, Kosten, Termine und bestehende Anforderungen prüfen.</li>
                <li>Zuständige Beteiligte entscheiden lassen.</li>
                <li>Entscheidung, neue Version und betroffene Tests dokumentieren. Ein Wunsch ist noch keine Freigabe.</li>
              </ol>
            </details>`,
            htmlEn: `
            <div class="space-y-3 mt-3">
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>1.</strong> Elicit needs and document open questions</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>2.</strong> Agree requirements specification</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>3.</strong> Elaborate specification and clarify queries</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>4.</strong> Joint review and approval of baseline</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>5.</strong> Implementation and tests</div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]"><strong>6.</strong> Acceptance test and documented acceptance decision</div>
            </div>
            <p class="text-[var(--text-muted)] mt-3">Iterations are normal: an implementation idea may trigger a new question. Approval and acceptance serve different purposes. Which documents are binding must be agreed in the specific engagement.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Origin</th><th>Implementation</th><th>Verification</th></tr>
            <tr><td>L-01: record loan data</td><td class="text-[var(--text-muted)]">P-01: input form and mandatory field checks</td><td class="text-[var(--text-muted)]">T-01: complete and incomplete inputs</td></tr>
            <tr><td>L-02: measurable search speed</td><td class="text-[var(--text-muted)]">P-02: described search procedure and response-time measures</td><td class="text-[var(--text-muted)]">T-02: measurement under agreed load</td></tr>
            </table></div>
            <details class="mt-3 p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]">
              <summary class="cursor-pointer font-semibold text-[var(--heading-color)]">Change after approval: additional data export</summary>
              <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 mt-2 space-y-1">
                <li>Record change request with cause.</li>
                <li>Assess impact on scope, cost, schedule and existing requirements.</li>
                <li>Have responsible participants decide.</li>
                <li>Document decision, new version and affected tests. A wish is not yet an approval.</li>
              </ol>
            </details>`
        },
        {
            id: 'fallstudie-medienwerk',
            titleDe: '3.7 Fallstudie: Medienwerk West',
            titleEn: '3.7 Case Study: Medienwerk West',
            htmlDe: `
            <p class="text-[var(--text-muted)]">Fiktiver Unterrichtsfall. Ihr seid ein IT-Dienstleistungsteam und bereitet ein Erstgespräch vor. Die Akte enthält Beobachtungen und Wünsche; sie ist noch kein abgestimmtes Lastenheft.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Steckbrief</th><th>Ausgangsdaten</th></tr>
            <tr><td>Organisation</td><td class="text-[var(--text-muted)]">Medienwerk West, Schulungsanbieter mit 18 Beschäftigten an einem Standort</td></tr>
            <tr><td>Ansprechperson</td><td class="text-[var(--text-muted)]">Mara Seidel, 42, koordiniert Kurse und Geräteausgabe</td></tr>
            <tr><td>Persönlichkeit</td><td class="text-[var(--text-muted)]">Direkt, zeitknapp und kostenbewusst. Mag konkrete Beispiele, wird bei Fachsprache ungeduldig. Sorge, dass das Team doppelt dokumentieren muss.</td></tr>
            <tr><td>Budget</td><td class="text-[var(--text-muted)]">8.500 € netto als vorläufiger Gesamtrahmen für Einführung und erste zwölf Betriebsmonate; Verteilung offen</td></tr>
            <tr><td>Zeitrahmen</td><td class="text-[var(--text-muted)]">Gewünschter Einsatzbeginn in acht Wochen; große Kurswoche in Woche fünf</td></tr>
            <tr><td>Bestand</td><td class="text-[var(--text-muted)]">60 Notebooks, 12 Projektoren, 20 Zubehörkoffer; interne Gerätenummern vorhanden</td></tr>
            <tr><td>Beteiligte</td><td class="text-[var(--text-muted)]">Drei Personen geben Geräte aus. Verwaltung pflegt Personendaten. Leitung entscheidet über Ausgaben.</td></tr>
            <tr><td>Aktueller Ablauf</td><td class="text-[var(--text-muted)]">Ausleihen in gemeinsam bearbeiteter Tabelle; Rückgaben teils auf Papier notiert.</td></tr>
            <tr><td>Beobachtungen</td><td class="text-[var(--text-muted)]">Im letzten Monat 96 Ausleihen, davon acht ohne eingetragenes Rückgabedatum. Bei fünf Geräten musste telefonisch nach dem Standort gefragt werden.</td></tr>
            <tr><td>Technische Ausgangslage</td><td class="text-[var(--text-muted)]">Fünf Büro-PCs mit aktuellen Webbrowsern und Internetzugang. Bestandsliste als CSV exportierbar. Technikdienstleister betreut Geräte.</td></tr>
            <tr><td>Kundenäußerungen</td><td class="text-[var(--text-muted)]">„Ich möchte morgens sehen, was noch draußen ist.“ – „Es muss einfach sein.“ – „Vielleicht könnten Kursteilnehmende selbst reservieren?“</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">Arbeitsauftrag: erst klären, dann festlegen</h4>
            <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 space-y-1">
              <li><strong>Einzelarbeit · 5 Min:</strong> Markiere Fakten, Wünsche und offene Fragen. Erfinde keine fehlenden Kundenantworten.</li>
              <li><strong>Teamarbeit · 10 Min:</strong> Entwickelt mindestens acht offene Fragen zu Zielen, Ablauf, Nutzenden, Daten, Budget und Terminen. Begründet die drei wichtigsten.</li>
              <li><strong>Rollenspiel · 15 Min:</strong> Eine Person spielt Mara, zwei führen das Gespräch, eine protokolliert. Mara antwortet aus der Akte; zusätzliche Aussagen werden als im Rollenspiel vereinbarte Annahmen gekennzeichnet. Nicht entscheidbare Fragen bleiben offen.</li>
              <li><strong>Auswertung · 15 Min:</strong> Erstellt einen Lastenheft-Entwurf mit Ziel, Abgrenzung, mindestens fünf Anforderungen, Quellen und offenen Fragen. Stimmt Prioritäten im Team ab.</li>
              <li><strong>Fortführung · 20 Min:</strong> Übernehmt die Auftragnehmerrolle. Beschreibt für zwei geklärte Anforderungen begründete Umsetzungsvorschläge und die zugehörigen Testfälle in einem Pflichtenheft-Auszug.</li>
              <li><strong>Gegenseitiges Review · 10 Min:</strong> Ein anderes Team prüft Eindeutigkeit, Widersprüche und Rückverfolgbarkeit.</li>
            </ol>`,
            htmlEn: `
            <p class="text-[var(--text-muted)]">Fictional classroom case. You are an IT services team preparing an initial interview. The file contains observations and wishes; it is not yet an agreed requirements specification.</p>
            <div class="overflow-x-auto w-full mt-3"><table class="wikitable">
            <tr><th>Profile</th><th>Starting data</th></tr>
            <tr><td>Organisation</td><td class="text-[var(--text-muted)]">Medienwerk West, training provider with 18 employees at one site</td></tr>
            <tr><td>Contact</td><td class="text-[var(--text-muted)]">Mara Seidel, 42, coordinates courses and equipment issue</td></tr>
            <tr><td>Personality</td><td class="text-[var(--text-muted)]">Direct, time-pressed and cost-conscious. Likes concrete examples, impatient with jargon. Worried the team will have to document twice.</td></tr>
            <tr><td>Budget</td><td class="text-[var(--text-muted)]">€8,500 net as preliminary total frame for introduction and first twelve operating months; distribution open</td></tr>
            <tr><td>Time frame</td><td class="text-[var(--text-muted)]">Desired go-live in eight weeks; major course week in week five</td></tr>
            <tr><td>Inventory</td><td class="text-[var(--text-muted)]">60 notebooks, 12 projectors, 20 accessory cases; internal device numbers exist</td></tr>
            <tr><td>Participants</td><td class="text-[var(--text-muted)]">Three persons issue devices. Administration maintains personal data. Management decides on spending.</td></tr>
            <tr><td>Current process</td><td class="text-[var(--text-muted)]">Loans in a shared table; returns partly noted on paper.</td></tr>
            <tr><td>Observations</td><td class="text-[var(--text-muted)]">Last month 96 loans, of which eight without recorded return date. Five devices had to be traced by telephone.</td></tr>
            <tr><td>Technical baseline</td><td class="text-[var(--text-muted)]">Five office PCs with current browsers and internet access. Inventory exportable as CSV. Technology service provider maintains devices.</td></tr>
            <tr><td>Customer statements</td><td class="text-[var(--text-muted)]">"I want to see in the morning what's still out." – "It must be simple." – "Maybe course participants could reserve themselves?"</td></tr>
            </table></div>
            <h4 class="mt-4 text-[var(--heading-color)]">Assignment: clarify first, then specify</h4>
            <ol class="text-sm text-[var(--text-muted)] list-decimal pl-5 space-y-1">
              <li><strong>Individual · 5 min:</strong> Mark facts, wishes and open questions. Do not invent missing customer answers.</li>
              <li><strong>Team · 10 min:</strong> Develop at least eight open questions on goals, process, users, data, budget and dates. Justify the three most important.</li>
              <li><strong>Role-play · 15 min:</strong> One person plays Mara, two lead the interview, one takes minutes. Mara answers from the file; additional statements are marked as assumptions agreed in the role-play. Undecidable questions remain open.</li>
              <li><strong>Evaluation · 15 min:</strong> Create a requirements specification draft with goal, boundary, at least five requirements, sources and open questions. Agree priorities in the team.</li>
              <li><strong>Continuation · 20 min:</strong> Take the contractor role. Describe reasoned implementation proposals for two clarified requirements and the associated test cases in a specification extract.</li>
              <li><strong>Mutual review · 10 min:</strong> Another team checks unambiguity, contradictions and traceability.</li>
            </ol>`
        },
        {
            id: 'wissenscheck-lasten-pflichten',
            titleDe: '3.8 Wissenscheck',
            titleEn: '3.8 Knowledge Check',
            htmlDe: `
            <div class="mt-3 space-y-4" data-mukb-quiz="lasten-pflichten">
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="0">
                <p class="font-semibold text-[var(--text-color)]">1. Wer verantwortet das Lastenheft?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-0" value="0"> Auftraggeber</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-0" value="1"> Auftragnehmer allein</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-0" value="2"> Ausschließlich das Testteam</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="1">
                <p class="font-semibold text-[var(--text-color)]">2. Wozu dient das Pflichtenheft?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-1" value="0"> Es ersetzt alle Gespräche.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-1" value="1"> Es konkretisiert die vorgesehene Umsetzung der Anforderungen.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-1" value="2"> Es enthält nur Rechnungen.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="2">
                <p class="font-semibold text-[var(--text-color)]">3. Welche Aussage ist eine funktionale Anforderung?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-2" value="0"> Die Suche dauert höchstens zwei Sekunden.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-2" value="1"> Das Budget beträgt 8.500 €.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-2" value="2"> Die Ausgabekraft kann eine Rückgabe erfassen.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="3">
                <p class="font-semibold text-[var(--text-color)]">4. Was fehlt bei „Die Bedienung muss einfach sein“?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-3" value="0"> Prüfbare Bedingungen für die gewünschte Bedienqualität</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-3" value="1"> Ein möglichst komplizierter Begriff</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-3" value="2"> Eine bestimmte Programmiersprache</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="4">
                <p class="font-semibold text-[var(--text-color)]">5. Darf ein Lastenheft technische Vorgaben enthalten?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-4" value="0"> Nein, nie.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-4" value="1"> Ja, als begründete verbindliche Randbedingungen.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-4" value="2"> Nur Programmcode.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="5">
                <p class="font-semibold text-[var(--text-color)]">6. Was ist mit einer unbestätigten Kundenangabe zu tun?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-5" value="0"> Als beschlossen kennzeichnen</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-5" value="1"> Unbemerkt streichen</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-5" value="2"> Als Annahme kennzeichnen und klären</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="6">
                <p class="font-semibold text-[var(--text-color)]">7. Was verbindet Rückverfolgbarkeit?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-6" value="0"> Anforderung, Umsetzung und Prüfung</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-6" value="1"> Nur Farben und Schriftgrößen</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-6" value="2"> Nur Budget und Rechnung</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="7">
                <p class="font-semibold text-[var(--text-color)]">8. Nach Freigabe wird ein Datenexport gewünscht. Was ist zuerst nötig?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-7" value="0"> Sofort ohne Prüfung umsetzen</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-7" value="1"> Änderung erfassen und Auswirkungen bewerten</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-7" value="2"> Den Basisstand überschreiben</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="8">
                <p class="font-semibold text-[var(--text-color)]">9. Sind bestandener Test und Abnahme dasselbe?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-8" value="0"> Ja, immer.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-8" value="1"> Ja, wenn die Entwicklung das behauptet.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-8" value="2"> Nein; Abnahme erfordert die Anerkennung durch den Auftraggeber.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="9">
                <p class="font-semibold text-[var(--text-color)]">10. Wann erfüllt L-02 aus dem Lernbeispiel den Messgrenzwert?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-9" value="0"> 96 von 100 Suchanfragen innerhalb von zwei Sekunden unter den vereinbarten Bedingungen</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-9" value="1"> Ein beliebiger Suchlauf ist schnell</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-9" value="2"> 90 von 100 Suchanfragen erfüllen die Grenze</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="10">
                <p class="font-semibold text-[var(--text-color)]">11. Was bedeutet „Soll“ als Priorität in dieser Einheit?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-10" value="0"> Unwichtig und beliebig löschbar</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-10" value="1"> Wichtig; Abweichung nur nach Abstimmung</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-10" value="2"> Automatisch bereits umgesetzt</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="11">
                <p class="font-semibold text-[var(--text-color)]">12. Welche Aussage zur Kundenakte ist begründet?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-11" value="0"> Selbstreservierung ist bereits verpflichtend.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-11" value="1"> Eine fertige technische Lösung steht fest.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-11" value="2"> Selbstreservierung ist ein zu klärender Wunsch.</label>
              </div>
              <button data-mukb-check="lasten-pflichten" class="px-3 py-1.5 rounded bg-[var(--link-color)] text-white text-sm font-semibold">Antworten prüfen</button>
              <button data-mukb-reset="lasten-pflichten" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Zurücksetzen</button>
              <div class="mukb-quiz-feedback space-y-2 mt-2"></div>
              <p class="mukb-quiz-total text-sm text-[var(--text-muted)]">Noch nicht ausgewertet.</p>
            </div>`,
            htmlEn: `
            <div class="mt-3 space-y-4" data-mukb-quiz="lasten-pflichten">
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="0">
                <p class="font-semibold text-[var(--text-color)]">1. Who is responsible for the requirements specification?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-0" value="0"> Client</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-0" value="1"> Contractor alone</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-0" value="2"> Exclusively the test team</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="1">
                <p class="font-semibold text-[var(--text-color)]">2. What is the purpose of the specification?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-1" value="0"> It replaces all conversations.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-1" value="1"> It concretises the planned implementation of the requirements.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-1" value="2"> It contains only invoices.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="2">
                <p class="font-semibold text-[var(--text-color)]">3. Which statement is a functional requirement?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-2" value="0"> The search takes at most two seconds.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-2" value="1"> The budget is €8,500.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-2" value="2"> The issuing clerk can record a return.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="3">
                <p class="font-semibold text-[var(--text-color)]">4. What is missing in "The operation must be simple"?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-3" value="0"> Verifiable conditions for the desired usability quality</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-3" value="1"> A deliberately complicated term</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-3" value="2"> A specific programming language</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="4">
                <p class="font-semibold text-[var(--text-color)]">5. May a requirements specification contain technical constraints?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-4" value="0"> No, never.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-4" value="1"> Yes, as justified binding constraints.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-4" value="2"> Only program code.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="5">
                <p class="font-semibold text-[var(--text-color)]">6. What is to be done with an unconfirmed customer statement?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-5" value="0"> Mark as decided</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-5" value="1"> Silently delete</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-5" value="2"> Mark as assumption and clarify</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="6">
                <p class="font-semibold text-[var(--text-color)]">7. What does traceability link?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-6" value="0"> Requirement, implementation and verification</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-6" value="1"> Only colours and font sizes</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-6" value="2"> Only budget and invoice</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="7">
                <p class="font-semibold text-[var(--text-color)]">8. After approval a data export is requested. What is needed first?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-7" value="0"> Implement immediately without review</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-7" value="1"> Record the change and assess impacts</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-7" value="2"> Overwrite the baseline</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="8">
                <p class="font-semibold text-[var(--text-color)]">9. Are a passed test and acceptance the same thing?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-8" value="0"> Yes, always.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-8" value="1"> Yes, if development claims so.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-8" value="2"> No; acceptance requires acknowledgement by the client.</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="9">
                <p class="font-semibold text-[var(--text-color)]">10. When does L-02 from the learning example meet its measurement limit?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-9" value="0"> 96 of 100 search queries within two seconds under the agreed conditions</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-9" value="1"> Any single search run is fast</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-9" value="2"> 90 of 100 search queries meet the limit</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="10">
                <p class="font-semibold text-[var(--text-color)]">11. What does "Should" mean as a priority in this unit?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-10" value="0"> Unimportant and freely deletable</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-10" value="1"> Important; deviation only by agreement</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-10" value="2"> Automatically implemented</label>
              </div>
              <div class="p-3 rounded border border-[var(--panel-border)] bg-[var(--panel-color)]" data-q="11">
                <p class="font-semibold text-[var(--text-color)]">12. Which statement about the case file is justified?</p>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-11" value="0"> Self-reservation is already mandatory.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-11" value="1"> A finished technical solution is decided.</label>
                <label class="block text-sm text-[var(--text-muted)]"><input type="radio" name="lp-11" value="2"> Self-reservation is a wish to be clarified.</label>
              </div>
              <button data-mukb-check="lasten-pflichten" class="px-3 py-1.5 rounded bg-[var(--link-color)] text-white text-sm font-semibold">Check answers</button>
              <button data-mukb-reset="lasten-pflichten" class="px-3 py-1.5 rounded border border-[var(--border-color)] text-[var(--text-color)] text-sm font-semibold">Reset</button>
              <div class="mukb-quiz-feedback space-y-2 mt-2"></div>
              <p class="mukb-quiz-total text-sm text-[var(--text-muted)]">Not yet evaluated.</p>
            </div>`
        }
    ]
};
