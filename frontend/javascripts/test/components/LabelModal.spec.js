import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import LabelModal from '../../components/LabelModal'

function setup(labelModel) {
  const actions = {
    updateLabelModal: expect.createSpy(),
    closeLabelModal: expect.createSpy(),
    createLabel: expect.createSpy(),
    updateLabel: expect.createSpy()
  }

  const component = shallow(
    <LabelModal {...labelModel} {...actions} />
  )

  return {
    component: component,
    title: component.find('.LabelModal-title'),
    textarea: component.find('.LabelModal-textarea'),
    close: component.find('.LabelModal-close'),
    save: component.find('.LabelModal-save'),
    actions: actions
  }
}

describe('LabelModal component', () => {
  let labelModal = {
    isOpen: true,
    clientX: 0,
    clientY: 0,
    label: { id: 1, typ: 'keep', description: 'description' }
  }

  it('should display', () => {
    const { title, textarea } = setup(labelModal)
    expect(title.text()).toEqual('keep')
    expect(textarea.text()).toEqual('description')
  })

  it('should call textarea change', () => {
    const { textarea, actions } = setup(labelModal)
    textarea.simulate('change', {target: {value: 'update description'}})
    expect(actions.updateLabelModal).toHaveBeenCalled()
  })

  it('should call close button click', () => {
    const { close, actions } = setup(labelModal)
    close.simulate('click')
    expect(actions.closeLabelModal).toHaveBeenCalled()
  })

  it('should call save button click', () => {
    const { save, actions } = setup(labelModal)
    save.simulate('click')
    expect(actions.updateLabel).toHaveBeenCalled()
  })

  it('should call save button click', () => {
    let labelModal = {
      isOpen: true,
      clientX: 0,
      clientY: 0,
      label: { id: null, typ: 'keep', description: 'description' }
    }
    const { save, actions } = setup(labelModal)
    save.simulate('click')
    expect(actions.createLabel).toHaveBeenCalled()
  })
})

