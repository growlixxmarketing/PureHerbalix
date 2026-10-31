import test from 'node:test';
import assert from 'node:assert/strict';
import {makeLine,addLine,total,orderUrl,sanitizeCart} from './cart.js';
test('each individual oil is 50 AED',()=>{for(const id of ['haya','aflatonic','lazzat'])assert.equal(total([makeLine([id])]),50)});
test('all two-oil combinations cost 90 AED including identical oils',()=>{for(const a of ['haya','aflatonic','lazzat'])for(const b of ['haya','aflatonic','lazzat'])assert.equal(total([makeLine([a,b])]),90)});
test('bundle order merges and quantity totals remain accurate',()=>{let c=addLine([],['haya','lazzat']);c=addLine(c,['lazzat','haya']);c=addLine(c,['aflatonic'],3);assert.equal(c.length,2);assert.equal(total(c),330)});
test('invalid stored data cannot override prices or create unknown products',()=>{assert.deepEqual(sanitizeCart([{ids:['unknown'],quantity:1},{ids:['haya'],quantity:-1}]),[]);assert.equal(total(sanitizeCart([{ids:['haya'],quantity:1,price:0}])),50);assert.throws(()=>makeLine(['haya','aflatonic','lazzat']))});
test('WhatsApp order includes exact bundle, quantities and AED total',()=>{let c=addLine([],['haya','haya']);c=addLine(c,['lazzat'],2);const url=new URL(orderUrl(c));assert.equal(url.pathname,'/447511683678');const text=url.searchParams.get('text');assert.match(text,/Product total: 190 AED/);assert.match(text,/HAYA Breast & Bum Oil \+ HAYA Breast & Bum Oil/);assert.match(text,/2 × Lazzat e Khaas/)});
