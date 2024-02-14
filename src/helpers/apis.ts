const root = 'https://api.jsonbin.io/v3'
const bin  = import.meta.env.PUBLIC_BIN
const apiKey = import.meta.env.PUBLIC_API_KEY

const url= root + '/b/' +  bin

const headers = {
    'Content-Type': 'application/json',
    'X-Access-Key': apiKey
}

export const getBasket = async () => {
    const response = await fetch(url, { headers })
    if(response.status !== 200) {
        return {}
    }
    const json = await response.json()

    return  json.record.shoppingList ?? {}
}

export const updateBasket = async (shoppingList: Record<string, number>) => {
    const body = JSON.stringify({ shoppingList });
  
     const response = await fetch(url, {
        method: 'PUT',
        body,
        redirect: 'follow',
        headers,
      })
      const json = await response.json()

      return  json.record.shoppingList ?? {}
}