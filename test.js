import assert from 'node:assert/strict'
import test from 'node:test'
import {rehype} from 'rehype'
import rehypeClasses from 'rehype-headingclasses'

test('rehypeClasses', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('rehype-headingclasses')).sort(),
      ['default']
    )
  })

  await t.test('should work', async function () {
    const file = await rehype()
      .data('settings', {fragment: true})
      .use(rehypeClasses)
      .process(
        [
          '<section>',
          '  <h1 class="big-title">Lorem ipsum 😪</h1>',
          '  <h2>dolor—sit—amet</h2>',
          '  <h3>consectetur &amp; adipisicing</h3>',
          '  <h4>elit</h4>',
          '  <h5>elit</h5>',
          '  <p>sed</p>',
          '</section>'
        ].join('\n')
      )

    assert.equal(
      String(file),
      [
        '<section>',
        '  <h1 class="big-title h1">Lorem ipsum 😪</h1>',
        '  <h2 class="h2">dolor—sit—amet</h2>',
        '  <h3 class="h3">consectetur &#x26; adipisicing</h3>',
        '  <h4 class="h4">elit</h4>',
        '  <h5 class="h5">elit</h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n')
    )
  })

  await t.test('should support `options.prefix`', async function () {
    const file = await rehype()
      .data('settings', {fragment: true})
      .use(rehypeClasses, {prefix: 'test-'})
      .process(
        [
          '<section>',
          '  <h1 class="big-title">Lorem ipsum 😪</h1>',
          '  <h2>dolor—sit—amet</h2>',
          '  <h3>consectetur &amp; adipisicing</h3>',
          '  <h4>elit</h4>',
          '  <h5>elit</h5>',
          '  <p>sed</p>',
          '</section>'
        ].join('\n')
      )

    assert.equal(
      String(file),
      [
        '<section>',
        '  <h1 class="big-title test-h1">Lorem ipsum 😪</h1>',
        '  <h2 class="test-h2">dolor—sit—amet</h2>',
        '  <h3 class="test-h3">consectetur &#x26; adipisicing</h3>',
        '  <h4 class="test-h4">elit</h4>',
        '  <h5 class="test-h5">elit</h5>',
        '  <p>sed</p>',
        '</section>'
      ].join('\n')
    )
  })
})
