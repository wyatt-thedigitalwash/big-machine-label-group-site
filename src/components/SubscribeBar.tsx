"use client";

import { useRef, useState } from "react";
import { COUNTRIES } from "@/lib/countries";
import { SMS_COUNTRIES } from "@/lib/subscribe-validation";

type FormStatus = "idle" | "loading" | "success" | "error";
type ErrorField = "email" | "phone" | "";

const DEFAULT_SUCCESS_HEAD = "You're In.";
const DEFAULT_SUCCESS_SUB =
  "Welcome to the list. Check your phone for a text and reply to confirm SMS updates.";

// Keep only digits and auto-format a US number as NXX-NXX-XXXX as the fan types.
// Handles pastes that include a leading country code (1 or +1) or punctuation.
function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

const inputBase =
  "w-full bg-transparent border-0 border-b text-white font-[family-name:var(--font-body)] text-[14px] py-3 px-0 outline-none transition-colors duration-300 ease-out placeholder:text-[#717171]";

const borderClass = (invalid: boolean) =>
  invalid ? "border-[#CA2125]" : "border-[#333333] focus:border-[#CA2125]";

export default function SubscribeBar() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [website, setWebsite] = useState(""); // honeypot

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorField, setErrorField] = useState<ErrorField>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successHead, setSuccessHead] = useState(DEFAULT_SUCCESS_HEAD);
  const [successSub, setSuccessSub] = useState(DEFAULT_SUCCESS_SUB);

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // US/Canada get the +1 auto-formatted REQUIRED phone; elsewhere it's optional
  // and plain because Laylo can only text North American numbers.
  const isNorthAmerica = SMS_COUNTRIES.has(country);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return; // guard double-submit
    setStatus("loading");
    setErrorField("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, zipCode, country, website }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        if (data?.message) {
          setSuccessHead("Thanks.");
          setSuccessSub(data.message);
        }
        setStatus("success");
        return;
      }

      const field: ErrorField =
        data?.field === "email" || data?.field === "phone" ? data.field : "";
      setErrorField(field);
      setErrorMessage(data?.error || "Something went wrong. Please try again.");
      setStatus("error");
      requestAnimationFrame(() => {
        if (field === "email") emailRef.current?.focus();
        else if (field === "phone") phoneRef.current?.focus();
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section
        className="w-full bg-black px-8 py-12 md:px-20 md:py-16"
        style={{ borderTop: "1px solid #1a1a1a" }}
      >
        <div className="text-center" role="status" aria-live="polite">
          <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none">
            {successHead}
          </h2>
          <p
            className="font-[family-name:var(--font-body)] text-[14px] mt-3 max-w-[500px] mx-auto leading-relaxed"
            style={{ color: "#717171" }}
          >
            {successSub}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full bg-black px-8 py-12 md:px-20 md:py-16"
      style={{ borderTop: "1px solid #1a1a1a" }}
    >
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] uppercase text-white leading-none">
            Stay Connected
          </h2>
          <p
            className="font-[family-name:var(--font-body)] text-[14px] mt-3"
            style={{ color: "#717171" }}
          >
            Subscribe for news, releases, and tour announcements from Big Machine Records and Nashville Harbor Records.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot -- visually hidden, off-screen. Bots auto-fill it. */}
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
            <label htmlFor="sub-website">Website</label>
            <input
              id="sub-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="sub-first" className="sr-only">First Name</label>
              <input
                id="sub-first"
                name="firstName"
                type="text"
                placeholder="First Name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${inputBase} ${borderClass(false)}`}
              />
            </div>
            <div>
              <label htmlFor="sub-last" className="sr-only">Last Name</label>
              <input
                id="sub-last"
                name="lastName"
                type="text"
                placeholder="Last Name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`${inputBase} ${borderClass(false)}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="sub-email" className="sr-only">Email</label>
              <input
                ref={emailRef}
                id="sub-email"
                name="email"
                type="email"
                placeholder="Email*"
                required
                aria-required="true"
                aria-invalid={errorField === "email"}
                aria-describedby={status === "error" ? "sub-error" : undefined}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputBase} ${borderClass(errorField === "email")}`}
              />
            </div>
            <div>
              <label htmlFor="sub-phone" className="sr-only">
                Phone Number{isNorthAmerica ? "" : " (optional)"}
              </label>
              {isNorthAmerica ? (
                <div
                  className={`flex items-stretch border-0 border-b transition-colors duration-300 ease-out ${
                    errorField === "phone" ? "border-[#CA2125]" : "border-[#333333] focus-within:border-[#CA2125]"
                  }`}
                >
                  <span
                    className="flex items-center pr-2 text-[14px] select-none font-[family-name:var(--font-body)]"
                    style={{ color: "#717171" }}
                    aria-hidden="true"
                  >
                    +1
                  </span>
                  <input
                    ref={phoneRef}
                    id="sub-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="555-555-5555"
                    required
                    aria-required="true"
                    aria-invalid={errorField === "phone"}
                    aria-describedby={status === "error" ? "sub-error" : undefined}
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                    className="w-full bg-transparent border-0 text-white font-[family-name:var(--font-body)] text-[14px] py-3 px-0 outline-none placeholder:text-[#717171]"
                  />
                </div>
              ) : (
                <input
                  ref={phoneRef}
                  id="sub-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="Phone Number (optional)"
                  aria-invalid={errorField === "phone"}
                  aria-describedby={status === "error" ? "sub-error" : undefined}
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`${inputBase} ${borderClass(errorField === "phone")}`}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="sub-country" className="sr-only">Country</label>
              <select
                id="sub-country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${inputBase} ${borderClass(false)} appearance-none`}
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c} className="bg-black">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sub-zip" className="sr-only">Zip Code</label>
              <input
                id="sub-zip"
                name="zipCode"
                inputMode="numeric"
                placeholder="Zip Code"
                autoComplete="postal-code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={`${inputBase} ${borderClass(false)}`}
              />
            </div>
          </div>

          {/* Legally required SMS consent when collecting phone via Laylo. Keep
              this copy plus the label privacy link and both Laylo links. */}
          <p
            className="font-[family-name:var(--font-body)] text-[13px] text-center mb-5 leading-relaxed"
            style={{ color: "#717171" }}
          >
            By subscribing you agree to receive email and recurring automated marketing text
            messages. We will text you once to confirm your number, reply to opt in. Consent is
            not a condition of purchase. Message and data rates may apply. See the Big Machine
            Records{" "}
            <a
              href="/privacy"
              className="no-underline transition-colors duration-200 ease-out hover:text-white"
              style={{ color: "#C8C7C8" }}
            >
              Privacy Policy
            </a>
            , and Laylo&apos;s{" "}
            <a
              href="https://laylo.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-200 ease-out hover:text-white"
              style={{ color: "#C8C7C8" }}
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="https://laylo.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors duration-200 ease-out hover:text-white"
              style={{ color: "#C8C7C8" }}
            >
              Privacy Policy
            </a>
            .
          </p>

          <div className="text-center">
            <button
              type="submit"
              disabled={status === "loading"}
              className="font-[family-name:var(--font-display)] text-[16px] uppercase text-white px-10 py-3 border-none cursor-pointer transition-opacity duration-200 ease-out hover:opacity-85 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#CA2125" }}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {status === "error" && (
            <p
              id="sub-error"
              role="alert"
              aria-live="polite"
              className="font-[family-name:var(--font-body)] text-[14px] text-center mt-4"
              style={{ color: "#CA2125" }}
            >
              {errorMessage || "Something went wrong. Please try again."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
