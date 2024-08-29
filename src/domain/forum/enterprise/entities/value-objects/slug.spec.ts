import { expect, it, describe } from 'vitest'
import { Slug } from './slug'

describe('Value Object Slug', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('An example title')

    expect(slug.value).toEqual('an-example-title')
  })
})
