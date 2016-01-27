import {Component, EventEmitter, Input, Output} from "angular2/core";
import {ExprTree, Literal, Operator} from "./expr";

@Component({
    selector: 'expr-builder',
    directives: [ExprBuilder],
    inputs: ['exprTree'],
    template:`
        <span *ngIf="!exprTree.expr.isLiteral()">
            (<expr-builder [exprTree]="exprTree.expr.leftOperand" (evalNeeded)="evalNeeded.emit(null)"></expr-builder>

            <select [(ngModel)]="exprTree.expr.op" (change)=" evalNeeded.emit(null)">
                <option *ngFor="#op of operators">{{op}}</option>
            </select>

            <expr-builder [exprTree]="exprTree.expr.rightOperand" (evalNeeded)="evalNeeded.emit(null)"></expr-builder>
            )<button (click)="collapse()" class="collapse-expr" title="collapse">X</button>
        </span>
        <span *ngIf="exprTree.expr.isLiteral()" class="expr-literal">
            <input [(ngModel)]="exprTree.expr.value" type="number" (input)="evalNeeded.emit(null)"
            ><button title="expand" (click)="expand()">&#9654;</button
        ></span>
    `
})
export class ExprBuilder {
    @Input() public exprTree: ExprTree;

    @Output() public evalNeeded: EventEmitter<any> = new EventEmitter();

    public operators: string[] = Operator.OPERATORS;

    public collapse(): void {
        this.exprTree.expr = new Literal(this.exprTree.expr.evaluate());
    }

    public expand(): void {
        this.exprTree.expr = new Operator(
            new ExprTree(this.exprTree.expr),
            new ExprTree(new Literal(0)),
            '+');
    }
}