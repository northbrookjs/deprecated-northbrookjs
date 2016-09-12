/* global hljs */

function resize () {
  Array.prototype.slice.call(document.querySelectorAll('section p:first-of-type'))
    .forEach(function (p) {
      var parent = p.parentNode
      var boundingRect = parent.getBoundingClientRect()
      var pBoundingRect = p.getBoundingClientRect()
      p.style.top = boundingRect.top - (pBoundingRect.top - boundingRect.top) + pBoundingRect.height
      p.style.left = (boundingRect.right - boundingRect.left - pBoundingRect.width)
    })
}

window.addEventListener('DOMContentLoaded', function () {
  Array.prototype.slice.call(document.querySelectorAll('pre code'))
    .forEach(function (block) {
      hljs.highlightBlock(block)
    })

  // window.onresize = function () {
    // resize()
  // }

  // resize()
})
