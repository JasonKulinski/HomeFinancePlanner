import { Cartesian3, Cartesian2, Color, Ion } from 'cesium'
import { Viewer, Entity, PointGraphics, LabelGraphics, EntityDescription } from 'resium'
import houseGeoData from '../resources/housing_geodata.json'

Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IllkdFFDMkFiOW45TXZPb0siLCJqdGkiOiI2ZDVjNmExZC1iNGZiLTRlZDgtYjJiZi0xMjZjN2JmZTJiMGIiLCJpZCI6NDkxMzQxLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODkyMzk4MzZ9._0SlTFQOOIYzm_IdBuqunFbrqu4Xulbad2cIimyIhvU'

export default function Map() {
    return (
        <main className='page'>
            <header className='page-header'>
                <h1>Map</h1>
                <p className='tagline'>Find homes you're interested in.</p>
            </header>
            <Viewer
                timeline={false}
                navigationHelpButton={false}
                // geocoder={IonGeocodeProviderType.GOOGLE}
                baseLayerPicker={false}
                sceneModePicker={false}
                homeButton={false}
                fullscreenButton={false}
                projectionPicker={false}
                full
                infoBox
                selectionIndicator
            >
                {houseGeoData.features.map((house: any, i: number) => {
                    const [lng, lat] = house.geometry.coordinates
                    const { price, address, buildDate, name, id: houseId } = house.properties

                    return (
                        <Entity key={i} id={houseId} name={name} position={Cartesian3.fromDegrees(lng, lat, 0)}>
                            <EntityDescription>
                                <div style={{ padding: '4px;' }}>
                                    <b>Price:</b> {price}
                                    <br />
                                    <b>Address:</b> {address}
                                    <br />
                                    <b>Built:</b> {buildDate}
                                </div>
                            </EntityDescription>
                            <PointGraphics pixelSize={12} color={Color.ORANGE} outlineColor={Color.WHITE} outlineWidth={2} />
                            <LabelGraphics
                                text={price}
                                font='14px sans-serif'
                                fillColor={Color.WHITE}
                                outlineColor={Color.BLACK}
                                outlineWidth={3}
                                style={2}
                                pixelOffset={new Cartesian2(0, -25)}
                                verticalOrigin={1}
                                showBackground
                                backgroundColor={new Color(0, 0, 0, 0.6)}
                            />
                        </Entity>
                    )
                })}
            </Viewer>
        </main>
    )
}
