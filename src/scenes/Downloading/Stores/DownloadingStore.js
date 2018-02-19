import { observable, action, computed } from 'mobx'
import { TorrentInfo } from 'joystream-node'
import TorrentTableRowStore from '../../Common/TorrentTableRowStore'
import { remote } from 'electron'
import DeepInitialState from '../../../core/Torrent/Statemachine/DeepInitialState'

/**
 * User interface store for downloading scene
 */
class DownloadingStore {
  
  static STATE = {
    InitState: 0,
    
    // Part of flow to add a torrent file for downloading.
    // NB: Consider factoring out later?
    TorrentBeingAdded: 1,
    TorrentFileWasInvalid: 2,
    TorrentAlreadyAdded: 3
  }
  
  /**
   * {Map.<TorrentTableRowStore>} Maps info hash to the row store for the corresponding torrent
   * Notice that this is not observable for rendering actual table, see `tableRowStores` below.
   */
  @observable rowStorefromTorrentInfoHash

  /**
   * {DownloadingStore.STATE} Current state of scene
   **/
  @observable state
  
  /**
   * NB as above
   * @observable startDownloadingFlowStore
   */
  
  constructor (uiStore) {

    this._uiStore = uiStore

    this.setRowStorefromTorrentInfoHash(new Map())
    this.setState(DownloadingStore.STATE.InitState)
  }

  @action.bound
  addTorrentStore(torrentStore) {

    if(this.rowStorefromTorrentInfoHash.has(torrentStore.infoHash))
      throw Error('Torrent store for same torrent already exists.')

    let row = new TorrentTableRowStore(torrentStore, this._uiStore.applicationStore, this._uiStore.applicationStore.walletStore, false)
    
    this.rowStorefromTorrentInfoHash.set(torrentStore.infoHash, row)
  }

  @action.bound
  removeTorrentStore(infoHash) {

    if(!this.rowStorefromTorrentInfoHash.has(infoHash))
      throw Error('No corresponding torrent store exists.')

    this.rowStorefromTorrentInfoHash.delete(infoHash)
  }

  @action.bound
  setRowStorefromTorrentInfoHash(rowStorefromTorrentInfoHash) {
    this.rowStorefromTorrentInfoHash = rowStorefromTorrentInfoHash
  }

  @action.bound
  setState (newState) {
    this.state = newState
  }

  acceptTorrentFileWasInvalid () {
    this.setState(DownloadingStore.STATE.InitState)
  }

  retryPickingTorrentFile () {
    this.setState(DownloadingStore.STATE.InitState)
    
    this.startDownloadWithTorrentFileFromFilePicker()
  }

  acceptTorrentWasAlreadyAdded () {
    this.setState(DownloadingStore.STATE.InitState)
  }
  
  /**
   * Returns array of row stores, in the order they should be listed in the table.
   * @returns Array.<TorrentTableRowStore>
   */
  @computed get
  torrentRowStores () {
    
    /**
     * In the future we could compute different sorting based on whatever
     * the user has requested, e.g. by a particular column value.
     * For now we just do naive insertion order into `rowStorefromTorrentInfoHash` map.
     */
  
    return [...this.rowStorefromTorrentInfoHash.values()]
  }
  
  @computed get
  totalDownloadSpeed () {
    
    return this.torrentRowStores.reduce((accumulator, row) => {
      return accumulator + row.torrentStore.downloadSpeed
    }, 0)
  }
  
  @computed get
  canAddTorrent() {
    this.state === DownloadingStore.STATE.InitState
  }

  startDownloadWithTorrentFileFromFilePicker () {
  
    // If the user tries adding when we are not ready,
    // then we just ignore, but UI should avoid this ever
    // happening in practice
    if(!this.canAddTorrent)
      throw Error('Can only initiate downloading torrent filepicker in InitState.')
    
    // Allow user to pick a torrent file
    var filesPicked = remote.dialog.showOpenDialog({
      title: 'Pick torrent file',
      filters: [
        {name: 'Torrent file', extensions: ['torrent']},
        {name: 'All Files', extensions: ['*']}
      ],
      properties: ['openFile']}
    )

    // If the user did no pick any files, then we are done
    if (!filesPicked || filesPicked.length === 0) {
      return
    }
    
    this._addTorrent(filesPicked[0])
    
  }

  startDownloadWithTorrentFileFromDragAndDrop (files) {
    
    // If the user tries adding when we are not ready,
    // then we just ignore, but UI should avoid this ever
    // happening in practice
    if(!this.canAddTorrent)
      throw Error('Can only initiate downloading from drag&drop torrent in InitState.')
    
    // If the user did no pick any files, then we are done
    if (!files || files.length === 0) {
      return
    }

    // Try to start download based on torrent file name
    this._addTorrent(files[0].path)
  }

  _addTorrent (torrentFileName) {
    
    /// Read torrent file data
    let torrentFileData
  
    try {
      
      // NB: Later make async to not block, and introduce state+ui
      torrentFileData = fs.readFileSync(torrentFileName)
      
    } catch (e) {
  
      // NB: Add fail dialog UI state for this
      
      console.log('Failed to load torrent file: ' + torrentFileName)
      console.log(e)
      return
    }
  
    /// Parse torrent file from data
    let torrentInfo

    try {
      
      // NB: Add ui state to indicate blocking process here
      
      torrentInfo = new TorrentInfo(torrentFileData)
    } catch (e) {
      this.setState(DownloadingStore.STATE.TorrentFileWasInvalid)
      return
    }
    
    // Make downloading settings
    let settings = {
      infoHash : torrentInfo.infoHash(),
      metadata : torrentInfo,
      resumeData : null,
      name: torrentInfo.name(),
      savePath: this._uiStore.applicationStore.applicationSettings.downloadFolder(),
      deepInitialState: DeepInitialState.DOWNLOADING.UNPAID.STARTED,
      extensionSettings : {
        buyerTerms: this._uiStore.applicationStore.applicationSettings.defaultBuyerTerms()
      }
    }
    
    /// Try to add torrent
    this.setState(DownloadingStore.STATE.TorrentBeingAdded)
  
    this._uiStore.applicationStore.addTorrent(settings, (err, torrentStore) => {
      
      if(err) {
        
        // NB: could there be some other issue here? if so, can we reliably decode it
        // requires further inspection, for now we just presume i
        
        this.setState(DownloadingStore.STATE.TorrentAlreadyAdded)
        
      } else {
        
        // NB: Do something with `torrentStore`, e.g. add to alert notification queue!
  
        this.setState(DownloadingStore.STATE.InitState)
      }
      
    })
  }

}

export default DownloadingStore
