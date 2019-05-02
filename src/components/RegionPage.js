import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegionMap from './RegionMap'
import { getData } from '../actions/crops'
import classNames from 'classnames'
const fullViewPort = () => ({
    height: `${window.innerHeight}px`,
    width: `${window.innerWidth - 30}px`
})

export class RegionPage extends React.Component {
    static propTypes = {
        region: PropTypes.object,
        dispatch: PropTypes.func,
    }
    constructor(props) {
        super(props)
        this.onBinSelect = this.onBinSelect.bind(this)
        this.props.dispatch(getData())
    }
    render() {
        if (!this.props.region) {
            return <div />
        }
        if (!this.currentBin) {
            this.currentBin = this.props.region.productResults[0].binSets[0]
        }
        return (
            <div style={Object.assign(fullViewPort(), { position: 'relative' })} >
                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                    <RegionMap
                        region={this.props.region}
                        currentBin={this.currentBin}
                    />
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: 0,
                    zIndex: 1500,
                    backgroundColor: '#FFF',
                    opacity: '0.7',
                    width: '100%',
                    overflowX: 'auto'
                }}>

                    {
                        this.props.region.productResults[0].binSets.map((b, idx) => {
                            return (
                                <button
                                    className={
                                        classNames("btn", {
                                            'btn-light': b !== this.currentBin,
                                            'btn-primary': b === this.currentBin,
                                        })
                                    }
                                    key={idx} onClick={this.onBinSelect.bind(this, b)}>
                                    {b.binName}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    onBinSelect(bin) {
        this.currentBin = bin
        this.forceUpdate();
    }
}

function mapStateToProps(state) {
    return {
        region: state.crops.region,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegionPage);
