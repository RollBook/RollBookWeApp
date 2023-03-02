export function getComponent() {
 setTimeout(()=>{
  getCurrentPages().pop()?.selectComponent('#sellerinfo')
 },1000)
  
}