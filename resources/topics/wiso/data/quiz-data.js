// resources/topics/wiso/data/quiz-data.js
// Handelsrecht: multiple-choice answers + final quiz questions.

export const QA = {
    hrHeinzGewerbe: ['b', 'Richtig. Gewerbeeigenschaft und Registereintragung sind getrennt zu prüfen. Die Markttätigkeit kann vor der Eintragung beginnen.'],
    hrK1: ['ist', 'Richtig. Umfang und Organisationskomplexität sprechen klar für ein Handelsgewerbe nach § 1 HGB.'],
    hrK2: ['kann', 'Richtig. Beim Kleingewerbe begründet die freiwillige Eintragung den Status nach § 2 HGB.'],
    hrK3: ['form', 'Richtig. Eine GmbH ist kraft Rechtsform Kaufmann.'],
    hrHgb1: ['b', 'Richtig. § 377 HGB ist als Sonderregel zu prüfen, weil auf beiden Seiten Kaufleute im betrieblichen Warenkauf handeln.'],
    hrProkura: ['nein', 'Richtig. Der Widerruf der Prokura ist eintragungspflichtig. Solange er nicht eingetragen und bekannt gemacht ist, schützt § 15 Abs. 1 HGB grundsätzlich den gutgläubigen Dritten. Kenntnis würde den Schutz ausschließen.'],
    hrHr1: ['hrb', 'Richtig. Kapitalgesellschaften wie die GmbH werden in Abteilung B geführt.'],
    hrFirma1: ['b', 'Richtig. Für eine GmbH muss die Firma den Rechtsformzusatz enthalten. Zusätzlich sind Unterscheidungskraft und Irreführungsverbot zu prüfen.']
};

export const QUIZ_QUESTIONS = [
    ['Was kennzeichnet den Istkaufmann?', ['Erst die freiwillige Eintragung', 'Betrieb eines Handelsgewerbes nach § 1 HGB', 'Eine kaufmännische Ausbildung'], 1],
    ['Wo wird ein Einzelkaufmann eingetragen?', ['HRA', 'HRB', 'Vereinsregister'], 0],
    ['Welche Wirkung hat die Eintragung eines Kleingewerbetreibenden nach § 2 HGB?', ['deklaratorisch', 'konstitutiv', 'keine'], 1],
    ['Was ist die Firma?', ['der Betriebssitz', 'der Name des Kaufmanns im Geschäftsverkehr', 'jede Geschäftsbezeichnung'], 1],
    ['Wann greift § 377 HGB?', ['bei jedem Verbraucherkauf', 'bei jedem Vertrag', 'insbesondere beim beiderseitigen Handelskauf'], 2],
    ['Wer darf das Handelsregister einsehen?', ['grundsätzlich jeder zu Informationszwecken', 'nur Kaufleute', 'nur Personen mit besonderem Interesse'], 0],
    ['Was entscheidet über ein Handelsgewerbe?', ['nur der Umsatz', 'das Gesamtbild von Art und Umfang', 'nur die Zahl der Mitarbeitenden'], 1],
    ['Welche Aussage stimmt?', ['Gewerbeanmeldung ersetzt Registereintragung', 'HGB verdrängt das BGB vollständig', 'HGB ergänzt/modifiziert das BGB in seinem Sonderbereich'], 2]
];