const fields = [
  { element: document.getElementById('fullName'), pattern: /^[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ]\.\s[А-ЯІЇЄ]\.$/, errorMessage: 'ПІБ введено неправильно. Спробуйте вказати за наступною аналогією: Олексієнко О. О.' },
  { element: document.getElementById('idCard'), pattern: /^[А-ЯІЇЄ]{2}\s№\d{6}$/, errorMessage: 'Номер ID-карти вказано неправильно. Спробуйте вказати за наступною аналогією: УЦ №123456' },
  { element: document.getElementById('faculty'), pattern: /^[А-ЯІЇЄ]{2,5}$/, errorMessage: 'Факультет вказано неправильно. Спробуйте вказати за наступною аналогією: ФКНІ' },
  { 
    element: document.getElementById('birthDate'), 
    pattern: /^\d{1,2}\.\d{1,2}\.\d{4}$/, 
    errorMessage: 'Дату народження вказано неправильно. Спробуйте вказати за наступною аналогією: 10.7.2003',
    additionalCheck: (input) => {
      const [day, month, year] = input.value.split('.').map(Number);
      const inputDate = new Date(year, month - 1, day);
      const now = new Date();
      return inputDate < now;
    },
    pastDateError: 'Дата народження має бути в минулому.'
  },
  { element: document.getElementById('address'), pattern: /^(м\.|с\.|смт\.)\s+.+,\s+вул\.\s+.+,\s*[0-9]+[а-яА-Я]?\/?[0-9]*(\s+кв\.\s*\d+)?$/, errorMessage: 'Адресу проживання вказано неправильно. Спробуйте вказати за наступною аналогією: м. Київ, вул. Хрещатик, 10 кв. 12' }
];

const validateField = ({ element, pattern, errorMessage, additionalCheck, pastDateError }) => {
  let isValid = pattern.test(element.value);
  
  if (isValid && additionalCheck) {
    isValid = additionalCheck(element);
    element.setAttribute('title', isValid ? '' : pastDateError);
  } else {
    element.setAttribute('title', isValid ? '' : errorMessage);
  }

  element.parentElement.classList.toggle('error', !isValid);
  return isValid;
};

document.querySelector('button').addEventListener('click', () => {
  let isValid = true;
  fields.forEach(field => {
    const fieldIsValid = validateField(field);
    if (!fieldIsValid) isValid = false;
  });

  if (isValid) {
    document.querySelector('.output .info').innerHTML = fields.map(({ element }) =>
      `<p>${element.labels[0].textContent}: ${element.value}</p>`
    ).join('');
  }
});

const table = document.getElementById('table');
const colorPicker = document.getElementById('colorPicker');

const generateTable = () => {
  let counter = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement('td');
      cell.textContent = counter;
      cell.dataset.number = counter;

      if (counter === 4) {
        cell.addEventListener('mouseover', () => {
          cell.style.backgroundColor = getRandomColor();
        });
      
        cell.addEventListener('click', () => {
          cell.style.backgroundColor = colorPicker.value;
        });
      
        cell.addEventListener('dblclick', () => {
          changeDiagonalColor();
        });
      }

      row.appendChild(cell);
      counter++;
    }
    table.appendChild(row);
  }
}

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const changeDiagonalColor = () => {
  const cellsColor = getRandomColor();
  for (let i = 0; i < 6; i++) {
    const cell = table.rows[i].cells[5 - i];
    cell.style.backgroundColor = cellsColor;
  }
}

generateTable();
