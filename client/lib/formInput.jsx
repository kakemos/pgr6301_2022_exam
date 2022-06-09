import React from "react";

export function FormInput({ label, value, onChangeValue }) {
  return (
    <div className="form-input">
      <div>
        <label>
          <strong>{label}</strong>{" "}
        </label>
      </div>
      <input
        className={"new-article-input"}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}

export function FormInputTextArea({ label, value, onChangeValue }) {
  return (
    <div className="form-input">
      <div>
        <label>
          <strong>{label}</strong>{" "}
        </label>
      </div>
      <textarea
        className={"new-article-input"}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}
