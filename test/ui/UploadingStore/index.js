import UploadingStore from '../../../src/scenes/Seeding/Stores/'
import TorrentTableRowStore from '../../../src/scenes/Common/TorrentTableRowStore'

var assert = require('chai').assert

const createInitialValues = () => {
  return [
    { // UIStore
      applicationStore: {
        walletStore: {}
      }
    }
  ]
}

describe('UploadingStore', function () {
  let uploadingStore, initialValues

  beforeEach(function () {
    initialValues = createInitialValues()
    uploadingStore = new UploadingStore(...initialValues)
  })

  it('constructor initializes empty infoHash to TorrentTableRowStore map', function () {
    assert.equal(uploadingStore.torrentRowStores.length, 0)
    assert.equal(uploadingStore.state, UploadingStore.STATE.InitState)
  })

  it('computes rows', function () {
    uploadingStore.setRowStorefromTorrentInfoHash(new Map([
      ['a', {infoHash: 'a', isUploading: true}],
      ['b', {infoHash: 'b', isUploading: false}]
    ]))

    assert.equal(uploadingStore.torrentRowStores.length, 1)
  })

  describe('addTorrentStore', function () {
    const infoHash1 = 'infoHash-1'
    beforeEach(function () {
      uploadingStore.setRowStorefromTorrentInfoHash(new Map([
        [infoHash1, {infoHash: infoHash1}]
      ]))
    })

    it('adds new torrent row store to map', function () {
      const newTorrentStore = { infoHash: 'infohash-2', state:'Active.FinishedDownloading.Uploading' }

      // let numberOfTorrentStores = uploadingStore.torrentRowStores.length

      uploadingStore.addTorrentStore(newTorrentStore)

      // assert.equal(uploadingStore.torrentRowStores.length, numberOfTorrentStores + 1)
      //
      // const addedRowStore = uploadingStore.torrentRowStores.slice(-1).pop()
      //
      // assert(addedRowStore instanceof TorrentTableRowStore)

      assert(uploadingStore.rowStorefromTorrentInfoHash.has(newTorrentStore.infoHash))
      // assert.deepEqual(uploadingStore.rowStorefromTorrentInfoHash.get(newTorrentStore.infoHash), addedRowStore)
    })

    it('throws if duplicate infoHash', function () {
      const duplicateTorrentStore = {infoHash: infoHash1}

      assert.throws(function () {
        uploadingStore.addTorrentStore(duplicateTorrentStore)
      })
    })
  })

  describe('removeTorrentStore', function () {
    const infoHash1 = 'infoHash-1'
    beforeEach(function () {
      uploadingStore.setRowStorefromTorrentInfoHash(new Map([
        [infoHash1, {infoHash: infoHash1}]
      ]))
    })

    it('removes store from map', function () {
      assert(uploadingStore.rowStorefromTorrentInfoHash.has(infoHash1))
      uploadingStore.removeTorrentStore(infoHash1)
      assert(!uploadingStore.rowStorefromTorrentInfoHash.has(infoHash1))
    })

    it('throws on removing store which does not exist', function () {
      assert.throws(function () {
        uploadingStore.removeTorrentStore('infohash-2')
      })
    })
  })
})
