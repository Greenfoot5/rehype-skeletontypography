import assert from 'node:assert/strict'
import test from 'node:test'
import {rehype} from 'rehype'
import rehypeSkeleton from 'rehype-skeletonclasses'

test('rehypeSkeleton', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('rehype-skeletonclasses')).sort(),
      ['default']
    )
  })

  await t.test('should work', async function () {
    const file = await rehype()
      .data('settings', {fragment: true})
      .use(rehypeSkeleton)
      .process(
        [
          '<section>',
          '  <h1 class="big-title">Lorem ipsum 😪</h1>',
          '  <h2>dolor—sit—amet</h2>',
          '  <h3>consectetur &amp; adipisicing</h3>',
          '  <h4>elit</h4>',
          '  <h5>elit</h5>',
          '  <p>sed</p>',
          '  <blockquote>quote this</blockquote>',
          '  <a href="/">link me</a>',
          '  <pre>clode</pre>',
          '  <code>code</code>',
          '  <kbd class="kb">⌘</kbd>',
          '  <del><s>Always</s> Gonna Give You Up</del>' +
            '  <ins class="ins" cite="https://youtu.be/dQw4w9WgXcQ" datetime="10-31-2022"> Never Gonna Give You Up </ins>',
          '  <mark>Mark my words!</mark>',
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
        '  <blockquote class="blockquote">quote this</blockquote>',
        '  <a href="/" class="anchor">link me</a>',
        '  <pre class="pre">clode</pre>',
        '  <code class="code">code</code>',
        '  <kbd class="kb kbd">⌘</kbd>',
        '  <del class="del"><s>Always</s> Gonna Give You Up</del>' +
          '  <ins class="ins" cite="https://youtu.be/dQw4w9WgXcQ" datetime="10-31-2022"> Never Gonna Give You Up </ins>',
        '  <mark class="mark">Mark my words!</mark>',
        '</section>'
      ].join('\n')
    )
  })

  await t.test('should support `options.prefix`', async function () {
    const file = await rehype()
      .data('settings', {fragment: true})
      .use(rehypeSkeleton, {prefix: 'test-'})
      .process(
        [
          '<section>',
          '  <h1 class="big-title">Lorem ipsum 😪</h1>',
          '  <h2>dolor—sit—amet</h2>',
          '  <h3>consectetur &amp; adipisicing</h3>',
          '  <h4>elit</h4>',
          '  <h5>elit</h5>',
          '  <p>sed</p>',
          '  <blockquote>quote this</blockquote>',
          '  <a href="/" class="a">link me</a>',
          '  <pre>clode</pre>',
          '  <code>code</code>',
          '  <kbd class="kb">⌘</kbd>',
          '  <del><s>Always</s> Gonna Give You Up</del>' +
            '  <ins class="ins" cite="https://youtu.be/dQw4w9WgXcQ" datetime="10-31-2022"> Never Gonna Give You Up </ins>',
          '  <mark>Mark my words!</mark>',
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
        '  <blockquote class="test-blockquote">quote this</blockquote>',
        '  <a href="/" class="a test-anchor">link me</a>',
        '  <pre class="test-pre">clode</pre>',
        '  <code class="test-code">code</code>',
        '  <kbd class="kb test-kbd">⌘</kbd>',
        '  <del class="test-del"><s>Always</s> Gonna Give You Up</del>' +
          '  <ins class="ins test-ins" cite="https://youtu.be/dQw4w9WgXcQ" datetime="10-31-2022"> Never Gonna Give You Up </ins>',
        '  <mark class="test-mark">Mark my words!</mark>',
        '</section>'
      ].join('\n')
    )
  })
})
