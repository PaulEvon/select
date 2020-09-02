const getTemplate = (props = {}) => {
	const { placeholder = "No placeholder", ...rest } = props
	const itemList = rest.data.map(element => {
		return `
			<li class="select__listItem" data-id="${element.id}">
				<p>${element.value}</p>
			</li>
			`
	}).join("")
	return `
	<div class="select__input" data-type="input">
		<span data-value="">${placeholder}</span>
		<i data-type="arrow"></i>
	</div>
	<div class="select__dropdown">
		<ul class="select__list">
			${itemList}		
		</ul>
	</div>
	`
}
export class Select {
	constructor(selector, options) {
		this.rootElement = document.querySelector(selector)
		this.options = options
		this.#render()
		this.#setup()
	}
	#render() {
		this.rootElement.classList.add("select")
		this.rootElement.innerHTML = getTemplate(this.options)

	}
	#setup() {
		this.clickHandler = this.clickHandler.bind(this)
		this.selectInput = this.rootElement.querySelector(`[data-type="input"]`)
		this.selectInput.addEventListener('click', this.clickHandler)
		document.addEventListener('click', this.clickHandler)
		this.arrow = this.rootElement.querySelector(`[data-type="arrow"]`)
		this.arrow.classList = "fa fa-chevron-down";
		this.selectValueHolder = this.rootElement.querySelector(`[data-value]`)
		this.isOpened = false
		if (this.options.defaultSelectId) {
			this.changeSelect(this.options.defaultSelectId)
		}
	}
	clickHandler(event) {
		if (event.currentTarget === this.selectInput || this.isOpened) {
			this.toggle()
			event.stopPropagation()
		}
		if (event.target.dataset.id) {
			this.changeSelect(event.target.dataset.id)
		}
	}
	changeSelect(id) {
		this.currentSelect && this.currentSelect.classList.remove("selected")
		const data = this.options.data.find(el => el.id === id)
		const listItem = this.rootElement.querySelector(`[data-id="${id}"]`)
		this.selectValueHolder.textContent = data.value
		this.selectValueHolder.dataset.value = data.value
		listItem.classList.add("selected")
		this.currentSelect = listItem;
	}
	toggle() {
		this.isOpened = this.rootElement.classList.toggle("open")
		if (this.isOpened) {
			this.arrow.classList.remove("fa-chevron-down")
			this.arrow.classList.add("fa-chevron-up")
		} else {
			this.arrow.classList.remove("fa-chevron-up")
			this.arrow.classList.add("fa-chevron-down")
		}
	}
	delete() {
		this.selectInput.removeEventListener('click', this.clickHandler)
		document.removeEventListener('click', this.clickHandler)
		this.rootElement.innerHTML = ''
	}
}