# Tree-sitter grammar for SIL
The syntax of the Simple Imperative Language (SIL) is given in [EBNF](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form) as follows:
```math
\begin{align*}
  \hspace{4cm} & \hspace{17cm} \\
	\langle\text{\textit{StmtList}}\rangle &::= \varepsilon \mid \{\langle\text{\textit{Stmt}}\rangle, \texttt{``;''}, \{\langle\text{\textit{Comment}}\rangle\}\}, [\langle\text{\textit{Stmt}}\rangle], \{\langle\text{\textit{Comment}}\rangle\}\\
	\langle\text{\textit{Stmt}}\rangle &::= \texttt{skip} \mid \langle\text{\textit{Block}}\rangle \mid \langle\text{\textit{While}}\rangle \mid \langle\text{\textit{If}} \rangle \mid \langle\text{\textit{VarAssgt}}\rangle \mid \langle\text{\textit{ProcDecl}}\rangle \\
		&\qquad \mid \langle\text{\textit{ClassDecl}}\rangle \mid \langle\text{\textit{Field}}\rangle \mid \langle\text{\textit{Print}}\rangle \langle\text{\textit{Comment}}\rangle \\
	\langle\text{\textit{Expr}}\rangle &::= 0 \mid 1 \mid \cdots \\
		&\qquad\mid \langle\text{\textit{Lval}}\rangle \mid \texttt{``(''}, \langle\text{\textit{Expr}}\rangle, \texttt{``)''} \\
		&\qquad\mid \langle\text{\textit{Expr}}\rangle, \langle\text{\textit{MathBin}}\rangle,  \langle\text{\textit{Expr}}\rangle \mid \texttt{``-''}, \langle\text{\textit{Expr}}\rangle \\
		&\qquad\mid \langle\text{\textit{ProcCall}}\rangle \mid \langle\text{\textit{ArrIdx}}\rangle \mid \langle\text{\textit{MethodCall}}\rangle \\
	\langle\text{\textit{Lval}}\rangle &::= \langle\text{\textit{Var}}\rangle \mid \langle\text{\textit{Field}}\rangle \mid \langle\text{\textit{ArrIdx}}\rangle \\
	\langle\text{\textit{MathBin}}\rangle &::= \texttt{``+''} \mid \texttt{``*''} \\
	\langle\text{\textit{ExprList}}\rangle &::= \langle\text{\textit{Expr}}\rangle, \{\texttt{``,''}, \langle\text{\textit{Expr}}\rangle\}
\end{align*}
```
```math
\begin{align*}
  \hspace{4cm} & \hspace{17cm} \\
  \langle\text{\textit{BoolExp}}\rangle &::= \texttt{``true''} \mid \texttt{``false''} \mid \texttt{``(''},  \langle\text{\textit{BoolExp}}\rangle, \texttt{``)''} \\
		&\qquad\mid \texttt{``not''}, \langle\text{\textit{BoolExp}}\rangle \\
		&\qquad\mid \langle\text{\textit{BoolExp}}\rangle, \langle\text{\textit{LogicBin}}\rangle, \langle\text{\textit{BoolExp}}\rangle \\
		&\qquad\mid \langle\text{\textit{Expr}}\rangle, \langle\text{\textit{MathRel}}\rangle, \langle\text{\textit{Expr}}\rangle\\
	\langle\text{\textit{LogicBin}}\rangle &::= \texttt{``and''} \mid \texttt{``or''} \\
	\langle\text{\textit{MathRel}}\rangle &:= \texttt{``<''} \mid \texttt{``>''} \mid \texttt{``=''} \\
	\langle\text{\textit{Block}}\rangle &::= \texttt{``begin''}, \langle\text{\textit{StmtList}}\rangle, \text{``\texttt{end}''} \\
	\langle\text{\textit{While}}\rangle &::= \texttt{``while''}, \langle\text{\textit{Boolexp}}\rangle, \texttt{``do''}, \langle\text{\textit{Stmt}}\rangle, \texttt{``end''} \\
	\langle\text{\textit{If}}\rangle &::= \texttt{``if''}, \langle\text{\textit{Boolexp}}\rangle, \texttt{``then''}, \langle\text{\textit{Stmt}}\rangle
\end{align*}
```
```math
\begin{align*}
  \hspace{4cm} & \hspace{17cm} \\
  \langle\text{\textit{VarList}}\rangle &::= \langle\text{\textit{Var}}\rangle, \{\texttt{``,''}, \langle\text{\textit{Var}}\}\rangle \\
	\langle\text{\textit{VarDecList}}\rangle &::= \langle\text{\textit{Var}}\rangle, \{\texttt{``;''}, \langle\text{\textit{Var}}\rangle\} \\
	\langle\text{\textit{ProcDecl}}\rangle &::= \texttt{``procedure''}, \texttt{``(''}, \langle\text{\textit{VarList}}\rangle, \texttt{``)''}, \texttt{``;''}, [\langle\text{\textit{VarDeclList}}\rangle], \langle\text{\textit{Block}}\rangle \\
	\langle\text{\textit{ProcCall}}\rangle &::= \langle\text{\textit{Var}}\rangle, \texttt{``(''}, [\langle\text{\textit{ExprList}}\rangle], \texttt{``)''} \\
	\langle\text{\textit{ArrIdx}}\rangle &::= \langle\text{\textit{Lval}}\rangle, \texttt{``[''}, \langle\text{\textit{Expr}}\rangle, \texttt{``]''}
\end{align*}
```
```math
\begin{align*}
  \hspace{4cm} & \hspace{17cm} \\
  \langle\text{\textit{ClassDecl}}\rangle &::= \texttt{``class''}, \langle\text{\textit{Var}}\rangle, \texttt{``(''}, [\langle\text{\textit{VarList}}\rangle], \texttt{``)''}, \texttt{``;''}, \texttt{``begin''}, [\langle\text{\textit{MethodDeclList}}\rangle], \texttt{``end''} \\
	\langle\text{\textit{MethodDecl}}\rangle &::= \texttt{``method''}, \langle\text{\textit{Var}}\rangle, \texttt{``(''}, [\langle\text{\textit{VarList}}\rangle], \texttt{``)''}, \texttt{``;''}, [\langle\text{\textit{VarDecllist}}\rangle], \langle\text{\textit{Block}}\rangle \\
	\langle\text{\textit{MethodDeclList}}\rangle &::= \langle\text{\textit{MethodDecl}}\rangle, \{\texttt{``,''}, \langle\text{\textit{MethodDecl}}\rangle\} \\
	\langle\text{\textit{Field}}\rangle &::= \langle\text{\textit{Lval}}\rangle, \texttt{``->''}, \langle\text{\textit{Var}}\rangle \\
	\langle\text{\textit{Print}}\rangle &::= \texttt{``print''}, \langle\text{\textit{Expr}}\rangle \\
	\langle\text{\textit{Comment}}\rangle &::= \texttt{``\%''}, \verb|regex([^\n]*)|
\end{align*}
```
