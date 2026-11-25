(function () {
    'use strict';

    const App = window.App;
    if (!App) {
        console.error('[networkSimulator] window.App missing. Load state.js first.');
        return;
    }

    const STORAGE_KEY = 'epicspace.networkSimulator.v1';
    const DEVICE_TYPES = {
        pc: { mark: 'PC', labelDe: 'PC', labelEn: 'PC' },
        router: { mark: 'R', labelDe: 'Router', labelEn: 'Router' },
        switch: { mark: 'SW', labelDe: 'Switch', labelEn: 'Switch' },
        server: { mark: 'SRV', labelDe: 'Server', labelEn: 'Server' },
        firewall: { mark: 'FW', labelDe: 'Firewall', labelEn: 'Firewall' }
    };

    let colorSerial = 0;

    function nextUniqueColor(usedColors) {
        let color;
        do {
            const hue = ((colorSerial++ * 137.508) % 360).toFixed(3);
            color = `hsl(${hue} 78% 58%)`;
        } while (usedColors.has(color));
        return color;
    }

    function allColors() {
        return new Set([
            ...state.nodes.map(node => node.color),
            ...state.links.map(link => link.color)
        ]);
    }

    function ensureUniqueColors(topology) {
        const usedColors = new Set();
        let changed = false;
        [...topology.nodes, ...topology.links].forEach(item => {
            const validColor = typeof item.color === 'string' &&
                /^hsl\(\d{1,3}(?:\.\d{1,3})? \d{1,2}% \d{1,2}%\)$/.test(item.color);
            if (!validColor || usedColors.has(item.color)) {
                item.color = nextUniqueColor(usedColors);
                changed = true;
            }
            usedColors.add(item.color);
        });
        return changed;
    }

    function ensureDeviceConfig(node, legacy = false) {
        let changed = false;
        const prefix = node.ip.split('.').slice(0, 3).join('.');
        const defaults = {
            addressMode: 'static',
            subnetMask: '255.255.255.0',
            gateway: legacy && node.id === 'pc-1' ? '192.168.10.1' : '',
            dnsServer: legacy && ['pc-1', 'router-1'].includes(node.id) ? '192.168.20.10' : '',
            dhcpServerEnabled: legacy && node.id === 'router-1',
            dhcpPoolStart: `${prefix}.100`,
            dhcpPoolEnd: `${prefix}.199`,
            dnsServiceEnabled: legacy && node.id === 'server-1',
            dnsRecords: legacy && node.id === 'server-1' ? 'server.local=192.168.20.10' : ''
        };
        Object.entries(defaults).forEach(([key, fallback]) => {
            if (node[key] === undefined || node[key] === null) {
                node[key] = fallback;
                changed = true;
            }
        });
        if (!['static', 'dhcp'].includes(node.addressMode)) {
            node.addressMode = 'static';
            changed = true;
        }
        if (!validIpv4(node.subnetMask)) {
            node.subnetMask = '255.255.255.0';
            changed = true;
        }
        for (const key of ['gateway', 'dnsServer', 'dhcpPoolStart', 'dhcpPoolEnd']) {
            if (typeof node[key] !== 'string' || (node[key] && !validIpv4(node[key]))) {
                node[key] = defaults[key];
                changed = true;
            }
        }
        for (const key of ['dhcpServerEnabled', 'dnsServiceEnabled']) {
            if (typeof node[key] !== 'boolean') {
                node[key] = Boolean(defaults[key]);
                changed = true;
            }
        }
        if (typeof node.dnsRecords !== 'string') {
            node.dnsRecords = defaults.dnsRecords;
            changed = true;
        }
        return changed;
    }

    function exampleNetwork() {
        const network = {
            nodes: [
                { id: 'pc-1', type: 'pc', name: 'PC-1', ip: '192.168.10.10', x: 110, y: 280, color: 'hsl(198 88% 55%)' },
                { id: 'switch-1', type: 'switch', name: 'Switch-1', ip: '192.168.10.2', x: 330, y: 280, color: 'hsl(145 65% 48%)' },
                { id: 'router-1', type: 'router', name: 'Router-1', ip: '192.168.10.1', x: 550, y: 280, color: 'hsl(265 80% 65%)' },
                { id: 'switch-2', type: 'switch', name: 'Switch-2', ip: '192.168.20.2', x: 770, y: 280, color: 'hsl(40 90% 55%)' },
                { id: 'server-1', type: 'server', name: 'Server-1', ip: '192.168.20.10', x: 920, y: 280, color: 'hsl(350 85% 62%)' }
            ],
            links: [
                { from: 'pc-1', to: 'switch-1', color: 'hsl(185 75% 55%)' },
                { from: 'switch-1', to: 'router-1', color: 'hsl(95 70% 48%)' },
                { from: 'router-1', to: 'switch-2', color: 'hsl(225 75% 63%)' },
                { from: 'switch-2', to: 'server-1', color: 'hsl(315 75% 65%)' }
            ]
        };
        Object.assign(network.nodes[2], {
            dhcpServerEnabled: true,
            dhcpPoolStart: '192.168.10.100',
            dhcpPoolEnd: '192.168.10.199',
            dnsServer: '192.168.20.10'
        });
        Object.assign(network.nodes[4], {
            dnsServiceEnabled: true,
            dnsRecords: 'server.local=192.168.20.10\ngateway.local=192.168.10.1'
        });
        network.nodes.forEach(node => ensureDeviceConfig(node));
        Object.assign(network.nodes[0], { gateway: '192.168.10.1', dnsServer: '192.168.20.10' });
        return network;
    }

    const state = {
        ...exampleNetwork(),
        selectedId: null,
        connectFrom: null,
        connecting: false,
        route: [],
        drag: null,
        suppressClick: false,
        packetAnimationFrame: null,
        consoleHistory: Object.create(null)
    };

    const isGerman = () => App.state && App.state.isGerman;
    const text = (de, en) => isGerman() ? de : en;
    const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);

    function setStatus(message, isError = false) {
        const status = document.getElementById('networkStatus');
        if (!status) return;
        status.textContent = message;
        status.classList.toggle('error', isError);
    }

    function renderConsole() {
        const output = document.getElementById('networkConsoleOutput');
        if (!output) return;
        const node = nodeById(state.selectedId);
        if (!node) {
            output.textContent = text('Wähle ein Gerät aus, um die Konsole zu verwenden.', 'Select a device to use its console.');
            return;
        }
        const lines = state.consoleHistory[node.id] || [
            `${node.name} (${node.ip})`,
            text('Befehl „help“ zeigt verfügbare Befehle.', 'Type "help" to see available commands.')
        ];
        output.textContent = lines.join('\n');
        output.scrollTop = output.scrollHeight;
    }

    function appendConsole(nodeId, line) {
        const lines = state.consoleHistory[nodeId] || (state.consoleHistory[nodeId] = []);
        lines.push(line);
        if (lines.length > 80) lines.splice(0, lines.length - 80);
        if (nodeId === state.selectedId) renderConsole();
    }

    function persist() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                nodes: state.nodes,
                links: state.links
            }));
        } catch (error) {
            console.warn('[networkSimulator] Could not save topology:', error);
            setStatus(text('Topologie konnte nicht gespeichert werden.', 'Could not save the topology.'), true);
        }
    }

    function validTopology(data) {
        if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.links)) return false;
        const ids = new Set();
        for (const node of data.nodes) {
            if (!node || typeof node.id !== 'string' || ids.has(node.id) ||
                !DEVICE_TYPES[node.type] || typeof node.name !== 'string' ||
                !validIpv4(node.ip) || !Number.isFinite(node.x) ||
                !Number.isFinite(node.y)) return false;
            ids.add(node.id);
        }
        return data.links.every(link =>
            link && ids.has(link.from) && ids.has(link.to) && link.from !== link.to
        );
    }

    function restore() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return;
            const parsed = JSON.parse(stored);
            if (!validTopology(parsed)) throw new Error('Stored topology has an invalid shape');
            const colorsChanged = ensureUniqueColors(parsed);
            const configChanged = parsed.nodes.reduce((changed, node) =>
                ensureDeviceConfig(node, true) || changed, false);
            state.nodes = parsed.nodes;
            state.links = parsed.links;
            if (colorsChanged || configChanged) persist();
        } catch (error) {
            console.warn('[networkSimulator] Could not restore topology:', error);
            setStatus(text('Gespeicherte Topologie war ungültig; Beispiel geladen.', 'Saved topology was invalid; loaded the example.'), true);
        }
    }

    function nodeById(id) {
        return state.nodes.find(node => node.id === id);
    }

    function renderTopology() {
        const svg = document.getElementById('networkTopology');
        if (!svg) return;
        if (state.packetAnimationFrame !== null) {
            cancelAnimationFrame(state.packetAnimationFrame);
            state.packetAnimationFrame = null;
        }
        const links = state.links.map(link => {
            const from = nodeById(link.from);
            const to = nodeById(link.to);
            if (!from || !to) return '';
            const active = state.route.some((id, index) =>
                index < state.route.length - 1 &&
                ((state.route[index] === link.from && state.route[index + 1] === link.to) ||
                    (state.route[index] === link.to && state.route[index + 1] === link.from))
            );
            return `<line class="network-link${active ? ' active' : ''}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="${escapeHtml(link.color)}"></line>`;
        }).join('');

        const nodes = state.nodes.map(node => {
            const type = DEVICE_TYPES[node.type];
            const selected = node.id === state.selectedId;
            const connecting = node.id === state.connectFrom;
            return `<g class="network-device-node${selected ? ' selected' : ''}${connecting ? ' connecting' : ''}"
                    data-node-id="${escapeHtml(node.id)}" tabindex="0" role="button"
                    aria-label="${escapeHtml(`${node.name}, ${type.labelEn}, ${node.ip}`)}"
                    style="--device-color:${escapeHtml(node.color)}">
                <circle cx="${node.x}" cy="${node.y}" r="29"></circle>
                <text class="network-node-mark" x="${node.x}" y="${node.y + 5}">${type.mark}</text>
                <text class="network-node-name" x="${node.x}" y="${node.y + 52}">${escapeHtml(node.name)}</text>
                <text class="network-node-ip" x="${node.x}" y="${node.y + 69}">${escapeHtml(node.ip)}</text>
            </g>`;
        }).join('');
        const routeNodes = state.route.map(nodeById).filter(Boolean);
        const packet = routeNodes.length > 1
            ? `<circle class="network-packet" cx="${routeNodes[0].x}" cy="${routeNodes[0].y}" r="7"></circle>`
            : '';
        svg.innerHTML = `${links}${nodes}${packet}`;
        if (routeNodes.length > 1) animatePacket(svg, routeNodes);

        const count = document.getElementById('networkDeviceCount');
        if (count) count.textContent = `${state.nodes.length} ${text('Geräte', 'devices')} · ${state.links.length} ${text('Verbindungen', 'links')}`;
        renderDeviceConfig();
        renderConsole();
        renderEndpointSelects();
        renderHops();
        updateConnectHint();
    }

    function animatePacket(svg, routeNodes) {
        const packet = svg.querySelector('.network-packet');
        if (!packet || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;

        const segments = routeNodes.slice(1).map((node, index) => {
            const from = routeNodes[index];
            const distance = Math.hypot(node.x - from.x, node.y - from.y);
            return { from, to: node, distance };
        }).filter(segment => segment.distance > 0);
        const totalDistance = segments.reduce((sum, segment) => sum + segment.distance, 0);
        if (!totalDistance) return;
        const duration = Math.max(1800, routeNodes.length * 600);
        const startedAt = performance.now();

        function step(now) {
            const progress = ((now - startedAt) % duration) / duration;
            let distance = totalDistance * progress;
            let segment = segments[segments.length - 1];
            for (const candidate of segments) {
                if (distance <= candidate.distance) {
                    segment = candidate;
                    break;
                }
                distance -= candidate.distance;
            }
            const fraction = Math.min(1, distance / segment.distance);
            packet.setAttribute('cx', (segment.from.x + (segment.to.x - segment.from.x) * fraction).toFixed(2));
            packet.setAttribute('cy', (segment.from.y + (segment.to.y - segment.from.y) * fraction).toFixed(2));
            state.packetAnimationFrame = requestAnimationFrame(step);
        }

        state.packetAnimationFrame = requestAnimationFrame(step);
    }

    function renderDeviceConfig() {
        const container = document.getElementById('networkDeviceConfig');
        if (!container) return;
        const node = nodeById(state.selectedId);
        if (!node) {
            container.innerHTML = `<span class="network-muted">${text('Wähle ein Gerät in der Topologie aus.', 'Select a device in the topology.')}</span>`;
            return;
        }
        const type = DEVICE_TYPES[node.type];
        const supportsServices = ['router', 'server'].includes(node.type);
        const serviceConfig = supportsServices ? `
            <div class="network-service-config">
                <label class="network-check-label">
                    <input id="networkDhcpEnabled" type="checkbox" ${node.dhcpServerEnabled ? 'checked' : ''}>
                    <span>${text('DHCP-Server aktiv', 'Enable DHCP server')}</span>
                </label>
                <div class="network-inline-fields">
                    <label><span>${text('DHCP-Pool Start', 'DHCP pool start')}</span><input id="networkDhcpPoolStart" value="${escapeHtml(node.dhcpPoolStart)}"></label>
                    <label><span>${text('DHCP-Pool Ende', 'DHCP pool end')}</span><input id="networkDhcpPoolEnd" value="${escapeHtml(node.dhcpPoolEnd)}"></label>
                </div>
                <label class="network-check-label">
                    <input id="networkDnsEnabled" type="checkbox" ${node.dnsServiceEnabled ? 'checked' : ''}>
                    <span>${text('DNS-Server aktiv', 'Enable DNS server')}</span>
                </label>
                <label><span>${text('DNS-Einträge (Name=IPv4, je Zeile)', 'DNS records (name=IPv4, one per line)')}</span>
                    <textarea id="networkDnsRecords" rows="2">${escapeHtml(node.dnsRecords)}</textarea>
                </label>
            </div>` : '';
        container.innerHTML = `
            <div class="network-basic-config">
                <label><span>${text('Gerät', 'Device')}</span><input id="networkEditName" maxlength="32" value="${escapeHtml(node.name)}"></label>
                <label><span>${text('Adressmodus', 'Address mode')}</span>
                    <select id="networkAddressMode" onchange="document.getElementById('networkEditIp').disabled=this.value==='dhcp'">
                        <option value="static" ${node.addressMode === 'static' ? 'selected' : ''}>${text('Statisch', 'Static')}</option>
                        <option value="dhcp" ${node.addressMode === 'dhcp' ? 'selected' : ''}>DHCP</option>
                    </select>
                </label>
                <label><span>IPv4</span><input id="networkEditIp" inputmode="decimal" maxlength="15" value="${escapeHtml(node.ip)}" ${node.addressMode === 'dhcp' ? 'disabled' : ''}></label>
                <label><span>${text('Subnetzmaske', 'Subnet mask')}</span><input id="networkSubnetMask" inputmode="decimal" maxlength="15" value="${escapeHtml(node.subnetMask)}"></label>
                <label><span>${text('Standardgateway', 'Default gateway')}</span><input id="networkGateway" inputmode="decimal" maxlength="15" value="${escapeHtml(node.gateway)}"></label>
                <label><span>DNS server</span><input id="networkDnsServer" inputmode="decimal" maxlength="15" value="${escapeHtml(node.dnsServer)}"></label>
                <span class="network-muted">${text(type.labelDe, type.labelEn)}</span>
            </div>
            ${serviceConfig}
            <button type="button" class="network-action-btn network-save-btn" onclick="App.networkSimulator.saveDevice()"><i class="fa-solid fa-floppy-disk"></i> ${text('Änderungen speichern', 'Save changes')}</button>
            <button type="button" class="network-action-btn" onclick="App.networkSimulator.requestDhcpLease()"><i class="fa-solid fa-wifi"></i> ${text('DHCP-Lease anfordern', 'Request DHCP lease')}</button>
            <button type="button" class="network-action-btn network-remove-btn" onclick="App.networkSimulator.removeDevice()"><i class="fa-solid fa-trash"></i> ${text('Gerät entfernen', 'Remove device')}</button>`;
    }

    function renderEndpointSelects() {
        ['networkSource', 'networkDestination'].forEach(id => {
            const select = document.getElementById(id);
            if (!select) return;
            const previous = select.value;
            const previousExists = state.nodes.some(node => node.id === previous);
            select.innerHTML = state.nodes.map(node =>
                `<option value="${escapeHtml(node.id)}">${escapeHtml(node.name)} · ${escapeHtml(node.ip)}</option>`
            ).join('');
            if (previousExists) {
                select.value = previous;
            } else if (state.nodes.length) {
                select.value = id === 'networkSource'
                    ? state.nodes[0].id
                    : state.nodes[state.nodes.length - 1].id;
            }
        });
        const source = document.getElementById('networkSource');
        const destination = document.getElementById('networkDestination');
        if (source && state.nodes.length > 1 && source.value === destination?.value) {
            destination.value = state.nodes.find(node => node.id !== source.value)?.id || '';
        }
    }

    function renderHops() {
        const container = document.getElementById('networkHops');
        if (!container) return;
        if (!state.route.length) {
            container.innerHTML = `<span class="network-muted">${text('Noch keine Simulation ausgeführt.', 'No simulation has been run yet.')}</span>`;
            return;
        }
        container.innerHTML = state.route.map((id, index) => {
            const node = nodeById(id);
            if (!node) return '';
            return `<div class="network-hop"><span class="network-hop-index">${index + 1}</span>
                <span class="network-hop-name">${escapeHtml(node.name)}</span>
                <span class="network-hop-ip">${escapeHtml(node.ip)}</span></div>`;
        }).join('');
    }

    function updateConnectHint() {
        const hint = document.getElementById('networkConnectHint');
        const button = document.getElementById('networkConnectBtn');
        if (hint) {
            hint.textContent = state.connectFrom
                ? text('Jetzt das zweite Gerät auswählen.', 'Select the second device.')
                : state.connecting
                    ? text('Zwei Geräte zum Verbinden auswählen.', 'Select two devices to connect.')
                    : '';
        }
        if (button) button.classList.toggle('active', Boolean(state.connecting));
    }

    function open() {
        restore();
        renderTopology();
        const modal = document.getElementById('networkSimulatorModal');
        if (modal) modal.classList.add('open');
    }

    function close() {
        const modal = document.getElementById('networkSimulatorModal');
        if (modal) modal.classList.remove('open');
        if (state.packetAnimationFrame !== null) {
            cancelAnimationFrame(state.packetAnimationFrame);
            state.packetAnimationFrame = null;
        }
    }

    function addDevice() {
        const select = document.getElementById('networkDeviceType');
        const type = select ? select.value : 'pc';
        if (!DEVICE_TYPES[type]) return;

        let suffix = 1;
        let name = `${DEVICE_TYPES[type].labelEn}-${suffix}`;
        while (state.nodes.some(node => node.name === name)) {
            name = `${DEVICE_TYPES[type].labelEn}-${++suffix}`;
        }
        const usedIps = new Set(state.nodes.map(node => node.ip));
        let host = 10;
        while (host <= 254 && usedIps.has(`192.168.30.${host}`)) host++;
        if (host > 254) {
            setStatus(text('Keine freie Beispiel-IP-Adresse mehr verfügbar.', 'No example IP addresses are available.'), true);
            return;
        }
        const ip = `192.168.30.${host}`;
        const angle = (state.nodes.length * 2.4) % (Math.PI * 2);
        const radius = Math.min(210, 80 + state.nodes.length * 16);
        const node = {
            id: `${type}-${Date.now()}-${state.nodes.length}`,
            type, name, ip,
            color: nextUniqueColor(allColors()),
            x: Math.round(500 + Math.cos(angle) * radius),
            y: Math.round(280 + Math.sin(angle) * radius)
        };
        ensureDeviceConfig(node);
        state.nodes.push(node);
        state.selectedId = node.id;
        state.route = [];
        persist();
        renderTopology();
        setStatus(text(`${name} hinzugefügt.`, `${name} added.`));
    }

    function toggleConnectMode() {
        state.connecting = !state.connecting;
        state.connectFrom = null;
        setStatus(state.connecting
            ? text('Wähle zwei Geräte in der Topologie aus.', 'Select two devices in the topology.')
            : text('Verbindungsmodus beendet.', 'Connection mode ended.'));
        renderTopology();
    }

    function selectNode(id) {
        if (state.connecting) {
            if (!state.connectFrom) {
                state.connectFrom = id;
                state.selectedId = id;
                setStatus(text('Erstes Gerät gewählt – jetzt das zweite auswählen.', 'First device selected — now select the second.'));
            } else if (state.connectFrom === id) {
                setStatus(text('Wähle ein anderes Gerät aus.', 'Select a different device.'), true);
            } else {
                const exists = state.links.some(link =>
                    (link.from === state.connectFrom && link.to === id) ||
                    (link.from === id && link.to === state.connectFrom)
                );
                if (exists) {
                    setStatus(text('Diese Geräte sind bereits verbunden.', 'These devices are already connected.'), true);
                } else {
                    state.links.push({ from: state.connectFrom, to: id, color: nextUniqueColor(allColors()) });
                    state.connecting = false;
                    state.connectFrom = null;
                    state.route = [];
                    persist();
                    setStatus(text('Verbindung hergestellt.', 'Connection created.'));
                }
            }
        } else {
            state.selectedId = id;
        }
        renderTopology();
    }

    function validIpv4(ip) {
        if (typeof ip !== 'string') return false;
        const parts = ip.split('.');
        return parts.length === 4 && parts.every(part =>
            /^\d{1,3}$/.test(part) && Number(part) >= 0 && Number(part) <= 255
        );
    }

    function ipv4ToNumber(ip) {
        return ip.split('.').reduce((value, part) => (value * 256 + Number(part)) >>> 0, 0);
    }

    function validSubnetMask(mask) {
        if (!validIpv4(mask)) return false;
        const value = ipv4ToNumber(mask);
        const inverted = (~value) >>> 0;
        return value !== 0 && ((inverted & (inverted + 1)) >>> 0) === 0;
    }

    function validDhcpPool(start, end) {
        if (!validIpv4(start) || !validIpv4(end)) return false;
        const startParts = start.split('.').map(Number);
        const endParts = end.split('.').map(Number);
        return startParts.slice(0, 3).join('.') === endParts.slice(0, 3).join('.') &&
            startParts[3] >= 2 && endParts[3] <= 254 &&
            ipv4ToNumber(start) <= ipv4ToNumber(end);
    }

    function parseDnsRecords(value) {
        const records = {};
        for (const rawLine of value.split(/\r?\n/)) {
            const line = rawLine.trim();
            if (!line) continue;
            const separator = line.indexOf('=');
            if (separator < 1 || line.indexOf('=', separator + 1) !== -1) {
                return { records: null, error: text('DNS-Einträge müssen das Format Name=IPv4 haben.', 'DNS records must use the Name=IPv4 format.') };
            }
            const hostname = line.slice(0, separator).trim().toLowerCase();
            const address = line.slice(separator + 1).trim();
            const validHostname = hostname.split('.').every(label =>
                /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label)
            );
            if (!validHostname || !validIpv4(address)) {
                return { records: null, error: text('Ungültiger DNS-Name oder IPv4-Eintrag.', 'Invalid DNS name or IPv4 record.') };
            }
            if (Object.prototype.hasOwnProperty.call(records, hostname)) {
                return { records: null, error: text(`Doppelter DNS-Name: ${hostname}`, `Duplicate DNS name: ${hostname}`) };
            }
            records[hostname] = address;
        }
        return { records, error: null };
    }

    function saveDevice() {
        const node = nodeById(state.selectedId);
        const nameInput = document.getElementById('networkEditName');
        const ipInput = document.getElementById('networkEditIp');
        const modeInput = document.getElementById('networkAddressMode');
        const maskInput = document.getElementById('networkSubnetMask');
        const gatewayInput = document.getElementById('networkGateway');
        const dnsInput = document.getElementById('networkDnsServer');
        if (!node || !nameInput || !ipInput || !modeInput || !maskInput || !gatewayInput || !dnsInput) return;
        const name = nameInput.value.trim();
        const ip = ipInput.value.trim();
        const mode = modeInput.value;
        const subnetMask = maskInput.value.trim();
        const gateway = gatewayInput.value.trim();
        const dnsServer = dnsInput.value.trim();
        if (!name || !['static', 'dhcp'].includes(mode) ||
            (mode === 'static' && !validIpv4(ip)) ||
            !validSubnetMask(subnetMask) ||
            (gateway && !validIpv4(gateway)) ||
            (dnsServer && !validIpv4(dnsServer))) {
            setStatus(text('Prüfe Gerätename, Adressmodus, IPv4, Subnetzmaske, Gateway und DNS-Adresse.', 'Check the device name, address mode, IPv4, subnet mask, gateway, and DNS address.'), true);
            return;
        }
        if (mode === 'static' && state.nodes.some(other => other.id !== node.id && other.ip === ip)) {
            setStatus(text('Diese IPv4-Adresse wird bereits verwendet.', 'That IPv4 address is already in use.'), true);
            return;
        }
        const supportsServices = ['router', 'server'].includes(node.type);
        const dhcpServerEnabled = supportsServices && document.getElementById('networkDhcpEnabled')?.checked;
        const dhcpPoolStart = document.getElementById('networkDhcpPoolStart')?.value.trim() || node.dhcpPoolStart;
        const dhcpPoolEnd = document.getElementById('networkDhcpPoolEnd')?.value.trim() || node.dhcpPoolEnd;
        const dnsServiceEnabled = supportsServices && document.getElementById('networkDnsEnabled')?.checked;
        const dnsRecords = document.getElementById('networkDnsRecords')?.value || node.dnsRecords;
        if (dhcpServerEnabled && !validDhcpPool(dhcpPoolStart, dhcpPoolEnd)) {
            setStatus(text('Der DHCP-Pool muss ein gültiger IPv4-Bereich in einem /24-Netz sein.', 'The DHCP pool must be a valid IPv4 range within one /24 subnet.'), true);
            return;
        }
        if (dnsServiceEnabled) {
            const parsedRecords = parseDnsRecords(dnsRecords);
            if (parsedRecords.error) {
                setStatus(parsedRecords.error, true);
                return;
            }
        }
        node.name = name;
        node.addressMode = mode;
        if (mode === 'static') node.ip = ip;
        node.subnetMask = subnetMask;
        node.gateway = gateway;
        node.dnsServer = dnsServer;
        node.dhcpServerEnabled = Boolean(dhcpServerEnabled);
        node.dhcpPoolStart = dhcpPoolStart;
        node.dhcpPoolEnd = dhcpPoolEnd;
        node.dnsServiceEnabled = Boolean(dnsServiceEnabled);
        node.dnsRecords = dnsRecords;
        persist();
        renderTopology();
        setStatus(mode === 'dhcp'
            ? text('Konfiguration gespeichert. Fordere eine DHCP-Lease an, um die Adresse zu beziehen.', 'Configuration saved. Request a DHCP lease to obtain an address.')
            : text('Gerätekonfiguration gespeichert.', 'Device configuration saved.'));
    }

    function removeDevice() {
        const node = nodeById(state.selectedId);
        if (!node) return;
        state.nodes = state.nodes.filter(item => item.id !== node.id);
        state.links = state.links.filter(link => link.from !== node.id && link.to !== node.id);
        delete state.consoleHistory[node.id];
        state.selectedId = null;
        state.route = [];
        persist();
        renderTopology();
        setStatus(text(`${node.name} und zugehörige Verbindungen entfernt.`, `${node.name} and its links removed.`));
    }

    function numberToIpv4(value) {
        return [
            (value >>> 24) & 255,
            (value >>> 16) & 255,
            (value >>> 8) & 255,
            value & 255
        ].join('.');
    }

    function acquireDhcpLease(client) {
        const servers = state.nodes.filter(server =>
            server.id !== client.id &&
            server.dhcpServerEnabled &&
            ['router', 'server'].includes(server.type) &&
            shortestRoute(client.id, server.id)
        );
        if (!servers.length) {
            return { ok: false, message: text('Kein erreichbarer DHCP-Server aktiv.', 'No reachable DHCP server is enabled.') };
        }

        const usedAddresses = new Set(state.nodes.filter(node => node.id !== client.id).map(node => node.ip));
        for (const server of servers) {
            if (!validDhcpPool(server.dhcpPoolStart, server.dhcpPoolEnd)) continue;
            const start = ipv4ToNumber(server.dhcpPoolStart);
            const end = ipv4ToNumber(server.dhcpPoolEnd);
            for (let address = start; address <= end; address++) {
                const ip = numberToIpv4(address);
                if (usedAddresses.has(ip)) continue;
                client.addressMode = 'dhcp';
                client.ip = ip;
                client.subnetMask = server.subnetMask;
                client.gateway = server.gateway || server.ip;
                client.dnsServer = server.dnsServer || (server.dnsServiceEnabled ? server.ip : '');
                return {
                    ok: true,
                    message: text(
                        `Lease erhalten: ${ip} von ${server.name}; Gateway ${client.gateway || '—'}, DNS ${client.dnsServer || '—'}.`,
                        `Lease acquired: ${ip} from ${server.name}; gateway ${client.gateway || '—'}, DNS ${client.dnsServer || '—'}.`
                    )
                };
            }
        }
        return { ok: false, message: text('Alle Adressen in den erreichbaren DHCP-Pools sind vergeben.', 'All addresses in reachable DHCP pools are already in use.') };
    }

    function requestDhcpLease() {
        const client = nodeById(state.selectedId);
        if (!client) {
            setStatus(text('Wähle zuerst ein Gerät aus.', 'Select a device first.'), true);
            return;
        }
        const result = acquireDhcpLease(client);
        if (result.ok) {
            state.route = [];
            persist();
            renderTopology();
        }
        setStatus(result.message, !result.ok);
        appendConsole(client.id, result.message);
    }

    function resolveDns(client, hostname) {
        const dnsNode = state.nodes.find(node =>
            node.ip === client.dnsServer && node.dnsServiceEnabled
        );
        if (!dnsNode) {
            return { error: text('Konfigurierter DNS-Server nicht gefunden oder Dienst deaktiviert.', 'Configured DNS server not found or service disabled.') };
        }
        if (!shortestRoute(client.id, dnsNode.id)) {
            return { error: text(`DNS-Server ${dnsNode.ip} ist nicht erreichbar.`, `DNS server ${dnsNode.ip} is unreachable.`) };
        }
        const parsed = parseDnsRecords(dnsNode.dnsRecords);
        if (parsed.error) return { error: parsed.error };
        const ip = parsed.records[hostname.toLowerCase()];
        return ip
            ? { ip, server: dnsNode }
            : { error: text(`Kein DNS-Eintrag für ${hostname}.`, `No DNS record for ${hostname}.`) };
    }

    function consolePath(client, destinationIp, kind) {
        const destination = state.nodes.find(node => node.ip === destinationIp);
        if (!destination) {
            const message = text(`Kein Gerät mit IPv4 ${destinationIp} gefunden.`, `No device found with IPv4 ${destinationIp}.`);
            setStatus(message, true);
            return { ok: false, message };
        }
        const route = shortestRoute(client.id, destination.id);
        if (!route) {
            state.route = [];
            renderTopology();
            const message = text(`Kein Pfad zu ${destination.name}.`, `No route to ${destination.name}.`);
            setStatus(message, true);
            return { ok: false, message };
        }
        state.route = route;
        renderTopology();
        setStatus(text(
            `${kind === 'ping' ? 'Ping' : 'Traceroute'}: ${client.name} → ${destination.name} (${route.length} Geräte).`,
            `${kind === 'ping' ? 'Ping' : 'Traceroute'}: ${client.name} → ${destination.name} (${route.length} devices).`
        ));
        return {
            ok: true,
            message: kind === 'ping'
                ? text(`Antwort von ${destination.ip}: ${Math.max(1, (route.length - 1) * 2 + 1)} ms`, `Reply from ${destination.ip}: ${Math.max(1, (route.length - 1) * 2 + 1)} ms`)
                : route.map((id, index) => {
                    const hop = nodeById(id);
                    return `${index + 1}  ${hop.name}  ${hop.ip}`;
                }).join('\n')
        };
    }

    function runConsoleCommand(node, command) {
        const parts = command.trim().split(/\s+/);
        const action = parts[0].toLowerCase();
        const argument = (parts[1] || '').toLowerCase();
        const currentIpConfig = () => [
            `IPv4: ${node.ip} (${node.addressMode.toUpperCase()})`,
            `Subnet mask: ${node.subnetMask}`,
            `Default gateway: ${node.gateway || '—'}`,
            `DNS server: ${node.dnsServer || '—'}`
        ].join('\n');

        if (action === 'help') {
            return 'help | show ip | show config | ipconfig | set ip <IPv4> [mask] [gateway] | set dns <IPv4|none> | dhcp request | dhcp-server on|off | dns-server on|off | nslookup <name> | ping <IPv4|name> | traceroute <IPv4|name> | clear';
        }
        if (action === 'clear') {
            state.consoleHistory[node.id] = [];
            renderConsole();
            return '';
        }
        if (action === 'ipconfig' || (action === 'show' && argument === 'ip')) return currentIpConfig();
        if (action === 'show' && argument === 'config') {
            return [
                `hostname ${node.name}`,
                `ip address ${node.addressMode === 'dhcp' ? 'dhcp' : node.ip}`,
                `subnet mask ${node.subnetMask}`,
                `default gateway ${node.gateway || 'none'}`,
                `dns server ${node.dnsServer || 'none'}`,
                `dhcp server ${node.dhcpServerEnabled ? 'enabled' : 'disabled'}`,
                `dns service ${node.dnsServiceEnabled ? 'enabled' : 'disabled'}`
            ].join('\n');
        }
        if (action === 'dhcp' && argument === 'request') {
            const result = acquireDhcpLease(node);
            if (result.ok) {
                state.route = [];
                persist();
                renderTopology();
                setStatus(result.message);
            } else {
                setStatus(result.message, true);
            }
            return result.message;
        }
        if (action === 'dhcp-server' || action === 'dns-server') {
            if (!['router', 'server'].includes(node.type)) {
                return text('Dieser Gerätetyp kann den Dienst nicht bereitstellen.', 'This device type cannot host that service.');
            }
            if (!['on', 'off'].includes(argument)) return text('Verwende on oder off.', 'Use on or off.');
            if (action === 'dhcp-server' && argument === 'on' &&
                !validDhcpPool(node.dhcpPoolStart, node.dhcpPoolEnd)) {
                return text('DHCP-Pool ist ungültig. Passe den Pool in der Gerätekonfiguration an.', 'DHCP pool is invalid. Update it in device configuration.');
            }
            if (action === 'dns-server' && argument === 'on') {
                const parsed = parseDnsRecords(node.dnsRecords);
                if (parsed.error) return parsed.error;
            }
            const key = action === 'dhcp-server' ? 'dhcpServerEnabled' : 'dnsServiceEnabled';
            node[key] = argument === 'on';
            persist();
            renderTopology();
            return `${action} ${argument}`;
        }
        if (action === 'set' && argument === 'ip') {
            const ip = parts[2];
            const mask = parts[3] || node.subnetMask;
            const gateway = parts[4] || node.gateway;
            if (!validIpv4(ip) || !validSubnetMask(mask) || (gateway && !validIpv4(gateway))) {
                return text('Verwendung: set ip <IPv4> [Subnetzmaske] [Gateway]', 'Usage: set ip <IPv4> [subnet mask] [gateway]');
            }
            if (state.nodes.some(other => other.id !== node.id && other.ip === ip)) {
                return text('Diese IPv4-Adresse wird bereits verwendet.', 'That IPv4 address is already in use.');
            }
            Object.assign(node, { ip, subnetMask: mask, gateway, addressMode: 'static' });
            persist();
            renderTopology();
            return text(`Statische Adresse gesetzt: ${ip}.`, `Static address set: ${ip}.`);
        }
        if (action === 'set' && argument === 'dns') {
            if (!parts[2]) return text('Verwendung: set dns <IPv4|none>', 'Usage: set dns <IPv4|none>');
            const dnsServer = parts[2]?.toLowerCase() === 'none' ? '' : parts[2];
            if (dnsServer && !validIpv4(dnsServer)) return text('Verwendung: set dns <IPv4|none>', 'Usage: set dns <IPv4|none>');
            node.dnsServer = dnsServer || '';
            persist();
            renderTopology();
            return text(`DNS-Server gesetzt: ${node.dnsServer || '—'}.`, `DNS server set: ${node.dnsServer || '—'}.`);
        }
        if (action === 'nslookup') {
            if (!parts[1]) return text('Verwendung: nslookup <Name>', 'Usage: nslookup <name>');
            const result = resolveDns(node, parts[1]);
            return result.error || `${parts[1]} → ${result.ip} (${result.server.name})`;
        }
        if (action === 'ping' || action === 'traceroute') {
            if (!parts[1]) return text(`Verwendung: ${action} <IPv4|Name>`, `Usage: ${action} <IPv4|name>`);
            const target = validIpv4(parts[1]) ? { ip: parts[1] } : resolveDns(node, parts[1]);
            if (target.error) return target.error;
            const result = consolePath(node, target.ip, action);
            return result.message;
        }
        return text(`Unbekannter Befehl: ${action}. Verwende help.`, `Unknown command: ${action}. Type help.`);
    }

    function executeConsole() {
        const input = document.getElementById('networkConsoleInput');
        const node = nodeById(state.selectedId);
        if (!input || !node) {
            setStatus(text('Wähle zuerst ein Gerät aus.', 'Select a device first.'), true);
            return;
        }
        const command = input.value.trim();
        if (!command) return;
        input.value = '';
        appendConsole(node.id, `> ${command}`);
        const result = runConsoleCommand(node, command);
        if (result) appendConsole(node.id, result);
        input.focus();
    }

    function shortestRoute(startId, endId) {
        if (!nodeById(startId) || !nodeById(endId)) return null;
        if (startId === endId) return [startId];
        const queue = [[startId]];
        const visited = new Set([startId]);
        while (queue.length) {
            const path = queue.shift();
            const last = path[path.length - 1];
            for (const link of state.links) {
                const next = link.from === last ? link.to : link.to === last ? link.from : null;
                if (!next || visited.has(next)) continue;
                const nextPath = [...path, next];
                if (next === endId) return nextPath;
                visited.add(next);
                queue.push(nextPath);
            }
        }
        return null;
    }

    function selectedEndpoints() {
        const source = document.getElementById('networkSource')?.value;
        const destination = document.getElementById('networkDestination')?.value;
        if (!source || !destination) {
            setStatus(text('Füge mindestens zwei Geräte hinzu.', 'Add at least two devices.'), true);
            return null;
        }
        if (source === destination) {
            setStatus(text('Quelle und Ziel müssen unterschiedlich sein.', 'Source and destination must be different.'), true);
            return null;
        }
        return { source, destination };
    }

    function simulate(kind) {
        const endpoints = selectedEndpoints();
        if (!endpoints) return;
        const route = shortestRoute(endpoints.source, endpoints.destination);
        if (!route) {
            state.route = [];
            renderTopology();
            setStatus(text('Kein Pfad gefunden – prüfe die Verbindungen zwischen den Geräten.', 'No route found — check the links between devices.'), true);
            return;
        }
        state.route = route;
        renderTopology();
        const source = nodeById(endpoints.source);
        const destination = nodeById(endpoints.destination);
        if (kind === 'ping') {
            const latency = Math.max(1, (route.length - 1) * 2 + 1);
            setStatus(text(
                `Antwort von ${destination.ip}: Zeit=${latency} ms, ${route.length - 1} Hop(s).`,
                `Reply from ${destination.ip}: time=${latency} ms, ${route.length - 1} hop(s).`
            ));
        } else {
            setStatus(text(
                `Traceroute von ${source.name} zu ${destination.name}: ${route.length} Geräte im Pfad.`,
                `Traceroute from ${source.name} to ${destination.name}: ${route.length} devices in path.`
            ));
        }
    }

    function ping() { simulate('ping'); }
    function trace() { simulate('trace'); }

    function reset() {
        Object.assign(state, exampleNetwork(), {
            selectedId: null, connectFrom: null, connecting: false, route: []
        });
        state.consoleHistory = Object.create(null);
        persist();
        renderTopology();
        setStatus(text('Beispieltopologie geladen.', 'Example topology loaded.'));
    }

    function eventPoint(event) {
        const svg = document.getElementById('networkTopology');
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(svg.getScreenCTM().inverse());
    }

    function bindTopologyEvents() {
        const svg = document.getElementById('networkTopology');
        if (!svg) return;
        svg.addEventListener('click', event => {
            if (state.suppressClick) {
                state.suppressClick = false;
                return;
            }
            const node = event.target.closest('[data-node-id]');
            if (node) selectNode(node.dataset.nodeId);
        });
        svg.addEventListener('keydown', event => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            const node = event.target.closest('[data-node-id]');
            if (!node) return;
            event.preventDefault();
            selectNode(node.dataset.nodeId);
        });
        svg.addEventListener('pointerdown', event => {
            const node = event.target.closest('[data-node-id]');
            if (!node || state.connecting || event.button !== 0) return;
            state.drag = { id: node.dataset.nodeId, startX: event.clientX, startY: event.clientY, moved: false };
            svg.setPointerCapture(event.pointerId);
        });
        svg.addEventListener('pointermove', event => {
            if (!state.drag) return;
            if (Math.hypot(event.clientX - state.drag.startX, event.clientY - state.drag.startY) > 4) state.drag.moved = true;
            if (!state.drag.moved) return;
            const point = eventPoint(event);
            const node = nodeById(state.drag.id);
            if (!node) return;
            node.x = Math.max(40, Math.min(960, Math.round(point.x)));
            node.y = Math.max(45, Math.min(475, Math.round(point.y)));
            renderTopology();
        });
        svg.addEventListener('pointerup', event => {
            if (!state.drag) return;
            const drag = state.drag;
            state.drag = null;
            if (drag.moved) {
                state.selectedId = drag.id;
                persist();
                state.suppressClick = true;
                renderTopology();
                setTimeout(() => { state.suppressClick = false; }, 0);
            } else {
                state.suppressClick = true;
                selectNode(drag.id);
                setTimeout(() => { state.suppressClick = false; }, 0);
            }
            if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
        });
        svg.addEventListener('pointercancel', () => { state.drag = null; });
    }

    function bindModalEvents() {
        const modal = document.getElementById('networkSimulatorModal');
        if (modal) modal.addEventListener('click', event => {
            if (event.target === modal) close();
        });
    }

    function initialize() {
        bindTopologyEvents();
        bindModalEvents();
    }

    App.networkSimulator = {
        open, close, addDevice, toggleConnectMode, saveDevice,
        removeDevice, requestDhcpLease, executeConsole, ping, trace, reset
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
})();
