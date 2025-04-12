package tree_sitter_sil_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_sil "github.com/endolite/tree-sitter-sil/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_sil.Language())
	if language == nil {
		t.Errorf("Error loading SIL grammar")
	}
}
