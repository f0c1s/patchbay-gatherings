const h = require('mutant/h')
const nest = require('depnest')
const { isGathering } = require('ssb-gathering-schema')

exports.needs = nest({
  'message.html.layout': 'first',
  'message.html.decorate': 'reduce'
})

exports.gives = nest({
  'message.html.render': true
})

exports.create = function (api) {
  return nest({
    'message.html.render': renderGathering
  })

  function renderGathering (msg, { pageId } = {}) {
    if (!isGathering(msg)) return

    const layout = pageId ? 'show' : 'card'
    const element = h('div', { attributes: { tabindex: '0' } },
      api.message.html.layout(msg, { layout })
    )

    return api.message.html.decorate(element, { msg })
  }
}
