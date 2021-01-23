let num = 10
console.log(num)

if (true) {
  let num = 100
  console.log(num)
}
for (let index = 0; index < 10; index++) {
  setTimeout(()=>{
    console.log(index)
  },100)
}
