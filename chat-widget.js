window.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('ai-chat-toggle');
  const panel = document.getElementById('ai-chat-panel');
  const closeBtn = document.getElementById('ai-chat-close');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-input');
  const messagesEl = document.getElementById('ai-chat-messages');

  if (!toggleBtn || !panel || !form || !input || !messagesEl) return;

  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function addMessage(text, role) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex gap-2 ' + (role === 'user' ? 'justify-end' : '');

    if (role === 'assistant') {
      wrapper.innerHTML = `
        <div
          class="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-tr from-primary-600 to-sky-400 text-[11px] text-white flex items-center justify-center"
        >
          CV
        </div>
        <div
          class="max-w-[75%] rounded-2xl rounded-tl-sm bg-slate-50 px-3 py-2 text-[11px] text-ink-700 shadow-sm border border-slate-200/80"
        >
          ${text}
        </div>
      `;
    } else {
      wrapper.innerHTML = `
        <div
          class="max-w-[75%] rounded-2xl rounded-tr-sm bg-primary-600/95 px-3 py-2 text-[11px] text-white shadow-sm"
        >
          ${text}
        </div>
      `;
    }

    messagesEl.appendChild(wrapper);
    scrollToBottom();
  }

  function generateReply(prompt) {
    const lower = prompt.toLowerCase();

    if (lower.includes('summary')) {
      return (
        'Here is a 3‑line professional summary template you can adapt:\n\n' +
        '“[Role] with [X]+ years of experience in [industry / domain], specialising in [top skills]. ' +
        'Proven track record of achieving [2–3 key outcomes with metrics]. ' +
        'Looking to bring this experience to [type of team / company] to help [impact you want to drive].”'
      );
    }

    if (lower.includes('bullet') || lower.includes('experience')) {
      return (
        'Use this structure for strong, ATS‑friendly bullets:\n\n' +
        '• Action verb + what you owned\n' +
        '• How you did it (tools, skills, collaborators)\n' +
        '• Concrete result with numbers\n\n' +
        'Example:\n' +
        '“Led redesign of onboarding flow using Figma and user interviews, increasing week‑1 activation by 24% and reducing support tickets by 18%.”'
      );
    }

    if (lower.includes('skills')) {
      return (
        'Group skills into 3–4 categories so they scan well, for example:\n\n' +
        '• Product & UX: discovery, user interviews, usability testing\n' +
        '• Design: wireframing, prototyping, design systems, Figma\n' +
        '• Delivery: stakeholder management, roadmapping, experimentation\n\n' +
        'Make sure you mirror important keywords from the job description.'
      );
    }

    return (
      'Here are a few ways I can help you improve your CV:\n\n' +
      '• Paste a job description and I’ll suggest keywords to include in your summary and skills.\n' +
      '• Paste a paragraph about your experience and I’ll turn it into 3–4 impact‑focused bullets.\n' +
      '• Tell me your role and years of experience and I’ll draft a concise professional summary.'
    );
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    addMessage(value, 'user');
    input.value = '';

    setTimeout(() => {
      const reply = generateReply(value);
      addMessage(reply.replace(/\n/g, '<br>'), 'assistant');
    }, 350);
  });

  toggleBtn.addEventListener('click', function () {
    panel.classList.toggle('hidden');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      panel.classList.add('hidden');
    });
  }

  document.querySelectorAll('[data-ai-suggest]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-ai-suggest') || '';
      input.value = text;
      input.focus();
      input.setSelectionRange(text.length, text.length);
    });
  });
});




