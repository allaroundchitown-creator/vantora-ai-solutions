(() => {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  const menuToggle = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.hidden = true;
  };
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(opening));
      menuToggle.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
      mobileMenu.hidden = !opening;
    });
    $$('#mobileMenu a').forEach((link) => link.addEventListener('click', closeMobileMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) closeMobileMenu();
    });
  }

  const solutions = {
    leads: {
      customer: 'Hi, I need someone to look at my AC. Can you help?',
      reply: 'Thanks for reaching out! We received your request and our team will follow up about the next step.',
      status: 'Customer inquiry logged · Team notified',
      title: 'A better first response.',
      description: 'Your customer knows their message landed, and your team has the context to follow up without digging through inboxes.'
    },
    estimates: {
      customer: 'I got the quote for the new water heater. I just need to think about it.',
      reply: 'Hi! Just checking whether you had any questions about your estimate. We’re happy to help if you need clarification.',
      status: 'Open estimate checked · Follow-up recorded',
      title: "Don't let good estimates disappear.",
      description: 'A thoughtful check-in can restart a conversation. Follow-ups stop when a customer replies, books, or opts out.'
    },
    rebooking: {
      customer: 'Thanks again for the tune-up earlier this year!',
      reply: 'We appreciate your business. If you’d like to plan your next seasonal service, just reply and our team can help.',
      status: 'Customer history checked · Reminder sent',
      title: 'Stay connected past the first job.',
      description: 'Consent-based reminders help keep your business top of mind when a customer might be ready for another service.'
    },
    visibility: {
      customer: 'Can someone call me back about the estimate?',
      reply: 'Your message is with our team. We’ll reach out about your request as soon as someone is available.',
      status: 'Lead assigned · Owner notified',
      title: 'Know what needs attention.',
      description: 'Route requests to the right person, track follow-up status, and spot conversations that need a real human.'
    }
  };
  const tabs = $$('.solution-tab');
  const panel = $('#solutionPanel');
  const selectTab = (tab, focus = false) => {
    if (!tab || !panel) return;
    const entry = solutions[tab.dataset.solution];
    if (!entry) return;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    $('#customerBubble').textContent = entry.customer;
    $('#replyBubble').textContent = entry.reply;
    $('#panelStatus').innerHTML = '<span class="status-dot" aria-hidden="true"></span>';
    $('#panelStatus').appendChild(document.createTextNode(' ' + entry.status));
    $('#panelTitle').textContent = entry.title;
    $('#panelDescription').textContent = entry.description;
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
      if (!direction) return;
      event.preventDefault();
      selectTab(tabs[(i + direction + tabs.length) % tabs.length], true);
    });
  });

  const money = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  }).format(amount);
  const inputs = ['estimates', 'jobValue', 'margin', 'lift', 'monthlyFee'];
  const value = (id, max) => {
    const input = $('#' + id);
    if (!input) return 0;
    const parsed = Number(input.value);
    if (!Number.isFinite(parsed)) return 0;
    return Math.max(0, Math.min(max, parsed));
  };
  const updateCalculator = () => {
    if (!$('#grossProfit')) return;
    const estimates = value('estimates', 10000);
    const avgJob = value('jobValue', 10000000);
    const grossMargin = value('margin', 100) / 100;
    const liftPoints = value('lift', 100);
    const fee = value('monthlyFee', 1000000);
    const scenario = (percentagePoints) => {
      const jobs = estimates * (percentagePoints / 100);
      const sales = jobs * avgJob;
      return { jobs, sales, profit: sales * grossMargin };
    };
    const base = scenario(liftPoints);
    const upper = scenario(Math.min(100, liftPoints * 2));
    $('#grossProfit').textContent = money(base.profit);
    $('#additionalJobs').textContent = base.jobs.toLocaleString('en-US', { maximumFractionDigits: 1 });
    $('#grossSales').textContent = money(base.sales);
    const contribution = base.profit - fee;
    $('#netContribution').textContent = money(contribution);
    $('#netContribution').style.color = contribution < 0 ? '#ffadad' : '#f0fff9';
    $('#lowScenario').textContent = money(0);
    $('#highScenario').textContent = money(upper.profit);
    const highLabel = $('.result-range-row:last-child>span');
    if (highLabel) highLabel.textContent = `${Math.min(100, liftPoints * 2).toLocaleString('en-US', { maximumFractionDigits: 1 })}-point lift`;
  };
  inputs.forEach((id) => {
    const el = $('#' + id);
    if (el) el.addEventListener('input', updateCalculator);
  });
  updateCalculator();
  if ($('#year')) $('#year').textContent = new Date().getFullYear().toString();
})();
