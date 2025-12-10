
"use client";

import { useState } from "react";

export default function Home() {
  const [buyer, setBuyer] = useState("");
  const [seller, setSeller] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ buyer, seller }),
    });

    const blob = await res.blob();

    // download file
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sale-deed.docx";
    document.body.appendChild(a);
    a.click();
    a.remove();

    setLoading(false);
  }

  return (
    <div>
      <h1>Simple Sale Deed Generator</h1>

      <div>
        <label>Buyer Name</label><br />
        <input value={buyer} onChange={(e) => setBuyer(e.target.value)} />
      </div>

      <div>
        <label>Seller Name</label><br />
        <input value={seller} onChange={(e) => setSeller(e.target.value)} />
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}
