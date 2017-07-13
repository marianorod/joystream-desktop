import { assert } from 'chai'
import sinon from 'sinon'
import os from 'os'
import path from 'path'

// babel-polyfill for generator (async/await)
import 'babel-polyfill'

import ASM from '../../../src/core/Application/ApplicationStateMachine'
import Client from '../../../src/core/Application/Client'
import Scene from '../../../src/core/Application/Scene'

describe('application statemachine', function () {
  let client = MockedClient()

  function handle (...args) {
    ASM.handle(client, ...args)
  }

  function machineState () {
    return ASM.compositeState(client)
  }

  function assertState (s) {
    assert.equal(machineState(), s)
  }

  before(function () {

  })

  after(function () {

  })

  it('starting up', function () {
    assertState('NotStarted')

    const config = {'port': 123}

    handle('start', config)

    assert(client.setConfig.calledWith(config))

    assertState('Starting.initializing_resources')

    handle('initialized_resources')
    handle('initialized_database')
    handle('initialized_spv_node')
    handle('initialized_wallet')
    handle('connected')
    handle('finished_loading')

    assertState('Started.OnDownloadingScene.idle')
    assert(client.setActiveScene.calledWith(Scene.Downloading))
  })

  it ('changing scenes', function () {
    handle('completed_scene_selected')
    assertState('Started.OnCompletedScene.idle')

    handle('uploading_scene_selected')
    assertState('Started.OnUploadingScene.idle')

    handle('downloading_scene_selected')
    assertState('Started.OnDownloadingScene.idle')
  })

  it('shutting down', function () {
    handle('stop')

    assertState('Stopping.terminating_torrents')

    handle('terminated')
    handle('disconnected')
    handle('closed') //
    handle('closed') // better to have unique names ?
    handle('closed') //
    handle('cleared')

    assertState('NotStarted')
  })

  it('multiple connection attempts bitcoin network', function () {
    assertState('NotStarted')

    const config = {'retryConnectingToBitcoinNetwork': 3}

    handle('start', config)
    assert.equal(client._state.connectToBitcoinNetworkAttemptsRemaining, 3)

    handle('initialized_resources')
    handle('initialized_database')
    handle('initialized_spv_node')
    handle('initialized_wallet')

    // 1st connection attempt
    assertState('Starting.connecting_to_bitcoin_p2p_network')
    assert.equal(client._state.connectToBitcoinNetworkAttemptsRemaining, 2)
    handle('failed')
    assertState('Starting.waiting_to_reconnect_to_bitcoin_p2p_network')

    // 2nd connection attempt (manually retry instead of waiting for timeout)
    handle('force_retry')
    assertState('Starting.connecting_to_bitcoin_p2p_network')

    assert.equal(client._state.connectToBitcoinNetworkAttemptsRemaining, 1)
    handle('failed')

    // 3rd (and last) connection attempt
    handle('force_retry')
    handle('failed')
    assertState('Stopping.disconnecting_from_bitcoin_p2p_network')
  })
})

function MockedClient () {
  let client = {}
  let _config

  Client.API.forEach(function (funcName) {
    client[funcName] = sinon.spy()
  })

  // hmm perhaps the config should be stored in the state machine's internal state
  // instead of by the core application which implements the client
  client.setConfig = sinon.spy(function (config) {
    _config = config
  })

  client.getConfig = sinon.spy(function () {
    return _config
  })

  return client
}
