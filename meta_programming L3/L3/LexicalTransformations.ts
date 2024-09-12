


import {
    ClassExp,
    ProcExp,
    makeProcExp,
    VarDecl,
    makeVarDecl,
    makeAppExp,
    makePrimOp,
    makeLitExp,
    makeIfExp,
    Binding,
    Exp,
    CExp,
    makeVarRef,
    isAtomicExp,
    isLitExp,
    isIfExp,
    isAppExp,
    isProcExp,
    isLetExp,
    isClassExp,
    makeLetExp,
    makeDefineExp,
    isDefineExp,
    isCExp,
    makeProgram,
    isProgram,
    isExp,
    Program,
    makeBoolExp,
} from './L3-ast';import { Result, makeFailure, makeOk } from "../shared/result";
import { map } from "ramda";
import { makeSymbolSExp } from "./L3-value";

/*
Purpose: Transform ClassExp to ProcExp
Signature: class2proc(classExp)
Type: ClassExp => ProcExp
*/



export const class2proc = (exp: ClassExp): ProcExp => {
    // Convert field names to VarDecl
    const fieldVarDecls: VarDecl[] = exp.fields.map(field => makeVarDecl(field.var));

    // Sort methods in the desired order: first, second, sum
    const sortedMethods = exp.methods.sort((a, b) => {
        if (a.var.var === 'first') return -1;
        if (a.var.var === 'second' && b.var.var === 'sum') return -1;
        return 1;
    });

    // Transform each method into a conditional expression
    const methodConditions: CExp = sortedMethods.reduceRight((acc: CExp, binding: Binding) => {
        const methodName = binding.var.var;
        const methodBody = (binding.val as ProcExp).body;

        // Construct a conditional expression for the current method
        return makeIfExp(
            makeAppExp(makePrimOp('eq?'), [makeVarRef('msg'), makeLitExp(makeSymbolSExp(methodName))]),
            makeAppExp(makeProcExp([], methodBody), []),
            acc
        );
    }, makeBoolExp(false) as CExp); // Initialize accumulator with a BoolExp casted to CExp

    // Create the inner lambda that handles method dispatch
    const innerLambda = makeProcExp([makeVarDecl('msg')], [methodConditions]);

    // Create the outer lambda that takes the class fields
    return makeProcExp(fieldVarDecls, [innerLambda]);
};
/*
Purpose: Transform all class forms in the given AST to procs
Signature: lexTransform(AST)
Type: [Exp | Program] => Result<Exp | Program>
*/

//export const lexTransform = (exp: Exp | Program): Result<Exp | Program> =>   
  
    // Recursive function to transform expressions
 
    


export const lexTransform = (exp: Program | Exp): Result<Exp | Program> =>
    isExp(exp) ? makeOk(rewriteAllClassExp(exp)) :
    isProgram(exp) ? makeOk( makeProgram(map(rewriteAllClassExp, exp.exps)) ) :
    exp;


const rewriteAllClassExp = (exp: Exp): Exp =>
    isCExp(exp) ? rewriteAllClassCExp(exp) :
    isDefineExp(exp) ? makeDefineExp(exp.var, rewriteAllClassCExp(exp.val)) :
    exp;


const rewriteAllClassCExp = (exp: CExp): CExp =>
    isAtomicExp(exp) ? exp :
    isLitExp(exp) ? exp :
    isIfExp(exp) ? makeIfExp(rewriteAllClassCExp(exp.test),
                             rewriteAllClassCExp(exp.then),
                             rewriteAllClassCExp(exp.alt)) :
    isAppExp(exp) ? makeAppExp(rewriteAllClassCExp(exp.rator),
                               map(rewriteAllClassCExp, exp.rands)) :
    isProcExp(exp) ? makeProcExp(exp.args, map(rewriteAllClassCExp, exp.body)) :
    isLetExp(exp) ? makeLetExp(exp.bindings,exp.body) :
    isClassExp(exp) ? class2proc(exp):
    exp;