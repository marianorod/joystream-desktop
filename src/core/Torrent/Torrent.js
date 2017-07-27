/**
 * Created by bedeho on 11/07/17.
 */

var EventEmitter = require('events').EventEmitter
var util = require('util')

var TorrentStatemachine = require('./Statemachine/Torrent')

/// Torrent class

// Make event emitter
util.inherits(Torrent, EventEmitter)

/**
 * Constructor
 * @param session
 * @constructor
 */
function Torrent(store) {

    EventEmitter.call(this)

    this._client = new TorrentStatemachineClient(store)

    // Set initial state of store
    store.setState(TorrentStatemachine.compositeState(this._client))

    // Hook into state transitions in the machine
    TorrentStatemachine.on('transition', (data) => {

        // Check that the transition is on this torrent
        if(data.client != this._client)
            return

        // Get current state
        let stateString = TorrentStatemachine.compositeState(this._client)

        // Updat state in store
        store.setState(stateString)

        // Relay events for others to consume
        this.emit('transition', {
          transition : data,
          state : stateString
        })

        // Detect functional events?
        //  - Loaded: Lots of destination events?
        //  - 'Loading.WaitingForMissingBuyerTerms'
        //  - Terminated: emit event with payload client.deepInitialState

    })

}

/**
 * Begin torrent lifetime
 * @param infoHash
 * @param name
 * @param savePath
 * @param resumeData
 * @param metadata
 * @param deepInitialState
 * @param extensionSettings
 */
Torrent.prototype.startLoading = function(infoHash, name, savePath, resumeData, metadata, deepInitialState, extensionSettings) {
    this._client.processStateMachineInput('startLoading', infoHash, name, savePath, resumeData, metadata, deepInitialState, extensionSettings)
}

Torrent.prototype.addTorrentResult = function(err, torrent) {
    this._client.processStateMachineInput('addTorrentResult', err, torrent)
}

/**
 * Terminate torrent lifetime
 * @param generateResumeData whether generating resume data is wanted. Notice that even,
 * if this is true, resume data will not be generated.
 */
Torrent.prototype.terminate = function(generateResumeData) {
    this._client.processStateMachineInput('terminate', generateResumeData)
}

Torrent.prototype.currentState = function () {
  return TorrentStatemachine.compositeState(this._client)
}

Torrent.prototype.start = function () {
  this._client.processStateMachineInput('start')
}

Torrent.prototype.stop = function () {
  this._client.processStateMachineInput('stop')
}

Torrent.prototype.startPaidDownload = function (buyerTerms) {
  // TODO
}

Torrent.prototype.beginUpload = function (sellerTerms) {
  // TODO
}

Torrent.prototype.endUpload = function () {
  // TODO
}

/// TorrentStateMachineClient
/// Holds state and external messaging implementations for a (behavoural machinajs) Torrent state machine instance

function TorrentStatemachineClient(store) {
    this.store = store
}

TorrentStatemachineClient.prototype.processStateMachineInput = function (...args) {
  TorrentStatemachine.queuedHandle(this, ...args)
}

TorrentStatemachineClient.prototype.stopExtension = function() {

    this.torrent.stopPlugin( (err, res) => {

        LOG_ERROR("stopExtension", err)

        // Silent
        // this.processStateMachineInput('stopExtensionResult', err, res)
    })

}

TorrentStatemachineClient.prototype.startExtension = function() {

    this.torrent.startPlugin((err, resp) => {

        LOG_ERROR("startExtension", err)

        // Silent
        // this.processStateMachineInput('startExtensionResult', err, res)
    })
}

TorrentStatemachineClient.prototype.startLibtorrentTorrent = function() {

    this.torrent.handle.resume()
}

TorrentStatemachineClient.prototype.stopLibtorrentTorrent = function() {

    this.torrent.handle.pause()
}

TorrentStatemachineClient.prototype.generateResumeData = function() {

    this.torrent.handle.saveResume_data()
}

TorrentStatemachineClient.prototype.setLibtorrentInteraction = function(mode) {

    this.torrent.setLibtorrentInteraction (mode, (err) => {

        LOG_ERROR("setLibtorrentInteraction", err)

        // Silent
        // this.processStateMachineInput('setLibtorrentInteractionResult', err, res) // 'blocked'
    })
}

TorrentStatemachineClient.prototype.toObserveMode = function() {

    this.torrent.toObserveMode((err, res) => {

        LOG_ERROR("toObserveMode", err)

        // Silent
        // this.processStateMachineInput('toObserveModeResult', err, res)
    })
}

TorrentStatemachineClient.prototype.toSellMode = function(sellerTerms) {

    this.torrent.toSellMode(sellerTerms, (err, res) => {

        LOG_ERROR("toSellMode", err)

        // Silent
        // this.processStateMachineInput('toSellModeResult', err, res)
    })
}

TorrentStatemachineClient.prototype.toBuyMode = function(buyerTerms) {
    this.torrent.toBuyMode(buyerTerms, (err, res) => {

        LOG_ERROR("toBuyMode", err)

        // Silent
        // this.processStateMachineInput('toBuyModeResult', err, res)
    })
}

TorrentStatemachineClient.prototype.updateSellerTerms = function() {
    console.log('not yet implemented in bindings library')

    // Make silent
}

TorrentStatemachineClient.prototype.updateBuyerTerms = function() {
    console.log('not yet implemented in bindings library')

    // Make silent
}

TorrentStatemachineClient.prototype.startUploading = function(connectionId, buyerTerms, contractSk, finalPkHash) {

    this.torrent.startUploading(connectionId, buyerTerms, contractSk, finalPkHash, (err, res) => {
        this.processStateMachineInput('startUploadingResult', err, res)
    })
}

TorrentStatemachineClient.prototype.makeSignedContract = function(contractOutputs, contractFeeRate) {

    console.log("makeSignedContract not yet implemented")

}

TorrentStatemachineClient.prototype.startDownloading = function(contract, downloadInfoMap) {

    this.torrent.startDownloading(contract, downloadInfoMap, (err, res) => {
        this.processStateMachineInput('startDownloadingResult', err, res)
    })
}

function LOG_ERROR(source, err) {

    if(err)
        console.log(source,": Error found in callback:", err)
}

export default Torrent
