import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import LabelFormContent from '../components/LabelFormContent'

require('jquery-ui/dialog')

class LabelForm {
  constructor() {
    this.dialog = null
    this.label = null
  }

  labelFormTitle(typ) {
    switch (typ) {
      case 'keep':
        return 'Keep'

      case 'problem':
        return 'Problem'

      case 'try':
        return 'Try'
    }
    return null
  }

  close() {
    ReactDOM.unmountComponentAtNode(this.dialog[0])
    this.dialog.remove()
    this.label = null
  }

  save() {
    let description = this.dialog.find('.js-description').val()
    if (description == '') {
      return
    }
    if (this.label.id) {
      this.actions.updateLabel(this.label.id, { typ: this.label.typ, description: description })
      this.close()
    } else {
      this.actions.createLabel({ typ: this.label.typ, description: description })
      this.dialog.find('.js-description').val('')
    }
  }

  open(label, clientX, clientY, actions) {
    if (this.dialog) {
      this.close()
    }
    this.label = label
    this.actions = actions
    this.dialog = $('<div></div>').dialog({
      title: this.labelFormTitle(label.typ),
      dialogClass: 'label-form__titlebar--' + label.typ,
      position: { my: 'left top', at: 'left+' + clientX + ' ' + 'top+' + clientY, of: window },
      close: this.close.bind(this),
      closeText: null,
      buttons: {save: this.save.bind(this)}
    })
    ReactDOM.render(<LabelFormContent label={label} save={this.save.bind(this)} />, this.dialog[0])
  }
}

export default LabelForm