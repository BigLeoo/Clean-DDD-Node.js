export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receive a string and normalize it to a slug.
   *
   * Example: "An exmaple title" => "an-example-title"
   *
   *  @param text {string}
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Remove spaces: "s+" => matches one space. "g" => global flag to match all spaces. "''" => replace with nothing.
      .replace(/[^\w-]+/g, '') // Remove special characters: "a-z0-9-" => matches all letters, numbers and hyphens. "g" => global flag to match all special characters. "''" => replace with nothing.
      .replace(/_/g, '-') // Replace underscores with hyphens.
      .replace(/--+/g, '-') // Remove hyphens at the end of the string.
      .replace(/-$/g, '') // Remove hyphens at the end of the string.

    return new Slug(slugText)
  }
}
