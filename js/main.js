const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const select = document.querySelector('.header-select');
const button = document.querySelector('.header-button');

let counter = 0;
let canPlay = true;
/* Increment the logic */
const randomArrayOfNumbers = (range) => {
	let array = [];
	while (array.length !== 16) {
		const number = Math.floor(Math.random() * range) + 1;
		if (!array.includes(number)) array.push(number);
	}
	return array;
};

const isInRandomArray = (array, num) => {
	return array.includes(num) ? true : false;
};

function handleClick(element, randomArray) {
	console.log(randomArray);
	element.addEventListener('click', (event) => {
		if (canPlay) {
			const index = [...document.querySelectorAll('.cell')].indexOf(element) + 1;
			if (!randomArray.includes(index)) {
				canPlay = true;
				counter++;
				[...document.querySelectorAll('.cell')][index - 1].classList.add('active');
				`${counter} tentativi riusciti`;
			} else {
				canPlay = false;
				[...document.querySelectorAll('.cell')][index - 1].classList.add('bomb');
				randomArray.forEach((n) => [...document.querySelectorAll('.cell')][n - 1].classList.add('bomb'));
				[...document.querySelectorAll('.cell')].forEach((el) => (el.style.cursor = 'default'));
				footer.innerHTML = `Hai perso! 😢...Tentativi riusciti ${counter}... Premi Play per ricominciare`;
				counter = 0;
			}
		}
	});
}

/* Create the grid */
const amountOfCells = (selectValue) => (selectValue === '1' ? 100 : selectValue === '2' ? 81 : 49);
const amountOfCols = (amountOfCells) => Math.sqrt(amountOfCells);

const createGrid = (cells, cols, container) => {
	const randomArray = randomArrayOfNumbers(cells);
	for (let i = 1; i <= cells; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.innerText = i;
		cell.style.width = `calc(100% / ${cols})`;
		cell.style.height = `calc(100% / ${cols})`;
		container.appendChild(cell);
		handleClick(cell, randomArray);
		footer.innerHTML = `${counter} tentativi riusciti`;
	}
};

button.addEventListener('click', () => {
	const cells = amountOfCells(select.value);
	const cols = amountOfCols(cells);
	main.innerHTML = '';
	canPlay = true;

	const grid = document.createElement('div');
	grid.classList.add('grid');
	createGrid(cells, cols, grid);

	main.appendChild(grid);
	console.log('Cells: ', cells, 'Cols: ', cols);
});
