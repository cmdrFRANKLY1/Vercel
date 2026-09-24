/* resources/modules/calendar.js
 * Calendar modal: holiday calculation (DE + US), month grid, side list.
 * Depends on: util.js (pad2, ymd, addDays, nthWeekday, lastWeekday, escapeHtml)
 *             state.js (App.state.isGerman, App.state.calYear, App.state.calMonth,
 *                       App.state.workReportEntries, App.state.workReportsLoaded)
 */
(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[calendar] window.App missing. Load state.js first.');
        return;
    }

    const { state } = App;
    const util = App.util;
    const { pad2, ymd, addDays, nthWeekday, lastWeekday, escapeHtml } = util;

    /* ----------------------------------------------------------
       Constants
       ---------------------------------------------------------- */
    const holidayCache = {};
    const REGION_ORDER = { both: 0, de: 1, us: 2 };

    /* ----------------------------------------------------------
       Date helpers (holiday math)
       ---------------------------------------------------------- */
    function easterSunday(year) {
        const a = year % 19, b = Math.floor(year / 100), c = year % 100;
        const d = Math.floor(b / 4), e = b % 4;
        const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4), k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(year, month - 1, day);
    }

    function bussUndBettag(year) {
        const nov23 = new Date(year, 10, 23);
        let diff = (nov23.getDay() - 3 + 7) % 7;
        if (diff === 0) diff = 7;
        return addDays(nov23, -diff);
    }

    function buildHolidays(year) {
        const out = [];
        const add = (date, de, en, region) => {
            if (date) out.push({ date: ymd(date), de, en, region: region || 'both' });
        };
        const D = (m, d) => new Date(year, m - 1, d);
        const easter = easterSunday(year);
        const off = (n) => addDays(easter, n);

        // Fixed dates
        add(D(1,1),  'Neujahr', "New Year's Day", 'both');
        add(D(1,6),  'Heilige Drei Könige', 'Epiphany', 'de');
        add(D(2,14), 'Valentinstag', "Valentine's Day", 'both');
        add(D(3,8),  'Internationaler Frauentag', "International Women's Day", 'both');
        add(D(5,1),  'Tag der Arbeit', 'Labour Day', 'de');
        add(D(6,19), 'Juneteenth', 'Juneteenth', 'us');
        add(D(7,4),  'Unabhängigkeitstag (USA)', 'Independence Day', 'us');
        add(D(10,3), 'Tag der Deutschen Einheit', 'German Unity Day', 'de');
        add(D(10,31),'Reformationstag / Halloween', 'Reformation Day / Halloween', 'both');
        add(D(11,1), 'Allerheiligen', "All Saints' Day", 'de');
        add(D(11,11),'Martinstag / Veterans Day', "St. Martin's Day / Veterans Day", 'both');
        add(D(12,6), 'Nikolaus', 'St. Nicholas Day', 'de');
        add(D(12,24),'Heiligabend', 'Christmas Eve', 'both');
        add(D(12,25),'1. Weihnachtstag', 'Christmas Day', 'both');
        add(D(12,26),'2. Weihnachtstag', 'Boxing Day', 'de');
        add(D(12,31),'Silvester', "New Year's Eve", 'both');

        // Easter-relative
        add(off(-48),'Rosenmontag', 'Rose Monday', 'de');
        add(off(-2), 'Karfreitag', 'Good Friday', 'de');
        add(off(0),  'Ostersonntag', 'Easter Sunday', 'both');
        add(off(1),  'Ostermontag', 'Easter Monday', 'de');
        add(off(39), 'Christi Himmelfahrt / Vatertag', 'Ascension Day', 'de');
        add(off(49), 'Pfingstsonntag', 'Whit Sunday', 'de');
        add(off(50), 'Pfingstmontag', 'Whit Monday', 'de');
        add(off(60), 'Fronleichnam', 'Corpus Christi', 'de');

        // US floating
        add(nthWeekday(year, 0, 1, 3),  'Martin Luther King Jr. Day', 'Martin Luther King Jr. Day', 'us');
        add(nthWeekday(year, 1, 1, 3),  "Presidents' Day", "Presidents' Day", 'us');
        add(lastWeekday(year, 4, 1),    'Memorial Day', 'Memorial Day', 'us');
        add(nthWeekday(year, 8, 1, 1),  'Labor Day (USA)', 'Labor Day', 'us');
        add(nthWeekday(year, 9, 1, 2),  'Columbus Day', 'Columbus Day', 'us');
        add(nthWeekday(year, 10, 4, 4), 'Thanksgiving', 'Thanksgiving', 'us');
        add(addDays(nthWeekday(year, 10, 4, 4), 1), 'Black Friday', 'Black Friday', 'us');

        // Movable / regional
        add(nthWeekday(year, 4, 0, 2),  'Muttertag', "Mother's Day", 'both');
        add(nthWeekday(year, 5, 0, 3),  'Vatertag (USA)', "Father's Day", 'us');
        add(nthWeekday(year, 9, 0, 1),  'Erntedankfest', 'Harvest Festival', 'de');
        add(bussUndBettag(year),        'Buß- und Bettag', 'Day of Repentance and Prayer', 'de');

        return out;
    }

    function getHolidaysForYear(year) {
        if (holidayCache[year]) return holidayCache[year];
        const map = {};
        buildHolidays(year).forEach(h => {
            if (!map[h.date]) map[h.date] = [];
            map[h.date].push(h);
        });
        Object.keys(map).forEach(k => {
            map[k].sort((a, b) => (REGION_ORDER[a.region] ?? 3) - (REGION_ORDER[b.region] ?? 3));
        });
        holidayCache[year] = map;
        return map;
    }

    /* ----------------------------------------------------------
       Navigation
       ---------------------------------------------------------- */
    function shift(delta) {
        if (state.calYear === null) {
            const now = new Date();
            state.calYear = now.getFullYear();
            state.calMonth = now.getMonth();
        }
        state.calMonth += delta;
        if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
        else if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
        updateAll();
    }

    function today() {
        const now = new Date();
        state.calYear = now.getFullYear();
        state.calMonth = now.getMonth();
        updateAll();
    }

    function updateAll() {
        buildCalendarDOM('Modal');
        buildCalendarDOM('Inline');
    }

    /* ----------------------------------------------------------
       DOM build
       ---------------------------------------------------------- */
    function buildCalendarDOM(prefix) {
        const grid     = document.getElementById('calendarGrid' + prefix);
        const label    = document.getElementById('calMonthLabel' + prefix);
        const weekdays = document.getElementById('calWeekdays' + prefix);
        const list     = document.getElementById('calMonthList' + prefix);
        if (!grid || !label || !weekdays) return;

        if (state.calYear === null || state.calMonth === null) {
            const now = new Date();
            state.calYear = now.getFullYear();
            state.calMonth = now.getMonth();
        }

        const isGerman = state.isGerman;
        const monthNames = isGerman
            ? ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
            : ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const wdNames = isGerman
            ? ['Mo','Di','Mi','Do','Fr','Sa','So']
            : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

        label.textContent = monthNames[state.calMonth] + ' ' + state.calYear;
        weekdays.innerHTML = wdNames.map(n => '<div class="cal-weekday">' + n + '</div>').join('');

        const first = new Date(state.calYear, state.calMonth, 1);
        const startOffset = (first.getDay() + 6) % 7;
        const daysInMonth = new Date(state.calYear, state.calMonth + 1, 0).getDate();
        const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
        const todayKey = ymd(new Date());

        const monthHolidays = [];
        grid.innerHTML = '';

        for (let i = 0; i < totalCells; i++) {
            const d = new Date(state.calYear, state.calMonth, 1 - startOffset + i);
            const key = ymd(d);
            const inMonth = d.getMonth() === state.calMonth;
            const isToday = key === todayKey;
            const wd = d.getDay();

            const cell = document.createElement('div');
            cell.className = 'cal-cell';
            if (!inMonth) cell.classList.add('is-outside');
            if (wd === 0 || wd === 6) cell.classList.add('is-weekend');
            if (isToday) cell.classList.add('is-today');

            const num = document.createElement('div');
            num.className = 'cal-daynum';
            num.textContent = d.getDate();
            cell.appendChild(num);

            const hs = getHolidaysForYear(d.getFullYear())[key] || [];
            hs.forEach(h => {
                const region = h.region || 'both';
                const chip = document.createElement('div');
                chip.className = 'cal-chip region-' + region;
                chip.title = h.de + ' · ' + h.en;

                const tag = document.createElement('span');
                tag.className = 'cal-tag';
                tag.textContent = region === 'both' ? 'DE·US' : region.toUpperCase();
                chip.appendChild(tag);

                const nm = document.createElement('span');
                nm.className = 'cal-chip-name';
                nm.textContent = isGerman ? h.de : h.en;
                chip.appendChild(nm);

                cell.appendChild(chip);
                if (inMonth) monthHolidays.push({ d: new Date(d), h });
            });

            // Work report chip (populated by reports.js)
            if (state.workReportsLoaded && inMonth) {
                const entry = state.workReportEntries[key];
                if (entry) {
                    const rchip = document.createElement('div');
                    rchip.className = 'cal-report-chip' + (entry.isHO ? ' is-ho' : '');
                    rchip.dataset.reportKey = key;
                    rchip.title = entry.reportName || '';
                    const preview = (entry.content || '').replace(/\s+/g, ' ').trim().slice(0, 60);
                    rchip.innerHTML =
                        `<i class="fa-solid fa-file-word"></i>` +
                        `<span>${escapeHtml(preview)}${preview.length >= 60 ? '…' : ''}</span>`;
                    cell.appendChild(rchip);
                }
            }

            grid.appendChild(cell);
        }

        // Wire report chips → open report modal
        grid.querySelectorAll('.cal-report-chip').forEach(chip => {
            chip.addEventListener('click', (ev) => {
                ev.stopPropagation();
                if (App.reports && typeof App.reports.openForKey === 'function') {
                    App.reports.openForKey(chip.dataset.reportKey);
                }
            });
        });

        // Side list of the month's special days
        if (list) {
            list.innerHTML = '';
            if (!monthHolidays.length) {
                const li = document.createElement('li');
                li.className = 'cal-empty';
                li.textContent = isGerman ? 'Keine besonderen Tage.' : 'No special days.';
                list.appendChild(li);
            } else {
                monthHolidays.forEach(({ d, h }) => {
                    const region = h.region || 'both';
                    const li = document.createElement('li');
                    li.className = 'cal-list-item region-' + region;
                    li.innerHTML =
                        '<span class="cal-list-date">' + pad2(d.getDate()) + '.' + pad2(d.getMonth() + 1) + '.</span>' +
                        '<span class="cal-list-body">' +
                            '<span class="cal-list-name">' + escapeHtml(isGerman ? h.de : h.en) + '</span>' +
                            '<span class="cal-list-alt">'  + escapeHtml(isGerman ? h.en : h.de) + '</span>' +
                        '</span>';
                    list.appendChild(li);
                });
            }
        }
    }

    /* ----------------------------------------------------------
       Modal controls
       ---------------------------------------------------------- */
    function open() {
        const m = document.getElementById('calendarModal');
        if (!m) return;
        m.classList.add('open');
        if (state.calYear === null) today();
    }

    function close() {
        const m = document.getElementById('calendarModal');
        if (m) m.classList.remove('open');
    }

    /* ----------------------------------------------------------
       Public API
       ---------------------------------------------------------- */
    App.calendar = {
        shift,
        today,
        updateAll,
        open,
        close,
        getHolidaysForYear,
        buildHolidays,
        easterSunday
    };
})();