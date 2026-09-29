/* resources/modules/calendar.js
 * Self-contained calendar: builds its own modal, grid, side list, and day popup.
 * Renders Ausbildungsnachweise per day (supports single entry OR array per day).
 *
 * Depends on:
 *   state.js → App.state.isGerman, calYear, calMonth,
 *              workReportEntries, workReportsLoaded
 *   util.js  → pad2, ymd, addDays, nthWeekday, lastWeekday
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) { console.error('[calendar] window.App missing.'); return; }

    const { state } = App;
    const { pad2, ymd, addDays, nthWeekday, lastWeekday } = App.util;

    /* =========================================================
       Constants
       ========================================================= */
    const MONTHS = {
        de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
        en: ['January','February','March','April','May','June','July','August','September','October','November','December']
    };
    const WEEKDAYS = {
        de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
        en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    };
    const REGION_ORDER = { both: 0, de: 1, us: 2 };
    const REGION_RANK_DEFAULT = 3;
    const REGION_LABEL = { both: 'DE·US', de: 'DE', us: 'US' };

    /** How many report lines to draw inside one day cell before "+N more". */
    const MAX_VISIBLE_REPORTS = 3;

    /** Every cell is one of these; used only as a marker for the CSS. */
    const CAL_ROOT_ID = 'appCalendar';

    const holidayCache = {};
    const easterCache = {};

    /* =========================================================
       Holiday math
       ========================================================= */
    function easterSunday(year) {
        if (easterCache[year]) return easterCache[year];
        const a = year % 19, b = Math.floor(year / 100), c = year % 100;
        const d = Math.floor(b / 4), e = b % 4;
        const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4), k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        return (easterCache[year] = new Date(year, month - 1, day));
    }

    function bussUndBettag(year) {
        const nov23 = new Date(year, 10, 23);
        let diff = (nov23.getDay() - 3 + 7) % 7;
        if (diff === 0) diff = 7;
        return addDays(nov23, -diff);
    }

    function buildHolidays(year) {
        const out = [];
        const add = (date, de, en, region = 'both') => {
            if (date) out.push({ date: ymd(date), de, en, region });
        };
        const D = (m, d) => new Date(year, m - 1, d);
        const easter = easterSunday(year);
        const off = (n) => addDays(easter, n);

        add(D(1, 1),   'Neujahr', "New Year's Day", 'both');
        add(D(1, 6),   'Heilige Drei Könige', 'Epiphany', 'de');
        add(D(2, 14),  'Valentinstag', "Valentine's Day", 'both');
        add(D(3, 8),   'Internationaler Frauentag', "International Women's Day", 'both');
        add(D(5, 1),   'Tag der Arbeit', 'Labour Day', 'de');
        add(D(6, 19),  'Juneteenth', 'Juneteenth', 'us');
        add(D(7, 4),   'Unabhängigkeitstag (USA)', 'Independence Day', 'us');
        add(D(10, 3),  'Tag der Deutschen Einheit', 'German Unity Day', 'de');
        add(D(10, 31), 'Reformationstag / Halloween', 'Reformation Day / Halloween', 'both');
        add(D(11, 1),  'Allerheiligen', "All Saints' Day", 'de');
        add(D(11, 11), 'Martinstag / Veterans Day', "St. Martin's Day / Veterans Day", 'both');
        add(D(12, 6),  'Nikolaus', 'St. Nicholas Day', 'de');
        add(D(12, 24), 'Heiligabend', 'Christmas Eve', 'both');
        add(D(12, 25), '1. Weihnachtstag', 'Christmas Day', 'both');
        add(D(12, 26), '2. Weihnachtstag', 'Boxing Day', 'de');
        add(D(12, 31), 'Silvester', "New Year's Eve", 'both');

        add(off(-48), 'Rosenmontag', 'Rose Monday', 'de');
        add(off(-2),  'Karfreitag', 'Good Friday', 'de');
        add(off(0),   'Ostersonntag', 'Easter Sunday', 'both');
        add(off(1),   'Ostermontag', 'Easter Monday', 'de');
        add(off(39),  'Christi Himmelfahrt / Vatertag', 'Ascension Day', 'de');
        add(off(49),  'Pfingstsonntag', 'Whit Sunday', 'de');
        add(off(50),  'Pfingstmontag', 'Whit Monday', 'de');
        add(off(60),  'Fronleichnam', 'Corpus Christi', 'de');

        add(nthWeekday(year, 0, 1, 3),  'Martin Luther King Jr. Day', 'Martin Luther King Jr. Day', 'us');
        add(nthWeekday(year, 1, 1, 3),  "Presidents' Day", "Presidents' Day", 'us');
        add(lastWeekday(year, 4, 1),    'Memorial Day', 'Memorial Day', 'us');
        add(nthWeekday(year, 8, 1, 1),  'Labor Day (USA)', 'Labor Day', 'us');
        add(nthWeekday(year, 9, 1, 2),  'Columbus Day', 'Columbus Day', 'us');
        add(nthWeekday(year, 10, 4, 4), 'Thanksgiving', 'Thanksgiving', 'us');
        add(addDays(nthWeekday(year, 10, 4, 4), 1), 'Black Friday', 'Black Friday', 'us');

        add(nthWeekday(year, 4, 0, 2), 'Muttertag', "Mother's Day", 'both');
        add(nthWeekday(year, 5, 0, 3), 'Vatertag (USA)', "Father's Day", 'us');
        add(nthWeekday(year, 9, 0, 1), 'Erntedankfest', 'Harvest Festival', 'de');
        add(bussUndBettag(year),       'Buß- und Bettag', 'Day of Repentance and Prayer', 'de');

        return out;
    }

    function getHolidaysForYear(year) {
        if (holidayCache[year]) return holidayCache[year];
        const map = {};
        for (const h of buildHolidays(year)) (map[h.date] ||= []).push(h);
        for (const key of Object.keys(map)) {
            map[key].sort(
                (a, b) =>
                    (REGION_ORDER[a.region] ?? REGION_RANK_DEFAULT) -
                    (REGION_ORDER[b.region] ?? REGION_RANK_DEFAULT)
            );
        }
        return (holidayCache[year] = map);
    }

    /* =========================================================
       Report lookup — single object OR array per day
       ========================================================= */
    function getReportsForDay(key) {
        if (!state.workReportsLoaded) return [];
        const raw = state.workReportEntries?.[key];
        if (!raw) return [];
        return Array.isArray(raw) ? raw.filter(Boolean) : [raw];
    }

    /* =========================================================
       Navigation
       ========================================================= */
    function ensureMonthSet() {
        if (state.calYear === null || state.calMonth === null) {
            const now = new Date();
            state.calYear = now.getFullYear();
            state.calMonth = now.getMonth();
        }
    }

    function shift(delta) {
        ensureMonthSet();
        state.calMonth += delta;
        if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
        else if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
        render();
    }

    function goToday() {
        const now = new Date();
        state.calYear = now.getFullYear();
        state.calMonth = now.getMonth();
        render();
    }

    /* =========================================================
       Root scaffold — built once, reused forever
       ========================================================= */
    let root = null;

    function buildRoot() {
        if (root && document.body.contains(root)) return root;

        root = document.createElement('div');
        root.id = CAL_ROOT_ID;
        root.className = 'cal-root';
        root.hidden = true;

        // backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'cal-backdrop';
        backdrop.dataset.calClose = '';
        root.appendChild(backdrop);

        // panel
        const panel = document.createElement('div');
        panel.className = 'cal-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-modal', 'true');
        panel.setAttribute('aria-label', 'Kalender');
        root.appendChild(panel);

        // header
        const header = document.createElement('div');
        header.className = 'cal-header';

        const prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 'cal-nav cal-nav-prev';
        prev.setAttribute('aria-label', 'Vorheriger Monat');
        prev.textContent = '‹';
        prev.addEventListener('click', () => shift(-1));

        const next = document.createElement('button');
        next.type = 'button';
        next.className = 'cal-nav cal-nav-next';
        next.setAttribute('aria-label', 'Nächster Monat');
        next.textContent = '›';
        next.addEventListener('click', () => shift(+1));

        const label = document.createElement('h2');
        label.className = 'cal-label';
        label.setAttribute('aria-live', 'polite');

        const todayBtn = document.createElement('button');
        todayBtn.type = 'button';
        todayBtn.className = 'cal-today-btn';
        todayBtn.textContent = 'Heute';
        todayBtn.addEventListener('click', goToday);

        const spacer = document.createElement('div');
        spacer.className = 'cal-header-spacer';

        const legend = document.createElement('div');
        legend.className = 'cal-legend';
        legend.innerHTML =
            '<span class="cal-legend-item"><i class="dot de"></i>Deutschland</span>' +
            '<span class="cal-legend-item"><i class="dot us"></i>USA</span>' +
            '<span class="cal-legend-item"><i class="dot both"></i>Beide</span>';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'cal-close';
        closeBtn.setAttribute('aria-label', 'Schließen');
        closeBtn.textContent = '×';
        closeBtn.addEventListener('click', close);

        header.append(prev, label, next, todayBtn, spacer, legend, closeBtn);
        panel.appendChild(header);

        // body: weekdays | grid | side list
        const body = document.createElement('div');
        body.className = 'cal-body';

        const weekdays = document.createElement('div');
        weekdays.className = 'cal-weekdays';

        const grid = document.createElement('div');
        grid.className = 'cal-grid';

        const side = document.createElement('aside');
        side.className = 'cal-side';

        const sideTitle = document.createElement('h3');
        sideTitle.className = 'cal-side-title';
        sideTitle.textContent = 'Besondere Tage';
        const sideList = document.createElement('ul');
        sideList.className = 'cal-side-list';
        side.append(sideTitle, sideList);

        body.append(weekdays, grid, side);
        panel.appendChild(body);

        // day popup
        const popup = document.createElement('div');
        popup.className = 'cal-popup';
        popup.hidden = true;
        popup.innerHTML =
            '<div class="cal-popup-backdrop" data-cal-close></div>' +
            '<div class="cal-popup-panel" role="document">' +
              '<header class="cal-popup-header">' +
                '<h3 class="cal-popup-title"></h3>' +
                '<div class="cal-popup-actions">' +
                  '<button type="button" class="cal-popup-copy" data-cal-copy>' +
                    '<i class="fa-regular fa-copy"></i><span class="cal-popup-copy-label">Kopieren</span>' +
                  '</button>' +
                  '<button type="button" class="cal-popup-close" data-cal-close aria-label="Schließen">×</button>' +
                '</div>' +
              '</header>' +
              '<div class="cal-popup-body"></div>' +
            '</div>';
        panel.appendChild(popup);

        root._refs = { label, weekdays, grid, sideList, popup };

        // Global close handlers
        root.addEventListener('click', (ev) => {
            if (ev.target.closest('[data-cal-close]')) {
                if (popup.hidden) close();
                else closePopup();
            }
        });
        document.addEventListener('keydown', (ev) => {
            if (ev.key !== 'Escape') return;
            if (!popup.hidden) closePopup();
            else if (!root.hidden) close();
        });

        document.body.appendChild(root);
        return root;
    }

    /* =========================================================
       Render
       ========================================================= */
    function render() {
        const r = buildRoot();
        const { label, weekdays, grid, sideList } = r._refs;

        ensureMonthSet();
        const isGerman = state.isGerman;
        const lang = isGerman ? 'de' : 'en';

        label.textContent = `${MONTHS[lang][state.calMonth]} ${state.calYear}`;
        weekdays.replaceChildren(...WEEKDAYS[lang].map((name) => {
            const el = document.createElement('div');
            el.className = 'cal-weekday';
            el.textContent = name;
            return el;
        }));

        grid.replaceChildren();
        const first = new Date(state.calYear, state.calMonth, 1);
        const startOffset = (first.getDay() + 6) % 7;
        const todayKey = ymd(new Date());
        const monthHolidays = [];

        // Always 42 cells = 6 rows, so height never jumps between months.
        for (let i = 0; i < 42; i++) {
            const d = new Date(state.calYear, state.calMonth, 1 - startOffset + i);
            const inMonth = d.getMonth() === state.calMonth;
            grid.appendChild(renderCell(d, inMonth, todayKey, isGerman, monthHolidays));
        }

        renderSideList(sideList, monthHolidays, isGerman);
    }

    function renderCell(date, inMonth, todayKey, isGerman, monthHolidays) {
        const key = ymd(date);
        const wd = date.getDay();

        const cell = document.createElement('div');
        cell.className = 'cal-cell';
        cell.dataset.date = key;
        if (!inMonth) cell.classList.add('is-outside');
        if (wd === 0 || wd === 6) cell.classList.add('is-weekend');
        if (key === todayKey) {
            cell.classList.add('is-today');
            cell.setAttribute('aria-current', 'date');
        }

        const num = document.createElement('div');
        num.className = 'cal-daynum';
        num.textContent = date.getDate();
        cell.appendChild(num);

        const holidays = getHolidaysForYear(date.getFullYear())[key] || [];
        for (const h of holidays) {
            cell.appendChild(renderHolidayChip(h, isGerman));
            if (inMonth) monthHolidays.push({ date: new Date(date), holiday: h });
        }

        if (inMonth) {
            const reports = getReportsForDay(key);
            const visible = reports.slice(0, MAX_VISIBLE_REPORTS);
            const hidden = reports.length - visible.length;

            visible.forEach((entry, idx) => {
                cell.appendChild(renderReportLine(key, idx, entry, reports.length));
            });

            if (hidden > 0) {
                const more = document.createElement('button');
                more.type = 'button';
                more.className = 'cal-report-more';
                more.dataset.date = key;
                more.textContent = isGerman ? `+${hidden} weitere` : `+${hidden} more`;
                cell.appendChild(more);
            }

            if (reports.length > 0) {
                cell.classList.add('has-reports');
                cell.tabIndex = 0;
                cell.setAttribute('role', 'button');
                cell.setAttribute(
                    'aria-label',
                    isGerman
                        ? `${reports.length} Ausbildungsnachweis-Einträge anzeigen`
                        : `Show ${reports.length} report entries`
                );
            }
        }

        return cell;
    }

    function renderHolidayChip(holiday, isGerman) {
        const region = holiday.region || 'both';
        const chip = document.createElement('div');
        chip.className = 'cal-chip region-' + region;
        chip.title = `${holiday.de} · ${holiday.en}`;

        const tag = document.createElement('span');
        tag.className = 'cal-tag';
        tag.textContent = REGION_LABEL[region] || region.toUpperCase();
        chip.appendChild(tag);

        const name = document.createElement('span');
        name.className = 'cal-chip-name';
        name.textContent = isGerman ? holiday.de : holiday.en;
        chip.appendChild(name);

        return chip;
    }

    function renderReportLine(key, idx, entry, totalOnDay) {
        const line = document.createElement('button');
        line.type = 'button';
        line.className = 'cal-report-line' + (entry.isHO ? ' is-ho' : '');
        line.dataset.date = key;
        line.dataset.reportIndex = String(idx);

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-file-word';
        icon.setAttribute('aria-hidden', 'true');
        line.appendChild(icon);

        const text = document.createElement('span');
        text.className = 'cal-report-text';
        const raw = (entry.content || '').replace(/\s+/g, ' ').trim();
        text.textContent = raw || '—';
        line.appendChild(text);

        line.setAttribute(
            'aria-label',
            totalOnDay > 1
                ? (state.isGerman
                    ? `Eintrag ${idx + 1} von ${totalOnDay} öffnen`
                    : `Open entry ${idx + 1} of ${totalOnDay}`)
                : (state.isGerman ? 'Eintrag öffnen' : 'Open entry')
        );
        if (entry.reportName) line.title = entry.reportName;

        // Click → popup focused on this entry
        line.addEventListener('click', (ev) => {
            ev.stopPropagation();
            openPopup(key, idx);
        });
        return line;
    }

    function renderSideList(list, monthHolidays, isGerman) {
        list.replaceChildren();
        if (!monthHolidays.length) {
            const li = document.createElement('li');
            li.className = 'cal-empty';
            li.textContent = isGerman ? 'Keine besonderen Tage.' : 'No special days.';
            list.appendChild(li);
            return;
        }
        for (const { date, holiday } of monthHolidays) {
            const region = holiday.region || 'both';
            const li = document.createElement('li');
            li.className = 'cal-list-item region-' + region;

            const dateEl = document.createElement('span');
            dateEl.className = 'cal-list-date';
            dateEl.textContent = `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.`;

            const body = document.createElement('span');
            body.className = 'cal-list-body';

            const name = document.createElement('span');
            name.className = 'cal-list-name';
            name.textContent = isGerman ? holiday.de : holiday.en;

            const alt = document.createElement('span');
            alt.className = 'cal-list-alt';
            alt.textContent = isGerman ? holiday.en : holiday.de;

            body.append(name, alt);
            li.append(dateEl, body);
            list.appendChild(li);
        }
    }

    /* =========================================================
       Cell click → popup (wired by delegation once)
       ========================================================= */
    function wireCellDelegation() {
        const r = root;
        const grid = r._refs.grid;

        grid.addEventListener('pointerdown', (ev) => {
            const cell = ev.target.closest('.cal-cell.has-reports');
            if (cell) cell._scrollTopAtDown = cell.scrollTop;
        });

        grid.addEventListener('click', (ev) => {
            const more = ev.target.closest('.cal-report-more');
            if (more) { openPopup(more.dataset.date, MAX_VISIBLE_REPORTS); return; }

            if (ev.target.closest('.cal-report-line')) return; // handled per-line

            const cell = ev.target.closest('.cal-cell.has-reports');
            if (!cell) return;
            if (cell.scrollTop !== cell._scrollTopAtDown) return; // scrolled, not clicked
            openPopup(cell.dataset.date);
        });

        grid.addEventListener('keydown', (ev) => {
            if (ev.key !== 'Enter' && ev.key !== ' ') return;
            const cell = ev.target.closest('.cal-cell.has-reports');
            if (!cell || ev.target !== cell) return;
            ev.preventDefault();
            openPopup(cell.dataset.date);
        });
    }

    /* =========================================================
       Day popup
       ========================================================= */
    let lastPopupText = '';
    let lastFocused = null;

    function openPopup(key, focusIndex = 0) {
        const r = buildRoot();
        const popup = r._refs.popup;
        const title = popup.querySelector('.cal-popup-title');
        const body = popup.querySelector('.cal-popup-body');
        const copyLabel = popup.querySelector('.cal-popup-copy-label');

        const reports = getReportsForDay(key);
        const isGerman = state.isGerman;
        const [y, m, d] = key.split('-').map(Number);
        const dateObj = new Date(y, m - 1, d);
        const dateStr = dateObj.toLocaleDateString(isGerman ? 'de-DE' : 'en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        title.textContent = dateStr;
        if (copyLabel) copyLabel.textContent = isGerman ? 'Kopieren' : 'Copy';

        body.replaceChildren();
        const parts = [];

        if (!reports.length) {
            const empty = document.createElement('p');
            empty.className = 'cal-popup-empty';
            empty.textContent = isGerman
                ? 'Kein Ausbildungsnachweis für diesen Tag.'
                : 'No report for this day.';
            body.appendChild(empty);
            lastPopupText = '';
        } else {
            reports.forEach((entry, idx) => {
                body.appendChild(renderPopupEntry(entry, idx));
                const head =
                    `#${idx + 1}` +
                    (entry.reportName ? ` — ${entry.reportName}` : '') +
                    (entry.isHO ? ' [HO]' : '');
                parts.push(`${head}\n${entry.content || ''}`);
            });
            lastPopupText = `${dateStr}\n\n${parts.join('\n\n')}`;
        }

        popup.hidden = false;
        lastFocused = document.activeElement;

        const entries = body.querySelectorAll('.cal-popup-entry');
        const target = entries[Math.min(focusIndex, entries.length - 1)] || body.firstElementChild;
        if (target) {
            if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
            target.focus({ preventScroll: false });
            target.scrollIntoView({ block: 'nearest' });
        }
    }

    function renderPopupEntry(entry, idx) {
        const article = document.createElement('article');
        article.className = 'cal-popup-entry';

        const header = document.createElement('header');
        header.className = 'cal-popup-entry-header';

        const num = document.createElement('span');
        num.className = 'cal-popup-entry-index';
        num.textContent = `#${idx + 1}`;
        header.appendChild(num);

        if (entry.reportName) {
            const name = document.createElement('span');
            name.className = 'cal-popup-entry-name';
            name.textContent = entry.reportName;
            header.appendChild(name);
        }
        if (entry.isHO) {
            const tag = document.createElement('span');
            tag.className = 'cal-popup-entry-tag';
            tag.textContent = 'HO';
            header.appendChild(tag);
        }
        article.appendChild(header);

        const pre = document.createElement('pre');
        pre.className = 'cal-popup-entry-content';
        pre.textContent = entry.content || '';
        article.appendChild(pre);

        return article;
    }

    function closePopup() {
        const r = root; if (!r) return;
        const popup = r._refs.popup;
        if (popup.hidden) return;
        popup.hidden = true;
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
        lastFocused = null;
    }

    async function copyPopup() {
        const label = root?._refs.popup.querySelector('.cal-popup-copy-label');
        const isGerman = state.isGerman;
        const original = label ? label.textContent : (isGerman ? 'Kopieren' : 'Copy');
        try {
            await navigator.clipboard.writeText(lastPopupText);
            if (label) label.textContent = isGerman ? 'Kopiert!' : 'Copied!';
        } catch (err) {
            console.warn('[calendar] copy failed', err);
            if (label) label.textContent = isGerman ? 'Fehler' : 'Failed';
        }
        setTimeout(() => { if (label) label.textContent = original; }, 1200);
    }

    /* =========================================================
       Open / close
       ========================================================= */
    function open() {
        const r = buildRoot();
        r.hidden = false;
        document.body.classList.add('cal-open');
        render();
        wireCellDelegationOnce();
        // focus close button for accessibility
        const cb = r.querySelector('.cal-close');
        if (cb) cb.focus({ preventScroll: true });
    }

    function close() {
        const r = root; if (!r) return;
        r.hidden = true;
        document.body.classList.remove('cal-open');
        closePopup();
    }

    let delegationWired = false;
    function wireCellDelegationOnce() {
        if (delegationWired) return;
        wireCellDelegation();
        delegationWired = true;
    }

    /* Copy button is wired once when root is built */
    const _origBuild = buildRoot;
    buildRoot = function () {
        const r = _origBuild();
        const copyBtn = r._refs.popup.querySelector('[data-cal-copy]');
        if (copyBtn && !copyBtn._wired) {
            copyBtn.addEventListener('click', copyPopup);
            copyBtn._wired = true;
        }
        return r;
    };

    /* =========================================================
       Fallback styles (only if no external CSS is loaded)
       Injected on first open so it can't fight your stylesheet.
       ========================================================= */
    function injectFallbackStyles() {
        if (document.getElementById('cal-fallback-css')) return;
        const style = document.createElement('style');
        style.id = 'cal-fallback-css';
        style.textContent = `
            .cal-root { position: fixed; inset: 0; z-index: 900; display: grid; place-items: center; }
            .cal-root[hidden] { display: none; }
            .cal-backdrop { position: absolute; inset: 0; background: rgba(15,23,42,.55); }
            .cal-panel { position: relative; width: min(1100px, 94vw); height: min(820px, 90vh);
                display: flex; flex-direction: column; background: #0f172a; color: #e2e8f0;
                border-radius: 12px; box-shadow: 0 24px 64px rgba(0,0,0,.5); overflow: hidden; }
            .cal-header { display: flex; align-items: center; gap: 10px; padding: 10px 14px;
                border-bottom: 1px solid rgba(148,163,184,.18); flex: 0 0 auto; }
            .cal-label { margin: 0; font-size: 16px; font-weight: 600; }
            .cal-nav, .cal-today-btn, .cal-close { font: inherit; background: transparent; color: inherit;
                border: 1px solid rgba(148,163,184,.3); border-radius: 6px; padding: 4px 10px; cursor: pointer; }
            .cal-close { margin-left: 0; font-size: 18px; line-height: 1; padding: 2px 9px; }
            .cal-header-spacer { flex: 1 1 auto; }
            .cal-legend { display: flex; gap: 10px; font-size: 11px; opacity: .8; }
            .cal-legend .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; }
            .cal-legend .dot.de { background: #3b82f6; } .cal-legend .dot.us { background: #ef4444; }
            .cal-legend .dot.both { background: #8b5cf6; }
            .cal-body { flex: 1 1 auto; min-height: 0; display: grid;
                grid-template-columns: minmax(0,1fr) minmax(200px,280px);
                grid-template-rows: auto minmax(0,1fr); gap: 10px; padding: 10px 14px 14px; box-sizing: border-box; }
            .cal-weekdays { grid-column: 1; grid-row: 1; display: grid;
                grid-template-columns: repeat(7,minmax(0,1fr)); gap: 4px; font-size: 11px;
                text-transform: uppercase; letter-spacing: .05em; color: rgba(148,163,184,.85); }
            .cal-weekday { text-align: center; padding: 2px 0; }
            .cal-grid { grid-column: 1; grid-row: 2; display: grid;
                grid-template-columns: repeat(7,minmax(0,1fr));
                grid-template-rows: repeat(6,minmax(0,1fr)); gap: 4px; min-height: 0; height: 100%; }
            .cal-cell { position: relative; display: flex; flex-direction: column; gap: 2px;
                padding: 4px 6px; border-radius: 6px; background: rgba(148,163,184,.06);
                border: 1px solid rgba(148,163,184,.15); overflow: hidden; min-width: 0; min-height: 0; font-size: 12px; }
            .cal-cell.is-outside { opacity: .4; } .cal-cell.is-weekend { background: rgba(148,163,184,.10); }
            .cal-cell.is-today { outline: 2px solid #2563eb; outline-offset: -2px; }
            .cal-cell.has-reports { cursor: pointer; overflow-y: auto; }
            .cal-cell.has-reports:hover { background: rgba(59,130,246,.10); border-color: rgba(59,130,246,.35); }
            .cal-daynum { flex: 0 0 auto; font-size: 11px; font-weight: 600; color: rgba(226,232,240,.65); line-height: 1; }
            .cal-chip { flex: 0 0 auto; display: flex; align-items: center; gap: 4px; font-size: 10px;
                line-height: 1.15; padding: 1px 4px; border-radius: 4px; background: rgba(148,163,184,.18);
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }
            .cal-chip.region-de { background: rgba(59,130,246,.18); }
            .cal-chip.region-us { background: rgba(239,68,68,.18); }
            .cal-chip.region-both { background: rgba(139,92,246,.18); }
            .cal-tag { flex: 0 0 auto; font-size: 9px; font-weight: 700; opacity: .75; }
            .cal-chip-name { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
            .cal-report-line { flex: 0 0 auto; display: flex; align-items: flex-start; gap: 4px; width: 100%;
                max-height: 2.6em; font: inherit; font-size: 10.5px; line-height: 1.25;
                background: rgba(59,130,246,.10); border: 1px solid rgba(59,130,246,.30); color: inherit;
                padding: 1px 4px; border-radius: 4px; cursor: pointer; text-align: left; overflow: hidden; box-sizing: border-box; }
            .cal-report-line.is-ho { background: rgba(16,185,129,.12); border-color: rgba(16,185,129,.38); }
            .cal-report-line i { flex: 0 0 auto; font-size: 9px; margin-top: 2px; opacity: .8; }
            .cal-report-line .cal-report-text { flex: 1 1 auto; min-width: 0; display: -webkit-box;
                -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; }
            .cal-report-more { flex: 0 0 auto; font: inherit; font-size: 10px; font-weight: 600;
                background: none; border: none; color: #60a5fa; cursor: pointer; padding: 0; text-align: left; }
            .cal-side { grid-column: 2; grid-row: 2; min-height: 0; overflow: auto; }
            .cal-side-title { margin: 0 0 6px; font-size: 13px; font-weight: 600; }
            .cal-side-list { list-style: none; margin: 0; padding: 0; }
            .cal-list-item { display: flex; gap: 8px; padding: 6px 8px; border-left: 3px solid transparent;
                background: rgba(148,163,184,.08); border-radius: 4px; margin-bottom: 4px; font-size: 12px; line-height: 1.3; }
            .cal-list-item.region-de { border-left-color: #3b82f6; }
            .cal-list-item.region-us { border-left-color: #ef4444; }
            .cal-list-item.region-both { border-left-color: #8b5cf6; }
            .cal-list-date { flex: 0 0 auto; font-variant-numeric: tabular-nums; opacity: .8; min-width: 40px; }
            .cal-list-body { display: flex; flex-direction: column; min-width: 0; }
            .cal-list-name { font-weight: 500; } .cal-list-alt { font-size: 11px; opacity: .6; font-style: italic; }
            .cal-empty { list-style: none; padding: 16px 8px; text-align: center; opacity: .55; font-size: 12px; }
            .cal-popup[hidden] { display: none; }
            .cal-popup { position: fixed; inset: 0; z-index: 1000; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
            .cal-popup-backdrop { position: absolute; inset: 0; background: rgba(15,23,42,.65); }
            .cal-popup-panel { position: relative; width: min(720px, 92vw); max-height: min(80vh, 720px);
                display: flex; flex-direction: column; background: #1e293b; color: #e2e8f0;
                border-radius: 10px; box-shadow: 0 24px 64px rgba(0,0,0,.55); overflow: hidden; }
            .cal-popup-header { display: flex; align-items: center; justify-content: space-between; gap: 12px;
                padding: 10px 14px; border-bottom: 1px solid rgba(148,163,184,.18);
                background: rgba(148,163,184,.06); flex: 0 0 auto; }
            .cal-popup-title { margin: 0; font-size: 15px; font-weight: 600; }
            .cal-popup-actions { display: flex; gap: 6px; align-items: center; }
            .cal-popup-copy, .cal-popup-close { font: inherit; display: inline-flex; align-items: center; gap: 6px;
                background: transparent; color: inherit; border: 1px solid rgba(148,163,184,.3);
                border-radius: 6px; padding: 4px 10px; cursor: pointer; }
            .cal-popup-close { font-size: 18px; line-height: 1; padding: 2px 9px; }
            .cal-popup-body { flex: 1 1 auto; min-height: 0; overflow: auto; padding: 12px 14px;
                display: flex; flex-direction: column; gap: 12px; }
            .cal-popup-entry { border: 1px solid rgba(148,163,184,.22); border-radius: 8px;
                overflow: hidden; background: rgba(15,23,42,.35); }
            .cal-popup-entry-header { display: flex; align-items: center; gap: 8px; padding: 6px 10px;
                background: rgba(148,163,184,.10); font-size: 12px; border-bottom: 1px solid rgba(148,163,184,.18); }
            .cal-popup-entry-index { color: rgba(148,163,184,.9); }
            .cal-popup-entry-name { font-weight: 600; }
            .cal-popup-entry-tag { background: #10b981; color: #062e22; border-radius: 4px; padding: 0 6px;
                font-size: 10px; font-weight: 700; }
            .cal-popup-entry-content { margin: 0; padding: 10px 12px;
                font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                font-size: 12.5px; line-height: 1.55; white-space: pre-wrap; word-break: break-word;
                user-select: text; background: transparent; color: inherit; }
            .cal-popup-empty { color: rgba(148,163,184,.8); padding: 24px 12px; text-align: center; font-size: 13px; }
            @media (max-width: 900px) {
                .cal-panel { width: 96vw; height: 94vh; }
                .cal-body { grid-template-columns: 1fr; grid-template-rows: auto minmax(0,1fr) auto; }
                .cal-weekdays, .cal-grid, .cal-side { grid-column: 1; }
                .cal-weekdays { grid-row: 1; } .cal-grid { grid-row: 2; } .cal-side { grid-row: 3; max-height: 22vh; }
            }
        `;
        document.head.appendChild(style);
    }

    /* =========================================================
       Public API
       ========================================================= */
    App.calendar = {
        open,
        close,
        shift,
        today: goToday,
        updateAll: render,
        openDayPopup: openPopup,
        closeDayPopup: closePopup,
        getHolidaysForYear,
        buildHolidays,
        easterSunday
    };

    // Inject fallback styles on first call to open()
    const _open = open;
    App.calendar.open = function () { injectFallbackStyles(); _open(); };
    open = App.calendar.open;

    console.log('[calendar] ready. Call App.calendar.open() to show it.');
})();