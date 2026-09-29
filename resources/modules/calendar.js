/* resources/modules/calendar.js
 * Renders into the existing #calendarModal DOM from index.html.
 * Matches calendar.css exactly — no injected styles, no blue.
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

    const MAX_VISIBLE_REPORTS = 3;

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
       Report lookup
       ========================================================= */
    function getReportsForDay(key) {
        if (!state.workReportsLoaded) return [];
        const raw = state.workReportEntries?.[key];
        if (!raw) return [];
        return Array.isArray(raw) ? raw.filter(Boolean) : [raw];
    }

    /** Collect all report entries within the currently viewed month. */
    function getReportsForMonth() {
        if (!state.workReportsLoaded) return [];
        ensureMonthSet();
        const year = state.calYear;
        const month = state.calMonth;
        const prefix = `${year}-${pad2(month + 1)}-`;
        const out = [];
        const entries = state.workReportEntries || {};
        for (const key of Object.keys(entries)) {
            if (!key.startsWith(prefix)) continue;
            const raw = entries[key];
            const list = Array.isArray(raw) ? raw.filter(Boolean) : [raw];
            list.forEach((entry, idx) => {
                if (entry) out.push({ date: key, index: idx, entry });
            });
        }
        out.sort((a, b) => a.date.localeCompare(b.date) || a.index - b.index);
        return out;
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
       DOM refs — from index.html
       ========================================================= */
    function getRefs() {
        return {
            modal:          document.getElementById('calendarModal'),
            monthLabel:     document.getElementById('calMonthLabelModal'),
            weekdays:       document.getElementById('calWeekdaysModal'),
            grid:           document.getElementById('calendarGridModal'),
            sideList:       document.getElementById('calMonthListModal'),
            sideReports:    document.getElementById('calMonthReportsModal'),
            popup:          document.getElementById('calPopup'),
            popupTitle:     document.getElementById('calPopupTitle'),
            popupBody:      document.getElementById('calPopupBody'),
            popupCopy:      document.getElementById('calPopupCopy'),
            popupCopyLabel: document.getElementById('calPopupCopyLabel')
        };
    }

    /* =========================================================
       Render
       ========================================================= */
    function render() {
        const refs = getRefs();
        if (!refs.grid) return;

        ensureMonthSet();
        const isGerman = state.isGerman;
        const lang = isGerman ? 'de' : 'en';

        if (refs.monthLabel) {
            refs.monthLabel.textContent = `${MONTHS[lang][state.calMonth]} ${state.calYear}`;
        }

        if (refs.weekdays) {
            refs.weekdays.replaceChildren(...WEEKDAYS[lang].map((name) => {
                const el = document.createElement('div');
                el.className = 'cal-weekday';
                el.textContent = name;
                return el;
            }));
        }

        refs.grid.replaceChildren();
        const first = new Date(state.calYear, state.calMonth, 1);
        const startOffset = (first.getDay() + 6) % 7;
        const todayKey = ymd(new Date());
        const monthHolidays = [];

        for (let i = 0; i < 42; i++) {
            const d = new Date(state.calYear, state.calMonth, 1 - startOffset + i);
            const inMonth = d.getMonth() === state.calMonth;
            refs.grid.appendChild(renderCell(d, inMonth, todayKey, isGerman, monthHolidays));
        }

        if (refs.sideList) renderSideList(refs.sideList, monthHolidays, isGerman);
        if (refs.sideReports) renderSideReports(refs.sideReports, isGerman);
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
       Side panel: reports for the current month
       (rendered below "Besondere Tage")
       ========================================================= */
    function renderSideReports(list, isGerman) {
        list.replaceChildren();
        const monthReports = getReportsForMonth();

        if (!monthReports.length) {
            const li = document.createElement('li');
            li.className = 'cal-empty';
            li.textContent = isGerman
                ? 'Keine Ausbildungsnachweise in diesem Monat.'
                : 'No reports in this month.';
            list.appendChild(li);
            return;
        }

        for (const { date, index, entry } of monthReports) {
            const li = document.createElement('li');
            li.className = 'cal-list-item cal-list-report';
            if (entry.isHO) li.classList.add('is-ho');

            // date badge
            const dateEl = document.createElement('span');
            dateEl.className = 'cal-list-date';
            const [y, m, d] = date.split('-');
            dateEl.textContent = `${d}.${m}.`;
            li.appendChild(dateEl);

            // clickable body — opens the day popup
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'cal-list-report-btn';
            btn.dataset.date = date;
            btn.dataset.reportIndex = String(index);

            const body = document.createElement('span');
            body.className = 'cal-list-body';

            if (entry.reportName) {
                const name = document.createElement('span');
                name.className = 'cal-list-name';
                name.textContent = entry.reportName;
                body.appendChild(name);
            }

            const snippet = document.createElement('span');
            snippet.className = 'cal-list-alt';
            const raw = (entry.content || '').replace(/\s+/g, ' ').trim();
            snippet.textContent = raw ? (raw.length > 90 ? raw.slice(0, 90) + '…' : raw) : '—';
            body.appendChild(snippet);

            if (entry.isHO) {
                const tag = document.createElement('span');
                tag.className = 'cal-list-tag';
                tag.textContent = 'HO';
                body.appendChild(tag);
            }

            btn.appendChild(body);
            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                openPopup(date, index);
            });

            li.appendChild(btn);
            list.appendChild(li);
        }
    }

    /* =========================================================
       Cell click delegation (wired once)
       ========================================================= */
    let delegationWired = false;
    function wireCellDelegation() {
        if (delegationWired) return;
        const refs = getRefs();
        if (!refs.grid) return;
        delegationWired = true;

        refs.grid.addEventListener('pointerdown', (ev) => {
            const cell = ev.target.closest('.cal-cell.has-reports');
            if (cell) cell._scrollTopAtDown = cell.scrollTop;
        });

        refs.grid.addEventListener('click', (ev) => {
            const more = ev.target.closest('.cal-report-more');
            if (more) { openPopup(more.dataset.date, MAX_VISIBLE_REPORTS); return; }

            if (ev.target.closest('.cal-report-line')) return;

            const cell = ev.target.closest('.cal-cell.has-reports');
            if (!cell) return;
            if (cell.scrollTop !== cell._scrollTopAtDown) return;
            openPopup(cell.dataset.date);
        });

        refs.grid.addEventListener('keydown', (ev) => {
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
        const refs = getRefs();
        if (!refs.popup) {
            if (App.reports?.openByKey) App.reports.openByKey(key, focusIndex);
            return;
        }

        const reports = getReportsForDay(key);
        const isGerman = state.isGerman;
        const [y, m, d] = key.split('-').map(Number);
        const dateObj = new Date(y, m - 1, d);
        const dateStr = dateObj.toLocaleDateString(isGerman ? 'de-DE' : 'en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        if (refs.popupTitle) refs.popupTitle.textContent = dateStr;
        if (refs.popupCopyLabel) refs.popupCopyLabel.textContent = isGerman ? 'Kopieren' : 'Copy';

        refs.popupBody.replaceChildren();
        const parts = [];

        if (!reports.length) {
            const empty = document.createElement('p');
            empty.className = 'cal-popup-empty';
            empty.textContent = isGerman
                ? 'Kein Ausbildungsnachweis für diesen Tag.'
                : 'No report for this day.';
            refs.popupBody.appendChild(empty);
            lastPopupText = '';
        } else {
            reports.forEach((entry, idx) => {
                refs.popupBody.appendChild(renderPopupEntry(entry, idx));
                const head =
                    `#${idx + 1}` +
                    (entry.reportName ? ` — ${entry.reportName}` : '') +
                    (entry.isHO ? ' [HO]' : '');
                parts.push(`${head}\n${entry.content || ''}`);
            });
            lastPopupText = `${dateStr}\n\n${parts.join('\n\n')}`;
        }

        refs.popup.hidden = false;
        lastFocused = document.activeElement;

        const entries = refs.popupBody.querySelectorAll('.cal-popup-entry');
        const target = entries[Math.min(focusIndex, entries.length - 1)] || refs.popupBody.firstElementChild;
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
        const refs = getRefs();
        if (!refs.popup || refs.popup.hidden) return;
        refs.popup.hidden = true;
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
        lastFocused = null;
    }

    async function copyPopup() {
        const refs = getRefs();
        const label = refs.popupCopyLabel;
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
        const refs = getRefs();
        if (!refs.modal) { console.error('[calendar] #calendarModal not found'); return; }
        refs.modal.classList.add('open');
        document.body.classList.add('cal-open');
        render();
        wireCellDelegation();
        wirePopupOnce();
        const cb = refs.modal.querySelector('.ctrl-btn');
        if (cb) cb.focus({ preventScroll: true });
    }

    function close() {
        const refs = getRefs();
        if (!refs.modal) return;
        refs.modal.classList.remove('open');
        document.body.classList.remove('cal-open');
        closePopup();
    }

    let popupWired = false;
    function wirePopupOnce() {
        if (popupWired) return;
        popupWired = true;

        const refs = getRefs();
        if (refs.popupCopy) {
            refs.popupCopy.addEventListener('click', copyPopup);
        }
        if (refs.popup) {
            refs.popup.addEventListener('click', (ev) => {
                if (ev.target.closest('[data-cal-close]')) closePopup();
            });
        }
        document.addEventListener('keydown', (ev) => {
            if (ev.key !== 'Escape') return;
            const r = getRefs();
            if (r.popup && !r.popup.hidden) closePopup();
            else if (r.modal && r.modal.classList.contains('open')) close();
        });
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

    console.log('[calendar] ready. Call App.calendar.open() to show it.');
})();