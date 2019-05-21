let createUser = (req, res, next) => {
  try {
    res.send('user controller')
  } catch (e) {
    console.log(e)
  }
}


export {createUser}