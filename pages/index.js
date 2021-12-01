import {useEffect, useState} from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const res = await fetch(`api/getStatus`)
    const json = await res.json()
    setData(json)
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>The newboston status page (alpha)</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>TheNewboston Network Status</h1>
        </div>
        <div>
          {!data && (<span>Loading</span>)}
          {data && Object.entries(data)?.map(([key, response]) => {
            return (
              <div className={styles.separator} key={key.trim()}>
                <p>{key} {response.value?.url} </p>
                <p>Expiry {response.expire} <span className={response.value?.data ? styles.up : styles.down}>{response.value?.data ? "OK" : "DOWN"}</span></p>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  )
}