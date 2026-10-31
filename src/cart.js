import {products} from './products.js';
export const UNIT_PRICE = 50;
export const BUNDLE_PRICE = 90;
export const productById = id => products.find(p=>p.id===id);
export function makeLine(ids) {
 if(!Array.isArray(ids)||![1,2].includes(ids.length)||ids.some(id=>!productById(id))) throw new Error('Select one oil or a pair of oils.');
 const sorted=[...ids].sort();
 return {key:sorted.join('+'),ids:sorted,quantity:1};
}
export const linePrice = line => line.ids.length===2?BUNDLE_PRICE:UNIT_PRICE;
export const total = cart => cart.reduce((sum,line)=>sum+linePrice(line)*line.quantity,0);
export function addLine(cart,ids,quantity=1) {
 const line=makeLine(ids);
 const amount=Math.min(99,Math.max(1,Number.isInteger(quantity)?quantity:1));
 return cart.some(l=>l.key===line.key)?cart.map(l=>l.key===line.key?{...l,quantity:Math.min(99,l.quantity+amount)}:l):[...cart,{...line,quantity:amount}];
}
export function sanitizeCart(value) {
 if(!Array.isArray(value))return [];
 return value.reduce((acc,l)=>{try {if(!Number.isInteger(l.quantity)||l.quantity<1)return acc;return addLine(acc,l.ids,l.quantity);}catch{return acc;}},[]);
}
export function orderUrl(cart) {
 if(!cart.length)return 'https://wa.me/447511683678?text='+encodeURIComponent('Hello Pure Herbalix, I would like to know more about your oils.');
 const lines=cart.map(l=>`${l.quantity} × ${l.ids.length===2?'Two-oil bundle: ':''}${l.ids.map(id=>productById(id).name+' '+productById(id).title).join(' + ')} — ${linePrice(l)*l.quantity} AED`);
 return 'https://wa.me/447511683678?text='+encodeURIComponent(`Hello Pure Herbalix, I would like to place an order:\n\n${lines.join('\n')}\n\nProduct total: ${total(cart)} AED\n\nPlease confirm availability, delivery charges, delivery timing and payment options. Thank you!`);
}
