const { render } = require('@govuk-frontend/helpers/nunjucks')
const { htmlWithClassName } = require('@govuk-frontend/helpers/tests')
const { getExamples } = require('@govuk-frontend/lib/components')

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Textarea', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('textarea')
  })

  describe('default example', () => {
    it('renders with id', () => {
      const $ = render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      expect($component.attr('id')).toEqual('more-detail')
    })

    it('renders with name', () => {
      const $ = render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      expect($component.attr('name')).toEqual('more-detail')
    })

    it('renders with default number of rows', () => {
      const $ = render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      expect($component.attr('rows')).toEqual('5')
    })

    it('renders with a field group wrapper', () => {
      const $ = render('textarea', examples.default)

      const $fieldGroup = $('.ds_field-group')
      expect($fieldGroup.length).toBeTruthy()
    })
  })

  describe('custom options', () => {
    it('renders with classes', () => {
      const $ = render('textarea', examples.classes)

      const $component = $('.govuk-textarea')
      expect($component.hasClass('app-textarea--custom-modifier')).toBeTruthy()
    })

    it('renders with value', () => {
      const $ = render('textarea', examples['with default value'])

      const $component = $('.govuk-textarea')
      expect($component.text()).toEqual('221B Baker Street\nLondon\nNW1 6XE\n')
    })

    it('renders with attributes', () => {
      const $ = render('textarea', examples.attributes)

      const $component = $('.govuk-textarea')
      expect($component.attr('data-attribute')).toEqual('my data value')
    })

    it('renders with aria-describedby', () => {
      const $ = render('textarea', examples['with describedBy'])

      const $component = $('.govuk-textarea')
      expect($component.attr('aria-describedby')).toMatch('some-id')
    })

    it('renders with rows', () => {
      const $ = render('textarea', examples['with custom rows'])

      const $component = $('.govuk-textarea')
      expect($component.attr('rows')).toEqual('8')
    })

    it('renders with a field group wrapper that has extra classes', () => {
      const $ = render('textarea', examples['with optional field-group classes'])

      const $fieldGroup = $('.ds_field-group')
      expect($fieldGroup.hasClass('extra-class')).toBeTruthy()
    })
  })

  describe('when it has the spellcheck attribute', () => {
    it('renders with spellcheck attribute set to true', () => {
      const $ = render('textarea', examples['with spellcheck enabled'])

      const $component = $('.govuk-textarea')
      expect($component.attr('spellcheck')).toEqual('true')
    })

    it('renders with spellcheck attribute set to false', () => {
      const $ = render('textarea', examples['with spellcheck disabled'])

      const $component = $('.govuk-textarea')
      expect($component.attr('spellcheck')).toEqual('false')
    })

    it('renders without spellcheck attribute by default', () => {
      const $ = render('textarea', examples.default)

      const $component = $('.govuk-textarea')
      expect($component.attr('spellcheck')).toBeUndefined()
    })
  })

  describe('when it includes a hint', () => {
    it('renders with hint', () => {
      const $ = render('textarea', examples['with hint'])

      expect(htmlWithClassName($, '.govuk-hint')).toMatchSnapshot()
    })

    it('associates the textarea as "described by" the hint', () => {
      const $ = render('textarea', examples['with hint'])

      const $textarea = $('.govuk-textarea')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`
      )

      expect($textarea.attr('aria-describedby')).toMatch(describedBy)
    })

    it('associates the textarea as "described by" the hint and parent fieldset', () => {
      const $ = render('textarea', examples['with hint and described by'])

      const $textarea = $('.govuk-textarea')
      const hintId = $('.govuk-hint').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${hintId}${WORD_BOUNDARY}`
      )

      expect($textarea.attr('aria-describedby')).toMatch(describedBy)
    })
  })

  describe('when it includes an error message', () => {
    it('renders with error message', () => {
      const $ = render('textarea', examples['with error message'])

      expect(htmlWithClassName($, '.govuk-error-message')).toMatchSnapshot()
    })

    it('associates the textarea as "described by" the error message', () => {
      const $ = render('textarea', examples['with error message'])

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($component.attr('aria-describedby')).toMatch(describedBy)
    })

    it('associates the textarea as "described by" the error message and parent fieldset', () => {
      const $ = render(
        'textarea',
        examples['with error message and described by']
      )

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($component.attr('aria-describedby')).toMatch(describedBy)
    })

    it('adds the error class to the textarea', () => {
      const $ = render('textarea', examples['with error message'])

      const $component = $('.govuk-textarea')
      expect($component.hasClass('govuk-textarea--error')).toBeTruthy()
    })

    it('renders with a field group wrapper that has an error state', () => {
      const $ = render('textarea', examples['with error message'])

      const $fieldGroup = $('.ds_field-group')
      expect($fieldGroup.hasClass('ds_field-group--error')).toBeTruthy()
    })
  })

  describe('when it includes both a hint and an error message', () => {
    it('associates the textarea as described by both the hint and the error message', () => {
      const $ = render('textarea', examples['with hint and error message'])

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(
        `${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($component.attr('aria-describedby')).toMatch(describedByCombined)
    })

    it('associates the textarea as described by the hint, error message and parent fieldset', () => {
      const $ = render(
        'textarea',
        examples['with hint, error message and described by']
      )

      const $component = $('.govuk-textarea')
      const errorMessageId = $('.govuk-error-message').attr('id')
      const hintId = $('.govuk-hint').attr('id')

      const describedByCombined = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($component.attr('aria-describedby')).toMatch(describedByCombined)
    })
  })

  describe('with dependant components', () => {
    it('have correct nesting order', () => {
      const $ = render('textarea', examples.default)

      const $component = $('.ds_field-group > .govuk-textarea')
      expect($component.length).toBeTruthy()
    })

    it('renders with label', () => {
      const $ = render('textarea', examples.default)

      expect(htmlWithClassName($, '.ds_label')).toMatchSnapshot()
    })

    it('renders label with "for" attribute reffering the textarea "id"', () => {
      const $ = render('textarea', examples.default)

      const $label = $('.ds_label')
      expect($label.attr('for')).toEqual('more-detail')
    })

    it('renders label as page heading', () => {
      const $ = render('textarea', examples['with label as page heading'])

      const $label = $('.ds_label')
      expect($('.ds_label-wrapper')).toBeTruthy()
      expect($label.attr('for')).toEqual('textarea-with-page-heading')
    })
  })

  describe('when it includes an autocomplete attribute', () => {
    it('renders the autocomplete attribute', () => {
      const $ = render('textarea', examples['with autocomplete attribute'])

      const $component = $('.govuk-textarea')
      expect($component.attr('autocomplete')).toEqual('street-address')
    })
  })
})
