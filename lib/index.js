/**
 * @typedef {import('hast').Root} Root
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {string} [prefix='']
 *   Prefix to add in front of classes (default: `''`).
 */

import GithubSlugger from 'github-slugger'
import {headingRank} from 'hast-util-heading-rank'
import {visit} from 'unist-util-visit'

/** @type {Options} */
const emptyOptions = {}
const slugs = new GithubSlugger()

/**
 * Add classes to headings.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehypeSlug(options) {
  const settings = options || emptyOptions
  const prefix = settings.prefix || ''

  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    slugs.reset()

    visit(tree, 'element', function (node) {
      let className = prefix

      // Valid skeleton typography
      const typography = [
        'blockquote',
        'pre',
        'code',
        'kbd',
        'del',
        'ins',
        'mark'
      ]
      if (headingRank(node)) {
        className += node.tagName
      } else if (node.tagName === 'a') {
        className += 'anchor'
      } else if (typography.includes(node.tagName)) {
        className += node.tagName
      }

      if (className !== prefix) {
        if (
          node.properties.className === null ||
          node.properties.className === undefined ||
          node.properties.className === ''
        ) {
          node.properties.className = className
        } else if (!String(node.properties.className).includes(className)) {
          node.properties.className += ' ' + className
        }
      }
    })
  }
}
