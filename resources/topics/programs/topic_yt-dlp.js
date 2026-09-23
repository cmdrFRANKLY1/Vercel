// resources/topics/topic_ytdlp.js
// Registers the yt-dlp reference topic. Loaded via <script> injection.

/* ==================================================================
   YT-DLP COMMAND GENERATOR CONTROLLER
   ------------------------------------------------------------------
   Live-generates a yt-dlp command from the inputs in the generator
   panel. Because <script> tags inside injected innerHTML are not
   executed, we wire everything via a top-level IIFE that scans the
   DOM (incl. shadow roots) and attaches listeners once per instance.
   Robust against re-renders: periodic scan + per-node flag.
   ================================================================== */
(function () {
    'use strict';

    /* ---------- deep query (shadow DOM + same-origin iframes) ---------- */
    function deepQueryAll(root, selector, out) {
        out = out || [];
        try {
            root.querySelectorAll(selector).forEach(function (el) { out.push(el); });
            var all = root.querySelectorAll('*');
            for (var i = 0; i < all.length; i++) {
                if (all[i].shadowRoot) deepQueryAll(all[i].shadowRoot, selector, out);
            }
        } catch (_) {}
        return out;
    }
    function allDocuments() {
        var docs = [document];
        var iframes = document.querySelectorAll('iframe');
        for (var i = 0; i < iframes.length; i++) {
            try {
                if (iframes[i].contentDocument) docs.push(iframes[i].contentDocument);
            } catch (_) {}
        }
        return docs;
    }

    /* ---------- shared command builder ---------- */
    function buildCommand(cfg) {
        var cmd = 'yt-dlp';

        // output folder (must come before the URL)
        if (cfg.folder) {
            // normalize: trim and strip trailing slash, then append OS-agnostic path separator
            var folder = cfg.folder.replace(/[\/\\]+$/, '');
            cmd += ' -P "' + folder + '"';
        }

        if (cfg.type === 'audio') {
            cmd += ' -x --audio-format ' + cfg.audioFormat;
            if (cfg.quality === 'best') cmd += ' --audio-quality 0';
        } else {
            if (cfg.quality === 'best') {
                cmd += ' -f "bestvideo+bestaudio/best"';
            } else if (cfg.quality === 'worst') {
                cmd += ' -f "worst"';
            } else {
                cmd += ' -f "bestvideo[height<=' + cfg.quality + ']+bestaudio/best[height<=' + cfg.quality + ']"';
            }
            cmd += ' --merge-output-format mp4';
        }

        if (cfg.embedThumb) cmd += ' --embed-thumbnail';
        if (cfg.addMeta)    cmd += ' --add-metadata';
        if (cfg.subs)       cmd += ' --write-subs --sub-langs "en,de"';

        cmd += ' "' + cfg.url + '"';
        return cmd;
    }

    function flashFeedback(node) {
        if (!node) return;
        node.classList.add('show');
        setTimeout(function () { node.classList.remove('show'); }, 1600);
    }

    /* ---------- per-instance init ---------- */
    function initGenerator(root, ids) {
        if (!root || root.__ytdlpWired) return;
        var el = {};
        for (var k in ids) {
            el[k] = root.querySelector('#' + ids[k]);
            if (!el[k]) return;   // DOM not fully rendered yet — retry next scan
        }
        root.__ytdlpWired = true;

        /* ---- helpers ---- */
        function readConfig() {
            return {
                url:         (el.url.value || '').trim() || 'URL',
                folder:      (el.folder.value || '').trim(),
                type:        el.type.value,
                quality:     el.quality.value,
                audioFormat: el.audioFormat.value,
                embedThumb:  el.embedThumb.checked,
                addMeta:     el.addMeta.checked,
                subs:        el.subs.checked
            };
        }
        function update() {
            el.output.value = buildCommand(readConfig());
        }
        function syncAudioVisibility() {
            el.audioOpts.style.display = el.type.value === 'audio' ? 'block' : 'none';
        }

        /* ---- live regeneration on any input change ---- */
        el.url.addEventListener('input', update);
        el.folder.addEventListener('input', update);
        el.type.addEventListener('change', function () { syncAudioVisibility(); update(); });
        el.quality.addEventListener('change', update);
        el.audioFormat.addEventListener('change', update);
        el.embedThumb.addEventListener('change', update);
        el.addMeta.addEventListener('change', update);
        el.subs.addEventListener('change', update);

        /* ---- copy to clipboard ---- */
        el.copy.addEventListener('click', function () {
            el.output.select();
            el.output.setSelectionRange(0, 99999);
            var ok = false;
            try { ok = document.execCommand('copy'); } catch (_) {}
            if (!ok && navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(el.output.value)
                    .then(function () { flashFeedback(el.feedback); })
                    .catch(function () { flashFeedback(el.feedback); });
            } else {
                flashFeedback(el.feedback);
            }
        });

        /* ---- initial render ---- */
        syncAudioVisibility();
        update();
    }

    /* ---------- ID maps for both language instances ---------- */
    var DE = {
        url:         'ytdlp-url',
        folder:      'ytdlp-folder',
        type:        'ytdlp-type',
        quality:     'ytdlp-quality',
        audioOpts:   'ytdlp-audio-options',
        audioFormat: 'ytdlp-audio-format',
        embedThumb:  'ytdlp-embed-thumb',
        addMeta:     'ytdlp-add-metadata',
        subs:        'ytdlp-subtitles',
        output:      'ytdlp-output',
        copy:        'ytdlp-copy',
        feedback:    'ytdlp-copy-feedback'
    };
    var EN = {
        url:         'ytdlp-url-en',
        folder:      'ytdlp-folder-en',
        type:        'ytdlp-type-en',
        quality:     'ytdlp-quality-en',
        audioOpts:   'ytdlp-audio-options-en',
        audioFormat: 'ytdlp-audio-format-en',
        embedThumb:  'ytdlp-embed-thumb-en',
        addMeta:     'ytdlp-add-metadata-en',
        subs:        'ytdlp-subtitles-en',
        output:      'ytdlp-output-en',
        copy:        'ytdlp-copy-en',
        feedback:    'ytdlp-copy-feedback-en'
    };

    function scan() {
        allDocuments().forEach(function (doc) {
            try { initGenerator(doc.getElementById('ytdlp-generator'),    DE); } catch (_) {}
            try { initGenerator(doc.getElementById('ytdlp-generator-en'), EN); } catch (_) {}
        });
    }

    function start() {
        scan();
        setInterval(scan, 500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();


/* ==================================================================
   TOPIC REGISTRATION
   ================================================================== */
registerTopic({
    parentId: 'Programme',
    id: 'yt-dlp Overview',
    icon: 'fa-download',
    titleDe: 'YT-DLP',
    titleEn: 'YT-DLP',
    descDe: 'Vollständige Referenz für yt-dlp.exe inklusive ffmpeg-Integration, Formaten, Optionen und interaktivem Befehls-Generator.',
    descEn: 'Complete reference for yt-dlp.exe including ffmpeg integration, formats, options, and interactive command generator.',

    sidebarTitleDe: 'yt-dlp',
    sidebarTitleEn: 'yt-dlp',
    sidebarSubtitleDe: 'Download-Tool & Referenz',
    sidebarSubtitleEn: 'Download Tool & Reference',
    sidebarVersion: 'v1.4',

    hero: {
        titleDe: 'yt-dlp: Der ultimative Downloader',
        titleEn: 'yt-dlp: The Ultimate Downloader',
        introDe: 'yt-dlp ist ein leistungsstarkes Kommandozeilen-Tool zum Herunterladen von Videos und Audios von über 1.000 Websites (YouTube, Twitch, Twitter, TikTok und mehr). Es ist ein Fork von youtube-dl mit vielen zusätzlichen Features und wird aktiv weiterentwickelt. Diese Referenz deckt Installation, grundlegende Befehle, Format-Auswahl, ffmpeg-Integration und einen interaktiven Befehls-Generator ab. <a href="#section5">Zum Befehls-Generator</a>.',
        introEn: 'yt-dlp is a powerful command-line tool for downloading videos and audio from over 1,000 websites (YouTube, Twitch, Twitter, TikTok, and more). It is a fork of youtube-dl with many additional features and is actively maintained. This reference covers installation, basic commands, format selection, ffmpeg integration, and an interactive command generator. <a href="#section5">Go to Command Generator</a>.'
    },

    quickLinks: [
        { icon: 'fa-terminal',           href: '#section1', switchToDoc: true, labelDe: 'Grundlagen',           labelEn: 'Basics' },
        { icon: 'fa-film',               href: '#section2', switchToDoc: true, labelDe: 'Formate & Qualität',   labelEn: 'Formats & Quality' },
        { icon: 'fa-music',              href: '#section3', switchToDoc: true, labelDe: 'Audio-Extraktion',     labelEn: 'Audio Extraction' },
        { icon: 'fa-cogs',               href: '#section4', switchToDoc: true, labelDe: 'ffmpeg-Integration',   labelEn: 'ffmpeg Integration' },
        { icon: 'fa-magic',              href: '#section5', switchToDoc: true, labelDe: 'Befehls-Generator',    labelEn: 'Command Generator' },
        { icon: 'fa-external-link-alt',  href: 'https://github.com/yt-dlp/yt-dlp', target: '_blank', labelDe: 'GitHub',  labelEn: 'GitHub' }
    ],

    sections: [
        /* ============ 1. GRUNDLAGEN ============ */
        {
            id: 'section1',
            titleDe: 'Grundlagen & Installation',
            titleEn: 'Basics & Installation',
            introDe: 'yt-dlp wird als einzelne ausführbare Datei verteilt und benötigt keine Installation. Für Windows gibt es eine standalone <code>yt-dlp.exe</code>.',
            introEn: 'yt-dlp is distributed as a single executable file and requires no installation. For Windows, there is a standalone <code>yt-dlp.exe</code>.',
            subtopics: [
                {
                    id: 'subsection1_1',
                    titleDe: 'Installation & Aktualisierung',
                    titleEn: 'Installation & Updating',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Methode</th><th>Befehl / Hinweis</th></tr>
                    <tr><td><strong>Windows Standalone</strong></td><td class="text-[var(--text-muted)]"><code>yt-dlp.exe</code> von GitHub herunterladen und in einen Ordner legen, der in der <code>PATH</code>-Umgebungsvariable enthalten ist.</td></tr>
                    <tr><td><strong>Python / pip</strong></td><td class="text-[var(--text-muted)]"><code>pip install -U yt-dlp</code></td></tr>
                    <tr><td><strong>winget</strong></td><td class="text-[var(--text-muted)]"><code>winget install yt-dlp.yt-dlp</code> (bei Problemen zuerst ffmpeg separat installieren)</td></tr>
                    <tr><td><strong>Selbst-Update</strong></td><td class="text-[var(--text-muted)]"><code>yt-dlp -U</code> (funktioniert für Standalone-Binaries)</td></tr>
                    <tr><td><strong>Nightly-Update</strong></td><td class="text-[var(--text-muted)]"><code>yt-dlp --update-to nightly</code> (für neueste Fixes bei YouTube-Änderungen)</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Method</th><th>Command / Note</th></tr>
                    <tr><td><strong>Windows Standalone</strong></td><td class="text-[var(--text-muted)]">Download <code>yt-dlp.exe</code> from GitHub and place it in a folder included in the <code>PATH</code> environment variable.</td></tr>
                    <tr><td><strong>Python / pip</strong></td><td class="text-[var(--text-muted)]"><code>pip install -U yt-dlp</code></td></tr>
                    <tr><td><strong>winget</strong></td><td class="text-[var(--text-muted)]"><code>winget install yt-dlp.yt-dlp</code> (if issues, install ffmpeg separately first)</td></tr>
                    <tr><td><strong>Self-Update</strong></td><td class="text-[var(--text-muted)]"><code>yt-dlp -U</code> (works for standalone binaries)</td></tr>
                    <tr><td><strong>Nightly Update</strong></td><td class="text-[var(--text-muted)]"><code>yt-dlp --update-to nightly</code> (for latest fixes when YouTube changes)</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection1_2',
                    titleDe: 'Grundlegende Befehle',
                    titleEn: 'Basic Commands',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Einfacher Download (beste Qualität):</strong><br><code>yt-dlp "URL"</code></li>
                    <li><strong>Als MP4 speichern:</strong><br><code>yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" "URL"</code></li>
                    <li><strong>Verfügbare Formate anzeigen:</strong><br><code>yt-dlp -F "URL"</code></li>
                    <li><strong>Eigenen Dateinamen festlegen:</strong><br><code>yt-dlp -o "%(title)s.%(ext)s" "URL"</code></li>
                    <li><strong>Untertitel herunterladen:</strong><br><code>yt-dlp --write-subs --sub-langs "de,en" "URL"</code></li>
                    <li><strong>Playlist herunterladen:</strong><br><code>yt-dlp -o "%(playlist_index)s - %(title)s.%(ext)s" "PLAYLIST_URL"</code></li>
                    <li><strong>Nur bestimmte Playlist-Einträge:</strong><br><code>yt-dlp -I 1:3,7,-5::2 "PLAYLIST_URL"</code></li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Simple download (best quality):</strong><br><code>yt-dlp "URL"</code></li>
                    <li><strong>Save as MP4:</strong><br><code>yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" "URL"</code></li>
                    <li><strong>List available formats:</strong><br><code>yt-dlp -F "URL"</code></li>
                    <li><strong>Set custom filename:</strong><br><code>yt-dlp -o "%(title)s.%(ext)s" "URL"</code></li>
                    <li><strong>Download subtitles:</strong><br><code>yt-dlp --write-subs --sub-langs "en,de" "URL"</code></li>
                    <li><strong>Download playlist:</strong><br><code>yt-dlp -o "%(playlist_index)s - %(title)s.%(ext)s" "PLAYLIST_URL"</code></li>
                    <li><strong>Only specific playlist items:</strong><br><code>yt-dlp -I 1:3,7,-5::2 "PLAYLIST_URL"</code></li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 2. FORMATE & QUALITÄT ============ */
        {
            id: 'section2',
            titleDe: 'Formate & Qualität',
            titleEn: 'Formats & Quality',
            introDe: 'yt-dlp bietet feingranulare Kontrolle über Formatwahl. Mit <code>-F</code> werden alle verfügbaren Formate aufgelistet, mit <code>-f</code> wird das gewünschte Format ausgewählt.',
            introEn: 'yt-dlp offers fine-grained control over format selection. Use <code>-F</code> to list all available formats, and <code>-f</code> to select the desired format.',
            subtopics: [
                {
                    id: 'subsection2_1',
                    titleDe: 'Format-Selektoren',
                    titleEn: 'Format Selectors',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Selektor</th><th>Bedeutung</th></tr>
                    <tr><td><strong><code>best</code></strong></td><td class="text-[var(--text-muted)]">Bestes kombiniertes Format (Video + Audio in einer Datei).</td></tr>
                    <tr><td><strong><code>bestvideo</code></strong></td><td class="text-[var(--text-muted)]">Bestes Video-only Format (benötigt Merge mit Audio).</td></tr>
                    <tr><td><strong><code>bestaudio</code></strong></td><td class="text-[var(--text-muted)]">Bestes Audio-only Format.</td></tr>
                    <tr><td><strong><code>bestvideo+bestaudio</code></strong></td><td class="text-[var(--text-muted)]">Bestes Video und Audio separat herunterladen und mit ffmpeg zusammenfügen.</td></tr>
                    <tr><td><strong><code>bestvideo[height<=1080]+bestaudio</code></strong></td><td class="text-[var(--text-muted)]">Video auf maximal 1080p begrenzen.</td></tr>
                    <tr><td><strong><code>bestvideo[ext=mp4]+bestaudio[ext=m4a]</code></strong></td><td class="text-[var(--text-muted)]">Bevorzugt MP4-Video und M4A-Audio.</td></tr>
                    <tr><td><strong><code>worst</code></strong></td><td class="text-[var(--text-muted)]">Schlechteste Qualität (für Bandbreiten-Schonung).</td></tr>
                    <tr><td><strong><code>22</code></strong></td><td class="text-[var(--text-muted)]">Spezifische Format-ID (aus <code>-F</code>-Ausgabe).</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Selector</th><th>Meaning</th></tr>
                    <tr><td><strong><code>best</code></strong></td><td class="text-[var(--text-muted)]">Best combined format (video + audio in one file).</td></tr>
                    <tr><td><strong><code>bestvideo</code></strong></td><td class="text-[var(--text-muted)]">Best video-only format (requires merge with audio).</td></tr>
                    <tr><td><strong><code>bestaudio</code></strong></td><td class="text-[var(--text-muted)]">Best audio-only format.</td></tr>
                    <tr><td><strong><code>bestvideo+bestaudio</code></strong></td><td class="text-[var(--text-muted)]">Download best video and audio separately, merge with ffmpeg.</td></tr>
                    <tr><td><strong><code>bestvideo[height<=1080]+bestaudio</code></strong></td><td class="text-[var(--text-muted)]">Limit video to max 1080p.</td></tr>
                    <tr><td><strong><code>bestvideo[ext=mp4]+bestaudio[ext=m4a]</code></strong></td><td class="text-[var(--text-muted)]">Prefer MP4 video and M4A audio.</td></tr>
                    <tr><td><strong><code>worst</code></strong></td><td class="text-[var(--text-muted)]">Worst quality (for bandwidth saving).</td></tr>
                    <tr><td><strong><code>22</code></strong></td><td class="text-[var(--text-muted)]">Specific format ID (from <code>-F</code> output).</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection2_2',
                    titleDe: 'Container-Formate',
                    titleEn: 'Container Formats',
                    htmlDe: `
                    <p class="text-xs">Mit <code>--merge-output-format</code> kann der Container beim Zusammenfügen festgelegt werden:</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>mp4</strong> – Universell kompatibel, beste Wahl für die meisten Geräte.</li>
                    <li><strong>mkv</strong> – Unterstützt fast alle Codecs, ideal für Archivierung.</li>
                    <li><strong>webm</strong> – Offenes Format, oft für VP9/Opus.</li>
                    <li><strong>avi</strong> – Älter, begrenzte Codec-Unterstützung.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <p class="text-xs">Use <code>--merge-output-format</code> to specify the container when merging:</p>
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-1">
                    <li><strong>mp4</strong> – Universally compatible, best choice for most devices.</li>
                    <li><strong>mkv</strong> – Supports almost all codecs, ideal for archiving.</li>
                    <li><strong>webm</strong> – Open format, often for VP9/Opus.</li>
                    <li><strong>avi</strong> – Older, limited codec support.</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 3. AUDIO-EXTRAKTION ============ */
        {
            id: 'section3',
            titleDe: 'Audio-Extraktion',
            titleEn: 'Audio Extraction',
            introDe: 'Mit <code>-x</code> (oder <code>--extract-audio</code>) wird nur die Audiospur heruntergeladen und in das gewünschte Format konvertiert. Dies erfordert ffmpeg und ffprobe im PATH.',
            introEn: 'Use <code>-x</code> (or <code>--extract-audio</code>) to download only the audio track and convert it to the desired format. This requires ffmpeg and ffprobe in PATH.',
            subtopics: [
                {
                    id: 'subsection3_1',
                    titleDe: 'Audio-Formate & Qualität',
                    titleEn: 'Audio Formats & Quality',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Option</th><th>Beschreibung</th></tr>
                    <tr><td><strong><code>--audio-format mp3</code></strong></td><td class="text-[var(--text-muted)]">Konvertiert zu MP3. Unterstützt: best, aac, alac, flac, m4a, mp3, opus, vorbis, wav.</td></tr>
                    <tr><td><strong><code>--audio-format m4a</code></strong></td><td class="text-[var(--text-muted)]">Behält AAC-Codec in M4A-Container (Verlustarm).</td></tr>
                    <tr><td><strong><code>--audio-format flac</code></strong></td><td class="text-[var(--text-muted)]">Verlustfreie Kompression.</td></tr>
                    <tr><td><strong><code>--audio-format opus</code></strong></td><td class="text-[var(--text-muted)]">Modernes, effizientes Format (kleine Dateien, hohe Qualität).</td></tr>
                    <tr><td><strong><code>--audio-quality 0</code></strong></td><td class="text-[var(--text-muted)]">Beste Qualität (VBR). Skala: 0 (best) bis 10 (worst).</td></tr>
                    <tr><td><strong><code>--audio-quality 128K</code></strong></td><td class="text-[var(--text-muted)]">Konstante Bitrate (CBR) von 128 kbit/s.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/4">Option</th><th>Description</th></tr>
                    <tr><td><strong><code>--audio-format mp3</code></strong></td><td class="text-[var(--text-muted)]">Converts to MP3. Supports: best, aac, alac, flac, m4a, mp3, opus, vorbis, wav.</td></tr>
                    <tr><td><strong><code>--audio-format m4a</code></strong></td><td class="text-[var(--text-muted)]">Keeps AAC codec in M4A container (lossy).</td></tr>
                    <tr><td><strong><code>--audio-format flac</code></strong></td><td class="text-[var(--text-muted)]">Lossless compression.</td></tr>
                    <tr><td><strong><code>--audio-format opus</code></strong></td><td class="text-[var(--text-muted)]">Modern, efficient format (small files, high quality).</td></tr>
                    <tr><td><strong><code>--audio-quality 0</code></strong></td><td class="text-[var(--text-muted)]">Best quality (VBR). Scale: 0 (best) to 10 (worst).</td></tr>
                    <tr><td><strong><code>--audio-quality 128K</code></strong></td><td class="text-[var(--text-muted)]">Constant bitrate (CBR) of 128 kbit/s.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection3_2',
                    titleDe: 'Praxis-Beispiele',
                    titleEn: 'Practical Examples',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>MP3 (beste Qualität):</strong><br><code>yt-dlp -x --audio-format mp3 --audio-quality 0 "URL"</code></li>
                    <li><strong>M4A (verlustarm):</strong><br><code>yt-dlp -x --audio-format m4a "URL"</code></li>
                    <li><strong>FLAC (verlustfrei):</strong><br><code>yt-dlp -x --audio-format flac "URL"</code></li>
                    <li><strong>Metadaten &amp; Cover einbetten:</strong><br><code>yt-dlp -x --audio-format mp3 --embed-thumbnail --add-metadata "URL"</code></li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>MP3 (best quality):</strong><br><code>yt-dlp -x --audio-format mp3 --audio-quality 0 "URL"</code></li>
                    <li><strong>M4A (lossy):</strong><br><code>yt-dlp -x --audio-format m4a "URL"</code></li>
                    <li><strong>FLAC (lossless):</strong><br><code>yt-dlp -x --audio-format flac "URL"</code></li>
                    <li><strong>Embed metadata &amp; cover:</strong><br><code>yt-dlp -x --audio-format mp3 --embed-thumbnail --add-metadata "URL"</code></li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 4. FFMPEG-INTEGRATION ============ */
        {
            id: 'section4',
            titleDe: 'ffmpeg-Integration',
            titleEn: 'ffmpeg Integration',
            introDe: 'ffmpeg ist ein externes Tool, das yt-dlp für viele Aufgaben benötigt: Zusammenfügen von Video+Audio, Konvertierung von Formaten, Einbetten von Metadaten und mehr. Es muss separat installiert werden.',
            introEn: 'ffmpeg is an external tool that yt-dlp requires for many tasks: merging video+audio, format conversion, embedding metadata, and more. It must be installed separately.',
            subtopics: [
                {
                    id: 'subsection4_1',
                    titleDe: 'Warum ffmpeg?',
                    titleEn: 'Why ffmpeg?',
                    htmlDe: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Aufgabe</th><th>ffmpeg benötigt?</th></tr>
                    <tr><td><strong>Bestes Video + Audio getrennt herunterladen</strong></td><td class="text-[var(--text-muted)]">Ja – zum Zusammenfügen (Muxing).</td></tr>
                    <tr><td><strong>Audio-Extraktion (<code>-x</code>)</strong></td><td class="text-[var(--text-muted)]">Ja – zum Konvertieren.</td></tr>
                    <tr><td><strong>Container wechseln (<code>--remux-video</code>)</strong></td><td class="text-[var(--text-muted)]">Ja – zum Umschreiben ohne Neukodierung.</td></tr>
                    <tr><td><strong>Untertitel einbetten</strong></td><td class="text-[var(--text-muted)]">Ja.</td></tr>
                    <tr><td><strong>Metadaten / Thumbnail einbetten</strong></td><td class="text-[var(--text-muted)]">Ja.</td></tr>
                    <tr><td><strong>Einfacher Download (kombiniertes Format)</strong></td><td class="text-[var(--text-muted)]">Nein.</td></tr>
                    </table>
                    </div>
                    `,
                    htmlEn: `
                    <div class="overflow-x-auto w-full">
                    <table class="wikitable">
                    <tr><th class="w-1/3">Task</th><th>ffmpeg needed?</th></tr>
                    <tr><td><strong>Download best video + audio separately</strong></td><td class="text-[var(--text-muted)]">Yes – for merging (muxing).</td></tr>
                    <tr><td><strong>Audio extraction (<code>-x</code>)</strong></td><td class="text-[var(--text-muted)]">Yes – for converting.</td></tr>
                    <tr><td><strong>Change container (<code>--remux-video</code>)</strong></td><td class="text-[var(--text-muted)]">Yes – for rewriting without re-encoding.</td></tr>
                    <tr><td><strong>Embed subtitles</strong></td><td class="text-[var(--text-muted)]">Yes.</td></tr>
                    <tr><td><strong>Embed metadata / thumbnail</strong></td><td class="text-[var(--text-muted)]">Yes.</td></tr>
                    <tr><td><strong>Simple download (combined format)</strong></td><td class="text-[var(--text-muted)]">No.</td></tr>
                    </table>
                    </div>
                    `
                },
                {
                    id: 'subsection4_2',
                    titleDe: 'ffmpeg installieren & finden',
                    titleEn: 'Installing & Locating ffmpeg',
                    htmlDe: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Windows:</strong> Von <a href="https://www.gyan.dev/ffmpeg/builds/" target="_blank">gyan.dev</a> oder <a href="https://github.com/BtbN/FFmpeg-Builds/releases" target="_blank">BtbN</a> herunterladen, entpacken und den <code>bin</code>-Ordner zum PATH hinzufügen. Alternativ <code>winget install ffmpeg</code>.</li>
                    <li><strong>Linux:</strong> <code>sudo apt install ffmpeg</code> (Debian/Ubuntu) oder <code>sudo dnf install ffmpeg</code> (Fedora).</li>
                    <li><strong>macOS:</strong> <code>brew install ffmpeg</code></li>
                    <li><strong>Pfad explizit angeben:</strong> <code>yt-dlp --ffmpeg-location "C:\\ffmpeg\\bin" "URL"</code></li>
                    <li><strong>Prüfen ob erkannt:</strong> <code>yt-dlp --verbose "URL"</code> zeigt am Anfang die gefundenen Abhängigkeiten an.</li>
                    </ul>
                    </div>
                    `,
                    htmlEn: `
                    <div class="bg-[var(--panel-color)] p-3 border border-[var(--panel-border)] rounded text-xs text-[var(--text-muted)]" style="box-shadow: var(--control-shadow);">
                    <ul class="list-disc pl-4 space-y-2">
                    <li><strong>Windows:</strong> Download from <a href="https://www.gyan.dev/ffmpeg/builds/" target="_blank">gyan.dev</a> or <a href="https://github.com/BtbN/FFmpeg-Builds/releases" target="_blank">BtbN</a>, extract, and add the <code>bin</code> folder to PATH. Alternatively <code>winget install ffmpeg</code>.</li>
                    <li><strong>Linux:</strong> <code>sudo apt install ffmpeg</code> (Debian/Ubuntu) or <code>sudo dnf install ffmpeg</code> (Fedora).</li>
                    <li><strong>macOS:</strong> <code>brew install ffmpeg</code></li>
                    <li><strong>Specify path explicitly:</strong> <code>yt-dlp --ffmpeg-location "C:\\ffmpeg\\bin" "URL"</code></li>
                    <li><strong>Verify detection:</strong> <code>yt-dlp --verbose "URL"</code> shows found dependencies at the top.</li>
                    </ul>
                    </div>
                    `
                }
            ]
        },

        /* ============ 5. BEFEHLS-GENERATOR ============ */
        {
            id: 'section5',
            titleDe: 'Befehls-Generator',
            titleEn: 'Command Generator',
            introDe: 'Der Befehl wird live aktualisiert, während Sie Eingaben machen. Füllen Sie die Felder aus und kopieren Sie den fertigen yt-dlp-Befehl in die Zwischenablage.',
            introEn: 'The command is updated live as you make input. Fill in the fields and copy the finished yt-dlp command to your clipboard.',
            subtopics: [
                {
                    id: 'subsection5_1',
                    titleDe: 'Interaktiver Generator',
                    titleEn: 'Interactive Generator',
                    htmlDe: `
                    <style>
                        /* ---------- scoped yt-dlp generator styles (DE) ---------- */
                        .ytdlp-gen * { box-sizing: border-box; }
                        .ytdlp-gen {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.6rem;
                            padding: 1rem;
                            font-size: 0.72rem;
                            box-shadow: var(--control-shadow);
                        }
                        .ytdlp-gen .row { margin-bottom: 0.85rem; }
                        .ytdlp-gen .grid-2 {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 0.85rem;
                            margin-bottom: 0.85rem;
                        }
                        @media (max-width: 560px) {
                            .ytdlp-gen .grid-2 { grid-template-columns: 1fr; }
                        }
                        .ytdlp-gen label.lbl {
                            display: block;
                            font-weight: 700;
                            color: var(--text-color);
                            margin-bottom: 0.4rem;
                            font-size: 0.7rem;
                            letter-spacing: 0.01em;
                        }
                        .ytdlp-gen input[type="text"],
                        .ytdlp-gen select,
                        .ytdlp-gen textarea {
                            width: 100%;
                            padding: 0.65rem 0.9rem;
                            border: 1px solid var(--border-color);
                            border-radius: 0.45rem;
                            background: var(--bg-color);
                            color: var(--text-color);
                            font-size: 0.72rem;
                            font-family: inherit;
                            line-height: 1.35;
                            outline: none;
                            transition: border-color .15s, box-shadow .15s;
                        }
                        .ytdlp-gen input[type="text"]:focus,
                        .ytdlp-gen select:focus,
                        .ytdlp-gen textarea:focus {
                            border-color: var(--link-color);
                            box-shadow: 0 0 0 3px color-mix(in srgb, var(--link-color) 25%, transparent);
                        }
                        .ytdlp-gen select {
                            appearance: none;
                            -webkit-appearance: none;
                            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
                            background-repeat: no-repeat;
                            background-position: right 0.9rem center;
                            padding-right: 2.2rem;
                        }
                        .ytdlp-gen textarea {
                            min-height: 4rem;
                            font-family: 'Courier New', Menlo, monospace;
                            resize: vertical;
                        }
                        /* ---------- horizontal checkbox row ---------- */
                        .ytdlp-gen .chk-row {
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            gap: 0.5rem 1.5rem;
                            margin-bottom: 0.85rem;
                        }
                        .ytdlp-gen .chk {
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            font-weight: 600;
                            color: var(--text-color);
                            cursor: pointer;
                            user-select: none;
                            font-size: 0.72rem;
                            white-space: nowrap;
                        }
                        .ytdlp-gen .chk input[type="checkbox"] {
                            flex-shrink: 0;
                            width: 15px;
                            height: 15px;
                            margin: 0;
                            accent-color: var(--link-color);
                            cursor: pointer;
                        }
                        .ytdlp-gen .chk span { line-height: 1.3; }
                        /* ---------- copy button ---------- */
                        .ytdlp-gen .btn {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.55rem;
                            padding: 0.7rem 1.25rem;
                            border-radius: 0.45rem;
                            font-weight: 800;
                            font-size: 0.72rem;
                            letter-spacing: 0.02em;
                            cursor: pointer;
                            user-select: none;
                            transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease, background .15s ease;
                            border: 1px solid transparent;
                        }
                        .ytdlp-gen .btn:active { transform: translateY(1px); }
                        .ytdlp-gen .btn i { font-size: 0.78rem; }
                        .ytdlp-gen .btn-secondary {
                            background: var(--code-bg);
                            color: var(--text-color);
                            border-color: var(--border-color);
                        }
                        .ytdlp-gen .btn-secondary:hover {
                            background: color-mix(in srgb, var(--link-color) 12%, var(--code-bg));
                            border-color: var(--link-color);
                            transform: translateY(-1px);
                        }
                        .ytdlp-gen .actions {
                            display: flex;
                            align-items: center;
                            gap: 0.85rem;
                            flex-wrap: wrap;
                            margin-top: 0.3rem;
                        }
                        .ytdlp-gen .copy-feedback {
                            display: none;
                            align-items: center;
                            gap: 0.35rem;
                            font-size: 0.7rem;
                            font-weight: 700;
                            color: #10b981;
                        }
                        .ytdlp-gen .copy-feedback.show { display: inline-flex; }
                    </style>

                    <div id="ytdlp-generator" class="ytdlp-gen">
                        <div class="row">
                            <label class="lbl">YouTube-URL / Video-URL</label>
                            <input type="text" id="ytdlp-url" placeholder="https://www.youtube.com/watch?v=..." />
                        </div>

                        <div class="row">
                            <label class="lbl">Ausgabeordner (optional)</label>
                            <input type="text" id="ytdlp-folder" placeholder="C:\Downloads\yt-dlp" />
                        </div>

                        <div class="grid-2">
                            <div>
                                <label class="lbl">Medientyp</label>
                                <select id="ytdlp-type">
                                    <option value="video">Video (MP4)</option>
                                    <option value="audio">Audio</option>
                                </select>
                            </div>
                            <div>
                                <label class="lbl">Qualität</label>
                                <select id="ytdlp-quality">
                                    <option value="best">Beste verfügbare</option>
                                    <option value="1080">Max. 1080p (Full HD)</option>
                                    <option value="720">Max. 720p (HD)</option>
                                    <option value="480">Max. 480p</option>
                                    <option value="worst">Geringste</option>
                                </select>
                            </div>
                        </div>

                        <div class="row" id="ytdlp-audio-options" style="display:none;">
                            <label class="lbl">Audio-Format</label>
                            <select id="ytdlp-audio-format">
                                <option value="mp3">MP3</option>
                                <option value="m4a">M4A (AAC)</option>
                                <option value="flac">FLAC (verlustfrei)</option>
                                <option value="opus">Opus</option>
                                <option value="wav">WAV</option>
                            </select>
                        </div>

                        <div class="chk-row">
                            <label class="chk">
                                <input type="checkbox" id="ytdlp-embed-thumb" />
                                <span>Cover-Bild einbetten</span>
                            </label>
                            <label class="chk">
                                <input type="checkbox" id="ytdlp-add-metadata" />
                                <span>Metadaten hinzufügen</span>
                            </label>
                            <label class="chk">
                                <input type="checkbox" id="ytdlp-subtitles" />
                                <span>Untertitel herunterladen</span>
                            </label>
                        </div>

                        <div class="row">
                            <label class="lbl">Generierter Befehl <span style="font-weight:400; color:var(--text-muted);">(wird live aktualisiert)</span></label>
                            <textarea id="ytdlp-output" rows="3" readonly placeholder="Befehl erscheint hier..."></textarea>
                        </div>

                        <div class="actions">
                            <button id="ytdlp-copy" type="button" class="btn btn-secondary">
                                <i class="fa-solid fa-copy"></i>
                                <span>In Zwischenablage kopieren</span>
                            </button>
                            <span id="ytdlp-copy-feedback" class="copy-feedback">
                                <i class="fa-solid fa-check"></i> Kopiert!
                            </span>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <style>
                        /* ---------- scoped yt-dlp generator styles (EN) ---------- */
                        .ytdlp-gen-en * { box-sizing: border-box; }
                        .ytdlp-gen-en {
                            background: var(--panel-color);
                            border: 1px solid var(--panel-border);
                            border-radius: 0.6rem;
                            padding: 1rem;
                            font-size: 0.72rem;
                            box-shadow: var(--control-shadow);
                        }
                        .ytdlp-gen-en .row { margin-bottom: 0.85rem; }
                        .ytdlp-gen-en .grid-2 {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 0.85rem;
                            margin-bottom: 0.85rem;
                        }
                        @media (max-width: 560px) {
                            .ytdlp-gen-en .grid-2 { grid-template-columns: 1fr; }
                        }
                        .ytdlp-gen-en label.lbl {
                            display: block;
                            font-weight: 700;
                            color: var(--text-color);
                            margin-bottom: 0.4rem;
                            font-size: 0.7rem;
                            letter-spacing: 0.01em;
                        }
                        .ytdlp-gen-en input[type="text"],
                        .ytdlp-gen-en select,
                        .ytdlp-gen-en textarea {
                            width: 100%;
                            padding: 0.65rem 0.9rem;
                            border: 1px solid var(--border-color);
                            border-radius: 0.45rem;
                            background: var(--bg-color);
                            color: var(--text-color);
                            font-size: 0.72rem;
                            font-family: inherit;
                            line-height: 1.35;
                            outline: none;
                            transition: border-color .15s, box-shadow .15s;
                        }
                        .ytdlp-gen-en input[type="text"]:focus,
                        .ytdlp-gen-en select:focus,
                        .ytdlp-gen-en textarea:focus {
                            border-color: var(--link-color);
                            box-shadow: 0 0 0 3px color-mix(in srgb, var(--link-color) 25%, transparent);
                        }
                        .ytdlp-gen-en select {
                            appearance: none;
                            -webkit-appearance: none;
                            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
                            background-repeat: no-repeat;
                            background-position: right 0.9rem center;
                            padding-right: 2.2rem;
                        }
                        .ytdlp-gen-en textarea {
                            min-height: 4rem;
                            font-family: 'Courier New', Menlo, monospace;
                            resize: vertical;
                        }
                        .ytdlp-gen-en .chk-row {
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;
                            gap: 0.5rem 1.5rem;
                            margin-bottom: 0.85rem;
                        }
                        .ytdlp-gen-en .chk {
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            font-weight: 600;
                            color: var(--text-color);
                            cursor: pointer;
                            user-select: none;
                            font-size: 0.72rem;
                            white-space: nowrap;
                        }
                        .ytdlp-gen-en .chk input[type="checkbox"] {
                            flex-shrink: 0;
                            width: 15px;
                            height: 15px;
                            margin: 0;
                            accent-color: var(--link-color);
                            cursor: pointer;
                        }
                        .ytdlp-gen-en .chk span { line-height: 1.3; }
                        .ytdlp-gen-en .btn {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            gap: 0.55rem;
                            padding: 0.7rem 1.25rem;
                            border-radius: 0.45rem;
                            font-weight: 800;
                            font-size: 0.72rem;
                            letter-spacing: 0.02em;
                            cursor: pointer;
                            user-select: none;
                            transition: transform .15s ease, box-shadow .15s ease, opacity .15s ease, background .15s ease;
                            border: 1px solid transparent;
                        }
                        .ytdlp-gen-en .btn:active { transform: translateY(1px); }
                        .ytdlp-gen-en .btn i { font-size: 0.78rem; }
                        .ytdlp-gen-en .btn-secondary {
                            background: var(--code-bg);
                            color: var(--text-color);
                            border-color: var(--border-color);
                        }
                        .ytdlp-gen-en .btn-secondary:hover {
                            background: color-mix(in srgb, var(--link-color) 12%, var(--code-bg));
                            border-color: var(--link-color);
                            transform: translateY(-1px);
                        }
                        .ytdlp-gen-en .actions {
                            display: flex;
                            align-items: center;
                            gap: 0.85rem;
                            flex-wrap: wrap;
                            margin-top: 0.3rem;
                        }
                        .ytdlp-gen-en .copy-feedback {
                            display: none;
                            align-items: center;
                            gap: 0.35rem;
                            font-size: 0.7rem;
                            font-weight: 700;
                            color: #10b981;
                        }
                        .ytdlp-gen-en .copy-feedback.show { display: inline-flex; }
                    </style>

                    <div id="ytdlp-generator-en" class="ytdlp-gen-en">
                        <div class="row">
                            <label class="lbl">YouTube URL / Video URL</label>
                            <input type="text" id="ytdlp-url-en" placeholder="https://www.youtube.com/watch?v=..." />
                        </div>

                        <div class="row">
                            <label class="lbl">Output Folder (optional)</label>
                            <input type="text" id="ytdlp-folder-en" placeholder="C:\Downloads\yt-dlp" />
                        </div>

                        <div class="grid-2">
                            <div>
                                <label class="lbl">Media Type</label>
                                <select id="ytdlp-type-en">
                                    <option value="video">Video (MP4)</option>
                                    <option value="audio">Audio</option>
                                </select>
                            </div>
                            <div>
                                <label class="lbl">Quality</label>
                                <select id="ytdlp-quality-en">
                                    <option value="best">Best available</option>
                                    <option value="1080">Max 1080p (Full HD)</option>
                                    <option value="720">Max 720p (HD)</option>
                                    <option value="480">Max 480p</option>
                                    <option value="worst">Lowest</option>
                                </select>
                            </div>
                        </div>

                        <div class="row" id="ytdlp-audio-options-en" style="display:none;">
                            <label class="lbl">Audio Format</label>
                            <select id="ytdlp-audio-format-en">
                                <option value="mp3">MP3</option>
                                <option value="m4a">M4A (AAC)</option>
                                <option value="flac">FLAC (lossless)</option>
                                <option value="opus">Opus</option>
                                <option value="wav">WAV</option>
                            </select>
                        </div>

                        <div class="chk-row">
                            <label class="chk">
                                <input type="checkbox" id="ytdlp-embed-thumb-en" />
                                <span>Embed cover image</span>
                            </label>
                            <label class="chk">
                                <input type="checkbox" id="ytdlp-add-metadata-en" />
                                <span>Add metadata</span>
                            </label>
                            <label class="chk">
                                <input type="checkbox" id="ytdlp-subtitles-en" />
                                <span>Download subtitles</span>
                            </label>
                        </div>

                        <div class="row">
                            <label class="lbl">Generated Command <span style="font-weight:400; color:var(--text-muted);">(updated live)</span></label>
                            <textarea id="ytdlp-output-en" rows="3" readonly placeholder="Command will appear here..."></textarea>
                        </div>

                        <div class="actions">
                            <button id="ytdlp-copy-en" type="button" class="btn btn-secondary">
                                <i class="fa-solid fa-copy"></i>
                                <span>Copy to Clipboard</span>
                            </button>
                            <span id="ytdlp-copy-feedback-en" class="copy-feedback">
                                <i class="fa-solid fa-check"></i> Copied!
                            </span>
                        </div>
                    </div>
                    `
                }
            ]
        },

        /* ============ TLDR ============ */
        {
            id: 'tldr-summary',
            titleDe: 'TLDR',
            titleEn: 'TLDR',
            introDe: 'Die wichtigsten yt-dlp-Mechaniken auf einen Blick.',
            introEn: 'The core yt-dlp mechanics at a glance.',
            subtopics: [
                {
                    id: 'tldr-grid',
                    titleDe: 'Auf einen Blick',
                    titleEn: 'At a Glance',
                    htmlDe: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-terminal opacity-70"></i>
                                <span>1. Grundbefehl</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <code>yt-dlp "URL"</code> lädt das beste kombinierte Format herunter. Für spezifische Formate <code>-f</code> und <code>-F</code> verwenden.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-film opacity-70"></i>
                                <span>2. Video + Audio</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <code>-f "bestvideo+bestaudio"</code> mit ffmpeg zum Zusammenfügen. <code>--merge-output-format mp4</code> für Kompatibilität.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-music opacity-70"></i>
                                <span>3. Audio-Extraktion</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <code>-x --audio-format mp3</code> extrahiert nur Audio. Erfordert ffmpeg. Qualität mit <code>--audio-quality 0</code> (best).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-cogs opacity-70"></i>
                                <span>4. ffmpeg nötig</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Für Audio-Konvertierung, Muxing, Metadaten und Untertitel muss ffmpeg im PATH sein. Mit <code>--verbose</code> prüfen.
                            </p>
                        </div>
                    </div>
                    `,
                    htmlEn: `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-terminal opacity-70"></i>
                                <span>1. Basic Command</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <code>yt-dlp "URL"</code> downloads the best combined format. Use <code>-f</code> and <code>-F</code> for specific formats.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-film opacity-70"></i>
                                <span>2. Video + Audio</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <code>-f "bestvideo+bestaudio"</code> with ffmpeg for merging. <code>--merge-output-format mp4</code> for compatibility.
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-music opacity-70"></i>
                                <span>3. Audio Extraction</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                <code>-x --audio-format mp3</code> extracts audio only. Requires ffmpeg. Quality via <code>--audio-quality 0</code> (best).
                            </p>
                        </div>
                        <div class="p-4 border border-[var(--panel-border)] rounded-lg bg-[var(--bg-color)] shadow-sm">
                            <div class="flex items-center gap-3 mb-3 font-semibold text-sm">
                                <i class="fa-solid fa-cogs opacity-70"></i>
                                <span>4. ffmpeg Required</span>
                            </div>
                            <p class="text-xs text-[var(--text-muted)] leading-relaxed">
                                Audio conversion, muxing, metadata, and subtitles need ffmpeg in PATH. Verify with <code>--verbose</code>.
                            </p>
                        </div>
                    </div>
                    `
                }
            ]
        }
    ],

    links: {
        titleDe: 'Referenzen & Downloads',
        titleEn: 'References & Downloads',
        items: [
            { icon: 'fa-github',        href: 'https://github.com/yt-dlp/yt-dlp', target: '_blank', labelDe: 'GitHub Repository', labelEn: 'GitHub Repository' },
            { icon: 'fa-download',      href: 'https://github.com/yt-dlp/yt-dlp/releases/latest', target: '_blank', labelDe: 'Neueste Releases', labelEn: 'Latest Releases' },
            { icon: 'fa-book',          href: 'https://github.com/yt-dlp/yt-dlp#readme', target: '_blank', labelDe: 'Offizielle README', labelEn: 'Official README' },
            { icon: 'fa-video',         href: 'https://www.gyan.dev/ffmpeg/builds/', target: '_blank', labelDe: 'ffmpeg Windows Builds', labelEn: 'ffmpeg Windows Builds' }
        ]
    },

    footer: {
        textDe: 'yt-dlp Referenz · v1.4 · Dual Lang',
        textEn: 'yt-dlp Reference · v1.4 · Dual Lang'
    }
});