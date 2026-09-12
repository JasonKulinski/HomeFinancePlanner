import AffordabilityCalculator from './components/AffordabilityCalculator'
import { Cartesian3, Ion, IonGeocodeProviderType } from 'cesium'
import { useEffect } from 'react'
import { Entity, EntityDescription, GooglePhotorealistic3DTileset, PointGraphics, Viewer } from 'resium'

Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IllkdFFDMkFiOW45TXZPb0siLCJqdGkiOiI2ZDVjNmExZC1iNGZiLTRlZDgtYjJiZi0xMjZjN2JmZTJiMGIiLCJpZCI6NDkxMzQxLCJpc3MiOiJodHRwczovL2FwaS5jZXNpdW0uY29tIiwiYXVkIjoidW5kZWZpbmVkX2RlZmF1bHQiLCJpYXQiOjE3ODkyMzk4MzZ9._0SlTFQOOIYzm_IdBuqunFbrqu4Xulbad2cIimyIhvU'
const position = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100)
const pointGraphics = { pixelSize: 100 }

export default function App() {
    // async function test() {
    //     const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207)
    // }

    // useEffect(() => {
    //     test
    // }, [])

    return (
        <main className='page'>
            <header className='page-header'>
                <h1>Ledger</h1>
                <p className='tagline'>Work out what a home in your area actually costs you — to save for, and to keep.</p>
            </header>
            <AffordabilityCalculator />
            <Viewer
                full
                timeline={false}
                navigationHelpButton={false}
                // geocoder={IonGeocodeProviderType.GOOGLE}
                baseLayerPicker={false}
                sceneModePicker={false}
                homeButton={false}
                fullscreenButton={false}
                projectionPicker={false}
            >
                <Entity position={position} point={pointGraphics}>
                    <PointGraphics pixelSize={10} />
                    <EntityDescription>
                        <h1>Hello, world.</h1>
                        <p>JSX is available here!</p>
                    </EntityDescription>
                </Entity>
            </Viewer>
        </main>
    )
}
