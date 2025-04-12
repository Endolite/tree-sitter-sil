import XCTest
import SwiftTreeSitter
import TreeSitterSIL

final class TreeSitterSILTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_sil())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading SIL grammar")
    }
}
