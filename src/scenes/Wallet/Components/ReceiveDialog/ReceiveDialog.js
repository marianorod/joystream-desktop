/**
 * Created by bedeho on 21/11/2017.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import QRCodeForm from './QRCodeForm'
import StringForm from './StringForm'
import Dialog from '../../../../components/Dialog'

import {ReceiveDialogStore} from '../../Stores'

const ReceiveDialog = observer((props) => {

  let visibleDialog = !!props.receiveDialogStore
  let onRequestClose = () => {}
  let form = null

  if(visibleDialog) {

    onRequestClose = props.receiveDialogStore.close

    let formProps = {
      address : props.receiveDialogStore.receiveAddress,
      onFlipClick : props.receiveDialogStore.flipAddressDisplayMode,
      onClose : props.receiveDialogStore.close
    }

    form =
        props.receiveDialogStore.showAddressAsQRCode
      ?
        <QRCodeForm {...formProps}/>
      :
        <StringForm {...formProps}/>
  }

  return (
    <Dialog title={null}
            open={visibleDialog}
            onRequestClose={onRequestClose}
            width={'600px'}
    >
      {form}
    </Dialog>
  )
})

ReceiveDialog.propTypes = {
  receiveDialogStore : PropTypes.instanceOf(ReceiveDialogStore)
}

export default ReceiveDialog