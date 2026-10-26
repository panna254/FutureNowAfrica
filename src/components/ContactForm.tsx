import { useState } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { Button } from '@/components/Button';

type Status = 'idle' | 'submitting' | 'success' | 'failure';

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const empty: FormState = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) {
      next.message = 'Please enter a message.';
    } else if (form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    // No backend or email service is configured yet.
    // We do NOT fake a success: we surface a clear, honest message.
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      // Simulate the "no delivery provider" outcome honestly.
      setStatus('failure');
    } catch {
      setStatus('failure');
    }
  };

  const fieldClass = (hasError?: string) =>
    `w-full rounded-xl border px-4 py-3 text-body transition-colors bg-white ${
      hasError
        ? 'border-error-500 focus:ring-error-500'
        : 'border-forest-200 focus:border-leaf-500'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="block text-ui font-medium text-forest-800 mb-1.5">
          Name <span className="text-error-600">*</span>
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className={fieldClass(errors.name)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
          disabled={status === 'submitting'}
        />
        {errors.name && (
          <p id="cf-name-err" className="mt-1.5 text-caption text-error-600 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="block text-ui font-medium text-forest-800 mb-1.5">
          Email <span className="text-error-600">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={fieldClass(errors.email)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
          disabled={status === 'submitting'}
        />
        {errors.email && (
          <p id="cf-email-err" className="mt-1.5 text-caption text-error-600 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="cf-subject" className="block text-ui font-medium text-forest-800 mb-1.5">
          Subject
        </label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={handleChange}
          className={fieldClass()}
          disabled={status === 'submitting'}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block text-ui font-medium text-forest-800 mb-1.5">
          Message <span className="text-error-600">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={fieldClass(errors.message)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'cf-message-err' : undefined}
          disabled={status === 'submitting'}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-1.5 text-caption text-error-600 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Status messages */}
      {status === 'failure' && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl bg-warning-50 border border-warning-500/40 px-4 py-3.5 text-caption text-warning-700"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">Delivery is not configured yet.</p>
            <p className="mt-1">
              This form is a UI demo — no email is being sent. To reach us now,
              please use the email address shown on this page. A delivery
              service can be connected before launch.
            </p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl bg-success-50 border border-success-500/40 px-4 py-3.5 text-caption text-success-700"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <p>Thank you — your message has been sent. We will be in touch soon.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="w-4 h-4" aria-hidden="true" />
              Send Message
            </>
          )}
        </Button>
        <p className="text-caption text-forest-500">
          Required fields are marked with *
        </p>
      </div>
    </form>
  );
}
