/**
 * Dynamically loads the Microsoft Clarity tracking script.
 * Uses the official Clarity snippet pattern to inject the script into the document head.
 * @param {string} projectId - The Clarity project identifier
 */
export function loadClarityScript(projectId) {
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
    t = l.createElement(r)
    t.async = 1
    t.src = 'https://www.clarity.ms/tag/' + i
    y = l.getElementsByTagName(r)[0]
    y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', projectId)
}
