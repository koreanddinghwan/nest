const googleBtn = document.getElementById('google')

const getData = async (url = '') => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  return response
}

const googleEventListener = async (e) => {
  console.log('button click')
  try {
    const url = `http://localhost:3000/api/google/login`
    window.location.href = url
  } catch (e) {
    console.log(e)
  }
}

googleBtn.addEventListener('click', googleEventListener)
