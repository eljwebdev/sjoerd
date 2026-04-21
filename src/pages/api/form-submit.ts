import type { APIRoute } from "astro";
import { createClient } from "@sanity/client";
import { Resend } from "resend";

export const prerender = false;

const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2026-02-10",
});

function replacePlaceholders(
  template: string,
  data: Record<string, unknown>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = data[key];
    if (Array.isArray(value)) return value.join(", ");
    return String(value ?? "");
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { formId, data } = await request.json();

    if (!formId || !data) {
      return new Response(
        JSON.stringify({ success: false }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const config = await sanityClient.fetch(`{
      "form": *[_type == "form" && _id == $formId][0]{
        formsparkAction,
        onSubmit {
          onSubmitAction,
          successMessage,
          "redirectSlug": redirectPage->slug.current,
          enableDataLayer,
          dataLayerEvent,
          notifications
        }
      },
      "settings": *[_type == "settings" && _id == "settings"][0].settings {
        adminEmail,
        resendApiKey,
        resendFromEmail,
        title
      }
    }`, { formId });

    const form = config?.form;
    const settings = config?.settings;

    if (!form?.formsparkAction) {
      return new Response(
        JSON.stringify({ success: false }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1. Forward to Formspark
    const formsparkRes = await fetch(form.formsparkAction, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!formsparkRes.ok) {
      return new Response(
        JSON.stringify({ success: false }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Send email notifications (non-blocking)
    const notifications = form.onSubmit?.notifications ?? [];
    if (notifications.length > 0 && settings?.resendApiKey) {
      try {
        const resend = new Resend(settings.resendApiKey);
        const fromEmail = settings.resendFromEmail ?? "onboarding@resend.dev";
        const siteTitle = settings.title ?? "Website";

        await Promise.allSettled(
          notifications.map(async (notification: any) => {
            let to: string | undefined;

            if (notification.recipient === "admin") {
              to = settings.adminEmail;
            } else if (notification.recipient === "field" && notification.emailField) {
              to = data[notification.emailField] as string;
            }

            if (!to) return;

            const fromName = notification.fromName ?? siteTitle;
            const subject = replacePlaceholders(notification.subject, data);
            const html = replacePlaceholders(notification.body, data);

            await resend.emails.send({
              from: `${fromName} <${fromEmail}>`,
              to,
              subject,
              html,
            });
          })
        );
      } catch {
        // Email failures don't block form submission
      }
    }

    // 3. Build response
    const onSubmit = form.onSubmit;
    const action = onSubmit?.onSubmitAction ?? "message";

    const response: Record<string, unknown> = {
      success: true,
      action,
    };

    if (action === "redirect" && onSubmit?.redirectSlug) {
      response.redirectUrl = `/${onSubmit.redirectSlug}`;
    } else {
      response.message = onSubmit?.successMessage ?? "Bedankt voor je bericht!";
    }

    if (onSubmit?.enableDataLayer) {
      response.dataLayer = {
        event: onSubmit.dataLayerEvent ?? "form_submission",
        formId,
      };
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(
      JSON.stringify({ success: false }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
