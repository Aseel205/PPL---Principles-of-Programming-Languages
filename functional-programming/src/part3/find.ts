import { ok } from "assert";
import { Result, makeFailure, makeOk, bind, either, } from "../lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}





/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

  ////////////////////// to do

export const findResult = <T>(f: (x: T) => boolean , arr: T[]): Result<T> => {
    const arr1 : T[] =   arr.filter(f);

   if (arr1.length==0) {
       return makeFailure("no such element exist")
       
   } 
   else {
       return makeOk(arr1[0])
   
};
}

export const returnSquaredIfFoundEven_v2 : (arr:number[]) =>Result<number|string> = (arr:number[]):Result<number|string> =>  {

    return bind(findResult((x: number)=>x%2==0 ,arr ), (x:number)=>makeOk(x*x))  //gg

}

export const returnSquaredIfFoundEven_v3 : ( arr:number[]) => number   = (arr:number[]):number => {


    return either(findResult((x: number)=>x%2==0,arr ),(x:number) => x*x ,  (mesaage:string)=>-1  )





};

