/**
 * @file A tree-sitter grammar for SIL, as defined in UWaterloo's CS 442
 * @author Arnav Patri <arnavpatri1@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "sil",

  word: ($) => $.ident,

  rules: {
    // TODO: add the actual grammar rules
    prog: ($) => optional($.statement_list),

    statement_list: ($) =>
      prec.right(
        10,
        seq(
          repeat(choice(seq($.statement, ";"), $.comment)),
          choice(seq($.statement, optional(";"), repeat($.comment)), $.comment),
        ),
      ),

    statement: ($) =>
      prec.left(
        5,
        choice(
          choice(
            // SIL
            $.skip,
            $.block,
            $.while_loop,
            $.if_stmt,
            $.var_assgt,
            // SIL-P
            $.proc_decl,
            $.proc_call,
            // SIL-PA
            $.new_arr,
            // SIL-PAO
            $.class_decl,
            $.new_obj,
            $.field,
            $.method_call,
            // Utility
            $.print_stmt,
          ),
          $.comment,
        ),
      ),

    exp: ($) =>
      prec.left(
        5,
        choice(
          /\d+/,
          $.lval,
          seq($.exp, choice("+", "*"), $.exp),
          seq("-", $.exp),
          $.proc_call,
          $.arr_idx,
          $.method_call,
        ),
      ),

    exp_list: ($) => prec.right(seq($.exp, repeat(seq(",", $.exp)))),

    boolexp: ($) =>
      prec.right(
        1,
        choice(
          $.true,
          $.false,
          seq($.not, $.boolexp),
          seq($.boolexp, $.logic_bin, $.boolexp),
          seq($.exp, choice(">", "<", "="), $.exp),
        ),
      ),

    true: ($) => token(prec(10, "true")),

    false: ($) => token(prec(10, "false")),

    not: ($) => token(prec(10, "not")),

    logic_bin: ($) => choice(token(prec(10, "and")), token(prec(10, "or"))),

    skip: ($) => token(prec(10, "skip")),

    block: ($) =>
      prec.right(5, seq($.begin, field("body", $.statement_list), $.end)),

    begin: ($) => token(prec(10, "begin")),

    end: ($) => token(prec(10, "end")),

    while_loop: ($) =>
      prec.right(
        3,
        seq(
          $.while,
          field("whileCond", $.boolexp),
          $.do,
          field("doBlock", $.statement),
        ),
      ),

    while: ($) => token(prec(10, "while")),

    do: ($) => token(prec(10, "do")),

    if_stmt: ($) =>
      prec.right(
        3,
        seq(
          $.if,
          field("branchOn", $.boolexp),
          $.then,
          field("thenBlock", $.statement),
          $.else,
          field("elseBlock", $.statement),
        ),
      ),

    if: ($) => token(prec(10, "if")),

    then: ($) => token(prec(10, "then")),

    else: ($) => token(prec(10, "else")),

    var: ($) => $.ident,

    lval: ($) => prec.left(choice($.var, $.field, $.arr_idx)),

    ident: ($) => /[A-Za-z][A-Za-z0-9]*/,

    var_assgt: ($) => prec.left(seq($.lval, ":=", $.rval)),

    rval: ($) => choice($.exp, $.new_arr),

    var_list: ($) => prec.right(seq($.var, repeat(seq(",", $.var)))),

    var_decllist: ($) => seq(repeat(seq($.var, ";")), $.var, optional(";")),

    proc_decl: ($) =>
      prec.right(
        2,
        seq(
          $.procedure,
          field("name", $.fun),
          "(",
          field("params", $.var_list),
          ")",
          ";",
          field("declarations", optional($.var_decllist)),
          field("body", $.block),
        ),
      ),

    procedure: ($) => token(prec(10, "procedure")),

    fun: ($) => $.lval,

    proc_call: ($) =>
      seq(field("name", $.fun), "(", field("args", optional($.exp_list)), ")"),

    new_arr: ($) => seq($.array, "[", $.exp, "]"),

    array: ($) => token(prec(10, "array")),

    arr_idx: ($) => prec.left(seq($.lval, "[", $.exp, "]")),

    class_decl: ($) =>
      seq(
        $.class,
        field("name", $.classname),
        "(",
        field("params", optional($.var_list)),
        ")",
        ";",
        $.begin,
        optional(seq(repeat(seq($.method_decl, ";")), $.method_decl)),
        $.end,
      ),

    class: ($) => token(prec(10, "class")),

    classname: ($) => $.lval,

    method_decl: ($) =>
      seq(
        $.method,
        field("name", $.fun),
        "(",
        field("params", optional($.var_list)),
        ")",
        ";",
        field("declarations", optional($.var_decllist)),
        field("body", $.block),
      ),

    method: ($) => token(prec(10, "method")),

    new_obj: ($) => seq($.lval, ":=", $.new, $.classname),

    new: ($) => token(prec(10, "new")),

    field: ($) => prec.left(seq($.lval, "->", $.fieldlab)),

    fieldlab: ($) => prec.left(5, $.lval),

    method_call: ($) =>
      seq(
        field("object", $.var),
        ".",
        field("methodName", $.fun),
        "(",
        field("args", optional($.exp_list)),
        ")",
      ),

    property: ($) => $.var,

    print_stmt: ($) => prec(4, seq($.print, $.exp)),

    print: ($) => token(prec(10, "print")),

    comment: ($) => prec(100, token(seq("%", /[^\n]*/))),
  },
});
