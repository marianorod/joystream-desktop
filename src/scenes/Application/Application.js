import React, { Component } from 'react'
import { Provider, observer } from 'mobx-react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Header from '../../components/Header'
import StatusBar,{ProgressStatusPanel} from '../../components/StatusBar'
import Scene from '../../core/Application/Scene'

// Components
//import ApplicationHeader from './components/ApplicationHeader'
import VideoPlayer from '../../components/VideoPlayer'

// Our scenes
import NotStartedScene from '../NotStarted'
import LoadingScene, {LoadingState} from '../Loading'
import TerminatingScene, {TerminatingState} from '../Terminating'
import Downloading from '../Downloading'
import Seeding from '../Seeding'
import Completed from '../Completed'
import OnBoarding from '../OnBoarding'
import ApplicationHeader from './components/ApplicationHeader'
//import Wallet from '../Wallet'

let MobxReactDevTools
if (process.env.NODE_ENV === 'development') {
    MobxReactDevTools = require('mobx-react-devtools').default
}

var UI_CONSTANTS = {
    primaryColor : '#496daf',
    labelTextHighlightColor : 'hsl(219, 41%, 42%)',
    darkPrimaryColor : 'hsla(219, 41%, 37%, 1)',
    darkestPrimaryColor : 'hsla(219, 41%, 26%, 1)',
    higlightColor : 'hsl(218, 41%, 30%)'
}

function getStyles(props) {

    return {
        innerRoot : {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
        }
    }
}

@observer
class Application extends Component {

    constructor(props) {
        super(props)
    }

    render () {

        let styles = getStyles(this.props)

        return (
            <MuiThemeProvider>
                <div style={styles.innerRoot}>

                    {
                            this.props.store.isPlaying
                        ?
                            this.renderVideoPlayer()
                        :
                            this.renderActiveScene()
                    }

                    <StatusBar show={this.props.store.torrentsBeingLoaded.length > 0}
                               bottom={true}
                    >
                        <ProgressStatusPanel title={'Loading torrents'}
                                             percentageProgress={this.props.store.startingTorrentCheckingProgressPercentage}
                        />

                    </StatusBar>

                    {
                            process.env.NODE_ENV === 'development'
                        ?
                            <div><MobxReactDevTools/></div>
                        :
                            null
                    }

                </div>
            </MuiThemeProvider>
        )
    }

    renderActiveScene() {

        let middleSectionColorProps = {
            middleSectionBaseColor : UI_CONSTANTS.primaryColor,
            middleSectionDarkBaseColor : UI_CONSTANTS.darkPrimaryColor,
            middleSectionHighlightColor :UI_CONSTANTS.higlightColor
        }

        switch(this.props.store.activeScene) {

            case Scene.NotStarted:
                return <NotStartedScene />

            case Scene.OnBoarding:
                return <OnBoarding onDoneClick={() => { this.props.store.onBoardingFinished() }}/>

            case Scene.Loading:

                return <LoadingScene loadingState={applicationStateToLoadingState(this.props.store.state)}/>

            case Scene.Downloading:
                return <NavigationFrame app={this.props.store}>
                            <Downloading torrents={this.props.store.torrentsDownloading}
                                         spending={this.props.store.totalSpent}
                                         downloadSpeed={this.props.store.totalDownloadSpeed}
                                         onStartDownloadClicked={() => {this.props.store.startDownloadWithTorrentFileFromFilePicker()}}
                                         onStartDownloadDrop={(files) => {this.props.store.startDownloadWithTorrentFileFromDragAndDrop(files)}}
                                         state={this.props.store.state}
                                         torrentsBeingLoaded={this.props.store.torrentsBeingLoaded}
                                         store={this.props.store}
                                         {...middleSectionColorProps}
                            />
                        </NavigationFrame>

            case Scene.Uploading:

                return <NavigationFrame app={this.props.store}>

                          <Seeding store={this.props.store}
                                   {...middleSectionColorProps}
                          />
                        </NavigationFrame>

            case Scene.Completed:

                return <NavigationFrame app={this.props.store}>
                            <Completed store={this.props.store}
                                       {...middleSectionColorProps}
                            />
                        </NavigationFrame>

            case Scene.ShuttingDown:

                return <TerminatingScene terminatingState={applicationStateToTerminatingState(this.props.store.state)}
                                         terminatingTorrentsProgressValue={100*(this.props.store.torrentTerminatingProgress/this.props.store.torrentsToTerminate)} />
        }
    }

    renderVideoPlayer () {

      if (this.props.store.isPlaying) {
        return (
          <VideoPlayer file={this.props.store.isPlaying.isPlaying} torrent={this.props.store.isPlaying._torrent} />
        )
      }
    }
}

Application.propTypes = {

}

const NavigationFrame = observer((props) => {

    let style = {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    }

    return (
        <div style={style}>
            <ApplicationHeader app={props.app}
                               height={'90px'}
                               accentColor={UI_CONSTANTS.primaryColor}
                                />
            {props.children}
        </div>
    )
})

function applicationStateToLoadingState(s) {

    let loadingState

    if(s === "Starting.uninitialized" || s === "Starting.InitializingResources" || s === "Starting.NotStarted")
        loadingState = LoadingState.InitializingResources
    else if(s === "Starting.initializingApplicationDatabase")
        loadingState = LoadingState.OpeningApplicationDatabase
    else if(s === "Starting.InitialializingSpvNode")
        loadingState = LoadingState.InitializingSPVNode
    else if(s === "Starting.OpeningWallet")
        loadingState = LoadingState.OpeningWallet
    else if(s === "Starting.ConnectingToBitcoinP2PNetwork")
        loadingState = LoadingState.ConnectingToBitcoinP2PNetwork
    else if(s.startsWith("Starting.LoadingTorrents"))
        loadingState = LoadingState.LoadingTorrents

    return loadingState
}

function applicationStateToTerminatingState(s) {

    let terminatingState

    if(s === "Stopping.TerminatingTorrents" || s === "Stopping.SavingTorrentsToDatabase" || s === "Stopping.uninitialized")
        terminatingState = TerminatingState.TerminatingTorrents
    else if(s === "Stopping.DisconnectingFromBitcoinNetwork")
        terminatingState = TerminatingState.DisconnectingFromBitcoinNetwork
    else if(s === "Stopping.ClosingWallet")
        terminatingState = TerminatingState.ClosingWallet
    else if(s === "Stopping.StoppingSpvNode")
        terminatingState = TerminatingState.StoppingSpvNode
    else if(s === "Stopping.ClosingApplicationDatabase")
        terminatingState = TerminatingState.ClosingApplicationDatabase
    else if(s === "Stopping.ClearingResources")
        terminatingState = TerminatingState.ClearingResources

    return terminatingState
}

export default Application
