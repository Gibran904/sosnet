"use client"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

// Ganti ini dengan URL & anon key dari Supabase lo
const supabase = createClient(
  "https://neurxtlohabhnwfuduql.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldXJ4dGxvaGFiaG53ZnVkdXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDUxODYsImV4cCI6MjA2NjY4MTE4Nn0.mc7s5chhuHriv8b6Pna1hfI0PkVWp3LKyTSWvICr_fw"
)

type Post = {
  id: string
  username: string
  content: string
  created_at: string
}

export default function Home() {
  const [username, setUsername] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState<Post[]>([])

  async function handlePost() {
    if (!username.trim() || !content.trim()) {
      alert("Isi dulu username & kontennya bro 😭")
      return
    }

    const { error } = await supabase.from("posts").insert([
      { username, content }
    ])

    if (error) {
      alert("Gagal posting. Cek console log!")
      console.error("POST ERROR:", error)
    } else {
      setContent("")
      fetchPosts()
    }
  }

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    setPosts(data ?? [])
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main style={{ backgroundColor: "white", color: "black", minHeight: "100vh", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>🧠 Sosnet v2</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", width: "100%" }}
      />

      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: "block", width: "100%", padding: "0.5rem", marginBottom: "0.5rem", height: "100px" }}
      />

      <button
        onClick={handlePost}
        style={{ padding: "0.5rem 1rem", backgroundColor: "#0070f3", color: "white", border: "none", borderRadius: "4px" }}
      >
        Post
      </button>

      <hr style={{ margin: "2rem 0" }} />

      <div>
        {posts.map((p) => (
          <div key={p.id} style={{ marginBottom: "1rem", padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
            <strong>@{p.username || "anon"}</strong>
            <p>{p.content}</p>
            <small style={{ color: "#888" }}>{new Date(p.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </main>
  )
}
