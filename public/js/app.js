

const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#search-field')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')

const setAttributes = (element, attributes) => {
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr])
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading..'

    fetch(`/weather?address=${location}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) throw new Error(data.error)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            const weatherIconAttributes = {
                src: data.icon[0],
                style: 'display: inline-block;'
            }
            setAttributes(weatherIcon, weatherIconAttributes)
        })
        .catch(error => {
            messageOne.textContent = `${error.message}`
        })


})