if (window.systemsRegistry) {
    window.systemsRegistry.Debian = {
        name: "Debian GNU/Linux",
        packageManager: "apt",
        isDebianFamily: true,
        vfs: {
            type: 'dir',
            description: 'Root directory of the Debian GNU/Linux virtual file system.',
            deDescription: 'Wurzelverzeichnis des Debian GNU/Linux virtuellen Dateisystems.',
            children: {
                'bin': { type: 'dir', description: 'Essential command binaries.', deDescription: 'Wesentliche Befehlsbinärdateien.', children: {} },
                'boot': { type: 'dir', description: 'Bootloader files.', deDescription: 'Bootloader-Dateien.', children: {} },
                'dev': { type: 'dir', description: 'Device files.', deDescription: 'Gerätedateien.', children: {} },
                'etc': {
                    type: 'dir',
                    description: 'System configuration files.',
                    deDescription: 'Systemkonfigurationsdateien.',
                    children: {
                        'debian_version': { type: 'file', description: 'Debian release version file.', deDescription: 'Debian-Release-Versionsdatei.', content: '12.5\n' },
                        'hostname': { type: 'file', description: 'System hostname configuration.', deDescription: 'System-Hostnamen-Konfiguration.', content: 'debian-machine\n' },
                        'passwd': { type: 'file', description: 'User account database.', deDescription: 'Benutzerkontendatenbank.', content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user,,,:/home/user:/bin/bash\n' }
                    }
                },
                'home': {
                    type: 'dir',
                    description: 'Home directories.',
                    deDescription: 'Home-Verzeichnisse.',
                    children: {
                        'user': {
                            type: 'dir',
                            description: 'User home directory.',
                            deDescription: 'Benutzer-Home-Verzeichnis.',
                            children: {
                                '.bashrc': { type: 'file', description: 'Bash shell initialization script.', deDescription: 'Bash-Shell-Initialisierungsskript.', content: '# ~/.bashrc: executed by bash(1) for non-login shells.\n' },
                                'Desktop': { type: 'dir', description: 'Desktop folder.', deDescription: 'Desktop-Ordner.', children: {} },
                                'Documents': { type: 'dir', description: 'Documents folder.', deDescription: 'Dokumente-Ordner.', children: {} },
                                'Downloads': { type: 'dir', description: 'Downloads folder.', deDescription: 'Downloads-Ordner.', children: {} }
                            }
                        }
                    }
                },
                'lib': { type: 'dir', description: 'System libraries.', deDescription: 'Systembibliotheken.', children: {} },
                'media': { type: 'dir', description: 'Removable media mount points.', deDescription: 'Wechseldatenträger-Einhängepunkte.', children: {} },
                'mnt': { type: 'dir', description: 'Temporary mount points.', deDescription: 'Temporäre Einhängepunkte.', children: {} },
                'opt': { type: 'dir', description: 'Optional addon packages.', deDescription: 'Optionale Zusatzpakete.', children: {} },
                'proc': { type: 'dir', description: 'Kernel and process info.', deDescription: 'Kernel- und Prozessinformationen.', children: {} },
                'root': { type: 'dir', description: 'Root user home directory.', deDescription: 'Root-Benutzer-Home-Verzeichnis.', children: {} },
                'run': { type: 'dir', description: 'Runtime data.', deDescription: 'Laufzeitdaten.', children: {} },
                'sbin': { type: 'dir', description: 'System administration binaries.', deDescription: 'Systemadministrations-Binärdateien.', children: {} },
                'srv': { type: 'dir', description: 'Service data.', deDescription: 'Dienstdaten.', children: {} },
                'sys': { type: 'dir', description: 'System virtual filesystem.', deDescription: 'Virtuelles Systemdateisystem.', children: {} },
                'tmp': { type: 'dir', description: 'Temporary files directory.', deDescription: 'Verzeichnis für temporäre Dateien.', children: {} },
                'usr': {
                    type: 'dir',
                    description: 'Secondary user hierarchy.',
                    deDescription: 'Sekundäre Benutzerhierarchie.',
                    children: {
                        'bin': { type: 'dir', description: 'User binaries.', deDescription: 'Benutzer-Binärdateien.', children: {} },
                        'lib': { type: 'dir', description: 'Libraries.', deDescription: 'Bibliotheken.', children: {} },
                        'share': { type: 'dir', description: 'Architecture-independent data.', deDescription: 'Architekturunabhängige Daten.', children: {} }
                    }
                },
                'var': {
                    type: 'dir',
                    description: 'Variable data files.',
                    deDescription: 'Variable Datendateien.',
                    children: {
                        'log': { type: 'dir', description: 'System logs.', deDescription: 'Systemprotokolle.', children: {} }
                    }
                }
            }
        }
    };
    if (typeof updateSystemMenuUI === 'function') {
        updateSystemMenuUI();
    }
}
