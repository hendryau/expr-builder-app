export class ExprTree {
    public expr: Expr;
    constructor(expr: Expr) {
        this.expr = expr;
    }
}

export interface Expr {
    evaluate(): number;
    isLiteral(): boolean;
}

export class Operator implements Expr {
    public static OPERATORS: string[] = [
        '+', '-', '*', '/'
    ];

    public leftOperand: ExprTree;
    public rightOperand: ExprTree;
    public op: string;

    constructor(leftOperand: ExprTree, rightOperand: ExprTree, op: string) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;

        if (Operator.OPERATORS.indexOf(op) < 0) {
            throw new Error('Unsupported op for Operator: ' + op);
        }

        this.op = op;
    }
    public evaluate(): number {
        var l = this.leftOperand.expr.evaluate();
        var r = this.rightOperand.expr.evaluate();

        switch(this.op) {
            case '+': return l + r;
            case '-': return l - r;
            case '*': return l * r;
            case '/': return l / r;
        }
    }
    public isLiteral(): boolean {
        return false;
    }
}

export class Literal implements Expr {
    public value: number;

    constructor(value: number) {
        this.value = value;
    }
    public evaluate(): number {
        return this.value;
    }
    public isLiteral(): boolean {
        return true;
    }
}