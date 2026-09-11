window.NetSimPuzzles = [
    {
        id: 'basic_link',
        title: 'Level 1: Keine Verbindung',
        description: 'Zwei Computer in einem Büro können nicht miteinander kommunizieren. Verbinde sie mit dem zentralen Switch, damit sie Daten austauschen können.',
        hint: 'Mache einen Rechtsklick auf PC1, wähle "Verbinden" und klicke auf den Switch. Wiederhole dies für PC2.',
        setup: function(S, api) {
            // Dynamisch die Mitte des Canvas berechnen
            const canvas = document.getElementById('canvas');
            const cx = (canvas.clientWidth || 1000) / 2;
            const cy = (canvas.clientHeight || 700) / 2;
            
            // Geräte relativ zur Mitte platzieren
            api.addDevice('client', cx - 250, cy + 100, 'PC1', { ip: '192.168.1.10', subnet: '255.255.255.0' });
            api.addDevice('client', cx + 250, cy + 100, 'PC2', { ip: '192.168.1.11', subnet: '255.255.255.0' });
            api.addDevice('switch', cx, cy - 50, 'Switch1');
        },
        validate: function(S) {
            const pc1 = S.devices.find(d => d.name === 'PC1');
            const pc2 = S.devices.find(d => d.name === 'PC2');
            if(!pc1 || !pc2) return false;
            
            // Prüfe, ob ein Pfad (Links) von PC1 zu PC2 existiert
            const path = window.findPath(pc1.id, pc2.id);
            return path !== null && path.length > 0;
        },
        successMsg: 'Hervorragend! Die physische Verbindung (Layer 2) ist wiederhergestellt.'
    },
    {
        id: 'subnet_mismatch',
        title: 'Level 2: Falsches Subnetz',
        description: 'Ein wichtiger Unternehmensserver ist für PC1 nicht erreichbar. Beide Geräte sind physisch mit demselben Switch verbunden, liegen jedoch in verschiedenen IP-Netzwerken. Passe die statische IP von PC1 so an, dass sie im selben Subnetz wie der Server (10.0.0.x) liegt.',
        hint: 'Führe einen Doppelklick auf "PC1" aus (oder Rechtsklick -> Einstellungen). Ändere die IP-Adresse zu z.B. 10.0.0.5 und die Subnetzmaske zu 255.255.255.0.',
        setup: function(S, api) {
            const canvas = document.getElementById('canvas');
            const cx = (canvas.clientWidth || 1000) / 2;
            const cy = (canvas.clientHeight || 700) / 2;

            const sw = api.addDevice('switch', cx, cy, 'Core-SW');
            const srv = api.addDevice('server', cx + 200, cy, 'Server1', {
                dhcp: false, ip: '10.0.0.100', subnet: '255.255.255.0', gateway: '10.0.0.1'
            });
            const pc = api.addDevice('client', cx - 200, cy, 'PC1', {
                dhcp: false, ip: '192.168.1.5', subnet: '255.255.255.0', gateway: '192.168.1.1'
            });
            
            api.addLink(sw.id, srv.id);
            api.addLink(sw.id, pc.id);
        },
        validate: function(S) {
            const pc = S.devices.find(d => d.name === 'PC1');
            if(!pc || !pc.config) return false;
            
            // Prüfe, ob PC1 im 10.0.0.x Netz ist (und nicht aus Versehen die Server-IP nutzt)
            const correctSubnet = pc.config.ip.startsWith('10.0.0.');
            const distinctIp = pc.config.ip !== '10.0.0.100';
            const correctMask = pc.config.subnet === '255.255.255.0';
            
            return correctSubnet && distinctIp && correctMask;
        },
        successMsg: 'Klasse! Beide Geräte befinden sich nun im selben logischen Netzwerk und können kommunizieren.'
    },
    {
        id: 'dhcp_config',
        title: 'Level 3: Der DHCP-Ausfall',
        description: 'Ein neuer Laptop (Lap1) wurde ans Netzwerk angeschlossen, hat aber keine gültige IP-Adresse (0.0.0.0). Der Router ist glücklicherweise bereits als DHCP-Server konfiguriert. Stelle den Laptop so ein, dass er automatisch eine IP-Adresse vom Router bezieht.',
        hint: 'Öffne die Einstellungen von Lap1. Wähle den Modus "DHCP (Automatisch)" und klicke auf "IP via DHCP anfordern".',
        setup: function(S, api) {
            const canvas = document.getElementById('canvas');
            const cx = (canvas.clientWidth || 1000) / 2;
            const cy = (canvas.clientHeight || 700) / 2;

            const router = api.addDevice('router', cx, cy - 100, 'Router1', { 
                ip: '192.168.1.1', subnet: '255.255.255.0', 
                dhcpServer: true, dhcpStart: '192.168.1.20', dhcpEnd: '192.168.1.50' 
            });
            const lap = api.addDevice('laptop', cx, cy + 100, 'Lap1', { 
                dhcp: false, ip: '0.0.0.0', subnet: '0.0.0.0', gateway: '0.0.0.0'
            });
            
            api.addLink(router.id, lap.id);
        },
        validate: function(S) {
            const lap = S.devices.find(d => d.name === 'Lap1');
            if(!lap || !lap.config) return false;
            
            return lap.config.dhcp === true && lap.config.ip !== '0.0.0.0';
        },
        successMsg: 'Super! Der Laptop hat über das Netzwerk eine IP-Adresse vom Router erhalten (DORA-Prozess).'
    },
    {
        id: 'missing_gateway',
        title: 'Level 4: Fehlendes Gateway',
        description: 'PC1 kann nicht auf das Internet zugreifen. Er ist korrekt mit dem Router verbunden und hat die statische IP 192.168.1.10. Das Problem: PC1 weiß nicht, an welches Gerät er Pakete senden soll, die das lokale Netzwerk verlassen.',
        hint: 'Öffne die Einstellungen von PC1 und trage die IP-Adresse des Routers (192.168.1.1) als Standardgateway ein.',
        setup: function(S, api) {
            const canvas = document.getElementById('canvas');
            const cx = (canvas.clientWidth || 1000) / 2;
            const cy = (canvas.clientHeight || 700) / 2;
            
            const pc = api.addDevice('client', cx - 220, cy, 'PC1', { dhcp: false, ip: '192.168.1.10', subnet: '255.255.255.0', gateway: '0.0.0.0' });
            const router = api.addDevice('router', cx, cy, 'Router1', { ip: '192.168.1.1', subnet: '255.255.255.0', dhcpServer: true });
            const cloud = api.addDevice('cloud', cx + 220, cy, 'Internet');
            
            api.addLink(pc.id, router.id);
            api.addLink(router.id, cloud.id);
        },
        validate: function(S) {
            const pc = S.devices.find(d => d.name === 'PC1');
            return pc && pc.config && pc.config.gateway === '192.168.1.1';
        },
        successMsg: 'Perfekt! PC1 sendet nun alle externen Anfragen (Traffic nach außen) korrekt an den Router.'
    },
    {
        id: 'enable_dhcp_server',
        title: 'Level 5: Router Fehlkonfiguration',
        description: 'Zwei Laptops versuchen sich mit dem Netzwerk zu verbinden, erhalten aber keine IP-Adressen (stehen auf 0.0.0.0). Der DHCP-Dienst auf dem Router wurde versehentlich deaktiviert.',
        hint: 'Öffne die Einstellungen von Router1, aktiviere die Checkbox bei DHCP Server und speichere. Fordere danach über die Einstellungen von Lap1 und Lap2 neue IPs an.',
        setup: function(S, api) {
            const canvas = document.getElementById('canvas');
            const cx = (canvas.clientWidth || 1000) / 2;
            const cy = (canvas.clientHeight || 700) / 2;
            
            const router = api.addDevice('router', cx, cy - 100, 'Router1', { 
                ip: '10.10.10.1', subnet: '255.255.255.0', 
                dhcpServer: false, dhcpStart: '10.10.10.100', dhcpEnd: '10.10.10.200' 
            });
            const lap1 = api.addDevice('laptop', cx - 150, cy + 100, 'Lap1', { dhcp: true, ip: '0.0.0.0' });
            const lap2 = api.addDevice('laptop', cx + 150, cy + 100, 'Lap2', { dhcp: true, ip: '0.0.0.0' });
            
            api.addLink(router.id, lap1.id);
            api.addLink(router.id, lap2.id);
        },
        validate: function(S) {
            const router = S.devices.find(d => d.name === 'Router1');
            const lap1 = S.devices.find(d => d.name === 'Lap1');
            const lap2 = S.devices.find(d => d.name === 'Lap2');
            
            if(!router || !lap1 || !lap2) return false;
            
            return router.config.dhcpServer === true && lap1.config.ip !== '0.0.0.0' && lap2.config.ip !== '0.0.0.0';
        },
        successMsg: 'Wunderbar! Der Router verteilt nun wieder dynamisch IP-Adressen an die anfragenden Clients.'
    },
    {
        id: 'missing_switch',
        title: 'Level 6: Hardware fehlt',
        description: 'Drei Arbeitsplätze (PC1, PC2, PC3) wurden aufgebaut. Sie sollen alle im selben lokalen Netzwerk miteinander kommunizieren können, aber es fehlt ein zentraler Verteiler.',
        hint: 'Ziehe einen "Switch" aus der linken Leiste (unter Geräte) auf die freie Fläche. Verbinde danach den neuen Switch mit allen drei PCs.',
        setup: function(S, api) {
            const canvas = document.getElementById('canvas');
            const cx = (canvas.clientWidth || 1000) / 2;
            const cy = (canvas.clientHeight || 700) / 2;
            
            api.addDevice('client', cx - 250, cy + 100, 'PC1', { ip: '192.168.1.10', subnet: '255.255.255.0' });
            api.addDevice('client', cx, cy + 180, 'PC2', { ip: '192.168.1.11', subnet: '255.255.255.0' });
            api.addDevice('client', cx + 250, cy + 100, 'PC3', { ip: '192.168.1.12', subnet: '255.255.255.0' });
        },
        validate: function(S) {
            const pc1 = S.devices.find(d => d.name === 'PC1');
            const pc2 = S.devices.find(d => d.name === 'PC2');
            const pc3 = S.devices.find(d => d.name === 'PC3');
            const hasSwitch = S.devices.some(d => d.type === 'switch');
            
            if(!pc1 || !pc2 || !pc3 || !hasSwitch) return false;
            
            // Prüfen ob alle PCs miteinander vernetzt sind
            const path1_2 = window.findPath(pc1.id, pc2.id);
            const path2_3 = window.findPath(pc2.id, pc3.id);
            const path1_3 = window.findPath(pc1.id, pc3.id);
            
            return (path1_2 && path1_2.length > 0) && 
                   (path2_3 && path2_3.length > 0) && 
                   (path1_3 && path1_3.length > 0);
        },
        successMsg: 'Sehr gut! Der Switch dient als zentraler Knotenpunkt und leitet den Traffic auf Layer 2 zwischen allen verbundenen PCs weiter.'
    }
];