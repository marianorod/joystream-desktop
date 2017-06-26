/**
 * Created by bedeho on 13/06/17.
 */

import machina from 'machina'
import {go} from '../utils'

import Downloading from './DownloadIncomplete'
import FinishedDownloading from './FinishedDownloading'

var Active = new machina.BehavioralFsm({

    initialize: function (options) {

        // Allocate sub machines
        options.states.DownloadIncomplete._child = new Downloading({parent_machine : this})
        options.states.FinishedDownloading._child = new FinishedDownloading({parent_machine : this})
    },

    //initialState: "StoppingExtension",

    states: {

        GoingToPassive : {

            Done : function (client) {
                //
            }

        }
    },

    go : go
}

export default Active