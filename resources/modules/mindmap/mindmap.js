/**
 * resources/modules/mindmap/mindmap.js
 * 
 * Content-based Knowledge Graph & Mindmap.
 * Reads repository files, extracts topics/headings, and builds a semantic
 * relation graph based on shared keywords in the file contents.
 */

window.App = window.App || {};

App.mindmap = (function() {
    let isInitialized = false;
    let rawData = null;
    let filteredData = null;
    let currentView = 'mindmap'; 
    let svg = null;
    let g = null;
    let zoom = null;
    let simulation = null;

    const REPO_OWNER = 'cmdrFRANKLY1';
    const REPO_NAME = 'Viona';
    const BRANCH = 'main';

    let searchQuery = '';
    let filterType = 'all';

    // Colors for different file types
    const EXT_COLORS = {
        'js': '#f1e05a',
        'json': '#292929',
        'html': '#e34c26',
        'css': '#563d7c',
        'md': '#083fa1',
        'default': '#8b949e'
    };

    function getFileColor(name) {
        const ext = name.split('.').pop().toLowerCase();
        return EXT_COLORS[ext] || EXT_COLORS.default;
    }

    // ------------------------------------------------------------------
    // 1. DATA FETCHING & KNOWLEDGE GRAPH GENERATION
    // ------------------------------------------------------------------
    async function fetchRepoTree() {
        const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;
        
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
            const data = await res.json();
            
            if (!data.tree) throw new Error('No tree data returned');
            
            return data.tree;
        } catch (err) {
            console.error('[Mindmap] Failed to fetch repo:', err);
            return [];
        }
    }

    async function buildKnowledgeGraph(flatList) {
        // Filter for text-based files that contain notes/content
        const textExts = ['.js', '.json', '.html', '.css', '.md', '.txt'];
        const filesToRead = flatList.filter(item => 
            item.type === 'blob' && textExts.some(ext => item.path.endsWith(ext))
        );

        // Limit to 30 files to prevent GitHub API rate limiting during parsing
        const filesToFetch = filesToRead.slice(0, 30);
        
        const nodes = [];
        const links = [];
        const nodeMap = {};
        const stopWords = new Set(['const', 'let', 'var', 'function', 'return', 'import', 'export', 'from', 'class', 'this', 'if', 'else', 'for', 'while', 'div', 'span', 'class=', 'http', 'https', 'www', 'com', 'org', 'html', 'body', 'head', 'true', 'false', 'null', 'undefined', 'typeof', 'window', 'document', 'the', 'and', 'that', 'this', 'with', 'from', 'they', 'will', 'would', 'there', 'their', 'what', 'about', 'which', 'when', 'make', 'like', 'time', 'just', 'know', 'take', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'than', 'then', 'look', 'only', 'come', 'over', 'think', 'also', 'back', 'after', 'work', 'first', 'well', 'even', 'want', 'because', 'these', 'give', 'most']);

        // Fetch content and extract keywords
        await Promise.all(filesToFetch.map(async (file) => {
            try {
                const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${file.path}`;
                const fileRes = await fetch(rawUrl);
                if (!fileRes.ok) return;
                const text = await fileRes.text();
                
                // Extract title (Markdown heading or filename)
                let title = file.path.split('/').pop();
                const headingMatch = text.match(/^#\s+(.+)$/m);
                if (headingMatch) {
                    title = headingMatch[1].trim();
                }

                // Extract meaningful words for relation logic
                const words = text.toLowerCase().match(/\b[a-z_]{4,}\b/g) || [];
                const counts = {};
                words.forEach(w => {
                    if (!stopWords.has(w)) counts[w] = (counts[w] || 0) + 1;
                });

                const topKeywords = Object.keys(counts)
                    .sort((a, b) => counts[b] - counts[a])
                    .slice(0, 8); // Keep top 8 keywords

                const node = {
                    id: file.path,
                    name: title,
                    originalFilename: file.path.split('/').pop(),
                    path: file.path,
                    type: file.type,
                    ext: file.path.split('.').pop().toLowerCase(),
                    keywords: topKeywords,
                    content: text
                };

                nodes.push(node);
                nodeMap[file.path] = node;
            } catch (e) {
                console.warn(`Could not fetch ${file.path}`, e);
            }
        }));

        // Build edges based on shared keywords
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const nodeA = nodes[i];
                const nodeB = nodes[j];
                
                const shared = nodeA.keywords.filter(k => nodeB.keywords.includes(k));
                if (shared.length > 0) {
                    links.push({
                        source: nodeA.id,
                        target: nodeB.id,
                        strength: shared.length,
                        keywords: shared
                    });
                }
            }
        }

        return { nodes, links };
    }

    // ------------------------------------------------------------------
    // 2. FILTERING LOGIC
    // ------------------------------------------------------------------
    function applyFilters(data) {
        if (!data) return null;

        const filteredNodes = data.nodes.filter(node => {
            const matchesSearch = searchQuery === '' || 
                node.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                node.originalFilename.toLowerCase().includes(searchQuery.toLowerCase());
            
            let matchesType = true;
            if (filterType !== 'all') {
                matchesType = node.originalFilename.toLowerCase().endsWith(filterType);
            }
            return matchesSearch && matchesType;
        });

        const validIds = new Set(filteredNodes.map(n => n.id));
        const filteredLinks = data.links.filter(link => 
            validIds.has(link.source) && validIds.has(link.target)
        );

        return { nodes: filteredNodes, links: filteredLinks };
    }

    // ------------------------------------------------------------------
    // 3. RENDERING LOGIC
    // ------------------------------------------------------------------
    function initView() {
        const container = document.getElementById('mindmap-container');
        if (!container) return;

        container.innerHTML = '';

        const width = container.clientWidth || 800;
        const height = container.clientHeight || 600;

        svg = d3.select('#mindmap-container')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', [0, 0, width, height])
            .style('background', 'var(--bg-color)');

        g = svg.append('g');

        zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);
    }

    function render() {
        if (!filteredData) return;
        
        g.selectAll('*').remove();
        if (simulation) simulation.stop();

        const width = svg.node().clientWidth;
        const height = svg.node().clientHeight;

        // Force-directed simulation for semantic layout
        simulation = d3.forceSimulation(filteredData.nodes)
            .force('link', d3.forceLink(filteredData.links).id(d => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-400))
            .force('center', d3.forceCenter(0, 0))
            .force('collide', d3.forceCollide().radius(40));

        // Draw Links
        const link = g.append('g')
            .selectAll('line')
            .data(filteredData.links)
            .join('line')
            .attr('stroke', 'var(--border-color)')
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', d => Math.min(1 + d.strength * 0.5, 5));

        // Draw Nodes
        const node = g.append('g')
            .selectAll('g')
            .data(filteredData.nodes)
            .join('g')
            .attr('class', 'node')
            .style('cursor', 'pointer')
            .on('click', (e, d) => {
                openPreview(d.id, d.name);
            })
            .on('mouseover', function(event, d) {
                // Highlight connections
                link.attr('stroke-opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.1)
                    .attr('stroke', l => (l.source.id === d.id || l.target.id === d.id) ? 'var(--link-color)' : 'var(--border-color)');
                d3.select(this).select('circle').attr('r', 22);
            })
            .on('mouseout', function(event, d) {
                link.attr('stroke-opacity', 0.4).attr('stroke', 'var(--border-color)');
                d3.select(this).select('circle').attr('r', 16);
            })
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        // Node Circle
        node.append('circle')
            .attr('r', 16)
            .attr('fill', d => getFileColor(d.originalFilename))
            .attr('stroke', 'var(--bg-color)')
            .attr('stroke-width', 3);

        // Node Icon (inside circle)
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.3em')
            .attr('font-family', '"Font Awesome 6 Free"')
            .attr('font-weight', '900')
            .attr('font-size', '14px')
            .attr('fill', 'var(--bg-color)')
            .text(d => d.ext === 'md' ? '\uf15c' : '\uf15b');

        // Node Text (Below Circle)
        node.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '2.5em')
            .attr('font-size', '10px')
            .attr('fill', 'var(--text-color)')
            .attr('font-family', "'Fira Code', monospace")
            .attr('pointer-events', 'none')
            .text(d => d.name.length > 20 ? d.name.substring(0, 18) + '...' : d.name);

        // Tick function to update positions
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Center automatically after a short delay to let simulation start
        setTimeout(() => {
            if (svg && zoom) {
                svg.call(zoom.transform, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.85));
            }
        }, 100);
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // ------------------------------------------------------------------
    // 4. FILE ACTIONS (DOWNLOAD & PREVIEW)
    // ------------------------------------------------------------------
    function downloadFile(path, name) {
        const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${path}`;
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function openPreview(path, name) {
        const modal = document.getElementById('mindmap-preview-modal');
        const title = document.getElementById('mindmap-preview-title');
        const content = document.getElementById('mindmap-preview-content');
        const downloadBtn = document.getElementById('mindmap-preview-download');
        
        if (!modal) return;

        title.textContent = name;
        downloadBtn.onclick = () => downloadFile(path, name);

        const node = filteredData.nodes.find(n => n.id === path);
        if (node && node.content) {
            const escaped = node.content
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            content.innerHTML = `<pre style="margin: 0; white-space: pre-wrap; word-wrap: break-word; font-family: 'Fira Code', monospace; font-size: 0.8rem; line-height: 1.5; color: var(--text-color);">${escaped}</pre>`;
            modal.style.display = 'flex';
        } else {
            content.innerHTML = `<div style="color: #ef4444;">Dateiinhalt nicht verfügbar.</div>`;
            modal.style.display = 'flex';
        }
    }

    function closePreview() {
        const modal = document.getElementById('mindmap-preview-modal');
        if (modal) modal.style.display = 'none';
    }

    // ------------------------------------------------------------------
    // 5. UI MANAGEMENT
    // ------------------------------------------------------------------
    function handleSearch(val) {
        searchQuery = val;
        filteredData = applyFilters(rawData);
        render();
    }

    function handleFilter(val) {
        filterType = val;
        filteredData = applyFilters(rawData);
        render();
    }

    function createViewDOM() {
        if (document.getElementById('mindmap-view')) return;

        const html = `
            <div id="mindmap-view" style="display: none; flex-direction: column; width: 100%; height: 100%; padding: 1rem; gap: 1rem; box-sizing: border-box; background: var(--bg-color);">
                
                <!-- TOOLBAR -->
                <div style="display: flex; gap: 1rem; align-items: center; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; padding: 0.5rem 1rem; box-shadow: var(--control-shadow); flex-shrink: 0; flex-wrap: wrap;">
                    
                    <div style="font-size: 0.85rem; font-weight: 700; color: var(--heading-color); letter-spacing: 0.05em; margin-right: 1rem;">
                        <i class="fa-solid fa-brain" style="margin-right: 0.5rem; opacity: 0.7;"></i> KNOWLEDGE GRAPH
                    </div>
                    
                    <div style="flex-grow: 1;"></div>

                    <!-- Search and Filter -->
                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                        <div style="position: relative; display: flex; align-items: center;">
                            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 0.5rem; color: var(--text-muted); font-size: 0.75rem;"></i>
                            <input type="text" placeholder="Search notes..." oninput="App.mindmap.handleSearch(this.value)" style="padding: 0.35rem 0.5rem 0.35rem 1.75rem; font-size: 0.75rem; border-radius: 0.35rem; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); width: 14rem; outline: none;">
                        </div>
                        <select onchange="App.mindmap.handleFilter(this.value)" style="padding: 0.35rem 0.5rem; font-size: 0.75rem; border-radius: 0.35rem; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); cursor: pointer; outline: none;">
                            <option value="all">All Notes</option>
                            <option value=".doc">Word (.doc)</option>
                            <option value=".docx">Word (.docx)</option>
                            <option value=".md">Markdown (.md)</option>
                            <option value=".pdf">PDF (.pdf)</option>
                            <option value=".ppt">PowerPoint (.ppt)</option>
                            <option value=".pptx">PowerPoint (.pptx)</option>
                            <option value=".xls">Excel (.xls)</option>
                            <option value=".xlsx">Excel (.xlsx)</option>
                            <option value=".txt">Text (.txt)</option>
                            <option value=".html">HTML (.html)</option>
                        </select>
                    </div>

                    <button onclick="App.mindmap.refresh()" style="background: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color); font-size: 0.75rem; font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 0.35rem; cursor: pointer; display: flex; align-items: center; gap: 0.35rem;">
                        <i class="fa-solid fa-rotate" style="color: var(--link-color);"></i>
                    </button>
                </div>

                <!-- CANVAS -->
                <div id="mindmap-container" style="flex: 1; background: var(--panel-color); border: 1px solid var(--panel-border); border-radius: 0.5rem; overflow: hidden; position: relative; box-shadow: var(--control-shadow);">
                    <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-style: italic; pointer-events: none;" id="mindmap-loading">Lade Notizen und analysiere Inhalte...</div>
                </div>
                
                <!-- PREVIEW MODAL -->
                <div id="mindmap-preview-modal" style="display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; align-items: center; justify-content: center; backdrop-filter: blur(2px);">
                    <div style="background: var(--panel-color); width: 80%; max-width: 900px; height: 80%; border-radius: 0.5rem; border: 1px solid var(--panel-border); display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
                            <div style="font-size: 0.85rem; font-weight: 700; color: var(--heading-color);" id="mindmap-preview-title">Notiz</div>
                            <div style="display: flex; gap: 0.5rem;">
                                <button id="mindmap-preview-download" style="background: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; cursor: pointer;"><i class="fa-solid fa-download"></i> Download</button>
                                <button onclick="App.mindmap.closePreview()" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 1rem;"><i class="fa-solid fa-xmark"></i></button>
                            </div>
                        </div>
                        <div style="flex: 1; overflow-y: auto; padding: 1rem; background: var(--bg-color);" id="mindmap-preview-content">
                            Lade...
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('main-content').insertAdjacentHTML('beforeend', html);
    }

    // ------------------------------------------------------------------
    // PUBLIC API
    // ------------------------------------------------------------------
    async function open() {
        createViewDOM();
        
        const homeView = document.getElementById('home-view');
        const docView = document.getElementById('doc-view');
        const sqlView = document.getElementById('sql-view');
        
        if (homeView) homeView.style.display = 'none';
        if (docView) docView.style.display = 'none';
        if (sqlView) sqlView.style.display = 'none';

        const view = document.getElementById('mindmap-view');
        if (view) {
            view.style.display = 'flex';
            
            if (typeof d3 === 'undefined') {
                await loadD3();
            }

            if (!isInitialized) {
                initView();
                isInitialized = true;
            }

            if (!rawData) {
                document.getElementById('mindmap-loading').style.display = 'flex';
                const tree = await fetchRepoTree();
                rawData = await buildKnowledgeGraph(tree);
                filteredData = applyFilters(rawData);
                document.getElementById('mindmap-loading').style.display = 'none';
            }

            render();
        }
    }

    function close() {
        const view = document.getElementById('mindmap-view');
        if (view) view.style.display = 'none';
        if (App.nav && typeof App.nav.openHome === 'function') {
            App.nav.openHome();
        }
    }

    async function refresh() {
        rawData = null;
        filteredData = null;
        const loading = document.getElementById('mindmap-loading');
        if (loading) loading.style.display = 'flex';
        
        const tree = await fetchRepoTree();
        rawData = await buildKnowledgeGraph(tree);
        filteredData = applyFilters(rawData);
        
        if (loading) loading.style.display = 'none';
        render();
    }

    function loadD3() {
        return new Promise((resolve, reject) => {
            if (window.d3) return resolve();
            const script = document.createElement('script');
            script.src = 'https://d3js.org/d3.v7.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    return {
        open,
        close,
        handleSearch,
        handleFilter,
        refresh,
        closePreview
    };
})();