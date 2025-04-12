/**
 * @file A tree-sitter grammar for SIL, as defined in UWaterloo's CS 442
 * @author Arnav Patri <arnavpatri1@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "sil",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
