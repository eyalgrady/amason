import React from "react";

export default function FormWrapper({ title, children }) {
  return (
    <div>
      <h2 style={{ margin: "0", marginBottom: "2rem" }}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
