const API_BASE = "http://localhost:8081";

async function parseJsonSafely(res) {
  const contentType = res.headers.get("content-type");

  // If backend returns HTML (<!doctype html>), stop here
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Server returned invalid response");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

export async function createPaste(payload) {
  const res = await fetch(`${API_BASE}/api/pastes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return parseJsonSafely(res);
}

export async function fetchPaste(id) {
  const res = await fetch(`${API_BASE}/api/pastes/${id}`, {
    method: "GET"
  });

  return parseJsonSafely(res);
}
