'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/utils/supabase/provider'

type Post = {
  id: string
  content: string
  user_id: string
  user_email: string
  created_at: string
}

export default function Page() {
  const { supabaseClient, session } = useSupabase()
const [posts, setPosts] = useState<Post[]>([])
const [content, setContent] = useState('')
const [email, setEmail] = useState('')

async function fetchPosts() {
  const { data } = await supabaseClient
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  setPosts(data ?? [])
}

  async function handlePost() {
    if (!content.trim()) return

    const user = session?.user

    const { error } = await supabase.from('posts').insert([
      {
        content,
        user_id: user.id,
        user_email: user.email,
      },
    ])

    if (error) {
      alert('Gagal post!')
      console.error(error)
    } else {
      setContent('')
      fetchPosts()
    }
  }

  async function signInWithEmail(e: any) {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithOtp({
      email,
    })

    if (error) {
      alert('Login gagal')
      console.error(error)
    } else {
      alert('Cek email lo untuk login link!')
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    location.reload()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main style={{ background: 'white', color: 'black', padding: '2rem', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Sosnet v3 🚀</h1>

      {!session ? (
        <form onSubmit={signInWithEmail} style={{ marginBottom: '2rem' }}>
          <input
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', marginBottom: '0.5rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#0070f3', color: 'white', border: 'none' }}>
            Login via Email
          </button>
        </form>
      ) : (
        <>
          <p>Logged in as: <strong>{session.user.email}</strong></p>
          <button onClick={handleLogout} style={{ marginBottom: '1rem', padding: '0.25rem 0.5rem' }}>
            Logout
          </button>

          <textarea
            placeholder="Apa yang lo pikirin hari ini?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', height: '100px', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <button onClick={handlePost} style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            Post
          </button>
        </>
      )}

      <hr style={{ margin: '2rem 0' }} />

      {posts.map((post) => (
        <div key={post.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem', paddingBottom: '1rem' }}>
          <p><strong>{post.user_email}</strong></p>
          <p>{post.content}</p>
          <small>{new Date(post.created_at).toLocaleString()}</small>
        </div>
      ))}
    </main>
  )
}
