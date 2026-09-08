(function() {
    // 1. Inject custom styles for the app's internal theming
    const styleId = 'dsgvo-app-styles';
    if (!document.getElementById(styleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = `
            :root {
                --dsgvo-bg: #ffffff;
                --dsgvo-text: #1f2937;
                --dsgvo-card: #ffffff;
                --dsgvo-border: #e5e7eb;
                --dsgvo-primary: #2563eb;
                --dsgvo-secondary: #059669;
                --dsgvo-warning: #d97706;
                --dsgvo-danger: #dc2626;
                --dsgvo-muted: #6b7280;
            }

            .dsgvo-dark-theme {
                /* Integrating with KDE vars where appropriate, or defining explicit dark mode colors */
                --dsgvo-bg: var(--tw-colors-kde-window-bg, #24292e);
                --dsgvo-text: var(--tw-colors-kde-text, #e1e4e8);
                --dsgvo-card: var(--tw-colors-kde-panel, #2f363d);
                --dsgvo-border: var(--tw-colors-kde-window-border, #444d56);
                --dsgvo-primary: var(--tw-colors-kde-accent, #3daee9);
                --dsgvo-secondary: #34d399;
                --dsgvo-warning: #fbbf24;
                --dsgvo-danger: #f87171;
                --dsgvo-muted: #959da5;
            }

            /* Custom scrollbar to match KDE style */
            ::-webkit-scrollbar {
                width: 8px;
            }
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            ::-webkit-scrollbar-thumb {
                background-color: var(--tw-colors-kde-window-border, #555);
                border-radius: 4px;
            }

            /* Language visibility classes */
            .lang-en { display: none; }
            .show-en .lang-en { display: block; }
            .show-en .lang-de { display: none; }
            .show-en .lang-en-inline { display: inline; }
            .show-en .lang-de-inline { display: none; }
            .lang-en-inline { display: none; }
            
            /* Card interactions */
            .article-card {
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .article-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
            }
        `;
        document.head.appendChild(styleEl);
    }

    // 2. Define the HTML content
    const appHTML = `
    <div id="dsgvo-app-root" class="dsgvo-dark-theme w-full h-full p-4 sm:p-6 overflow-y-auto" style="background-color: var(--dsgvo-bg); color: var(--dsgvo-text); transition: background-color 0.3s, color 0.3s;">
        
        <!-- Top Navigation / Controls -->
        <div class="max-w-4xl mx-auto flex justify-end gap-3 mb-8 sticky top-0 z-10 py-2 backdrop-blur-md bg-opacity-80" style="background-color: rgba(var(--dsgvo-bg-rgb, 36, 41, 46), 0.85);">
            
            <!-- Language Toggle Button -->
            <button id="langToggleBtn" class="flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-sm border focus:outline-none" style="background-color: var(--dsgvo-card); border-color: var(--dsgvo-border); color: var(--dsgvo-text);">
                <span class="font-semibold lang-de-inline">DE</span>
                <span class="font-semibold lang-en-inline opacity-50">DE</span>
                <span class="opacity-50">/</span>
                <span class="font-semibold lang-de-inline opacity-50">EN</span>
                <span class="font-semibold lang-en-inline">EN</span>
            </button>

            <!-- Theme Toggle Button -->
            <button id="themeToggleBtn" class="w-9 h-9 flex justify-center items-center rounded transition-colors border focus:outline-none" aria-label="Toggle Theme" style="background-color: var(--dsgvo-card); border-color: var(--dsgvo-border); color: var(--dsgvo-text);">
                <i id="themeIconDark" class="fa-solid fa-moon text-indigo-400 hidden"></i>
                <i id="themeIconLight" class="fa-solid fa-sun text-amber-400 block"></i>
            </button>
        </div>

        <!-- Header -->
        <header class="max-w-4xl mx-auto text-center mb-12">
            <h1 class="text-3xl md:text-5xl font-bold tracking-tight mb-4" style="color: var(--dsgvo-primary);">
                <span class="lang-de">DSGVO Leicht Erklärt</span>
                <span class="lang-en">GDPR Explained Simply</span>
            </h1>
            <p class="text-lg md:text-xl max-w-2xl mx-auto" style="color: var(--dsgvo-muted);">
                <span class="lang-de">Ein Bildungsleitfaden zu den Artikeln 6 bis 9 der Datenschutz-Grundverordnung (DSGVO) mit Alltagsbeispielen.</span>
                <span class="lang-en">An educational guide to Articles 6 through 9 of the General Data Protection Regulation (GDPR) with everyday examples.</span>
            </p>
        </header>

        <!-- Main Content Area -->
        <main class="max-w-4xl mx-auto space-y-8 pb-12">

            <!-- Article 6 -->
            <section class="article-card rounded-xl p-6 relative border" style="background-color: var(--dsgvo-card); border-color: var(--dsgvo-border);">
                <div class="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style="background-color: var(--dsgvo-primary);">6</div>
                
                <h2 class="text-2xl font-semibold mb-4" style="color: var(--dsgvo-primary);">
                    <span class="lang-de">Rechtmäßigkeit der Verarbeitung</span>
                    <span class="lang-en">Lawfulness of processing</span>
                </h2>
                
                <div class="space-y-4 text-base leading-relaxed">
                    <div class="lang-de">
                        <p><strong>Worum geht es?</strong> Dieser Artikel ist der Türsteher für deine Daten. Er regelt, wann Unternehmen überhaupt personenbezogene Daten verarbeiten (sammeln, speichern, nutzen) dürfen. Ohne einen gültigen Grund (Rechtsgrundlage) ist es verboten.</p>
                        <p>Es muss <strong>mindestens eine</strong> dieser Bedingungen erfüllt sein:</p>
                        <ul class="list-disc pl-5 space-y-2 mt-2" style="color: var(--dsgvo-muted);">
                            <li><strong style="color: var(--dsgvo-text);">Einwilligung:</strong> Du hast klar "Ja" gesagt.</li>
                            <li><strong style="color: var(--dsgvo-text);">Vertrag:</strong> Die Daten sind nötig, um einen Vertrag mit dir zu erfüllen.</li>
                            <li><strong style="color: var(--dsgvo-text);">Rechtliche Verpflichtung:</strong> Das Gesetz verlangt es (z.B. für die Steuer).</li>
                            <li><strong style="color: var(--dsgvo-text);">Berechtigtes Interesse:</strong> Das Unternehmen hat einen triftigen Grund, der wichtiger ist als deine Privatsphäre in diesem speziellen Moment (z.B. IT-Sicherheit).</li>
                        </ul>
                    </div>
                    <div class="lang-en">
                        <p><strong>What is it about?</strong> This article is the bouncer for your data. It regulates when companies are even allowed to process (collect, store, use) personal data. Without a valid reason (legal basis), it is prohibited.</p>
                        <p><strong>At least one</strong> of these conditions must be met:</p>
                        <ul class="list-disc pl-5 space-y-2 mt-2" style="color: var(--dsgvo-muted);">
                            <li><strong style="color: var(--dsgvo-text);">Consent:</strong> You have clearly said "Yes".</li>
                            <li><strong style="color: var(--dsgvo-text);">Contract:</strong> The data is necessary to fulfill a contract with you.</li>
                            <li><strong style="color: var(--dsgvo-text);">Legal obligation:</strong> The law requires it (e.g., for taxes).</li>
                            <li><strong style="color: var(--dsgvo-text);">Legitimate interest:</strong> The company has a valid reason that is more important than your privacy in that specific moment (e.g., IT security).</li>
                        </ul>
                    </div>
                </div>

                <div class="mt-6 p-4 rounded-lg border-l-4" style="background-color: rgba(var(--dsgvo-bg-rgb, 0,0,0), 0.2); border-left-color: var(--dsgvo-primary);">
                    <h3 class="font-semibold flex items-center gap-2 mb-3" style="color: var(--dsgvo-text);">
                        <i class="fa-solid fa-lightbulb text-yellow-500"></i>
                        <span class="lang-de">Beispiele aus dem Alltag</span>
                        <span class="lang-en">Everyday Examples</span>
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex gap-3">
                            <i class="fa-solid fa-check text-green-500 mt-1"></i>
                            <p><span class="font-semibold lang-de">Vertrag:</span><span class="font-semibold lang-en">Contract:</span> 
                                <span class="lang-de">Du bestellst eine Pizza online. Die Pizzeria muss deine Adresse speichern und an den Fahrer weitergeben, sonst bekommst du kein Essen.</span>
                                <span class="lang-en">You order a pizza online. The pizzeria must store your address and give it to the driver, otherwise you won't get your food.</span>
                            </p>
                        </div>
                        <div class="flex gap-3">
                            <i class="fa-solid fa-check text-green-500 mt-1"></i>
                            <p><span class="font-semibold lang-de">Einwilligung:</span><span class="font-semibold lang-en">Consent:</span> 
                                <span class="lang-de">Du meldest dich freiwillig für einen E-Mail-Newsletter für Rabatte an und klickst auf "Abonnieren".</span>
                                <span class="lang-en">You voluntarily sign up for an email newsletter for discounts and click "Subscribe".</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Article 7 -->
            <section class="article-card rounded-xl p-6 relative border" style="background-color: var(--dsgvo-card); border-color: var(--dsgvo-border);">
                <div class="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style="background-color: var(--dsgvo-secondary);">7</div>
                
                <h2 class="text-2xl font-semibold mb-4" style="color: var(--dsgvo-secondary);">
                    <span class="lang-de">Bedingungen für die Einwilligung</span>
                    <span class="lang-en">Conditions for consent</span>
                </h2>
                
                <div class="space-y-4 text-base leading-relaxed">
                    <div class="lang-de">
                        <p><strong>Worum geht es?</strong> Wenn ein Unternehmen Daten sammeln will und sagt "Der Nutzer hat ja eingewilligt" (siehe Artikel 6), dann gelten dafür strenge Spielregeln.</p>
                        <ul class="list-disc pl-5 space-y-2 mt-2" style="color: var(--dsgvo-muted);">
                            <li><strong style="color: var(--dsgvo-text);">Nachweis:</strong> Das Unternehmen muss beweisen können, DASS du zugestimmt hast.</li>
                            <li><strong style="color: var(--dsgvo-text);">Verständlich & Freiwillig:</strong> Die Frage nach der Erlaubnis darf nicht im Kleingedruckten versteckt sein. Sie muss in einfacher Sprache formuliert sein. Du darfst nicht gezwungen werden (z.B. "Du darfst das Spiel nur spielen, wenn du unseren Werbe-Newsletter abonnierst" ist oft verboten).</li>
                            <li><strong style="color: var(--dsgvo-text);">Widerruf:</strong> Du kannst es dir jederzeit anders überlegen. Es muss genauso einfach sein, die Einwilligung zurückzuziehen, wie es war, sie zu geben.</li>
                        </ul>
                    </div>
                    <div class="lang-en">
                        <p><strong>What is it about?</strong> If a company wants to collect data and says "The user consented" (see Article 6), strict rules apply.</p>
                        <ul class="list-disc pl-5 space-y-2 mt-2" style="color: var(--dsgvo-muted);">
                            <li><strong style="color: var(--dsgvo-text);">Proof:</strong> The company must be able to demonstrate THAT you consented.</li>
                            <li><strong style="color: var(--dsgvo-text);">Understandable & Freely given:</strong> The request for permission must not be hidden in fine print. It must be in plain language. You cannot be forced (e.g., "You can only play this game if you subscribe to our marketing newsletter" is often prohibited).</li>
                            <li><strong style="color: var(--dsgvo-text);">Withdrawal:</strong> You can change your mind at any time. It must be as easy to withdraw consent as it was to give it.</li>
                        </ul>
                    </div>
                </div>

                <div class="mt-6 p-4 rounded-lg border-l-4" style="background-color: rgba(var(--dsgvo-bg-rgb, 0,0,0), 0.2); border-left-color: var(--dsgvo-secondary);">
                    <h3 class="font-semibold flex items-center gap-2 mb-3" style="color: var(--dsgvo-text);">
                        <i class="fa-solid fa-lightbulb text-yellow-500"></i>
                        <span class="lang-de">Beispiele aus dem Alltag</span>
                        <span class="lang-en">Everyday Examples</span>
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex gap-3">
                            <i class="fa-solid fa-check text-green-500 mt-1"></i>
                            <p><span class="font-semibold lang-de">Richtig (Widerruf):</span><span class="font-semibold lang-en">Correct (Withdrawal):</span> 
                                <span class="lang-de">Jede Werbe-E-Mail hat ganz unten einen deutlich sichtbaren "Abmelden"-Link. Ein Klick, und du bist draußen.</span>
                                <span class="lang-en">Every promotional email has a clearly visible "Unsubscribe" link at the very bottom. One click, and you're out.</span>
                            </p>
                        </div>
                        <div class="flex gap-3">
                            <i class="fa-solid fa-xmark text-red-500 mt-1"></i>
                            <p><span class="font-semibold lang-de">Falsch (Unverständlich):</span><span class="font-semibold lang-en">Wrong (Incomprehensible):</span> 
                                <span class="lang-de">Eine App hat ein vorab angekreuztes Kästchen versteckt auf Seite 10 der Nutzungsbedingungen, durch das du "zustimmst", dass deine Daten an Dritte verkauft werden.</span>
                                <span class="lang-en">An app has a pre-ticked box hidden on page 10 of the terms of use, by which you "consent" to your data being sold to third parties.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Article 8 -->
            <section class="article-card rounded-xl p-6 relative border" style="background-color: var(--dsgvo-card); border-color: var(--dsgvo-border);">
                <div class="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style="background-color: var(--dsgvo-warning);">8</div>
                
                <h2 class="text-2xl font-semibold mb-4" style="color: var(--dsgvo-warning);">
                    <span class="lang-de">Einwilligung eines Kindes</span>
                    <span class="lang-en">Child's consent</span>
                </h2>
                
                <div class="space-y-4 text-base leading-relaxed">
                    <div class="lang-de">
                        <p><strong>Worum geht es?</strong> Kinder sind online besonders gefährdet und brauchen extra Schutz, vor allem bei Social Media, Apps und Online-Spielen ("Dienste der Informationsgesellschaft").</p>
                        <p>Die Hauptregel:</p>
                        <ul class="list-disc pl-5 space-y-2 mt-2" style="color: var(--dsgvo-muted);">
                            <li>Bist du unter <strong>16 Jahre</strong> alt, reicht deine eigene "Zustimmung" oft rechtlich nicht aus, um z.B. ein Profil bei TikTok oder Instagram zu erstellen, wenn dafür deine Daten verarbeitet werden.</li>
                            <li>In diesem Fall müssen deine Eltern (oder Erziehungsberechtigten) einwilligen.</li>
                            <li><i>Ausnahme: Mitgliedsstaaten können das Alter senken, aber nicht unter 13 Jahre. In Deutschland gilt generell 16 Jahre.</i></li>
                            <li>App-Anbieter müssen sich anstrengen, um zu prüfen, ob wirklich die Eltern zugestimmt haben, nicht nur das Kind heimlich.</li>
                        </ul>
                    </div>
                    <div class="lang-en">
                        <p><strong>What is it about?</strong> Children are particularly vulnerable online and need extra protection, especially with social media, apps, and online games ("information society services").</p>
                        <p>The main rule:</p>
                        <ul class="list-disc pl-5 space-y-2 mt-2" style="color: var(--dsgvo-muted);">
                            <li>If you are under <strong>16 years</strong> old, your own "consent" is legally not enough to, for example, create a profile on TikTok or Instagram if your data is processed for it.</li>
                            <li>In this case, your parents (or legal guardians) must consent.</li>
                            <li><i>Exception: Member states can lower the age limit, but not below 13 years. In Germany, the limit is generally 16 years.</i></li>
                            <li>App providers must make reasonable efforts to verify that the parents actually gave consent, not just the child secretly.</li>
                        </ul>
                    </div>
                </div>

                <div class="mt-6 p-4 rounded-lg border-l-4" style="background-color: rgba(var(--dsgvo-bg-rgb, 0,0,0), 0.2); border-left-color: var(--dsgvo-warning);">
                    <h3 class="font-semibold flex items-center gap-2 mb-3" style="color: var(--dsgvo-text);">
                        <i class="fa-solid fa-lightbulb text-yellow-500"></i>
                        <span class="lang-de">Beispiel aus dem Alltag</span>
                        <span class="lang-en">Everyday Example</span>
                    </h3>
                    <div class="flex gap-3 text-sm">
                        <i class="fa-solid fa-mobile-screen mt-1 text-gray-400"></i>
                        <p>
                            <span class="lang-de">Ein 14-jähriger Junge möchte ein neues Online-Multiplayer-Spiel spielen, das ein Profil mit E-Mail und Namen erfordert. Das Spiel fragt nach dem Alter. Da er 14 eingibt, blockiert das Spiel die Anmeldung und schickt eine E-Mail an die Adresse der Eltern, in der sie gebeten werden, das Konto per Kreditkarte oder Ausweis kurz zu verifizieren.</span>
                            <span class="lang-en">A 14-year-old boy wants to play a new online multiplayer game that requires a profile with an email and name. The game asks for his age. Since he enters 14, the game blocks the registration and sends an email to the parents' address, asking them to briefly verify the account via credit card or ID.</span>
                        </p>
                    </div>
                </div>
            </section>

            <!-- Article 9 -->
            <section class="article-card rounded-xl p-6 relative border" style="background-color: var(--dsgvo-card); border-color: var(--dsgvo-border);">
                <div class="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg" style="background-color: var(--dsgvo-danger);">9</div>
                
                <h2 class="text-2xl font-semibold mb-4" style="color: var(--dsgvo-danger);">
                    <span class="lang-de">Verarbeitung besonderer Kategorien (Sensible Daten)</span>
                    <span class="lang-en">Processing of special categories (Sensitive Data)</span>
                </h2>
                
                <div class="space-y-4 text-base leading-relaxed">
                    <div class="lang-de">
                        <p><strong>Worum geht es?</strong> Nicht alle Daten sind gleich. Manche Informationen über dich sind so privat und heikel, dass das Gesetz sagt: <strong>Die Verarbeitung ist grundsätzlich verboten!</strong></p>
                        <p>Das nennt man "Besondere Kategorien personenbezogener Daten". Dazu gehören:</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 mb-3" style="color: var(--dsgvo-muted);">
                            <div class="flex items-center gap-2"><i class="fa-solid fa-heart-pulse text-red-400"></i> Gesundheitsdaten</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-fingerprint text-gray-400"></i> Biometrische/Genetische Daten</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-landmark text-blue-400"></i> Politische Meinungen</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-person-praying text-yellow-500"></i> Religion / Weltanschauung</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-venus-mars text-purple-400"></i> Sexuelle Orientierung</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-earth-americas text-green-400"></i> Ethnische Herkunft</div>
                        </div>
                        <p>Es gibt nur wenige <strong>Ausnahmen</strong>, wann sie doch verarbeitet werden dürfen, z.B. wenn du ausdrücklich eingewilligt hast (und zwar expliziter als sonst!), wenn es lebensnotwendig ist, oder im Rahmen der medizinischen Behandlung beim Arzt.</p>
                    </div>
                    <div class="lang-en">
                        <p><strong>What is it about?</strong> Not all data is equal. Some information about you is so private and sensitive that the law says: <strong>Processing is fundamentally prohibited!</strong></p>
                        <p>These are called "Special categories of personal data". They include:</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 mb-3" style="color: var(--dsgvo-muted);">
                            <div class="flex items-center gap-2"><i class="fa-solid fa-heart-pulse text-red-400"></i> Health data</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-fingerprint text-gray-400"></i> Biometric/Genetic data</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-landmark text-blue-400"></i> Political opinions</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-person-praying text-yellow-500"></i> Religion / Beliefs</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-venus-mars text-purple-400"></i> Sexual orientation</div>
                            <div class="flex items-center gap-2"><i class="fa-solid fa-earth-americas text-green-400"></i> Ethnic origin</div>
                        </div>
                        <p>There are only a few <strong>exceptions</strong> when they can be processed, e.g., if you have explicitly consented (more explicitly than usual!), if it is vital to protect a life, or during medical treatment by a doctor.</p>
                    </div>
                </div>

                <div class="mt-6 p-4 rounded-lg border-l-4" style="background-color: rgba(var(--dsgvo-bg-rgb, 0,0,0), 0.2); border-left-color: var(--dsgvo-danger);">
                    <h3 class="font-semibold flex items-center gap-2 mb-3" style="color: var(--dsgvo-text);">
                        <i class="fa-solid fa-lightbulb text-yellow-500"></i>
                        <span class="lang-de">Beispiele aus dem Alltag</span>
                        <span class="lang-en">Everyday Examples</span>
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div class="flex gap-3">
                            <i class="fa-solid fa-xmark text-red-500 mt-1"></i>
                            <p><span class="font-semibold lang-de">Verboten:</span><span class="font-semibold lang-en">Prohibited:</span> 
                                <span class="lang-de">Du meldest dich in einem normalen Fitnessstudio an. Das Formular fragt nach deiner sexuellen Orientierung oder deiner Religion. Das geht das Studio absolut nichts an und ist verboten.</span>
                                <span class="lang-en">You sign up for a normal gym. The form asks for your sexual orientation or your religion. That is absolutely none of the gym's business and is prohibited.</span>
                            </p>
                        </div>
                        <div class="flex gap-3">
                            <i class="fa-solid fa-check text-green-500 mt-1"></i>
                            <p><span class="font-semibold lang-de">Erlaubt (Ausnahme):</span><span class="font-semibold lang-en">Allowed (Exception):</span> 
                                <span class="lang-de">Dein Hausarzt speichert deine Blutwerte und Krankengeschichte. Das sind hochsensible Gesundheitsdaten, aber die Ausnahme greift hier für die medizinische Versorgung (unter ärztlicher Schweigepflicht).</span>
                                <span class="lang-en">Your family doctor stores your blood values and medical history. This is highly sensitive health data, but the exception applies here for medical care (under medical confidentiality).</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </main>
        
        <footer class="max-w-4xl mx-auto text-center pb-6 text-sm" style="color: var(--dsgvo-muted);">
            <p class="lang-de">Nur für Bildungszwecke. Keine Rechtsberatung.</p>
            <p class="lang-en">For educational purposes only. Not legal advice.</p>
        </footer>
    </div>
    `;

    // 3. Inject into the DOM
    document.body.innerHTML = appHTML;

    // 4. Implement Logic (Language & Theme Toggles)
    const container = document.getElementById('dsgvo-app-root');
    const langToggleBtn = document.getElementById('langToggleBtn');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIconDark = document.getElementById('themeIconDark');
    const themeIconLight = document.getElementById('themeIconLight');

    // Language State
    let isEnglish = false; // Default is German

    function updateLanguage() {
        if (isEnglish) {
            container.classList.add('show-en');
        } else {
            container.classList.remove('show-en');
        }
    }

    langToggleBtn.addEventListener('click', () => {
        isEnglish = !isEnglish;
        updateLanguage();
    });

    // Theme State
    // Default to Dark Mode as requested
    let isDarkMode = true; 

    function updateTheme() {
        if (isDarkMode) {
            container.classList.add('dsgvo-dark-theme');
            // Show light icon (to switch to light mode)
            themeIconDark.classList.add('hidden');
            themeIconLight.classList.remove('hidden');
        } else {
            container.classList.remove('dsgvo-dark-theme');
            // Show dark icon (to switch to dark mode)
            themeIconLight.classList.add('hidden');
            themeIconDark.classList.remove('hidden');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        updateTheme();
    });

    // Initial setup
    updateLanguage();
    updateTheme();

})();