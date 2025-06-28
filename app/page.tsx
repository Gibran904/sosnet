"use client"
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://xxxxx.supabase.co', 
  'your-anon-key-here'
)

export default function Home() {
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState([])

  async function handlePost() {
    await supabase.from('posts').insert({ content })
    setContent('')
    fetchPosts()
  }

  async function fetchPosts() {
    let { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data)
  }

  useEffect(() => { fetchPosts() }, [])

  return (
    <main>
      <h1>✨ Sosnet ✨</h1>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handlePost}>Post</button>

      <div>
        {posts.map(p => (
          <p key={p.id}>{p.content}</p>
        ))}
      </div>
    </main>
  )
}
