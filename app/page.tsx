"use client"
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Ganti ini dengan URL dan anon key lo
const supabase = createClient(
  'https://neurxtlohabhnwfuduql.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldXJ4dGxvaGFiaG53ZnVkdXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMDUxODYsImV4cCI6MjA2NjY4MTE4Nn0.mc7s5chhuHriv8b6Pna1hfI0PkVWp3LKyTSWvICr_fw'
)

type Post = {
  id: string
  content: string
  created_at: string
}

export default function Home() {
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState<Post[]>([])

  async function handlePost() {
    await supabase.from('posts').insert({ content })
    setContent('')
    fetchPosts()
  }

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data ?? []) // fix di sini ✅
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main>
      <h1>🧠 Sosnet v1</h1>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handlePost}>Post</button>

      <div>
        {posts.map((p) => (
          <p key={p.id}>{p.content}</p>
        ))}
      </div>
    </main>
  )
}
