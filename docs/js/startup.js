/* global hljs */

window.addEventListener('DOMContentLoaded', function () {
  var slice = Array.prototype.slice

  slice.call(document.querySelectorAll('pre code'))
    .forEach(function (block) {
      hljs.highlightBlock(block)
    })

  var nomatch = document.querySelector('#no-match')
  var sections = slice.call(document.querySelectorAll('section')).filter(e => e.id !== 'no-match')
  var types = sections.map(section => section.querySelector('p:first-of-type')).map(p => p.textContent.toLowerCase())
  var links = slice.call(document.querySelectorAll('.container .left ul li a'))

  var search = document.querySelector('#search')

  let shown = sections.length

  function filterElements (input) {
    if (input.length > 0) {
      sections.forEach(hideSection(input.toLowerCase()))
      links.forEach(hideLink(input.toLowerCase()))
      if (shown === 0) {
        nomatch.style.display = 'block'
      } else {
        hideElement(nomatch)
      }
    } else {
      hideElement(nomatch)
      sections.forEach(showElement)
      links.forEach(x => showElement(x.parentNode))
    }
  }

  function hideSection (input) {
    return function (section, i) {
      var id = section.id.toLowerCase()
      var type = types[i]

      if (input.length > 0 && id.indexOf(input) === -1 && type.indexOf(input) === -1) {
        if (section.style.display !== 'none') {
          if (shown > 0) {
            --shown
          }
          hideElement(section)
        }
      } else {
        if (section.style.display === 'none') {
          ++shown
          showElement(section)
        }
      }
    }
  }

  function hideLink (input) {
    return function (link, i) {
      var href = link.href.split('#')[1].trim().toLowerCase()
      var type = link.querySelector('p:last-of-type').textContent.trim().toLowerCase()

      if (input.length > 0 && href.indexOf(input) === -1 && type.indexOf(input) === -1) {
        hideElement(link.parentNode)
      } else {
        showElement(link.parentNode)
      }
    }
  }

  search.addEventListener('input', function (ev) {
    var input = ev.target.value

    filterElements(input)
  })

  var menu = document.querySelector('#menu')
  var container = document.querySelector('.container')
  var sidenav = document.querySelector('.container .left')

  menu.addEventListener('click', function () {
    container.classList.toggle('open')
  })

  sidenav.addEventListener('click', function (ev) {
    if (ev.target.matches('a')) {
      container.classList.toggle('open')
    }
  })

  document.querySelector('.container .right').addEventListener('click', function (ev) {
    if (container.classList.contains('open')) {
      container.classList.remove('open')
    }
  }, true)
})

function hideElement (element) {
  element.style.display = 'none'
}

function showElement (element) {
  element.style.display = ''
}
