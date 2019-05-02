import React, { Component } from 'react'
import { Map, TileLayer, Polygon, ImageOverlay } from 'react-leaflet'
import { PropTypes } from 'prop-types'
const fullViewPort = {
    height: `${window.innerHeight}px`,
    width: `${window.innerWidth - 30}px`
}
export default class ViewportExample extends Component {
    static propTypes = {
        region: PropTypes.object,
        currentBin: PropTypes.object,
    }
    render() {
        return (
            <div>
                <Map
                    onClick={this.onClickReset}
                    onViewportChanged={this.onViewportChanged}
                    viewport={{
                        center: this.props.region.RegionPolygon.center,
                        zoom: 12.0,
                    }}
                    style={fullViewPort}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polygon color="purple" positions={this.props.region.RegionPolygon.points} />
                    <ImageOverlay
                        url={this.props.currentBin.imageUrl}
                        bounds={this.props.currentBin.imageBB}
                    />
                </Map>
            </div>

        )
    }
}