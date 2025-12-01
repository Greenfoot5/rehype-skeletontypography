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
      if (headingRank(node)) {
        if (
          node.properties.className === null ||
          node.properties.className === undefined
        ) {
          node.properties.className = prefix + 'h' + headingRank(node)
        } else if (
          !String(node.properties.className).includes(
            prefix + 'h' + headingRank(node)
          )
        ) {
          node.properties.className += ' ' + prefix + 'h' + headingRank(node)
        }
      }
    })
  }
}
