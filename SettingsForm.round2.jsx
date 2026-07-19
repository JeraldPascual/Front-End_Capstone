import { useState } from "react";

// --- Pure validators: kept outside the component so the test panel
// below can exercise them directly without touching the DOM. ---
export function validateName(value) {
  if (!value.trim()) return "Name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  if (value.trim().length > 50) return "Name must be 50 characters or fewer.";
  return "";
}

export function validateEmail(value) {
  if (!value.trim()) return "Email is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) return "Enter a valid email address.";
  return "";
}

export function validatePassword(value) {
  // Password is optional. Empty is valid — user is not changing it.
  if (!value) return "";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/\d/.test(value)) return "Password must include at least one number.";
  return "";
}

export function validateConfirmPassword(password, confirm) {
  if (!password) return ""; // nothing to confirm
  if (password !== confirm) return "Passwords do not match.";
  return "";
}

const initialState = { name: "", email: "", password: "", confirm: "" };
const initialErrors = { name: "", email: "", password: "", confirm: "" };
const initialTouched = { name: false, email: false, password: false, confirm: false };

export default function SettingsForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState(initialTouched);
  const [submitStatus, setSubmitStatus] = useState("");

  function runValidation(field, next) {
    switch (field) {
      case "name":
        return validateName(next.name);
      case "email":
        return validateEmail(next.email);
      case "password":
        return validatePassword(next.password);
      case "confirm":
        return validateConfirmPassword(next.password, next.confirm);
      default:
        return "";
    }
  }

  function handleChange(field, value) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: runValidation(field, next) }));
    }
    // Confirm depends on password — re-check it live if it's already touched.
    if (field === "password" && touched.confirm) {
      setErrors((prev) => ({
        ...prev,
        confirm: validateConfirmPassword(value, next.confirm),
      }));
    }
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: runValidation(field, values) }));
  }

  const isValid =
    !validateName(values.name) &&
    !validateEmail(values.email) &&
    !validatePassword(values.password) &&
    !validateConfirmPassword(values.password, values.confirm);

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    const allErrors = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirm: validateConfirmPassword(values.password, values.confirm),
    };
    setErrors(allErrors);
    if (Object.values(allErrors).every((e) => !e)) {
      setSubmitStatus("Settings saved.");
    }
  }

  const fieldConfig = [
    { name: "name", label: "Name", type: "text", autoComplete: "name" },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "password", label: "New password (optional)", type: "password", autoComplete: "new-password" },
    { name: "confirm", label: "Confirm new password", type: "password", autoComplete: "new-password" },
  ];

  return (
    <div className="mx-auto w-full max-w-md p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-4">
        {fieldConfig.map(({ name, label, type, autoComplete }) => {
          const errorId = `${name}-error`;
          const hasError = touched[name] && errors[name];
          return (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                value={values[name]}
                onChange={(e) => handleChange(name, e.target.value)}
                onBlur={() => handleBlur(name)}
                aria-invalid={hasError ? "true" : "false"}
                aria-describedby={hasError ? errorId : undefined}
                className={`mt-1 w-full rounded-md border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  hasError
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              <p id={errorId} role="alert" aria-live="polite" className="mt-1 min-h-[1.25rem] text-sm text-red-600">
                {hasError ? errors[name] : ""}
              </p>
            </div>
          );
        })}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
        >
          Save changes
        </button>

        <p aria-live="polite" className="text-sm text-green-700">
          {submitStatus}
        </p>
      </form>
    </div>
  );
}
