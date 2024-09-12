import * as R from "ramda";
import { pipe } from "ramda";


const stringToArray = R.split("");


const myAdd = (x: number, y: number): number => {
    return x + y;
};



/* Question 1 */
const vowel = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

const is_vowel: (c: string) => boolean = (c: string): boolean => vowel.includes(c.charAt(0));

export const countVowels: (word: string) => number = (word: string): number => (stringToArray(word).filter(is_vowel)).length;




const f = pipe(
    (x: number) => x * x,
    (x: number) => x + 1,
    (x: number) => 2 * x
);
///////////////////////////////////////////////////////





/* Question 2 */
const vowels = ['[', ']', '{', '}', '(', ')'];


const give_pairs: (c: String) => boolean = (c: String): boolean => (vowels.includes(c.charAt(0)))


export const isPaired: (word: string) => boolean = (word: string): boolean => {
    const arr: string[] = stringToArray(word);
    const arr2 = arr.filter(give_pairs);
    const counts = filter_iter(arr2)

    return counts.isValid ? counts.countClose === 0 && counts.countOpen === 0 && counts.countSquare === 0 : false;
}


let filter_iter: (arr: string[]) => { countOpen: number, countSquare: number, countClose: number, isValid: Boolean } = (arr: String[]): { countOpen: number, countSquare: number, countClose: number, isValid: Boolean } => {

    return arr.reduce((acc, char) => {
        if (char === '(') {
            acc.countOpen++;
        } else if (char === ')') {
            acc.countOpen--;
            if (acc.countOpen < 0) acc.isValid = false;
        } else if (char === '[') {
            acc.countSquare++;
        } else if (char === ']') {
            acc.countSquare--;
            if (acc.countSquare < 0) acc.isValid = false;
        } else if (char === '{') {
            acc.countClose++;
        } else if (char === '}') {
            acc.countClose--;
            if (acc.countClose < 0) acc.isValid = false;
        }

        return acc;
    },
        { countOpen: 0, countSquare: 0, countClose: 0, isValid: true });


}


/* Question 3 */


export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence: (tree: WordTree) => string = (tree: WordTree): string => {
    if (tree.children.length === 0) {
        return tree.root;
    }
    
    // Recursively map over each child and concatenate their roots
    const childStrings = tree.children.map(child => treeToSentence(child));

    // Concatenate the root of the current tree with the roots of its children
    return tree.root + " " + childStrings.join(" ");
}


const myFatAdd: (x: number, y: number) => number = (x: number, y: number): number => (x + y);
