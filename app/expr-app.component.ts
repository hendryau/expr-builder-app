import {Component}               from "angular2/core";
import {ExprBuilder}             from "./expr-builder.component";
import {ExprTree, Literal, Operator} from "./expr";

@Component({
    selector: 'expr-app',
    directives: [ExprBuilder],
    template: `
        <expr-builder [exprTree]="exprTree" (evalNeeded)="result=exprTree.expr.evaluate()"></expr-builder>
        = <span>{{result}}</span>
    `
})
export class ExprApp {
    public exprTree: ExprTree = new ExprTree(new Literal(0));
    public result: number = this.exprTree.expr.evaluate();
}