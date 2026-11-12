"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok || !response.body) {
        const data = await response.json();
        throw new Error(data.error || "Request failed.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          for (const line of event.split("\n")) {
            if (!line.startsWith("data: ")) continue;

            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;

              if (typeof token === "string") {
                setAnswer((previous) => previous + token);
              }
            } catch {
              // Ignore incomplete or non-JSON stream events.
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{
      maxWidth: 760,
      margin: "60px auto",
      padding: 24,
      fontFamily: "system-ui, sans-serif",
    }}>
      <h1>IS373 — Streaming AI Chat</h1>
      <p>First experiment: streaming generation. RAG retrieval comes next.</p>

      <form onSubmit={ask}>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask a question..."
          rows={4}
          maxLength={2000}
          style={{
            width: "100%",
            padding: 12,
            border: "1px solid #888",
            borderRadius: 8,
            color: "#111",
            background: "#fff",
          }}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          style={{
            marginTop: 12,
            padding: "10px 18px",
            borderRadius: 8,
            background: "#245fc4",
            color: "white",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </form>

      {error && <p style={{ color: "#c33" }}>Error: {error}</p>}

      <section style={{ marginTop: 32, whiteSpace: "pre-wrap" }}>
        <h2>Response</h2>
        <p>{answer || (loading ? "Waiting for response..." : "No response yet.")}</p>
      </section>
    </main>
  );
}
