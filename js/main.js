const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const select = document.querySelector('.header-select');
const button = document.querySelector('.header-button');

let counter = 0;
let canPlay = true;
/* Increment the logic */

/* Create the grid */
const amountOfCells = (selectValue) => (selectValue === '1' ? 100 : selectValue === '2' ? 81 : 49);
const amountOfCols = (amountOfCells) => Math.sqrt(amountOfCells);

const createGrid = (cells, cols, container) => {
	for (let i = 1; i <= cells; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.innerText = i;
		cell.style.width = `calc(100% / ${cols})`;
		cell.style.height = `calc(100% / ${cols})`;
		container.appendChild(cell);
		footer.innerHTML = `${counter} tentativi riusciti`;
	}
};

button.addEventListener('click', () => {
	const cells = amountOfCells(select.value);
	const cols = amountOfCols(cells);
	main.innerHTML = '';

	const grid = document.createElement('div');
	grid.classList.add('grid');
	createGrid(cells, cols, grid);

	main.appendChild(grid);
	console.log('Cells: ', cells, 'Cols: ', cols);
});
