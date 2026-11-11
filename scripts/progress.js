class Progress {
	#element
	#arc
	#value = 0
	#animated = false
	#hidden = false

	constructor(
		container,
		{ value = 0, animated = false, hidden = false, label = 'Progress' } = {}
	) {
		if (!(container instanceof Element)) {
			throw new TypeError('Progress container must be a DOM element.')
		}
		this.#validateValue(value)
		this.#validateBoolean(animated)
		this.#validateBoolean(hidden)

		this.#element = document.createElement('div')
		this.#element.className = 'progress'
		this.#element.setAttribute('role', 'progressbar')
		this.#element.setAttribute('aria-label', label)
		this.#element.setAttribute('aria-valuemin', '0')
		this.#element.setAttribute('aria-valuemax', '100')
		const rotor = document.createElement('div')
		rotor.className = 'progress__rotor'
		rotor.setAttribute('aria-hidden', 'true')
		rotor.innerHTML = `
			<svg class="progress__ring" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
				<circle class="progress__track" cx="60" cy="60" r="55" />
				<circle class="progress__arc" cx="60" cy="60" r="55"
					pathLength="100" stroke-dasharray="100 100"
					transform="rotate(-90 60 60)" />
			</svg>`
		this.#arc = rotor.querySelector('.progress__arc')
		this.#element.append(rotor)
		this.setValue(value)
		this.setAnimated(animated)
		this.setHidden(hidden)
		container.append(this.#element)
	}

	get value() {
		return this.#value
	}
	get animated() {
		return this.#animated
	}
	get hidden() {
		return this.#hidden
	}

	setValue(value) {
		this.#validateValue(value)
		this.#value = value
		this.#arc.setAttribute('stroke-dashoffset', String(100 - value))
		this.#element.setAttribute('aria-valuenow', String(value))
	}

	setAnimated(animated) {
		this.#validateBoolean(animated)
		this.#animated = animated
		this.#element.dataset.animated = String(animated)
	}

	setHidden(hidden) {
		this.#validateBoolean(hidden)
		this.#hidden = hidden
		this.#element.dataset.hidden = String(hidden)
		this.#element.setAttribute('aria-hidden', String(hidden))
	}

	#validateValue(value) {
		if (typeof value !== 'number' || !Number.isFinite(value)) {
			throw new TypeError('Progress value must be a finite number.')
		}
		if (value < 0 || value > 100) {
			throw new RangeError('Progress value must be between 0 and 100.')
		}
	}

	#validateBoolean(value) {
		if (typeof value !== 'boolean') {
			throw new TypeError('Progress state must be a boolean.')
		}
	}
}

window.Progress = Progress
