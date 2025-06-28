"use client"
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// Ganti ini dengan URL dan anon key lo
const supabase = createClient(
  'https://xxxx.supabase.co',
  'your-anon-key'
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
