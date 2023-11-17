const { render } = require('@govuk-frontend/helpers/nunjucks')
const { htmlWithClassName } = require('@govuk-frontend/helpers/tests')
const { getExamples } = require('@govuk-frontend/lib/components')

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Radios', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('radios')
  })

  it('render example with minimum required name and items', () => {
    const $ = render('radios', examples.default)

    const $component = $('.ds_radios')

    const $firstInput = $component.find('.ds_radios__item:first-child input')
    const $firstLabel = $component.find('.ds_radios__item:first-child label')
    expect($firstInput.attr('name')).toEqual('example-default')
    expect($firstInput.val()).toEqual('yes')
    expect($firstLabel.text()).toContain('Yes')

    const $lastInput = $component.find('.ds_radios__item:last-child input')
    const $lastLabel = $component.find('.ds_radios__item:last-child label')
    expect($lastInput.attr('name')).toEqual('example-default')
    expect($lastInput.val()).toEqual('no')
    expect($lastLabel.text()).toContain('No')
  })

  it('renders without falsely items', () => {
    const $ = render('radios', examples['with falsey items'])

    const $component = $('.ds_radios')
    const $items = $component.find('.ds_radios__item input')
    expect($items.length).toEqual(2)
  })

  it('render classes', () => {
    const $ = render('radios', examples.inline)

    const $component = $('.ds_radios')

    expect($component.hasClass('ds_radios--inline')).toBeTruthy()
  })

  it('renders initial aria-describedby on fieldset', () => {
    const describedById = 'some-id'

    const $ = render('radios', examples['fieldset with describedBy'])

    const $fieldset = $('.ds_fieldset')
    expect($fieldset.attr('aria-describedby')).toMatch(describedById)
  })

  it('render attributes', () => {
    const $ = render('radios', examples.attributes)

    const $component = $('.ds_radios')

    expect($component.attr('data-attribute')).toEqual('value')
    expect($component.attr('data-second-attribute')).toEqual('second-value')
  })

  it('render a custom class on the field group', () => {
    const $ = render(
      'radios',
      examples['with optional field-group classes showing group error']
    )

    const $fieldGroup = $('.ds_field-group')
    expect($fieldGroup.hasClass('ds_field-group--error')).toBeTruthy()
  })

  describe('items', () => {
    it('render a matching label and input using name by default', () => {
      const $ = render('radios', examples.default)

      const $component = $('.ds_radios')

      const $firstInput = $component.find(
        '.ds_radios__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.ds_radios__item:first-child label'
      )
      expect($firstInput.attr('id')).toEqual('example-default')
      expect($firstLabel.attr('for')).toEqual('example-default')

      const $lastInput = $component.find('.ds_radios__item:last-child input')
      const $lastLabel = $component.find('.ds_radios__item:last-child label')
      expect($lastInput.attr('id')).toEqual('example-default-2')
      expect($lastLabel.attr('for')).toEqual('example-default-2')
    })

    it('render a matching label and input using custom idPrefix', () => {
      const $ = render('radios', examples['with idPrefix'])

      const $component = $('.ds_radios')

      const $firstInput = $component.find(
        '.ds_radios__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.ds_radios__item:first-child label'
      )
      expect($firstInput.attr('id')).toEqual('example-id-prefix')
      expect($firstLabel.attr('for')).toEqual('example-id-prefix')

      const $lastInput = $component.find('.ds_radios__item:last-child input')
      const $lastLabel = $component.find('.ds_radios__item:last-child label')
      expect($lastInput.attr('id')).toEqual('example-id-prefix-2')
      expect($lastLabel.attr('for')).toEqual('example-id-prefix-2')
    })

    it('render disabled', () => {
      const $ = render('radios', examples['with disabled'])

      const $component = $('.ds_radios')

      const $lastInput = $component.find('input[value="verify"]')
      expect($lastInput.attr('disabled')).toEqual('disabled')
    })

    it('render checked', () => {
      const $ = render('radios', examples.prechecked)

      const $component = $('.ds_radios')
      const $lastInput = $component.find('.ds_radios__item:last-child input')
      expect($lastInput.attr('checked')).toEqual('checked')
    })

    it('checks the radio that matches value', () => {
      const $ = render('radios', examples['prechecked using value'])

      const $component = $('.ds_radios')
      const $lastInput = $component.find('input[value="no"]')
      expect($lastInput.attr('checked')).toEqual('checked')
    })

    it('allows item.checked to override value', () => {
      const $ = render('radios', examples['item checked overrides value'])

      const $green = $('.ds_radios').find('input[value="green"]')
      expect($green.attr('checked')).toBeUndefined()
    })

    describe('when they include attributes', () => {
      it('it renders the attributes', () => {
        const $ = render('radios', examples['items with attributes'])

        const $component = $('.ds_radios')

        const $firstInput = $component.find(
          '.ds_radios__item:first-child input'
        )
        expect($firstInput.attr('data-attribute')).toEqual('ABC')
        expect($firstInput.attr('data-second-attribute')).toEqual('DEF')

        const $lastInput = $component.find(
          '.ds_radios__item:last-child input'
        )
        expect($lastInput.attr('data-attribute')).toEqual('GHI')
        expect($lastInput.attr('data-second-attribute')).toEqual('JKL')
      })
    })

    describe('when they include a hint', () => {
      it('it renders the hint text', () => {
        const $ = render('radios', examples['with hints on items'])

        expect($('.ds_radios__hint').text()).toContain(
          'You’ll have a user ID if you’ve registered for Self Assessment or filed a tax return online before.'
        )
      })

      it('it renders the correct id attribute for the hint', () => {
        const $ = render('radios', examples['with hints on items'])

        expect($('.ds_radios__hint').attr('id')).toBe('gateway-item-hint')
      })

      it('the input describedBy attribute matches the item hint id', () => {
        const $ = render('radios', examples['with hints on items'])

        expect($('.ds_radios__input').attr('aria-describedby')).toBe(
          'gateway-item-hint'
        )
      })
    })

    describe('render conditionals', () => {
      it('hidden by default when not checked', () => {
        const $ = render('radios', examples['with conditional items'])

        const $component = $('.ds_radios')

        const $hiddenConditional = $component
          .find('.ds_radios__conditional')
          .first()
        expect($hiddenConditional.text()).toContain('Email address')
        expect(
          $hiddenConditional.hasClass('ds_radios__conditional--hidden')
        ).toBeTruthy()
      })

      it('visible when checked because of checkedValue', () => {
        const $ = render(
          'radios',
          examples['with conditional items and pre-checked value']
        )

        const $conditional = $('.ds_radios__conditional').last()
        expect($conditional.text()).toContain('Mobile phone number')
        expect(
          $conditional.hasClass('ds_radios__conditional--hidden')
        ).toBeFalsy()
      })

      it('visible by default when checked', () => {
        const $ = render('radios', examples['with conditional item checked'])

        const $component = $('.ds_radios')

        const $visibleConditional = $component
          .find('.ds_radios__conditional')
          .first()
        expect($visibleConditional.text()).toContain('Email')
        expect(
          $visibleConditional.hasClass('ds_radios__conditional--hidden')
        ).toBeFalsy()
      })

      it('with association to the input they are controlled by', () => {
        const $ = render('radios', examples['with conditional items'])

        const $component = $('.ds_radios')

        const $firstInput = $component.find('.ds_radios__input').first()
        const $firstConditional = $component
          .find('.ds_radios__conditional')
          .first()

        expect($firstInput.attr('data-aria-controls')).toBe(
          'conditional-how-contacted'
        )
        expect($firstConditional.attr('id')).toBe('conditional-how-contacted')
      })

      it('omits empty conditionals', () => {
        const $ = render('radios', examples['with empty conditional'])

        const $component = $('.ds_radios')
        expect($component.find('.ds_radios__conditional').length).toEqual(0)
      })

      it('does not associate radios with empty conditionals', () => {
        const $ = render('radios', examples['with empty conditional'])

        const $input = $('.ds_radios__input').first()
        expect($input.attr('data-aria-controls')).toBeFalsy()
      })
    })

    it('render divider', () => {
      const $ = render('radios', examples['with a divider'])

      const $component = $('.ds_radios')
      const $divider = $component.find('.ds_radios__divider')
      expect($divider.text()).toBe('or')
    })

    it('render additional label classes', () => {
      const $ = render('radios', examples['label with classes'])

      const $component = $('.ds_radios')
      const $label = $component.find('.ds_radios__item label')
      expect($label.hasClass('bold')).toBeTruthy()
    })

    it('renders with a field group wrapper', () => {
      const $ = render('radios', examples.default)

      const $fieldGroup = $('.ds_field-group')
      expect($fieldGroup.length).toBeTruthy()
    })
  })

  describe('when they include a hint', () => {
    it('renders the hint', () => {
      const $ = render('radios', examples['with hints on parent and items'])

      expect(htmlWithClassName($, '.ds_hint')).toMatchSnapshot()
    })

    it('associates the fieldset as "described by" the hint', () => {
      const $ = render('radios', examples['with hints on parent and items'])

      const $fieldset = $('.ds_fieldset')

      expect($fieldset.attr('aria-describedby')).toMatch(
        'example-multiple-hints-hint'
      )
    })

    it('associates the fieldset as "described by" the hint and parent fieldset', () => {
      const $ = render('radios', examples['with describedBy and hint'])
      const $fieldset = $('.ds_fieldset')

      expect($fieldset.attr('aria-describedby')).toMatch('some-id')
    })
  })

  describe('when they include an error message', () => {
    it('renders the error message', () => {
      const $ = render('radios', examples['with error message'])

      expect(htmlWithClassName($, '.ds_error-message')).toMatchSnapshot()
    })

    it('uses the idPrefix for the error message id if provided', () => {
      const $ = render('radios', examples['with error message and idPrefix'])
      const $errorMessage = $('.ds_error-message')

      expect($errorMessage.attr('id')).toEqual('id-prefix-error')
    })

    it('falls back to using the name for the error message id', () => {
      const $ = render('radios', examples['with error message'])

      const $errorMessage = $('.ds_error-message')

      expect($errorMessage.attr('id')).toEqual('example-error-message-error')
    })

    it('associates the fieldset as "described by" the error message', () => {
      const $ = render('radios', examples['with fieldset and error message'])

      const $fieldset = $('.ds_fieldset')
      const errorMessageId = $('.ds_error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('associates the fieldset as "described by" the error message and parent fieldset', () => {
      const $ = render(
        'radios',
        examples['with fieldset, error message and describedBy']
      )

      const $fieldset = $('.ds_fieldset')
      const errorMessageId = $('.ds_error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('renders with a field group wrapper that has an error state', () => {
      const $ = render('radios', examples['with error message'])

      const $fieldGroup = $('.ds_field-group')
      expect($fieldGroup.hasClass('ds_field-group--error')).toBeTruthy()
    })
  })

  describe('when they include both a hint and an error message', () => {
    it('associates the fieldset as described by both the hint and the error message', () => {
      const $ = render('radios', examples['with hint and error message'])

      const $fieldset = $('.ds_fieldset')
      const errorMessageId = $('.ds_error-message').attr('id')
      const hintId = $('.ds_hint').attr('id')

      const describedByCombined = new RegExp(
        `${WORD_BOUNDARY}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedByCombined)
    })

    it('associates the fieldset as described by the hint, error message and parent fieldset', () => {
      const $ = render(
        'radios',
        examples['with hint, error message and describedBy']
      )

      const $fieldset = $('.ds_fieldset')
      const errorMessageId = $('.ds_error-message').attr('id')
      const hintId = $('.ds_hint').attr('id')

      const describedByCombined = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedByCombined)
    })
  })

  describe('nested dependant components', () => {
    it('have correct nesting order', () => {
      const $ = render('radios', examples.inline)

      const $component = $(
        '.ds_field-group > .ds_fieldset > .ds_radios'
      )
      expect($component.length).toBeTruthy()
    })

    it('passes through label params without breaking', () => {
      const $ = render('radios', examples['label with attributes'])

      expect(htmlWithClassName($, '.ds_radios__label')).toMatchSnapshot()
    })

    it('passes through fieldset params without breaking', () => {
      const $ = render('radios', examples['fieldset params'])

      expect(htmlWithClassName($, '.ds_fieldset')).toMatchSnapshot()
    })

    it('passes through html fieldset params without breaking', () => {
      const $ = render('radios', examples['fieldset with html'])

      expect(htmlWithClassName($, '.ds_fieldset')).toMatchSnapshot()
    })
  })
})