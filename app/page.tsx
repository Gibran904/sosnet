'use client'

import { useEffect, useState } from 'react'
import { useSupabase } from '@/utils/supabase/provider'

type Post = {
  id: string
  content: string
  email: string
  created_at: string
}

export default function Page() {
  const { supabaseClient, session } = useSupabase()
  const [posts, setPosts] = useState<Post[]>([])
  const [content, setContent] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabaseClient
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    setPosts(data ?? [])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content || !email) return

    const { error } = await supabaseClient.from('posts').insert({ content, email })
    if (!error) {
      setContent('')
      setEmail('')
      fetchPosts()
    } else {
      console.error('Insert error:', error)
    }
  }

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sosnet 🧠</h1>

      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          className="w-full p-2 border rounded"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="What’s happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-3 rounded shadow">
            <div className="text-sm text-gray-500">{post.email}</div>
            <div>{post.content}</div>
            <div className="text-xs text-gray-400">{new Date(post.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </main>
  )
}