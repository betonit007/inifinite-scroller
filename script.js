let count=10;
const apiKey="azz9zOBJxLEdH9XQriIbPBLq7sj03PHGRS5TOEYC1ww&query"

const baseURL = `https://api.unsplash.com/search/photos/?client_id=${apiKey}=bikini&count=${count}`

//Get Photos from unsplash API

async function getPhotos() {
    try {
        const response = await (await fetch(baseURL)).json()
        console.log(response)
    } catch (err) {
        console(err)
    }
}

getPhotos()