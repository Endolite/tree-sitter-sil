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
            $.while,
            $.if,
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
            $.print,
          ),
          $.comment,
        ),
      ),

    exp: ($) =>
      prec.left(
        5,
        choice(
          /\d+/,
          $.var,
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
          token(prec(10, "true")),
          token(prec(10, "false")),
          seq(token(prec(10, "not")), $.boolexp),
          seq(
            $.boolexp,
            choice(token(prec(10, "and")), token(prec(10, "or"))),
            $.boolexp,
          ),
          seq($.exp, choice(">", "<", "="), $.exp),
        ),
      ),

    skip: ($) => token(prec(10, "skip")),

    block: ($) =>
      prec.right(
        5,
        seq(
          token(prec(10, "begin")),
          field("body", $.statement_list),
          token(prec(10, "end")),
        ),
      ),

    while: ($) =>
      prec.right(
        3,
        seq(
          token(prec(10, "while")),
          field("whileCond", $.boolexp),
          token(prec(10, "do")),
          field("doBlock", $.statement),
        ),
      ),

    if: ($) =>
      prec.right(
        3,
        seq(
          token(prec(10, "if")),
          field("branchOn", $.boolexp),
          token(prec(10, "then")),
          field("thenBlock", $.statement),
          token(prec(10, "else")),
          field("elseBlock", $.statement),
        ),
      ),

    var: ($) => prec.left(choice($.ident, $.field, $.arr_idx)),

    ident: ($) => /[A-Za-z][A-Za-z0-9]*/,

    var_assgt: ($) => prec.left(seq($.var, ":=", $.rval)),

    rval: ($) => choice($.exp, $.new_arr),

    var_list: ($) => prec.right(seq($.var, repeat(seq(",", $.var)))),

    var_decllist: ($) => seq(repeat(seq($.var, ";")), $.var, optional(";")),

    proc_decl: ($) =>
      prec.right(
        2,
        seq(
          token(prec(10, "procedure")),
          field("name", $.var),
          "(",
          field("params", $.var_list),
          ")",
          ";",
          field("declarations", optional($.var_decllist)),
          field("body", $.block),
        ),
      ),

    proc_call: ($) =>
      seq(field("name", $.var), "(", field("args", optional($.exp_list)), ")"),

    new_arr: ($) => seq(token(prec(10, "array")), "[", $.exp, "]"),

    arr_idx: ($) => prec.left(seq($.var, "[", $.exp, "]")),

    class_decl: ($) =>
      seq(
        token(prec(10, "class")),
        field("name", $.var),
        "(",
        field("params", optional($.var_list)),
        ")",
        ";",
        token(prec(10, "begin")),
        optional(seq(repeat(seq($.method_decl, ";")), $.method_decl)),
        token(prec(10, "end")),
      ),

    method_decl: ($) =>
      seq(
        "method",
        field("name", $.var),
        "(",
        field("params", optional($.var_list)),
        ")",
        ";",
        field("declarations", optional($.var_decllist)),
        field("body", $.block),
      ),

    new_obj: ($) => seq($.var, ":=", token(prec(10, "new")), $.var),

    field: ($) => prec.left(seq($.var, "->", $.var)),

    method_call: ($) =>
      seq(
        field("object", $.var),
        ".",
        field("methodName", $.var),
        "(",
        field("args", optional($.exp_list)),
        ")",
      ),

    print: ($) => prec(4, seq(token(prec(10, "print")), $.exp)),

    comment: ($) => prec(100, token(seq("%", /[^\n]*/))),
  },
});
