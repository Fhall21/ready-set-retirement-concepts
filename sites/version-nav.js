/**
 * Ready Set Retirement — Version Navigation Toolbar
 * Enables instant switching between v1, v2, ... and side-by-side comparison.
 */
(function() {
  // Suppress toolbar inside comparison iframes
  if (window.self !== window.top) {
    document.documentElement.classList.add('rsr-inside-iframe');
    return;
  }

  // Configuration of versions (extensible for v3, v4, etc.)
  const CONFIG = {
    versions: [
      { id: 'v1', label: 'v1', title: 'v1 — Initial Concepts' },
      { id: 'v2', label: 'v2', title: 'v2 — Feedback Iteration' }
    ],
    sites: {
      '01-the-long-light': '01 The Long Light',
      '02-second-horizon': '02 Second Horizon',
      '04-unretired': '04 Unretired',
      '05-the-quiet-room': '05 The Quiet Room',
      '07-third-act': '07 Third Act',
      '08-vitals': '08 Vitals',
      '09-the-map': '09 The Map',
      'index': 'Gallery Hub'
    }
  };

  // Attempt to load external versions.json asynchronously if available, to pick up future versions
  function loadExternalConfig(basePath) {
    try {
      fetch(basePath + 'versions.json')
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.versions) && data.versions.length > 0) {
            CONFIG.versions = data.versions;
            updateNavUI();
          }
        })
        .catch(() => {});
    } catch(e) {}
  }

  // Parse current URL to identify version and site slug
  function parseLocation() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const parts = path.split('/').filter(Boolean);
    
    // Find version token like 'v1', 'v2', etc.
    let verIndex = -1;
    let currentVer = 'v2'; // fallback
    for (let i = parts.length - 1; i >= 0; i--) {
      if (/^v\d+$/i.test(parts[i])) {
        verIndex = i;
        currentVer = parts[i].toLowerCase();
        break;
      }
    }

    // Determine site slug and relative depth to 'sites/' root
    let siteSlug = 'index';
    let relativeSitesRoot = '../';

    if (verIndex !== -1) {
      const subParts = parts.slice(verIndex + 1);
      if (subParts.length === 0 || subParts[0].startsWith('index.html')) {
        siteSlug = 'index';
        relativeSitesRoot = '../';
      } else {
        siteSlug = subParts[0];
        relativeSitesRoot = '../../';
      }
    } else {
      // In case we are directly in sites/
      const last = parts[parts.length - 1] || '';
      if (last && !last.endsWith('.html')) {
        siteSlug = last;
      }
      relativeSitesRoot = './';
    }

    return {
      currentVer,
      siteSlug,
      relativeSitesRoot
    };
  }

  // Ensure CSS is loaded
  function ensureCSS(relativeSitesRoot) {
    if (!document.getElementById('rsr-version-nav-css')) {
      const link = document.createElement('link');
      link.id = 'rsr-version-nav-css';
      link.rel = 'stylesheet';
      link.href = relativeSitesRoot + 'version-nav.css';
      document.head.appendChild(link);
    }
  }

  let state = parseLocation();

  function getVersionUrl(targetVer) {
    if (state.siteSlug === 'index') {
      return state.relativeSitesRoot + targetVer + '/index.html';
    }
    return state.relativeSitesRoot + targetVer + '/' + state.siteSlug + '/index.html';
  }

  function getCompareUrl(compareVer) {
    const siteParam = state.siteSlug === 'index' ? 'index' : state.siteSlug;
    return state.relativeSitesRoot + 'compare.html?site=' + encodeURIComponent(siteParam) + 
           '&left=' + encodeURIComponent(compareVer) + 
           '&right=' + encodeURIComponent(state.currentVer);
  }

  function updateNavUI() {
    let container = document.getElementById('rsr-version-bar');
    if (!container) return;

    const versions = CONFIG.versions;
    const curIdx = versions.findIndex(v => v.id.toLowerCase() === state.currentVer.toLowerCase());
    const validIdx = curIdx >= 0 ? curIdx : 0;
    const prevVer = validIdx > 0 ? versions[validIdx - 1] : null;
    const nextVer = validIdx < versions.length - 1 ? versions[validIdx + 1] : null;
    
    // Pick other version for compare dropdown
    const otherVersions = versions.filter(v => v.id.toLowerCase() !== state.currentVer.toLowerCase());
    const defaultCompareVer = otherVersions.length > 0 ? otherVersions[otherVersions.length - 1].id : (state.currentVer === 'v1' ? 'v2' : 'v1');

    const siteDisplayName = CONFIG.sites[state.siteSlug] || state.siteSlug;

    // Check if user previously collapsed
    const isCollapsed = localStorage.getItem('rsr-nav-collapsed') === 'true';

    container.className = isCollapsed ? 'rsr-collapsed' : '';
    container.innerHTML = `
      <!-- Collapsed view -->
      <div class="rsr-nav-pill-only" title="Click to expand Version Navigation">
        <span class="rsr-badge">${state.currentVer.toUpperCase()}</span>
        <span>${siteDisplayName}</span>
        <span style="opacity: 0.6; font-size: 10px;">[+]</span>
      </div>

      <!-- Full view -->
      <div class="rsr-nav-full rsr-nav-group">
        <span class="rsr-nav-label">
          <span class="rsr-badge">${state.currentVer.toUpperCase()}</span>
          <span class="rsr-nav-site-name">${siteDisplayName}</span>
        </span>

        <div class="rsr-nav-divider"></div>

        <!-- Sequential navigation: Back / Next -->
        <div class="rsr-nav-group">
          ${prevVer ? 
            `<a href="${getVersionUrl(prevVer.id)}" class="rsr-nav-btn" id="rsr-nav-prev" title="Previous version (${prevVer.label}) — Shortcut: [">◀ Back</a>` : 
            `<span class="rsr-nav-btn rsr-disabled" title="No earlier version">◀ Back</span>`
          }

          <select class="rsr-nav-select" id="rsr-nav-version-select" title="Switch Version">
            ${versions.map(v => `
              <option value="${v.id}" ${v.id.toLowerCase() === state.currentVer.toLowerCase() ? 'selected' : ''}>
                ${v.label}
              </option>
            `).join('')}
          </select>

          ${nextVer ? 
            `<a href="${getVersionUrl(nextVer.id)}" class="rsr-nav-btn" id="rsr-nav-next" title="Next version (${nextVer.label}) — Shortcut: ]">Next ▶</a>` : 
            `<span class="rsr-nav-btn rsr-disabled" title="No later version">Next ▶</span>`
          }
        </div>

        <div class="rsr-nav-divider"></div>

        <!-- Side-by-side comparison dropdown & button -->
        <div class="rsr-nav-group">
          <span class="rsr-nav-caption">Compare with:</span>
          <select class="rsr-nav-select rsr-compare-select" id="rsr-nav-compare-target" title="Select version to compare side by side">
            ${otherVersions.map(v => `
              <option value="${v.id}" ${v.id === defaultCompareVer ? 'selected' : ''}>
                ${v.label}
              </option>
            `).join('')}
          </select>
          <button type="button" class="rsr-nav-btn rsr-nav-btn-accent" id="rsr-btn-compare" title="Open side-by-side comparison — Shortcut: C">
            ◫ Side-by-Side
          </button>
        </div>

        <div class="rsr-nav-divider"></div>

        <!-- Gallery Hub link -->
        <a href="${state.relativeSitesRoot}index.html" class="rsr-nav-btn" title="Return to All Sites Hub — Shortcut: H">
          ☷ Hub
        </a>

        <!-- Collapse toggle -->
        <button type="button" class="rsr-icon-btn" id="rsr-btn-toggle-collapse" title="Collapse toolbar">
          ✕
        </button>
      </div>
    `;

    // Event handlers
    const verSelect = container.querySelector('#rsr-nav-version-select');
    if (verSelect) {
      verSelect.addEventListener('change', function() {
        window.location.href = getVersionUrl(this.value);
      });
    }

    const compareBtn = container.querySelector('#rsr-btn-compare');
    const compareTarget = container.querySelector('#rsr-nav-compare-target');
    if (compareBtn && compareTarget) {
      compareBtn.addEventListener('click', function() {
        window.location.href = getCompareUrl(compareTarget.value);
      });
    }

    const collapseBtn = container.querySelector('#rsr-btn-toggle-collapse');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        container.classList.add('rsr-collapsed');
        localStorage.setItem('rsr-nav-collapsed', 'true');
      });
    }

    const pillOnly = container.querySelector('.rsr-nav-pill-only');
    if (pillOnly) {
      pillOnly.addEventListener('click', function() {
        container.classList.remove('rsr-collapsed');
        localStorage.setItem('rsr-nav-collapsed', 'false');
      });
    }
  }

  function init() {
    state = parseLocation();
    ensureCSS(state.relativeSitesRoot);

    // Create container
    let container = document.getElementById('rsr-version-bar');
    if (!container) {
      container = document.createElement('div');
      container.id = 'rsr-version-bar';
      container.setAttribute('role', 'navigation');
      container.setAttribute('aria-label', 'Version navigation');
      document.body.appendChild(container);
    }

    updateNavUI();
    loadExternalConfig(state.relativeSitesRoot);

    // Keyboard navigation shortcuts
    window.addEventListener('keydown', function(e) {
      // Don't trigger if user is typing in an input, textarea, or select
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      
      const versions = CONFIG.versions;
      const curIdx = versions.findIndex(v => v.id.toLowerCase() === state.currentVer.toLowerCase());
      const validIdx = curIdx >= 0 ? curIdx : 0;

      if (e.key === '[' || e.key === 'ArrowLeft' && e.altKey) {
        if (validIdx > 0) {
          window.location.href = getVersionUrl(versions[validIdx - 1].id);
        }
      } else if (e.key === ']' || e.key === 'ArrowRight' && e.altKey) {
        if (validIdx < versions.length - 1) {
          window.location.href = getVersionUrl(versions[validIdx + 1].id);
        }
      } else if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
        const compareTarget = document.getElementById('rsr-nav-compare-target');
        const compareVer = compareTarget ? compareTarget.value : (state.currentVer === 'v1' ? 'v2' : 'v1');
        window.location.href = getCompareUrl(compareVer);
      } else if (e.key.toLowerCase() === 'h' && !e.metaKey && !e.ctrlKey) {
        window.location.href = state.relativeSitesRoot + 'index.html';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
