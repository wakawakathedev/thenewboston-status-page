import cache from 'memory-cache'

const ApprovedNodes = [{
  name: "PV",
  url: "http://52.52.160.149/config"
}, {
  name: "CV",
  url: "http://54.241.48.170/config"
}, {
  name: "main bank",
  url: "http://54.183.16.194/config"
}, {
  name: "keysign",
  url: "https://bank.keysign.app/config"
}]

function fetchWithTimeout (url, timeout = 3000) {
  return Promise.race([
      fetch(url),
      new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Url Timed out`)), timeout)
      )
  ]);
}

async function getStatus(url) {
  try {
    const res = await fetchWithTimeout(url)
    if (res.status === 200) {
      // const data = await res.json()
      return { url, data: "Ok" }
    }
  } catch (error) {
    if (error) {
      return { url, error: error.message }
    }
  }
}



export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600');

  for await (const node of ApprovedNodes) {
    const status = await getStatus(node.url)
    const key = cache.get(node.name)
    if (key === undefined || key === null) {
      cache.put(node.name, status, 3600000)
    }
  }

  res.status(200).json(cache.exportJson(), null, 2)
}
