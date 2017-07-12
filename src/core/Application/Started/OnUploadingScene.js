/**
 * Created by bedeho on 12/06/17.
 */
const BaseMachine = require('../../BaseMachine')

var OnUploadingScene = new BaseMachine({
  states: {
    uninitialized: {
      showing_scene: function (client) {
        client.resetUploadingNotificationCounter()
        this.transition(client, 'idle')
      }
    },
    idle: {
      downloading_scene_selected: function (client) {
        this.go(client, '../OnDownloadingScene')
      },
      completed_scene_selected: function (client) {
        this.go(client, '../OnCompletedScene')
      },
      _reset: 'uninitialized'
    }
  }
})

module.exports = OnUploadingScene
