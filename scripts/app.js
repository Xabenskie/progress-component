const valueInput = document.querySelector('#value')
const animateInput = document.querySelector('#animate')
const hideInput = document.querySelector('#hide')
const progress = new Progress(document.querySelector('#progress'), {
	value: valueInput.valueAsNumber,
	label: 'Process progress'
})

valueInput.addEventListener('input', () => {
	const valid = valueInput.value !== '' && valueInput.validity.valid
	valueInput.setAttribute('aria-invalid', String(!valid))
	if (valid) progress.setValue(valueInput.valueAsNumber)
})

// Keep editing possible (including an empty field), then restore the last valid
// value on blur rather than turning an empty string into a surprising zero.
valueInput.addEventListener('blur', () => {
	valueInput.value = String(progress.value)
	valueInput.removeAttribute('aria-invalid')
})

animateInput.addEventListener('change', () => {
	progress.setAnimated(animateInput.checked)
})

hideInput.addEventListener('change', () => {
	progress.setHidden(hideInput.checked)
})

document.querySelector('.controls').addEventListener('submit', event => {
	event.preventDefault()
	valueInput.blur()
})
