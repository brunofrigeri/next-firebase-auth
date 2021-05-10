import Head from 'next/head'
import { useAuth } from '../lib/auth'
import Auth from '../components/Auth'
import fetcher from '../util/fetcher'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getUserData } from '../lib/db'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const { auth, signInWithEmailAndPassword } = useAuth()

  const { data } = useSWR(auth ? ['/api/user', auth.token] : null, fetcher)

  useEffect(async () => {
    if (data && data.uid) {
      const response = await getUserData(data.uid)
      setUser(response)
    }
  }, [data])

  return (
    <Auth>
      {!auth && (
        <form
          onSubmit={() => signInWithEmailAndPassword(email, password)}
          className="flex my-6 flex-col"
        >
          <input
            className="my-3 p-2 rounded-lg bg-gray-100 focus:shadow-2xl focus:bg-white focus:ring-2"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value)
            }}
            placeholder={'Email'}
          />
          <input
            className="my-3 p-2 rounded-lg bg-gray-100 focus:shadow-2xl focus:bg-white focus:ring-2"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value)
            }}
            type={'password'}
            placeholder={'Password'}
          />
          <button
            type="submit"
            className="mt-8 p-2 rounded-lg text-white font-bold bg-blue"
          >
            Sign in
          </button>
        </form>
      )}
      {user && <p className="text-xl">{user.data.name}</p>}
      {/* {user && } */}
    </Auth>
  )
}
