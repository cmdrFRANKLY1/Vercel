const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subnetting for Beginners</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #1a1b1e;
            --panel-bg: #232629;
            --accent: #3daee9;
            --text-main: #eff0f1;
            --border-color: #31363b;
            --network-color: #9b59b6;
            --host-color: #3498db;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body, html {
            height: 100vh;
            width: 100vw;
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: 'Inter', sans-serif;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .code-font {
            font-family: 'JetBrains Mono', monospace;
        }

        #app-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            background: var(--bg-color);
        }

        #header {
            height: 60px;
            background-color: var(--panel-bg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 20px;
            flex-shrink: 0;
        }

        #content-area {
            flex-grow: 1;
            overflow-y: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            position: relative;
        }

        .slide-container {
            background-color: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            width: 100%;
            max-width: 800px;
            min-height: 450px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }

        .slide-content {
            padding: 2.5rem;
            flex-grow: 1;
            opacity: 0;
            transform: translateX(20px);
            transition: all 0.4s ease-out;
            display: none;
        }

        .slide-content.active {
            opacity: 1;
            transform: translateX(0);
            display: block;
        }

        .slide-content.sliding-out-left {
            display: block;
            position: absolute;
            top: 0; left: 0; right: 0;
            opacity: 0;
            transform: translateX(-20px);
            pointer-events: none;
        }

        .slide-content.sliding-out-right {
            display: block;
            position: absolute;
            top: 0; left: 0; right: 0;
            opacity: 0;
            transform: translateX(20px);
            pointer-events: none;
        }

        #footer {
            height: 70px;
            background-color: var(--panel-bg);
            border-top: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2rem;
            flex-shrink: 0;
        }

        .nav-btn {
            background-color: var(--border-color);
            color: var(--text-main);
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .nav-btn:hover:not(:disabled) {
            background-color: var(--accent);
            color: white;
        }

        .nav-btn:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        .nav-btn.primary {
            background-color: var(--accent);
            color: white;
        }
        .nav-btn.primary:hover {
            filter: brightness(1.1);
        }

        /* Progress indicators */
        .progress-dots {
            display: flex;
            gap: 8px;
        }
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--border-color);
            transition: background-color 0.3s;
        }
        .dot.active {
            background-color: var(--accent);
        }

        /* Custom Interactive Elements */
        .highlight-box {
            background-color: rgba(61, 174, 233, 0.1);
            border-left: 4px solid var(--accent);
            padding: 1rem;
            border-radius: 0 8px 8px 0;
            margin: 1rem 0;
        }

        .ip-block {
            display: inline-block;
            padding: 8px 12px;
            background: #111;
            border-radius: 6px;
            font-size: 1.5rem;
            margin: 0 4px;
            border: 1px solid #333;
        }

        input[type="range"] {
            cursor: pointer;
            accent-color: var(--accent);
        }
        
        .bit-box {
            width: 16px;
            height: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid var(--border-color);
            margin: 1px;
            transition: all 0.3s ease;
        }
        .bit-box.network {
            background-color: rgba(155, 89, 182, 0.2);
            border-color: var(--network-color);
            color: #e0b0ff;
        }
        .bit-box.host {
            background-color: rgba(52, 152, 219, 0.2);
            border-color: var(--host-color);
            color: #add8e6;
        }
    </style>
</head>
<body>
    <div id="app-container">
        <div id="header">
            <h1 class="text-xl font-bold tracking-wide" style="color: var(--accent);">Subnetting for Dummies</h1>
        </div>
        
        <div id="content-area">
            <div class="slide-container" id="slide-container">
                <!-- Slides will be injected here -->
            </div>
        </div>

        <div id="footer">
            <button id="prevBtn" class="nav-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Previous
            </button>
            <div class="progress-dots" id="progress-dots">
                <!-- Dots injected here -->
            </div>
            <button id="nextBtn" class="nav-btn primary">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</body>
</html>
`;

document.open();
document.write(htmlContent);
document.close();

function initDemo() {
    let currentStep = 0;
    
    // Array of slide objects containing HTML content and optional mount functions
    const steps = [
        {
            title: "Welcome to Subnetting!",
            content: `
                <div class="text-center h-full flex flex-col justify-center items-center space-y-6">
                    <div class="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                    <h2 class="text-4xl font-bold">Subnetting is not scary.</h2>
                    <p class="text-xl opacity-80 max-w-lg">
                        It looks like complicated math, but it's actually just a system for organizing addresses, exactly like <strong>zip codes</strong> and <strong>street numbers</strong>.
                    </p>
                    <p class="text-md opacity-60">Click "Next" to learn the secret.</p>
                </div>
            `
        },
        {
            title: "The IP Address = A Mailing Address",
            content: `
                <h2 class="text-3xl font-bold mb-6 text-[var(--accent)]">1. The IP Address</h2>
                <p class="text-lg mb-6">Think of an IP address like a physical mailing address. Let's look at a common one:</p>
                
                <div class="text-center mb-8">
                    <div class="code-font font-bold">
                        <span class="ip-block">192</span> . <span class="ip-block">168</span> . <span class="ip-block">1</span> . <span class="ip-block">50</span>
                    </div>
                </div>

                <div class="highlight-box">
                    <p class="mb-2"><strong>The Problem:</strong> When a router looks at this address, it needs to know:</p>
                    <ul class="list-disc pl-6 space-y-2 opacity-90">
                        <li>Which part is the <strong>Town/Street</strong>? (The Network)</li>
                        <li>Which part is the <strong>Specific House</strong>? (The Host)</li>
                    </ul>
                </div>
                
                <p class="text-lg mt-6">Just by looking at <code>192.168.1.50</code>, the router has <em>no idea</em>. It needs a decoder ring.</p>
            `
        },
        {
            title: "The Decoder Ring: The Subnet Mask",
            content: `
                <h2 class="text-3xl font-bold mb-6 text-[var(--network-color)]">2. The Subnet Mask</h2>
                <p class="text-lg mb-6">The Subnet Mask is the decoder ring. It sits right under the IP address and tells the router exactly where the "Town" ends and the "House" begins.</p>
                
                <div class="bg-black/30 p-6 rounded-lg mb-6 border border-gray-700">
                    <div class="flex items-center justify-center gap-4 mb-4">
                        <span class="w-32 text-right opacity-70">IP Address:</span>
                        <div class="code-font font-bold text-xl">192 . 168 . 1 . 50</div>
                    </div>
                    <div class="flex items-center justify-center gap-4">
                        <span class="w-32 text-right opacity-70">Subnet Mask:</span>
                        <div class="code-font font-bold text-xl text-[var(--network-color)]">255 . 255 . 255 . <span class="text-[var(--host-color)]">0</span></div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div class="bg-[var(--network-color)] bg-opacity-20 p-4 rounded border border-[var(--network-color)]">
                        <h4 class="font-bold text-lg mb-2">255 = "This is the Town"</h4>
                        <p class="text-sm opacity-90">Wherever there is a 255, that part of the IP is locked. It's the network name. (192.168.1)</p>
                    </div>
                    <div class="bg-[var(--host-color)] bg-opacity-20 p-4 rounded border border-[var(--host-color)]">
                        <h4 class="font-bold text-lg mb-2">0 = "This is the House"</h4>
                        <p class="text-sm opacity-90">Wherever there is a 0, that part is free to change. You can give these to computers. (.50)</p>
                    </div>
                </div>
            `
        },
        {
            title: "The Shortcut: Slash Notation (/)",
            content: `
                <h2 class="text-3xl font-bold mb-6 text-[var(--accent)]">3. The Slash Notation (CIDR)</h2>
                <p class="text-lg mb-4">Writing out <code>255.255.255.0</code> takes too long. Network admins use a shortcut called "Slash Notation" or CIDR.</p>
                
                <div class="highlight-box text-center mb-6">
                    Instead of writing <strong>255.255.255.0</strong>, we just write <strong class="text-3xl ml-2">/24</strong>
                </div>

                <h3 class="text-xl font-bold mb-3">Why 24? (The 32 Bits)</h3>
                <p class="mb-4">Every IP address is made of <strong>32 puzzle pieces</strong> (bits) under the hood. The slash number just tells you <em>how many pieces belong to the Town (Network)</em>, starting from the left.</p>
                
                <ul class="space-y-3 opacity-90 p-4 bg-black/20 rounded border border-gray-800">
                    <li><strong>/24</strong> means 24 pieces are for the Town. (Leaves 8 pieces for Houses).</li>
                    <li><strong>/16</strong> means 16 pieces are for the Town. (Leaves 16 pieces for Houses).</li>
                </ul>
            `
        },
        {
            title: "Interactive Demo: Move the Line",
            content: `
                <h2 class="text-3xl font-bold mb-4">4. Play with the Bits</h2>
                <p class="mb-6 opacity-80">Slide the bar to change the Subnet Mask. Watch how the 32 bits are divided between <span style="color: var(--network-color); font-weight: bold;">Network (Town)</span> and <span style="color: var(--host-color); font-weight: bold;">Host (Houses)</span>.</p>
                
                <div class="p-6 rounded-xl border bg-black/40 border-gray-700 flex flex-col items-center">
                    <div class="flex items-center gap-4 w-full mb-6">
                        <span class="font-bold text-2xl code-font w-20 text-right">/<span id="demoSliderVal">24</span></span>
                        <input type="range" id="demoSlider" min="8" max="30" value="24" class="w-full h-2 rounded-lg appearance-none bg-gray-600">
                    </div>

                    <div id="demoBits" class="flex flex-wrap justify-center gap-y-2 mb-6">
                        <!-- Bits injected here -->
                    </div>

                    <div class="grid grid-cols-2 gap-4 w-full max-w-md text-center">
                        <div class="p-3 rounded border border-[var(--network-color)] bg-[var(--network-color)] bg-opacity-10">
                            <div class="text-sm opacity-80 mb-1">Network Bits (Locked)</div>
                            <div class="text-2xl font-bold" id="demoNetBits">24</div>
                        </div>
                        <div class="p-3 rounded border border-[var(--host-color)] bg-[var(--host-color)] bg-opacity-10">
                            <div class="text-sm opacity-80 mb-1">Host Bits (Free)</div>
                            <div class="text-2xl font-bold" id="demoHostBits">8</div>
                        </div>
                    </div>
                    
                    <div class="mt-6 text-center w-full max-w-md p-4 bg-gray-800 rounded-lg shadow-inner">
                        <div class="text-sm mb-1">Total Usable IPs for Computers:</div>
                        <div class="text-3xl font-bold text-[var(--accent)] code-font" id="demoUsableIps">254</div>
                        <div class="text-xs opacity-50 mt-2">(Math: 2 to the power of Host Bits, minus 2)</div>
                    </div>
                </div>
            `,
            onMount: () => {
                const slider = document.getElementById('demoSlider');
                const valDisplay = document.getElementById('demoSliderVal');
                const bitsContainer = document.getElementById('demoBits');
                const netBitsDisplay = document.getElementById('demoNetBits');
                const hostBitsDisplay = document.getElementById('demoHostBits');
                const usableIpsDisplay = document.getElementById('demoUsableIps');

                function updateDemo(cidr) {
                    valDisplay.textContent = cidr;
                    netBitsDisplay.textContent = cidr;
                    
                    const hostBits = 32 - cidr;
                    hostBitsDisplay.textContent = hostBits;
                    
                    // Calculate usable IPs (2^hostBits - 2)
                    let usable = Math.pow(2, hostBits) - 2;
                    if(usable < 0) usable = 0; // Handle /31 /32 edge cases if slider allowed it
                    usableIpsDisplay.textContent = usable.toLocaleString();

                    // Render bits visually
                    bitsContainer.innerHTML = '';
                    for (let i = 0; i < 32; i++) {
                        const bitBox = document.createElement('div');
                        const isNet = i < cidr;
                        bitBox.className = `bit-box ${isNet ? 'network' : 'host'}`;
                        bitBox.textContent = isNet ? 'N' : 'H';
                        bitsContainer.appendChild(bitBox);

                        // Add small gap every 8 bits (octet)
                        if ((i + 1) % 8 === 0 && i !== 31) {
                            const gap = document.createElement('div');
                            gap.style.width = '8px';
                            bitsContainer.appendChild(gap);
                        }
                    }
                }

                slider.addEventListener('input', (e) => {
                    updateDemo(parseInt(e.target.value));
                });
                
                // Init first view
                updateDemo(24);
            }
        },
        {
            title: "The Golden Rule: Minus 2",
            content: `
                <h2 class="text-3xl font-bold mb-6 text-red-400">5. Why "Minus 2"?</h2>
                <p class="text-lg mb-4">You might have noticed we subtract 2 from the total number of IPs. You can <strong>never</strong> use the very first or very last IP in a network for a computer.</p>
                
                <div class="space-y-4">
                    <div class="bg-gray-800 p-4 rounded flex items-start gap-4 border-l-4 border-gray-500">
                        <div class="text-2xl mt-1">🏷️</div>
                        <div>
                            <h4 class="font-bold text-lg">The First IP (Network Address)</h4>
                            <p class="opacity-80 text-sm">This acts as the nameplate for the entire town. Routers use this to find the network. (e.g., 192.168.1.0)</p>
                        </div>
                    </div>
                    
                    <div class="bg-gray-800 p-4 rounded flex items-start gap-4 border-l-4 border-yellow-500">
                        <div class="text-2xl mt-1">📢</div>
                        <div>
                            <h4 class="font-bold text-lg">The Last IP (Broadcast Address)</h4>
                            <p class="opacity-80 text-sm">This is the town megaphone. If you send a message here, it goes to <em>every</em> computer in the network at once. (e.g., 192.168.1.255)</p>
                        </div>
                    </div>
                </div>

                <div class="mt-8 text-center bg-green-900/30 border border-green-500/50 p-6 rounded-lg">
                    <h3 class="text-2xl font-bold text-green-400 mb-2">You're Ready!</h3>
                    <p class="opacity-90">You now understand the difference between the Network (Mask) and the Hosts (Computers). Go crush the Subnet Master game!</p>
                </div>
            `
        }
    ];

    const container = document.getElementById('slide-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('progress-dots');

    // Create dots
    steps.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    function renderSlide(index, direction = 'forward') {
        const currentActive = container.querySelector('.slide-content.active');
        
        // Handle exit animation
        if (currentActive) {
            currentActive.classList.remove('active');
            currentActive.classList.add(direction === 'forward' ? 'sliding-out-left' : 'sliding-out-right');
            setTimeout(() => {
                currentActive.remove();
            }, 400); // match CSS transition time
        }

        // Create new slide
        const slideData = steps[index];
        const slideEl = document.createElement('div');
        slideEl.className = 'slide-content';
        slideEl.innerHTML = slideData.content;
        
        container.appendChild(slideEl);

        // Force reflow for animation
        void slideEl.offsetWidth; 
        
        // Start entrance
        slideEl.classList.add('active');

        // Execute specific JS for this slide if it exists
        if (slideData.onMount) {
            // small timeout to ensure DOM is ready and visible
            setTimeout(slideData.onMount, 50); 
        }

        // Update UI
        updateNav();
    }

    function updateNav() {
        prevBtn.disabled = currentStep === 0;
        
        if (currentStep === steps.length - 1) {
            nextBtn.innerHTML = `
                Finish
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>`;
        } else {
            nextBtn.innerHTML = `
                Next
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>`;
        }

        dots.forEach((dot, idx) => {
            if (idx === currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            renderSlide(currentStep, 'backward');
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderSlide(currentStep, 'forward');
        } else {
            // "Finish" action: could close a modal or just show a nice alert.
            // For this interactive demo, we'll just loop back to the start or show a message.
            currentStep = 0;
            renderSlide(currentStep, 'backward');
        }
    });

    // Initialize first slide
    renderSlide(currentStep, 'none');
}

// Boot the application
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemo);
} else {
    initDemo();
}