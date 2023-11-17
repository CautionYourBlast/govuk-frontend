const { render } = require('@govuk-frontend/helpers/nunjucks')
const { htmlWithClassName } = require('@govuk-frontend/helpers/tests')
const { getExamples } = require('@govuk-frontend/lib/components')

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Checkboxes', () => {
  let examples

  beforeAll(async () => {
    examples = await getExamples('checkboxes')
  })

  it('render example with minimum required name and items', () => {
    const $ = render('checkboxes', examples.default)

    const $component = $('.ds_checkboxes')

    const $firstInput = $component.find(
      '.ds_checkboxes__item:first-child input'
    )
    const $firstLabel = $component.find(
      '.ds_checkboxes__item:first-child label'
    )
    expect($firstInput.attr('name')).toEqual('nationality')
    expect($firstInput.val()).toEqual('british')
    expect($firstLabel.text()).toContain('British')

    const $lastInput = $component.find(
      '.ds_checkboxes__item:last-child input'
    )
    const $lastLabel = $component.find(
      '.ds_checkboxes__item:last-child label'
    )
    expect($lastInput.attr('name')).toEqual('nationality')
    expect($lastInput.val()).toEqual('other')
    expect($lastLabel.text()).toContain('Citizen of another country')
  })

  it('render example without falsely values', () => {
    const $ = render('checkboxes', examples['with falsey values'])

    const $component = $('.ds_checkboxes')
    const $items = $component.find('.ds_checkboxes__item')

    expect($items.length).toEqual(2)
  })

  it('render example with a divider and ‘None’ checkbox with exclusive behaviour', () => {
    const $ = render('checkboxes', examples['with divider and None'])

    const $component = $('.ds_checkboxes')

    const $divider = $component.find('.ds_checkboxes__divider').first()
    expect($divider.text().trim()).toEqual('or')

    const $items = $component.find('.ds_checkboxes__item')
    expect($items.length).toEqual(4)

    const $orItemInput = $items.last().find('input').first()
    expect($orItemInput.attr('data-behaviour')).toEqual('exclusive')
  })

  it('render additional label classes', () => {
    const $ = render('checkboxes', examples['with label classes'])

    const $component = $('.ds_checkboxes')
    const $label = $component.find('.ds_checkboxes__item label')
    expect($label.hasClass('bold')).toBeTruthy()
  })

  it('render classes', () => {
    const $ = render('checkboxes', examples.classes)

    const $component = $('.ds_checkboxes')

    expect($component.hasClass('app-checkboxes--custom-modifier')).toBeTruthy()
  })

  it('renders initial aria-describedby on fieldset', () => {
    const $ = render('checkboxes', examples['with fieldset describedBy'])

    const $fieldset = $('.ds_fieldset')
    expect($fieldset.attr('aria-describedby')).toMatch('some-id')
  })

  it('render attributes', () => {
    const $ = render('checkboxes', examples.attributes)

    const $component = $('.ds_checkboxes')

    expect($component.attr('data-attribute')).toEqual('value')
    expect($component.attr('data-second-attribute')).toEqual('second-value')
  })

  it('renders with a field group wrapper', () => {
    const $ = render('checkboxes', examples.default)

    const $fieldGroup = $('.ds_field-group')
    expect($fieldGroup.length).toBeTruthy()
  })

  it('render a custom class on the field group', () => {
    const $ = render(
      'checkboxes',
      examples['with optional field-group classes showing group error']
    )

    const $fieldGroup = $('.ds_field-group')
    expect($fieldGroup.hasClass('ds_field-group--error')).toBeTruthy()
  })

  describe('items', () => {
    it('render a matching label and input using name by default', () => {
      const $ = render('checkboxes', examples.default)

      const $component = $('.ds_checkboxes')

      const $firstInput = $component.find(
        '.ds_checkboxes__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.ds_checkboxes__item:first-child label'
      )
      expect($firstInput.attr('id')).toEqual('nationality')
      expect($firstLabel.attr('for')).toEqual('nationality')

      const $lastInput = $component.find(
        '.ds_checkboxes__item:last-child input'
      )
      const $lastLabel = $component.find(
        '.ds_checkboxes__item:last-child label'
      )
      expect($lastInput.attr('id')).toEqual('nationality-3')
      expect($lastLabel.attr('for')).toEqual('nationality-3')
    })

    it('render a matching label and input using custom idPrefix', () => {
      const $ = render('checkboxes', examples['with idPrefix'])

      const $component = $('.ds_checkboxes')

      const $firstInput = $component.find(
        '.ds_checkboxes__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.ds_checkboxes__item:first-child label'
      )
      expect($firstInput.attr('id')).toEqual('nationality')
      expect($firstLabel.attr('for')).toEqual('nationality')

      const $lastInput = $component.find(
        '.ds_checkboxes__item:last-child input'
      )
      const $lastLabel = $component.find(
        '.ds_checkboxes__item:last-child label'
      )
      expect($lastInput.attr('id')).toEqual('nationality-2')
      expect($lastLabel.attr('for')).toEqual('nationality-2')
    })

    it('render explicitly passed item ids', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $component = $('.ds_checkboxes')

      const $lastInput = $component.find(
        '.ds_checkboxes__item:last-child input'
      )
      expect($lastInput.attr('id')).toBe('with-id-and-name-3')

      const $firstInput = $component.find(
        '.ds_checkboxes__item:first-child input'
      )
      const $firstLabel = $component.find(
        '.ds_checkboxes__item:first-child label'
      )
      expect($firstInput.attr('id')).toBe('item_british')
      expect($firstLabel.attr('for')).toEqual('item_british')
    })

    it('render explicitly passed item names', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $component = $('.ds_checkboxes')

      const $lastInput = $component.find(
        '.ds_checkboxes__item:last-child input'
      )
      expect($lastInput.attr('name')).toBe('custom-name-scottish')
    })

    it('render disabled', () => {
      const $ = render('checkboxes', examples['with disabled item'])

      const $component = $('.ds_checkboxes')

      const $disabledInput = $component.find(
        '.ds_checkboxes__item:last-child input'
      )
      expect($disabledInput.attr('disabled')).toEqual('disabled')
    })

    it('render checked', () => {
      const $ = render('checkboxes', examples['with checked item'])

      const $component = $('.ds_checkboxes')
      const $secondInput = $component.find(
        '.ds_checkboxes__item:nth-child(2) input'
      )
      const $lastInput = $component.find(
        '.ds_checkboxes__item:last-child input'
      )
      expect($secondInput.attr('checked')).toEqual('checked')
      expect($lastInput.attr('checked')).toEqual('checked')
    })

    it('checks the checkboxes in values', () => {
      const $ = render('checkboxes', examples['with pre-checked values'])

      const $component = $('.ds_checkboxes')
      const $british = $component.find('input[value="british"]')
      expect($british.attr('checked')).toEqual('checked')

      const $other = $component.find('input[value="other"]')
      expect($other.attr('checked')).toEqual('checked')
    })

    it('allows item.checked to override values', () => {
      const $ = render('checkboxes', examples['item checked overrides values'])

      const $green = $('.ds_checkboxes').find('input[value="green"]')
      expect($green.attr('checked')).toBeUndefined()
    })

    describe('when they include attributes', () => {
      it('it renders the attributes', () => {
        const $ = render('checkboxes', examples['items with attributes'])

        const $component = $('.ds_checkboxes')

        const $firstInput = $component.find(
          '.ds_checkboxes__item:first-child input'
        )
        expect($firstInput.attr('data-attribute')).toEqual('ABC')
        expect($firstInput.attr('data-second-attribute')).toEqual('DEF')

        const $lastInput = $component.find(
          '.ds_checkboxes__item:last-child input'
        )
        expect($lastInput.attr('data-attribute')).toEqual('GHI')
        expect($lastInput.attr('data-second-attribute')).toEqual('JKL')
      })
    })
  })

  describe('when they include a hint', () => {
    it('it renders the hint text', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      const $firstHint = $('.ds_checkboxes__hint').first()
      expect($firstHint.text().trim()).toContain(
        "You'll have a user ID if you've registered for Self Assessment or filed a tax return online before."
      )
    })

    it('it renders the correct id attribute for the hint', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      expect($('.ds_checkboxes__hint').attr('id')).toBe(
        'government-gateway-item-hint'
      )
    })

    it('the input describedBy attribute matches the item hint id', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      expect($('.ds_checkboxes__input').attr('aria-describedby')).toBe(
        'government-gateway-item-hint'
      )
    })
  })

  describe('render conditionals', () => {
    it('hidden by default when not checked', () => {
      const $ = render('checkboxes', examples['with conditional items'])

      const $component = $('.ds_checkboxes')

      const $firstConditional = $component
        .find('.ds_checkboxes__conditional')
        .first()
      expect($firstConditional.text().trim()).toContain('Email address')
      expect(
        $firstConditional.hasClass('ds_checkboxes__conditional--hidden')
      ).toBeTruthy()
    })
    it('visible by default when checked', () => {
      const $ = render('checkboxes', examples['with conditional item checked'])

      const $component = $('.ds_checkboxes')

      const $firstConditional = $component
        .find('.ds_checkboxes__conditional')
        .first()
      expect($firstConditional.text().trim()).toContain('Email address')
      expect(
        $firstConditional.hasClass('ds_checkboxes__conditional--hidden')
      ).toBeFalsy()
    })

    it('visible when checked with pre-checked values', () => {
      const $ = render('checkboxes', examples['with pre-checked values'])

      const $component = $('.ds_checkboxes')

      const $firstConditional = $component
        .find('.ds_checkboxes__conditional')
        .first()
      expect($firstConditional.text().trim()).toContain('Country')
      expect(
        $firstConditional.hasClass('ds_checkboxes__conditional--hidden')
      ).toBeFalsy()
    })

    it('with association to the input they are controlled by', () => {
      const $ = render('checkboxes', examples['with conditional items'])

      const $component = $('.ds_checkboxes')

      const $lastInput = $component.find('.ds_checkboxes__input').last()
      const $lastConditional = $component
        .find('.ds_checkboxes__conditional')
        .last()

      expect($lastInput.attr('data-aria-controls')).toBe(
        'conditional-how-contacted-3'
      )
      expect($lastConditional.attr('id')).toBe('conditional-how-contacted-3')
    })

    it('omits empty conditionals', () => {
      const $ = render('checkboxes', examples['empty conditional'])

      const $component = $('.ds_checkboxes')
      expect($component.find('.ds_checkboxes__conditional').length).toEqual(
        0
      )
    })

    it('does not associate checkboxes with empty conditionals', () => {
      const $ = render('checkboxes', examples['empty conditional'])

      const $input = $('.ds_checkboxes__input').first()
      expect($input.attr('data-aria-controls')).toBeFalsy()
    })
  })

  describe('when they include an error message', () => {
    it('renders the error message', () => {
      const $ = render('checkboxes', examples['with error message'])

      expect(htmlWithClassName($, '.ds_error-message')).toMatchSnapshot()
    })

    it('uses the idPrefix for the error message id if provided', () => {
      const $ = render('checkboxes', examples['with error and idPrefix'])

      const errorMessageId = $('.ds_error-message').attr('id')
      expect(errorMessageId).toEqual('id-prefix-error')
    })

    it('falls back to using the name for the error message id', () => {
      const $ = render('checkboxes', examples['with error message'])

      const errorMessageId = $('.ds_error-message').attr('id')
      expect(errorMessageId).toEqual('waste-error')
    })

    it('associates the fieldset as "described by" the error message', () => {
      const $ = render(
        'checkboxes',
        examples['with fieldset and error message']
      )

      const $fieldset = $('.ds_fieldset')
      const errorMessageId = $('.ds_error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('associates the fieldset as "described by" the error message and parent fieldset', () => {
      const $ = render(
        'checkboxes',
        examples['with error message and fieldset describedBy']
      )

      const $fieldset = $('.ds_fieldset')
      const errorMessageId = $('.ds_error-message').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('does not associate each input as "described by" the error message', () => {
      const $ = render(
        'checkboxes',
        examples['with error message and hints on items']
      )

      const $inputs = $('input')

      $inputs.each((index, input) => {
        let expectedDescribedById = `waste-${index + 1}-item-hint`
        if (index === 0) {
          expectedDescribedById = 'waste-item-hint'
        }
        expect($(input).attr('aria-describedby')).toEqual(expectedDescribedById)
      })
    })

    it('renders with a field group wrapper that has an error state', () => {
      const $ = render('checkboxes', examples['with error message'])

      const $fieldGroup = $('.ds_field-group')
      expect($fieldGroup.hasClass('ds_field-group--error')).toBeTruthy()
    })
  })

  describe('when they include a hint', () => {
    it('renders the hint', () => {
      const $ = render('checkboxes', examples['multiple hints'])

      expect(htmlWithClassName($, '.ds_hint')).toMatchSnapshot()
    })

    it('associates the fieldset as "described by" the hint', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $fieldset = $('.ds_fieldset')
      const hintId = $('.ds_hint').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}${hintId}${WORD_BOUNDARY}`
      )
      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })

    it('associates the fieldset as "described by" the hint and parent fieldset', () => {
      const $ = render('checkboxes', examples['with fieldset describedBy'])

      const $fieldset = $('.ds_fieldset')
      const hintId = $('.ds_hint').attr('id')

      const describedBy = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${hintId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedBy)
    })
  })

  describe('when they include both a hint and an error message', () => {
    it('associates the fieldset as described by both the hint and the error message', () => {
      const $ = render('checkboxes', examples['with error message and hint'])

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
        'checkboxes',
        examples['with error, hint and fieldset describedBy']
      )

      const $fieldset = $('.ds_fieldset')
      const hintId = $('.ds_hint').attr('id')
      const errorMessageId = $('.ds_error-message').attr('id')

      const describedByCombined = new RegExp(
        `${WORD_BOUNDARY}some-id${WHITESPACE}${hintId}${WHITESPACE}${errorMessageId}${WORD_BOUNDARY}`
      )

      expect($fieldset.attr('aria-describedby')).toMatch(describedByCombined)
    })
  })

  describe('nested dependant components', () => {
    it('have correct nesting order', () => {
      const $ = render('checkboxes', examples['fieldset params'])

      const $component = $(
        '.ds_field-group > .ds_fieldset > .ds_checkboxes'
      )
      expect($component.length).toBeTruthy()
    })

    it('passes through label params without breaking', () => {
      const $ = render('checkboxes', examples['label with attributes'])

      expect(htmlWithClassName($, '.ds_checkboxes__label')).toMatchSnapshot()
    })

    it('passes through fieldset params without breaking', () => {
      const $ = render('checkboxes', examples['fieldset params'])

      expect(htmlWithClassName($, '.ds_fieldset')).toMatchSnapshot()
    })

    it('passes through html fieldset params without breaking', () => {
      const $ = render('checkboxes', examples['fieldset html params'])

      expect(htmlWithClassName($, '.ds_fieldset')).toMatchSnapshot()
    })
  })

  describe('single checkbox without a fieldset', () => {
    it('adds aria-describedby to input if there is an error', () => {
      const exampleName = "with single option set 'aria-describedby' on input"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch('t-and-c-error')
    })

    it('adds aria-describedby to input if there is an error and parent fieldset', () => {
      const exampleName =
        "with single option set 'aria-describedby' on input, and describedBy"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch('some-id t-and-c-error')
    })
  })

  describe('single checkbox (with hint) without a fieldset', () => {
    it('adds aria-describedby to input if there is an error and a hint', () => {
      const exampleName =
        "with single option (and hint) set 'aria-describedby' on input"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch(
        't-and-c-with-hint-error t-and-c-with-hint-item-hint'
      )
    })

    it('adds aria-describedby to input if there is an error, hint and parent fieldset', () => {
      const exampleName =
        "with single option (and hint) set 'aria-describedby' on input, and describedBy"

      const $ = render('checkboxes', examples[exampleName])
      const $input = $('input')

      expect($input.attr('aria-describedby')).toMatch(
        'some-id t-and-c-with-hint-error t-and-c-with-hint-item-hint'
      )
    })
  })
})