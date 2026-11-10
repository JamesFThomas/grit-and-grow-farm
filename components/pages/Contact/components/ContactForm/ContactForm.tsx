"use client";

import { useState } from "react";

import { HONEYPOT_FIELD } from "@/lib/security/formGuards";

import styles from "./ContactForm.module.css";

/*
 * Ported from the slimkat-media ContactForm. The validation, honeypot and
 * submit handling carry over unchanged; the markup is rebuilt on the farm
 * tokens in app/globals.css since this repo has no Tailwind, and the
 * translations are dropped since this site is English only.
 *
 * The select is named "service" rather than "inquiry" because the shared
 * Apps Script writes that key into the Contacts tab's own column.
 */

type ServiceOption = "" | "general" | "delivery" | "wholesale" | "events";

const serviceOptions: { value: Exclude<ServiceOption, "">; label: string }[] = [
  { value: "general", label: "General question" },
  { value: "delivery", label: "Delivery" },
  { value: "wholesale", label: "Wholesale" },
  { value: "events", label: "Classes and events" },
];

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: ServiceOption;
  message: string;
};

type FieldName = keyof FormFields;

const fieldNames: FieldName[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "service",
  "message",
];

const emptyFields: FormFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const emptyStrings = Object.fromEntries(
  fieldNames.map((name) => [name, ""]),
) as Record<FieldName, string>;

const allUntouched = Object.fromEntries(
  fieldNames.map((name) => [name, false]),
) as Record<FieldName, boolean>;

const allTouched = Object.fromEntries(
  fieldNames.map((name) => [name, true]),
) as Record<FieldName, boolean>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// US numbers only, per the North American Numbering Plan. Rather than pattern
// matching the formatting, which varies, strip to digits and check the plan's
// own rules: 10 digits, or 11 when prefixed with the country code 1, and
// neither the area code nor the exchange code may begin with 0 or 1.
const phoneCharPattern = /^[0-9+().\s-]+$/;
const nanpPattern = /^[2-9][0-9]{2}[2-9][0-9]{6}$/;

const isValidPhone = (value: string): boolean => {
  if (!phoneCharPattern.test(value)) return false;

  let digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);

  return nanpPattern.test(digits);
};

const validateField = (name: FieldName, value: string): string => {
  switch (name) {
    case "firstName":
      return value.trim() === "" ? "First name is required" : "";
    case "lastName":
      return value.trim() === "" ? "Last name is required" : "";
    case "email":
      if (value.trim() === "") return "Email is required";
      if (!emailPattern.test(value))
        return "email@address.com format is required";
      return "";
    case "phone":
      if (value.trim() !== "" && !isValidPhone(value))
        return "A US phone number is required";
      return "";
    case "service":
      return value === "" ? "Please choose what this is about" : "";
    case "message":
      return value.trim() === "" ? "Message is required" : "";
    default:
      return "";
  }
};

export const ContactForm = () => {
  const [fields, setFields] = useState<FormFields>(emptyFields);
  const [errors, setErrors] = useState(emptyStrings);
  const [touched, setTouched] = useState(allUntouched);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error" | "rateLimited"
  >("idle");

  // Carries the honeypot value so it travels with the submission. A visitor
  // never reaches the input, so this stays empty for them.
  const [honeypot, setHoneypot] = useState("");

  const clearForm = () => {
    setFields(emptyFields);
    setErrors(emptyStrings);
    setTouched(allUntouched);
  };

  const resetSubmitStatus = () => {
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    const field = name as FieldName;

    setFields((previous) => ({ ...previous, [field]: value }));

    if (touched[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleBlur = (
    event: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;
    const field = name as FieldName;

    setTouched((previous) => ({ ...previous, [field]: true }));
    setErrors((previous) => ({
      ...previous,
      [field]: validateField(field, value),
    }));
  };

  const validateAll = (): boolean => {
    const nextErrors = Object.fromEntries(
      fieldNames.map((name) => [name, validateField(name, fields[name])]),
    ) as Record<FieldName, string>;

    setErrors(nextErrors);
    setTouched(allTouched);

    return Object.values(nextErrors).every((error) => error === "");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateAll()) return;

    try {
      setSubmitStatus("loading");

      // Trimmed before anything leaves the form, so the sheet row and the
      // emails raised by it all receive clean values.
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fields.firstName.trim(),
          lastName: fields.lastName.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          service: fields.service,
          message: fields.message.trim(),
          [HONEYPOT_FIELD]: honeypot,
        }),
      });

      // Status before body: a blocked request is answered by the edge with a
      // body that is not JSON, so parsing first would throw and the visitor
      // would see the generic error rather than the real reason. Nothing is
      // cleared, so retrying costs them no retyping.
      if (response.status === 429) {
        setSubmitStatus("rateLimited");
        resetSubmitStatus();
        return;
      }

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setSubmitStatus("success");
        clearForm();
      } else {
        console.error("Contact form submission failed:", result);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    }

    resetSubmitStatus();
  };

  const showError = (name: FieldName) => Boolean(touched[name] && errors[name]);
  const describedBy = (name: FieldName) =>
    showError(name) ? `${name}-error` : undefined;

  const fieldError = (name: FieldName) =>
    showError(name) ? (
      <p id={`${name}-error`} role="alert" className={styles.error}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              className={styles.input}
              type="text"
              autoComplete="given-name"
              value={fields.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={showError("firstName")}
              aria-describedby={describedBy("firstName")}
            />
            {fieldError("firstName")}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              className={styles.input}
              type="text"
              autoComplete="family-name"
              value={fields.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={showError("lastName")}
              aria-describedby={describedBy("lastName")}
            />
            {fieldError("lastName")}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className={styles.input}
            type="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={showError("email")}
            aria-describedby={describedBy("email")}
          />
          {fieldError("email")}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Phone <span className={styles.optional}>(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            className={styles.input}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("phone")}
            aria-describedby={describedBy("phone")}
          />
          {fieldError("phone")}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="service">
            What is this about
          </label>
          <select
            id="service"
            name="service"
            className={styles.select}
            value={fields.service}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={showError("service")}
            aria-describedby={describedBy("service")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {serviceOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {fieldError("service")}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            rows={6}
            value={fields.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-required="true"
            aria-invalid={showError("message")}
            aria-describedby={describedBy("message")}
          />
          {fieldError("message")}
        </div>

        {/*
          Honeypot. A visitor never sees or reaches it, so a value means the
          submission came from something that read the DOM and filled every
          field it found.
        */}
        <input
          type="text"
          name={HONEYPOT_FIELD}
          className={styles.honeypot}
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button
          id="contact-submit-button"
          type="submit"
          className={styles.button}
          disabled={submitStatus === "loading"}
        >
          {submitStatus === "loading" ? "Sending..." : "Send message"}
        </button>
      </form>

      <div aria-live="polite">
        {submitStatus === "success" && (
          <p className={`${styles.status} ${styles.success}`}>
            Thanks for reaching out. We will get back to you.
          </p>
        )}

        {submitStatus === "error" && (
          <p className={`${styles.status} ${styles.failure}`}>
            Something went wrong. Please try again.
          </p>
        )}

        {submitStatus === "rateLimited" && (
          <p className={`${styles.status} ${styles.failure}`}>
            Too many attempts. Please wait a few minutes and try again.
          </p>
        )}
      </div>
    </div>
  );
};
