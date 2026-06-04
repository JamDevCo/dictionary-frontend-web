"use client";

import { useState } from "react";

// ── Types ──
interface TextInputProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

interface TextareaInputProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  rows?: number;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label?: string;
  options?: SelectOption[];
  hint?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  placeholder?: string;
}

interface ToggleOption {
  label: string;
  value: string;
}

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string, type: string) => void;
  toggleOptions?: ToggleOption[];
  defaultToggle?: string;
}

interface SubscribeInputProps {
  placeholder?: string;
  buttonText?: string;
  dark?: boolean;
  onSubscribe?: (email: string) => void;
}

// ── TextInput ──
export function TextInput({
  label,
  placeholder = "",
  hint,
  error,
  disabled = false,
  required = false,
  type = "text",
  value,
  onChange,
  id,
}: TextInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="required-mark" aria-hidden="true">*</span>
          )}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={`input-field${error ? " input-error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
      />
      {error && (
        <span id={`${inputId}-error`} className="input-hint error-msg" role="alert">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={`${inputId}-hint`} className="input-hint">{hint}</span>
      )}
    </div>
  );
}

// ── TextareaInput ──
export function TextareaInput({
  label,
  placeholder,
  hint,
  error,
  disabled,
  required,
  value,
  onChange,
  id,
  rows = 4,
}: TextareaInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="required-mark" aria-hidden="true">*</span>
          )}
        </label>
      )}
      <textarea
        id={inputId}
        className={`textarea-field${error ? " input-error" : ""}`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        rows={rows}
        aria-invalid={!!error}
      />
      {error && (
        <span className="input-hint error-msg" role="alert">{error}</span>
      )}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
}

// ── SelectInput ──
export function SelectInput({
  label,
  options = [],
  hint,
  error,
  disabled,
  required,
  value,
  onChange,
  id,
  placeholder,
}: SelectInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="required-mark" aria-hidden="true">*</span>
          )}
        </label>
      )}
      <div className="select-wrapper">
        <select
          id={inputId}
          className={`select-field${error ? " input-error" : ""}`}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {error && (
        <span className="input-hint error-msg" role="alert">{error}</span>
      )}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
}

// ── SearchInput ──
export function SearchInput({
  placeholder = "Search Dictionary",
  onSearch,
  toggleOptions,
  defaultToggle,
}: SearchInputProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(
    defaultToggle || toggleOptions?.[0]?.value || ""
  );

  const handleSearch = () => onSearch?.(query, active);
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
      {toggleOptions && (
        <div className="dict-toggle" role="group" aria-label="Search type">
          {toggleOptions.map((opt) => (
            <button
              key={opt.value}
              className={`dict-toggle-btn${active === opt.value ? " active" : ""}`}
              onClick={() => setActive(opt.value)}
              aria-pressed={active === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
      <div className="search-wrapper" style={{ width: "100%", maxWidth: "460px" }}>
        <input
          type="search"
          className="search-field"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          aria-label={placeholder}
        />
        <button className="search-btn" onClick={handleSearch} aria-label="Search">
          <svg viewBox="0 0 24 24">
            <path
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── SubscribeInput ──
export function SubscribeInput({
  placeholder = "Your email address",
  buttonText = "Subscribe",
  dark = false,
  onSubscribe,
}: SubscribeInputProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    onSubscribe?.(email);
    setTimeout(() => {
      setEmail("");
      setStatus(null);
    }, 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      <div className={`subscribe-wrapper${dark ? " dark" : ""}`}>
        <input
          type="email"
          className="subscribe-field"
          placeholder={placeholder}
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus(null); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          aria-label="Email address for subscription"
          aria-invalid={status === "error"}
        />
        <button className="subscribe-btn" onClick={handleSubmit} aria-label="Subscribe">
          {buttonText}
        </button>
      </div>
      {status === "error" && (
        <span className="input-hint error-msg" style={{ color: dark ? "#fca5a5" : undefined }} role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Please enter a valid email address.
        </span>
      )}
      {status === "success" && (
        <span className="input-hint" style={{ color: dark ? "#86efac" : "#16a34a", display: "flex", alignItems: "center", gap: "4px" }} role="status">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          You&apos;re subscribed!
        </span>
      )}
    </div>
  );
}