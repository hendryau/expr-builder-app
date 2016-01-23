import {Component, Input}            from "angular2/core";
import {ExprTree, Literal, Operator} from "./expr";

@Component({
    selector: 'expr-builder',
    directives: [ExprBuilder], //note that this is a recursive directive, we don't need to include at the top. if you try to include it, you'll get an exception that it doesn't exist, cause the compiler hasn't compiled this file yet.
    inputs: ['exprTree'],
    template:`
        <span *ngIf="!exprTree.expr.isLiteral()">
            (<expr-builder [exprTree]="exprTree.expr.leftOperand"></expr-builder>

            <select [(ngModel)]="exprTree.expr.op">
                <option *ngFor="#op of operators">{{op}}</option>
            </select>

            <expr-builder [exprTree]="exprTree.expr.rightOperand"></expr-builder>
            )<button (click)="collapse()" class="collapse-expr" title="collapse">X</button>
        </span>
        <span *ngIf="exprTree.expr.isLiteral()" class="expr-literal">
            <input [(ngModel)]="exprTree.expr.value" type="number"
            ><button title="expand" (click)="expand()">&#9654;</button
        ></span>
    `
})
export class ExprBuilder {
    @Input() exprTree: ExprTree;

    public operators: string[] = Operator.OPERATORS;

    expand(): void {
        this.exprTree.expr = new Operator(
            new ExprTree(this.exprTree.expr),
            new ExprTree(new Literal(0)),
            '+');
    }
    collapse(): void {
        this.exprTree.expr = new Literal(this.exprTree.expr.evaluate());
    }
}