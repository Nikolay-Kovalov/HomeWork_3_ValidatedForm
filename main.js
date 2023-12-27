const form = document.forms[0];
const result = document.querySelector('.result');
const submitBtn = document.querySelector('button');

submitBtn.classList.add('disabled')


const arrForResults = getFromLocalStorage('results') || [];
console.log(arrForResults)

form.addEventListener('submit', onFormSubmit);

function getCheckedCheckboxes() {
  const checkedBoxes = document.querySelectorAll('input.checkbox:checked');
  const values = Array.from(checkedBoxes).map(item => item.value);
  return values
}

function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

function renderDataFromLS() {
  const data = getFromLocalStorage('results');
  data.forEach(({name,email, phone,sports,size}) => {
    renderResult(name, email, phone, sports, size)
  });
}

renderDataFromLS();

function onFormSubmit(evt) {
    evt.preventDefault();
    const name = evt.currentTarget.elements.name.value;
    const email = evt.currentTarget.elements.email.value;
  const phone = evt.currentTarget.elements.phone.value;
  const sports = getCheckedCheckboxes().join(', ');
  const size = evt.currentTarget.elements.size.value;
 


  // if (name.length < 6) {
  //   alert('Name should contain six characters at least');
  //   return
  // }
 
  // const regExpemail = /[@]/gi

  // if (!regExpemail.test(`${email}`)) {
  //   alert(`Email should contain "@" and "."` )
  // }

  // const regExp = /^\+\d{1,3}\d{10}$/;
  // if (!regExp.test(`${phone}`)) {
  //       alert('Use this phone format: +380997654327');
  // }
  const resultsObject = {
    name,email,phone,sports,size,
  }

  arrForResults.push(resultsObject);
    
  renderResult(name, email, phone, sports, size)
  
  localStorage.setItem('results', JSON.stringify(arrForResults))

  evt.currentTarget.reset();
}

form.elements.name.addEventListener('focusin', (evt) => {
  if (form.elements.name.classList.contains('unvalid'))
    form.elements.name.classList.remove('unvalid');
  if (form.elements.name.nextElementSibling.classList.contains('warningText')) {
       form.elements.name.nextElementSibling.remove()
  }
  
  if (form.elements.phone.value) {
  console.log('bhjbjbv')
  submitBtn.classList.remove('disabled')
  }
    if (form.elements.name.classList.contains('unvalid') && form.elements.email.classList.contains('unvalid') && form.elements.name.classList.contains('unvalid')) {
  submitBtn.classList.add('disabled')
}
})

form.elements.name.addEventListener('focusout', (evt) => {
  if (form.elements.name.value.length < 6) {
    form.elements.name.classList.add('unvalid')
    const warningText = document.createElement('p')
    warningText.classList.add('warningText')
    warningText.textContent = 'Name should contain six characters at least';

    evt.currentTarget.after(warningText);
  } else {
        form.elements.name.classList.add('valid')
  }
  if (form.elements.name.classList.contains('valid') && form.elements.email.classList.contains('valid') && form.elements.name.classList.contains('valid')) {
  submitBtn.classList.remove('disabled')
  }
    if (form.elements.name.nextElementSibling.tagName === 'P') {
      submitBtn.classList.add('disabled')
  }
  
})


form.elements.email.addEventListener('focusin', (evt) => {
  if (form.elements.email.classList.contains('unvalid'))
    form.elements.email.classList.remove('unvalid');
  if (form.elements.email.nextElementSibling.classList.contains('warningText')) {
       form.elements.email.nextElementSibling.remove()
  }
  
    if (form.elements.name.classList.contains('unvalid') && form.elements.email.classList.contains('unvalid') && form.elements.name.classList.contains('unvalid')) {
  submitBtn.classList.add('disabled')
}
})

form.elements.email.addEventListener('focusout', (evt) => {
    const regExpemail = /[@]/gi
  if (!regExpemail.test(`${form.elements.email.value}`)) {
    form.elements.email.classList.add('unvalid')
    const warningText = document.createElement('p')
    warningText.classList.add('warningText')
    warningText.textContent = 'Email should contains "@"';

    evt.currentTarget.after(warningText);
  } else {
        form.elements.email.classList.add('valid')
  }
  
  if (form.elements.phone.classList.contains('valid') && form.elements.email.classList.contains('valid') && form.elements.name.classList.contains('valid')) {
    submitBtn.classList.remove('disabled')
      if (form.elements.email.nextElementSibling.tagName === 'P') {
      submitBtn.classList.add('disabled')
  }
}
})

form.elements.phone.addEventListener('focusin', (evt) => {
  if (form.elements.phone.classList.contains('unvalid'))
    form.elements.phone.classList.remove('unvalid');
  if (form.elements.phone.nextElementSibling.classList.contains('warningText')) {
       form.elements.phone.nextElementSibling.remove()
  }
      if (form.elements.name.classList.contains('unvalid') && form.elements.email.classList.contains('unvalid') && form.elements.name.classList.contains('unvalid')) {
  submitBtn.classList.add('disabled')
}

})

form.elements.phone.addEventListener('focusout', (evt) => {
  const regExp = /^\+\d{1,3}\d{10}$/;
  if (!regExp.test(`${form.elements.phone.value}`)) {
    form.elements.phone.classList.add('unvalid')
    const warningText = document.createElement('p')
    warningText.classList.add('warningText')
    warningText.textContent = 'Use this phone format: +380997654327';

    evt.currentTarget.after(warningText);
  } else {
        form.elements.phone.classList.add('valid')
  }
  if (form.elements.phone.classList.contains('valid') && form.elements.email.classList.contains('valid') && form.elements.name.classList.contains('valid')) {
  submitBtn.classList.remove('disabled')
  }
  if (form.elements.phone.nextElementSibling.tagName === 'P') {
      submitBtn.classList.add('disabled')
  }
  
})

if (form.elements.phone.classList.contains('valid') && form.elements.email.classList.contains('valid') && form.elements.name.classList.contains('valid')) {
  submitBtn.classList.toggle('disabled')
}

function renderResult(name, email, phone, sports, size) {
  const div = document.createElement('div');
div.classList.add('results-wrapper')

  const title = document.createElement('h2');
  title.classList.add('results-title');
  title.textContent = 'Your results'

    const resultName = document.createElement('p');
    resultName.classList.add('name');
    resultName.textContent = `Name: ${name}`;

    const resultEmail = document.createElement('p');
    resultEmail.classList.add('email');
    resultEmail.textContent = `Email: ${email}`; 

      const resultPhone = document.createElement('p');
    resultPhone.classList.add('phone');
  resultPhone.textContent = `Phone: ${phone}`;

  const resultSports = document.createElement('p');
  resultSports.classList.add('sports');
  resultSports.textContent = `Your favourite sports: ${sports}`;

  const resultSize = document.createElement('p');
  resultSize.classList.add('size');
  resultSize.textContent = `Your foot size is: ${size}`
  
    div.append(title, resultName, resultEmail,resultPhone, resultSports, resultSize)
  result.appendChild(div);

}