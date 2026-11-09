/* global document, window, CustomEvent */

/**
 * Germin8 Live Visualizer Engine
 * Clean, minimal in-page indicator system — no glassmorphism.
 */

class LiveVisualizerEngine {
  constructor() {
    this.state = {
      detected: 0,
      mapped: 0,
      filled: 0,
      isActive: false,
      isExpanded: false,
    };
    this.lensCard = null;
    this.hud = null;
    this._boundMouseOver = null;
    this._boundMouseOut = null;
  }

  // ── Lifecycle ──────────────────────────────────────────────────────

  init() {
    this.createHUD();
  }

  destroy() {
    this.clearHighlights();
    this.hideLensCard();
    if (this.hud) {
      this.hud.remove();
      this.hud = null;
    }
    if (this._boundMouseOver) {
      document.removeEventListener('mouseover', this._boundMouseOver);
      this._boundMouseOver = null;
    }
    if (this._boundMouseOut) {
      document.removeEventListener('mouseout', this._boundMouseOut);
      this._boundMouseOut = null;
    }
  }

  // ── HUD ───────────────────────────────────────────────────────────

  createHUD() {
    // Remove existing HUD if present
    const existing = document.getElementById('germin8-live-hud');
    if (existing) existing.remove();

    const hud = document.createElement('div');
    hud.id = 'germin8-live-hud';
    hud.className = 'germin8-hud-collapsed';

    // Build collapsed pill
    const pill = document.createElement('div');
    pill.className = 'germin8-hud-pill';

    const dot = document.createElement('span');
    dot.className = 'germin8-status-dot';

    const label = document.createElement('span');
    label.className = 'germin8-pill-label';
    label.textContent = 'Germin8';

    const count = document.createElement('span');
    count.className = 'germin8-pill-count';
    count.textContent = '0 fields';

    pill.appendChild(dot);
    pill.appendChild(label);
    pill.appendChild(count);

    // Build expanded panel
    const panel = document.createElement('div');
    panel.className = 'germin8-hud-panel';

    // — Header
    const header = document.createElement('div');
    header.className = 'germin8-panel-header';

    const titleWrap = document.createElement('div');
    titleWrap.className = 'germin8-panel-title';

    const headerDot = document.createElement('span');
    headerDot.className = 'germin8-status-dot germin8-dot-active';

    const titleText = document.createElement('span');
    titleText.textContent = 'Germin8 Active';

    titleWrap.appendChild(headerDot);
    titleWrap.appendChild(titleText);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'germin8-panel-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Collapse');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.state.isExpanded = false;
      this._applyHUDState();
    });

    header.appendChild(titleWrap);
    header.appendChild(closeBtn);

    // — Stats
    const stats = document.createElement('div');
    stats.className = 'germin8-panel-stats';

    const statRows = [
      { key: 'detected', label: 'Detected' },
      { key: 'mapped',   label: 'Mapped' },
      { key: 'filled',   label: 'Filled' },
    ];

    statRows.forEach(({ key, label: lbl }) => {
      const row = document.createElement('div');
      row.className = 'germin8-stat-row';

      const labelEl = document.createElement('span');
      labelEl.className = 'germin8-stat-label';
      labelEl.textContent = lbl;

      const valueEl = document.createElement('span');
      valueEl.className = 'germin8-stat-value';
      valueEl.dataset.stat = key;
      valueEl.textContent = '0';

      row.appendChild(labelEl);
      row.appendChild(valueEl);
      stats.appendChild(row);
    });

    // — Action buttons
    const actions = document.createElement('div');
    actions.className = 'germin8-panel-actions';

    const fillBtn = document.createElement('button');
    fillBtn.className = 'germin8-btn germin8-btn-fill';
    fillBtn.textContent = 'Fill';
    fillBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.dispatchEvent(new CustomEvent('germin8:fill-requested'));
    });

    const clearBtn = document.createElement('button');
    clearBtn.className = 'germin8-btn germin8-btn-clear';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.dispatchEvent(new CustomEvent('germin8:clear-requested'));
    });

    actions.appendChild(fillBtn);
    actions.appendChild(clearBtn);

    // — Footer / Dashboard link
    const footer = document.createElement('div');
    footer.className = 'germin8-panel-footer';

    const dashLink = document.createElement('button');
    dashLink.className = 'germin8-dashboard-link';
    dashLink.textContent = 'Open Dashboard';
    dashLink.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open('http://localhost:4567/dashboard/', '_blank', 'noopener,noreferrer');
    });

    footer.appendChild(dashLink);

    // Assemble panel
    panel.appendChild(header);
    panel.appendChild(stats);
    panel.appendChild(actions);
    panel.appendChild(footer);

    hud.appendChild(pill);
    hud.appendChild(panel);

    // Toggle expand on pill click
    pill.addEventListener('click', () => {
      this.state.isExpanded = !this.state.isExpanded;
      this._applyHUDState();
    });

    document.body.appendChild(hud);
    this.hud = hud;
    this._applyHUDState();
  }

  /**
   * Merge a patch object into this.state and re-render the HUD.
   * @param {Partial<typeof this.state>} patch
   */
  updateState(patch) {
    Object.assign(this.state, patch);
    this._applyHUDState();
  }

  /**
   * Sync the HUD DOM to current state (collapsed / expanded, stats, dot).
   * @private
   */
  _applyHUDState() {
    if (!this.hud) return;

    // Toggle collapsed / expanded class
    this.hud.classList.toggle('germin8-hud-collapsed', !this.state.isExpanded);
    this.hud.classList.toggle('germin8-hud-expanded',   this.state.isExpanded);

    // Status dot colour on the pill
    const pillDot = this.hud.querySelector('.germin8-hud-pill .germin8-status-dot');
    if (pillDot) {
      pillDot.classList.remove('germin8-dot-active', 'germin8-dot-scanning', 'germin8-dot-error');
      if (this.state.isActive) {
        pillDot.classList.add('germin8-dot-active');
      }
    }

    // Pill count text
    const pillCount = this.hud.querySelector('.germin8-pill-count');
    if (pillCount) {
      const total = this.state.detected || 0;
      pillCount.textContent = `${total} field${total !== 1 ? 's' : ''}`;
    }

    // Panel stat values
    ['detected', 'mapped', 'filled'].forEach((key) => {
      const el = this.hud.querySelector(`.germin8-stat-value[data-stat="${key}"]`);
      if (el) el.textContent = String(this.state[key] ?? 0);
    });

    // Panel header dot
    const panelDot = this.hud.querySelector('.germin8-hud-panel .germin8-status-dot');
    if (panelDot) {
      panelDot.classList.remove('germin8-dot-active', 'germin8-dot-scanning', 'germin8-dot-error');
      if (this.state.isActive) panelDot.classList.add('germin8-dot-active');
    }
  }

  // ── Field Highlights ──────────────────────────────────────────────

  /**
   * Apply a highlight class to a field element.
   * @param {Element} element
   * @param {'filled'|'review'|'error'} status
   */
  highlightField(element, status = 'filled') {
    if (!element) return;

    // Remove any existing germin8 highlight classes
    element.classList.remove(
      'germin8-highlight-filled',
      'germin8-highlight-review',
      'germin8-highlight-error',
      'germin8-fill-flash'
    );

    const cls = `germin8-highlight-${status}`;
    element.classList.add(cls);

    // Play fill-flash animation for 'filled' status
    if (status === 'filled') {
      // Trigger reflow so animation restarts cleanly
      void element.offsetWidth; // eslint-disable-line no-void
      element.classList.add('germin8-fill-flash');
      element.addEventListener(
        'animationend',
        () => element.classList.remove('germin8-fill-flash'),
        { once: true }
      );
    }
  }

  /**
   * Remove all germin8 highlight classes from every element in the DOM.
   */
  clearHighlights() {
    const classes = [
      'germin8-highlight-filled',
      'germin8-highlight-review',
      'germin8-highlight-error',
      'germin8-fill-flash',
    ];
    classes.forEach((cls) => {
      document.querySelectorAll(`.${cls}`).forEach((el) => el.classList.remove(cls));
    });
  }

  // ── Scan Pulse ───────────────────────────────────────────────────

  /**
   * Flash each element with the review (amber) class for 600 ms,
   * then remove it so the mapping engine can assign the final class.
   * @param {Element[]} elements
   */
  showScanPulse(elements) {
    elements.forEach((el) => {
      el.classList.add('germin8-highlight-review');
      setTimeout(() => el.classList.remove('germin8-highlight-review'), 600);
    });
  }

  // ── Lens Card ─────────────────────────────────────────────────────

  /**
   * Show the lens card near a highlighted field.
   * @param {Element} element  The field element to anchor near.
   * @param {{ label: string, dbPath: string, value: string }} data
   */
  showLensCard(element, data) {
    this.hideLensCard();
    if (!element) return;

    const card = document.createElement('div');
    card.className = 'germin8-lens-card';

    // Field label
    const labelEl = document.createElement('div');
    labelEl.className = 'germin8-lens-field-label';
    labelEl.textContent = data.label || 'Field';

    // DB path
    const pathEl = document.createElement('div');
    pathEl.className = 'germin8-lens-db-path';
    pathEl.textContent = data.dbPath || '';

    // Value preview
    const valueEl = document.createElement('div');
    valueEl.className = 'germin8-lens-value';
    valueEl.textContent = data.value !== undefined ? String(data.value) : '—';

    card.appendChild(labelEl);
    card.appendChild(pathEl);
    card.appendChild(valueEl);

    // Position: above the element if space allows, otherwise below
    document.body.appendChild(card);
    this.lensCard = card;

    const rect = element.getBoundingClientRect();
    const cardHeight = card.offsetHeight || 80;
    const GAP = 6;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top;
    let left = rect.left + scrollX;

    if (rect.top >= cardHeight + GAP) {
      // Position above
      top = rect.top + scrollY - cardHeight - GAP;
    } else {
      // Position below
      top = rect.bottom + scrollY + GAP;
    }

    // Clamp left so card doesn't overflow viewport right edge
    const maxLeft = window.innerWidth - 210; // 200px max-width + 10px margin
    left = Math.min(left, maxLeft);
    left = Math.max(left, 4);

    card.style.top  = `${top}px`;
    card.style.left = `${left}px`;

    // Fade in
    requestAnimationFrame(() => {
      card.classList.add('germin8-lens-visible');
    });
  }

  hideLensCard() {
    if (this.lensCard) {
      this.lensCard.remove();
      this.lensCard = null;
    }
  }
}

window.LiveVisualizerEngine = LiveVisualizerEngine;
