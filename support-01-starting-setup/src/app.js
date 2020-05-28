// import "core-js"
const button = document.querySelector('button');

button.addEventListener('click', () => {
  const promise = new Promise();
  console.log(promise);
  const text = parag.textContent;
  navigator.clipboard.writeText(text)
      .then(res => console.log(res))
      .catch(err => console.log(err));
});