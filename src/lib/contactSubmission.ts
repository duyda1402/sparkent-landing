export interface ContactSubmission {
  name: string;
  email: string;
  lookingFor: string;
  message: string;
}

export type ContactSubmissionErrorCode = 'not_configured' | 'rejected' | 'unconfirmed';

export class ContactSubmissionError extends Error {
  constructor(public readonly code: ContactSubmissionErrorCode) {
    super(code);
  }
}

interface ContactResultMessage {
  source: 'spark-contact-form';
  requestId: string;
  status: 'saved' | 'error';
}

const RESPONSE_TIMEOUT_MS = 30000;

function isContactResultMessage(value: unknown): value is ContactResultMessage {
  if (!value || typeof value !== 'object') return false;

  const message = value as Partial<ContactResultMessage>;
  return message.source === 'spark-contact-form'
    && typeof message.requestId === 'string'
    && (message.status === 'saved' || message.status === 'error');
}

function isGoogleScriptOrigin(origin: string): boolean {
  if (origin === 'null') return true; // Apps Script may sandbox its HTML response.

  try {
    const url = new URL(origin);
    return url.protocol === 'https:'
      && (url.hostname === 'script.google.com'
        || url.hostname === 'script.googleusercontent.com'
        || url.hostname.endsWith('.script.googleusercontent.com')
        || url.hostname.endsWith('-script.googleusercontent.com'));
  } catch {
    return false;
  }
}

export function submitContactForm(fields: ContactSubmission): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim();
  if (!endpoint) return Promise.reject(new ContactSubmissionError('not_configured'));

  let endpointUrl: URL;
  try {
    endpointUrl = new URL(endpoint);
  } catch {
    return Promise.reject(new ContactSubmissionError('not_configured'));
  }

  if (endpointUrl.protocol !== 'https:'
    || endpointUrl.hostname !== 'script.google.com'
    || !endpointUrl.pathname.endsWith('/exec')) {
    return Promise.reject(new ContactSubmissionError('not_configured'));
  }

  return new Promise((resolve, reject) => {
    const requestId = crypto.randomUUID();
    const frame = document.createElement('iframe');
    const postForm = document.createElement('form');
    const frameName = `spark-contact-${requestId}`;
    let settled = false;

    frame.name = frameName;
    frame.title = 'Contact form response';
    frame.hidden = true;
    frame.setAttribute('aria-hidden', 'true');

    postForm.action = endpointUrl.toString();
    postForm.method = 'POST';
    postForm.target = frameName;
    postForm.hidden = true;

    const addField = (name: string, value: string) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      postForm.appendChild(input);
    };

    addField('requestId', requestId);
    addField('name', fields.name.trim());
    addField('email', fields.email.trim());
    addField('lookingFor', fields.lookingFor);
    addField('message', fields.message.trim());
    addField('website', ''); // Honeypot checked by Apps Script.

    const cleanup = () => {
      window.removeEventListener('message', onMessage);
      window.clearTimeout(timeoutId);
      postForm.remove();
      frame.remove();
    };

    const finish = (status: 'saved' | 'error' | 'unconfirmed') => {
      if (settled) return;
      settled = true;
      cleanup();
      if (status === 'saved') resolve();
      else reject(new ContactSubmissionError(status === 'error' ? 'rejected' : 'unconfirmed'));
    };

    const onMessage = (event: MessageEvent<unknown>) => {
      if (!isGoogleScriptOrigin(event.origin) || !isContactResultMessage(event.data)) return;
      if (event.data.requestId !== requestId) return;
      finish(event.data.status);
    };

    const timeoutId = window.setTimeout(() => finish('unconfirmed'), RESPONSE_TIMEOUT_MS);
    window.addEventListener('message', onMessage);
    document.body.append(frame, postForm);

    try {
      postForm.submit();
    } catch {
      finish('error');
    }
  });
}
