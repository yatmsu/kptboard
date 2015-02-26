app = @app

class app.LabelForm
  constructor: (selector, options) ->
    @options = options
    @form = jQuery(selector)
    @form.find('.description').val('')
    @form.find('.description').keydown (e) =>
      @save() if e.keyCode == 13

    @form.data(typ: '')
    @form.data(id: '')
    @form.dialog
      autoOpen: false
      close: @close
      buttons:
        save: @save

  save: =>
    label = @getLabel()
    return unless label.description
    @options.save label

  setLabel: (label) ->
    @form.data(typ: label.typ)
    @form.data(id: label.id) if label.id?
    @form.find('.description').val(label.description)

  getLabel: ->
    label = {typ: @form.data('typ'),  description: @form.find('.description').val()}
    id = @form.data('id')
    label.id = id unless id is ''
    label

  clear: ->
    @form.data(typ: '')
    @form.data(id: '')
    @form.find('.description').val('')

  open: (e, label) ->
    @setLabel label
    title = switch label.typ
              when 'keep' then 'Keep'
              when 'problem' then 'Problem'
              when 'try' then 'Try'
    @form.dialog(title: title, dialogClass: "label-form__titlebar--#{label.typ}", position: {my: 'left top', at: "left+#{e.clientX} top+#{e.clientY}", of: window}).dialog('open')

  close: =>
    @clear()
    @form.dialog('close')