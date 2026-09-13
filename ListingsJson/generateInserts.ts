// Get all house listings in one array from all the input json files
const inputJson = []
const glob = new Bun.Glob('*_listings_*.json')
for await (const fileName of glob.scan('.')) {
    const file = Bun.file(fileName)
    const json = await file.json()
    inputJson.push(...json)
}

let sqlStatement = `INSERT INTO Homes (Id, Address, City, State, ZipCode, ListPrice, Bedrooms, Bathrooms, SquareFeet, Latitude, Longitude, LotSize)
VALUES `

// Put all the listings in the correct form for SQL
let i = 0
for (const house of inputJson) {
    let row = `(${i},'${house.formattedAddress === undefined ? 'NULL' : house.formattedAddress}','${house.city === undefined ? 'NULL' : house.city}','${house.state === undefined ? 'NULL' : house.state}','${house.zipCode === undefined ? 'NULL' : house.zipCode}',${house.price === undefined ? 'NULL' : house.price},${house.bedrooms === undefined ? 'NULL' : house.bedrooms},${house.bathrooms === undefined ? 'NULL' : house.bathrooms},${house.squareFootage === undefined ? 'NULL' : house.squareFootage},${house.latitude === undefined ? 'NULL' : house.latitude},${house.longitude === undefined ? 'NULL' : house.longitude},${house.lotSize === undefined ? 'NULL' : house.lotSize})`
    if (i === inputJson.length - 1) row += ';'
    else row += ','
    row += '\n'
    sqlStatement += row
    i++
}

Bun.write('insert_houses.sql', sqlStatement)
export {}
