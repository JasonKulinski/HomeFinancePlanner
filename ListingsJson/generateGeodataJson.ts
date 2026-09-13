type GeoJsonFeatureCollection = {
    type: string
    name: string
    features: Feature[]
}

type Feature = {
    type: 'Feature'
    properties: Record<string, any>
    geometry: {
        type: 'Point'
        coordinates: [number, number]
    }
}

// Get all house listings in one array from all the input json files
const inputJson = []
const glob = new Bun.Glob('*_listings_*.json')
for await (const fileName of glob.scan('.')) {
    const file = Bun.file(fileName)
    const json = await file.json()
    inputJson.push(...json)
}

const houses: GeoJsonFeatureCollection = {
    type: 'FeatureCollection',
    name: 'maine_houses',
    features: [],
}
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

// Put all the listings in the correct form for Cesium
for (const house of inputJson) {
    houses.features.push({
        type: 'Feature',
        properties: {
            id: house.id,
            price: currencyFormatter.format(house.price),
        },
        geometry: {
            type: 'Point',
            coordinates: [house.longitude, house.latitude],
        },
    })
}

Bun.write('housing_geodata.json', JSON.stringify(houses))
export {}
