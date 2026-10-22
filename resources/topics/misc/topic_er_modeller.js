// resources/topics/topic_er_modeller.js

registerTopic({
    id: 'ER Modeler',

    // ── SUB-CATEGORY ────────────────────────────────────────────
    parentId: 'Informatik',
    // ────────────────────────────────────────────────────────────

    icon: 'fa-diagram-project',
    titleDe: 'ER-Modeller',
    titleEn: 'ER Modeler',
    descDe: 'Interaktives Werkzeug zum Erstellen von Entity-Relationship-Modellen — Tabellen anlegen, Attribute pflegen, Beziehungen ziehen.',
    descEn: 'Interactive tool for building entity-relationship models — create tables, edit attributes, draw relationships.',

    sidebarTitleDe: 'ER-Modeller',
    sidebarTitleEn: 'ER Modeler',
    sidebarSubtitleDe: 'Interaktives Werkzeug',
    sidebarSubtitleEn: 'Interactive Tool',
    sidebarVersion: '2026',

    hero: {
        titleDe: 'ER-Modeller',
        titleEn: 'ER Modeler',
        introDe: 'Ein interaktives Werkzeug zum Erstellen von <strong>Entity-Relationship-Modellen</strong>. Lege Tabellen an, füge Attribute hinzu, ziehe Beziehungen zwischen Spalten oder ganzen Tabellen und konfiguriere die Kardinalitäten. Ideal zum Üben und Visualisieren von Datenbankentwürfen.',
        introEn: 'An interactive tool for building <strong>entity-relationship models</strong>. Create tables, add attributes, draw relationships between columns or whole tables, and configure cardinalities. Ideal for practicing and visualizing database designs.'
    },

    quickLinks: [
        { icon: 'fa-diagram-project', href: '#section-tool', switchToDoc: true, labelDe: 'Zum Modeller', labelEn: 'Open Modeler' },
        { icon: 'fa-circle-info',     href: '#section-help', switchToDoc: true, labelDe: 'Bedienung',      labelEn: 'How to Use' }
    ],

    sections: [
        /* ============================================================
           SECTION — THE TOOL
           ============================================================ */
        {
            id: 'section-tool',
            titleDe: 'Interaktiver ER-Modeller',
            titleEn: 'Interactive ER Modeler',
            introDe: 'Zeichne dein Datenmodell direkt im Browser. Klicke auf "Tabelle hinzufügen", um zu starten.',
            introEn: 'Draw your data model directly in the browser. Click "Add Table" to start.',
            subtopics: [
                {
                    id: 'subsection-tool-main',
                    titleDe: 'Arbeitsfläche',
                    titleEn: 'Workspace',
                    htmlDe: `
                    <div class="er-modeller-root">
                        <style>
                            .er-modeller-root {
                                position: relative;
                                width: 100%;
                                height: 640px;
                                border: 1px solid var(--border-color);
                                border-radius: 0.5rem;
                                overflow: hidden;
                                background-color: var(--bg-color);
                                font-family: 'Inter', sans-serif;
                                color: var(--text-color);
                            }
                            .er-app {
                                display: flex;
                                height: 100%;
                                width: 100%;
                            }
                            .er-toolbar {
                                width: 220px;
                                background-color: var(--panel-color);
                                border-right: 1px solid var(--border-color);
                                display: flex;
                                flex-direction: column;
                                padding: 0.85rem;
                                gap: 0.75rem;
                                flex-shrink: 0;
                                overflow-y: auto;
                            }
                            .er-toolbar h3 {
                                font-size: 0.8rem;
                                font-weight: 700;
                                color: var(--heading-color);
                                margin: 0 0 0.25rem 0;
                                display: flex;
                                align-items: center;
                                gap: 0.4rem;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-toolbar h3 i { color: var(--link-color); }
                            .er-btn {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 0.4rem;
                                padding: 0.5rem 0.75rem;
                                border-radius: 0.4rem;
                                border: 1px solid var(--border-color);
                                background: var(--bg-color);
                                color: var(--text-color);
                                font-size: 0.72rem;
                                font-weight: 600;
                                cursor: pointer;
                                font-family: 'Inter', sans-serif;
                                transition: all 0.15s ease;
                            }
                            .er-btn:hover { border-color: var(--link-color); color: var(--link-color); }
                            .er-btn.primary {
                                background: var(--link-color);
                                color: #fff;
                                border-color: var(--link-color);
                            }
                            .er-btn.primary:hover { opacity: 0.9; }
                            .er-btn.danger {
                                background: #ef4444;
                                color: #fff;
                                border-color: #ef4444;
                            }
                            .er-btn.danger:hover { opacity: 0.9; }
                            .er-btn.small {
                                padding: 0.35rem 0.55rem;
                                font-size: 0.65rem;
                            }
                            .er-hint {
                                font-size: 0.62rem;
                                color: var(--text-muted);
                                line-height: 1.5;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-hint kbd {
                                background: var(--code-bg);
                                border: 1px solid var(--border-color);
                                border-radius: 0.2rem;
                                padding: 0 0.25rem;
                                font-family: 'Fira Code', monospace;
                                font-size: 0.6rem;
                            }
                            .er-props {
                                border-top: 1px solid var(--border-color);
                                padding-top: 0.6rem;
                                margin-top: auto;
                                font-size: 0.68rem;
                                color: var(--text-muted);
                                font-family: 'Inter', sans-serif;
                            }
                            .er-props.hidden { display: none; }
                            .er-props strong { color: var(--heading-color); }
                            .er-canvas {
                                flex: 1;
                                position: relative;
                                overflow: hidden;
                                background-color: var(--bg-color);
                                background-image:
                                    linear-gradient(to right, var(--border-color) 1px, transparent 1px),
                                    linear-gradient(to bottom, var(--border-color) 1px, transparent 1px);
                                background-size: 20px 20px;
                                cursor: grab;
                            }
                            .er-canvas:active { cursor: grabbing; }
                            .er-transform {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                transform-origin: 0 0;
                            }
                            .er-svg {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                pointer-events: none;
                                z-index: 10;
                            }
                            .er-labels {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                pointer-events: none;
                                z-index: 15;
                            }
                            .er-entities {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                            }
                            .er-entity {
                                position: absolute;
                                background: var(--panel-color);
                                border: 1px solid var(--border-color);
                                border-radius: 0.4rem;
                                min-width: 180px;
                                box-shadow: var(--control-shadow);
                                display: flex;
                                flex-direction: column;
                                z-index: 20;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-entity.selected {
                                border-color: var(--link-color);
                                box-shadow: 0 0 0 2px color-mix(in srgb, var(--link-color) 40%, transparent), var(--control-shadow);
                                z-index: 21;
                            }
                            .er-entity-header {
                                background: var(--code-bg);
                                padding: 0.45rem 0.65rem;
                                border-top-left-radius: 0.35rem;
                                border-top-right-radius: 0.35rem;
                                cursor: move;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                border-bottom: 1px solid var(--border-color);
                                position: relative;
                            }
                            .er-entity-title {
                                background: transparent;
                                border: none;
                                color: var(--heading-color);
                                font-weight: 700;
                                font-size: 0.78rem;
                                width: 100%;
                                outline: none;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-entity-title:focus {
                                background: color-mix(in srgb, var(--link-color) 15%, transparent);
                                border-radius: 0.2rem;
                            }
                            .er-entity-body {
                                padding: 0.35rem 0;
                                display: flex;
                                flex-direction: column;
                            }
                            .er-attr {
                                display: flex;
                                align-items: center;
                                padding: 0.25rem 0.65rem;
                                gap: 0.4rem;
                                position: relative;
                                font-size: 0.68rem;
                            }
                            .er-attr:hover { background: color-mix(in srgb, var(--link-color) 8%, transparent); }
                            .er-attr .er-icon {
                                width: 0.9rem;
                                text-align: center;
                                font-size: 0.6rem;
                                flex-shrink: 0;
                            }
                            .er-attr .er-icon.pk { color: #fbbf24; }
                            .er-attr .er-icon.fk { color: #94a3b8; }
                            .er-attr .er-icon.none { opacity: 0; }
                            .er-attr-name {
                                background: transparent;
                                border: none;
                                color: var(--text-color);
                                font-family: 'Fira Code', monospace;
                                font-size: 0.68rem;
                                flex-grow: 1;
                                outline: none;
                                width: 70px;
                                min-width: 0;
                            }
                            .er-attr-name:focus { background: color-mix(in srgb, var(--link-color) 15%, transparent); border-radius: 0.2rem; }
                            .er-attr-type {
                                background: transparent;
                                border: none;
                                color: var(--text-muted);
                                font-family: 'Fira Code', monospace;
                                font-size: 0.6rem;
                                width: 55px;
                                outline: none;
                                text-transform: uppercase;
                            }
                            .er-attr-type:focus { background: color-mix(in srgb, var(--link-color) 15%, transparent); border-radius: 0.2rem; }
                            .er-entity-footer {
                                padding: 0.35rem 0.65rem;
                                border-top: 1px dashed var(--border-color);
                                display: flex;
                                justify-content: center;
                            }
                            .er-entity-footer button {
                                background: transparent;
                                border: none;
                                color: var(--text-muted);
                                font-size: 0.6rem;
                                cursor: pointer;
                                font-family: 'Inter', sans-serif;
                                display: flex;
                                align-items: center;
                                gap: 0.3rem;
                            }
                            .er-entity-footer button:hover { color: var(--link-color); }
                            .er-conn {
                                position: absolute;
                                width: 10px;
                                height: 10px;
                                background: var(--link-color);
                                border: 2px solid var(--bg-color);
                                border-radius: 50%;
                                cursor: crosshair;
                                opacity: 0;
                                transition: opacity 0.15s ease, transform 0.15s ease;
                                z-index: 30;
                            }
                            .er-entity:hover .er-conn,
                            .er-attr:hover .er-conn { opacity: 1; }
                            .er-conn.left { left: -6px; top: 50%; transform: translateY(-50%); }
                            .er-conn.right { right: -6px; top: 50%; transform: translateY(-50%); }
                            .er-conn:hover { transform: translateY(-50%) scale(1.4); }
                            .er-line {
                                fill: none;
                                stroke: var(--link-color);
                                stroke-width: 2;
                                transition: stroke 0.15s;
                                cursor: pointer;
                                pointer-events: stroke;
                                opacity: 0.75;
                            }
                            .er-line:hover,
                            .er-line.selected {
                                stroke: #fbbf24;
                                stroke-width: 3;
                                opacity: 1;
                                filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.5));
                            }
                            .er-label {
                                position: absolute;
                                background: var(--panel-color);
                                color: var(--text-color);
                                font-size: 0.6rem;
                                padding: 0.15rem 0.45rem;
                                border: 1px solid var(--border-color);
                                border-radius: 0.25rem;
                                box-shadow: var(--control-shadow);
                                cursor: pointer;
                                pointer-events: auto;
                                transform: translate(-50%, -50%);
                                font-family: 'Inter', sans-serif;
                                white-space: nowrap;
                            }
                            .er-label:hover { border-color: var(--link-color); color: var(--link-color); }
                            .er-modal {
                                display: none;
                                position: absolute;
                                inset: 0;
                                background: rgba(0, 0, 0, 0.55);
                                z-index: 1000;
                                justify-content: center;
                                align-items: center;
                            }
                            .er-modal.active { display: flex; }
                            .er-modal-box {
                                background: var(--panel-color);
                                border: 1px solid var(--border-color);
                                border-radius: 0.5rem;
                                padding: 1rem 1.1rem;
                                width: 300px;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                                font-family: 'Inter', sans-serif;
                            }
                            .er-modal-box h4 {
                                margin: 0 0 0.75rem 0;
                                font-size: 0.85rem;
                                color: var(--heading-color);
                                border-bottom: 1px solid var(--border-color);
                                padding-bottom: 0.4rem;
                            }
                            .er-modal-box label {
                                display: block;
                                font-size: 0.65rem;
                                color: var(--text-muted);
                                margin-bottom: 0.25rem;
                                font-weight: 600;
                            }
                            .er-modal-box input,
                            .er-modal-box select {
                                width: 100%;
                                background: var(--bg-color);
                                border: 1px solid var(--border-color);
                                border-radius: 0.3rem;
                                padding: 0.4rem 0.5rem;
                                color: var(--text-color);
                                font-size: 0.7rem;
                                outline: none;
                                font-family: 'Inter', sans-serif;
                                margin-bottom: 0.6rem;
                            }
                            .er-modal-box input:focus,
                            .er-modal-box select:focus { border-color: var(--link-color); }
                            .er-modal-actions {
                                display: flex;
                                justify-content: flex-end;
                                gap: 0.4rem;
                                margin-top: 0.3rem;
                            }
                        </style>

                        <div class="er-app">
                            <div class="er-toolbar">
                                <h3><i class="fa-solid fa-diagram-project"></i> ER-Modeller</h3>
                                <button class="er-btn primary" data-er-add>
                                    <i class="fa-solid fa-table"></i> Tabelle hinzufügen
                                </button>
                                <button class="er-btn small" data-er-reset>
                                    <i class="fa-solid fa-rotate-left"></i> Zurücksetzen
                                </button>

                                <div class="er-hint">
                                    <div><strong>Verschieben:</strong> Header ziehen</div>
                                    <div><strong>Zoomen:</strong> Mausrad</div>
                                    <div><strong>Verbinden:</strong> von blauem Punkt ziehen</div>
                                    <div><strong>Löschen:</strong> <kbd>Entf</kbd> / <kbd>⌫</kbd></div>
                                    <div style="margin-top:0.4rem;"><strong>Doppelklick</strong> auf Linie = Beziehung bearbeiten</div>
                                </div>

                                <div class="er-props hidden" data-er-props>
                                    <div data-er-props-content>Nichts ausgewählt.</div>
                                    <button class="er-btn danger small" data-er-delete style="margin-top:0.4rem; width:100%;">
                                        <i class="fa-solid fa-trash"></i> Löschen
                                    </button>
                                </div>
                            </div>

                            <div class="er-canvas" data-er-canvas>
                                <div class="er-transform" data-er-transform>
                                    <svg class="er-svg" data-er-svg>
                                        <defs>
                                            <marker id="er-marker-one" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto-start-reverse">
                                                <line x1="8" y1="1" x2="8" y2="9" stroke="currentColor" stroke-width="2" />
                                            </marker>
                                            <marker id="er-marker-many" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto-start-reverse">
                                                <path d="M0,1 L10,5 L0,9" fill="none" stroke="currentColor" stroke-width="2" />
                                            </marker>
                                        </defs>
                                        <g data-er-lines></g>
                                    </svg>
                                    <div class="er-labels" data-er-labels></div>
                                    <div class="er-entities" data-er-entities></div>
                                </div>

                                <div class="er-modal" data-er-modal>
                                    <div class="er-modal-box">
                                        <h4>Beziehung bearbeiten</h4>
                                        <label>Bezeichnung / Verb</label>
                                        <input type="text" data-er-rel-label placeholder="z.B. 'hat', 'gehört zu'">
                                        <label>Kardinalität Quelle</label>
                                        <select data-er-rel-source>
                                            <option value="one">One (1)</option>
                                            <option value="many">Many (N)</option>
                                            <option value="none">Keine</option>
                                        </select>
                                        <label>Kardinalität Ziel</label>
                                        <select data-er-rel-target>
                                            <option value="one">One (1)</option>
                                            <option value="many" selected>Many (N)</option>
                                            <option value="none">Keine</option>
                                        </select>
                                        <div class="er-modal-actions">
                                            <button class="er-btn small" data-er-rel-cancel>Abbrechen</button>
                                            <button class="er-btn primary small" data-er-rel-save>Speichern</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="er-modeller-root">
                        <style>
                            .er-modeller-root {
                                position: relative;
                                width: 100%;
                                height: 640px;
                                border: 1px solid var(--border-color);
                                border-radius: 0.5rem;
                                overflow: hidden;
                                background-color: var(--bg-color);
                                font-family: 'Inter', sans-serif;
                                color: var(--text-color);
                            }
                            .er-app {
                                display: flex;
                                height: 100%;
                                width: 100%;
                            }
                            .er-toolbar {
                                width: 220px;
                                background-color: var(--panel-color);
                                border-right: 1px solid var(--border-color);
                                display: flex;
                                flex-direction: column;
                                padding: 0.85rem;
                                gap: 0.75rem;
                                flex-shrink: 0;
                                overflow-y: auto;
                            }
                            .er-toolbar h3 {
                                font-size: 0.8rem;
                                font-weight: 700;
                                color: var(--heading-color);
                                margin: 0 0 0.25rem 0;
                                display: flex;
                                align-items: center;
                                gap: 0.4rem;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-toolbar h3 i { color: var(--link-color); }
                            .er-btn {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                gap: 0.4rem;
                                padding: 0.5rem 0.75rem;
                                border-radius: 0.4rem;
                                border: 1px solid var(--border-color);
                                background: var(--bg-color);
                                color: var(--text-color);
                                font-size: 0.72rem;
                                font-weight: 600;
                                cursor: pointer;
                                font-family: 'Inter', sans-serif;
                                transition: all 0.15s ease;
                            }
                            .er-btn:hover { border-color: var(--link-color); color: var(--link-color); }
                            .er-btn.primary {
                                background: var(--link-color);
                                color: #fff;
                                border-color: var(--link-color);
                            }
                            .er-btn.primary:hover { opacity: 0.9; }
                            .er-btn.danger {
                                background: #ef4444;
                                color: #fff;
                                border-color: #ef4444;
                            }
                            .er-btn.danger:hover { opacity: 0.9; }
                            .er-btn.small {
                                padding: 0.35rem 0.55rem;
                                font-size: 0.65rem;
                            }
                            .er-hint {
                                font-size: 0.62rem;
                                color: var(--text-muted);
                                line-height: 1.5;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-hint kbd {
                                background: var(--code-bg);
                                border: 1px solid var(--border-color);
                                border-radius: 0.2rem;
                                padding: 0 0.25rem;
                                font-family: 'Fira Code', monospace;
                                font-size: 0.6rem;
                            }
                            .er-props {
                                border-top: 1px solid var(--border-color);
                                padding-top: 0.6rem;
                                margin-top: auto;
                                font-size: 0.68rem;
                                color: var(--text-muted);
                                font-family: 'Inter', sans-serif;
                            }
                            .er-props.hidden { display: none; }
                            .er-props strong { color: var(--heading-color); }
                            .er-canvas {
                                flex: 1;
                                position: relative;
                                overflow: hidden;
                                background-color: var(--bg-color);
                                background-image:
                                    linear-gradient(to right, var(--border-color) 1px, transparent 1px),
                                    linear-gradient(to bottom, var(--border-color) 1px, transparent 1px);
                                background-size: 20px 20px;
                                cursor: grab;
                            }
                            .er-canvas:active { cursor: grabbing; }
                            .er-transform {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                transform-origin: 0 0;
                            }
                            .er-svg {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                pointer-events: none;
                                z-index: 10;
                            }
                            .er-labels {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                pointer-events: none;
                                z-index: 15;
                            }
                            .er-entities {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                            }
                            .er-entity {
                                position: absolute;
                                background: var(--panel-color);
                                border: 1px solid var(--border-color);
                                border-radius: 0.4rem;
                                min-width: 180px;
                                box-shadow: var(--control-shadow);
                                display: flex;
                                flex-direction: column;
                                z-index: 20;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-entity.selected {
                                border-color: var(--link-color);
                                box-shadow: 0 0 0 2px color-mix(in srgb, var(--link-color) 40%, transparent), var(--control-shadow);
                                z-index: 21;
                            }
                            .er-entity-header {
                                background: var(--code-bg);
                                padding: 0.45rem 0.65rem;
                                border-top-left-radius: 0.35rem;
                                border-top-right-radius: 0.35rem;
                                cursor: move;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                border-bottom: 1px solid var(--border-color);
                                position: relative;
                            }
                            .er-entity-title {
                                background: transparent;
                                border: none;
                                color: var(--heading-color);
                                font-weight: 700;
                                font-size: 0.78rem;
                                width: 100%;
                                outline: none;
                                font-family: 'Inter', sans-serif;
                            }
                            .er-entity-title:focus {
                                background: color-mix(in srgb, var(--link-color) 15%, transparent);
                                border-radius: 0.2rem;
                            }
                            .er-entity-body {
                                padding: 0.35rem 0;
                                display: flex;
                                flex-direction: column;
                            }
                            .er-attr {
                                display: flex;
                                align-items: center;
                                padding: 0.25rem 0.65rem;
                                gap: 0.4rem;
                                position: relative;
                                font-size: 0.68rem;
                            }
                            .er-attr:hover { background: color-mix(in srgb, var(--link-color) 8%, transparent); }
                            .er-attr .er-icon {
                                width: 0.9rem;
                                text-align: center;
                                font-size: 0.6rem;
                                flex-shrink: 0;
                            }
                            .er-attr .er-icon.pk { color: #fbbf24; }
                            .er-attr .er-icon.fk { color: #94a3b8; }
                            .er-attr .er-icon.none { opacity: 0; }
                            .er-attr-name {
                                background: transparent;
                                border: none;
                                color: var(--text-color);
                                font-family: 'Fira Code', monospace;
                                font-size: 0.68rem;
                                flex-grow: 1;
                                outline: none;
                                width: 70px;
                                min-width: 0;
                            }
                            .er-attr-name:focus { background: color-mix(in srgb, var(--link-color) 15%, transparent); border-radius: 0.2rem; }
                            .er-attr-type {
                                background: transparent;
                                border: none;
                                color: var(--text-muted);
                                font-family: 'Fira Code', monospace;
                                font-size: 0.6rem;
                                width: 55px;
                                outline: none;
                                text-transform: uppercase;
                            }
                            .er-attr-type:focus { background: color-mix(in srgb, var(--link-color) 15%, transparent); border-radius: 0.2rem; }
                            .er-entity-footer {
                                padding: 0.35rem 0.65rem;
                                border-top: 1px dashed var(--border-color);
                                display: flex;
                                justify-content: center;
                            }
                            .er-entity-footer button {
                                background: transparent;
                                border: none;
                                color: var(--text-muted);
                                font-size: 0.6rem;
                                cursor: pointer;
                                font-family: 'Inter', sans-serif;
                                display: flex;
                                align-items: center;
                                gap: 0.3rem;
                            }
                            .er-entity-footer button:hover { color: var(--link-color); }
                            .er-conn {
                                position: absolute;
                                width: 10px;
                                height: 10px;
                                background: var(--link-color);
                                border: 2px solid var(--bg-color);
                                border-radius: 50%;
                                cursor: crosshair;
                                opacity: 0;
                                transition: opacity 0.15s ease, transform 0.15s ease;
                                z-index: 30;
                            }
                            .er-entity:hover .er-conn,
                            .er-attr:hover .er-conn { opacity: 1; }
                            .er-conn.left { left: -6px; top: 50%; transform: translateY(-50%); }
                            .er-conn.right { right: -6px; top: 50%; transform: translateY(-50%); }
                            .er-conn:hover { transform: translateY(-50%) scale(1.4); }
                            .er-line {
                                fill: none;
                                stroke: var(--link-color);
                                stroke-width: 2;
                                transition: stroke 0.15s;
                                cursor: pointer;
                                pointer-events: stroke;
                                opacity: 0.75;
                            }
                            .er-line:hover,
                            .er-line.selected {
                                stroke: #fbbf24;
                                stroke-width: 3;
                                opacity: 1;
                                filter: drop-shadow(0 0 3px rgba(251, 191, 36, 0.5));
                            }
                            .er-label {
                                position: absolute;
                                background: var(--panel-color);
                                color: var(--text-color);
                                font-size: 0.6rem;
                                padding: 0.15rem 0.45rem;
                                border: 1px solid var(--border-color);
                                border-radius: 0.25rem;
                                box-shadow: var(--control-shadow);
                                cursor: pointer;
                                pointer-events: auto;
                                transform: translate(-50%, -50%);
                                font-family: 'Inter', sans-serif;
                                white-space: nowrap;
                            }
                            .er-label:hover { border-color: var(--link-color); color: var(--link-color); }
                            .er-modal {
                                display: none;
                                position: absolute;
                                inset: 0;
                                background: rgba(0, 0, 0, 0.55);
                                z-index: 1000;
                                justify-content: center;
                                align-items: center;
                            }
                            .er-modal.active { display: flex; }
                            .er-modal-box {
                                background: var(--panel-color);
                                border: 1px solid var(--border-color);
                                border-radius: 0.5rem;
                                padding: 1rem 1.1rem;
                                width: 300px;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                                font-family: 'Inter', sans-serif;
                            }
                            .er-modal-box h4 {
                                margin: 0 0 0.75rem 0;
                                font-size: 0.85rem;
                                color: var(--heading-color);
                                border-bottom: 1px solid var(--border-color);
                                padding-bottom: 0.4rem;
                            }
                            .er-modal-box label {
                                display: block;
                                font-size: 0.65rem;
                                color: var(--text-muted);
                                margin-bottom: 0.25rem;
                                font-weight: 600;
                            }
                            .er-modal-box input,
                            .er-modal-box select {
                                width: 100%;
                                background: var(--bg-color);
                                border: 1px solid var(--border-color);
                                border-radius: 0.3rem;
                                padding: 0.4rem 0.5rem;
                                color: var(--text-color);
                                font-size: 0.7rem;
                                outline: none;
                                font-family: 'Inter', sans-serif;
                                margin-bottom: 0.6rem;
                            }
                            .er-modal-box input:focus,
                            .er-modal-box select:focus { border-color: var(--link-color); }
                            .er-modal-actions {
                                display: flex;
                                justify-content: flex-end;
                                gap: 0.4rem;
                                margin-top: 0.3rem;
                            }
                        </style>

                        <div class="er-app">
                            <div class="er-toolbar">
                                <h3><i class="fa-solid fa-diagram-project"></i> ER Modeler</h3>
                                <button class="er-btn primary" data-er-add>
                                    <i class="fa-solid fa-table"></i> Add Table
                                </button>
                                <button class="er-btn small" data-er-reset>
                                    <i class="fa-solid fa-rotate-left"></i> Reset
                                </button>

                                <div class="er-hint">
                                    <div><strong>Move:</strong> drag header</div>
                                    <div><strong>Zoom:</strong> mouse wheel</div>
                                    <div><strong>Connect:</strong> drag from blue dot</div>
                                    <div><strong>Delete:</strong> <kbd>Del</kbd> / <kbd>⌫</kbd></div>
                                    <div style="margin-top:0.4rem;"><strong>Double-click</strong> line = edit relationship</div>
                                </div>

                                <div class="er-props hidden" data-er-props>
                                    <div data-er-props-content>Nothing selected.</div>
                                    <button class="er-btn danger small" data-er-delete style="margin-top:0.4rem; width:100%;">
                                        <i class="fa-solid fa-trash"></i> Delete
                                    </button>
                                </div>
                            </div>

                            <div class="er-canvas" data-er-canvas>
                                <div class="er-transform" data-er-transform>
                                    <svg class="er-svg" data-er-svg>
                                        <defs>
                                            <marker id="er-marker-one" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto-start-reverse">
                                                <line x1="8" y1="1" x2="8" y2="9" stroke="currentColor" stroke-width="2" />
                                            </marker>
                                            <marker id="er-marker-many" markerWidth="12" markerHeight="10" refX="10" refY="5" orient="auto-start-reverse">
                                                <path d="M0,1 L10,5 L0,9" fill="none" stroke="currentColor" stroke-width="2" />
                                            </marker>
                                        </defs>
                                        <g data-er-lines></g>
                                    </svg>
                                    <div class="er-labels" data-er-labels></div>
                                    <div class="er-entities" data-er-entities></div>
                                </div>

                                <div class="er-modal" data-er-modal>
                                    <div class="er-modal-box">
                                        <h4>Edit Relationship</h4>
                                        <label>Label / Verb</label>
                                        <input type="text" data-er-rel-label placeholder="e.g. 'has', 'belongs to'">
                                        <label>Source Cardinality</label>
                                        <select data-er-rel-source>
                                            <option value="one">One (1)</option>
                                            <option value="many">Many (N)</option>
                                            <option value="none">None</option>
                                        </select>
                                        <label>Target Cardinality</label>
                                        <select data-er-rel-target>
                                            <option value="one">One (1)</option>
                                            <option value="many" selected>Many (N)</option>
                                            <option value="none">None</option>
                                        </select>
                                        <div class="er-modal-actions">
                                            <button class="er-btn small" data-er-rel-cancel>Cancel</button>
                                            <button class="er-btn primary small" data-er-rel-save>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `,
                    // ── The interactive engine for the tool ──
                    script: function(root) {
    // ─── Scoped state ──────────────────────────────
    const state = {
        entities: [],
        relationships: [],
        selectedItem: null,
        itemType: null,
        panX: 0,
        panY: 0,
        scale: 1,
        isPanning: false,
        startX: 0,
        startY: 0,
        isDraggingEntity: false,
        draggedEntityId: null,
        dragOffsetX: 0,
        dragOffsetY: 0,
        isDrawingLine: false,
        startConnPoint: null,
        idCounter: 1
    };

    // ─── DOM refs (scoped to root) ─────────────────
    const $ = (sel) => root.querySelector(sel);
    const canvas = $('[data-er-canvas]');
    const transform = $('[data-er-transform]');
    const entitiesLayer = $('[data-er-entities]');
    const labelsLayer = $('[data-er-labels]');
    const linesGroup = $('[data-er-lines]');
    const svgEl = $('[data-er-svg]');
    const propsPanel = $('[data-er-props]');
    const propsContent = $('[data-er-props-content]');
    const btnDelete = $('[data-er-delete]');
    const relModal = $('[data-er-modal]');
    const relLabelInput = $('[data-er-rel-label]');
    const relSourceSel = $('[data-er-rel-source]');
    const relTargetSel = $('[data-er-rel-target]');

    let editingRelId = null;

    function generateId(prefix) {
        return prefix + '_' + Date.now() + '_' + (state.idCounter++);
    }

    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        return {
            x: (x - state.panX) / state.scale,
            y: (y - state.panY) / state.scale
        };
    }

    // ─── Data model ───────────────────────────────
    function Entity(x, y, name) {
        return {
            id: generateId('ent'),
            x: x,
            y: y,
            name: name || 'New_Table',
            attributes: [
                { id: generateId('attr'), name: 'id', type: 'INT', isPk: true, isFk: false }
            ],
            element: null
        };
    }

    function Relationship(sourceId, sourceAttrId, targetId, targetAttrId) {
        return {
            id: generateId('rel'),
            sourceEntityId: sourceId,
            sourceAttrId: sourceAttrId,
            targetEntityId: targetId,
            targetAttrId: targetAttrId,
            label: '',
            sourceCardinality: 'one',
            targetCardinality: 'many',
            pathElement: null
        };
    }

    // ─── Rendering ─────────────────────────────────
    function renderEntities() {
        entitiesLayer.innerHTML = '';
        state.entities.forEach((entity) => {
            const el = document.createElement('div');
            el.className = 'er-entity' + (state.selectedItem === entity.id ? ' selected' : '');
            el.id = entity.id;
            el.style.transform = 'translate(' + entity.x + 'px, ' + entity.y + 'px)';

            // Header
            const header = document.createElement('div');
            header.className = 'er-entity-header';

            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.className = 'er-entity-title';
            titleInput.value = entity.name;
            titleInput.addEventListener('change', (e) => {
                entity.name = e.target.value;
            });
            titleInput.addEventListener('mousedown', (e) => e.stopPropagation());
            header.appendChild(titleInput);

            const hpLeft = document.createElement('div');
            hpLeft.className = 'er-conn left';
            hpLeft.dataset.entId = entity.id;
            hpLeft.dataset.side = 'left';
            const hpRight = document.createElement('div');
            hpRight.className = 'er-conn right';
            hpRight.dataset.entId = entity.id;
            hpRight.dataset.side = 'right';
            header.appendChild(hpLeft);
            header.appendChild(hpRight);
            el.appendChild(header);

            // Body
            const body = document.createElement('div');
            body.className = 'er-entity-body';

            entity.attributes.forEach((attr) => {
                const row = document.createElement('div');
                row.className = 'er-attr';
                row.dataset.attrId = attr.id;

                const icon = document.createElement('span');
                icon.className = 'er-icon ' + (attr.isPk ? 'pk' : (attr.isFk ? 'fk' : 'none'));
                if (attr.isPk) icon.innerHTML = '<i class="fa-solid fa-key"></i>';
                else if (attr.isFk) icon.innerHTML = '<i class="fa-solid fa-link"></i>';
                else icon.innerHTML = '<i class="fa-solid fa-minus"></i>';
                row.appendChild(icon);

                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.className = 'er-attr-name';
                nameInput.value = attr.name;
                nameInput.addEventListener('change', (e) => attr.name = e.target.value);
                nameInput.addEventListener('mousedown', (e) => e.stopPropagation());
                row.appendChild(nameInput);

                const typeInput = document.createElement('input');
                typeInput.type = 'text';
                typeInput.className = 'er-attr-type';
                typeInput.value = attr.type;
                typeInput.addEventListener('change', (e) => attr.type = e.target.value.toUpperCase());
                typeInput.addEventListener('mousedown', (e) => e.stopPropagation());
                row.appendChild(typeInput);

                const delBtn = document.createElement('button');
                delBtn.className = 'er-btn small';
                delBtn.style.padding = '0';
                delBtn.style.border = 'none';
                delBtn.style.background = 'transparent';
                delBtn.style.color = 'var(--text-muted)';
                delBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                delBtn.title = 'Spalte löschen';
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (entity.attributes.length <= 1) return;
                    entity.attributes = entity.attributes.filter(a => a.id !== attr.id);
                    state.relationships = state.relationships.filter(r =>
                        !(r.sourceEntityId === entity.id && r.sourceAttrId === attr.id) &&
                        !(r.targetEntityId === entity.id && r.targetAttrId === attr.id)
                    );
                    updateAll();
                });
                row.appendChild(delBtn);

                const pLeft = document.createElement('div');
                pLeft.className = 'er-conn left';
                pLeft.dataset.entId = entity.id;
                pLeft.dataset.attrId = attr.id;
                pLeft.dataset.side = 'left';
                const pRight = document.createElement('div');
                pRight.className = 'er-conn right';
                pRight.dataset.entId = entity.id;
                pRight.dataset.attrId = attr.id;
                pRight.dataset.side = 'right';
                row.appendChild(pLeft);
                row.appendChild(pRight);

                body.appendChild(row);
            });

            el.appendChild(body);

            // Footer
            const footer = document.createElement('div');
            footer.className = 'er-entity-footer';
            const addBtn = document.createElement('button');
            addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Spalte';
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                entity.attributes.push({
                    id: generateId('attr'),
                    name: 'col_' + entity.attributes.length,
                    type: 'VARCHAR',
                    isPk: false,
                    isFk: false
                });
                updateAll();
            });
            addBtn.addEventListener('mousedown', (e) => e.stopPropagation());
            footer.appendChild(addBtn);
            el.appendChild(footer);

            // Selection
            el.addEventListener('mousedown', (e) => {
                if (!e.target.classList.contains('er-conn') && e.target.tagName !== 'INPUT') {
                    selectItem(entity.id, 'entity');
                }
            });

            // Dragging via header
            header.addEventListener('mousedown', (e) => {
                if (e.target.tagName === 'INPUT' || e.target.classList.contains('er-conn')) return;
                state.isDraggingEntity = true;
                state.draggedEntityId = entity.id;
                const coords = getCanvasCoords(e);
                state.dragOffsetX = coords.x - entity.x;
                state.dragOffsetY = coords.y - entity.y;
                e.stopPropagation();
            });

            entity.element = el;
            entitiesLayer.appendChild(el);
        });

        // Wait for layout then attach listeners and redraw lines
        requestAnimationFrame(() => {
            attachConnectionListeners();
            renderLines();
        });
    }

    function renderLines() {
        linesGroup.innerHTML = '';
        labelsLayer.innerHTML = '';

        state.relationships.forEach((rel) => {
            const sEnt = state.entities.find(e => e.id === rel.sourceEntityId);
            const tEnt = state.entities.find(e => e.id === rel.targetEntityId);
            if (!sEnt || !tEnt) return;

            const sSide = tEnt.x > sEnt.x ? 'right' : 'left';
            const tSide = tEnt.x > sEnt.x ? 'left' : 'right';
            const sPoint = getConnectionPoint(sEnt, rel.sourceAttrId, sSide);
            const tPoint = getConnectionPoint(tEnt, rel.targetAttrId, tSide);
            if (!sPoint || !tPoint) return;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const midX = sPoint.x + (tPoint.x - sPoint.x) / 2;
            const d = 'M ' + sPoint.x + ' ' + sPoint.y +
                      ' C ' + midX + ' ' + sPoint.y + ', ' +
                              midX + ' ' + tPoint.y + ', ' +
                              tPoint.x + ' ' + tPoint.y;
            path.setAttribute('d', d);
            path.setAttribute('class', 'er-line' + (state.selectedItem === rel.id ? ' selected' : ''));
            path.setAttribute('marker-start', 'url(#er-marker-' + rel.sourceCardinality + ')');
            path.setAttribute('marker-end', 'url(#er-marker-' + rel.targetCardinality + ')');

            path.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                selectItem(rel.id, 'relationship');
            });
            path.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                openRelModal(rel);
            });

            rel.pathElement = path;
            linesGroup.appendChild(path);

            if (rel.label && rel.label.trim() !== '') {
                const labelEl = document.createElement('div');
                labelEl.className = 'er-label';
                const labelX = midX;
                const labelY = sPoint.y + (tPoint.y - sPoint.y) / 2;
                labelEl.style.left = labelX + 'px';
                labelEl.style.top = labelY + 'px';
                labelEl.textContent = rel.label;
                labelEl.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                    selectItem(rel.id, 'relationship');
                });
                labelEl.addEventListener('dblclick', (e) => {
                    e.stopPropagation();
                    openRelModal(rel);
                });
                labelsLayer.appendChild(labelEl);
            }
        });
    }

    function getConnectionPoint(entity, attrId, preferredSide) {
        if (!entity.element) return null;
        const ex = entity.x;
        const ey = entity.y;
        let targetEl = null;
        if (attrId) {
            targetEl = entity.element.querySelector('[data-attr-id="' + attrId + '"]');
        } else {
            targetEl = entity.element.querySelector('.er-entity-header');
        }
        if (!targetEl) return null;
        const w = entity.element.offsetWidth || 180;
        const yOffset = targetEl.offsetTop + (targetEl.offsetHeight / 2) || 20;
        const side = preferredSide;
        const px = side === 'right' ? ex + w : ex;
        const py = ey + yOffset;
        return { x: px, y: py, side: side };
    }

    function updateTransform() {
        transform.style.transform = 'translate(' + state.panX + 'px, ' + state.panY + 'px) scale(' + state.scale + ')';
        canvas.style.backgroundPosition = state.panX + 'px ' + state.panY + 'px';
    }

    function updateAll() {
        renderEntities();
        // renderLines is called inside renderEntities after RAF
        updateTransform();
        updatePropertiesPanel();
    }

    // ─── Interaction ───────────────────────────────
    canvas.addEventListener('mousedown', (e) => {
        if (e.target.closest('.er-entity')) return;
        if (e.target.closest('.er-label')) return;
        state.isPanning = true;
        state.startX = e.clientX - state.panX;
        state.startY = e.clientY - state.panY;
        selectItem(null);
    });

    // FIX: Use a single window mousemove handler that checks state
    window.addEventListener('mousemove', (e) => {
        if (state.isPanning) {
            state.panX = e.clientX - state.startX;
            state.panY = e.clientY - state.startY;
            updateTransform();
        } else if (state.isDraggingEntity && state.draggedEntityId) {
            const entity = state.entities.find(ent => ent.id === state.draggedEntityId);
            if (entity) {
                const coords = getCanvasCoords(e);
                entity.x = coords.x - state.dragOffsetX;
                entity.y = coords.y - state.dragOffsetY;
                entity.x = Math.round(entity.x / 20) * 20;
                entity.y = Math.round(entity.y / 20) * 20;
                entity.element.style.transform = 'translate(' + entity.x + 'px, ' + entity.y + 'px)';
                renderLines();
            }
        }
        // FIX: Draw draft line while connecting
        if (state.isDrawingLine && state.startConnPoint) {
            const sEnt = state.entities.find(ent => ent.id === state.startConnPoint.entityId);
            if (sEnt) {
                const sp = getConnectionPoint(sEnt, state.startConnPoint.attrId, state.startConnPoint.side);
                if (sp) {
                    const coords = getCanvasCoords(e);
                    const midX = sp.x + (coords.x - sp.x) / 2;
                    // We'll use a temporary path element for the draft
                    let draft = root.querySelector('.er-draft-line');
                    if (!draft) {
                        draft = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        draft.setAttribute('class', 'er-draft-line');
                        draft.setAttribute('fill', 'none');
                        draft.setAttribute('stroke', 'var(--link-color)');
                        draft.setAttribute('stroke-width', '2');
                        draft.setAttribute('stroke-dasharray', '5,5');
                        draft.setAttribute('pointer-events', 'none');
                        linesGroup.appendChild(draft);
                    }
                    const d = 'M ' + sp.x + ' ' + sp.y +
                              ' C ' + midX + ' ' + sp.y + ', ' +
                                      midX + ' ' + coords.y + ', ' +
                                      coords.x + ' ' + coords.y;
                    draft.setAttribute('d', d);
                }
            }
        }
    });

    // FIX: Window mouseup should NOT reset drawing state if we're over a connection point
    window.addEventListener('mouseup', (e) => {
        state.isPanning = false;
        if (state.isDraggingEntity) {
            state.isDraggingEntity = false;
            state.draggedEntityId = null;
            updateAll();
        }
        // Only reset drawing if we're not over a connection point
        if (state.isDrawingLine && !e.target.classList.contains('er-conn')) {
            state.isDrawingLine = false;
            state.startConnPoint = null;
            const draft = root.querySelector('.er-draft-line');
            if (draft) draft.remove();
        }
    });

    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = -e.deltaY * 0.001;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const pointX = (mouseX - state.panX) / state.scale;
        const pointY = (mouseY - state.panY) / state.scale;
        let newScale = state.scale + delta;
        newScale = Math.max(0.3, Math.min(newScale, 2.5));
        state.panX = mouseX - (pointX * newScale);
        state.panY = mouseY - (pointY * newScale);
        state.scale = newScale;
        updateTransform();
    }, { passive: false });

    function attachConnectionListeners() {
        root.querySelectorAll('.er-conn').forEach(pt => {
            pt.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                e.preventDefault();
                state.isDrawingLine = true;
                state.startConnPoint = {
                    entityId: pt.dataset.entId,
                    attrId: pt.dataset.attrId || null,
                    side: pt.dataset.side
                };
            });
            pt.addEventListener('mouseup', (e) => {
                e.stopPropagation();
                e.preventDefault();
                if (state.isDrawingLine && state.startConnPoint) {
                    const tEntId = pt.dataset.entId;
                    const tAttrId = pt.dataset.attrId || null;
                    if (state.startConnPoint.entityId !== tEntId) {
                        const exists = state.relationships.some(r =>
                            (r.sourceEntityId === state.startConnPoint.entityId && r.sourceAttrId === state.startConnPoint.attrId &&
                             r.targetEntityId === tEntId && r.targetAttrId === tAttrId) ||
                            (r.targetEntityId === state.startConnPoint.entityId && r.targetAttrId === state.startConnPoint.attrId &&
                             r.sourceEntityId === tEntId && r.sourceAttrId === tAttrId)
                        );
                        if (!exists) {
                            const newRel = Relationship(
                                state.startConnPoint.entityId,
                                state.startConnPoint.attrId,
                                tEntId,
                                tAttrId
                            );
                            state.relationships.push(newRel);
                            if (tAttrId) {
                                const tEnt = state.entities.find(en => en.id === tEntId);
                                if (tEnt) {
                                    const attr = tEnt.attributes.find(a => a.id === tAttrId);
                                    if (attr) attr.isFk = true;
                                }
                            }
                        }
                    }
                }
                state.isDrawingLine = false;
                state.startConnPoint = null;
                const draft = root.querySelector('.er-draft-line');
                if (draft) draft.remove();
                updateAll();
            });
        });
    }

    // ─── Selection & properties ────────────────────
    function selectItem(id, type) {
        state.selectedItem = id;
        state.itemType = type;
        root.querySelectorAll('.er-entity, .er-line').forEach(el => el.classList.remove('selected'));
        if (id && type === 'entity') {
            const el = root.querySelector('#' + CSS.escape(id));
            if (el) el.classList.add('selected');
        }
        updatePropertiesPanel();
        renderLines();
    }

    function updatePropertiesPanel() {
        if (!state.selectedItem) {
            propsPanel.classList.add('hidden');
            return;
        }
        propsPanel.classList.remove('hidden');
        let html = '';
        if (state.itemType === 'entity') {
            const ent = state.entities.find(e => e.id === state.selectedItem);
            if (ent) {
                html = '<div><strong>' + ent.name + '</strong></div>' +
                       '<div>' + ent.attributes.length + ' Spalten</div>';
            }
        } else if (state.itemType === 'relationship') {
            const rel = state.relationships.find(r => r.id === state.selectedItem);
            if (rel) {
                const sEnt = state.entities.find(e => e.id === rel.sourceEntityId);
                const tEnt = state.entities.find(e => e.id === rel.targetEntityId);
                html = '<div><strong>' + (rel.label || 'Beziehung') + '</strong></div>' +
                       '<div>' + (sEnt ? sEnt.name : '?') + ' (' + rel.sourceCardinality + ')</div>' +
                       '<div>→ ' + (tEnt ? tEnt.name : '?') + ' (' + rel.targetCardinality + ')</div>' +
                       '<button class="er-btn small" style="margin-top:0.4rem;width:100%;" data-er-edit-rel="' + rel.id + '">' +
                       '<i class="fa-solid fa-pen"></i> Bearbeiten</button>';
            }
        }
        propsContent.innerHTML = html;
        const editBtn = propsContent.querySelector('[data-er-edit-rel]');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                const rel = state.relationships.find(r => r.id === editBtn.dataset.erEditRel);
                if (rel) openRelModal(rel);
            });
        }
    }

    function deleteSelected() {
        if (!state.selectedItem) return;
        if (state.itemType === 'entity') {
            state.entities = state.entities.filter(e => e.id !== state.selectedItem);
            state.relationships = state.relationships.filter(r =>
                r.sourceEntityId !== state.selectedItem && r.targetEntityId !== state.selectedItem
            );
        } else if (state.itemType === 'relationship') {
            state.relationships = state.relationships.filter(r => r.id !== state.selectedItem);
        }
        selectItem(null);
        updateAll();
    }

    // ─── Modal ─────────────────────────────────────
    function openRelModal(rel) {
        editingRelId = rel.id;
        relLabelInput.value = rel.label || '';
        relSourceSel.value = rel.sourceCardinality;
        relTargetSel.value = rel.targetCardinality;
        relModal.classList.add('active');
    }
    function closeRelModal() {
        relModal.classList.remove('active');
        editingRelId = null;
    }

    root.querySelector('[data-er-rel-cancel]').addEventListener('click', closeRelModal);
    root.querySelector('[data-er-rel-save]').addEventListener('click', () => {
        if (editingRelId) {
            const rel = state.relationships.find(r => r.id === editingRelId);
            if (rel) {
                rel.label = relLabelInput.value;
                rel.sourceCardinality = relSourceSel.value;
                rel.targetCardinality = relTargetSel.value;
                updateAll();
            }
        }
        closeRelModal();
    });

    // ─── Buttons ───────────────────────────────────
    root.querySelector('[data-er-add]').addEventListener('click', () => {
        const rect = canvas.getBoundingClientRect();
        const cx = (-state.panX + rect.width / 2) / state.scale;
        const cy = (-state.panY + rect.height / 2) / state.scale;
        const ent = Entity(cx - 90, cy - 40, 'Table_' + (state.entities.length + 1));
        state.entities.push(ent);
        updateAll();
        selectItem(ent.id, 'entity');
    });

    btnDelete.addEventListener('click', deleteSelected);

    root.querySelector('[data-er-reset]').addEventListener('click', () => {
        state.entities = [];
        state.relationships = [];
        state.selectedItem = null;
        state.panX = 0;
        state.panY = 0;
        state.scale = 1;
        loadSample();
        updateAll();
    });

    // ─── Keyboard ──────────────────────────────────
    const keyHandler = (e) => {
        if ((e.key === 'Delete' || e.key === 'Backspace') && state.selectedItem) {
            const active = document.activeElement;
            if (active && active.tagName === 'INPUT') return;
            if (!root.isConnected) return;
            deleteSelected();
        }
    };
    window.addEventListener('keydown', keyHandler);

    // ─── Sample data (matching your PNG reference) ──
    function loadSample() {
        // Tierpfleger
        const tierpfleger = Entity(60, 60, 'Tierpfleger');
        tierpfleger.attributes = [
            { id: generateId('attr'), name: 'Tierpfleger_ID', type: 'INT', isPk: true, isFk: false },
            { id: generateId('attr'), name: 'Name', type: 'VARCHAR(50)', isPk: false, isFk: false }
        ];

        // Tiergattung
        const tiergattung = Entity(360, 60, 'Tiergattung');
        tiergattung.attributes = [
            { id: generateId('attr'), name: 'Tiergattung_ID', type: 'INT', isPk: true, isFk: false },
            { id: generateId('attr'), name: 'Bezeichnung', type: 'VARCHAR(50)', isPk: false, isFk: false }
        ];

        // Tier
        const tier = Entity(210, 200, 'Tier');
        tier.attributes = [
            { id: generateId('attr'), name: 'Tier_ID', type: 'INT', isPk: true, isFk: false },
            { id: generateId('attr'), name: 'Name', type: 'VARCHAR(50)', isPk: false, isFk: false },
            { id: generateId('attr'), name: 'Tiergattung_ID', type: 'INT', isPk: false, isFk: true },
            { id: generateId('attr'), name: 'Tierpfleger_ID', type: 'INT', isPk: false, isFk: true }
        ];

        // Unterkunft
        const unterkunft = Entity(360, 340, 'Unterkunft');
        unterkunft.attributes = [
            { id: generateId('attr'), name: 'Unterkunft_ID', type: 'INT', isPk: true, isFk: false },
            { id: generateId('attr'), name: 'Bezeichnung', type: 'VARCHAR(50)', isPk: false, isFk: false }
        ];

        state.entities = [tierpfleger, tiergattung, tier, unterkunft];

        // Relationships matching the PNG:
        // Tierpfleger 1 -- betreut -- n Tier
        const r1 = Relationship(tierpfleger.id, null, tier.id, tier.attributes[3].id);
        r1.label = 'betreut';
        r1.sourceCardinality = 'one';
        r1.targetCardinality = 'many';

        // Tiergattung 1 -- gehört zu -- n Tier
        const r2 = Relationship(tiergattung.id, null, tier.id, tier.attributes[2].id);
        r2.label = 'gehört zu';
        r2.sourceCardinality = 'one';
        r2.targetCardinality = 'many';

        // Tier n -- lebt in -- 1 Unterkunft
        const r3 = Relationship(tier.id, null, unterkunft.id, null);
        r3.label = 'lebt in';
        r3.sourceCardinality = 'many';
        r3.targetCardinality = 'one';

        state.relationships = [r1, r2, r3];

        // Center view
        state.panX = 50;
        state.panY = 20;
    }

    // ─── Init ──────────────────────────────────────
    loadSample();
    // Wait for the DOM to be fully laid out
    requestAnimationFrame(() => {
        updateAll();
        // Second RAF to ensure offsets are correct
        requestAnimationFrame(() => renderLines());
    });

    // Clean up on unmount
    root._cleanup = () => {
        window.removeEventListener('keydown', keyHandler);
    };
}
                }
            ]
        },

        /* ============================================================
           SECTION — HELP
           ============================================================ */
        {
            id: 'section-help',
            titleDe: 'Bedienung',
            titleEn: 'How to Use',
            introDe: 'Kurzanleitung für den ER-Modeller.',
            introEn: 'Quick guide to the ER modeler.',
            subtopics: [
                {
                    id: 'subsection-help-1',
                    titleDe: 'Grundfunktionen',
                    titleEn: 'Basic Functions',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Aktion</th><th>Bedienung</th></tr>
                    <tr><td><strong>Tabelle hinzufügen</strong></td><td class="text-[var(--text-muted)]">Button „Tabelle hinzufügen" in der Seitenleiste.</td></tr>
                    <tr><td><strong>Tabelle verschieben</strong></td><td class="text-[var(--text-muted)]">Header der Tabelle ziehen.</td></tr>
                    <tr><td><strong>Spalte hinzufügen</strong></td><td class="text-[var(--text-muted)]">Footer-Button „Spalte" innerhalb der Tabelle.</td></tr>
                    <tr><td><strong>Spalte löschen</strong></td><td class="text-[var(--text-muted)]">×-Icon in der Spaltenzeile.</td></tr>
                    <tr><td><strong>Beziehung ziehen</strong></td><td class="text-[var(--text-muted)]">Von blauem Verbindungspunkt zu einem anderen Punkt ziehen (Spalte oder Header).</td></tr>
                    <tr><td><strong>Beziehung bearbeiten</strong></td><td class="text-[var(--text-muted)]">Doppelklick auf Linie oder Label.</td></tr>
                    <tr><td><strong>Zoomen</strong></td><td class="text-[var(--text-muted)]">Mausrad.</td></tr>
                    <tr><td><strong>Verschieben (Canvas)</strong></td><td class="text-[var(--text-muted)]">Hintergrund ziehen.</td></tr>
                    <tr><td><strong>Löschen</strong></td><td class="text-[var(--text-muted)]">Element auswählen, dann <kbd>Entf</kbd> oder <kbd>⌫</kbd>.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th>Action</th><th>How</th></tr>
                    <tr><td><strong>Add table</strong></td><td class="text-[var(--text-muted)]">Click "Add Table" in the sidebar.</td></tr>
                    <tr><td><strong>Move table</strong></td><td class="text-[var(--text-muted)]">Drag the table header.</td></tr>
                    <tr><td><strong>Add column</strong></td><td class="text-[var(--text-muted)]">Click "Column" button in the table footer.</td></tr>
                    <tr><td><strong>Delete column</strong></td><td class="text-[var(--text-muted)]">Click the × icon on the column row.</td></tr>
                    <tr><td><strong>Draw relationship</strong></td><td class="text-[var(--text-muted)]">Drag from a blue connection point to another (column or header).</td></tr>
                    <tr><td><strong>Edit relationship</strong></td><td class="text-[var(--text-muted)]">Double-click the line or label.</td></tr>
                    <tr><td><strong>Zoom</strong></td><td class="text-[var(--text-muted)]">Mouse wheel.</td></tr>
                    <tr><td><strong>Pan canvas</strong></td><td class="text-[var(--text-muted)]">Drag the background.</td></tr>
                    <tr><td><strong>Delete</strong></td><td class="text-[var(--text-muted)]">Select item, then <kbd>Del</kbd> or <kbd>⌫</kbd>.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection-help-2',
                    titleDe: 'Tipps',
                    titleEn: 'Tips',
                    htmlDe: `
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Primärschlüssel:</strong> Beim Anlegen einer Tabelle wird automatisch eine <code>id</code>-Spalte als PK markiert (gelber Schlüssel).</li>
                        <li><strong class="text-[var(--text-color)]">Fremdschlüssel:</strong> Wird eine Spalte mit einer anderen verbunden, wird sie automatisch als FK markiert (Kettensymbol).</li>
                        <li><strong class="text-[var(--text-color)]">Kardinalitäten:</strong> Standard 1:n. Über Doppelklick auf die Linie auf 1:1 oder m:n ändern.</li>
                        <li><strong class="text-[var(--text-color)]">Beziehungstext:</strong> Optionales Verb (z. B. „schreibt", „gehört zu"), das als Label auf der Linie erscheint.</li>
                        <li><strong class="text-[var(--text-color)]">Snap-to-Grid:</strong> Tabellen rasten beim Verschieben auf ein 20px-Raster ein.</li>
                    </ul>
                    `,
                    htmlEn: `
                    <ul class="list-disc pl-4 space-y-1 text-xs text-[var(--text-muted)]">
                        <li><strong class="text-[var(--text-color)]">Primary key:</strong> When creating a table, an <code>id</code> column is automatically marked as PK (yellow key).</li>
                        <li><strong class="text-[var(--text-color)]">Foreign key:</strong> When a column is connected to another, it is automatically marked as FK (link icon).</li>
                        <li><strong class="text-[var(--text-color)]">Cardinalities:</strong> Default is 1:n. Double-click the line to change to 1:1 or m:n.</li>
                        <li><strong class="text-[var(--text-color)]">Relationship label:</strong> Optional verb (e.g. "writes", "belongs to") shown as a label on the line.</li>
                        <li><strong class="text-[var(--text-color)]">Snap-to-grid:</strong> Tables snap to a 20px grid when moving.</li>
                    </ul>
                    `
                }
            ]
        },

        /* ============================================================
           TLDR
           ============================================================ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Das Wichtigste an einem Ort.',
            introEn: 'The most important points in one place.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-table text-lg opacity-90"></i>
                                <span>1. Tabellen</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Entitäten als Rechtecke. Jede Tabelle hat einen Namen und beliebig viele Spalten (Attribute).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-key text-lg opacity-90"></i>
                                <span>2. Attribute</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Jede Spalte hat Name, Typ, PK- und FK-Markierung. <strong>PK</strong> = gelber Schlüssel, <strong>FK</strong> = Kettensymbol.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-diagram-project text-lg opacity-90"></i>
                                <span>3. Beziehungen</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Linien zwischen Spalten oder Tabellen. Kardinalität 1:1, 1:n, m:n. Optionaler Text als Label.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-magnifying-glass text-lg opacity-90"></i>
                                <span>4. Interaktion</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Ziehen zum Verschieben, Mausrad zum Zoomen, Verbindungspunkte zum Verknüpfen, Doppelklick zum Bearbeiten.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-blue-400">
                                <i class="fa-solid fa-table text-lg opacity-90"></i>
                                <span>1. Tables</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Entities as rectangles. Each table has a name and any number of columns (attributes).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-green-400">
                                <i class="fa-solid fa-key text-lg opacity-90"></i>
                                <span>2. Attributes</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Each column has name, type, PK and FK markers. <strong>PK</strong> = yellow key, <strong>FK</strong> = link icon.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-purple-400">
                                <i class="fa-solid fa-diagram-project text-lg opacity-90"></i>
                                <span>3. Relationships</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Lines between columns or tables. Cardinality 1:1, 1:n, m:n. Optional text as label.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm hover:border-[var(--link-color)] transition-colors">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm text-red-400">
                                <i class="fa-solid fa-magnifying-glass text-lg opacity-90"></i>
                                <span>4. Interaction</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Drag to move, wheel to zoom, connection points to link, double-click to edit.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    links: {
        titleDe: 'Weiterführende Ressourcen',
        titleEn: 'Further Resources',
        items: [
            { icon: 'fa-book',   href: 'https://de.wikipedia.org/wiki/Entity-Relationship-Modell', target: '_blank', labelDe: 'Wikipedia: ER-Modell', labelEn: 'Wikipedia: ER model' },
            { icon: 'fa-sitemap',href: 'https://de.wikipedia.org/wiki/Kardinalit%C3%A4t_(Datenmodellierung)', target: '_blank', labelDe: 'Wikipedia: Kardinalität', labelEn: 'Wikipedia: Cardinality' },
            { icon: 'fa-database',href: 'https://www.drawio.com/', target: '_blank', labelDe: 'Draw.io (Alternative)', labelEn: 'Draw.io (alternative)' }
        ]
    },

    footer: {
        textDe: 'ER-Modeller · Interaktives Werkzeug',
        textEn: 'ER Modeler · Interactive Tool'
    },
    
    script: function(root) {
    console.log('=== ER SCRIPT CALLED ===');
    console.log('root:', root);
    console.log('canvas element:', root.querySelector('[data-er-canvas]'));
    if (!root || !root.querySelector('[data-er-canvas]')) {
        console.error('ER SCRIPT: canvas not found — HTML not injected yet or wrong root!');
        return;
    }
    // ... rest of your code
},
});

