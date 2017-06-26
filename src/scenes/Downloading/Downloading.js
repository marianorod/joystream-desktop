import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'

import TorrentTable from './TorrentTable'

constDownloading = (props) => {

    return (
        <div className="downloading-scene-container">

            <section className="middle-section">

                <div className="indicators">
                    <span className="flex-spacer"></span>
                    <span className="label">Revenue</span>
                    <span className="quantity">{props.revenue} B</span>
                    <span className="vertical-bar"></span>
                    <span className="label">Bandwidth</span>
                    <span className="quantity">{props.downloadSpeed} Kb/s</span>
                </div>

                <div className="toolbar-section">

                    <div className="heading">
                        <h1>Downloading</h1>
                        <h2> {props.torrents.length} downloads</h2>
                    </div>
                    <div className="vertical-bar"></div>
                    <div className="button-section">
                        <div className="button" onClick={props.onStartDownloadClicked}>Start Download</div>
                    </div>

                </div>

            </section>

            <TorrentTable torrents={props.torrents} />

        </div>
    )
}

Downloading.propTypes = {
    torrents : PropTypes.array.isRequired,
    revenue : PropTypes.number.isRequired,
    downloadSpeed : PropTypes.number.isRequired,
    onStartDownloadClicked : PropTypes.func.isRequired
}

export default Downloading
