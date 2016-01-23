import {Component}               from "angular2/core";
import {ExprBuilder}             from "./expr-builder.component";
import {ExprTree, Literal, Operator} from "./expr";

//TODO bind the evaluation to a variable and only update it when the exprTree changes.
@Component({
    selector: 'expr-app',
    directives: [ExprBuilder],
    template: `
        <expr-builder [exprTree]="exprTree"></expr-builder>
        = <span>{{exprTree.expr.evaluate()}}</span>
    `
})
export class ExprApp {
    public exprTree: ExprTree = new ExprTree(new Literal(0));
}