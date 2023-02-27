export function getComponent() {
 setTimeout(()=>{
  getCurrentPages().pop()?.selectComponent('#bookinfo').setData({
    a:false
  })
 },1000)
  
}