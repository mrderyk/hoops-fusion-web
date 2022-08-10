import { useUser } from '@auth0/nextjs-auth0'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Login: NextPage = () => {
  return (
    <div className={styles.container}>
      <Link href="/api/auth/login">Login</Link>
    </div>
  )
}

export default Login
