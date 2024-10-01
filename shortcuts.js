const id = name => document.getElementById(name)
const changeStyle = name => id(name).style
const showElement = name => changeStyle(name).display = 'default'
const hideElement = name => changeStyle(name).display = 'none'

