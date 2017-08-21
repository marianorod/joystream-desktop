import React, { Component } from 'react'
import { observer } from 'mobx-react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from '../../components/Header'
import Scene from '../../core/Application/Scene'

// Components
//import Sidebar from './components/Sidebar'
import VideoPlayer from '../../components/VideoPlayer'

// Our scenes
import NotStartedScene from '../NotStarted'
import Loading, {LoadingState} from '../Loading/LoadingScene'
import Terminating, {TerminatingState} from '../Terminating'
import Downloading from '../Downloading'
import Seeding from '../Seeding'
import Completed from '../Completed'
//import Wallet from '../Wallet'

import File from '../../utils/File'

let MobxReactDevTools
if (process.env.NODE_ENV === 'development') {
    MobxReactDevTools = require('mobx-react-devtools').default
}

@observer
class Application extends Component {

    constructor(props) {
        super(props)
    }

    render () {

        console.log('Application.render()')

        return(
            <MuiThemeProvider>
                <div className="app-container">
                    {this.renderActiveScene()}
                    {process.env.NODE_ENV === 'development' ? <div><MobxReactDevTools/></div> : null}
                    {this.renderVideoPlayer()}
                </div>
            </MuiThemeProvider>
        )
    }

    renderActiveScene() {

        switch(this.props.store.activeScene) {

            case Scene.NotStarted:
                return <NotStartedScene />

            case Scene.Loading:

                return <Loading loadingState={applicationStateToLoadingState(this.props.store.state)}
                                loadingTorrentsProgressValue={100*this.props.store.torrentLoadingProgress}/>

            case Scene.Downloading:

                return <NavigationFrame app={this.props.store}>
                            <Downloading torrents={this.props.store.torrentsDownloading}
                                         revenue={this.props.store.spending}
                                         downloadSpeed={this.props.store.totalDownloadSpeed}
                                         onStartDownloadClicked={() => {this.props.store.startDownload()}}
                                         state={this.props.store.state}
                                         torrentsBeingLoaded={this.props.store.torrentsBeingLoaded}
                                         store = {this.props.store}
                            />
                        </NavigationFrame>

            case Scene.Uploading:

                return <NavigationFrame app={this.props.store}>
                          <Seeding torrents={this.props.store.torrentsUploading}
                                   revenue={this.props.store.revenue}
                                   uploadSpeed={this.props.store.totalUploadSpeed}
                                   onStartUploadCliked={() => {console.log(" start uploading clicked")}}
                          />
                        </NavigationFrame>

            case Scene.Completed:

                return <NavigationFrame app={this.props.store}>
                            <Completed torrents={this.props.store.torrentsCompleted} />
                        </NavigationFrame>

            case Scene.ShuttingDown:

                return <Terminating terminatingState={applicationStateToTerminatingState(this.props.store.state)}
                                    terminatingTorrentsProgressValue={100*(this.props.store.torrentTerminatingProgress/this.props.store.torrentsToTerminate)} />
        }
    }

    renderVideoPlayer () {
      if (this.props.store.isPlaying) {
        var file = new File(this.props.store.isPlaying._torrent._client.torrent, 0)

        return (
          <VideoPlayer file={file} torrent={this.props.store.isPlaying} />
        )
      }
      return null
    }
}

Application.propTypes = {

}

const NavigationFrame = observer((props) => {

    return (
        <div className="navigation-frame-container">
            <Header app={props.app}/>
            {props.children}
        </div>
    )
})

function applicationStateToLoadingState(s) {

    let loadingState

    if(s == "Starting.InitializingResources" || s == "Starting.NotStarted")
        loadingState = LoadingState.InitializingResources
    else if(s== "Starting.initializingApplicationDatabase")
        loadingState = LoadingState.OpeningApplicationDatabase
    else if(s== "Starting.InitialializingSpvNode")
        loadingState = LoadingState.InitializingSPVNode
    else if(s == "Starting.OpeningWallet")
        loadingState = LoadingState.OpeningWallet
    else if(s == "Starting.ConnectingToBitcoinP2PNetwork")
        loadingState = LoadingState.ConnectingToBitcoinP2PNetwork
    else if(s.startsWith("Starting.LoadingTorrents"))
        loadingState = LoadingState.LoadingTorrents

    return loadingState
}

function applicationStateToTerminatingState(s) {

    let terminatingState

    if(s == "Stopping.TerminatingTorrents" || s == "Stopping.SavingTorrentsToDatabase" || s == "Stopping.uninitialized")
        terminatingState = TerminatingState.TerminatingTorrents
    else if(s == "Stopping.DisconnectingFromBitcoinNetwork")
        terminatingState = TerminatingState.DisconnectingFromBitcoinNetwork
    else if(s == "Stopping.ClosingWallet")
        terminatingState = TerminatingState.ClosingWallet
    else if(s == "Stopping.StoppingSpvNode")
        terminatingState = TerminatingState.StoppingSpvNode
    else if(s == "Stopping.ClosingApplicationDatabase")
        terminatingState = TerminatingState.ClosingApplicationDatabase
    else if(s == "Stopping.ClearingResources")
        terminatingState = TerminatingState.ClearingResources

    return terminatingState
}

export default Application
